import { act, renderHook, waitFor } from '@testing-library/react-native';
import React, { type ReactNode } from 'react';

import { useFeed } from '../gundem/data-access/hooks';
import { FEED_VIEW } from '../gundem/data-access/supabase/client';
import { toArticle, type FeedArticleRow } from '../gundem/data-access/supabase/mapper';
import { createSupabaseFeedRepository } from '../gundem/data-access/supabase/repositories';
import { KV_KEYS, type KvStore } from '../gundem/storage/kv';
import {
  MAX_PERSISTED_FEED_ARTICLES,
  QueryProvider,
  createQueryClient,
  persistOptionsFor,
} from '../gundem/providers/QueryProvider';
import { dehydrate, type QueryClient } from '@tanstack/react-query';
import type { Repositories } from '../gundem/data-access/repositories';

/**
 * Tümleme testi: sahte bir PostgREST'ten ekranın önündeki kancaya kadar.
 *
 * `hooks.ts` bu dosyayı adıyla anıyor ("Measured with the fake PostgREST in
 * `src/__tests__/integration.test.tsx`") ve dosya **yoktu** — bu deponun kendi
 * kural defterindeki hatanın aynısı: bir davranışı anlatan yorum, davranış
 * değildir. Burada artık var, ve o ölçümü gerçekten yapıyor.
 *
 * Sahte olan tek katman ağ. Depo gerçek, imleç gerçek, `keysetFilter` gerçek,
 * `QueryProvider` gerçek, kalıcılaştırıcı gerçek. Yani buradaki bir kırmızı,
 * katmanlardan birinin diğerine yalan söylediği anlamına geliyor — tek tek
 * hepsinin yeşil olduğu yerde görünmeyen tam da bu.
 */

// ---------------------------------------------------------------------------
// Sahte PostgREST
// ---------------------------------------------------------------------------

type Filters = {
  eq: [string, unknown][];
  in: [string, unknown[]][];
  or: string[];
  limit: number;
};

const row = (index: number): FeedArticleRow => {
  // Yayın zamanı index ile **azalıyor** (0 en yeni), ve her zaman damgası
  // **iki** kayıtta paylaşılıyor. Paylaşım kasıtlı: imleç eşitlikte
  // `article_id.lt` dalına düşüyor ve bir sayfa sınırı ikilinin ortasına
  // denk geldiğinde yalnızca o dal doğru cevabı veriyor. Hepsi ayrı zaman
  // damgası taşısaydı bu test o dalı hiç çalıştırmazdı.
  const t = 24 * 60 - 1 - Math.floor(index / 2);
  const minute = String(t % 60).padStart(2, '0');
  const hour = String(Math.floor(t / 60)).padStart(2, '0');
  return {
    article_id: `a${String(1000 - index).padStart(4, '0')}`,
    source_id: index % 2 === 0 ? 's-even' : 's-odd',
    source_slug: 'ornek',
    source_name: 'Örnek Kaynak',
    source_site_url: 'https://ornek.com',
    category: index % 3 === 0 ? 'Araştırma' : 'Ürün',
    title: `Haber ${index}`,
    author: null,
    canonical_url: `https://ornek.com/${index}`,
    published_at: `2026-08-20T${hour}:${minute}:00.000Z`,
    fetched_at: `2026-08-20T${hour}:${minute}:00.000Z`,
    language: 'tr',
    excerpt: null,
    content_text: null,
    content_quality: null,
    summary_tr: null,
    translation_tr: null,
    translation_state: null,
    summary_model: null,
    summary_generated_at: null,
    summary_ready: false,
  };
};

/** `published_at.lt."X",and(published_at.eq."X",article_id.lt."Y")` */
const parseKeyset = (filter: string): { publishedAt: string; id: string } | null => {
  const match = /published_at\.lt\."([^"]+)",and\(published_at\.eq\."[^"]+",article_id\.lt\."([^"]+)"\)/.exec(
    filter,
  );
  return match ? { publishedAt: match[1], id: match[2] } : null;
};

