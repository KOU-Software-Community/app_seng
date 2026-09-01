# AI Gündem — taşıma planı

`Akadirr1/follow-ai` (`8ad72f1`) içindeki **AI Gündem** uygulaması bu depoya bir
bölüm olarak taşınıyor. Ayrı uygulama olarak yayınlanmaktan vazgeçildi.

Bu dosya kararların kaydı. Port birden fazla oturuma yayılıyor ve konteyner her
seferinde sıfırlanıyor — sohbette kalan bir plan ikinci oturumda yok.

## Ölçü

Taşınacak istemci kodu, bu uygulamanın tamamından büyük. Plandaki her karar bu
gerçeğe dayanıyor.

| | dosya | satır |
|---|---|---|
| follow-ai — mobil (`app/` + `src/`, test hariç) | 61 | **7.480** |
| follow-ai — backend (13 migration + 5 edge function) | 43 | **11.607** |
| follow-ai — testler (Jest) | 43 | **14.018** |
| **bu depo — uygulamanın tamamı** | 31 | **6.302** |

## Ürün

RSS/Atom kaynaklarından yapay zekâ haberleri toplanıyor; her makale için sunucu
tarafında üç maddelik Türkçe özet ve EN→TR çeviri üretiliyor; her sabah beş
maddelik günün bülteni hazırlanıp kullanıcının seçtiği saatte yerel bildirimle
gönderiliyor. Kaydetme ve arama var. Giriş yok, cihaz kimliği anonim.

Sunucu akışı (UTC): ingest `*/15` → özetleme `*/2` → digest hazırlık `02:45` →
finalize `03:30/40/50`. İstanbul saatiyle 06:30–06:50'de bülten hazır.

## Kararlar

Hepsi onaylandı; değiştirmek yeni bir karar gerektirir.

### K1 — Backend yerinde kalıyor

Supabase projesi `eglxzbsrewbleqlstefd` olduğu gibi çalışmaya devam ediyor.
Uygulama ona anon anahtar + RLS ile bağlanıyor.

Firestore'a taşımak 4.147 satır SQL'i ve 7.460 satır edge function'ı Cloud
Functions'a yeniden yazmak demekti — ve Cloud Functions **Blaze planı istiyor**.
Bu deponun why-log'u aynı duvarı görsel depolama için zaten kaydetmiş. pg_cron,
Vault ve RLS'in Firestore'da karşılığı da yok.

Sonuç: uygulama iki ayrı Supabase projesine bağlanıyor — görseller (panel,
service_role, sunucuda) ve AI Gündem (istemci, anon anahtar). Farklı hesaplar,
iki ayrı istemci.

Backend kişisel hesapta (`Akadirr1's Project`) kalıyor; devir şimdilik gündemde
değil. Kaydı burada duruyor.

### K2 — Yerleşim: 5. sekme "AI Gündem"

Alt barda beşinci sekme. İçinde iç gezinme: akış (varsayılan) · bülten ·
kaydedilenler. Makale detayı ve arama kök yığında.

4 + 5 = 9 sekme bir alt barda okunmaz. Ayarlar `bildirim` ekranına katılıyor.

### K3 — Kullanıcı kaynak ekleyemiyor (v1)

Kaynak listesi sabit: `seed_default_sources` migration'ının verdiği altı kaynak.
`AddSourceSheet` ve `addSourceByUrl` taşınmıyor; backend'deki `add-source`
fonksiyonu yerinde kalıyor ama çağıran olmuyor.

Gerekçe: kulüp uygulamasında keyfi RSS, kulübün adı altında keyfi içerik demek.
İstenirse sonradan panelden yönetilen bir liste olarak açılabilir.

### K4 — Özetler paylaşımlı, cihaz başına değil

Ölçüldü: özetler `article_summaries` tablosuna bir kez yazılıyor ve her cihaz
oradan okuyor. Okuma ortak ve sınırsız.

Cihaz başına olan tek şey, **yeni** bir özetlemeyi tetikleme hakkı
(`request_enrichment_miss`) — bu bir kötüye kullanım freni, okuma sınırı değil.
Üstünde global bir günlük tavan var (`AI_DAILY_CAP`, varsayılan 200).

Sağlayıcılar: Gemini `gemini-2.5-flash` birincil, NVIDIA
`meta/llama-3.3-70b-instruct` yedek. İkisi de **test anahtarı** — kota dar, o
yüzden sunucu tarafı ön-özetleme (digest `prepare` adımı adayları kendisi
kuyruğa alıyor) asıl yol; kullanıcının makale açması ikincil.

### K5 — Testler geliyor, kırpılarak

`jest` + `jest-expo` + `@testing-library/react-native` devDependency olarak
giriyor, `check:all` sonuna `npm test` ekleniyor. Taşınan koda ait testler
geliyor; atılan koda ait olanlar (onboarding, ThemeProvider, palettes,
splash-gate) gelmiyor.

