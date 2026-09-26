# Sponsorlar ve ana sayfa slider'ı — tasarım

Durum: **tasarım, onay bekliyor.** §3 ve §4.1–4.2 sohbette onaylandı; §4.3 ve
sonrası bu belgede ilk kez yazılıyor.

Karar özeti:

- Ana sayfanın yeni sırası: header → slider → Sponsorlarımız → Yaklaşan
  Etkinlikler → Duyurular.
- İki yeni Firestore koleksiyonu: `slides` (sosyal medya ekibinin elle girdiği
  slaytlar) ve `sponsors`. İkisi de istemciye yalnız `active` olanları veriyor ve
  `order`'a göre sıralanıyor. Slaytlarda isteğe bağlı bir bitiş tarihi (`endsAt`)
  var.
- İki yeni ekran: `/sponsorlar` ve `/sponsor/[id]`. Hesabım'da oturumsuz da
  görünen bir KULÜP grubu. Çekiliş etkinliğinin detayında sponsor sayfasına giden
  bir "Ödülü sağlayan" etiketi.
- Görsel, uygulama için yalnızca bir https adresi; nerede barındığı uygulamanın
  işi değil. Panelden yükleme ayrı bir iş (§8).

---

## 1. Kapsam

Bu işte:

- Ana sayfaya slider ve Sponsorlarımız bölümü, yeni sıralama.
- `app/sponsorlar.tsx`, `app/sponsor/[id].tsx`.
- Etkinlik detayında çekiliş için "Ödülü sağlayan" etiketi.
- Hesabım → KULÜP → Sponsorlarımız.
- `sponsors` ve `slides` için okuma, ayrıştırma, kurallar, `check:rules` ve
  `check:release` kapsamı, testler.

Bu işte değil:

- Panelde sponsor ve slayt ekranı, görsel yükleme (§8).
- Sponsorlara bitiş tarihi. Kullanıcı kararı: yalnız slaytlarda.
- Sponsor listesinde "{n} etkinliği destekledi" sayacı. Kullanıcı kararı:
  kaldırıldı.
- Çekiliş olmayan etkinliklerde "destekleyen" etiketi.
- Firebase Storage (§2).

## 2. Kaynak metinden ayrıldığımız yerler

| Kaynak metin | Bu tasarım | Neden |
|---|---|---|
| Logo ve slider görselleri Firebase Storage'da | Uygulama bir https adresi okur; panel işi Supabase Storage'a yükler | Cloud Storage 2024 sonrası açılan projelerde Blaze planı istiyor; `admin/photos.ts` bu yüzden Supabase kullanıyor. `PhotoSlot` adresin nerede durduğunu bilmiyor. |
| Slayt şemasında bitiş tarihi yok | İsteğe bağlı `endsAt: "YYYY-AA-GG"` | Kullanıcı kararı: tarih gelince kendiliğinden kalksın. |
| "Eskimiş ya da uydurma içerik gösterme" | Uygulama slaytın iddiasını ("BUGUN" gibi) doğrulamıyor, güncellik ekibin sorumluluğu. Uydurma içerik yok: yerel yedek slayt ya da sponsor yok, veri yoksa bölüm çizilmiyor. | Kullanıcı kararı. |
| Listede "{n} etkinliği destekledi" | Kaldırıldı | Kullanıcı kararı. |
| "Ödülü sağlayan" yalnız sponsor detayında | Ayrıca çekiliş etkinliğinin detayında, sponsor sayfasına giden etiket | Kullanıcı kararı. Çekiliş kuralları zaten "ödülü sağlayan taraf varsa ilgili etkinliğin açıklamasında belirtilir" diyor. |
| `src/sponsors.ts` | `src/sponsors.tsx` | Provider JSX taşıyor. |
| `useSlides`, useContent'e benzer | Provider'sız hook | Tek tüketicisi ana sayfa. |
| Kicker serbest metin | `BUGUN` / `CEKILIS` / `DUYURU`; ikon bundan türüyor | Pixel fontunda Türkçe harf yok (mevcut rozet de "SON GUN"), ve ikonu seçmek için bilinen bir değer gerekiyor. |
| Otomatik geçiş her zaman | "Hareketi azalt" ya da ekran okuyucu açıkken kapalı | Onaylanan öneri: kendi kendine kayan içerik ekran okuyucuyla gezeni yerinden eder (WCAG 2.2.2). |
| Beyaz renk | `colors.white` token'ı | "Sabit hex kullanma" kuralı. Mevcut `"#fff"`'lere dokunulmuyor. |

## 3. Veri modeli

### 3.1 `sponsors/{id}`

| Alan | Tip | Zorunlu | Not |
|---|---|---|---|
| `name` | string | evet | Boşsa doküman atlanır. |
| `sector` | string | hayır | |
| `description` | string | hayır | |
| `logo` | string, https | hayır | https değilse yok sayılır ve yer tutucu çizilir. |
| `url` | string, https | hayır | https değilse yok sayılır; "Web sitesine git" çizilmez. |
| `eventIds` | string[] | hayır | Dizi değilse `[]`; dize olmayan öğeler atlanır. |
| `order` | number | hayır | Küçük önce; yoksa sona. |
| `active` | boolean | kural için | Kural ve sorgu `== true` istiyor. |