/**
 * PostgREST'in yaptığını yapıyor: süz, sırala, kes. Depo katmanının ürettiği
 * sorguyu *yorumluyor* — kaydetmiyor. Fark önemli: kaydeden bir sahte, yanlış
 * bir `or` dizesini de memnuniyetle kabul eder ve sayfa 2'nin bir kaydı
 * atladığını hiç göstermez.
 */
function fakePostgrest(rows: FeedArticleRow[]) {
  const requests: Filters[] = [];
  let failNext: unknown = null;

  const run = (f: Filters) => {
    if (failNext) {
      const error = failNext;
      failNext = null;
      return { data: null, error };
    }
    let out = [...rows];
    for (const [column, value] of f.eq) {
      out = out.filter((r) => (r as unknown as Record<string, unknown>)[column] === value);
    }
    for (const [column, values] of f.in) {
      out = out.filter((r) => values.includes((r as unknown as Record<string, unknown>)[column]));
    }
    out.sort((a, b) =>
      a.published_at === b.published_at
        ? b.article_id < a.article_id
          ? -1
          : b.article_id > a.article_id
            ? 1
            : 0
        : a.published_at < b.published_at
          ? 1
          : -1,
    );
    for (const filter of f.or) {
      const key = parseKeyset(filter);
      if (!key) throw new Error(`fake PostgREST cannot read this or(): ${filter}`);
      out = out.filter(
        (r) =>
          r.published_at < key.publishedAt ||
          (r.published_at === key.publishedAt && r.article_id < key.id),
      );
    }
    return { data: out.slice(0, f.limit), error: null };
  };

  const client = {
    from(table: string) {
      if (table !== FEED_VIEW) throw new Error(`unexpected table ${table}`);
      const f: Filters = { eq: [], in: [], or: [], limit: Number.MAX_SAFE_INTEGER };
      requests.push(f);
      const builder: Record<string, unknown> = {
        select: () => builder,
        order: () => builder,
        limit(n: number) {
          f.limit = n;
          return builder;
        },
        eq(column: string, value: unknown) {
          f.eq.push([column, value]);
          return builder;
        },
        in(column: string, values: unknown[]) {
          f.in.push([column, values]);
          return builder;
        },
        or(filter: string) {
          f.or.push(filter);
          return builder;
        },
        then: (resolve: (value: unknown) => unknown) => Promise.resolve(run(f)).then(resolve),
      };
      return builder;
    },
  };

  return {
    requests,
    client,
    failOnce(error: unknown) {
      failNext = error;
    },
  };
}

// ---------------------------------------------------------------------------
// Harness
// ---------------------------------------------------------------------------

function fakeKv(): KvStore & { data: Map<string, string> } {
  const data = new Map<string, string>();
  return {
    data,
    getItem: async (key) => data.get(key) ?? null,
    setItem: async (key, value) => {
      data.set(key, value);
    },
    removeItem: async (key) => {
      data.delete(key);
    },
  };
}

/**
 * Depo kümesi testin kurduğu tek yerden geliyor. `getRepositories` mock'lanıyor
 * çünkü gerçek fabrika `env.mode`a bakıyor ve testte ortam yapılandırılmamış —
 * mock'lanan şey **fabrika**, depo değil: `useFeed`'in çağırdığı depo gerçek
 * Supabase deposu.
 */
// `mock` öneki zorunlu: `jest.mock` fabrikası kapsam dışı bir değişkene
// ancak bu adla erişebiliyor.
let mockRepositories: Repositories | null = null;
jest.mock('../gundem/data-access/index', () => {
  const actual = jest.requireActual('../gundem/data-access/index');
  return {
    ...actual,
    getRepositories: () => {
      if (!mockRepositories) throw new Error('test did not install repositories');
      return mockRepositories;
    },
  };
});

