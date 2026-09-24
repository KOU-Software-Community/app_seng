# Güvenlik testlerinin değerlendirmesi — 2026-09-24

Soru üç parçaydı: depodaki güvenlik testleri ne ölçüyor, aynı yüzeye
saldırganın şekliyle bakan testler ne buluyor, ikisinin farkı hangi açıkları
gösteriyor. Aşağıdaki her sayı bu turda ölçüldü; "olabilir" diye yazılan
hiçbir şey yok.

## 1. Mevcut testler ne ölçüyordu

| Test | Ne | İddia | Güçlü yanı | Kör noktası |
|---|---|---|---|---|
| `check:rules` | `firestore.rules` gerçek emülatörde | 18 | Saldırıyı saldırganın şekliyle (yalnızca kayıt dokümanı) sınıyor; QR penceresi ve numara işgali gerçekten kapalı | **Okuma** hiç sınanmıyordu. Dokuz koleksiyonun kapalılığı (`eventQr`, `emailOtp`, teklik kayıtları, `passwordReset`, `pushLog`, `pendingPushes`, `devices`, `raffleEntries`, `deletionRequests`) ve catch-all hiç sınanmıyordu. Alan **tipleri** ve **tavanları** hiç sınanmıyordu |
| `check:panel` | Panelin saf modülleri | 229 | OTP kararları, oturum jetonu, kilit, çerez bayrakları, CSRF, CSV formülü, teklik sahipliği, sıfırlama uçları, sertifika kaçışı, PDF sırası — hepsi kırılıp kırmızı verdiği görülerek yazılmış | "Doğru girdi doğru cevabı veriyor mu" soruyor; "yanlış girdi yanlış cevabı **alabiliyor mu**" sormuyor. `clientIp` iddiası sahte başlığın okunduğunu **yeşil** gösteriyordu |
| `check:release` | Kaynak metninde guard | 67 | Bağlantı kopukluklarını (rota sırası, mount) yakalıyor | Metin arıyor, davranış ölçmüyor. Metni doğru, davranışı yanlış olan kodu göremez — `clientIp` tam bu sınıftı |
| Jest | Uygulama | 463 | `safeNext` (açık yönlendirme), `cagir()` (200+HTML tuzağı) | Güvenlik payı iki dosya, on test |
| Supabase | migration + danışman | — | `security_invoker` düzeltmesi migration'da | GraphQL yüzeyi hiç bakılmamış (§4) |

## 2. Yeni testler

| Test | Eklenen | Ne soruyor |
|---|---|---|
| `check:rules` | +80 senaryo (18 → 107 iddia) | Okuma gizliliği (13), panel koleksiyonlarına yazma/silme (14), kayıt alanları (6), koltuk (3), yoklama (6), silme talebi (6), cihaz (8), çekiliş katılımı (12), profil (12). Tasarım gereği açık olan yerler `izin` diye yazılı: "kapalı sanılan ama açık" ile "bilerek açık" ayrışsın |
| `check:security` (yeni) | 32 iddia | Sahte `CF-Connecting-IP` (9), sayaç aşımı döngüleri — aynı eşten dönen başlıkla 50 çeviri ve 30 sıfırlama isteği (4), `/logout` bellek büyümesi (7), CSRF kenar durumları (4), kullanıcının **kendi yazdığı** alanlarla panel sayfalarına HTML (8) |
| Jest `deepLink` | +4 varyant | Boşluk ve ters bölü ile `//` kontrolünü aşma denemeleri |

## 3. Karşılaştırma: aynı testler eski koda karşı

Yeni testler düzeltmeden **önce** koşturuldu; kırmızılar aşağıda. Düzeltmeden
sonra hepsi yeşil, ve her düzeltme tek tek geri alınıp ilgili iddianın yine
kırmızı verdiği görüldü.

| Test | Eski kod | Yeni kod |
|---|---|---|
| `check:security` | 10 kırmızı: sahte başlık anahtar oldu, **50 çeviri isteğinin 0'ı**, **30 sıfırlama isteğinin 0'ı** reddedildi; çöp çerez saklandı | 32/32 |
| `check:rules` (yeni senaryolar) | 11 "izin": yoklama saati dizeye çevrildi ve 2020'ye çekildi; kayıt, katılım ve cihaz damgaları istemciden seçildi; katılım kimliği `x` oldu; profil e-postası jetondakinden farklı yazıldı ve sonradan değişti; profile 200 KB onay damgası yazıldı | 107/107 |
| `check:panel` | 229/229 (delik yeşilken de yeşildi — bkz. §5) | 231/231 |

