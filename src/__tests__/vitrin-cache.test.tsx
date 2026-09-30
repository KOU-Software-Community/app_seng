import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, render, renderHook, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

import { toSlide, toSponsor } from '../vitrinSchema';

/**
 * Slider ve sponsorlar cihazdaki kopyayla açılıyor (`src/vitrinCache.ts`).
 *
 * Kopya modül içe aktarılınca okunuyor. Bu yüzden `vitrinCache`'i çeken her modül
 * `require` ile, depo doldurulduktan SONRA yükleniyor — dosyanın başında içe
 * aktarılsaydı okuma boş depoya yapılırdı. Yükleme test gövdesinde değil dosya
 * düzeyinde: soğuk dönüştürme önbelleğiyle (CI) ana sayfa ağacının dönüştürülmesi
 * testin 5 sn'lik süresini aşıyordu.
 *
 * Modül testleri `jest.isolateModulesAsync` ile her seferinde taze bir
 * `vitrinCache` alıyor, ama AsyncStorage taklidi ana kayıtla ORTAK: dosyanın başında
 * içe aktarıldığı için izole kayıt da aynı örneği buluyor. Her test okuduğu
 * anahtarları kendisi yazıyor; ana sayfa testlerinin kopyası o testlerden önce,
 * dosya yüklenirken okunmuş oluyor.
 *
 * Başarılı okuma yolu (`setX` + `saveCache`) burada sınanmıyor: Jest'te dinamik
 * `import('./firebase')` gerçek bir dinamik import olarak kalıyor ve reddediliyor
 * (`--experimental-vm-modules` yok), yani `jest.mock('../firebase')` o yola
 * ulaşamıyor. Okuma her zaman hata yolunda — ana sayfa testi bu yüzden aynı zamanda
 * çevrimdışı açılış.
 */

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    useRouter: () => ({ push: jest.fn(), navigate: jest.fn() }),
    useFocusEffect: (cb: () => void | (() => void)) => useEffect(cb, [cb]),
  };
});
// Ana sayfanın vitrin dışındaki kaynakları: boş ve hatasız.
jest.mock('../content', () => ({
  useContent: () => ({ events: [], archive: [], error: null, loading: false, refresh: jest.fn() }),
}));
jest.mock('../announcements', () => ({
  useAnnouncements: () => ({ announcements: [], error: null, loading: false, refresh: jest.fn() }),
  formatAnnouncementDate: () => '',
}));
jest.mock('../store', () => ({ useAppStore: () => ({ registrations: [] }) }));

const METRICS: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const SLIDES_KEY = 'kyk.vitrin.slides.v1';
const SPONSORS_KEY = 'kyk.vitrin.sponsors.v1';

const SLIDE = toSlide('s1', {
  title: 'Hackathon',
  meta: '18.00 · B Blok',
  image: 'https://ornek.supabase.co/storage/v1/object/public/foto/slides/s1/ab12.jpg',
  kicker: 'BUGUN',
  target: { type: 'url', url: 'https://ornek.com/etkinlik' },
  order: 1,
  endsAt: '2099-12-31',
})!;
const EXPIRED = toSlide('s0', {
  title: 'Geçen haftanın etkinliği',
  target: { type: 'event', id: 'e0' },
  order: 2,
  endsAt: '2020-01-01',
})!;
const SPONSOR = toSponsor('p1', {
  name: 'Acme Yazılım',
  sector: 'Yazılım',
  description: 'Kulübün destekçisi.',
  logo: 'https://ornek.supabase.co/storage/v1/object/public/foto/sponsors/p1/cd34.png',
  url: 'https://acme.ornek.com',
  eventIds: ['e1'],
  order: 1,
})!;

type Cache = typeof import('../vitrinCache');
type Storage = typeof AsyncStorage;

// `npm run typecheck` denetliyor, hiç çağrılmıyor: `saveCache`'in türü genişlerse
// bu yönerge "kullanılmıyor" diye düşer.
const yanlisTur = (cache: Cache) =>
  // @ts-expect-error — sponsor listesi slayt anahtarına yazılamaz
  cache.saveCache('slides', [SPONSOR]);