Testleri "bu depoda Jest yok" diye atmak, deponun kendi ilkesinin tersi olurdu.

follow-ai'ın `scripts/check-bundle.mjs`'i (bundle'da sır tarama) de alınıyor —
bu deponun `check:release`'inde karşılığı yok.

### K6 — Veri katmanı aynen, bir bağımlılık eksiği ile

`Repositories` arayüzü (sürümlenmiş, adaptörden bağımsız) ve TanStack Query
aynen taşınıyor: 1.000'den fazla test bu davranışı ölçüyor, elde yazılmış bir
provider'a çevirmek en büyük riski hiç gerek yokken üretirdi.

Kalıcılık `expo-sqlite/kv-store` yerine bu depoda zaten olan **AsyncStorage**
üzerinden yapılıyor (`@tanstack/query-async-storage-persister` destekliyor).
`expo-sqlite` hiç girmiyor — bir native modül, bir prebuild riski eksik.

Eklenen: `@tanstack/react-query`, `@tanstack/react-query-persist-client`,
`@tanstack/query-async-storage-persister`, ve `@supabase/supabase-js`'in
`devDependencies` → `dependencies` taşınması. `react-native-svg` zaten var.
`@expo-google-fonts/inter` girmiyor.

### K7 — Mock veri modu kalıyor

`EXPO_PUBLIC_DATA_MODE=mock|supabase` seam'i ve fixture'lar taşınıyor. Kimlik
bilgisi olmadan uygulamayı çalıştırabilmek `npx expo export` alışkanlığıyla
birebir uyuşuyor; CI'da ağsız çalışıyor.

### K8 — Şimdilik yalnızca açık tema; koyu tema sonra, tüm uygulamaya birden

AI Gündem ekranları bu deponun açık temasına giydiriliyor. Kaynak repodaki
koyu-birincil tema sistemi (`src/theme/**`) taşınmıyor.

Koyu tema iptal değil, ertelendi: port bittikten sonra **uygulamanın tamamına
birden** gelecek ayrı bir iş. Yalnızca AI Gündem bölümünü tema duyarlı yapmak
elenen seçenek — aynı uygulamada iki görsel dil olurdu ve bir sekmeye geçince
temanın değişmesi kullanıcıya hata gibi görünürdü.

O iş geldiğinde asıl maliyet renk paleti değil, `colors.*`'ı statik olarak içe
aktaran 31 dosya ve modül yüklenirken değerlendirilen `StyleSheet.create`
çağrıları olacak. Bu portun içine sıkıştırılmayacak kadar büyük.

## Taşınmayanlar

| ne | neden |
|---|---|
| `supabase/**` (11.607 satır) | Backend canlı ve yerinde kalıyor (K1). |
| `agents/**` (63 dosya) | Başka bir ajan altyapısının orkestrasyon kayıtları. |
| `design/**` | Tasarım kaynağı; bu depoda `design-source/` zaten graph'ı bozuyor. |
| `app/onboarding.tsx` | Bu uygulamanın kendi onboarding'i var. |
| `src/theme/**` | Renk yalnızca `src/theme.ts`'te yaşar. |
| `AddSourceSheet` (arayüz) | K3. `addSourceByUrl` sözleşmede kalıyor — adaptörlerin ikisi de uyguluyor ve testleri var; taşınmayan şey onu çağıran ekran. |
| `.codex/`, `scripts/setup-env.ps1` | Başka ajan altyapısı, PowerShell. |

## SDK farkı

| | follow-ai | bu depo |
|---|---|---|
| Expo | 54.0.37 | 57.0.17 |
| React Native | 0.81.5 | 0.86.3 |
| React | 19.1.0 | 19.2.3 |
| expo-router | 6.0.24 | ~57.0.17 |
| expo-notifications | 0.32.17 | ~57.0.15 |

Kaynak repo SDK 54'te bilinçli kilitliydi. Taşınan kod 57'ye uyarlanıyor. Elle
sürüm yazılmıyor — `npm run deps:sync`.

**Fark P1'de ölçüldü ve beklenenden küçük çıktı:**

- Taşınacak kapsamın ihtiyaç duyduğu her native modül bu depoda **zaten kurulu
  ve SDK 57 sürümünde**: `react-native`, `expo-router`, `react-native-safe-area-context`,
  `react-native-svg`, `expo-status-bar`, `expo-splash-screen`, `expo-linking`,
  `expo-constants`. Yeni Expo modülü gerekmiyor.
- Kullanılan dört `expo-router` API'si (`Stack`, `Tabs`, `useLocalSearchParams`,
  `useRouter`) bu deponun **zaten kullandığı** dört API. Bir probe dosyası
  expo-router 57.0.17 altında temiz derlendi.