### 3.2 `slides/{id}`

| Alan | Tip | Zorunlu | Not |
|---|---|---|---|
| `title` | string | evet | Boşsa doküman atlanır. |
| `target` | map | evet | `{type:'event', id}`, `{type:'announcement', id}` ya da `{type:'url', url}`. Bozuksa ya da url https değilse doküman atlanır. |
| `image` | string, https | hayır | https değilse yok sayılır ve gradyan yer tutucu çizilir. |
| `kicker` | `BUGUN` \| `CEKILIS` \| `DUYURU` | hayır | Başka bir değerde rozet çizilmez, slayt yine görünür. |
| `meta` | string | hayır | |
| `order` | number | hayır | Küçük önce; yoksa sona. |
| `endsAt` | string, `YYYY-AA-GG` | hayır | O gün dahil görünür. Biçimi bozuksa slayt gizlenir: yanlış yazılmış bir bitiş tarihi, slaytın sonsuza kadar kalmasına dönüşmesin. |
| `active` | boolean | kural için | |

### 3.3 Console'dan giriş (panel gelene kadar)

Panel desteği ayrı iş olduğu için ilk veri Firebase Console'dan giriliyor.
Console doğrulamayı atlıyor; o yüzden §3.4'teki ayrıştırma katı.

`slides/hackathon-2026` örneği:

```
title:   "Hackathon kayıtları açıldı"        (string)
meta:    "48 saat · 12 Ekim · Mühendislik B"  (string)
kicker:  "DUYURU"                             (string)
image:   "https://…/hackathon.jpg"            (string)
target:  { type: "url", url: "https://kouseng.com/hackathon" }  (map)
order:   1                                    (number)
endsAt:  "2026-10-12"                         (string)
active:  true                                 (boolean)
```

`sponsors/ornek-firma` örneği:

```
name:        "Örnek Yazılım A.Ş."   sector: "Yazılım"
description: "…"                    logo:   "https://…/logo.png"
url:         "https://ornek.com"    eventIds: ["git-atolyesi", "bahar-cekilisi"]
order:       1                      active: true
```

### 3.4 Ayrıştırma

- `src/sponsorSchema.ts`: `toSponsor(id, raw) → Sponsor | null`, sıralama ve
  `sponsorEvents(sponsor, events, archive, hasRaffle)` (sponsor detayındaki
  satırlar; `hasRaffle` = `useContent().getRaffle` üzerinden
  `(eventId) => boolean`). Saf modül; `firebase.ts` onu içe aktarıyor,
  `raffleSchema` ile aynı düzen.
- `src/slideSchema.ts`: `toSlide(id, raw) → Slide | null` ve
  `visibleSlides(slides, today)` (bitiş tarihi ve sıralama).
- https denetimi elle yazılmıyor: `src/gundem/data-access/sourceUrl.ts`'teki
  `parseSourceUrl`. React Native'in `URL`'i adres ayrıştırmıyor, bu yardımcı
  ayrıştırıyor. Döndürdüğü `host` sponsor detayındaki alan adı satırı.
- Bozuk bir doküman listeyi düşürmüyor, atlanıyor: `announcementApi.ts`'teki
  `toAnnouncement` ile aynı ilke.

### 3.5 Sıralama ve görünürlük

- `order` artan; `order`'ı olmayanlar sonda. Eşitlikte sponsorlar ada göre
  (`localeCompare(…, 'tr')`), slaytlar kimliğe göre, yani her açılışta aynı sıra.
  Ad sıralaması yalnız görüntü için; sayfalama olmadığından Hermes'in platform
  harmanlayıcısının küçük farkları bir şey bozmuyor.
- Slayt `endsAt >= todayLocal(new Date())` iken görünür. İkisi de `YYYY-AA-GG`
  olduğu için metin karşılaştırması yetiyor. Karar okuma ve yenileme anında
  veriliyor: uygulama gece yarısını açık geçirirse slayt yenilemeye kadar kalır.
  Takvimdeki `splitByDate` ile aynı davranış.
- `active=false` bir slaytı ya da sponsoru bir sonraki okumada kaldırır.

### 3.6 Kurallar

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

- İstemci sorgusu `where('active', '==', true)`, sıralama istemcide yapılıyor;
  birleşik indeks gerekmiyor.
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
    sağda "›". Etkinlik bir çekilişse (`getRaffle(id)`) satırda "Ödülü sağlayan"
    `Tag`'i var. Dokununca `useOpenEvent`. Hiç satır yoksa başlık da çizilmiyor.
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
  render testiyle korunuyor (§6).

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

## 5. Durum tablosu

