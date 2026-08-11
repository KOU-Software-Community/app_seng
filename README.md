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

## Kalan işler

1. **Fotoğraflar** — `src/components/PhotoSlot.tsx` bir `uri` prop'u alıyor. Arşiv
   görselleri Storage'a yüklenip URL'ler `archive` dokümanlarına eklendiğinde
   placeholder kendiliğinden devre dışı kalır.
2. **Bildirimler** — ayar ekranı tercihleri cihazda tutuyor; gerçek gönderim için
   `expo-notifications` + FCM ve tercihlerin sunucuya yazılması gerekiyor.
3. **Kayıtları görme** — `registrations` koleksiyonu kurallar gereği istemciden
   okunamıyor (doğru olan bu). Kulüp yönetimi kayıtları Firebase Console'dan görür;
   liste/CSV isteniyorsa Admin SDK ile küçük bir araç gerekir.
4. **Öne çıkanlar / akış** — hâlâ `src/data.ts` içinde editoryal içerik. İstenirse
   bunlar da Firestore'a taşınabilir.

## Mağazaya çıkarma

`eas.json` hazır: `development` (simülatör), `preview` (dahili APK), `production`
(App Store / Play Store).

**Önce yapılması gerekenler:**

- `app.json` içindeki `ios.bundleIdentifier` ve `android.package` şu an
  `com.kouyazilim.app` — sahip olduğunuz bir ters alan adıyla değiştirin.
- Apple Developer ($99/yıl) ve Google Play Console ($25 tek seferlik) hesapları.

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

Sürüm numarası `app.json` içindeki `version` alanından okunur (`appVersionSource: "local"`);
`production` profilinde build numarası otomatik artar.

### İkonlar

`assets/icon.png`, `assets/android-icon-*.png`, `assets/splash-icon.png` kulüp rozetinden
üretildi. Rozet değişirse `assets/brand/logo.png` dosyasını değiştirip ikonları yeniden
üretmek yeterli.

## Yerelde native derleme (opsiyonel)

`npx expo run:ios` / `npx expo run:android` tam native derleme yapar. iOS için **Xcode**
(sadece Command Line Tools yetmez) ve CocoaPods gerekir. EAS Build kullanıyorsanız bunlara
gerek yok — derleme bulutta yapılır.
