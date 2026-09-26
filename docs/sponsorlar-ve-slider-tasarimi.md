# Sponsorlar ve ana sayfa slider'ı — tasarım

Durum: **onaylandı.** Uygulama planı `docs/sponsorlar-ve-slider-plani.md`.

Karar özeti:

- Ana sayfanın yeni sırası: header → slider → Sponsorlarımız → Yaklaşan
  Etkinlikler → Duyurular.
- İki yeni Firestore koleksiyonu: `slides` (sosyal medya ekibinin girdiği
  slaytlar) ve `sponsors`. İkisi de istemciye yalnız `active` olanları veriyor ve
  zorunlu `order` alanına göre sıralanıyor.
- Slaytlarda isteğe bağlı bir bitiş tarihi (`endsAt`) var. Tarihi geçen slaytı
  panelin zamanlayıcısı **siliyor** (görseliyle birlikte); bitiş tarihi olmayan
  slayt kalıcı.
- İçerik panelden giriliyor. Sıra sürükle-bırak ya da ↑/↓ ile değiştiriliyor;
  bir öğe bir sıraya konunca diğerleri kayıyor.
- Uygulamada iki yeni ekran: `/sponsorlar` ve `/sponsor/[id]`. Hesabım'da
  oturumsuz da görünen bir KULÜP grubu. Çekiliş etkinliğinin detayında sponsor
  sayfasına giden bir "Ödülü sağlayan" etiketi.
- Ana sayfada aşağı çekince çıkan yükleniyor göstergesi tema mavisinde.

---

## 1. Kapsam

Bu işte:

- Uygulama: slider, Sponsorlarımız bölümü, yeni sıralama, iki yeni ekran,
  "Ödülü sağlayan" etiketi, Hesabım → KULÜP, yenileme göstergesinin rengi.
- Panel: Slider ve Sponsorlar sayfaları (liste, sıralama, form, görsel
  yükleme, silme) ve süresi dolan slaytları silen zamanlayıcı.
- Veri: `sponsors` ve `slides` için ortak şema modülleri, kurallar,
  `check:rules`, `check:panel`, `check:release` kapsamı, testler.

Bu işte değil:

- Sponsorlara bitiş tarihi. Kullanıcı kararı: yalnız slaytlarda.
- Sponsor listesinde "{n} etkinliği destekledi" sayacı. Kullanıcı kararı:
  kaldırıldı.
- Çekiliş olmayan etkinliklerde "destekleyen" etiketi.
- Firebase Storage (§2).
- Mevcut panel sayfalarının görünümü.

## 2. Kaynak metinden ayrıldığımız yerler

| Kaynak metin | Bu tasarım | Neden |
|---|---|---|
| Logo ve slider görselleri Firebase Storage'da | Panel Supabase Storage'a yüklüyor, uygulama bir https adresi okuyor | Cloud Storage 2024 sonrası açılan projelerde Blaze planı istiyor; `admin/photos.ts` bu yüzden Supabase kullanıyor. `PhotoSlot` adresin nerede durduğunu bilmiyor. |
| Panel ayrı iş | Bu işte | Kullanıcı kararı: sıra kaydırma ve sürükle-bırak panelde olmalı. |
| `order` sıralama için | `order` zorunlu; panel her değişiklikte 1…n yeniden yazıyor | Kullanıcı kararı: bir öğe 1 numaraya konunca diğerleri kaymalı. |
| Slayt şemasında bitiş yok | İsteğe bağlı `endsAt: "YYYY-AA-GG"`; tarihi geçince panel siliyor | Kullanıcı kararı. |
| "Eskimiş ya da uydurma içerik gösterme" | Uygulama slaytın iddiasını ("BUGUN" gibi) doğrulamıyor; güncellik ekibin işi. Uydurma içerik yok: yerel yedek slayt ya da sponsor yok, veri yoksa bölüm çizilmiyor. | Kullanıcı kararı. |
| Listede "{n} etkinliği destekledi" | Kaldırıldı | Kullanıcı kararı. |
| "Ödülü sağlayan" yalnız sponsor detayında | Ayrıca çekiliş etkinliğinin detayında, sponsor sayfasına giden etiket | Kullanıcı kararı. Çekiliş kuralları zaten "ödülü sağlayan taraf varsa ilgili etkinliğin açıklamasında belirtilir" diyor. |
| `src/sponsors.ts` | `src/sponsors.tsx` | Provider JSX taşıyor. |
| `useSlides`, useContent'e benzer | Provider'sız hook | Tek tüketicisi ana sayfa. |
| Kicker serbest metin | `BUGUN` / `CEKILIS` / `DUYURU`; ikon bundan türüyor | Tasarımın rozet dili ASCII ("SON GUN", "CEKILIS"). Pixel fontunda Türkçe harfler var, yani bu bir font sınırı değil. Değer sabit bir liste, çünkü ikon ondan seçiliyor. |
| `src/sponsorSchema.ts` + `src/slideSchema.ts` | Tek modül: `src/vitrinSchema.ts` | İki koleksiyon `isOrder`, `byOrder` ve https denetimini paylaşıyor; ayrı dosyada ya birbirini içe aktarırlar ya kopyalarlardı. |
| Otomatik geçiş her zaman | "Hareketi azalt" ya da ekran okuyucu açıkken kapalı | Onaylanan öneri: kendi kendine kayan içerik ekran okuyucuyla gezeni yerinden eder (WCAG 2.2.2). |
| Beyaz renk | `colors.white` token'ı | "Sabit hex kullanma" kuralı. Mevcut `"#fff"`'lere dokunulmuyor. |

