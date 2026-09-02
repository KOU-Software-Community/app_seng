import { bodyFor, hasSummary, segmentState } from '../../article/segment';
import type { Article, ArticleSummary } from '../../domain/types';
import { toArticle, toSummary, type FeedArticleRow } from '../supabase/mapper';
import { createSupabaseEnrichmentRepository } from '../supabase/repositories';

/**
 * Özet ve çeviri iki ayrı üründür — ve bunu unutan üç yer vardı.
 *
 * Hepsi cihazdan gelen tek bir rapordan çıktı: *"çeviri gelmiş ama özet
 * oluşturamıyor."* Satırda üç madde de duruyordu; ekran onları uç noktanın
 * cevabına bakarak saklıyordu.
 */

const CONFIG = { supabaseUrl: 'https://project.supabase.co', supabaseAnonKey: 'anon.key' };

const row = (patch: Partial<FeedArticleRow> = {}): FeedArticleRow => ({
  article_id: 'a1',
  source_id: 's1',
  source_slug: 'ornek',
  source_name: 'Örnek',
  source_site_url: null,
  category: 'Araştırma',
  title: 'Başlık',
  author: null,
  canonical_url: 'https://ornek.com/1',
  published_at: '2026-08-20T06:41:00.000Z',
  fetched_at: '2026-08-20T06:41:00.000Z',
  language: 'en',
  excerpt: null,
  content_text: 'The original body.',
  content_quality: 'full',
  summary_tr: ['bir', 'iki', 'üç'],
  translation_tr: 'Türkçe metin.',
  translation_state: 'ready',
  summary_model: 'claude',
  summary_generated_at: '2026-08-20T07:00:00.000Z',
  summary_ready: true,
  ...patch,
});

describe('toSummary — the translation does not wait for the summary', () => {
  /**
   * Eski hâl `summary_ready` false görünce erken dönüyor ve `translationTr`'yi
   * `null` yapıyordu: satır bitmiş bir çeviri taşısa bile atılıyordu. Ekrandaki
   * karşılığı, çevirisi hazır bir haberde kapalı bir düğme ve "Çeviri
   * hazırlanıyor" yazısıydı.
   */
  it('keeps a finished translation while the summary is still pending', () => {
    const summary = toSummary(row({ summary_tr: null, summary_ready: false }));
    expect(summary?.translationState).toBe('ready');
    expect(summary?.translationTr).toBe('Türkçe metin.');
    expect(summary?.bullets).toEqual(['', '', '']);
  });

  it('and the segment toggle is then usable, which is the point', () => {
    const article = toArticle(row({ summary_tr: null, summary_ready: false }));
    expect(segmentState(article, article.summary)).toEqual({ visible: true, enabled: true });
    expect(bodyFor(article, article.summary, 'tr').text).toBe('Türkçe metin.');
  });

  /**
   * Ters yön, ve aynı sınıftan: bayrak "hazır" derken metin yoksa düğme
   * açılıyordu. Kullanıcı basıyor, `bodyFor` sessizce orijinale düşüyor, ve
   * "Çeviri" düğmesi İngilizce metin gösteriyordu.
   */
  it('does not call a translation ready when there is no text behind the flag', () => {
    const summary = toSummary(row({ translation_tr: null }));
    expect(summary?.translationState).toBe('pending');
    expect(summary?.translationTr).toBeNull();
  });

  it('treats whitespace as no translation at all', () => {
    expect(toSummary(row({ translation_tr: '   ' }))?.translationState).toBe('pending');
  });

  it('a Turkish article is still not_required, summary or no summary', () => {
    expect(toSummary(row({ language: 'tr' }))?.translationState).toBe('not_required');
    expect(
      toSummary(row({ language: 'tr', summary_tr: null, summary_ready: false }))?.translationState,
    ).toBe('not_required');
    expect(toSummary(row({ language: 'tr' }))?.translationTr).toBeNull();
  });

  it('honours the server saying not_required on an English row', () => {
    const summary = toSummary(row({ translation_state: 'not_required' }));
    expect(summary?.translationState).toBe('not_required');
    expect(summary?.translationTr).toBeNull();
  });

  it('still carries the bullets when the summary is ready', () => {
    expect(toSummary(row())?.bullets).toEqual(['bir', 'iki', 'üç']);
  });
});

