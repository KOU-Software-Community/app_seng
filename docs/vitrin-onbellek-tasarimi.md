# Vitrin önbelleği — tasarım

Durum: **onaylandı** (2026-09-30). Uygulama planı `docs/vitrin-onbellek-plani.md`.

Karar özeti:

- Slider ve sponsor listesi cihazda (AsyncStorage) tutuluyor. Ana sayfa bu kopyayla
  ilk karede çiziliyor; Firestore cevap verince liste sessizce yenisiyle
  değişiyor ve kopya güncelleniyor.
- Görseller `expo-image`'ın disk önbelleğinden geliyor. Panel her görseli yeni,
  rastgele bir adla yüklediği için "sunucudakiyle karşılaştır" URL eşitliğine
  iniyor; ayrı bir sürüm ya da manifest yok.
- İki adım, iki PR. Adım 1 (liste) OTA ile 1.1.5'e; Adım 2 (görsel) yeni native
  modül getirdiği için 1.1.6 mağaza sürümüyle.

---

## 1. Sorun

- `useSlides` (`src/slides.ts`) ve `SponsorsProvider` (`src/sponsors.tsx`) her
  açılışta boş listeyle başlıyor; cihazda hiçbir şey saklanmıyor. Ana sayfa iki
  bölümü liste gelene kadar çizmiyor, okuma düşerse hiç çizmiyor. Firestore okuması
  8 sn'ye kadar sürebiliyor (`src/firebase.ts` → `TIMEOUT_MS`).
- Görseller RN `Image` ile (`src/components/PhotoSlot.tsx`). Android'de Fresco
  diske yazıyor; iOS'ta RN görseli sistemin paylaşılan URL önbelleğine bırakıyor
  ve onu büyütmüyor. Varsayılanı küçük ve arşiv fotoğraflarıyla ortak — slayt
  fotoğrafı her açılışta yeniden inebilir. Cihazda ölçülmedi.

## 2. Hedef

- İkinci ve sonraki açılışlarda slider ve Sponsorlarımız ilk karede, son bilinen
  içerikle görünür; sunucu cevap verince güncel hâle gelir.
- Çevrimdışı açılışta son bilinen içerik görünür.
- Adım 2'den sonra görseller diskten gelir (arşiv ve etkinlik fotoğrafları dahil).

Kapsam dışı:

- İlk kurulumdaki ilk açılış bugünkü gibi (önbellek yok); iskelet görünüm yok —
  mevcut tasarım bu bölümleri "süs" sayıyor.
- Önbelleğe yaş sınırı yok. Süresi dolan slayt (`endsAt`) cihazda zaten süzülüyor
  (`visibleSlides`); sunucuda silinen slayt ilk cevaba kadar (çevrimdışıysa daha
  uzun) görünebilir.

## 3. Adım 1 — liste önbelleği (OTA, 1.1.5)

### 3.1 `src/vitrinCache.ts` (yeni)

- Anahtarlar: `kyk.vitrin.slides.v1`, `kyk.vitrin.sponsors.v1` — kulüp tarafının
  `kyk.state.v1` biçimi. İki ayrı anahtar: iki liste ayrı zamanlarda yazılıyor.
- Modül içe aktarılınca iki anahtarı okuyup belleğe alır (`cacheReady`).
  `src/sponsors.tsx` kök düzende içe aktarıldığı için okuma açılışta başlıyor; ana
  sayfa giriş animasyonundan (`app/index.tsx` → `INTRO_MS = 500`) ve oturum
  hidrasyonundan sonra çizildiğinden o ana kadar bitmiş oluyor. Sonuç: sıçramasız
  ilk kare.
- `cachedSlides()` / `cachedSponsors()` belleği `toSlide` / `toSponsor`'dan
  geçirir — önbellek Firestore'la aynı kapıdan giriyor; bozuk ya da eski şekilli
  kayıt atlanıyor. Bozuk JSON boş liste demek.
- `saveCache(kind, list)` belleğe ve diske yazar. Geç biten bir disk okuması
  belleği yalnız boşsa doldurur, taze listeyi ezmez.

### 3.2 Hook ve sağlayıcı

- `useSlides`, `SponsorsProvider`: ilk durum `cachedX()`; mount'ta
  `cacheReady.then(() => set(cachedX()))` (okuma o an bitmemişse); okuma başarılıysa
  `set(list)` + `saveCache`. Okuma düşerse eldeki liste kalıyor — mevcut "hata
  olunca eldeki liste korunuyor" sözleşmesi, artık eldeki liste boş değil.