## 3. Veri modeli

### 3.1 `sponsors/{id}`

Kimlik Firestore'un ürettiği rastgele kimlik; panel formda kimlik sormuyor.

| Alan | Tip | Zorunlu | Not |
|---|---|---|---|
| `name` | string | evet | |
| `order` | tam sayı ≥ 1 | evet | Panel 1…n yazıyor. |
| `active` | boolean | evet | Kural ve sorgu `== true` istiyor. |
| `sector` | string | hayır | |
| `description` | string | hayır | |
| `logo` | string, https | hayır | Panelin yüklediği adres. |
| `url` | string, https | hayır | Web sitesi. |
| `eventIds` | string[] | hayır | Panelde etkinlik listesinden seçiliyor. |

### 3.2 `slides/{id}`

| Alan | Tip | Zorunlu | Not |
|---|---|---|---|
| `title` | string | evet | |
| `target` | map | evet | `{type:'event', id}`, `{type:'announcement', id}` ya da `{type:'url', url}` (https). |
| `order` | tam sayı ≥ 1 | evet | |
| `active` | boolean | evet | |
| `image` | string, https | hayır | Panelin yüklediği adres. |
| `kicker` | `BUGUN` \| `CEKILIS` \| `DUYURU` | hayır | Yoksa rozet çizilmiyor. |
| `meta` | string | hayır | |
| `endsAt` | string, `YYYY-AA-GG` | hayır | Yoksa kalıcı. Varsa o gün dahil görünür, ertesi gün panel siler. |

### 3.3 Ayrıştırma ve doğrulama

- `src/vitrinSchema.ts` saf bir modül. Hem uygulama hem panel kullanıyor,
  `announcementApi.ts`'in panelle paylaşılması gibi.
  - `buildSponsor(input)` / `buildSlide(input)`: panel formunun doğrulaması,
    `buildEvent` gibi `{ ok, value } | { ok: false, errors }` döndürüyor.
  - `toSponsor(id, raw)` / `toSlide(id, raw)`: uygulamanın okuması. Zorunlu
    alanı eksik ya da bozuk doküman atlanıyor; listeyi düşürmüyor
    (`toAnnouncement` ile aynı ilke). İsteğe bağlı alanlar bozuksa yok
    sayılıyor: https olmayan görsel yer tutucuya, tanınmayan kicker rozetsiz
    slayta dönüyor.
  - `sponsorEvents(sponsor, events, archive, hasRaffle)`: sponsor detayındaki
    satırlar. `hasRaffle`, `useContent().getRaffle` üzerinden
    `(eventId) => boolean`.
- https denetimi elle yazılmıyor: `src/gundem/data-access/sourceUrl.ts`'teki
  `parseSourceUrl`. React Native'in `URL`'i adres ayrıştırmıyor, bu yardımcı
  ayrıştırıyor. Döndürdüğü `host` sponsor detayındaki alan adı satırı.

### 3.4 Sıralama, görünürlük, silinme

