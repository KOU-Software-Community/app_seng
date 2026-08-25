# KOÜ Yazılım Kulübü — mobil uygulama

Kocaeli Üniversitesi Yazılım Kulübü'nün etkinlik uygulaması. Expo (React Native) ile tek kod
tabanı; iOS ve Android'e aynı yerden çıkıyor.

Uygulama, `design-source/KOU Yazilim Kulubu App.dc.html` içindeki tasarım kanvasından
birebir uyarlandı.

## Ekranlar

| Ekran | Rota | Not |
| --- | --- | --- |
| Splash | `/` | 1.9 sn logo + pixel loader, sonra onboarding ya da ana sayfa |
| Onboarding | `/onboarding` | 3 sayfa, "Atla" ile geçilebilir, bir kez gösterilir |
| Ana sayfa | `/(tabs)` | İstatistikler, öne çıkanlar karuseli, akış |
| Etkinlik takvimi | `/(tabs)/takvim` | Liste ve takvim (grid) görünümü |
| Etkinlik arşivi | `/(tabs)/arsiv` | Kategori filtresi, foto ızgarası, boş durum, lightbox |
| Bildirim ayarları | `/(tabs)/bildirim` | Ana anahtar, 5 kategori, hatırlatma ve sessiz saatler |
| Etkinlik detay | `/etkinlik/[id]` | Hero, künye satırları, konuşmacı, kayıt CTA |
| Kayıt formu | `/kayit/[id]` | Ad soyad, öğrenci no (9 hane), bölüm, sınıf, KVKK |
| Kayıt başarılı | `/kayit-basarili` | Kayıt kodu ve dönüş aksiyonları |

Öne çıkan bir karta ya da akıştaki bir satıra dokunulduğunda, tasarımdaki gibi kısa bir
pixel "YUKLENIYOR" perdesi gösterilip detay açılır.

## Çalıştırma

```bash
npm install
```

```bash
npx expo start
```

Telefonda denemek için Expo Go ile QR'ı okut. Simülatör/emülatör için `i` veya `a`.
Tarayıcıda hızlı bakmak için:

```bash
npx expo start --web
```

Tip kontrolü:

```bash
npm run typecheck
```

Yayın öncesi regresyon kontrolü:

```bash
npm run check:release
```

`scripts/check-release.mjs` sekiz şeyi doğruluyor ve **her biri bir kez gerçekten
başarısız olduğu için** orada: demo kaydının geri sızmaması, ana ekranda sabit isim
olmaması, `deploymentTarget` override'ının geri gelmemesi, iki dosyadaki sürümün
aynı kalması, uygulama kimliğinin değişmemesi, sürüm sayaçlarının `app.json`'a geri
kopyalanmaması, `syncPending`'in tanımlı ve bağlı olması, ve servis hesabı
anahtarlarının gitignore'lu kalması.

Spekülatif kural eklemeyin. Bir regresyon kaçtığında onu yakalayan kontrolü ekleyin
ve **eklemeden önce kontrolün kırmızı olduğunu görün** — boş geçen bir assertion,
olmayan assertion'dan beterdir çünkü yeşil rapor verir.

## Proje yapısı

```
app/                 expo-router rotaları (dosya adı = rota)
  _layout.tsx        fontlar, store, yükleme perdesi, stack
  (tabs)/            alt sekmeli 4 ana ekran + özel tab bar
src/
  theme.ts           renk paleti, gradyanlar, tipografi, radius/spacing
  icons.ts           8×8 pixel ikon path'leri + onboarding pixel çizimleri
  data.ts            paketlenmiş içerik — hem seed kaynağı hem çevrimdışı yedek
  content.tsx        Firestore'dan okuma + yerele düşme (useContent)
  firebase.ts        getDb, fetchContent, pushRegistration
  firebaseConfig.ts  .env okur, SDK import etmez
  store.tsx          kayıtlar + bildirim tercihleri (AsyncStorage ile kalıcı)
  components/        Txt, PixelIcon, PixelBadge, Toggle, Segmented, kart vb.
scripts/             npm run seed
assets/brand/        kulüp rozeti ve laptop maskotu
design-source/       kaynak tasarım kanvası (referans)
```

### Tasarım kuralları

