# Kalıcı takvim, kare yükleme animasyonu, galeriyi dokunarak kapatma — uygulama planı

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement
> this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gündem'de yazı yerine kare yükleme animasyonu; Takvim sekmesinde her zaman
görünen, erişilebilir bir ay takvimi; tam ekran galeride fotoğrafın dışındaki soluk alana
tek ve temiz bir dokunuşla kapatma.

**Architecture:** `PixelLoader` isteğe bağlı erişilebilirlik etiketi alıyor. Takvimin
saf hesabı `src/eventSchema.ts`'te duruyor (`monthGrid`, `dayLabelOf`, `addMonths`);
çizimi yeni `src/components/MonthCalendar.tsx`'te. Takvim ekranı bunu listenin üstüne
koyuyor; Liste/Takvim düğmesi kalkıyor. Kapatma kuralı `ZoomableImage`'daki saf
`isBackdropTap` ve bir tek dokunuş hareketi (`Exclusive(doubleTap, tap)`).

**Tech Stack:** Expo SDK 57, RN 0.86, react-native-gesture-handler 2.32, Reanimated 4,
Jest + RNTL 14.

**Spec:** `docs/takvim-yukleme-kapatma-tasarimi.md`

## Global Constraints

- Gün ve ay kararı kulüp saatinden: `clubCalendar(new Date())`. Döndürdüğü `month` 0–11;
  `monthGrid` / `monthLabelOf` / `daysInMonth` / `weekdayIndex` 1–12 bekliyor.
  `getMonth()` / `getDate()` yok.
- UI metni Türkçe; ham `Text` yok (`Txt`, `PixelTxt`); renkler `colors.*`.
- RNTL 14: `render`, `rerender` ve `fireEvent` `await` ediliyor. Hareketten sonra
  `await act(async () => {})` (taklitte `scheduleOnRN` mikro görev). Ekranın tamamını
  çizen testlere `30000` süre.
- Yeni bağımlılık yok. Kodu değiştiren her commit'ten önce `graphify update .`,
  `graphify-out/` aynı commit'te.
- Commit'ler depo sahibinin adına; `Co-Authored-By` / `Claude-Session` satırı yok.

## Review Focus

1. Gün dönümü: cihaz UTC 21:00–24:00 arasındayken "bugün" kulüp saatinde ertesi gün —
   Task 3 testi (`2026-09-30T21:30:00Z` → 1 Ekim).
2. Yıl dönümü ve sınır: Aralık → Ocak, 12 ay sınırı, sınırın ötesindeki etkinlik —
   Task 2 ve Task 3 testleri.
3. İki etkinlikli gün: hücre ilkini açıyor, etiket onu söylüyor, ikisi de listede —
   Task 2 testi.
4. Soluk alana dokunuş fotoğrafın 24 pt yakınında, fotoğrafın üstünde ya da yakınken
   kapatmıyor; çift dokunuş hâlâ yakınlaştırıyor — Task 5 testi.
5. Takvimde bugünden önceki günler düğme değil, ekran okuyucu tam tarihi okuyor —
   Task 3 testi.

---

### Task 1: Kare yükleme animasyonu