const install = (feed: ReturnType<typeof createSupabaseFeedRepository>) => {
  mockRepositories = { version: 1, mode: 'supabase', feed } as unknown as Repositories;
};

const clients: QueryClient[] = [];
afterEach(() => {
  // `gcTime` yedi gün: temizlenmezse Jest hiç çıkmıyor.
  for (const client of clients.splice(0)) client.clear();
  mockRepositories = null;
});

const wrapper = (storage: KvStore) => {
  const client = createQueryClient();
  clients.push(client);
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <QueryProvider client={client} storage={storage} throttleMs={0}>
      {children}
    </QueryProvider>
  );
  Wrapper.client = client;
  return Wrapper;
};

/**
 * Bir sayfa daha çek ve **geldiğini** bekle.
 *
 * `fetchNextPage()`i bekleyip `isFetchingNextPage`in false olmasını beklemek
 * yetmiyor: çağrı daha başlamadan da false. Ölçülen sonucu buydu — üç sayfa
 * istendi, testin gördüğü hâlâ 20 kayıttı ve iddia "atlama yok" olduğu için
 * bu, geçmesi gereken bir testin yanlış sebeple kırmızı olması demekti.
 * Sayılan şey sayfa sayısı: arttıysa sayfa gerçekten geldi.
 */
async function loadNextPage(result: { current: ReturnType<typeof useFeed> }): Promise<void> {
  const before = result.current.data?.pages.length ?? 0;
  await act(async () => {
    await result.current.fetchNextPage();
  });
  await waitFor(() => expect(result.current.data?.pages.length ?? 0).toBe(before + 1));
}

// ---------------------------------------------------------------------------

describe('feed pagination — repository, cursor and PostgREST filter together', () => {
  it('walks pages without repeating or skipping an article', async () => {
    const rows = Array.from({ length: 55 }, (_, i) => row(i));
    const pg = fakePostgrest(rows);
    install(createSupabaseFeedRepository(pg.client as never));

    const { result, unmount } = await renderHook(() => useFeed({ category: null }), {
      wrapper: wrapper(fakeKv()),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(result.current.hasNextPage).toBe(true));

    // Üç sayfa: sunucudaki satırların hepsi.
    for (let page = 0; page < 2; page += 1) await loadNextPage(result);

    const ids = result.current.data?.pages.flatMap((p) => p.items.map((a) => a.id)) ?? [];
    expect(ids.length).toBe(new Set(ids).size); // tekrar yok
    expect(ids.length).toBe(55); // atlama yok
    expect(ids).toEqual(rows.map((r) => toArticle(r).id)); // sıra da aynı

    // İkinci ve üçüncü istek gerçekten imleçle gitti — sahte PostgREST onu
    // yorumladı, saklamadı, yani "sayfa 2 doğru" iddiası ölçülmüş bir iddia.
    expect(pg.requests[0].or).toHaveLength(0);
    expect(pg.requests[1].or).toHaveLength(1);
    expect(pg.requests[2].or).toHaveLength(1);
    await unmount();
  }, 30000);

  it('passes the screen’s filters down to the query, not to a post-filter', async () => {
    const rows = Array.from({ length: 30 }, (_, i) => row(i));
    const pg = fakePostgrest(rows);
    install(createSupabaseFeedRepository(pg.client as never));

    const { result, unmount } = await renderHook(
      () => useFeed({ category: 'Araştırma', sourceIds: ['s-even'] }),
      { wrapper: wrapper(fakeKv()) },
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(pg.requests[0].eq).toContainEqual(['category', 'Araştırma']);
    expect(pg.requests[0].in).toContainEqual(['source_id', ['s-even']]);
    const items = result.current.data?.pages.flatMap((p) => p.items) ?? [];
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((a) => a.category === 'Araştırma')).toBe(true);
    await unmount();
  }, 30000);

  /**
   * `hooks.ts`'teki `READ_RETRY = 0` yorumunun ölçümü. postgrest-js zaten
   * kendi içinde yeniden deniyor; üstüne bir kat daha koymak kullanıcıya
   * ~24 saniyelik bir bekleme olarak dönüyordu.
   */
  it('spends exactly one repository call on a failed read', async () => {
    const pg = fakePostgrest([row(0)]);
    pg.failOnce({ message: 'boom', code: '500' });
    install(createSupabaseFeedRepository(pg.client as never));

    const { result, unmount } = await renderHook(() => useFeed(), { wrapper: wrapper(fakeKv()) });
    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 10000 });
    expect(pg.requests).toHaveLength(1);
    await unmount();
  }, 30000);
});