// Ana sayfa testlerinin cihazdaki kopyası. Taklit (`async-storage-mock`) yazmayı
// çağrı anında yapıyor; modüller bundan sonra yükleniyor, açılış okuması bunu görüyor.
void AsyncStorage.setItem(SLIDES_KEY, JSON.stringify([SLIDE, EXPIRED]));
void AsyncStorage.setItem(SPONSORS_KEY, JSON.stringify([SPONSOR]));
const { cacheReady } = require('../vitrinCache') as Cache;
const { useSlides } = require('../slides') as typeof import('../slides');
const { SponsorsProvider, useSponsors } = require('../sponsors') as typeof import('../sponsors');
const Home = (require('../../app/(tabs)/index') as typeof import('../../app/(tabs)/index')).default;

/** Taze bir modül kaydında depoyu doldurur, kopyayı yükler, `fn`'i çalıştırır. */
async function fresh(
  seed: Record<string, string>,
  fn: (cache: Cache, storage: Storage) => Promise<void>,
): Promise<void> {
  await jest.isolateModulesAsync(async () => {
    const storage = require('@react-native-async-storage/async-storage') as Storage;
    for (const [key, value] of Object.entries(seed)) await storage.setItem(key, value);
    await fn(require('../vitrinCache') as Cache, storage);
  });
}

it('kopya ayrıştırıcıdan aynen geçiyor, bozuk kayıt atlanıyor', async () => {
  await fresh(
    {
      [SLIDES_KEY]: JSON.stringify([SLIDE, { id: 'bozuk' }]),
      [SPONSORS_KEY]: JSON.stringify([SPONSOR, 'çöp', null]),
    },
    async (cache) => {
      await cache.cacheReady;
      expect(cache.cachedSlides()).toEqual([SLIDE]);
      expect(cache.cachedSponsors()).toEqual([SPONSOR]);
    },
  );
});

it('yarım yazılmış JSON boş liste, çökme yok', async () => {
  await fresh({ [SLIDES_KEY]: '[{"id":"s1",' }, async (cache) => {
    await cache.cacheReady;
    expect(cache.cachedSlides()).toEqual([]);
  });
});

it('sunucu boş liste döndürünce kopya boşalıyor; geç biten açılış okuması onu ezmiyor', async () => {
  await fresh({ [SLIDES_KEY]: JSON.stringify([SLIDE]) }, async (cache, storage) => {
    cache.saveCache('slides', []); // açılış okuması henüz bitmedi
    await cache.cacheReady;
    expect(cache.cachedSlides()).toEqual([]);
    expect(await storage.getItem(SLIDES_KEY)).toBe('[]');
  });
});

// 30 sn, öteki ağır render testleri gibi: soğuk dönüştürme önbelleğinde (CI) RN'nin
// tembel bileşenleri (FlatList, RefreshControl) render sırasında dönüştürülüyor;
// tek başına 3,6 sn ölçüldü, CI'da 5 sn'lik varsayılanı aştı.
it('okuma düşerken ana sayfa slider ve sponsorları cihazdan çiziyor, süresi geçmiş slaytı değil', async () => {
  // Jest'te Firestore okuması hep hata yolunda: bu, çevrimdışı açılışın kendisi.
  // Uygulamadaki sıra: kopya açılışta okunuyor, ana sayfa girişten sonra çiziliyor.
  await cacheReady;

  await render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <SponsorsProvider>
        <Home />
      </SponsorsProvider>
    </SafeAreaProvider>,
  );
  await act(async () => {});

  expect(screen.getByText('Hackathon')).toBeTruthy();
  expect(screen.queryByText('Geçen haftanın etkinliği')).toBeNull();
  expect(screen.getByText('Acme Yazılım')).toBeTruthy();
}, 30000);

it("kopya mount'tan önce okunduysa liste ikinci kez kurulmuyor", async () => {
  // İkinci kurulum yeni bir dizi: slider'ın FlatList'i ve bütün sponsor
  // tüketicileri açılışta boşuna yeniden çizilirdi. Her render'ın gördüğü dizi
  // toplanıyor — `renderHook` effect'leri dönmeden bitirdiği için ilk değeri
  // sonradan okumak ikinci kurulumu göremezdi.
  await cacheReady;
  const slides = new Set<unknown>();
  const sponsors = new Set<unknown>();

  await renderHook(
    () => {
      slides.add(useSlides().slides);
      sponsors.add(useSponsors().sponsors);
    },
    { wrapper: SponsorsProvider },
  );
  await act(async () => {});

  expect(slides.size).toBe(1);
  expect(sponsors.size).toBe(1);
});
