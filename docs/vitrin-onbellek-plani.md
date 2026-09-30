# Vitrin önbelleği — uygulama planı

> **Ajan için:** Bu plan `superpowers:executing-plans` ile, görev görev ve aynı
> oturumda uygulanır (kullanıcının CLAUDE.md'si `subagent-driven-development`'ı
> istemiyor). Adımlar `- [ ]` ile işaretli. Adım 1 ve Adım 2 ayrı dallarda, ayrı
> zamanlarda çıkıyor; her dal kendi sonunda bir kez `fable-reviewer` alt ajanından
> geçer, Critical maddeler düzeltilir.

**Goal:** Slider ve Sponsorlarımız cihazdaki son listeyle ilk karede çizilsin ve
Firestore cevabıyla sessizce güncellensin (Adım 1, OTA); görseller expo-image'ın
disk önbelleğinden gelsin (Adım 2, 1.1.6).

**Architecture:** `src/vitrinCache.ts` iki listeyi AsyncStorage'da tutuyor; modül
içe aktarılınca okuyor (kök düzendeki `sponsors.tsx` üzerinden, açılışta) ve okunanı
`toSlide` / `toSponsor`'dan geçiriyor. `useSlides` ve `SponsorsProvider` ilk durumu
buradan alıyor, başarılı okumadan sonra `saveCache` ile yazıyor. Ana sayfa iki
bölümü yalnız boşken gizliyor. Adım 2'de `PhotoSlot` expo-image'a geçiyor.

**Tech Stack:** Expo SDK 57, React Native 0.86, AsyncStorage 2.2.0, expo-image
~57.0.3; Jest 29 + jest-expo + RNTL 14.

**Spec:** `docs/vitrin-onbellek-tasarimi.md`

## Global Constraints

- AsyncStorage anahtarları tam olarak `kyk.vitrin.slides.v1` ve `kyk.vitrin.sponsors.v1`.
- `src/vitrinCache.ts` `src/firebase.ts`'i içe aktarmaz: Firestore SDK başlangıç
  paketine girmiyor, `firebase.ts` yalnız dinamik `import()` ile.
- Hermes: `btoa` / `atob` / `Buffer` yok; JSON yetiyor.
- Adım 1'de `app.json` / `package.json` sürümüne dokunulmaz — OTA runtime 1.1.5'e
  gitmeli (`runtimeVersion: { policy: appVersion }`).
- Adım 2: `expo-image` package.json'da birebir `~57.0.3` (`check:release`); sürüm
  `1.1.6` dört dosyada (`app.json`, `package.json`, `package-lock.json`, `CLAUDE.md`).
- Claude `eas update|build|submit` ve `firebase deploy` çalıştırmaz; OTA ve mağaza
  build'i operatörde.
- RNTL 14: `render` / `renderHook` await edilir; elle `unmount()` çağrılmaz.
- Kod değiştiren her commit'ten önce `graphify update .`; `graphify-out/` aynı commit'e.
- Commit ve PR'lar `Akadirr1 <akadirr41@gmail.com>` adına; `Co-Authored-By` /
  `Claude-Session` satırı yok.
- `npm run check:all | tail` her zaman 0 döner: pipesuz çalıştır.

## Review Focus

1. Çevrimdışı açılış (okuma düşüyor): ana sayfa slider ve sponsorları cihazdan
   çiziyor, hata bölümleri gizlemiyor — Görev 2 testi.
2. Günler sonra çevrimdışı açılış: `endsAt`'i geçmiş slayt kopyada duruyor ama
   görünmüyor — Görev 2 testi.
3. Eski sürümden ya da Console'dan elle girilmiş bozuk kayıt kopyada: atlanıyor,
   diğerleri görünüyor — Görev 1 testi.
4. Yarım yazılmış JSON: boş liste, çökme yok — Görev 1 testi.
5. Sunucuda liste boşaldı: kopya da boşalıyor; açılışta geç biten okuma bu taze
   boş listeyi eski listeyle ezmiyor — Görev 1 testi.

---

## Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA)

### Task 1: `src/vitrinCache.ts`

**Files:**
- Create: `src/vitrinCache.ts`
- Test: `src/__tests__/vitrin-cache.test.tsx`

**Interfaces:**
- Produces:
  - `cacheReady: Promise<unknown>` — açılış okuması bitince çözülür, hiç reddedilmez.
  - `cachedSlides(): Slide[]` / `cachedSponsors(): Sponsor[]` — bellekteki kopya,
    `toSlide` / `toSponsor`'dan geçmiş.
  - `saveCache(kind: 'slides' | 'sponsors', list: Slide[] | Sponsor[]): void` —
    belleğe hemen, diske arkadan.

- [ ] **Step 1: Failing test — `src/__tests__/vitrin-cache.test.tsx`**

```tsx
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
```

- [ ] **Step 2: Kırmızıyı gör**