describe('persisted cache', () => {
  /**
   * `MAX_PERSISTED_FEED_ARTICLES` bir söz: çevrimdışı anlık görüntü sınırsız
   * büyümüyor. Söz iki kez tutulmuyordu — `capPersistedFeed` (a) sağlayıcıya
   * hiç bağlanmamıştı ve (b) `page.data.items`e bakıyordu, oysa gerçek sayfa
   * `{items, nextCursor, hasMore}`. Kendi birim testi de aynı uydurma şekli
   * kurduğu için yeşildi.
   *
   * Buradaki fikstür uydurma değil: satırlar gerçek Supabase deposundan geçip
   * gerçek `QueryClient`e giriyor, sonra **sağlayıcının kullandığı seçeneklerle**
   * dehydrate ediliyor. Kısmanın yazdığı blob'a bakmıyor: o yarış, sınır hiç
   * uygulanmasa bile "ilk anlık görüntü zaten küçüktü" diye yeşil veriyordu —
   * ölçüldü, tam olarak öyle oldu.
   */
  it('never dehydrates more feed articles than the cap', async () => {
    const rows = Array.from({ length: 300 }, (_, i) => row(i));
    const pg = fakePostgrest(rows);
    install(createSupabaseFeedRepository(pg.client as never));
    const storage = fakeKv();
    const Wrapper = wrapper(storage);

    const { result, unmount } = await renderHook(() => useFeed(), { wrapper: Wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    for (let page = 0; page < 14 && result.current.hasNextPage; page += 1) {
      await loadNextPage(result);
    }
    const loaded = result.current.data?.pages.flatMap((p) => p.items) ?? [];
    expect(loaded.length).toBeGreaterThan(MAX_PERSISTED_FEED_ARTICLES);

    const state = dehydrate(Wrapper.client, persistOptionsFor(storage).dehydrateOptions);
    const persisted = state.queries
      .flatMap((q) => (q.state.data as { pages?: { items?: unknown[] }[] } | undefined)?.pages ?? [])
      .flatMap((page) => page.items ?? []);

    expect(persisted.length).toBeGreaterThan(0);
    expect(persisted.length).toBeLessThanOrEqual(MAX_PERSISTED_FEED_ARTICLES);
    await unmount();
  }, 60000);

  /** Ve blob gerçekten diske de gidiyor — kısma dâhil, uçtan uca. */
  it('writes the capped snapshot through the persister', async () => {
    const rows = Array.from({ length: 40 }, (_, i) => row(i));
    const pg = fakePostgrest(rows);
    install(createSupabaseFeedRepository(pg.client as never));
    const storage = fakeKv();

    const { result, unmount } = await renderHook(() => useFeed(), { wrapper: wrapper(storage) });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    await waitFor(() => expect(storage.data.has(KV_KEYS.queryCache)).toBe(true), {
      timeout: 10000,
    });

    const blob = JSON.parse(storage.data.get(KV_KEYS.queryCache) as string) as {
      clientState: { queries: { state: { data?: { pages?: { items?: unknown[] }[] } } }[] };
    };
    const persisted = blob.clientState.queries
      .flatMap((q) => q.state.data?.pages ?? [])
      .flatMap((page) => page.items ?? []);
    expect(persisted).toHaveLength(20);
    await unmount();
  }, 30000);
});