- **Renk:** 5 marka rengi `src/theme.ts` içindeki `palette`'te. Geri kalan nötrler `colors`'ta.
- **Tipografi:** Gövde, form ve butonlar Plus Jakarta Sans. Press Start 2P **yalnızca**
  rozet etiketleri, grup başlıkları, boş durum ve yükleme metninde — okunabilirlik önce.
- **Gradyanlar:** Tasarımdaki CSS gradyan durakları %100'ü aşıyordu (örn. `#0389BC 135%`).
  `theme.ts` içindeki bitiş renkleri bu yüzden ara değer olarak önceden hesaplandı.
- **Boşluk:** 4'ün katları, radius 8–16.

## Firebase

Ekranlar Firestore'a bağlı. İçerik Firestore'dan okunuyor, ulaşılamazsa `src/data.ts`
içindeki paketlenmiş kopyaya düşülüyor — böylece uygulama hiçbir durumda boş ekran
göstermiyor. Hangi kaynağın kullanıldığı `useContent().source` ile görülebilir.

### Kurulum (tek seferlik, 3 adım)

Firestore veritabanı oluşturulmuş durumda ama varsayılan kurallar her şeyi kapatıyor.
Veriyi yüklemek için:

1. `firestore.seed.rules` içeriğini Firebase Console → Firestore Database → **Rules**
   sekmesine yapıştırıp **Publish** deyin.
2. Terminalde seed'i çalıştırın:

```bash
npm run seed
```

3. `firestore.rules` içeriğini aynı yere yapıştırıp tekrar **Publish** deyin.

Üçüncü adımı atlamayın — ikinci adımdaki kurallar etkinlik verisini herkesin
değiştirmesine izin verir.

### Neler bağlı

| Veri | Nereden |
| --- | --- |
| Etkinlikler | Firestore `events` → yoksa `src/data.ts` |
| Arşiv | Firestore `archive` → yoksa `src/data.ts` |
| Kayıtlar | Önce cihaza yazılır, sonra Firestore `registrations` |
| Öne çıkanlar / akış kartları | `src/data.ts` (editoryal içerik) |
| Bildirim tercihleri | Sadece cihaz (AsyncStorage) |

Kayıt akışı önce yerele yazıp ekranı anında açar, ardından Firestore'a gönderir. Yazma
başarısız olursa kayıt `synced: false` olarak işaretlenir — öğrenci kodunu yine görür.

### Dosyalar

- `.env` — gerçek değerler. **Git'e girmiyor** (`.gitignore` içinde).
- `.env.example` — boş şablon, repoda duruyor.
- `src/firebaseConfig.ts` — sadece config okur, SDK import etmez.
- `src/firebase.ts` — `getDb()`, `fetchContent()`, `pushRegistration()`.
- `src/content.tsx` — `ContentProvider` + `useContent()`; Firestore/yerel geçişi burada.
- `scripts/seed-firestore.ts` — `npm run seed`.
- `firestore.rules` / `firestore.seed.rules` — güvenlik kuralları.

Firestore SDK'sı açılış paketine dahil değil; dinamik import ile ilk okuma anında
yükleniyor (Metro logunda ayrı bir `src/firebase.ts (20 modules)` satırı olarak görünür).

```ts
import { getDb, COLLECTIONS } from '../src/firebase';
import { collection, getDocs } from 'firebase/firestore';

const snap = await getDocs(collection(getDb(), COLLECTIONS.events));
```

> **Güvenlik:** `EXPO_PUBLIC_*` değerleri derleme sırasında JS paketine gömülür, yani
> uygulamayı kuran herkes bunlara ulaşabilir. Firebase istemci config'i için bu normaldir —
> koruma **Firestore/Storage Security Rules** ile sağlanır, bu anahtarları saklayarak değil.
> Kuralları yazmadan üretime çıkmayın.

Analytics (`measurementId`) React Native'de çalışmaz; sadece web derlemesi için `.env`'de duruyor.

### EAS derlemelerinde

`.env` git'te olmadığı için EAS Build sunucusuna **gitmez**. Üretim derlemesinden önce
değişkenleri bir kez tanımlayın:

```bash
eas env:create --environment production --name EXPO_PUBLIC_FIREBASE_API_KEY --value "..." --visibility plaintext
```