Run: `npx jest src/__tests__/vitrin-cache.test.tsx`
Expected: 3 FAIL, `Cannot find module '../vitrinCache'`.

- [ ] **Step 3: `src/vitrinCache.ts`'i yaz**

- `const KEYS = { slides: 'kyk.vitrin.slides.v1', sponsors: 'kyk.vitrin.sponsors.v1' } as const`;
  bellek `Partial<Record<keyof typeof KEYS, unknown>>`.
- `cacheReady`: modül düzeyinde `Promise.all` — her anahtar için `getItem`; değer
  varsa ve bellekte o tür **henüz yoksa** (`!(kind in memory)`) `JSON.parse` ile
  belleğe. Her hata yutuluyor (bozuk kopya = boş başla).
- `cachedX()`: bellekteki değer dizi değilse `[]`; öğesi `typeof item?.id === 'string'`
  olanı `toX(item.id, item)`'ten geçir, `null` dönenleri at.
- `saveCache`: önce belleğe yaz, sonra `AsyncStorage.setItem(KEYS[kind], JSON.stringify(list)).catch(() => {})`.
- Modül yorumu iki "neden"i taşısın: okuma içe aktarılınca başlıyor çünkü ana
  sayfa 500 ms'lik girişten sonra çiziliyor ve hook içinde okumak slider'ı bir iki
  kare boş bırakıp sıçratıyordu; kopya Firestore'la aynı kapıdan (`toSlide` /
  `toSponsor`) giriyor.

- [ ] **Step 4: Yeşili gör**

Run: `npx jest src/__tests__/vitrin-cache.test.tsx`
Expected: 3 PASS.

- [ ] **Step 5: Typecheck**

Run: `npm run typecheck`
Expected: çıkış 0.

- [ ] **Step 6: Commit**

```bash
graphify update .
git add src/vitrinCache.ts src/__tests__/vitrin-cache.test.tsx graphify-out/
git commit -m "feat(vitrin): slider ve sponsor listesinin cihazdaki kopyası"
```

### Task 2: Hook'lar ve ana sayfa kopyayla açılıyor

**Files:**
- Modify: `src/slides.ts` (`useSlides`), `src/sponsors.tsx` (`SponsorsProvider`),
  `app/(tabs)/index.tsx:47-48,138-141`
- Test: `src/__tests__/vitrin-cache.test.tsx` (ekleme)

**Interfaces:**
- Consumes: Görev 1'in `cacheReady`, `cachedSlides`, `cachedSponsors`, `saveCache`.
- Produces: `useSlides()` ve `useSponsors()`'un dönüş şekli değişmiyor.

- [ ] **Step 1: Failing test — dosyanın başına mock'lar, sonuna test**

Başa (importların altına):

```tsx
import { act, render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

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
```

Sona:

```tsx
it('okuma düşerken ana sayfa slider ve sponsorları cihazdan çiziyor, süresi geçmiş slaytı değil', async () => {
  // Jest'te Firestore okuması hep hata yolunda: bu, çevrimdışı açılışın kendisi.
  await AsyncStorage.setItem(SLIDES_KEY, JSON.stringify([SLIDE, EXPIRED]));
  await AsyncStorage.setItem(SPONSORS_KEY, JSON.stringify([SPONSOR]));
  // Uygulamadaki sıra: kopya açılışta okunuyor, ana sayfa girişten sonra çiziliyor.
  await (require('../vitrinCache') as Cache).cacheReady;
  const { SponsorsProvider } = require('../sponsors') as typeof import('../sponsors');
  const Home = (require('../../app/(tabs)/index') as typeof import('../../app/(tabs)/index')).default;

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
});
```

- [ ] **Step 2: Kırmızıyı gör**

Run: `npx jest src/__tests__/vitrin-cache.test.tsx`
Expected: ilk 3 PASS; yeni test FAIL — `Unable to find an element with text: Hackathon`.

- [ ] **Step 3: Hook'ları bağla**

`useSlides` ve `SponsorsProvider`'da aynı üç değişiklik:
- ilk durum: `useState<Slide[]>(cachedSlides)` / `useState<Sponsor[]>(cachedSponsors)`;
- yeni, yalnız mount'ta çalışan effect: `void cacheReady.then(() => setX(cachedX()))`
  — okuma ilk render'a yetişmediyse bitince doldurur; taze kayıt bellekte olduğu
  için sonradan gelse de eskiyi geri getirmez;
- okuma başarılıysa `setX(list)`'in hemen ardından `saveCache('slides' | 'sponsors', list)`.

Doküman yorumlarına bir satır: ilk durum cihazdaki kopya (`vitrinCache.ts`); hata
olunca "eldeki liste" artık o kopya.

- [ ] **Step 4: Ana sayfa bölümleri yalnız boşken gizlesin — `app/(tabs)/index.tsx`**

