import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook, waitFor } from '@testing-library/react-native';

import { MAX_RECENT_SEARCHES } from '../store';
import * as store from '../store';
import { useRecentSearches, useSavedArticles } from '../hooks';

/**
 * Cihaz durumu kancaları — gerçek depo, gerçek AsyncStorage mock'u.
 *
 * `user-state.test.ts` saf depo fonksiyonlarını sınıyor ve hepsi yeşildi.
 * Kaçırdığı şey **iki uygulama arasındaki fark**: kanca ekran için iyimser bir
 * kopya tutuyor ve o kopyanın kuralları elle bir kez daha yazılmıştı. İki
 * uygulamayı ayrı ayrı sınayan iki test, ayrıştıklarını hiçbir zaman göremez;
 * bu dosya ikisini aynı testte karşılaştırıyor.
 */

jest.mock('../store', () => {
  const actual = jest.requireActual('../store');
  return { ...actual, getSaved: jest.fn(actual.getSaved) };
});

const getSavedMock = store.getSaved as jest.MockedFunction<typeof store.getSaved>;

beforeEach(async () => {
  await AsyncStorage.clear();
  getSavedMock.mockClear();
});

describe('useRecentSearches — the hook and the disk agree', () => {
  /**
   * Ölçülen sapma: kanca `MAX_RECENT_SEARCHES`i hiç uygulamıyordu. Ekranda 15
   * arama duruyor, diskte 10 duruyordu ve fark yalnızca uygulama yeniden
   * açıldığında ortaya çıkıyordu — yani kullanıcının gördüğü hata "listemden
   * beş arama kayboldu", sebebi görünmeden.
   */
  it('caps the in-memory list exactly where the persisted one is capped', async () => {
    const { result, unmount } = await renderHook(() => useRecentSearches());
    await waitFor(() => expect(result.current.isReady).toBe(true));

    for (let i = 0; i < MAX_RECENT_SEARCHES + 5; i += 1) {
      await act(async () => {
        result.current.pushRecentSearch(`arama-${i}`);
      });
    }

    expect(result.current.recentSearches).toHaveLength(MAX_RECENT_SEARCHES);
    await waitFor(async () =>
      expect(await store.getRecentSearches()).toEqual(result.current.recentSearches),
    );
    await unmount();
  }, 20000);

  /**
   * Noktalı/noktasız I. `toLowerCase()` Türkçeyi, `toLocaleLowerCase('tr')`
   * İngilizceyi kaçırıyor; ikisi de bu listede var.
   */
  it('treats İstanbul/istanbul and OpenAI/openai as one search each', async () => {
    const { result, unmount } = await renderHook(() => useRecentSearches());
    await waitFor(() => expect(result.current.isReady).toBe(true));

    for (const query of ['istanbul', 'openai', 'İstanbul', 'OpenAI']) {
      await act(async () => {
        result.current.pushRecentSearch(query);
      });
    }

    expect(result.current.recentSearches).toEqual(['OpenAI', 'İstanbul']);
    await waitFor(async () =>
      expect(await store.getRecentSearches()).toEqual(result.current.recentSearches),
    );
    await unmount();
  }, 20000);

  it('ignores a blank query on both sides', async () => {
    const { result, unmount } = await renderHook(() => useRecentSearches());
    await waitFor(() => expect(result.current.isReady).toBe(true));
    await act(async () => {
      result.current.pushRecentSearch('   ');
    });
    expect(result.current.recentSearches).toEqual([]);
    expect(await store.getRecentSearches()).toEqual([]);
    await unmount();
  }, 20000);
});

describe('useSavedArticles', () => {
  it('round-trips a save through storage to a fresh mount', async () => {
    const first = await renderHook(() => useSavedArticles());
    await waitFor(() => expect(first.result.current.isReady).toBe(true));
    await act(async () => {
      first.result.current.setArticleSaved('a1', true);
    });
    expect(first.result.current.isSaved('a1')).toBe(true);
    await waitFor(async () => expect(await store.getSaved()).toHaveLength(1));
    await first.unmount();

    const second = await renderHook(() => useSavedArticles());
    await waitFor(() => expect(second.result.current.isReady).toBe(true));
    expect(second.result.current.isSaved('a1')).toBe(true);
    await second.unmount();
  }, 20000);

  /**
   * Yükleme reddedilirse ekran **hazır** olmalı, varsayılanla.
   *
   * `useLoaded`ın `.catch`i yoktu: reddedilen bir okuma `isReady`yi sonsuza
   * kadar false bırakıyor, ekranda bitmeyen bir iskelet ve konsolda
   * yakalanmamış bir promise reddi oluyordu. Bugün `kv.ts` her okumayı yuttuğu
   * için bu dal üretimde tetiklenmiyor — ama tetiklenmeyen bir dal, yazılmamış
   * bir daldır; burada zorla tetikleniyor.
   */
  it('becomes ready with the fallback when the read rejects', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    getSavedMock.mockRejectedValueOnce(new Error('depo yandı'));

    const { result, unmount } = await renderHook(() => useSavedArticles());
    await waitFor(() => expect(result.current.isReady).toBe(true), { timeout: 5000 });
    expect(result.current.saved).toEqual([]);
    expect(warn).toHaveBeenCalled();

    warn.mockRestore();
    await unmount();
  }, 20000);
});