Diğer altı değişken için de aynısını tekrarlayın. Tanımlanmazsa uygulama açılışta
`[firebase] ...` uyarısı verir ve `getDb()` hata fırlatır.

## Bildirimler

İki ayrı mekanizma, tek ayar ekranı (`app/(tabs)/bildirim.tsx`). Dört tercihin
dördü de artık gerçekten bir şey yapıyor.

**Hatırlatmalar — cihazda, sunucusuz.** Kayıtlı olduğun etkinliğin `startsAt`
değerinden geri sayılarak `expo-notifications` ile yerel olarak zamanlanır.
Sunucu, ağ, token gerekmez. Kullanıcının seçtiği süreyi (`1 saat` / `1 gün` /
`3 gün önce`) kullanır, sessiz saatler açıksa 23:00–08:00'e denk gelen
hatırlatmayı sabah 08:00'e kaydırır, kaydırınca etkinliğin kendisinden sonraya
düşüyorsa hiç kurmaz. Kayıt, tercih veya etkinlik listesi değiştiğinde tüm
program iptal edilip yeniden kurulur.

**Duyurular — push, kulüpten.** Cihaz `devices/{token}` dokümanına push token'ını
ve tercihlerini yazar; gönderim `npm run push` ile yapılır.

```bash
npm run push -- --category Duyuru --title "Başlık" --body "Metin"
npm run push -- --category Atölye --title "..." --body "..." --event ev2 --dry
```

`--event` bildirime dokununca açılacak etkinliği belirler, `--dry` kimseye
göndermeden kaç cihaza gideceğini gösterir. Script `master` kapalı olanları,
kategoriyi kapatmış olanları ve sessiz saatlerdekileri atlar; kaç cihazın hangi
sebeple elendiğini yazar. `DeviceNotRegistered` dönen token'ları (uygulamayı
kaldırmış kullanıcılar) koleksiyondan siler.

### Gerekenler

**Servis hesabı anahtarı** (sadece gönderici script için, uygulamaya girmez).
`devices` koleksiyonu istemciye kapalı — token listesi sızarsa herkes herkese
bildirim gönderebilir. Bu yüzden script Admin SDK kullanıyor. `.env.example`'daki
`FIREBASE_SERVICE_ACCOUNT` satırına bakın. **Bu anahtar güvenlik kurallarını
tamamen bypass eder; asla commit etmeyin, asla uygulamaya koymayın.**

**Mağaza kimlik bilgileri** — bunlar olmadan push cihaza ulaşmaz:

```bash
eas credentials   # Android: FCM V1 service account JSON
                  # iOS: APNs key (.p8) — EAS otomatik üretebilir
```

Push, Expo Go'da çalışmaz; development build veya production build gerekir.
Yerel hatırlatmalar Expo Go'da da çalışır.

## Yoklama listesi — kayıtları CSV'ye çıkarma

```bash
npm run export                        # tüm kayıtlar, ekrana
npm run export -- --event ev2         # tek etkinlik
npm run export -- --out yoklama.csv   # dosyaya
```

`registrations` koleksiyonu `firestore.rules` gereği istemciye kapalı — kimse
başkasının başvurusunu okuyamamalı. Bu yüzden script `npm run push` ile aynı
servis hesabı anahtarını kullanıyor (`.env.example` içindeki
`FIREBASE_SERVICE_ACCOUNT`).

Çıktı öğrenci numarasına göre sıralı; yoklamada aranan alan o. Dosyaya yazarken
başa BOM konuyor, yoksa Excel UTF-8'i Windows-1254 sanıp Türkçe karakterleri
bozuyor.

## Kalan işler

1. **Fotoğraflar** — `src/components/PhotoSlot.tsx` bir `uri` prop'u alıyor. Arşiv
   görselleri Storage'a yüklenip URL'ler `archive` dokümanlarına eklendiğinde
   placeholder kendiliğinden devre dışı kalır.
2. **Öne çıkanlar / akış** — hâlâ `src/data.ts` içinde editoryal içerik. İstenirse
   bunlar da Firestore'a taşınabilir.

## Mağazaya çıkarma

`eas.json` hazır: `development` (simülatör), `preview` (dahili APK), `production`
(App Store / Play Store).

**Önce yapılması gerekenler:**