- 47-48: `error: slidesError` ve `error: sponsorsError` destructuring'den çıkar.
- 139: `<HomeSlider slides={slides} />` koşulsuz (boş listede kendisi `null`).
- 141: `{sponsors.length ? (`.
- 138'deki yorum: "Boşken çizilmiyor: bir süs, ana sayfayı bekletmemeli. Okuma
  düşerse cihazdaki kopya görünüyor (`src/vitrinCache.ts`)."

- [ ] **Step 5: Yeşili gör**

Run: `npx jest src/__tests__/vitrin-cache.test.tsx src/__tests__/sponsors-screen.test.tsx src/__tests__/home-slider.test.tsx`
Expected: hepsi PASS.

- [ ] **Step 6: Typecheck ve tüm testler**

Run: `npm run typecheck && npm test`
Expected: çıkış 0; `Test Suites: 45 passed`.

- [ ] **Step 7: Commit**

```bash
graphify update .
git add src/slides.ts src/sponsors.tsx 'app/(tabs)/index.tsx' src/__tests__/vitrin-cache.test.tsx graphify-out/
git commit -m "fix(ana sayfa): slider ve sponsorlar cihazdaki kopyayla açılıyor, çevrimdışı da"
```

### Task 3: Adım 1'i kapat

- [ ] **Step 1: CI'ın koştuğu kontroller**

Run: `npm run check:all` · `npx expo export --platform ios` · `npm run check:bundle`
Expected: üçü de çıkış 0. (`firestore.rules` değişmedi; `check:rules` gerekmiyor.)

- [ ] **Step 2: Son inceleme**

`fable-reviewer` alt ajanı `origin/main...fix/vitrin-onbellek` farkını inceler.
Critical maddeler düzeltilir, Step 1 yeniden koşar.

- [ ] **Step 3: Push ve PR**

```bash
git push -u origin fix/vitrin-onbellek
```

Taslak PR plan commit'iyle açıldı; gövdesi güncellenir: ne değişti, test planı,
dağıtım yüzeyleri (Mobil uygulama: OTA; Panel / Firestore kuralları / AI Gündem
veritabanı: gerekmiyor) ve operatör notu:
- birleşince OTA bu commit'ten, runtime 1.1.5'e — Adım 2 main'e girmeden önce;
- cihazda doğrulama: uygulamayı aç (liste gelsin) → kapat → uçak modu → aç →
  slider ve sponsorlar ilk karede.

---

## Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6)

Ön koşul: Adım 1 PR'ı main'e birleşti ve operatör OTA'yı yayınladı.

### Task 4: expo-image ve sürüm 1.1.6

**Files:**
- Modify: `package.json`, `package-lock.json`, `app.json`, `CLAUDE.md:5`,
  `src/components/PhotoSlot.tsx`

- [ ] **Step 1: Dal ve kurulum**

```bash
git fetch origin main && git checkout -b fix/gorsel-onbellek origin/main && npm ci
npm install expo-image@~57.0.3
npm run check:release
```

Expected: `check:release` çıkış 0. `expo-image ^57.0.3 ≠ ~57.0.3` derse:
`npm run deps:sync`, sonra yeniden `npm run check:release`.

- [ ] **Step 2: `PhotoSlot` expo-image'a geçsin**

- `Image` react-native importundan çıkar; `import { Image } from 'expo-image';`.
- `<Image source={{ uri }} style={StyleSheet.absoluteFill} contentFit={resizeMode} />`
  — `cachePolicy` verilmiyor, varsayılanı `'disk'`; önbellek anahtarı URI.
- Yoruma bir satır: panel her görseli yeni adla yüklediği için diskteki kopya
  hiçbir zaman bayat değil.

- [ ] **Step 3: Sürüm 1.1.6**

```bash
npm version 1.1.6 --no-git-tag-version
```

`app.json` → `"version": "1.1.6"`; `CLAUDE.md:5` → `sürüm 1.1.6`.

- [ ] **Step 4: Kontroller**

Run: `npm run check:all` · `npx expo export --platform ios` · `npm run check:bundle`
Expected: üçü de çıkış 0 — `vitrin-cache` testindeki ana sayfa render'ı `PhotoSlot`'u
expo-image'la (jest-expo'nun `ExpoImage` taklidi) çiziyor.

- [ ] **Step 5: Commit**

```bash
graphify update .
git add package.json package-lock.json app.json CLAUDE.md src/components/PhotoSlot.tsx graphify-out/
git commit -m "fix(görsel): fotoğraflar expo-image disk önbelleğinden; sürüm 1.1.6"
```

- [ ] **Step 6: Son inceleme, push, PR**

`fable-reviewer` `origin/main...fix/gorsel-onbellek` farkını inceler; Critical
maddeler düzeltilir. `git push -u origin fix/gorsel-onbellek`; taslak PR. Gövdede
dağıtım yüzeyi: Mobil uygulama — 1.1.6 mağaza build'i (operatör; OTA ile gidemez,
yeni native modül). Panel / kurallar / AI Gündem: gerekmiyor.