## 4. Bulgular

| # | Önem | Nerede | Ne | Durum |
|---|---|---|---|---|
| 1 | **Yüksek** | `admin/session.ts` `clientIp` | `CF-Connecting-IP` başlığına **koşulsuz** güveniliyordu. Panelin kaynak adresine doğrudan ulaşan biri (alan adı Cloudflare'de değilse ya da Coolify'ın adresi biliniyorsa) her isteğe başka bir değer yazıp IP'ye bağlı **bütün** sayaçları sıfırlıyordu: `/login` (yönetici parolası — arkasında bütün öğrenci kayıtları), `/hesap-sil`, `/api/hesap/kod`, sıfırlama uçları, Azure çeviri kotası. Ölçüldü: 50 istekte 0 red | Düzeltildi: başlığa ancak eş adresi Cloudflare'in yayımladığı aralıklardaysa (canlı listeyle karşılaştırıldı) ya da yerel/özel adresse (Cloudflare Tunnel) güveniliyor; Node'un `net.BlockList`'i, bağımlılık yok |
| 2 | Orta | `admin/session.ts` `revokeToken`, `/logout` | `/logout` kimliksiz ve gövdesiz; gelen çerez değeri ne olursa olsun iptal listesine giriyordu ve liste her yazmada baştan sona taranıyordu. 16 KB'lık uydurma çerezlerle bir döngü: tek Map'te gigabaytlar, her istekte uzayan tarama | Düzeltildi: yalnızca imzası doğrulanan jeton saklanıyor; `check:security` on bin çöp çerezle ölçüyor |
| 3 | Orta | `firestore.rules` `attendance` | Update dalı `checkedInAt`'in **değişebildiğini** söylüyordu, neye değişebildiğini değil: dize, sayı, 2020 — hepsi geçiyordu. Create dalı `is timestamp` diyordu, yani geçmiş bir tarih de geçiyordu. Yoklama saati panelde olduğu gibi görünüyor | Düzeltildi: iki dalda da `== request.time` |
| 4 | Orta | `firestore.rules` `users` | Profil e-postası serbestti — ve panel sertifika PDF'ini **o adrese** gönderiyor, yoklama listesinde onu gösteriyor. Kurbanın adresi yazılıp kulübün alan adından ona posta gönderilebiliyordu. Onay damgaları tavansızdı (200 KB profil yazıldı), oluşturulma damgası istemciden seçilebiliyordu, e-posta sonradan değişebiliyordu | Düzeltildi: create'te `email == request.auth.token.email` ve `createdAt == request.time`; update'te e-posta ve damga değişmiyor; damgalar 40 karakter |
| 5 | Düşük | `firestore.rules` `registrations`, `raffleEntries`, `devices` | Kayıt, katılım ve cihaz damgaları istemciden; `code`/`department`/`year` tavansız (200 KB kod yazıldı, panel tabloya ve CSV'ye basıyor); katılım kimliği keyfi (`x`); cihaz `updatedAt` her tipte | Düzeltildi: `== request.time`, tavanlar, `makeEntryId` biçimi |
| 6 | Düşük | `admin/server.ts` `panelKoku` | Yorum "bu sayfayı yalnızca yönetici görüyor" diyordu; herkese açık `/sertifika/:no` da oradan geçiyor. Uydurma `Host` yalnızca onu yazanın kendi cevabını değiştirdiği için sızıntı yok | Yorum düzeltildi; üretimde `EXPO_PUBLIC_LEGAL_BASE_URL` tanımlı olmalı |
| 7 | Bilgi | Supabase (AI Gündem) | Güvenlik danışmanı: `aigundem.articles`, `article_summaries`, `digests`, `digest_items`, `sources` ve `feed_articles_v1` **GraphQL** şemasında `anon`'a açık. PostgREST bu şemayı açmıyor, ama `/graphql/v1` yetkilere bakıyor: özet filtresi (`feed_only_ready`) GraphQL'den aşılabiliyor. Veri haber içeriği, gizli değil; filtre ürün kararı | Uygulanmadı — canlı DB değişikliği operatörün. Öneri: `revoke execute on function graphql_public.graphql(text, text, jsonb, jsonb) from anon;` (GraphQL uygulamada kullanılmıyor). Ayrıca `pg_net` `public` şemasında (taşınabilir), `public.barber_*` tabloları RLS politikasız (bu uygulama değil) |

### Kapatılmayan, bilerek

- **Kimliksiz yazılan iki koleksiyon** (`devices`, `raffleEntries`) ve
  kimliksiz çeviri ucu: doküman/istek sayısına tavan yok. Cevabı Firebase App
  Check; bu defterde üç kez yazılı, bu tur da değişmedi. Yeni kural
  denetimleri (jeton biçimi, kimlik biçimi, damga) sayıyı değil şekli tutuyor.
- **Yoklama kodunun paylaşılması** — tasarım kararı, `docs/qr-yoklama-plani.md`.
- **Arama RPC'si** akış filtresinden geçmiyor — AGENTS.md'de yazılı, içerik sorunu.
- **`/api/hesap/sifre-kod`** her adres için kayıt yazıyor: IP başına 20/saat ile
  günde ~500 terk edilmiş doküman. Süpürücü yok; kodda not düşülü.

## 5. Testin kendisinden çıkan dersler

- **Doğru başlığın okunduğunu ölçen iddia, sahte başlığın okunmadığını
  ölçmez.** `check:panel` `clientIp` için üç iddia taşıyordu ve üçü de deliğin
  üstünde yeşildi. Bir testin varlığı bir yüzeyin sınandığı anlamına gelmiyor;
  sınanan şey iddianın cümlesi kadar.
- **Saldırgan döngüsü birim iddiadan fazlasını görüyor.** Sahte başlıklı 50
  istek "0 red" verince tartışılacak bir şey kalmıyor. Ve karşı kontrol şart:
  farklı eşlerin ve Cloudflare arkasındaki farklı istemcilerin sınıra
  takılmadığı ayrıca ölçülüyor — herkesi tek kovaya düşüren bir "düzeltme" de
  sahte başlık testini geçerdi.
- **Aynı doküman kimliğine art arda yazan senaryolar birbirini maskeliyor.**
  İlki geçince sonrakiler update dalına düşüyor ve o dal zaten katı: eksik bir
  create denetimi yeşil görünüyor. Eski kurallara karşı ölçüldü — iki tavan
  denetimi tam bu yüzden "geçmiş" görünmüştü. Her create senaryosu kendi
  kimliğinde.
- **`String.replace`'in ikinci argümanında `$'` özel bir kalıp.** Kural
  regex'indeki `{16}$'` dosyanın kalanını içeri kopyaladı ve emülatör dosyayı
  derleyemedi. Değiştirici fonksiyon olmalı: `s.replace(a, () => b)`.
- **Tasarım gereği açık olan yer testte `izin` diye yazılmalı.** Yoksa "kapalı
  sanılan ama açık" ile "bilerek açık" aynı yeşilde erir.

## 6. Dağıtım yüzeyleri — bu tur neye dokundu

| Yüzey | Dokunuldu mu | Ne gerekiyor |
|---|---|---|
| Panel (`admin/session.ts`, `admin/server.ts`) | Evet | Coolify'da **redeploy** |
| Firestore kuralları (`firestore.rules`) | Evet | **`npm run rules:deploy`** — deploy'dan bağımsız, yayınlanana kadar eski kurallar geçerli |
| Mobil uygulama | Hayır | Gerekmiyor — istemci zaten `serverTimestamp()` ve normalleşmiş e-posta yazıyor |
| Yalnızca depo (testler, bu belge, AGENTS.md) | Evet | Hiçbir şey |
| Supabase | Hayır | Gerekmiyor; §4/7 öneri |

Kural yayını için bir ön koşul: profil create artık `email ==
request.auth.token.email` istiyor. `signUp` hesaba da profile de aynı
normalleşmiş adresi yazdığı için yeni kayıtlar geçiyor; emülatörde jeton
e-postasıyla ölçüldü. Yayından sonraki ilk gerçek kayıt yine de izlenmeli —
Firebase'in adresi değiştirdiği bir durum bilinmiyor ama emülatör Firebase
değil.
