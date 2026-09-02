import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient, type QueryKey } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import React, { useMemo, type ReactNode } from 'react';

import { QUERY_KEY_VERSION } from '../data-access/queryKeys';
import { REPOSITORY_CONTRACT_VERSION } from '../data-access/repositories';
import { KV_KEYS, kv, type KvStore } from '../storage/kv';

/**
 * Server-state ownership: TanStack Query owns the lifecycle, the kv store owns the
 * last usable snapshot (arch-001 §4). The cache is restored **before** the first
 * fetch, so an offline launch renders yesterday's feed immediately and marks it
 * stale rather than showing an empty screen.
 */

/** Seven days — arch-001 §4's retention target for the offline snapshot. */
export const MAX_CACHE_AGE_MS = 7 * 24 * 60 * 60 * 1000;
/** Cap on persisted feed articles, so the blob cannot grow without bound. */
export const MAX_PERSISTED_FEED_ARTICLES = 200;

/**
 * Bumping this throws away everything persisted. It includes the repository
 * contract version, so a DTO shape change invalidates the cache automatically
 * instead of hydrating the wrong type.
 */
export const CACHE_BUSTER = `kyk-gundem-v1-repo${REPOSITORY_CONTRACT_VERSION}`;

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Content changes on a 15-minute ingestion cycle; a shorter stale time
        // would refetch the same rows on every screen focus.
        staleTime: 5 * 60 * 1000,
        gcTime: MAX_CACHE_AGE_MS,
        retry: 1,
        refetchOnWindowFocus: false,
      },
    },
  });
}

/** `AsyncStorage`-compatible façade over the kv adapter. */
export const asyncStorageFromKv = (storage: KvStore) => ({
  getItem: (key: string) => storage.getItem(key),
  setItem: (key: string, value: string) => storage.setItem(key, value),
  removeItem: (key: string) => storage.removeItem(key),
});

/**
 * Trim a feed page's items before the cache is written.
 *
 * İki kez bozuktu ve ikisi de kendi testinden gizlenmişti:
 *
 * 1. **Hiç çağrılmıyordu.** `dehydrateOptions`ta yalnızca `shouldDehydrateQuery`
 *    vardı; yukarıdaki yorum "burada uygulanıyor" diyordu ve uygulayan yoktu.
 *    Tek çağıran kendi birim testiydi.
 * 2. **Yanlış şekle bakıyordu.** `page.data.items` — oysa gerçek sayfa
 *    `Page<Article>`, yani `{items, nextCursor, hasMore}`. Testin fikstürü de
 *    aynı uydurma şekli kuruyordu, o yüzden yeşildi: sayaç hep 0 kalıyor,
 *    fonksiyon hiçbir şeyi kesmiyordu.
 *
 * Sonuç, sınırsız büyüyen bir çevrimdışı blob'du. `serializeData` olarak
 * bağlandı ve fikstür artık gerçek depodan geliyor
 * (`src/__tests__/integration.test.tsx`).
 */
export function capPersistedFeed(data: unknown): unknown {
  if (
    typeof data === 'object' &&
    data !== null &&
    'pages' in data &&
    Array.isArray((data as { pages: unknown[] }).pages)
  ) {
    const pages = (data as { pages: unknown[]; pageParams?: unknown[] }).pages;
    let kept = 0;
    const trimmed: unknown[] = [];
    for (const page of pages) {
      if (kept >= MAX_PERSISTED_FEED_ARTICLES) break;
      trimmed.push(page);
      const items = (page as { items?: unknown[] } | null)?.items;
      kept += Array.isArray(items) ? items.length : 0;
    }
    if (trimmed.length !== pages.length) {
      return { ...(data as object), pages: trimmed, pageParams: (data as { pageParams?: unknown[] }).pageParams?.slice(0, trimmed.length) };
    }
  }
  return data;
}

/** Only our own versioned keys are persisted; anything else stays in memory. */
export const shouldDehydrateQuery = (queryKey: QueryKey): boolean =>
  Array.isArray(queryKey) && queryKey[0] === QUERY_KEY_VERSION;

/**
 * Yazma kısması: iki saniyede en fazla bir blob. Sonsuz akışta her sayfa
 * eklendiğinde tüm önbelleği yeniden serileştirmek pahalı.
 */
export const PERSIST_THROTTLE_MS = 2_000;

/**
 * Kalıcılık seçenekleri bileşenin dışında kuruluyor.
 *
 * Sebebi ölçüldü: `useMemo`nun içinde kaldıkları sürece bir test onları ancak
 * kalıcılaştırıcının kısması geçtikten sonra, yazılmış blob üzerinden
 * görebiliyor — ve o yarış "ilk anlık görüntü küçüktü" diye yeşil veriyor,
 * sınır uygulanmasa bile. Dışarı alınınca `dehydrate()` doğrudan bu
 * seçeneklerle çağrılabiliyor ve iddia kesin oluyor.
 *
 * `throttleMs` de aynı sebeple dışarıda: varsayılanla bir test unmount'tan
 * sonra iki saniyelik bir zamanlayıcı bırakıyor ve Jest işçiyi zorla
 * kapatıyor ("failed to exit gracefully") — ölçüldü.
 */
export function persistOptionsFor(storage: KvStore, throttleMs: number = PERSIST_THROTTLE_MS) {
  return {
    persister: createAsyncStoragePersister({
      storage: asyncStorageFromKv(storage),
      key: KV_KEYS.queryCache,
      throttleTime: throttleMs,
    }),
    maxAge: MAX_CACHE_AGE_MS,
    buster: CACHE_BUSTER,
    dehydrateOptions: {
      shouldDehydrateQuery: (query: { queryKey: QueryKey; state: { status: string } }) =>
        query.state.status === 'success' && shouldDehydrateQuery(query.queryKey),
      // Sınırı uygulayan satır. Bu olmadan `capPersistedFeed` yazılmış ama
      // bağlanmamış bir fonksiyon.
      serializeData: capPersistedFeed,
    },
  };
}

export function QueryProvider({
  children,
  client,
  storage = kv,
  throttleMs = PERSIST_THROTTLE_MS,
}: {
  children: ReactNode;
  client?: QueryClient;
  storage?: KvStore;
  /** Test dikişi — `client` ve `storage` ile aynı sebeple burada. */
  throttleMs?: number;
}) {
  const queryClient = useMemo(() => client ?? createQueryClient(), [client]);

  const persistOptions = useMemo(
    () => persistOptionsFor(storage, throttleMs),
    [storage, throttleMs],
  );

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={persistOptions}
      onSuccess={() => {
        // Restoration finished; queries may now fetch. Paused mutations are
        // resumed by P9 once there are any.
      }}
    >
      {children}
    </PersistQueryClientProvider>
  );
}