- "Karşılaştırma": tam liste her açılışta ve aşağı çekince okunuyor (birkaç
  doküman); gelen liste önbelleğin yerine geçiyor. Eklenen, silinen, sırası ya da
  görseli değişen öğe ilk cevapta düzeliyor.

### 3.3 Ana sayfa (`app/(tabs)/index.tsx`)

- Slider ve Sponsorlarımız yalnız liste boşken gizleniyor, hata olunca değil:
  okuma düştüğünde cihazdaki liste görünüyor. `/sponsorlar` ve `/sponsor/[id]`
  zaten "hata şeridi + eldeki liste" gösteriyor; değişmiyor.

## 4. Adım 2 — görseller (mağaza, 1.1.6)

- `expo-image` `~57.0.3` (kurulu expo'nun `bundledNativeModules.json`'ı;
  `check:release` birebir eşitlik istiyor).
- `PhotoSlot`: RN `Image` → `expo-image` `Image`, `contentFit={resizeMode}`.
  `cachePolicy` varsayılanı `'disk'`, önbellek anahtarı URI (SDK 57 belgesi).
- URL'ler değişmez: panel `uploadPhoto` (`admin/photos.ts`) rastgele adla,
  `upsert: false` ve `cacheControl: '31536000'` ile yüklüyor; görsel değişince URL
  de değişiyor. Karşılaştırma bu yüzden URL eşitliği.
- Sürüm 1.1.6: `app.json`, `package.json`, `package-lock.json`, `CLAUDE.md`.
- Sıra zorunlu: Adım 1 PR'ı birleşir → operatör o commit'ten OTA yayınlar (runtime
  1.1.5) → Adım 2 PR'ı birleşir → 1.1.6 mağaza build'i. Sebep
  `runtimeVersion: { policy: appVersion }`: sürüm artınca OTA 1.1.5'e gitmez;
  native modül de OTA ile gidemez.

## 5. Test ve kontroller

- `src/__tests__/vitrin-cache.test.tsx`, uygulamadan önce kırmızı görülür:
  1. Önbellekteki liste ayrıştırıcıdan aynen geçiyor, bozuk kayıt atlanıyor
     (`toSlide`/`toSponsor` kendi çıktısını kabul etmezse önbellek sessizce
     boşalırdı).
  2. Yarım yazılmış JSON boş liste, çökme yok.
  3. Sunucu boş liste döndürünce kopya boşalıyor; geç biten açılış okuması onu
     ezmiyor.
  4. Okuma düşerken ana sayfa slider ve sponsorları cihazdan çiziyor; süresi
     geçmiş slayt görünmüyor.
- Jest'te Firestore okuması her zaman hata yolunda (yapılandırma yok, dinamik
  `import('./firebase')` çalışmıyor); 4 bu yüzden aynı zamanda çevrimdışı
  senaryosu. Başarılı okumanın `set` + `saveCache` iki satırı ayrıca sınanmıyor.
- Her iki adımda `npm run check:all`, `npx expo export --platform ios`,
  `npm run check:bundle`.

## 6. Dağıtım yüzeyleri

| Yüzey | Adım 1 | Adım 2 |
|---|---|---|
| Mobil uygulama | OTA (operatör) | 1.1.6 mağaza build'i (operatör) |
| Panel | gerekmiyor | gerekmiyor |
| Firestore kuralları | gerekmiyor | gerekmiyor |
| AI Gündem veritabanı | gerekmiyor | gerekmiyor |

## 7. Reddedilenler

- AI Gündem'in TanStack kalıcı önbelleği: `SponsorsProvider`'ın içinde duruyor,
  yalnız Gündem anahtarlarını saklıyor, kendi buster'ı var; kök yorumu "Kulüp
  tarafı buna dokunmuyor".
- Okumayı hook'un kendi effect'inde yapmak: slider ana sayfa açılınca okunur, 1–2
  kare boş kalıp sıçrar — şikâyetin kendisi.
- `expo-file-system` ile elle indirme (OTA'ya uygun): 60–80 satır dosya yönetimi
  ve temizlik kodu; `expo-image` aynı işi kütüphane olarak yapıyor.
- Sürüm dokümanı / manifest: okumayı atlatmıyor (ilk kare zaten önbellekten),
  panel ve kural değişikliği istiyor.