- `order` artan. Panel her değişiklikte 1…n yazdığı için eşitlik olmuyor;
  Console'dan elle girilmiş bir eşitlikte kimlik karar veriyor (her açılışta
  aynı sıra).
- Uygulama slaytı `endsAt` yoksa ya da `endsAt >= todayLocal(new Date())`
  iken gösteriyor. İkisi de `YYYY-AA-GG` olduğu için metin karşılaştırması
  yetiyor. Biçimi bozuk bir `endsAt` (yalnız Console'dan elle yazılabilir)
  slaytı gizliyor.
- Panelin zamanlayıcısı `endsAt`'i geçmiş slaytları siliyor (§5.5). Uygulamanın
  kendi süzmesi de duruyor: gece yarısıyla zamanlayıcının bir sonraki turu
  arasında ya da panel kapalıyken süresi dolan slayt görünmesin diye.
- `active=false` bir slaytı ya da sponsoru bir sonraki okumada kaldırıyor.

### 3.5 Kurallar

```
match /sponsors/{id} {
  allow read: if resource.data.active == true;
  allow write: if false;
}
match /slides/{id} {
  allow read: if resource.data.active == true;
  allow write: if false;
}
```

- İstemci sorgusu `where('active', '==', true)`, sıralama istemcide; birleşik
  indeks gerekmiyor. Panel Admin SDK ile yazıyor, kurala takılmıyor.
- Pasif doküman (taslak) istemciye hiç gelmiyor.
- `check:rules` senaryoları, iki koleksiyon için de: aktif liste okunur,
  filtresiz liste reddedilir, aktif doküman `getDoc` ile okunur, pasif doküman
  okunamaz, istemci yazamaz.

## 4. Uygulama

### 4.1 Okuma ve durum

- `src/firebase.ts`: `COLLECTIONS.sponsors`, `COLLECTIONS.slides`,
  `fetchSponsors()`, `fetchSlides()`. Aynı `withTimeout`; `fetchContent`'in
  `Promise.all`'ına girmiyorlar, yani bu okumalar düşse de etkinlikler düşmüyor.
- `src/sponsors.tsx`: `SponsorsProvider` ve `useSponsors()` →
  `{ sponsors, loading, error, refresh, get(id) }`. `AnnouncementsProvider` ile
  aynı durum makinesi: iptal bayrağı, `nonce` ile yenileme, hata olunca eldeki
  liste korunuyor. Firebase yapılandırılmamışsa `error` doluyor (`content.tsx`
  gibi). `app/_layout.tsx`'te `AnnouncementsProvider`'ın yanında, çünkü sponsor
  listesini dört ekran okuyor.
- `src/slides.ts`: `useSlides()` → `{ slides, loading, error, refresh }`,
  provider'sız.
- İki okuma da `import('./firebase')` ile dinamik; Firestore SDK'sı başlangıç
  paketine girmiyor.

### 4.2 Ana sayfa (`app/(tabs)/index.tsx`)

Sıra: header (değişmiyor) → içerik hatası varsa bugünkü gibi `ContentNotice` →
slider → Sponsorlarımız → Yaklaşan Etkinlikler → Duyurular.

**Slider: `src/components/HomeSlider.tsx`**

- Header'dan 20px aşağıda yatay bir `FlatList`. Kaydırma
  `snapToInterval = (ekran − 40) + 12` ile yapılıyor; `pagingEnabled` ekran
  genişliğinde sayfaladığı için 20px kenar boşluğuyla uyuşmuyor. Kart 190
  yüksekliğinde, radius 16. `shadow.card` dış sarmalayıcıda, çünkü
  `overflow: hidden` iOS'ta gölgeyi kesiyor.
- Kart: tam kaplayan `PhotoSlot` (cover). Üstünde alttan yukarı
  `gradients.slideShade` (`navy900`'den türüyor: %35'te `rgba(0,27,74,0)`,
  %100'de `rgba(0,27,74,0.85)`). `LinearGradient`'in varsayılan yönü zaten yukarı
  → aşağı. Sol altta `PixelBadge` (zemin blue500, yazı `colors.white`, ikon
  kicker'dan: BUGUN → `cal`, CEKILIS → `gift`, DUYURU → `star`). Altında başlık
  (Txt extrabold 18, `colors.white`, tracking -0.3, en fazla 2 satır), onun
  altında meta (Txt 12, `colors.onNavy`, 1 satır).
- Noktalar kartların altında, ortada. Aktif nokta 20×6 blue500, diğerleri 6×6
  `dotIdle`, radius 3. Her nokta bir düğme: `hitSlop`'lu, "3. slayta git" diye
  okunuyor, `selected` durumu taşıyor. **Tek slayt varsa noktalar ve otomatik
  geçiş yok.**
- Otomatik geçiş: 4,5 saniyede bir sonraki slayta, sondan sonra başa. Kullanıcı
  kaydırmaya başlayınca duruyor, bırakınca sayaç baştan başlıyor. Ekran odakta
  değilken (`useFocusEffect`) çalışmıyor. "Hareketi azalt" ya da ekran okuyucu
  açıksa hiç başlamıyor; açılışta bir kez bakılıyor, dinleyici kurulmuyor.
- Dokunma: `event` → `useOpenEvent(id)`; `announcement` → `/duyuru/[id]`
  (ana sayfadaki duyuru satırlarıyla aynı yol); `url` →
  `Linking.openURL(url).catch(() => {})`. Adres ayrıştırmada https olarak
  doğrulanmış.
- Erişilebilirlik: `url` hedefli kartlar `link`, diğerleri `button`. Etiket
  okunur Türkçe: "Bugün: {başlık}. {meta}". Rozette ASCII (BUGUN) yazıyor,
  ekran okuyucu doğrusunu (Bugün) okuyor.

**Sponsorlarımız (sayfanın içinde)**

- `SectionTitle icon="grid"`, üst boşluk 20. Sağda "Tümü →" (Txt semibold 12,
  blue500) `/sponsorlar`'a gidiyor.
- Yatay `ScrollView`, yatay padding 20, gap 10. Her öğe 112 genişlikte `Card`
  (radius lg). İçinde 90×56 logo (`PhotoSlot` contain, `colors.bg` zemin,
  radius 9), altında tek satır ad (Txt bold 12). Dokununca `/sponsor/[id]`.
- Sonda "Sponsor ol" kartı: aynı boyut, 1.5px kesik çizgili blue200 çerçeve,
  şeffaf zemin, ortada "+" ve "Sponsor ol" (blue500 bold 12) → `/sponsorlar`.
  Satırın çapraz ekseni `stretch` olduğu için diğer kartlarla aynı yükseklikte.

**Görünme:** her iki bölüm de yalnızca **hata yoksa ve en az bir öğe varsa**
çiziliyor. İlk yüklemede liste boş olduğu için çizilmiyorlar; yenileme sırasında
eldeki öğeler kalıyor. İskelet ekran yok.

**Aşağı çekip yenileme:** etkinlikler, slaytlar, sponsorlar ve duyurular. Duyurular
bugün ana sayfada çekince yenilenmiyor; aynı satıra bir çağrı eklemek bu
tutarsızlığı da kapatıyor.

### 4.3 `/sponsorlar` (`app/sponsorlar.tsx`)

- Header: `GradientHeader` (`gradients.section`). Solda `GlassButton label="‹"`
  (`accessibilityLabel="Geri"`), yanında "Sponsorlarımız" (Txt extrabold 20,
  `colors.white`). Altında "Kulübün etkinliklerini destekleyen kurumlar."
  (Txt 13, `colors.white`, opacity 0.82), en altta `DottedRule`.
- Gövde, sırasıyla:
  - Hata varsa `ContentNotice onRetry={refresh}`. Eldeki liste altında kalıyor;
    bileşenin varsayılan metni zaten "Gördüklerin son bilinen hâli" diyor.
  - Liste doluysa satırlar. Her satır bir `Card`: 56×56 logo (contain,
    radius 12), ad (Txt bold 15), sektör (Txt 12.5, muted), sağda "›". Dokununca
    `/sponsor/[id]`; ekran okuyucu "{ad}, {sektör}" okuyor.
  - Liste boşsa: yükleniyorsa `EmptyState` "Yükleniyor" / "Sponsorlar
    getiriliyor."; yükleme bitmiş ve hata yoksa `EmptyState` "Henüz sponsor
    yok" / "Kulübü destekleyen kurumlar burada listelenecek.".
  - Her durumda en altta "Sponsor ol" kartı: `gradients.home` zemin, radius 16,
    padding 18. `PixelTxt` "SPONSOR OL" (blue200), "Kulübü desteklemek ister
    misin?" (Txt extrabold 16, `colors.white`), "Atölye, hackathon ya da teknik
    gezi için destek olabilirsin. Ekibimiz seninle iletişime geçer." (Txt 13,
    blue100). En altta beyaz dolgulu "İletişime geç" düğmesi →
    `mailto:info@kouseng.com?subject=Sponsorluk`. Adres `src/data.ts`'te
    `SPONSOR_CONTACT_EMAIL` sabiti; oradaki yasal URL'lerin yanında.

### 4.4 `/sponsor/[id]` (`app/sponsor/[id].tsx`)

- Header: `GradientHeader` (`gradients.form`), yalnız `GlassButton label="‹"`,
  alttan 64 padding.
- Sponsor bulunduysa:
  - Header'ın üstüne 48px binen `Card` (`marginTop: -48`, `shadow.card`): 88×88
    logo (contain, radius 16), ad (Txt extrabold 22, navy900), sektör `Tag`
    olarak, tanıtım paragrafı (Txt 14.5, leading 1.68, textBody).
  - "Desteklediği etkinlikler" başlığı ve satırlar. Satırlar
    `sponsorEvents(...)`'ten geliyor: `eventIds`, `useContent`'in `events` ve
    `archive` listelerinden kimlikle eşleniyor, eşleşmeyenler düşüyor. Önce
    yaklaşanlar (takvim sırası), sonra geçmişler (arşiv sırası). Her satırda
    solda 4px dikey çizgi (yaklaşan blue500, geçmiş blue200), başlık ve `short`,
    sağda "›". Etkinlik bir çekilişse satırda "Ödülü sağlayan" `Tag`'i var.
    Dokununca `useOpenEvent`. Hiç satır yoksa başlık da çizilmiyor.
  - `url` varsa en altta `PrimaryButton` "Web sitesine git"
    (`Linking.openURL`), altında alan adı (Txt 12, faint).
- Sponsor bulunamadıysa:
  - yükleniyorsa `EmptyState` "Yükleniyor";
  - hata varsa `ContentNotice` (yeniden dene);
  - değilse `EmptyState` "Sponsor bulunamadı" / "Bu kurum listeden kaldırılmış
    ya da bağlantı eskimiş olabilir." / "Geri dön" → `router.back()`.

Sponsor bulunduğunda sayfada görünen hiçbir metin "sponsor" kelimesini
taşımıyor; ekranın başlığı kurumun adı. "Sponsor bulunamadı" yalnızca kimlik
eşleşmediğinde çıkıyor. §4.5'teki etiket ise yalnızca listede bulunan bir kurum
için çiziliyor. Bu yüzden çekilişten bu sayfaya geçiş §4.5'teki kuralı bozmuyor.

### 4.5 Etkinlik detayı — "Ödülü sağlayan"

- Yeni bileşen `src/components/PrizeProviders.tsx`: "Ödülü sağlayan" başlığı ve
  her kurum için bir etiket. Dokununca `/sponsor/{id}`; ekran okuyucu "Ödülü
  sağlayan: {ad}" okuyor. Liste boşsa hiçbir şey çizmiyor.
- `app/etkinlik/[id].tsx`: yalnızca çekiliş etkinliğinde,
  `sponsors.filter(s => s.eventIds.includes(event.id))` sonucunu
  "Etkinlik hakkında" bloğunun sonuna, etiketlerin altına koyuyor.
- Kural: bu bileşenin ekrana yazdığı hiçbir metin "sponsor" kelimesini
  taşımıyor. Apple 5.3.2 çekilişin sponsorunun geliştirici olmasını istiyor ve
  `raffleLegal.ts` ödülü sağlayanın sponsor olmadığını söylüyor. Bu iddia bir
  render testiyle korunuyor (§7).

### 4.6 Hesabım (`app/(tabs)/hesap.tsx`)

- AYARLAR'ın üstüne, oturum koşulunun dışında: `GroupLabel` "KULÜP" ve tek bir
  `SatirLink` (icon `grid`, "Sponsorlarımız", ipucu "Kulübü destekleyen
  kurumlar") → `/sponsorlar`.
- `SatirLink`'e `accessibilityLabel={label}` ekleniyor; bütün satırlara yarıyor.

### 4.7 Rotalar

`app/_layout.tsx`: `<Stack.Screen name="sponsorlar" />`,
`<Stack.Screen name="sponsor/[id]" />` ve `SponsorsProvider`.

### 4.8 Tema ve ortak bileşenler

- `src/theme.ts`: `colors.white`, `gradients.slideShade`. Yeni ikon yok: `grid`,
  `cal`, `gift` ve `star` zaten var.
- `src/components/PhotoSlot.tsx`: isteğe bağlı `resizeMode` (varsayılan `cover`);
  logolar `contain` kullanıyor.
- Dokunulabilir her yeni öğe `accessibilityRole` ve `accessibilityLabel`
  taşıyor.

### 4.9 Yenileme göstergesi

- Ana sayfanın `RefreshControl`'ü `tintColor={colors.blue200}` taşıyordu: açık
  zeminde görünmüyor. `blue500` oluyor (takvim ve arşiv zaten `blue500`).
- Android için hiçbir ekranda renk verilmemiş (`tintColor` yalnız iOS). Ana
  sayfa, takvim ve arşive `colors={[colors.blue500]}`. AI Gündem'e
  dokunulmuyor.

## 5. Panel

### 5.1 Menü

`page()` menüsüne **Slider** (`/slider`) ve **Sponsorlar** (`/sponsorlar`).

### 5.2 Liste sayfası

```
┌ Slider ──────────────────────────────────── [+ Yeni slayt] ┐
│ Uygulamada ana sayfanın üstünde bu sırayla döner.            │
│ ⠿ 1 [görsel] Hackathon kayıtları açıldı      ● Yayında  ↑ ↓ │
│              DUYURU · bağlantı · 12 Eki'ye kadar    Düzenle │
│ ⠿ 2 [görsel] Git atölyesi bugün              ○ Pasif    ↑ ↓ │
│              BUGUN · etkinlik · süresiz             Düzenle │
└──────────────────────────────────────────────────────────────┘
```

- Satırlar `order` sırasında. Her satırda tutamaç, sıra numarası, küçük görsel
  (logo ya da slayt), başlık ve alt satır, durum etiketi (Yayında / Pasif), ↑ ↓
  ve Düzenle.
- **Sürükle-bırak:** masaüstünde HTML5 sürükle-bırak, sayfanın içinde küçük bir
  script; kütüphane yok. Bırakınca yeni sıra gizli bir formla gönderiliyor,
  sunucu 1…n yazıyor.
- **↑ / ↓:** JavaScript'siz küçük formlar; telefonda ve klavyede de çalışıyor
  (iPhone'da tarayıcının sürükle-bırakı güvenilir değil).
- Pasif öğeler listede yerini koruyor, uygulamada görünmüyor.

### 5.3 Formlar

Slayt formu:

- Başlık*, meta.
- Rozet: Yok / BUGUN / CEKILIS / DUYURU.
- Görsel: yükleme, mevcut görselin önizlemesi, "Görseli kaldır".
- Hedef, üçünden biri: etkinlik (yaklaşan ve geçmiş etkinlik listesinden),
  duyuru (kulüp sitesinin listesinden, `fetchAnnouncements`), bağlantı (https).
- Bitiş tarihi (`<input type="date">`): boş bırakılırsa kalıcı; doluysa o gün
  bitince silinir.
- Sıra: 1…n; seçilen sıraya yerleşiyor, diğerleri kayıyor. Yeni slaytta
  varsayılan 1.
- Yayında kutusu.

Sponsor formu:

- Ad*, sektör, tanıtım, web sitesi (https).
- Logo: yükleme, önizleme, kaldırma. PNG önerilir; şeffaf zemin korunuyor.
- Desteklediği etkinlikler: yaklaşan ve geçmiş etkinliklerin listesinden işaret
  kutusuyla. Çekiliş olanların yanında "uygulamada 'Ödülü sağlayan' olarak
  görünür" notu.
- Sıra: 1…n; yeni sponsorda varsayılan en son.
- Yayında kutusu.

Ortak: hatalı alan formu hatasıyla yeniden çiziyor (etkinlik formu gibi);
"Sil" onay isteyen bir düğme.

### 5.4 Sunucu

- Rotalar `admin/vitrin.ts`'te, `registerVitrin(app, db)` ile ve
  `app.use(requireAuth)`'tan **sonra** kuruluyor. HTML `admin/vitrinView.ts`'te,
  her metin `esc()`'ten geçiyor. Mevcut CSRF denetimi (`sameOrigin`) yeni
  formları da kapsıyor.
- Her iki koleksiyon için: liste, yeni, düzenle, sil, `tasi` (↑/↓) ve `sirala`
  (sürükle-bırak).
- Sıra mantığı saf fonksiyonlarda, `admin/ordering.ts`: yerleştir (bir öğeyi k.
  sıraya koy, diğerleri kaysın), bir adım taşı, 1…n numarala. `sirala`,
  gönderilen kimlik kümesi mevcut kümeyle birebir aynı değilse reddediyor.
  Kayıt ve sıra kayması tek bir Firestore batch'inde yazılıyor.
- Doğrulama `buildSponsor` / `buildSlide` ile; sıra etkinlik formundakiyle
  aynı: doğrula → görseli yükle → yaz → eski görseli sil. Yükleme başarısızsa
  yüklenen geri alınıyor ve form 503 ile yeniden çiziliyor (Cloudflare 502/504
  gövdesini yutuyor).
- `admin/photos.ts` genelleşiyor: `sponsors/{id}/…png` (logo, uzun kenar
  512 px, PNG: şeffaflık), `slides/{id}/…jpg` (uzun kenar 1600 px, JPEG).
  Silme izin listesine bu iki klasör ekleniyor. Öğe silinince klasörü de
  siliniyor. Aynı bucket, yeni ortam değişkeni yok.

### 5.5 Süresi dolan slaytları silen zamanlayıcı

- `startSlideSweeper(db)`: panelin mevcut yoklayıcıları gibi açılışta bir kez,
  sonra saatte bir çalışıyor (`unref`'li). `endsAt < todayLocal(new Date())`
  olan slaytları ve görsel klasörlerini siliyor, kalanları 1…n yeniden
  numaralıyor.
- Silinecek slaytları seçen kısım saf bir fonksiyon (`expiredSlideIds(slides,
  today)`, `src/vitrinSchema.ts`), Jest'te sınanıyor.
- Hata paneli düşürmüyor; `console.error` ile yazılıyor, bir sonraki tur
  yeniden deniyor.

### 5.6 Görünüm

Mevcut panel CSS değişkenleri (navy/blue) ve kart yapısı korunuyor. Yeni
sınıflar yalnız yeni sayfalarda kullanılıyor: gölgeli satır kartları, yuvarlak
durum etiketleri, tutamaç, küçük önizlemeler, mobilde tek sütun.

## 6. Durum tablosu (uygulama)

| | İlk yükleme | Hata | Veri yok |
|---|---|---|---|
| Slider | çizilmez | çizilmez | çizilmez |
| Ana sayfa, Sponsorlarımız | çizilmez | çizilmez | çizilmez |
| `/sponsorlar` | "Yükleniyor" + Sponsor ol | `ContentNotice` + eldeki liste + Sponsor ol | "Henüz sponsor yok" + Sponsor ol |
| `/sponsor/[id]`, eşleşme yok | "Yükleniyor" | `ContentNotice` | "Sponsor bulunamadı" + Geri dön |
| Etkinlik, "Ödülü sağlayan" | çizilmez | eldeki listeyle | çizilmez |

Kurallar yayınlanmadan çıkan bir sürümde okuma reddedilir ve her satır "Hata"
sütunundaki gibi davranır; mevcut hiçbir akış etkilenmez.

## 7. Test ve kontroller

- `src/__tests__/vitrin-schema.test.ts`:
  - `buildSponsor` (ad zorunlu, sıra ≥ 1, https dışı web sitesi reddediliyor),
    `toSponsor` (zorunlu alanı eksik doküman düşüyor, https dışı logo yok
    sayılıyor, `eventIds` temizleniyor), sıralama, `sponsorEvents` (eşleşmeyen
    düşüyor, yaklaşan önce, geçmiş ve çekiliş işaretli).
  - `buildSlide` (başlık ve hedef zorunlu, https dışı bağlantı reddediliyor,
    tarih biçimi, geçmiş bitiş tarihi reddediliyor), `toSlide` (bozuk doküman
    düşüyor, tanınmayan kicker rozetsiz), `visibleSlides` (`endsAt` dün →
    gizli, bugün → görünür, yok → görünür, bozuk → gizli, sıralama),
    `expiredSlideIds`.
- `src/__tests__/sponsors-screen.test.tsx`: okuma düşünce Sponsorlarımız
  ekranı hata şeridini ve "Sponsor ol" kartını gösteriyor, "Henüz sponsor yok"
  demiyor.
- `src/__tests__/prize-providers.test.tsx`: "Ödülü sağlayan" çiziliyor,
  ekrandaki hiçbir metin `/sponsor/i` ile eşleşmiyor, dokununca
  `/sponsor/{id}`.
- `src/__tests__/home-slider.test.tsx`: tek slaytta nokta yok; iki slaytta
  sahte zamanlayıcıyla 4,5 saniye sonra ikinci nokta seçili, bir 4,5 saniye daha
  sonra başa dönüyor; "hareketi azalt" açıkken ilerlemiyor.
- `check:panel`: `admin/ordering.ts` (yerleştir, taşı, `sirala` kümesi),
  görsel yolu izin listesi, vitrin sayfalarının HTML'i.
- `check:rules`: §3.5'teki senaryolar.
- `check:release`, yeni kontroller:
  - "sponsor ekranları bağlı": iki dosya var, iki rota kök yığında kayıtlı,
    `SponsorsProvider` mount ediliyor, Hesabım ve ana sayfa `/sponsorlar`'a
    bağlanıyor, ana sayfa `HomeSlider`'ı, etkinlik detayı `PrizeProviders`'ı
    çiziyor.
  - "vitrin paneli bağlı": `registerVitrin` `requireAuth`'tan sonra kuruluyor,
    `startSlideSweeper` açılışta başlıyor, silme yolları görsel klasörünü de
    siliyor.
  - Her iddia, koruduğu şey kırılınca kırmızı verdiği görülerek ekleniyor.
    Yorumlar `strip()` ile atılıyor.
- Mevcut kontroller kendiliğinden kapsıyor: "her koleksiyonun bir kuralı var"
  (`COLLECTIONS`), "yığın ekranlarında geri düğmesi var" (`label="‹"`),
  "içerik durumu ekranlara bağlı" (ana sayfada `ContentNotice` ve
  `RefreshControl` kalmalı), "QR yoklama zinciri bağlı" (ana sayfada
  `push('/qr')` kalmalı), "yükleme yetim dosya bırakmıyor" (etkinlik yolu
  `uploadEventPhoto` adıyla kalmalı).
- Bitiş ölçütü: `npm run check:all`, `npm run check:rules`,
  `npx expo export --platform ios` ve `npm run check:bundle` yeşil.

## 8. Dağıtım yüzeyleri ve sıra

| Yüzey | Dokunuluyor mu | Canlıya nasıl gider |
|---|---|---|
| Firestore kuralları | evet | `npm run rules:deploy`, operatör çalıştırır. **İlk adım.** |
| Panel | evet (`admin/`) | Coolify redeploy. Yeni ortam değişkeni yok. İkinci adım; ardından ekip içeriği girer. |
| Mobil uygulama | evet (`app/`, `src/`) | EAS build ya da OTA, operatör çalıştırır. Yeni native bağımlılık yok (FlatList, AccessibilityInfo ve Linking çekirdekte), yani OTA'ya uygun. Son adım. |
| AI Gündem veritabanı | hayır | gerekmiyor |
| Yalnız depo | evet | belgeler, testler, `scripts/check-*`, `graphify-out/` |

Bu sırayla uygulama çıktığında slider ve sponsorlar dolu oluyor.

## 9. Varsayımlar

- Sponsor ve slayt sayısı onlarla sınırlı: tek sorgu, sayfalama yok; sıra
  değişikliği bütün listeyi yeniden yazıyor.
- Panelde aynı anda tek kişi sıralama yapıyor; iki eşzamanlı sıralamada son
  yazan kazanıyor.
- Görsel adresleri kalıcı, herkese açık https adresleri (Supabase public URL).
