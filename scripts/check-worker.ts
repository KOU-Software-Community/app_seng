/**
 * `npm run check:worker`
 *
 * AI Gündem özet worker'ının iki kararını sınar: model zinciri ve çalışma
 * süresi bütçesi. Kaynak `supabase/functions/`'ta Deno için yazıldı, ama bu
 * modüller saf — fetch ve saat enjekte ediliyor — o yüzden Node'da sahte
 * istemcilerle koşuyor, ağ ve anahtar olmadan.
 *
 * Korunan hata: NVIDIA yedeğinin modeli 26 Ağustos'ta emekli oldu ve bir ay
 * boyunca her çağrıya 410 döndü. Eski sarmalayıcı yalnızca birincilin 429'unu
 * raporladığı için bunu hiçbir log söylemedi, ve 429'lar işlerin deneme
 * hakkını yiyip onları öldürdü.
 */
import {
  GEMINI_FALLBACK_MODELS,
  resolveAiProvider,
  withFallbacks,
} from '../supabase/functions/_shared/ai-provider.ts';
import type { SummariseClient, SummariseOutcome } from '../supabase/functions/_shared/anthropic.ts';
import {
  processEnrichments,
  RUN_BUDGET_SECONDS,
  type EnrichmentDb,
  type EnrichmentJob,
} from '../supabase/functions/_shared/enrichment.ts';

let failed = 0;
function assert(name: string, condition: boolean, detail = '') {
  console.log(`${condition ? '✓' : '✗'} ${name}${condition ? '' : `\n    ${detail}`}`);
  if (!condition) failed += 1;
}

const ARTICLE = {
  title: 'Bir model duyuruldu',
  sourceName: 'Kaynak',
  language: 'en' as const,
  contentText: 'The company announced a model today.',
  contentQuality: 'excerpt' as const,
};

const OK = (model: string): SummariseOutcome => ({
  ok: true,
  payload: { summary: ['bir', 'iki', 'üç'], translation: 'çeviri' },
  usage: { inputTokens: 1, outputTokens: 1, cacheReadTokens: 0, cacheWriteTokens: 0 },
  model,
});
const FAIL = (code: string, retryable: boolean): SummariseOutcome =>
  ({ ok: false, code, retryable }) as SummariseOutcome;

/** Her bağlantı ne döndüreceğini ve kaç kez çağrıldığını bilir. */
function link(model: string, outcome: SummariseOutcome) {
  const client: SummariseClient & { calls: number } = {
    calls: 0,
    async summarise() {
      client.calls += 1;
      return outcome;
    },
  };
  return { provider: 'gemini' as const, model, client };
}

async function run(links: ReturnType<typeof link>[]) {
  const logged: string[] = [];
  const outcome = await withFallbacks(links, (line) => logged.push(line)).summarise({ article: ARTICLE });
  return { outcome, logged, calls: links.map((l) => l.client.calls) };
}

