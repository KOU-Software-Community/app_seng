import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import React, { type ReactNode } from 'react';

import { ok, type Result } from '../../domain/errors';
import type { EnrichmentResult } from '../../domain/types';
import { queryKeys } from '../../data-access/queryKeys';
import { memoryStore } from '../../storage/kv';
import { useEnrichmentWarmup } from '../useEnrichmentWarmup';
import { WARM_BATCH, WARM_DAILY_CAP } from '../warmup';

/**
 * Isıtmanın kablo tarafı: doğru kimlikler isteniyor mu, cevap önbelleğe
 * giriyor mu, ve tavan iki ayrı "uygulama açılışı" arasında tutuyor mu.
 *
 * `env` taklit ediliyor çünkü Jest'te `__DEV__` true ve varsayılan mod `mock`;
 * ısıtma orada bilerek hiç çalışmıyor (ısıtılacak sunucu yok).
 */

jest.mock('../../config/env', () => ({
  env: { mode: 'supabase', supabaseUrl: 'https://p.supabase.co', supabaseAnonKey: 'anon', problem: null },
}));

const mockRequestEnrichment = jest.fn<Promise<Result<EnrichmentResult>>, [string]>();
jest.mock('../../data-access/index', () => ({
  getRepositories: () => ({
    enrichment: { requestEnrichment: (id: string) => mockRequestEnrichment(id) },
  }),
}));

const READY: EnrichmentResult = {
  status: 'ready',
  summary: { bullets: ['bir', 'iki', 'üç'], translationTr: null, translationState: 'not_required' },
};
const QUEUED: EnrichmentResult = { status: 'queued', reason: null };

const clients: QueryClient[] = [];
afterEach(() => {
  for (const client of clients.splice(0)) client.clear();
  mockRequestEnrichment.mockReset();
  void memoryStore.removeItem('v1:kyk.gundem.enrichment.warm_budget');
});

/** Her çağrı ayrı bir "uygulama açılışı"; depo paylaşılıyor, bellek değil. */
function mount(articles: { id: string; summaryReady: boolean }[]) {
  // gcTime 0 olamaz: gözlemcisi olmayan bir `setQueryData` girdisi anında
  // toplanır ve "önbelleğe yazdı mı" testi kendi kurulumu yüzünden kırmızı verir.
  // Zamanlayıcı sızmıyor — her istemci afterEach'te `clear()` ediliyor.
  const client = new QueryClient({ defaultOptions: { queries: { retry: false, gcTime: 30_000 } } });
  clients.push(client);
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  const result = renderHook(
    () => useEnrichmentWarmup(articles, { storage: memoryStore, spacingMs: 0 }),
    { wrapper },
  );
  return { client, result };
}

const rows = (count: number, from = 0) =>
  Array.from({ length: count }, (_, i) => ({ id: `a${from + i}`, summaryReady: false }));

describe('useEnrichmentWarmup', () => {
  it('özeti olmayan haberler için istek yolluyor, olanlar için yollamıyor', async () => {
    mockRequestEnrichment.mockResolvedValue(ok(QUEUED));

    await mount([
      { id: 'hazir', summaryReady: true },
      { id: 'bos1', summaryReady: false },
      { id: 'bos2', summaryReady: false },
    ]);

    await waitFor(() => expect(mockRequestEnrichment).toHaveBeenCalledTimes(2));
    expect(mockRequestEnrichment.mock.calls.map((c) => c[0])).toEqual(['bos1', 'bos2']);
  });

  /**
   * Isıtmanın asıl kazancı bu: cevap önbellekte olunca kullanıcı habere
   * dokunduğunda `useEnrichment` hiç ağa çıkmıyor.
   */
  it('hazır cevabı önbelleğe yazıyor', async () => {
    mockRequestEnrichment.mockResolvedValue(ok(READY));

    const { client } = await mount([{ id: 'a0', summaryReady: false }]);

    await waitFor(() =>
      expect(client.getQueryData(queryKeys.enrichment('a0'))).toEqual(READY),
    );
  });

  /**
   * `queued` bir cevap değil, "bekle" demek. Önbelleğe yazılsaydı ekran
   * ısıtmanın bıraktığı eski "kuyrukta"yı gösterip kendi yoklamasına oradan
   * başlardı.
   */
  it('kuyruktaki cevabı önbelleğe yazmıyor', async () => {
    mockRequestEnrichment.mockResolvedValue(ok(QUEUED));

    const { client } = await mount([{ id: 'a0', summaryReady: false }]);

    await waitFor(() => expect(mockRequestEnrichment).toHaveBeenCalledTimes(1));
    expect(client.getQueryData(queryKeys.enrichment('a0'))).toBeUndefined();
  });

  it('bir yüklenişte en fazla WARM_BATCH kadar istiyor', async () => {
    mockRequestEnrichment.mockResolvedValue(ok(QUEUED));

    await mount(rows(20));

    await waitFor(() => expect(mockRequestEnrichment).toHaveBeenCalledTimes(WARM_BATCH));
  });

  /**
   * Tavan diske yazılıyor, yani uygulamayı kapatıp açmak bütçeyi sıfırlamıyor.
   * Sunucudaki sayaç da sıfırlanmıyor — iki taraf aynı günü saymalı.
   */
  it('günlük tavan uygulama açılışları arasında tutuyor', async () => {
    mockRequestEnrichment.mockResolvedValue(ok(QUEUED));

    const launches = Math.ceil(WARM_DAILY_CAP / WARM_BATCH) + 2;
    for (let i = 0; i < launches; i += 1) {
      await mount(rows(WARM_BATCH, i * WARM_BATCH));
      await waitFor(() =>
        expect(mockRequestEnrichment.mock.calls.length).toBeGreaterThanOrEqual(
          Math.min(WARM_DAILY_CAP, (i + 1) * WARM_BATCH),
        ),
      );
    }

    expect(mockRequestEnrichment).toHaveBeenCalledTimes(WARM_DAILY_CAP);
  });

  it('bir istek başarısız olursa yüzeye çıkmıyor ve tur devam ediyor', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    mockRequestEnrichment
      .mockResolvedValueOnce({
        ok: false,
        error: { code: 'rate_limited', retryable: true, message: 'çok istek' },
      })
      .mockResolvedValue(ok(QUEUED));

    await mount(rows(2));

    await waitFor(() => expect(mockRequestEnrichment).toHaveBeenCalledTimes(2));
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('rate_limited'));
    warn.mockRestore();
  });
});
