# Galeri, yenileme göstergesi, karşılama — tasarım

Durum: **yollar seçildi** (2026-09-30). Uygulama planı `docs/galeri-yenileme-karsilama-plani.md`.
Dal `fix/galeri-yenileme-karsilama`, `fix/gorsel-onbellek` üzerine yığınlı.

Karar özeti:

- Etkinlik detayının ana fotoğrafı kendiliğinden kayan bir slider; dokununca tam ekran
  görüntüleyici o fotoğrafta açılıyor ve açık kaldıkça slider duruyor. Görüntüleyici
  kendiliğinden kaymıyor: parmakla kaydırma (tuşsuz), iki parmakla ve çift dokunmayla
  yakınlaştırma. ‹ › tuşları kalkıyor; alttaki "Fotoğraflar" şeridi kalıyor ve aynı
  görüntüleyiciyi açıyor.
- Aşağı çekip yenilemede RN'in göstergesi gizleniyor, ekranın üstünde ilk açılıştaki
  `PixelLoader` çıkıyor — altı ekranda aynı bileşen.
- Giriş yapmış kişiye "Ahmet, hoş geldin 👋".
- iOS'ta giriş yapmadan arşivin yüklenmemesi: kodda neden yok, yalnız değerlendirme.
- Yeni bağımlılık ve native modül yok; sürüm 1.1.6 kalıyor.

---

## 1. Galeri