(async () => {
  // 1. Zincir: birincil model önbellek anahtarında kalıyor, arkasında ücretsiz
  //    Gemini modelleri, en sonda NVIDIA.
  const resolved = await resolveAiProvider(
    { get: () => undefined },
    async (name) => (name.includes('gemini') || name.includes('nvidia') ? 'anahtar' : null),
    { fetchImpl: fetch },
  );
  const models = resolved.provider === null ? [] : [resolved.model, ...(resolved.fallbacks ?? []).map((f) => f.model)];
  assert(
    'zincir: 2.5-flash → ücretsiz Gemini modelleri → NVIDIA',
    JSON.stringify(models) ===
      JSON.stringify(['gemini-2.5-flash', ...GEMINI_FALLBACK_MODELS, 'nvidia/nemotron-3-super-120b-a12b']),
    JSON.stringify(models),
  );
  assert('emekli model zincirde yok', !models.includes('meta/llama-3.3-70b-instruct'), JSON.stringify(models));

  // 2. Emekli bir bağlantı zinciri kesmiyor — eski sarmalayıcı tek yedeğe
  //    bakıyordu ve o yedek 410 verdiğinde birincilin 429'unu raporluyordu.
  {
    const r = await run([
      link('birincil', FAIL('rate_limited', true)),
      link('emekli', FAIL('not_found', false)),
      link('calisan', OK('calisan')),
    ]);
    assert('emekli bağlantıdan sonra sıradaki cevap veriyor', r.outcome.ok && r.outcome.model === 'calisan', JSON.stringify(r.outcome));
  }

  // 3. Birincilin kendisi emekliyse de zincir yürüyor.
  {
    const r = await run([link('birincil', FAIL('not_found', false)), link('yedek', OK('yedek'))]);
    assert('birincil 404 verince yedeğe geçiliyor', r.outcome.ok, JSON.stringify(r.outcome));
  }

  // 4. İçerik hatası nihai: başka model sorulmuyor.
  {
    const r = await run([link('birincil', FAIL('schema_summary_wrong_length', false)), link('yedek', OK('yedek'))]);
    assert(
      'birincilin içerik hatası nihai, yedek çağrılmıyor',
      !r.outcome.ok && r.outcome.code === 'schema_summary_wrong_length' && r.calls[1] === 0,
      JSON.stringify(r),
    );
  }

  // 5. Kimsenin kapasitesi yoksa rapor rate_limited: veritabanı bunu işin
  //    değil sağlayıcıların durumu sayıyor, deneme hakkı yemiyor.
  {
    const r = await run([
      link('birincil', FAIL('server_error', true)),
      link('b', FAIL('rate_limited', true)),
      link('c', FAIL('timeout', true)),
      link('d', FAIL('not_found', false)),
    ]);
    assert(
      'hepsi meşgul → rate_limited, yeniden denenebilir',
      !r.outcome.ok && r.outcome.code === 'rate_limited' && r.outcome.retryable,
      JSON.stringify(r.outcome),
    );
  }

  // 6. Ama bir bağlantı içerikte düştüyse o raporlanıyor: iş "meşgul" diye
  //    sonsuza kadar dönmüyor, bitiyor.
  {
    const r = await run([
      link('birincil', FAIL('rate_limited', true)),
      link('b', FAIL('schema_translation_missing_for_foreign_article', false)),
      link('c', FAIL('rate_limited', true)),
    ]);
    assert(
      'yedeğin içerik hatası raporlanıyor, yeniden denenmiyor',
      !r.outcome.ok && r.outcome.code === 'schema_translation_missing_for_foreign_article' && !r.outcome.retryable,
      JSON.stringify(r.outcome),
    );
  }

  // 7. Kesilen çıktı yükseltilmiş sınırla yeniden denenebilsin diye korunuyor.
  {
    const r = await run([link('birincil', FAIL('output_truncated', true)), link('b', FAIL('rate_limited', true))]);
    assert('birincil kesildiyse output_truncated kalıyor', !r.outcome.ok && r.outcome.code === 'output_truncated', JSON.stringify(r.outcome));
  }

  // 8. Düşen her bağlantı kendi koduyla loglanıyor — 410 bir ay görünmedi.
  {
    const r = await run([
      link('birincil', FAIL('rate_limited', true)),
      link('emekli', FAIL('bad_request', false)),
      link('calisan', OK('calisan')),
    ]);
    const joined = r.logged.join('\n');
    assert(
      'her düşen bağlantı modeli ve koduyla loglanıyor',
      r.logged.length === 2 && joined.includes('"model":"emekli"') && joined.includes('"code":"bad_request"'),
      joined,
    );
  }

  // 9. Süre bütçesi: bütçe dolduktan sonra yeni işe başlanmıyor, kalan iş
  //    deneme hakkı yenmeden kuyruğa dönüyor.
  {
    let clock = Date.parse('2026-09-24T12:00:00Z');
    const released: string[] = [];
    let summarised = 0;
    const job = (id: string): EnrichmentJob => ({
      job_id: id,
      lease_token: `t-${id}`,
      article_id: `a-${id}`,
      content_hash: 'a'.repeat(64),
      title: 'Başlık',
      language: 'en',
      content_text: 'Some body text.',
      content_quality: 'excerpt',
      source_name: 'Kaynak',
      prompt_version: 'v1',
      model: 'gemini-2.5-flash',
      attempt_count: 1,
      max_attempts: 5,
      last_error_code: null,
    });
    const db = {
      leaseJobs: async () => [job('1'), job('2'), job('3')],
      bumpRateLimit: async () => true,
      completeJob: async () => true,
      retryJob: async () => true,
      failJob: async () => true,
      releaseJobUnattempted: async (id: string, _t: string, _at: string, code: string) => {
        released.push(`${id}:${code}`);
        return true;
      },
    } as unknown as EnrichmentDb;
    const result = await processEnrichments(
      {
        db,
        // Her çağrı saati yarım bütçeden fazla ilerletiyor: iki iş başlar,
        // üçüncüsü bütçenin dışında kalır.
        client: {
          async summarise() {
            summarised += 1;
            clock += (RUN_BUDGET_SECONDS / 2 + 10) * 1000;
            return OK('gemini-2.5-flash');
          },
        },
        now: () => new Date(clock),
        hasApiKey: true,
        dailyCap: 200,
      },
      { maxJobs: 3 },
    );
    assert(
      'bütçe dolunca yeni iş başlamıyor, kalan iş denenmeden geri dönüyor',
      summarised === 2 && result.ready === 2 && JSON.stringify(released) === JSON.stringify(['3:run_budget']),
      JSON.stringify({ summarised, ready: result.ready, released }),
    );
  }

  console.log(failed === 0 ? '\nworker kontrolü geçti' : `\n${failed} kontrol düştü`);
  process.exit(failed === 0 ? 0 : 1);
})();
