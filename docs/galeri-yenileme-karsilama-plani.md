# Galeri, yenileme göstergesi, karşılama — uygulama planı

> **Ajan için:** Bu plan `superpowers:executing-plans` ile, görev görev ve aynı
> oturumda uygulanır (kullanıcının CLAUDE.md'si `subagent-driven-development`'ı
> istemiyor). Adımlar `- [ ]` ile işaretli. Son inceleme `fable-reviewer` alt ajanına
> yaptırılır, Critical maddeler düzeltilir.

**Goal:** Etkinlik fotoğrafları kendiliğinden kayan bir hero slider'da ve dokununca
açılan, parmakla kaydırılıp yakınlaştırılan tam ekran görüntüleyicide; aşağı çekip yenilemede `PixelLoader`;
giriş yapmış kişiye "Ahmet, hoş geldin 👋".

**Architecture:** `ZoomableImage` (RNGH + Reanimated) tek fotoğrafın yakınlaştırmasını,
`PhotoViewer` tam ekran sayfalı listeyi, `PhotoHero` etkinlik detayındaki slider'ı
taşıyor; `PhotoGallery` şeridi kalıyor ve kendi tam ekranı yerine `PhotoViewer`'ı
açıyor. Otomatik kaydırma `HomeSlider`'dan
`useAutoAdvance`'e (`src/useAutoAdvance.ts`) taşınıyor, iki slider onu kullanıyor. `PixelRefresh` + `hiddenSpinner`
(`src/components/Pixel.tsx`) altı ekranın yenileme göstergesi. `firstName`
(`src/accountSchema.ts`) karşılamanın adı.

**Tech Stack:** Expo SDK 57, RN 0.86, react-native-gesture-handler 2.32,
react-native-reanimated 4.5.1, react-native-worklets 0.10.1, expo-image 57; Jest +
jest-expo + RNTL 14 + RNGH `jest-utils`.

**Spec:** `docs/galeri-yenileme-karsilama-tasarimi.md`

## Global Constraints

- Yeni bağımlılık ve native modül yok; `package.json` sürümü 1.1.6 kalıyor.
- UI metni Türkçe; büyük harf `toLocaleUpperCase('tr')`. Ham `Text` yok: `Txt` / `PixelTxt`.
- Renk, boşluk, köşe yalnız `src/theme.ts`'ten (`'transparent'` anahtar kelimesi emsalli).
- Görseller expo-image: hero `contentFit="cover"`, görüntüleyici `contentFit="contain"`.
- JS'e dönüş worklet'ten `scheduleOnRN` (`react-native-worklets`).
- RNTL 14: `render` / `rerender` await; elle `unmount()` yok. Tam ekran render eden
  testlere `30000` süre (repo kalıbı; soğuk dönüşümde 5 sn aşılıyor).
- Kod değiştiren her commit'ten önce `graphify update .`, `graphify-out/` aynı commit'e.
- Commit/PR `Akadirr1 <akadirr41@gmail.com>`; `Co-Authored-By` / `Claude-Session` yok.
- Claude `eas update|build|submit` ve `firebase deploy` çalıştırmaz.

## Review Focus

1. Yakınken yatay kaydırma kilitli, geri dönünce açık — Task 4 testi.
2. Tek fotoğraflı ve fotoğrafsız etkinlik: nokta yok / yer tutucu, çökme yok — Task 6 testi.
3. Görüntüleyici başka bir fotoğrafla yeniden açılınca sayaç oradan başlıyor — Task 4 testi.
4. Giriş yapmış ama adı boş ya da yalnız boşluk: "Hoş geldin 👋" — Task 1 testi.
5. Görüntüleyici açıkken hero arkada kaymıyor, kapanınca devam ediyor — Task 6 testi.

---

### Task 1: Adla karşılama