Bugün: hero yalnız `photos[0]` ve dokunulamıyor; kalanlar `PhotoGallery` şeridinde,
tam ekranda tek görsel ve yalnız ‹ › tuşları; yakınlaştırma yok; görseller RN `Image`
(Adım 2'nin disk önbelleği dışında).

Yapı taşları uygulamada: `react-native-gesture-handler` 2.32, `react-native-reanimated`
4.5.1, `react-native-worklets` 0.10.1 bağımlılık ama kodda kullanılmıyor.
`babel-preset-expo` worklets eklentisini kendiliğinden ekliyor. Kökte
`GestureHandlerRootView` yok; görüntüleyici `Modal`'ın içine kendi kökünü koyuyor.

- `src/components/ZoomableImage.tsx`: iki parmakla yakınlaştırma (1–4×), yakınken
  sürükleme (kenarı aşmadan), çift dokunma 1× ↔ 2,5×. Yakınlık değişince
  `onZoomChange(zoomed)`. Kenar hesabı saf bir fonksiyon (`clampOffset`).
- `src/components/PhotoViewer.tsx`: tam ekran `Modal`; yatay sayfalı liste, verilen
  fotoğrafta açılıyor; sayaç "2 / 5"; yakınken liste kaydırması kapalı (hareketler
  çakışmıyor); kapat düğmesi. ‹ › tuşları yok.
- `src/components/PhotoHero.tsx`: hero'daki yatay sayfalı slider, birden fazla
  fotoğrafta noktalar; sayfaya dokununca `onOpen(index)`. Fotoğraf yoksa bugünkü
  gradyan yer tutucu. Geri düğmesi, karartma ve başlık üstünde duruyor.
- Hero kendiliğinden ilerliyor — Ana Sayfa slider'ıyla aynı kurallar: 4,5 sn; tek
  fotoğrafta, ekran odakta değilken, kullanıcı kaydırırken, "hareketi azalt" ya da
  ekran okuyucu açıkken durur. Ek kural: görüntüleyici açıkken durur (`paused`),
  kapanınca devam eder. Görüntüleyici hiç kendiliğinden kaymaz.
- Zamanlayıcı mantığı `HomeSlider`'dan `src/useAutoAdvance.ts`'e taşınıyor; iki slider
  aynı kodu kullanıyor, `HomeSlider`'ın mevcut testleri taşımanın güvencesi.
- Görseller expo-image (`cover` hero'da, `contain` görüntüleyicide) — disk önbelleği.
- `PhotoGallery` şeridi kalıyor (kullanıcı kararı): kapak dâhil bütün fotoğrafların
  önizlemeleri (cihaz testinden sonra: kapağı atlayınca 3 fotoğrafın 2'si görünüyordu),
  expo-image; dokununca kendi tam ekranı yerine `PhotoViewer` o fotoğrafta
  açılıyor. Şeridin kendi `Modal`'ı ve ‹ › tuşları siliniyor.

## 2. Yenileme göstergesi

Altı ekran: Ana Sayfa, Takvim, Arşiv; AI Gündem Özet, Akış, Kaydedilenler. Hepsi native
`RefreshControl` (iOS'ta renk ilk çekişte uygulanmayabiliyor, Android beyaz daire).

- `src/components/Pixel.tsx` → `PixelRefresh({ visible })`: yenilenirken ekranın üstünde
  (güvenli alanın altında) küçük bir hap içinde `PixelLoader`; ekran okuyucuya
  "Yenileniyor". `hiddenSpinner`: native göstergeyi saydam yapan ortak prop'lar.
- Çekme hareketi native kalıyor (Android'de üstten taşma yok, özel hareket
  yapılamıyor). Kökü `ScrollView` olan dört ekran bir `View`'la sarılıyor.
- `refreshing` her ekranın bugünkü değeri; açılıştaki ilk okumada da görünüyor.

## 3. Karşılama

- `firstName(adSoyad)` (`src/accountSchema.ts`): ilk kelime, baş harfi `tr` kuralıyla
  büyük; boşsa `null`.
- Ana sayfa: ad varsa "Ahmet, hoş geldin 👋", yoksa (oturumsuz ya da profil
  yükleniyor) bugünkü "Hoş geldin 👋".

## 4. iOS'ta giriş yapmadan arşiv — değerlendirme

- Arşiv, ana sayfanın etkinlikleriyle aynı okuma: `fetchContent` → `events` +
  `raffles` (8 sn zaman aşımı), `eventSeats` hatası yutuluyor.
- Kurallar üçünü de herkese açık okutuyor (29 Ağustos'tan beri `allow read: if true`);
  arşiv ekranında ve sekme düzeninde oturum kapısı yok; okuma oturum jetonu
  kullanmıyor. Kodda "giriş yapmadan" farkını açıklayan bir yol yok.
- İki deneme arasında dört şey farklıydı: platform, çalışan kod (mağaza sürümü / Expo
  Go'da güncel dal), ağ, oturum. En olası: ağ (zaman aşımı → "Güncel içeriğe
  ulaşılamadı") ya da cihazdaki eski sürüm. Cihazda doğrulanmadı.
- Ayırt etmek için: ana sayfada yaklaşan etkinlikler geliyor mu; arşivde "Güncel
  içeriğe ulaşılamadı" şeridi var mı; App Store sürümü; giriş yapınca düzeliyor mu;
  Android'de çıkış yapıp arşiv.
- Kod değişikliği yok.

## 5. Test

- `firstName` tablo testi; ana sayfa karşılaması oturumla ve oturumsuz.
- `PixelRefresh` görünür/gizli; Arşiv yüklenirken gösterge.
- `clampOffset` tablo testi; `ZoomableImage` iki parmak ve çift dokunmayla
  `onZoomChange`; `PhotoViewer` açılış fotoğrafı, tuş yok, kaydırınca sayaç, yakınken
  kaydırma kilidi, kapat; `PhotoHero` sayfa/nokta/dokunma, kendiliğinden ilerleme,
  `paused` iken durma, tek ve sıfır fotoğraf; etkinlik ekranında görüntüleyici açıkken
  hero'nun durup kapanınca devam etmesi, şeritteki önizlemenin aynı görüntüleyiciyi
  o fotoğrafta açması.
- Hareketler Jest'te RNGH'nin `jest-utils`'iyle sınanıyor; cihazdaki his (hız, sınır)
  elle denenir.

## 6. Dağıtım yüzeyleri

| Yüzey | Durum |
|---|---|
| Mobil uygulama | 1.1.6 build'ine biner; native modül yok, sonradan runtime 1.1.6'ya OTA da olur (operatör) |
| Panel | gerekmiyor |
| Firestore kuralları | gerekmiyor |
| AI Gündem veritabanı | gerekmiyor |

## 7. Reddedilenler

- Hazır yakınlaştırma kütüphanesi (`@likashefqet/react-native-image-zoom`): yeni
  bağımlılık, Reanimated 4 uyumu belirsiz. `react-native-awesome-gallery`:
  Reanimated `^3` istiyor.
- Yalnız native (iOS `ScrollView` yakınlaştırması): Android'de yakınlaştırma olmaz.
- Göstergeyi içerikte satır olarak çizmek: içeriği iter, listelerde ayrı başlık ister.
- Tamamen özel çekme hareketi: Android'de üstten taşma yok.