- `expo-notifications` kod tabanında doğrudan içe aktarılmıyor: enjekte edilen
  bir `NotificationsApi` arayüzünün arkasında ve tek bir uyarlama noktası var
  (`src/notifications/index.ts`, tembel `require`). Yani SDK 57'nin foreground
  handler değişikliği (`shouldShowAlert` → banner/list) **tek dosyaya** dokunuyor
  ve bu deponun `src/notifications.tsx`'i doğrusunu zaten yapıyor.
- Düşenler: `expo-sqlite` (K6), `@expo-google-fonts/inter` (K8).

Geriye kalan risk ekran katmanında: React 19.1 → 19.2 ve RN 0.81 → 0.86 tip
imzaları ancak kod taşınırken typecheck'e çarpınca görünür. P2 ve P4'te ölçülecek.

## Fazlar

Her faz bir PR, her PR `npm run check:all` yeşil + CI yeşil. Kapı geçilmeden
sonraki faz başlamıyor.

| faz | iş | kapı |
|---|---|---|
| P0 ✅ | Hazırlık: hook'a Supabase skill kurulumu, bu plan, graph | hook yeşil, plan işlendi |
| P1 ✅ | Bağımlılıklar + env seam + ikinci Supabase istemcisi; SDK 54→57 farkının ölçümü | `check:all` + `expo export` yeşil, ekran yok |
| P2 ✅ | Saf katman: `domain` + `data-access` + `storage` + `format`, testleriyle | Jest devrede, taşınan testler yeşil |
| P3 ✅ | Sağlayıcılar: QueryProvider + AsyncStorage persister + user-state + sorgu kancaları | 12 suite / 159 test yeşil, ekran yok |
| P4 ✅ | Akış ekranı + makale detayı, bu deponun tasarımıyla; 5. sekme belirdi | 14 suite / 173 test, `expo export` yeşil (cihaz denemesi yapılmadı) |
| P5 ✅ | Bülten ekranı + bildirim birleştirme | 15 suite / 187 test; sessiz saat kuralı kırmızı testiyle sınandı |
| P6 | Kaydedilenler + arama | alt ekranlar tam |
| P7 | Ayarların `bildirim` ekranına katılması, boş/hata durumları, çevrimdışı akış | görsel tutarlılık |
| P8 | Yayın: `check:bundle`, EAS ortam değişkenleri (üç profil ayrı), yeni release guard'ları | EAS build yeşil |

P4 tek başına planın en ağır parçası: ~3.300 satır ekran ve bileşen kodunun
görsel yarısı yeniden yazılıyor, mantık yarısı korunuyor.

## Riskler

- **Model maliyeti.** Test anahtarları dar kotalı. Günlük tavan ve hangi hesabın
  ödediği izlenmeli; kullanıcı sayısı öğrenci sayısına çıkarsa tavan hızla dolar.
- **Backend sahipliği.** Kişisel hesapta. Devir şimdilik istenmedi; kaydı burada.
- **Supabase ücretsiz katman duraklatması.** Hareketsizlikte askıya alınıyor;
  pg_cron çalıştığı sürece sorun olmamalı — **ölçülmedi**.
- **Anon anahtar herkese açık depoda.** `follow-ai/scripts/env.example` içinde
  gerçek bir legacy anon JWT var; tasarımı gereği istemciye gömülen bir anahtar,
  yani sızıntı değil — ama koruma tamamen RLS'e bağlı. Taşımadan önce RLS'in
  gerçekten kapalı olduğu doğrulanmalı.
- **Uygulama boyutu.** P4'te ölçüldü: akış ve makale ekranı bağlandıktan sonra
  iOS paketi **4,2 MB → 5,1 MB** (+900 KB). Bunun 600 KB'ı P1'de ölçülen
  `@supabase/supabase-js`, kalanı TanStack ve taşınan katmanlar. Kalan ekranlar
  (P6) henüz grafikte değil.
- **Kaynak depodaki bilinen borçlar:** Jest paralel koşuda bir worker'ı
  force-exit ediyor; istek gövdesi byte sınırı yok.

## Doğrulanmamışlar — doğrulanmış gibi anlatmayın

- **Backend'in şu an canlı olduğu görülmedi.** Kaynak deponun RUNBOOK'u "her şey
  canlı" diyor ama o Supabase projesi bu oturuma bağlı değil. pg_cron işleri,
  Vault anahtarları ve digest üretimi ölçülmedi.
- follow-ai'ın testleri bu ortamda çalıştırılmadı. "1.052 test" RUNBOOK'un
  beyanı; ölçülen 43 dosya / 14.018 satır.
- SDK 54 → 57 farkının kodda nereye çarptığı ölçülmedi.
- Uygulama hiçbir cihazda çalıştırılmadı.

## Sonraya bırakılanlar

- **Koyu tema** (K8) — port bittikten sonra, uygulamanın tamamına birden.
- **Panelden yönetilen kaynak listesi** (K3) — kullanıcı kaynak ekleyemiyor;
  istenirse kaynak kataloğu yönetim paneline bir sayfa olarak eklenebilir.
- **Backend'in kulübe devri** (K1) — şimdilik istenmedi.