**Files:**
- Modify: `src/accountSchema.ts` (yeni `firstName`), `app/(tabs)/index.tsx:84-90`
- Modify: `src/__tests__/vitrin-cache.test.tsx` (mock'lara `../authStore`)
- Test: `src/__tests__/accountSchema.test.ts` (ekleme), Create `src/__tests__/home-greeting.test.tsx`

**Interfaces:**
- Produces: `firstName(adSoyad: string | undefined): string | null`

- [ ] **Step 1: Failing test — `accountSchema.test.ts`'e (`firstName` importa eklenir)**

```ts
describe('firstName', () => {
  it.each([
    ['ahmet yılmaz', 'Ahmet'],
    ['  Ayşe   Nur Kaya ', 'Ayşe'],
    ['irem', 'İrem'],
    ['ışıl', 'Işıl'],
    ['', null],
    ['   ', null],
    [undefined, null],
  ])('%p → %p', (adSoyad, want) => {
    expect(firstName(adSoyad)).toBe(want);
  });
});
```

- [ ] **Step 2: Failing test — `home-greeting.test.tsx`**

`vitrin-cache.test.tsx`'teki `expo-router`, `../content`, `../announcements`, `../store`
mock'ları ve `METRICS` aynen; ek olarak:

```tsx
jest.mock('../slides', () => ({ useSlides: () => ({ slides: [], refresh: jest.fn() }) }));
jest.mock('../sponsors', () => ({ useSponsors: () => ({ sponsors: [], refresh: jest.fn() }) }));
const mockAuth: { user: unknown; profile: { adSoyad: string } | null; loading: boolean } = {
  user: null,
  profile: null,
  loading: false,
};
jest.mock('../authStore', () => ({ useAuth: () => mockAuth }));

import Home from '../../app/(tabs)/index';

const show = () =>
  render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <Home />
    </SafeAreaProvider>,
  );

it('giriş yapmış kişiye adıyla hoş geldin diyor', async () => {
  mockAuth.profile = { adSoyad: 'ahmet yılmaz' };
  await show();
  expect(screen.getByText('Ahmet, hoş geldin 👋')).toBeTruthy();
}, 30000);

it('oturum yoksa bugünkü karşılama', async () => {
  mockAuth.profile = null;
  await show();
  expect(screen.getByText('Hoş geldin 👋')).toBeTruthy();
}, 30000);
```

- [ ] **Step 3: Kırmızıyı gör**

Run: `npx jest src/__tests__/accountSchema.test.ts src/__tests__/home-greeting.test.tsx`
Expected: `firstName is not a function` (ya da import hatası); karşılama testi
`Unable to find an element with text: Ahmet, hoş geldin 👋`.

- [ ] **Step 4: Uygula**

- `firstName`: `trim()` → ilk boşluğa kadar olan kelime; boşsa `null`; ilk harf
  `toLocaleUpperCase('tr')`, kalanı olduğu gibi.
- `app/(tabs)/index.tsx`: `const { profile } = useAuth();` (`../../src/authStore`);
  metin `firstName(profile?.adSoyad)` varsa `` `${ad}, hoş geldin 👋` ``, yoksa
  `'Hoş geldin 👋'`.
- `vitrin-cache.test.tsx`'e: `jest.mock('../authStore', () => ({ useAuth: () => ({ user: null, profile: null, loading: false }) }));`

- [ ] **Step 5: Yeşili gör**

Run: `npx jest src/__tests__/accountSchema.test.ts src/__tests__/home-greeting.test.tsx src/__tests__/vitrin-cache.test.tsx`
Expected: hepsi PASS.

- [ ] **Step 6: Commit**

```bash
graphify update .
git add src/accountSchema.ts 'app/(tabs)/index.tsx' src/__tests__/accountSchema.test.ts src/__tests__/home-greeting.test.tsx src/__tests__/vitrin-cache.test.tsx graphify-out/
git commit -m "feat(ana sayfa): giriş yapmış kişiye adıyla hoş geldin"
```

### Task 2: PixelLoader'lı yenileme göstergesi

**Files:**
- Modify: `src/components/Pixel.tsx` (yeni `PixelRefresh`, `hiddenSpinner`)
- Modify: `app/(tabs)/index.tsx`, `app/(tabs)/takvim.tsx`, `app/(tabs)/arsiv.tsx`,
  `src/gundem/screens/DigestView.tsx`, `src/gundem/screens/FeedView.tsx`,
  `src/gundem/screens/SavedView.tsx`
- Test: Create `src/__tests__/pixel-refresh.test.tsx`

**Interfaces:**
- Produces: `PixelRefresh({ visible }: { visible: boolean })` — görünürken
  `accessibilityLabel="Yenileniyor"`; `hiddenSpinner` — `RefreshControl`'e yayılacak
  `{ tintColor: 'transparent', colors: ['transparent'], progressBackgroundColor: 'transparent' }`.

- [ ] **Step 1: Failing test**

```tsx
jest.mock('expo-router', () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock('../content', () => ({
  useContent: () => ({ events: [], archive: [], error: null, loading: true, refresh: jest.fn() }),
}));

it('yenilenirken üstte PixelLoader, bitince hiçbir şey', async () => {
  const { rerender } = await render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <PixelRefresh visible />
    </SafeAreaProvider>,
  );
  expect(screen.getByLabelText('Yenileniyor')).toBeTruthy();
  await rerender(
    <SafeAreaProvider initialMetrics={METRICS}>
      <PixelRefresh visible={false} />
    </SafeAreaProvider>,
  );
  expect(screen.queryByLabelText('Yenileniyor')).toBeNull();
});

it('Arşiv yüklenirken göstergeyi gösteriyor', async () => {
  const Arsiv = (require('../../app/(tabs)/arsiv') as typeof import('../../app/(tabs)/arsiv')).default;
  await render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <Arsiv />
    </SafeAreaProvider>,
  );
  expect(screen.getByLabelText('Yenileniyor')).toBeTruthy();
}, 30000);
```

- [ ] **Step 2: Kırmızıyı gör**

Run: `npx jest src/__tests__/pixel-refresh.test.tsx`
Expected: FAIL — `PixelRefresh` tanımsız.

- [ ] **Step 3: `PixelRefresh` ve `hiddenSpinner`**

`PixelRefresh`: görünmüyorsa `null`; görünürse `position: 'absolute'`, ortada,
`top: insets.top + 8`, `pointerEvents="none"`, `colors.surface` zeminli
`radius.pill` bir hap, `shadow.card`, içinde küçük `PixelLoader` (`size={6}`, `gap={4}`).

- [ ] **Step 4: Altı ekranı bağla**

Her `RefreshControl`: renk prop'ları yerine `{...hiddenSpinner}`; ekranın kök
`View`'ının içine, listeden sonra `<PixelRefresh visible={…} />` — değer
`RefreshControl.refreshing` ile aynı. Kökü `ScrollView` olan ekranlar (Ana Sayfa,
Takvim, Özet, Kaydedilenler) `ScrollView`'ın `style`'ını alan bir `View` ile sarılıyor.
Ana Sayfa'daki "blue200 açık zeminde görünmüyordu" yorumu yeni gerekçeye çevrilir.

- [ ] **Step 5: Yeşili gör**

Run: `npx jest src/__tests__/pixel-refresh.test.tsx src/__tests__/vitrin-cache.test.tsx src/__tests__/home-greeting.test.tsx src/gundem`
Expected: hepsi PASS.

- [ ] **Step 6: Commit**

```bash
graphify update .
git add src/components/Pixel.tsx 'app/(tabs)/index.tsx' 'app/(tabs)/takvim.tsx' 'app/(tabs)/arsiv.tsx' src/gundem/screens/DigestView.tsx src/gundem/screens/FeedView.tsx src/gundem/screens/SavedView.tsx src/__tests__/pixel-refresh.test.tsx graphify-out/
git commit -m "fix(yenileme): aşağı çekince PixelLoader — beyaz zeminde görünmeyen gösterge yerine"
```

### Task 3: Yakınlaştırılabilir görsel

**Files:**
- Create: `src/components/ZoomableImage.tsx`
- Modify: `jest.setup.js` (RNGH, Reanimated, worklets taklitleri)
- Test: Create `src/__tests__/zoomable-image.test.tsx`

**Interfaces:**
- Produces:
  - `clampOffset(offset: number, scale: number, size: number): number` — `'worklet'`;
    sınır `size * (scale - 1) / 2`.
  - `ZoomableImage({ uri, width, height, onZoomChange, accessibilityLabel, testID }: { uri: string; width: number; height: number; onZoomChange: (zoomed: boolean) => void; accessibilityLabel: string; testID: string })`
  - Hareket kimlikleri: `${testID}-pinch`, `${testID}-pan`, `${testID}-doubleTap`.
  - `MAX_SCALE = 4`, `DOUBLE_TAP_SCALE = 2.5`.

- [ ] **Step 1: `jest.setup.js`'e taklitler**

```js
require('react-native-gesture-handler/jestSetup');
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('react-native-worklets', () => require('react-native-worklets/src/mock'));
```

- [ ] **Step 2: Failing test**

```tsx
it.each([
  [200, 2, 300, 150],
  [-200, 2, 300, -150],
  [50, 2, 300, 50],
  [80, 1, 300, 0],
])('clampOffset(%p, %p, %p) → %p', (offset, scale, size, want) => {
  expect(clampOffset(offset, scale, size)).toBe(want);
});

it('iki parmakla yakınlaşınca ve çift dokunmayla geri dönünce haber veriyor', async () => {
  const onZoomChange = jest.fn();
  await render(
    <ZoomableImage
      uri="https://ornek.com/a.jpg"
      width={300}
      height={400}
      onZoomChange={onZoomChange}
      accessibilityLabel="Fotoğraf 1 / 1"
      testID="foto-0"
    />,
  );
  fireGestureHandler(getByGestureTestId('foto-0-pinch'), [
    { state: State.BEGAN, scale: 1 },
    { state: State.ACTIVE, scale: 2 },
    { state: State.END, scale: 2 },
  ]);
  expect(onZoomChange).toHaveBeenLastCalledWith(true);
  fireGestureHandler(getByGestureTestId('foto-0-doubleTap'), [
    { state: State.BEGAN },
    { state: State.ACTIVE },
    { state: State.END },
  ]);
  expect(onZoomChange).toHaveBeenLastCalledWith(false);
});
```

- [ ] **Step 3: Kırmızıyı gör**

Run: `npx jest src/__tests__/zoomable-image.test.tsx`
Expected: FAIL — `Cannot find module '../components/ZoomableImage'`.

- [ ] **Step 4: Uygula**

- Pinch: ölçek `kayıtlı × e.scale`, 1…`MAX_SCALE` arası; bitince kaydet, ≤ 1,01 ise
  ölçek ve kaydırma 1/0'a döner; `onZoomChange(ölçek > 1)`.
- Pan: yalnız yakınken etkin (`.enabled(zoomed)`, `zoomed` React durumu); kaydırma
  `clampOffset` ile iki eksende sınırlı.
- Çift dokunma: yakınsa 1×'e, değilse `DOUBLE_TAP_SCALE`'e (merkeze); `onZoomChange`.
- Birleşim: `Gesture.Exclusive(doubleTap, Gesture.Simultaneous(pinch, pan))`.
- Görsel `Animated.View` içinde expo-image, `contentFit="contain"`.

- [ ] **Step 5: Yeşili gör**

Run: `npx jest src/__tests__/zoomable-image.test.tsx && npm test && npm run typecheck`
Expected: PASS; tüm paket yeşil (global taklitler mevcut testleri bozmamalı); typecheck 0.

- [ ] **Step 6: Commit**

```bash
graphify update .
git add src/components/ZoomableImage.tsx jest.setup.js src/__tests__/zoomable-image.test.tsx graphify-out/
git commit -m "feat(galeri): iki parmak ve çift dokunmayla yakınlaştırılan görsel"
```

### Task 4: Tam ekran görüntüleyici

**Files:**
- Create: `src/components/PhotoViewer.tsx`
- Test: Create `src/__tests__/photo-viewer.test.tsx`

**Interfaces:**
- Consumes: Task 3 `ZoomableImage` (`testID` = `foto-${i}`).
- Produces: `PhotoViewer({ photos, index, onClose }: { photos: string[]; index: number | null; onClose: () => void })`
  — `index !== null` iken görünür; liste `testID="foto-liste"`.

- [ ] **Step 1: Failing test**

```tsx
const PHOTOS = ['https://ornek.com/1.jpg', 'https://ornek.com/2.jpg', 'https://ornek.com/3.jpg'];
const { width } = Dimensions.get('window');
const viewer = (index: number | null, onClose = jest.fn()) => (
  <SafeAreaProvider initialMetrics={METRICS}>
    <PhotoViewer photos={PHOTOS} index={index} onClose={onClose} />
  </SafeAreaProvider>
);

it('dokunulan fotoğrafta açılıyor, tuş yok, kaydırınca sayaç ilerliyor, kapanıyor', async () => {
  const onClose = jest.fn();
  await render(viewer(1, onClose));
  expect(screen.getByText('2 / 3')).toBeTruthy();
  expect(screen.queryByLabelText('Önceki')).toBeNull();
  expect(screen.queryByLabelText('Sonraki')).toBeNull();
  fireEvent(screen.getByTestId('foto-liste'), 'momentumScrollEnd', {
    nativeEvent: { contentOffset: { x: 2 * width, y: 0 } },
  });
  expect(screen.getByText('3 / 3')).toBeTruthy();
  fireEvent.press(screen.getByLabelText('Kapat'));
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('yakınken liste kaymıyor', async () => {
  await render(viewer(0));
  expect(screen.getByTestId('foto-liste').props.scrollEnabled).not.toBe(false);
  fireGestureHandler(getByGestureTestId('foto-0-pinch'), [
    { state: State.BEGAN, scale: 1 },
    { state: State.ACTIVE, scale: 2 },
    { state: State.END, scale: 2 },
  ]);
  expect(screen.getByTestId('foto-liste').props.scrollEnabled).toBe(false);
});

it('başka bir fotoğrafla yeniden açılınca sayaç oradan başlıyor', async () => {
  const { rerender } = await render(viewer(0));
  await rerender(viewer(null));
  await rerender(viewer(2));
  expect(screen.getByText('3 / 3')).toBeTruthy();
});
```

- [ ] **Step 2: Kırmızıyı gör**

Run: `npx jest src/__tests__/photo-viewer.test.tsx`
Expected: FAIL — `Cannot find module '../components/PhotoViewer'`.

- [ ] **Step 3: Uygula**

`Modal` (`fade`, `transparent`, `statusBarTranslucent`, `onRequestClose={onClose}`) →
`GestureHandlerRootView` (flex 1) → koyu zemin (bugünkü `PhotoGallery.viewer` rengi);
üst çubuk: `GlassButton` "✕" (`accessibilityLabel="Kapat"`) ve `PixelTxt` sayaç;
`FlatList` yatay, `pagingEnabled`, `initialScrollIndex={index}`, `getItemLayout`
(genişlik = pencere), `scrollEnabled={!zoomed}`, `onMomentumScrollEnd` →
`Math.round(x / width)`. Sayfa: `ZoomableImage` (`testID={`foto-${i}`}`,
`accessibilityLabel={`Fotoğraf ${i + 1} / ${n}`}`). `index` değişince sayaç ve
`zoomed` sıfırlanır.

- [ ] **Step 4: Yeşili gör**

Run: `npx jest src/__tests__/photo-viewer.test.tsx`
Expected: 3 PASS.

- [ ] **Step 5: Commit**

```bash
graphify update .
git add src/components/PhotoViewer.tsx src/__tests__/photo-viewer.test.tsx graphify-out/
git commit -m "feat(galeri): kaydırılan ve yakınlaştırılan tam ekran görüntüleyici; tuşlar kalktı"
```

### Task 5: Otomatik kaydırma ortak hook'a

**Files:**
- Create: `src/useAutoAdvance.ts`
- Modify: `src/components/HomeSlider.tsx` (zamanlayıcı, odak, sürükleme ve "hareketi
  azalt" mantığı hook'a taşınıyor; `SLIDE_INTERVAL_MS` hook'tan yeniden dışa aktarılıyor)
- Test: Create `src/__tests__/auto-advance.test.tsx`; `src/__tests__/home-slider.test.tsx`
  değişmeden yeşil kalmalı

**Interfaces:**
- Produces: `SLIDE_INTERVAL_MS = 4500`;
  `useAutoAdvance<T>(count: number, step: number, paused?: boolean): { list: React.RefObject<FlatList<T> | null>; current: number; go: (next: number) => void; onScrollBeginDrag: () => void; onScrollEndDrag: () => void; onMomentumScrollEnd: (e: NativeSyntheticEvent<NativeScrollEvent>) => void }`
  — `paused` iken zamanlayıcı kurulmuyor; kurallar bugünkü `HomeSlider`'ınki.

- [ ] **Step 1: Taban çizgisi**

Run: `npx jest src/__tests__/home-slider.test.tsx`
Expected: PASS — taşınan davranışı bu testler tutuyor (4,5 sn'de ilerleme, sonda başa
dönüş, tek slayt ve "hareketi azalt"ta durma, liste kısalınca nokta).

- [ ] **Step 2: Failing test — `auto-advance.test.tsx`**

```tsx
jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return { useFocusEffect: (cb: () => void | (() => void)) => useEffect(cb, [cb]) };
});

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

it.each([
  [false, 1],
  [true, 0],
])('paused=%p iken 4,5 sn sonra sıra %p', async (paused, want) => {
  const { result } = await renderHook(() => useAutoAdvance(3, 100, paused));
  await act(async () => {});
  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS);
  });
  expect(result.current.current).toBe(want);
});
```

- [ ] **Step 3: Kırmızıyı gör**

Run: `npx jest src/__tests__/auto-advance.test.tsx`
Expected: FAIL — `Cannot find module '../useAutoAdvance'`.

- [ ] **Step 4: Hook'u `HomeSlider`'dan çıkar**

`HomeSlider`'daki `list`, `index`, `focused`, `dragging`, `still`, `current`, `go` ve
zamanlayıcı effect'i hook'a taşınır; effect'in koşuluna `paused` eklenir. `HomeSlider`
hook'u `paused` vermeden kullanır, yorumları hook'a gider.

- [ ] **Step 5: Yeşili gör**

Run: `npx jest src/__tests__/auto-advance.test.tsx src/__tests__/home-slider.test.tsx && npm run typecheck`
Expected: PASS; typecheck 0.

- [ ] **Step 6: Commit**

```bash
graphify update .
git add src/useAutoAdvance.ts src/components/HomeSlider.tsx src/__tests__/auto-advance.test.tsx graphify-out/
git commit -m "refactor(slider): otomatik kaydırma useAutoAdvance'e; durdurulabilir"
```

### Task 6: Hero slider ve etkinlik detayı

**Files:**
- Create: `src/components/PhotoHero.tsx`
- Modify: `app/etkinlik/[id].tsx` (hero, görüntüleyici durumu)
- Modify: `src/components/PhotoGallery.tsx` (yalnız şerit; kendi `Modal`'ı ve tuşları çıkıyor)
- Test: Create `src/__tests__/photo-hero.test.tsx`, `src/__tests__/event-photos.test.tsx`

**Interfaces:**
- Consumes: Task 4 `PhotoViewer`; Task 5 `useAutoAdvance`, `SLIDE_INTERVAL_MS`.
- Produces (değişen): `PhotoGallery({ photos, onOpen }: { photos: string[]; onOpen: (index: number) => void })`
  — önizleme etiketi bugünkü `` `Fotoğraf ${i + 2}` ``, dokununca `onOpen(i + 1)`.
- Produces: `PhotoHero({ photos, height, onOpen, paused, children }: { photos: string[]; height: number; onOpen: (index: number) => void; paused: boolean; children?: React.ReactNode })`
  — sayfa `accessibilityLabel={`Fotoğraf ${i + 1} / ${n}, büyüt`}`; nokta `Pressable`,
  `accessibilityLabel={`${i + 1}. fotoğrafa git`}`, `accessibilityState={{ selected }}`.

- [ ] **Step 1: Failing test — `photo-hero.test.tsx`**

```tsx
jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return { useFocusEffect: (cb: () => void | (() => void)) => useEffect(cb, [cb]) };
});

const PHOTOS = ['https://ornek.com/1.jpg', 'https://ornek.com/2.jpg', 'https://ornek.com/3.jpg'];
const hero = (photos: string[], { onOpen = jest.fn(), paused = false } = {}) => (
  <SafeAreaProvider initialMetrics={METRICS}>
    <PhotoHero photos={photos} height={280} onOpen={onOpen} paused={paused}>
      <Txt>Başlık</Txt>
    </PhotoHero>
  </SafeAreaProvider>
);
const dot = (n: number, selected: boolean) =>
  screen.queryByRole('button', { name: `${n}. fotoğrafa git`, selected });
const settle = () => act(async () => {});

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

it('her fotoğraf bir sayfa, dokununca o fotoğraf açılıyor', async () => {
  const onOpen = jest.fn();
  await render(hero(PHOTOS, { onOpen }));
  await settle();
  expect(screen.getAllByRole('button', { name: /fotoğrafa git/ })).toHaveLength(3);
  fireEvent.press(screen.getByLabelText('Fotoğraf 2 / 3, büyüt'));
  expect(onOpen).toHaveBeenCalledWith(1);
  expect(screen.getByText('Başlık')).toBeTruthy();
});

it('etkinlik ekranında kendiliğinden ilerliyor', async () => {
  await render(hero(PHOTOS));
  await settle();
  expect(dot(1, true)).toBeTruthy();
  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS);
  });
  expect(dot(2, true)).toBeTruthy();
});

it('görüntüleyici açıkken ilerlemiyor', async () => {
  await render(hero(PHOTOS, { paused: true }));
  await settle();
  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS * 2);
  });
  expect(dot(1, true)).toBeTruthy();
});

it('tek fotoğrafta nokta yok', async () => {
  await render(hero([PHOTOS[0]]));
  await settle();
  expect(screen.queryAllByRole('button', { name: /fotoğrafa git/ })).toHaveLength(0);
  expect(screen.getByLabelText('Fotoğraf 1 / 1, büyüt')).toBeTruthy();
});

it('fotoğraf yoksa yer tutucu; dokunulacak sayfa yok, başlık duruyor', async () => {
  await render(hero([]));
  await settle();
  expect(screen.queryByLabelText(/büyüt/)).toBeNull();
  expect(screen.getByText('Başlık')).toBeTruthy();
});
```

- [ ] **Step 2: Failing test — `event-photos.test.tsx`**

```tsx
jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    useLocalSearchParams: () => ({ id: 'e1' }),
    useRouter: () => ({ push: jest.fn(), back: jest.fn(), replace: jest.fn() }),
    useFocusEffect: (cb: () => void | (() => void)) => useEffect(cb, [cb]),
  };
});
jest.mock('../content', () => ({
  useEvent: () => mockEvent,
  useContent: () => ({ getRaffle: () => undefined, registeredCount: () => 0 }),
}));
jest.mock('../store', () => ({
  useAppStore: () => ({ registrationFor: () => undefined, raffleEntryFor: () => undefined, syncPending: jest.fn() }),
}));
jest.mock('../sponsors', () => ({ useSponsors: () => ({ sponsors: [] }) }));

const mockEvent = {
  id: 'e1', startsAt: '2020-01-01T18:00:00+03:00', day: '01', mon: 'OCA', wd: 'Çar',
  monthKey: '2020-01', title: 'Hackathon', time: '18.00', short: '', tag: 'Atölye',
  soon: false, badge: 'ARSIV', desc: '', tags: [], speaker: '', speakerRole: '', facts: [],
  photos: ['https://ornek.com/1.jpg', 'https://ornek.com/2.jpg', 'https://ornek.com/3.jpg'],
};
const selectedDot = (n: number) => screen.getByRole('button', { name: `${n}. fotoğrafa git`, selected: true });

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

it('ana fotoğrafa dokununca görüntüleyici o fotoğrafta açılıyor; açıkken hero durur, kapanınca devam eder; şerit de aynı görüntüleyiciyi açıyor', async () => {
  const Detail = (require('../../app/etkinlik/[id]') as typeof import('../../app/etkinlik/[id]')).default;
  await render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <Detail />
    </SafeAreaProvider>,
  );
  await act(async () => {});
  expect(screen.getByText('Fotoğraflar')).toBeTruthy();

  fireEvent.press(screen.getByLabelText('Fotoğraf 2 / 3, büyüt'));
  expect(screen.getByText('2 / 3')).toBeTruthy();
  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS);
  });
  expect(selectedDot(1)).toBeTruthy();

  fireEvent.press(screen.getByLabelText('Kapat'));
  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS);
  });
  expect(selectedDot(2)).toBeTruthy();

  fireEvent.press(screen.getByLabelText('Fotoğraf 3'));
  expect(screen.getByText('3 / 3')).toBeTruthy();
}, 30000);
```

Ekran başka bir sağlayıcı isterse aynı biçimde mock eklenir; eklenen her mock bir
`Ruling:` satırıdır.

- [ ] **Step 3: Kırmızıyı gör**

Run: `npx jest src/__tests__/photo-hero.test.tsx src/__tests__/event-photos.test.tsx`
Expected: `photo-hero` modül bulunamıyor; `event-photos` `Fotoğraf 2 / 3, büyüt`
bulunamıyor.

- [ ] **Step 4: `PhotoHero`**

Fotoğraf yoksa bugünkü `PhotoSlot` (`gradients.hero`, `showLabel={false}`) ve
`children`. Varsa: `useAutoAdvance(n, genişlik, paused)`; yatay `FlatList`,
`pagingEnabled`, sayfa genişliği pencere; sayfa `Pressable` → `onOpen(i)`, içinde
expo-image `cover`. Birden fazla fotoğrafta noktalar (`HomeSlider` biçimi,
`colors.dotIdle` / `colors.blue500`, dokununca `go(i)`) sağ üstte
(`top: insets.top + 26`, `right: 20`). `children` `StyleSheet.absoluteFill` +
`pointerEvents="box-none"` bir katmanda.

- [ ] **Step 5: Etkinlik detayını bağla**

`PhotoSlot` hero'su `PhotoHero` olur (`photos={event.photos ?? []}`, `height={280}`,
`onOpen={setViewer}`, `paused={viewer !== null}`); karartma, geri düğmesi ve başlık
`children` — geri düğmesinin kabı `pointerEvents="box-none"`.
`const [viewer, setViewer] = useState<number | null>(null)` erken `return`'den önce;
ekranın sonunda
`<PhotoViewer photos={event.photos ?? []} index={viewer} onClose={() => setViewer(null)} />`.
`<PhotoGallery photos={event.photos ?? []} onOpen={setViewer} />` kalıyor;
`PhotoGallery`'nin kendi `Modal`'ı, `step`'i ve tuşları silinir, önizlemeler expo-image
`cover`. Çevresindeki yorumlar güncellenir.

- [ ] **Step 6: Yeşili gör**

Run: `npx jest src/__tests__/photo-hero.test.tsx src/__tests__/event-photos.test.tsx && npm run typecheck`
Expected: PASS; typecheck 0.

- [ ] **Step 7: Commit**

```bash
graphify update .
git add src/components/PhotoHero.tsx 'app/etkinlik/[id].tsx' src/components/PhotoGallery.tsx src/__tests__/photo-hero.test.tsx src/__tests__/event-photos.test.tsx graphify-out/
git commit -m "feat(etkinlik): ana fotoğraf kendiliğinden kayan slider, dokununca tam ekran; şerit aynı görüntüleyiciyi açıyor"
```

### Task 7: Kapanış

- [ ] **Step 1: CI'ın koştuğu kontroller**

Run: `npm run check:all` · `npx expo export --platform ios` · `npm run check:bundle`
Expected: üçü de çıkış 0; `check:release` sürümü 1.1.6 okuyor, yeni bağımlılık yok.

- [ ] **Step 2: Son inceleme**

`fable-reviewer` `fix/gorsel-onbellek...fix/galeri-yenileme-karsilama` farkını inceler;
Critical maddeler düzeltilir, Step 1 yeniden koşar.

- [ ] **Step 3: Push ve PR**

```bash
git push -u origin fix/galeri-yenileme-karsilama
```

Taslak PR, taban `fix/gorsel-onbellek`. Gövde: ne değişti; test planı; iOS arşiv
değerlendirmesi ve cihaz kontrol listesi (spec §4); cihazda denenecekler (iki parmakla
yakınlaştırma, çift dokunma, yakınken kaydırmama, hero'yu kaydırma ve dokunma,
hero'nun kendiliğinden kayması ve görüntüleyici açıkken durması, altı ekranda aşağı
çekme — Android'de native gölge kalıyor mu); dağıtım yüzeyleri
(Mobil uygulama: 1.1.6 build'ine biner, native modül yok; Panel / kurallar / AI Gündem:
gerekmiyor).
