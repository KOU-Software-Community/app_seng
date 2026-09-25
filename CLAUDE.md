# KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)

Kocaeli Üniversitesi Yazılım Kulübü'nün etkinlik uygulaması: takvim, arşiv, etkinlik
kaydı, çekiliş, QR yoklama, sertifika, AI Gündem. Google Play ve App Store'da yayında
(`com.akadirr1.sengkou`, sürüm 1.1.4) — yapılan her değişiklik gerçek kullanıcıya gider.

Bu dosya 2026-09-25'te koda karşı doğrulandı. `AGENTS.md` yüklenmiyor; oradaki "why log"
geçmiş hataların gerekçesini taşıyor, bir alana dokunmadan önce ilgili başlığı `grep` ile
oku. Orada eskiyen satırlar: "`graphify-out/` commit edilmez", "dört sekme",
"`npm run rules:deploy` ile yayınla" (Claude'a yasak, aşağıda).

## Yasaklar

- **`eas build`, `eas submit`, `eas update` çalıştırma.** Build ve submit Pi'deki
  OpenClaw'dan tetikleniyor, Expo ücretsiz planda (operatör bilgisi, depoda izi yok).
  `eas update` OTA'dır ve doğrudan canlıya iner: `expo-updates` kurulu, `app.json` →
  `updates.url` + `runtimeVersion: { policy: appVersion }`, `eas.json` kanalları
  `production` / `preview`.
- **`firebase deploy` çalıştırma — `npm run rules:deploy` dâhil**
  (`scripts/deploy-rules.mjs` = `firebase deploy --only firestore:rules`). Kurallar
  yayınlandığı an her sürümdeki her istemciye uygulanır. README/docs'taki
  "`rules:deploy` ile yayınla" adımları Claude için geçersiz: kuralı değiştir,
  `npm run check:rules` ile sına, yayını operatöre bırak.

## Stack

Sürümler `package.json`'dan.

- Expo SDK 57 (`expo ~57.0.17`), React Native 0.86.3, React 19.2.3, expo-router ~57.0.17
  (typed routes), TypeScript ~6.0.3 (`strict`). Expo değişti; kod yazmadan önce
  https://docs.expo.dev/versions/v57.0.0/
- Firebase JS SDK ^12.17.1 — yalnız **Firestore + Auth**. Firebase Storage ve FCM kodda
  yok: fotoğraflar Supabase Storage'da (`admin/photos.ts`), push Expo Push Service'ten
  (`expo-notifications` ~57.0.15 → `getExpoPushTokenAsync`; panel
  `exp.host/--/api/v2/push/send`).
- State: **Zustand yok.** React Context + AsyncStorage: `src/store.tsx` (kayıtlar,
  çekiliş katılımları, bildirim tercihleri; anahtar `kyk.state.v1`), `src/authStore.tsx`,
  `src/content.tsx`, `src/announcements.tsx`. AI Gündem'de TanStack Query ^5.102.8,
  AsyncStorage'a kalıcı.
- AI Gündem: ayrı bir Supabase projesi, `@supabase/supabase-js` ^2.112.4.
- Panel (`admin/`): Express ^5.2.1 + firebase-admin ^14.3.0, `tsx` ile; nodemailer,
  playwright-core (sertifika PDF), sharp, multer. Panel paketleri bilerek
  `devDependencies`'te.
- Test: Jest ^29.7.0, jest-expo ~57.0.5, @testing-library/react-native ^14.0.1.

## Komutlar

| İş | Komut |
|---|---|
| Kurulum | `npm ci` — pull ve dal değişiminden sonra da; geride kalan `node_modules`'u Metro "paket yok" diye raporlar |
| Çalıştır | `npm start` (`expo start`), `npm run android` / `ios` / `web` |
| Typecheck | `npm run typecheck` (`tsc --noEmit`) — push'tan önce geçmeli |
| Test | `npm test` (Jest, yalnız `src/**/__tests__/**`) |
| Hepsi | `npm run check:all` = typecheck + `check:release/schema/html/raffle/panel/security/gundem` + jest |
| Kurallar | `npm run check:rules` — `firestore.rules`'ı emülatörde koşturur (Java gerekir; CI'da 21) |
| Paketleme | `npx expo export --platform ios` — import/paketleme hataları, Xcode'suz |
| Paneli yerelde aç | `npm run admin` (Tuzaklar → Panel) |
| SDK sürüm hizası | `npm run deps:sync` (`npx expo install --check` konteyner proxy'sine takılıyor) |
| Lint | **Yok.** `npm run lint` (`expo lint`) tanımlı ama ESLint kurulu ve ayarlı değil; çalıştırmak eslint + eslint-config-expo kurar ve `eslint.config.js` yazar |

CI (`.github/workflows/ci.yml`) her push'ta: `npm ci`, `check:all`, `check:rules`,
`npx expo export --platform ios`, `check:bundle`.

Servis hesabıyla üretime dokunan script'ler: `npm run push` gerçek cihazlara push atar,
`npm run export` kayıtları (kişisel veri) CSV'ye döker, `npm run demo:hesap` Auth ve
Firestore'a hesap yazar/siler.

## Klasörler

- `app/` — expo-router rotaları. `app/(tabs)/`: beş sekme (`index` Ana Sayfa, `takvim`,
  `arsiv`, `gundem` AI Gündem, `hesap` Hesabım) ve `_layout.tsx`'te elle yazılmış `TABS`
  listesi (dosyası olmayan ad boş sekme çizer). Gerisi stack rotası.
- `src/` — `theme.ts` (renk, gradyan, font, radius, boşluk yalnız burada), `data.ts`
  (tipler, sabit listeler, panel/yasal URL'ler; çevrimdışı yedek `EVENTS` boş),
  `firebase.ts` (Firestore erişimi, `COLLECTIONS`), `auth.ts`, `eventSchema.ts`
  (`buildEvent`, `todayLocal`, `clubCalendar`, `clubHour`, `splitByDate`),
  `notificationPlan.ts` + `notifications.tsx`, `components/ui.tsx` (`Txt`, `PixelTxt`),
  `gundem/` (AI Gündem).
- `admin/` — yönetim paneli (`mobil.kouseng.com`): içerik, yoklama, sertifika, bildirim;
  uygulamanın çağırdığı `/api/hesap/*` ve `/api/gundem/ceviri` (Azure çeviri); yasal
  sayfalar. Coolify'da `nixpacks.toml` ile — `npm ci --include=dev` ve
  `npx tsx admin/server.ts` satırlarının ikisi de zorunlu.
- `scripts/` — `check-*` kontrolleri, `deploy-rules.mjs`, `load-env.ts`, `send-push.ts`,
  `export-registrations.ts`, `demo-account.ts`, `sync-deps.mjs`.
- `firestore.rules` — tek kural dosyası. `supabase/migrations/` — AI Gündem veritabanına
  canlıda uygulanmış SQL'in depo kopyası. `docs/` — plan ve değerlendirme belgeleri.
  `design-source/` — tasarım aracı dışa aktarımı, uygulama kodu değil.
- `.claude/` — SessionStart hook'u (graphify ve Supabase skill'lerini kurar), depo
  skill'leri. `graphify-out/` — commit'li bilgi grafiği.

## Veri: kim neyi okuyor, kim yazıyor

Arşiv ayrı bir koleksiyon değil: `events`'in tarihi geçmiş yarısı (`splitByDate`).
Duyurular Firestore'da değil, kulüp sitesinin API'sinde (`https://api.kouseng.com`,
`src/announcementApi.ts`). AI Gündem Supabase'de: `aigundem_feed_articles_v1`,
`aigundem_digests_v1`, `aigundem_digest_items_v1`, `aigundem_search_articles_v1`,
`aigundem_sources_v1` ve `request-enrichment` Edge fonksiyonu.

| Koleksiyon | Uygulama | Panel (`admin/`, Admin SDK) |
|---|---|---|
| `events` | okur — `useContent` (`src/content.tsx` → `fetchContent`): Ana Sayfa, Takvim, Arşiv, Hesabım, `etkinlik/[id]`, `kayit/[id]`, `cekilis/[id]`, `qr`, `sertifikalarim` | yazar: `/events`, `/arsiv` |
| `raffles` | okur — `useContent` | yazar: `/raffles` (kazananlar dâhil) |
| `eventSeats` | okur — `useContent` (kalan kontenjan); yazar — `kayit/[id]`, kayıtla aynı batch'te `arrayUnion` | yazar |
| `registrations` | yazar — `kayit/[id]` → `store.register` → `pushRegistration`, kimlik `eventId__studentNo`; okuyamaz | okur: `/registrations`, CSV, yoklama, sertifika |
| `raffleEntries` | yazar — `cekilis/[id]` → `store.enterRaffle` → `pushRaffleEntry` | okur: `/raffles/:eventId/entries` |
| `users` | yazar — `kayit-ol` (`signUp`); okur — `authStore` (`loadProfile`) | okur/yazar: e-posta doğrulama, öğrenci no, hesap silme, yoklama listesi |
| `deletionRequests` | yazar ve okur — `hesap-sil` | işler: `admin/deletion.ts` |
| `attendance` | yazar — `qr` (`yoklamaVer`); okur — `sertifikalarim` (sertifika, satırdaki `certificate` alanı) | yazar: elle yoklama, sertifika yayını |
| `devices` | yazar — `app/_layout.tsx` → `NotificationSync` → `upsertDevice`; kimlik Expo push jetonu | okur: push gönderimi |
| `eventQr`, `emailOtp`, `passwordReset`, `phoneClaims`, `studentClaims`, `pushLog`, `pendingPushes`, `pushState` | kapalı | yalnız panel |

## İçerik girişi

Kodda içerik panelden giriliyor: etkinlik ve arşiv (fotoğraflar Supabase Storage'a),
çekiliş ve kazananlar, QR penceresi, elle yoklama ve sertifika `admin/server.ts`
rotalarından yazılıyor; etkinlik `buildEvent` ile doğrulanıyor. "Yeni etkinlik / iptal /
çekiliş sonucu" push'ları yalnız bu rotalardan (`announce()`) çıkıyor — Firebase
Console'dan elle girilen içerik doğrulamayı, fotoğraf yüklemeyi ve bildirimi atlar.
Duyurular kulüp sitesinde yazılıyor; panel onları yoklayıp bildirim gönderiyor.

## Dağıtım yüzeyleri

Kod değiştiren her cevap ve PR hangi yüzeye dokunduğunu yazar; dokunulmayanlara
"gerekmiyor" yazılır.

| Yüzey | Dosyalar | Canlıya nasıl gider |
|---|---|---|
| Mobil uygulama | `app/`, `src/`, `app.json`, `eas.json`, uygulama bağımlılıkları | EAS build + mağaza (OpenClaw) ya da OTA — Claude çalıştırmaz |
| Panel | `admin/`, `nixpacks.toml`, panel ortam değişkenleri | Coolify'da redeploy; ortam değişkeni değişikliği de redeploy ister |
| Firestore kuralları | `firestore.rules` | `npm run rules:deploy`, panelden bağımsız — Claude çalıştırmaz |
| AI Gündem veritabanı | `supabase/migrations/` | Supabase'e uygulanır. `.claude/settings.json` `apply_migration` ve `execute_sql`'e onaysız izin veriyor: doğrudan üretim. Canlıda yapılan her değişiklik aynı turda migration dosyası olur |
| Yalnız depo | `docs/`, `scripts/check-*`, testler, `AGENTS.md`, `CLAUDE.md`, `graphify-out/` | hiçbir şey |

## Kurallar ve tuzaklar

Gerekçeleri `AGENTS.md`'nin why log'unda.

- **Saat:** kulüp saati +03:00. `startsAt`'te duvar saati anlamdır, ofset yalnız taşınır.
  Gün ve saat kararı `todayLocal` / `clubCalendar` / `clubHour` ile verilir, cihaz saati ya
  da `getHours()` ile değil. Takvimden arşive geçiş gün sınırında, anlık değil.
- **Yeniden denenen yazmalar idempotent:** kayıt `setDoc(eventId__studentNo)`, koltuk
  `arrayUnion` — `increment(1)` ya da `addDoc` değil. `permission-denied` tekrar denenmez.
- **Kurallar:** `firestore.rules`'a dokunan değişiklik önce `check:rules`'a senaryo ekler;
  meşru yol istemcinin şekliyle, saldırı saldırganın şekliyle sınanır.
- **Bildirim:** `rescheduleReminders` bütün zamanlanmış bildirimleri iptal ediyor; yeni
  bir yerel bildirim `src/notificationPlan.ts`'teki tek plana girer, ikinci zamanlayıcı
  kurulmaz.
- **Hermes, Node değil:** `btoa` / `atob` / `Buffer` yok; RN'nin `URL`'i ayrıştırmıyor ve
  hiç fırlatmıyor (`src/gundem/data-access/sourceUrl.ts`); rastgelelik `expo-crypto`'dan.
  Jest Node'da koştuğu için testler bunları göstermez.
- **Türkçe:** UI metni Türkçe; büyük/küçük harf `toLocaleUpperCase('tr')` /
  `toLocaleLowerCase('tr')`. `[^a-z0-9]` gibi sınıflar Türkçe harfleri siler.
- **UI:** ham `Text` yerine `Txt` / `PixelTxt` (RN font ağırlığı sentezlemiyor, her ağırlık
  ayrı aile). Press Start 2P (`fonts.pixel`) yalnız rozet, grup başlığı, boş durum ve
  yükleniyor metninde. Gradyanlar `GradientStops` tuple'ı: `gradients.*` doğrudan
  `LinearGradient`'e, `string[]`'e cast yok. Renk, font, boşluk yalnız `src/theme.ts`'te.
- **Anahtarlar:** `EXPO_PUBLIC_*` pakete gömülür, yalnız yayımlanabilir/anon anahtar
  girer. Servis hesabı, Supabase service-role, SMTP ve Azure anahtarı yalnız panel
  ortamında. `.env` ve `.env.local` ikisi de gitignore'da (`.env.example` şablon); sunucu
  tarafı `scripts/load-env.ts` ile yükler, çünkü `dotenv/config` `.env.local`'i okumaz.
- **Panel:** `npm run admin` üretim servis hesabıyla açılınca otomatik bildirim varsayılan
  AÇIK ve gerçek cihazlara gider; yerelde `ADMIN_AUTO_PUSH=off`. Panel 502/504 dönmez
  (Cloudflare gövdeyi yutar), 503 döner.
- **Supabase:** `create or replace view` görünüm seçeneklerini sıfırlar; akış görünümünü
  yeniden tanımlayan migration `with (security_invoker = true)` yazar. DDL'den sonra
  `get_advisors`.
- **Kontroller:** yeni bir iddia, koruduğu şey bozulunca kırmızı verdiği görülmeden
  güvenilmez. Kaynak eşleştiren kontroller önce yorumları atar (`strip()`), yoksa kontrol
  kendi gerekçesini bulur. `npm run check:all | tail` her zaman 0 döner.
- **Testler (RNTL 14):** `render` / `rerender` async, `await` edilir; elle `unmount()`
  çağrılmaz. Gerçek `QueryClient` mount eden test sonunda `client.clear()` — 7 günlük
  `gcTime` Jest'i açık tutar.

## graphify

- `graphify-out/` commit'li; tarihli yedekler (`graphify-out/????-??-??/`), `cache/` ve
  `manifest.json` gitignore'da (mtime taşıyorlar; grafik onlarsız da aynı çıkıyor).
  `.gitattributes` hepsini `linguist-generated` işaretliyor.
  `.graphifyignore` `design-source/` ve `.claude/skills/`'i dışarıda tutuyor; tutmazsa
  tasarım dışa aktarımının yardımcıları (`get()`, `ImageSlot`) merkez düğümlerde
  `useContent()` / `useAppStore()`'un önüne geçiyor.
- Kod değişince `graphify update .` (AST, LLM'siz, birkaç saniye) ve `graphify-out/`
  aynı commit'e. Dallar arasında `graph.json` çakışırsa elle çözülmez, yeniden üretilir.
- Mimari ve dosya ilişkisi soruları önce grafikten: `graphify query "…"`,
  `graphify explain "X"`, `graphify affected "X"`, `graphify path "A" "B"`. Grafik dinamik
  `import()`'u görmüyor: `graphify affected fetchContent` yalnız belge göndergesi döndürüyor,
  `src/content.tsx`'teki çağıranı değil. Çağıran ararken `grep` ile doğrula.

## Git

- Commit ve PR'lar depo sahibinin adına: ilk commit'ten önce
  `git config user.name Akadirr1 && git config user.email akadirr41@gmail.com`.
  `Co-Authored-By: Claude` / `Claude-Session:` satırı eklenmez.
- Force push gerekiyorsa önce söyle: SHA'lar değişir, karşı tarafta `git pull` ıraksar
  (kurtarma: `git reset --hard origin/<dal>`).
