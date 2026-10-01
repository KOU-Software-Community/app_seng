# Kalıcı takvim, kare yükleme animasyonu, galeriyi dokunarak kapatma — tasarım

İstek (kullanıcı, 2026-09-30, cihaz testinden sonra):

1. Gündem'in Bülten ve Akış sekmelerindeki "YUKLENIYOR" yazısı itici; açılıştaki kare
   yükleme animasyonu (`PixelLoader`) o sekmelere de gelsin.
2. Takvim boşken hiç takvim görünmüyor; orada kalıcı bir takvim olmalı. Sayfa kullanıcı
   dostu ve erişilebilir olmalı.
3. Tam ekran galeride fotoğrafın dışındaki soluk alana dokununca kapansın; ama en ufak
   dokunuşta kapanıp kullanıcıyı sıkmasın, ortası bulunsun.

Kod değişikliği yalnız mobil uygulamada (JS). Yeni bağımlılık ve native modül yok.

## 1. Kare yükleme animasyonu

- `PixelLoader`'a isteğe bağlı `label`. Verilince `accessible`,
  `accessibilityRole="progressbar"` ve `accessibilityLabel={label}` alıyor; ekran okuyucu
  "Yükleniyor" okuyor. Verilmeyince bugünkü gibi süs olarak kalıyor (açılış ekranı).
- Gündem: Bülten (`DigestView`), Akış (`FeedView`) ve Kaydedilenler (`SavedView`).
  `YUKLENIYOR` yazısının yerine `<PixelLoader label="Yükleniyor" />` geliyor, aynı yerde
  (ortada, 40 pt üstte). Kaydedilenler aynı sekmenin üçüncü görünümü; tek başına yazı
  kalmasın.
- Öneri, aynı turda: aynı yazının uygulamadaki öteki dört yeri — Sertifikalarım
  (`YÜKLENİYOR`), Duyuru, Sponsor ve Sponsorlar (maskotlu `EmptyState "Yükleniyor"`).
  Bunlara dokunulmamasının maliyeti, uygulamada iki ayrı yükleme dili.
- Kalanlar: Ana Sayfa'daki "Duyurular yükleniyor…" bir kartın içindeki cümle, değişmiyor.
  Akış'taki "HAZIRLANIYOR" da değişmiyor; o bir yükleme değil, haberin çeviriyi beklediğini
  söylüyor.

## 2. Kalıcı takvim

Bugün: Liste/Takvim düğmesi yalnız etkinlik varken görünüyor. Takvim görünümü yalnız
etkinliği olan ayların kartlarını çiziyor. Boşken maskotlu "Takvim henüz boş" var,
takvim yok.

Yeni (önerilen):

- **Başlığın altında her zaman tek bir ay kartı (`MonthCalendar`).**
  - Açılışta bu ay gösteriliyor; ay ve "bugün" kulüp saatinden (`clubCalendar`).
  - ‹ › düğmeleri: geri en çok bu aya kadar, ileri 12 aya kadar gidiyor. Etkinlik daha
    ileride bir aydaysa sınır o aya uzuyor.
  - Bugünün hücresi halkalı, geçmiş günler soluk.
  - Etkinlik günleri dolgulu ve noktalı; dokununca o etkinlik açılıyor.
- **Altında bugünkü liste:** bütün yaklaşan etkinlikler, aylara göre (`EventRow`).
  Etkinlik yoksa listenin yerinde bugünkü kart duruyor: "Takvim henüz boş" (Bildirimleri
  aç) ya da okuma düştüyse "Etkinlikler yüklenemedi".
- **Liste/Takvim düğmesi ve eski çok aylı ızgara kalkıyor.** Takvim artık her zaman
  görünüyor.
- **Erişilebilirlik:**
  - Gün hücresinin etiketi tam tarih: "12 Ekim 2026, Pazartesi". Bugünse ", bugün" ekleniyor.
  - Etkinlik varsa ", etkinlik: <başlık>" ekleniyor ve hücre düğme rolü alıyor.
    Etkinlik yoksa hücre okunuyor ama düğme değil.
  - Ay başlığı `header` rolünde ve `accessibilityLiveRegion="polite"`; ay değişince okunuyor.
  - ‹ › düğmeleri en az 44 pt. Etiketleri "Önceki ay" ve "Sonraki ay"; sınırda
    `disabled` durumuna geçiyorlar.
  - Gün adları satırı ve boş hücreler ekran okuyucudan gizli; tam tarih zaten her
    hücrede.
  - Büyük yazı ayarında gün numaraları `maxFontSizeMultiplier={1.3}` ile sınırlı; ızgara
    taşmıyor.
  - Anlam tek başına renkle verilmiyor: etkinlik günü nokta ve kalın yazıyla, bugün
    halkayla ayırt ediliyor.