describe('hasSummary — "a summary object" is not "a summary"', () => {
  const make = (bullets: [string, string, string]): ArticleSummary => ({
    bullets,
    translationTr: null,
    translationState: 'pending',
  });

  it('is false for the placeholder toSummary builds for a pending row', () => {
    expect(hasSummary(make(['', '', '']))).toBe(false);
  });

  it('is false for undefined', () => {
    expect(hasSummary(undefined)).toBe(false);
  });

  it('is false when the bullets are only whitespace', () => {
    expect(hasSummary(make(['  ', '\n', '']))).toBe(false);
  });

  it('is true as soon as one bullet has content', () => {
    expect(hasSummary(make(['bir', '', '']))).toBe(true);
  });

  it('agrees with what the screen can actually draw', () => {
    const article = toArticle(row()) as Article;
    expect(hasSummary(article.summary)).toBe(true);
    const pendingArticle = toArticle(row({ summary_tr: null, summary_ready: false }));
    expect(hasSummary(pendingArticle.summary)).toBe(false);
  });
});

describe('requestEnrichment — a body that carries a summary is an answer', () => {
  const stub = (body: unknown, status = 200) => {
    const fetchImpl = (async () => {
      const text = JSON.stringify(body);
      return {
        ok: status >= 200 && status < 300,
        status,
        text: async () => text,
      } as unknown as Response;
    }) as unknown as typeof fetch;
    return createSupabaseEnrichmentRepository({ fetchImpl, config: CONFIG });
  };

  /**
   * Sunucunun hangi adı kullandığını buradan göremiyoruz — ve görmemize gerek
   * yok. Üç madde geldiyse cevap gelmiştir. Eski koşul `status === 'ready'`
   * olduğu için bu gövde "tanınmayan" sayılıp `queued`a düşüyordu.
   */
  it('accepts a summary announced under a status string we have never seen', async () => {
    const result = await stub({
      status: 'already_enriched',
      summary: { bullets: ['bir', 'iki', 'üç'], translation_tr: 'Türkçe', translation_state: 'ready' },
    }).requestEnrichment('a1');
    if (!result.ok || result.data.status !== 'ready') throw new Error('expected ready');
    expect(result.data.summary.bullets).toEqual(['bir', 'iki', 'üç']);
    expect(result.data.summary.translationTr).toBe('Türkçe');
  });

  it('still accepts the documented ready body unchanged', async () => {
    const result = await stub({
      status: 'ready',
      summary: { bullets: ['a', 'b', 'c'], translation_tr: null, translation_state: 'not_required' },
    }).requestEnrichment('a1');
    if (!result.ok || result.data.status !== 'ready') throw new Error('expected ready');
    expect(result.data.summary.translationState).toBe('not_required');
  });

  /**
   * `unavailable` özetten önce bakılıyor ve öyle kalmalı: sunucu bakıp
   * "özetlenecek gövde yok" diyorsa, boş bir `summary` alanı bunu bozmamalı.
   */
  it('does not let an empty summary field turn unavailable into ready', async () => {
    const result = await stub({
      status: 'unavailable',
      reason: 'no_content',
      summary: { bullets: ['', '', ''] },
    }).requestEnrichment('a1');
    if (!result.ok) throw new Error('expected ok');
    expect(result.data.status).toBe('unavailable');
  });

  it('a queued body with no bullets is still queued', async () => {
    const result = await stub({ status: 'queued', reason: 'no_api_key' }).requestEnrichment('a1');
    if (!result.ok) throw new Error('expected ok');
    expect(result.data).toEqual({ status: 'queued', reason: 'no_api_key' });
  });

  /**
   * Cihaz logu bu yüzden teşhis edilemiyordu: sekiz yoklamanın sekizi de aynı
   * cümleyi yazıp sunucunun ne dediğini taşımıyordu. Gövdenin kendisi
   * yazılmıyor — içinde makale metni olabilir — ama durum kodu, `status` alanı
   * ve üst düzey anahtarlar yazılıyor.
   */
  it('names the status and the keys it did not recognise', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const result = await stub({ status: 'weird', detail: 'x', request_id: 'r1' }).requestEnrichment(
        'a1',
      );
      if (!result.ok) throw new Error('expected ok');
      expect(result.data.status).toBe('queued');
      const message = warn.mock.calls.map((call) => String(call[0])).join('\n');
      expect(message).toContain('unrecognised body');
      expect(message).toContain('"weird"');
      expect(message).toContain('HTTP 200');
      expect(message).toContain('detail');
      expect(message).toContain('request_id');
    } finally {
      warn.mockRestore();
    }
  });
});

