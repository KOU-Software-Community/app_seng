import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { env } from '../config/env';
import { useRepositories } from '../data-access/hooks';
import { queryKeys } from '../data-access/queryKeys';
import { kv, KV_KEYS, type KvStore } from '../storage/kv';
import {
  emptyBudget,
  planWarmup,
  warmDayKey,
  WARM_SPACING_MS,
  type WarmBudget,
  type WarmCandidate,
} from './warmup';

/**
 * Akış ekrana gelir gelmez, özeti olmayan en yeni birkaç haberin
 * zenginleştirmesini arka planda başlatır.
 *
 * Neden gerekli: sunucudaki iş **talep güdümlü**. Haber çekimi özet işi
 * yaratmıyor; işi yaratan şey bir istemcinin `request-enrichment` çağırması, ve
 * onu işleyen worker iki dakikada bir koşuyor. Yani bu çağrı olmadan bir haberi
 * ilk açan kişi her seferinde bekliyor.
 *
 * Cevap gelirse önbelleğe yazılıyor: kullanıcı habere dokunduğunda
 * `useEnrichment` aynı anahtarı bulup hiç ağa çıkmıyor. `queued` yazılmıyor —
 * o bir cevap değil, "bekle" demek; yazılsaydı ekran ısıtmanın bıraktığı eski
 * "kuyrukta"yı gösterip kendi yoklamasına oradan başlardı.
 *
 * Hiçbir hata yüzeye çıkmıyor. Bu bir ön yükleme: başarısız olması kullanıcının
 * göreceği bir şey değil, çünkü ekran zaten kendi isteğini yapabiliyor.
 */
export function useEnrichmentWarmup(
  articles: readonly WarmCandidate[],
  options: {
    enabled?: boolean;
    /** Test tohumu. */
    storage?: KvStore;
    spacingMs?: number;
  } = {},
): void {
  const client = useQueryClient();
  const repos = useRepositories();

  // Bütçe bir kez okunuyor ve oturum boyunca burada taşınıyor: her akış
  // yüklenişinde diske gitmek, kararı diskin hızına bağlamak olurdu.
  const budgetRef = useRef<WarmBudget | null>(null);
  // Aynı anda tek tur. Sonsuz kaydırma yeni sayfa getirdiğinde etki yeniden
  // çalışıyor ve önceki tur hâlâ sürüyor olabilir.
  const runningRef = useRef(false);

  const enabled = options.enabled !== false;
  const spacing = options.spacingMs ?? WARM_SPACING_MS;
  const storage = options.storage ?? kv;

  useEffect(() => {
    // Fixture modunda ısıtılacak bir sunucu yok; yapılandırılmamış modda her
    // çağrı zaten aynı hatayı döndürür.
    if (!enabled || env.mode !== 'supabase') return;
    if (articles.length === 0 || runningRef.current) return;

    let cancelled = false;
    runningRef.current = true;

    void (async () => {
      try {
        const loaded = budgetRef.current ?? (await readWarmBudget(storage));
        if (cancelled) return;

        const plan = planWarmup({ articles, budget: loaded, now: new Date() });
        budgetRef.current = plan.budget;
        if (plan.ids.length === 0) return;

        // Bütçe **istekten önce** yazılıyor. Uygulama tur ortasında kapanırsa
        // yazılmamış bir bütçe, bir sonraki açılışta aynı haberleri yeniden
        // ısıtmak demek olurdu — sunucudaki sayaç ise onları zaten saymış olur.
        await writeWarmBudget(storage, plan.budget);

        for (const id of plan.ids) {
          if (cancelled) return;
          await warmOne(id);
          if (cancelled) return;
          await delay(spacing);
        }
      } finally {
        runningRef.current = false;
      }
    })();

    async function warmOne(id: string): Promise<void> {
      const result = await repos.enrichment.requestEnrichment(id);

      if (!result.ok) {
        // Sessiz kalmıyor ama yüzeye de çıkmıyor: hız sınırına takılmak
        // tavanın ısıtmaya fazla geldiği anlamına gelir ve bunu yalnızca log
        // söyleyebilir.
        console.warn(`[enrichment/warmup] ${id}: ${result.error.code} — ${result.error.message}`);
        return;
      }
      if (result.data.status === 'queued') return;
      client.setQueryData(queryKeys.enrichment(id), result.data);
    }

    return () => {
      cancelled = true;
    };
    // `articles` FeedView'da useMemo'lu; kimliği ancak yeni sayfa gelince değişiyor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles, enabled, spacing]);
}

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const isBudget = (value: unknown): value is WarmBudget =>
  typeof value === 'object' &&
  value !== null &&
  typeof (value as WarmBudget).day === 'string' &&
  Array.isArray((value as WarmBudget).ids) &&
  (value as WarmBudget).ids.every((id) => typeof id === 'string');

export async function readWarmBudget(storage: KvStore = kv): Promise<WarmBudget> {
  const fallback = emptyBudget(warmDayKey(new Date()));
  const raw = await storage.getItem(KV_KEYS.warmBudget);
  if (raw === null) return fallback;
  try {
    const parsed: unknown = JSON.parse(raw);
    return isBudget(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export const writeWarmBudget = (storage: KvStore, budget: WarmBudget): Promise<void> =>
  storage.setItem(KV_KEYS.warmBudget, JSON.stringify(budget));