**Files:**
- Modify: `src/components/Pixel.tsx` (`PixelLoader`'a `label`)
- Modify: `src/gundem/screens/DigestView.tsx`, `src/gundem/screens/FeedView.tsx`,
  `src/gundem/screens/SavedView.tsx`
- Onaylanırsa: `app/sertifikalarim.tsx`, `app/duyuru/[id].tsx`, `app/sponsor/[id].tsx`,
  `app/sponsorlar.tsx`
- Test: Create `src/__tests__/pixel-loading.test.tsx`

**Interfaces:**
- Produces: `PixelLoader({ label?: string, ... })` — `label` verilince `accessible`,
  `accessibilityRole="progressbar"`, `accessibilityLabel={label}`.

- [ ] **Step 1: Failing test**

`PixelLoader label="Yükleniyor"` → `getByLabelText('Yükleniyor')` rolü `progressbar`;
etiketsiz `PixelLoader` erişilebilir değil. Gündem'in üç görünümü yüklenirken:
veri kancaları (`src/gundem/data-access/hooks`) `isPending: true` döndürecek şekilde
taklit ediliyor, her görünüm çiziliyor → `getByLabelText('Yükleniyor')` var,
`queryByText('YUKLENIYOR')` yok.

- [ ] **Step 2: Kırmızıyı gör** — `npx jest src/__tests__/pixel-loading.test.tsx`.
  Beklenen: etiket bulunamıyor.

- [ ] **Step 3: Uygula**

`label` prop'u. Üç görünümde `<PixelTxt …>YUKLENIYOR</PixelTxt>` →
`<PixelLoader label="Yükleniyor" style={styles.loading} />`; `styles.loading` =
`{ alignSelf: 'center', marginTop: 40 }`. Onaylanırsa öteki dört ekranda aynı
değişiklik: Sertifikalarım'da kartın içinde; Duyuru, Sponsor ve Sponsorlar'da
`<EmptyState title="Yükleniyor" …/>` yerine aynı bileşen.

- [ ] **Step 4: Yeşili gör** — `npx jest src/__tests__/pixel-loading.test.tsx src/gundem && npm run typecheck`

- [ ] **Step 5: Commit** — `feat(yükleme): Gündem'de yazı yerine kare yükleme animasyonu`

### Task 2: Takvimin saf hesabı

**Files:**
- Modify: `src/eventSchema.ts`
- Test: Create `src/__tests__/calendar-schema.test.ts`

**Interfaces:**
- Produces:
  - `monthGrid(year: number, month: number, events: ClubEvent[]): MonthGrid` —
    month 1–12. Yalnız o aya düşen etkinlikler işaretleniyor; bir güne iki etkinlik
    düşerse ilki kalıyor. `monthGrids` bunu kullanacak şekilde sadeleşiyor, davranışı
    aynı kalıyor.
  - `dayLabelOf(year: number, month: number, day: number): string` →
    `"12 Ekim 2026, Pazartesi"`.
  - `addMonths(year: number, month: number, delta: number): { year: number; month: number }`.

- [ ] **Step 1: Failing test**

```ts
it.each([
  [2026, 2, 6, 28],  // 1 Şubat 2026 Pazar
  [2028, 2, 1, 29],  // artık yıl, 1 Şubat 2028 Salı
  [2026, 8, 5, 31],  // 6 satırlık ay
])('monthGrid(%p, %p) boşluk %p, gün %p', (y, m, blanks, days) => {
  const g = monthGrid(y, m, []);
  expect([g.leadingBlanks, g.days, g.label]).toEqual([blanks, days, monthLabelOf(y, m)]);
});
it('iki etkinlikli gün ilkini tutuyor, başka aydaki etkinlik işaretlenmiyor', …);
it.each([
  [2026, 10, 12, '12 Ekim 2026, Pazartesi'],
  [2026, 9, 30, '30 Eylül 2026, Çarşamba'],
])('dayLabelOf', …);
it.each([
  [2026, 12, 1, { year: 2027, month: 1 }],
  [2026, 1, -1, { year: 2025, month: 12 }],
  [2026, 9, 12, { year: 2027, month: 9 }],
])('addMonths', …);
```

- [ ] **Step 2: Kırmızıyı gör** — fonksiyonlar tanımsız.
- [ ] **Step 3: Uygula** — `WEEKDAYS_LONG` ve `MONTHS_LONG` mevcut; yeni tablo yok.
- [ ] **Step 4: Yeşili gör** — `npx jest src/__tests__/calendar-schema.test.ts` ve
  `monthGrids`'i kullanan bütün testler (`npm test`).
- [ ] **Step 5: Commit** — `feat(takvim): tek ayın ızgarası, gün etiketi ve ay kaydırma saf fonksiyonlarda`

### Task 3: `MonthCalendar`

**Files:**
- Create: `src/components/MonthCalendar.tsx`
- Test: Create `src/__tests__/month-calendar.test.tsx`

**Interfaces:**
- Consumes: Task 2'nin üç fonksiyonu; `clubCalendar`.
- Produces: `MonthCalendar({ events, onOpen }: { events: ClubEvent[]; onOpen: (id: string) => void })`.
  Açılışta bu ay. Kaydırma 0…`max(12, son etkinliğin ayına uzaklık)`.
  Düğme etiketleri "Önceki ay" / "Sonraki ay". Hücre etiketi
  `dayLabelOf(...)` + `", bugün"` + `", etkinlik: <başlık>"`.

- [ ] **Step 1: Failing test** (`jest.useFakeTimers({ now: new Date('2026-09-30T09:00:00Z') })`)

- etkinliksiz: `getByRole('header', { name: 'Eylül 2026' })`;
  `getByLabelText('30 Eylül 2026, Çarşamba, bugün')`; "Önceki ay" `disabled`.
- "Sonraki ay" → "Ekim 2026", "Önceki ay" → "Eylül 2026". 12 kez ileri → "Eylül 2027"
  ve "Sonraki ay" `disabled`.
- 12 Ekim 2026'daki "Hackathon": bir ay ileri, sonra
  `getByRole('button', { name: '12 Ekim 2026, Pazartesi, etkinlik: Hackathon' })`;
  dokununca `onOpen('e1')`.
- 20 Kasım 2027'deki etkinlik: 14 kez ileri gidilebiliyor, o gün düğme.
- Bugünden önceki gün (`29 Eylül 2026, Salı`) düğme değil.
- Saat `2026-09-30T21:30:00Z` iken başlık "Ekim 2026",
  `'1 Ekim 2026, Perşembe, bugün'` var.

- [ ] **Step 2: Kırmızıyı gör** — modül yok.
- [ ] **Step 3: Uygula**

Tasarımın erişilebilirlik maddeleri: başlık `accessibilityRole="header"` ve
`accessibilityLiveRegion="polite"`; ‹ › 44 pt; gün adları satırı ve boş hücreler
`importantForAccessibility="no-hide-descendants"` / `accessibilityElementsHidden`;
gün numarası `maxFontSizeMultiplier={1.3}`; bugün halka (`colors.blue500` kenar), geçmiş
gün `colors.faint`, etkinlik günü `colors.blue100` dolgu ve nokta. Hücre ölçüleri
bugünkü `MonthCard`'dan (`dayCell`, `dayInner`, `dayDot`).

- [ ] **Step 4: Yeşili gör** — `npx jest src/__tests__/month-calendar.test.tsx && npm run typecheck`
- [ ] **Step 5: Commit** — `feat(takvim): gezilebilir, erişilebilir ay takvimi`

### Task 4: Takvim ekranı

**Files:**
- Modify: `app/(tabs)/takvim.tsx`
- Test: Create `src/__tests__/takvim-screen.test.tsx`

**Interfaces:**
- Consumes: Task 3 `MonthCalendar`.

- [ ] **Step 1: Failing test** — `useContent` taklit; saat sabit.
  - boş: "Eylül 2026" başlığı ve "Takvim henüz boş" birlikte; `queryByText('Liste')` yok.
  - `error` dolu: takvim ve "Etkinlikler yüklenemedi".
  - etkinlik var: takvim ve etkinliğin satırı (başlığı) listede.
- [ ] **Step 2: Kırmızıyı gör** — boşken takvim yok.
- [ ] **Step 3: Uygula**

Sıra: başlık → `ContentNotice` (hata varsa) → `MonthCalendar` → liste ya da boş kart.
`Segmented`, `view` durumu, `GridView`, `MonthCard` ve yalnız onların stilleri
(`monthBar`, `monthNav`, `weekRow`, `weekCell`, `grid`, `dayCell`, `dayInner`,
`dayDot`, `compactRow`, `compactStripe`) siliniyor. Başlık yorumu ("Nothing to switch
between…") siliniyor. Sonra `node scripts/check-release.mjs`: kaldırılan koda bakan bir
kontrol varsa taşınan koda uyarlanıyor; kırmızıyı ve yeşili görmeden güvenilmiyor.

- [ ] **Step 4: Yeşili gör** — `npx jest src/__tests__/takvim-screen.test.tsx src/__tests__/pixel-refresh.test.tsx && npm run typecheck && node scripts/check-release.mjs`
- [ ] **Step 5: Commit** — `feat(takvim): takvim her zaman görünüyor; boşken de, liste altında`

### Task 5: Soluk alana dokununca kapatma

**Files:**
- Modify: `src/components/ZoomableImage.tsx`, `src/components/PhotoViewer.tsx`
- Test: Modify `src/__tests__/zoomable-image.test.tsx`, `src/__tests__/photo-viewer.test.tsx`

**Interfaces:**
- Produces:
  - `BACKDROP_MARGIN = 24`.
  - `isBackdropTap(x, y, frameW, frameH, contentW, contentH, margin = BACKDROP_MARGIN): boolean`
    (`'worklet'`). Nokta, ortalanmış içerik dikdörtgeninin `margin` kadar dışındaysa true.
  - `ZoomableImage` isteğe bağlı `onBackdropPress?: () => void`; hareket kimliği
    `${testID}-tap`.

- [ ] **Step 1: Failing test**

```ts
// kadraj 390×844, içerik 390×260 (yatay fotoğraf): y 292…552
it.each([
  [195, 100, true],   // üst soluk alan
  [195, 280, false],  // 24 pt'lik bantta
  [195, 400, false],  // fotoğrafın üstünde
  [195, 600, true],   // alt soluk alan
])('isBackdropTap(%p, %p) → %p', …);
```

Bileşen: görselin `load` olayı 1200×800 ile ateşleniyor. Sonra:
- `foto-0-tap`'e (195, 100) tek dokunuş → `onBackdropPress` 1 kez;
- (195, 400) → çağrılmıyor;
- iki parmakla 2×'e yakınlaşınca (195, 100) → çağrılmıyor.

Görüntüleyici: soluk alana dokunuş `onClose`'u çağırıyor.

- [ ] **Step 2: Kırmızıyı gör** — `isBackdropTap` tanımsız.
- [ ] **Step 3: Uygula**

`Gesture.Tap().maxDistance(10)`; `onEnd((e, ok) => …)`. Koşul: `ok`, `saved.value <= 1`,
`isBackdropTap(e.x, e.y, width, height, cw, ch)`; `scheduleOnRN(onBackdropPress)`.
Birleşim: `Race(Exclusive(doubleTap, tap), Simultaneous(pinch, pan))` — tek dokunuş çift
dokunuşun düşmesini bekliyor. `PhotoViewer` `onBackdropPress={onClose}` veriyor.

- [ ] **Step 4: Yeşili gör** — `npx jest src/__tests__/zoomable-image.test.tsx src/__tests__/photo-viewer.test.tsx src/__tests__/event-photos.test.tsx`
- [ ] **Step 5: Commit** — `feat(galeri): fotoğrafın dışındaki soluk alana tek dokunuş kapatıyor`

### Task 6: Kapanış

- [ ] `npm run check:all` · `npx expo export --platform ios` · `npm run check:bundle` —
  üçü de 0.
- [ ] Son inceleme: `fable-reviewer`, `main...feat/takvim-yukleme-kapatma`. Critical
  maddeler düzeltiliyor, Step 1 yeniden koşuyor.
- [ ] Push; PR açıklaması: ne değişti, test, cihazda denenecekler (takvim gezinme ve
  VoiceOver/TalkBack etiketleri, büyük yazı, yükleme animasyonu, soluk alana dokunuş ve
  24 pt pay, çift dokunuşun hâlâ yakınlaştırması), dağıtım yüzeyleri.