- Uygulama kimliği her iki platformda da **`com.akadirr1.sengkou`**. App Store Connect
  ve Play Console'da bu kimlikle kayıtlı. **İlk yayından sonra değiştirilemez** —
  değiştirmek yeni bir uygulama açmak, kullanıcıları ve yorumları sıfırlamak demektir.
- Apple Developer ($99/yıl) ve Google Play Console ($25 tek seferlik) hesapları.
- Gizlilik politikası URL'si — her iki mağazanın gizlilik alanına da bu yazılacak:
  https://kou-yazilim-kulubu-gizlilik.akadirr41.chatgpt.site
  Uygulamada `src/data.ts` içindeki `PRIVACY_POLICY_URL` sabitinde duruyor ve kayıt
  formundaki onay satırının altından açılıyor. Adres değişirse iki yeri de güncelleyin.

```bash
npm install -g eas-cli && eas login && eas build:configure
```

Üretim derlemesi:

```bash
eas build --platform all --profile production
```

Mağazaya gönderim:

```bash
eas submit --platform ios --profile production
```

```bash
eas submit --platform android --profile production
```

### Sürüm numaraları

Kullanıcıya görünen sürüm (`1.1.0`) `app.json` içindeki `version` alanından okunur.

Build numarası ve versionCode **EAS sunucusunda** tutulur (`appVersionSource: "remote"`),
`app.json`'da bilerek yok — `production` profilinde her derlemede otomatik artar. Böylece
"yerelde arttı ama commit'lemeyi unuttum, mağaza aynı numarayı reddetti" tuzağı ortadan
kalkar.

> **Uzaktan sayacı bir kez tohumlayın.** Yerel değerler kaldırıldığı için EAS'ın içe
> aktaracağı bir şey yok; tohumlamazsanız sayaç 1'den başlar ve Play, versionCode 3
> zaten yüklü olduğu için gönderimi **reddeder**. İlk uzaktan derlemeden önce bir kez:
>
> ```bash
> eas build:version:set --platform ios      # 5 girin  → sonraki derleme 6 üretir
> eas build:version:set --platform android  # 3 girin  → sonraki derleme 4 üretir
> ```
>
> Bunlar mağazalara en son gönderilmiş numaralar. `autoIncrement` üzerine ekleyerek gider.

`eas submit` iOS tarafı bilerek yapılandırılmadı; Apple bilgilerini komut interaktif
olarak soracak.

### İkonlar ve mağaza görselleri

`assets/icon.png`, `assets/android-icon-*.png`, `assets/splash-icon.png` kulüp rozetinden
üretildi.

Türetilmiş olanlar `scripts/make-icons.py` ile yeniden üretilebilir — rozet değişirse
`assets/brand/logo.png` dosyasını değiştirip script'i çalıştırmak yeterli:

```bash
pip install pillow          # ya da: uv pip install pillow
python3 scripts/make-icons.py
```

| Dosya | Boyut | Nerede kullanılıyor |
|---|---|---|
| `assets/notification-icon.png` | 96×96 | Android bildirim ikonu (`app.json`'dan bağlı) |
| `assets/store/play-icon-512.png` | 512×512 | Play Console mağaza ikonu |
| `assets/store/play-feature-graphic.png` | 1024×500 | Play Console feature graphic |

Pillow bilerek `package.json`'a eklenmedi; bu script derleme adımı değil, rozet
değişmediği sürece hiç çalıştırılmaz.

Bildirim ikonu kelime işaretinin tamamını değil **sadece "KOÜ" satırını** taşıyor.
Sebebi ölçüldü: bildirim ikonu durum çubuğunda 24dp görünür, üç satırın tamamı o
boyutta gri bir lekeye dönüşüyor. İki aday üretilip 24dp'ye küçültülerek
karşılaştırıldı; tek satır kalın harf okunur kalan tek seçenek.

Play'e yüklenecek ekran görüntüleri repoda yok, yayın sırasında alınacak.

## Yerelde native derleme (opsiyonel)

`npx expo run:ios` / `npx expo run:android` tam native derleme yapar. iOS için **Xcode**
(sadece Command Line Tools yetmez) ve CocoaPods gerekir. EAS Build kullanıyorsanız bunlara
gerek yok — derleme bulutta yapılır.
