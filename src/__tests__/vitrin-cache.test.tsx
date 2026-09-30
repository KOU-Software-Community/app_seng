import AsyncStorage from '@react-native-async-storage/async-storage';

import { toSlide, toSponsor } from '../vitrinSchema';

/**
 * Slider ve sponsorlar cihazdaki kopyayla açılıyor (`src/vitrinCache.ts`).
 *
 * Kopya modül içe aktarılınca okunuyor. Bu yüzden `vitrinCache`'i çeken her modül
 * burada `require` ile, depo doldurulduktan SONRA yükleniyor — dosyanın başında
 * içe aktarılsaydı okuma boş depoya yapılırdı. Modül testleri
 * `jest.isolateModulesAsync` ile her seferinde taze bir kopya ve taze bir
 * AsyncStorage taklidi alıyor.
 */

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