- Takvim yalnız yaklaşan etkinlikleri işaretliyor, bugünkü gibi; geçmiş etkinlikler
  Arşiv'de. Bir güne iki etkinlik düşerse hücre ilkini açıyor (bugünkü `monthGrids`
  kuralı); ikisi de altındaki listede.

Alternatif, daha küçük: takvim yalnız boşken çizilir (bu ay), bugünkü iki görünüm ve
düğme olduğu gibi kalır. Bedeli: takvim "kalıcı" olmuyor, etkinlik gelince yine düğmenin
arkasına saklanıyor.

## 3. Galeriyi soluk alana dokunarak kapatma

Orta yol: galeri ancak şunların hepsi doğruysa kapanıyor.

- **Tek dokunuş.** Çift dokunuş yakınlaştırıyor. Tek dokunuş, çift dokunuşun beklenen
  süresi (~0,2 sn) geçince sayılıyor.
- **Temiz dokunuş.** Parmak 10 pt'den az kayıyor ve 0,5 sn'den kısa basılıyor. Sürükleme,
  uzun basma ve iki parmak kapatmıyor.
- **Görsel 1×'te.** Yakınken görsel ekranı kaplıyor ve dokunuş gezinme sayılıyor.
- **Nokta fotoğrafın en az 24 pt dışında.** Fotoğrafın görünen dikdörtgeninin çevresinde
  24 pt'lik bir bant var; buradaki dokunuş hiçbir şey yapmıyor. Kenara yakın ıskalamalar
  kapatmıyor.

Fotoğraf ekranı dolduruyorsa (dikey fotoğraf) soluk alan kalmıyor ve dokunuşla kapanmıyor;
✕ düğmesi ve Android geri tuşu duruyor. Ekran okuyucu için ✕ değişmiyor.

Alternatifler:

- Daha sıkı: 48 pt pay.
- Daha gevşek: fotoğrafın dışındaki her dokunuş kapatır (pay yok). İstenen "en ufak
  noktada kapanmasın" ile çelişiyor.

Pay tek bir sabit (`BACKDROP_MARGIN`); cihazda dar ya da geniş gelirse bir sayı değişir.

## 4. Test

- `PixelLoader` etiketi; Gündem'in üç görünümü yüklenirken "Yükleniyor" etiketli
  animasyonu gösteriyor, `YUKLENIYOR` yazısı kalmıyor.
- `monthGrid` / `dayLabelOf`:
  - tablo testleri: 6 satırlık ay, artık yıl Şubatı, ayın 1'inin haftanın günü, iki
    etkinlikli gün;
  - kulüp saatinde "bugün" (UTC 21:30 ile ertesi gün 00:30 +03:00).
- `MonthCalendar`:
  - etkinliksiz açılış: bu ay, bugün etiketi, "Önceki ay" pasif;
  - ileri/geri geçiş ve sınırlar;
  - etkinlik günü etiketi ve dokunma;
  - geçmiş günlerin düğme olmaması.
- Takvim ekranı:
  - boşken takvim ve "Takvim henüz boş" birlikte görünüyor;
  - okuma düşünce takvim ve "Etkinlikler yüklenemedi" görünüyor;
  - Liste/Takvim düğmesi yok.
- `isBackdropTap` tablo testi (pay içi, dışı, dört kenar, yakın). `ZoomableImage`: soluk
  alana tek dokunuş kapatıyor; fotoğrafa dokunuş, pay içi ve yakınken dokunuş kapatmıyor.
- Hareketin cihazdaki hissi (0,2 sn bekleme, pay) Jest'te görünmüyor; cihazda bakılacak.

## 5. Dağıtım yüzeyleri

| Yüzey | Durum |
|---|---|
| Mobil uygulama | `app/`, `src/` — yalnız JS; 1.1.6 mağaza build'inden sonra OTA ile de gidebilir |
| Panel | gerekmiyor |
| Firestore kuralları | gerekmiyor |
| AI Gündem veritabanı | gerekmiyor |
| Yalnız depo | `docs/`, testler, `graphify-out/` |