| | İlk yükleme | Hata | Veri yok |
|---|---|---|---|
| Slider | çizilmez | çizilmez | çizilmez |
| Ana sayfa, Sponsorlarımız | çizilmez | çizilmez | çizilmez |
| `/sponsorlar` | "Yükleniyor" + Sponsor ol | `ContentNotice` + eldeki liste + Sponsor ol | "Henüz sponsor yok" + Sponsor ol |
| `/sponsor/[id]`, eşleşme yok | "Yükleniyor" | `ContentNotice` | "Sponsor bulunamadı" + Geri dön |
| Etkinlik, "Ödülü sağlayan" | çizilmez | eldeki listeyle | çizilmez |

Kurallar yayınlanmadan çıkan bir sürümde okuma reddedilir ve her satır "Hata"
sütunundaki gibi davranır; mevcut hiçbir akış etkilenmez.

## 6. Test ve kontroller

- `src/__tests__/sponsor-schema.test.ts`: `toSponsor` (ad zorunlu, https dışı
  logo ve url düşüyor, `eventIds` temizleniyor), sıralama (`order`, `order`'sızlar
  sonda, eşitlikte ad), `sponsorEvents` (eşleşmeyen düşüyor, yaklaşan önce,
  geçmiş ve çekiliş işaretli).
- `src/__tests__/slide-schema.test.ts`: `toSlide` (başlıksız ya da hedefsiz
  düşüyor, https olmayan url hedefi düşüyor, bilinmeyen kicker rozetsiz),
  `visibleSlides` (`endsAt` dün → gizli, bugün → görünür, bozuk → gizli,
  sıralama).
- `src/__tests__/prize-providers.test.tsx`: "Ödülü sağlayan" çiziliyor,
  ekrandaki hiçbir metin `/sponsor/i` ile eşleşmiyor, dokununca
  `/sponsor/{id}`.
- `src/__tests__/home-slider.test.tsx`: tek slaytta nokta yok; iki slaytta
  sahte zamanlayıcıyla 4,5 saniye sonra ikinci nokta seçili, bir 4,5 saniye daha
  sonra başa dönüyor; "hareketi azalt" açıkken ilerlemiyor.
- `check:rules`: §3.6'daki senaryolar.
- `check:release`, yeni kontrol "sponsor ekranları bağlı": iki dosya var, iki
  rota kök yığında kayıtlı, `SponsorsProvider` mount ediliyor, Hesabım ve ana
  sayfa `/sponsorlar`'a bağlanıyor, ana sayfa `HomeSlider`'ı, etkinlik detayı
  `PrizeProviders`'ı çiziyor. Her iddia, koruduğu şey kırılınca kırmızı verdiği
  görülerek ekleniyor. Yorumlar `strip()` ile atılıyor.
- Mevcut kontroller kendiliğinden kapsıyor: "her koleksiyonun bir kuralı var"
  (`COLLECTIONS`), "yığın ekranlarında geri düğmesi var" (`label="‹"`),
  "içerik durumu ekranlara bağlı" (ana sayfada `ContentNotice` ve
  `RefreshControl` kalmalı), "QR yoklama zinciri bağlı" (ana sayfada
  `push('/qr')` kalmalı).
- Bitiş ölçütü: `npm run check:all`, `npm run check:rules`,
  `npx expo export --platform ios` ve `npm run check:bundle` yeşil.

## 7. Dağıtım yüzeyleri ve sıra

| Yüzey | Dokunuluyor mu | Canlıya nasıl gider |
|---|---|---|
| Mobil uygulama | evet (`app/`, `src/`) | EAS build ya da OTA, operatör çalıştırır. Yeni native bağımlılık yok (FlatList, AccessibilityInfo ve Linking çekirdekte), yani OTA'ya uygun. |
| Firestore kuralları | evet | `npm run rules:deploy`, operatör çalıştırır, **uygulama sürümünden önce**. |
| Panel | hayır | gerekmiyor (§8 ayrı iş) |
| AI Gündem veritabanı | hayır | gerekmiyor |
| Yalnız depo | evet | belgeler, testler, `scripts/check-*`, `graphify-out/` |

## 8. Ayrı iş: panel

- `admin/`'e sponsor ve slayt listesi ile formu. Görsel yükleme
  `admin/photos.ts` üzerinden Supabase Storage'a; logo için daha küçük bir
  boyut sınırı.
- Doğrulama uygulamayla aynı modüllerden (`sponsorSchema.ts`, `slideSchema.ts`),
  `announcementApi.ts`'in panelle paylaşılması gibi.
- İsteğe bağlı temizlik: `endsAt`'i geçmiş slaytları ve dosyalarını silmek.
  Etkinlik fotoğraflarındaki "yükleme yetim dosya bırakmıyor" kuralının bu
  koleksiyonlardaki karşılığı.
- O güne kadar giriş Console'dan, §3.3'teki biçimle.

## 9. Varsayımlar

- `info@kouseng.com` çalışan ve okunan bir posta kutusu.
- Sponsor ve slayt sayısı onlarla sınırlı: tek sorgu, sayfalama yok.
- Görsel adresleri kalıcı, herkese açık https adresleri (Supabase public URL).