/**
 * Kablonun üstündeki gerçek gövde.
 *
 * Fikstür uydurma değil: `supabase/functions/request-enrichment/index.ts`'in
 * `status === 'ready'` dalından birebir kopyalandı. Alan adı **`summary_tr`** —
 * istemci ise `summary.bullets` okuyordu, yani sunucunun her `ready` cevabı
 * "tanınmayan gövde" sayılıp `queued`a düşüyordu. Cihazdaki
 * "returned an unrecognised body" satırlarının tamamı bu.
 *
 * Kaynak uygulamada (`follow-ai`) da aynı uyuşmazlık var; port onu sadakatle
 * taşımış. Yani bu bir port regresyonu değil, taşınan bir hata.
 */
describe('requestEnrichment — the body the deployed function actually sends', () => {
  const stub = (body: unknown, status = 200) => {
    const fetchImpl = (async () => {
      const text = JSON.stringify(body);
      return {
        ok: status >= 200 && status < 300,
        status,
        text: async () => text,
      } as unknown as Response;
    }) as unknown as typeof fetch;
    return createSupabaseEnrichmentRepository({ fetchImpl, config: CONFIG });
  };

  /** request-enrichment/index.ts, `result.status === 'ready'` dalı. */
  const READY_BODY = {
    status: 'ready',
    summary: {
      article_id: 'aa201139-ae37-4633-a0b3-67e7e4e16753',
      summary_tr: ['Birinci madde', 'İkinci madde', 'Üçüncü madde'],
      translation_tr: 'Türkçe çeviri.',
      translation_state: 'ready',
      model: 'claude-sonnet-4',
      prompt_version: 3,
    },
    client_request_id: '7f6b7f0a-1f2e-4a3b-8c4d-5e6f70819293',
  };

  it('reads summary_tr, which is the field the server sends', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const result = await stub(READY_BODY).requestEnrichment(
        'aa201139-ae37-4633-a0b3-67e7e4e16753',
      );
      if (!result.ok || result.data.status !== 'ready') {
        throw new Error(`expected ready, got ${result.ok ? result.data.status : 'an error'}`);
      }
      expect(result.data.summary.bullets).toEqual(['Birinci madde', 'İkinci madde', 'Üçüncü madde']);
      expect(result.data.summary.translationTr).toBe('Türkçe çeviri.');
      expect(result.data.summary.translationState).toBe('ready');
      // Ve hiçbir şey "tanınmadı" diye uyarılmadı.
      expect(warn.mock.calls.map((call) => String(call[0])).join('\n')).not.toContain(
        'unrecognised body',
      );
    } finally {
      warn.mockRestore();
    }
  });

  it('drops the translation when the server says not_required', async () => {
    const result = await stub({
      ...READY_BODY,
      summary: { ...READY_BODY.summary, translation_state: 'not_required' },
    }).requestEnrichment('a1');
    if (!result.ok || result.data.status !== 'ready') throw new Error('expected ready');
    expect(result.data.summary.translationState).toBe('not_required');
    expect(result.data.summary.translationTr).toBeNull();
  });

  /** 202 + `poll_after_seconds`, anahtarsız kurulumun normal cevabı. */
  it('still reads the queued body the function sends alongside it', async () => {
    const result = await stub(
      {
        status: 'queued',
        poll_after_seconds: 120,
        reason: 'no_api_key',
        client_request_id: '7f6b7f0a-1f2e-4a3b-8c4d-5e6f70819293',
      },
      202,
    ).requestEnrichment('a1');
    if (!result.ok) throw new Error('expected ok');
    expect(result.data).toEqual({ status: 'queued', reason: 'no_api_key' });
  });

  /** Ve `unavailable` gövdesi, yine fonksiyonun kaynağından. */
  it('still reads the unavailable body', async () => {
    const result = await stub({
      status: 'unavailable',
      reason: 'no_content',
      client_request_id: '7f6b7f0a-1f2e-4a3b-8c4d-5e6f70819293',
    }).requestEnrichment('a1');
    if (!result.ok) throw new Error('expected ok');
    expect(result.data).toEqual({ status: 'unavailable', reason: 'no_content' });
  });
});
