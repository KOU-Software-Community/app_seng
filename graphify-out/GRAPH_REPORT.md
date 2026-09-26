# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 225 files · ~290,225 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1972 nodes · 5225 edges · 84 communities (78 shown, 6 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 364 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `383b105b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- etkinlik/[id].tsx
- ui.tsx
- server.ts
- client.ts
- types.ts
- mock/mapper.ts
- esc
- expo
- package.json
- FeedView.tsx
- supabase/repositories.ts
- env.ts
- admin/certificates.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- cekilis/[id].tsx
- devDependencies
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
- mock/repositories.ts
- Load-bearing decisions — the why log
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- theme.ts
- QueryProvider.tsx
- raffleSchema.ts
- kv.ts
- eventSchema.ts
- accountApi.ts
- hesap.tsx
- translateApi.ts
- data.ts
- qr.ts
- Doğrulama ve teklik — plan ve kurulum
- react
- deploy-rules.mjs
- sync-deps.mjs
- ref_node_path
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- KOÜ Yazılım Kulübü — agent notes
- make-icons.py
- accountSchema.ts
- Mağazaya çıkarma
- check-release.mjs
- hermes-safe.test.ts
- 8. Fazlar
- check-bundle.mjs
- export-registrations.ts
- README.md
- useFallbackTranslation.ts
- announcements.tsx
- Firebase
- ref_node_fs
- repository
- firebase.ts
- icons.test.ts
- readingText.ts
- QrRoute
- tsconfig.json
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- Yönetim paneli
- allowScripts
- notifications.tsx
- parseSourceUrl
- session-start.sh
- Sponsorlar ve ana sayfa slider'ı — uygulama planı
- article-summary.test.tsx
- vitrinSchema.ts
- bugs
- overrides
- integration.test.tsx
- mail.ts
- auth.ts

## God Nodes (most connected - your core abstractions)
1. `react` - 66 edges
2. `react-native` - 47 edges
3. `Txt()` - 43 edges
4. `colors` - 41 edges
5. `esc()` - 37 edges
6. `Load-bearing decisions — the why log` - 37 edges
7. `expo-router` - 36 edges
8. `Dosya haritası` - 36 edges
9. `useContent()` - 33 edges
10. `page()` - 31 edges

## Surprising Connections (you probably didn't know these)
- `Review Focus` --references--> `sameMembers()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/ordering.ts
- `Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı` --references--> `PhotoUploadError`  [INFERRED]
  AGENTS.md → admin/photos.ts
- `Fazlar` --references--> `storage()`  [INFERRED]
  docs/ai-gundem-port.md → admin/photos.ts
- `6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı` --references--> `attendanceRows()`  [INFERRED]
  docs/guvenlik-testleri-degerlendirmesi.md → admin/qr.ts
- `Task 5: Panel görünümü — `admin/vitrinView.ts`, menü, CSS` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/views.ts

## Import Cycles
- None detected.

## Communities (84 total, 6 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.07
Nodes (58): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+50 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (40): decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS, OTP_MAX_SENDS, OTP_RESEND_MS (+32 more)

### Community 2 - "check-security.ts"
Cohesion: 0.08
Nodes (25): AuthLike, authed(), readCookie(), clientIp(), CLOUDFLARE, cookieHeader(), guvenilenEs, iptalEdilen (+17 more)

### Community 3 - "etkinlik/[id].tsx"
Cohesion: 0.32
Nodes (6): EventDetailRoute(), initials(), styles, PhotoGallery(), styles, IconTile()

### Community 4 - "ui.tsx"
Cohesion: 0.08
Nodes (46): Agent setup, Conventions, styles, ArsivRoute(), styles, styles, Tab, EventRow() (+38 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (26): pendingSummary(), recentPushLog(), app, attempts, db, formDateTime(), formToInput(), inputToForm() (+18 more)

### Community 6 - "client.ts"
Cohesion: 0.13
Nodes (26): @supabase/supabase-js, env, FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), toDataError(), toNetworkError() (+18 more)

### Community 7 - "types.ts"
Cohesion: 0.09
Nodes (28): bodyFor(), hasSummary(), Segment, segmentState(), getRepositories(), resetRepositories(), DigestRepositoryV1, FeedRepositoryV1 (+20 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.10
Nodes (28): cursorOf(), isAfterCursor(), cursorOfArticle(), FEED_URLS, hoursAgoFromLabel(), isoFromLabel(), MOCK_NOW_MS, mockSources() (+20 more)

### Community 9 - "esc"
Cohesion: 0.11
Nodes (37): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+29 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (37): author, description, license, main, name, private, version, expo (+29 more)

### Community 12 - "FeedView.tsx"
Cohesion: 0.09
Nodes (53): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), Bu turda **bilerek** düzeltilmeyenler, P9 — grafiğe dayalı temizlik turu (2026-09-02), asDataError(), GateCandidate, GateResult, heldLineTr() (+45 more)

### Community 13 - "supabase/repositories.ts"
Cohesion: 0.13
Nodes (23): SEARCH_RPC, ceviriDurumu(), DigestArticleFacts, DigestItemRow, DigestRow, FEED_COLUMNS, FeedArticleRow, isDigit() (+15 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "admin/certificates.ts"
Cohesion: 0.10
Nodes (26): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+18 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.09
Nodes (53): moveBy(), placeAt(), sameMembers(), ACCEPTED_TYPES, bucketName(), deleteEventPhotos(), deleteFolder(), deletePhotos() (+45 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.11
Nodes (25): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW (+17 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (26): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+18 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.12
Nodes (26): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+18 more)

### Community 21 - "cekilis/[id].tsx"
Cohesion: 0.08
Nodes (31): BildirimAyarlariRoute(), styles, keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, SplashRoute(), styles (+23 more)

### Community 22 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.09
Nodes (22): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+14 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.19
Nodes (20): GundemArticleRoute(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage(), retryPolicy(), unwrap() (+12 more)

### Community 25 - "mock/repositories.ts"
Cohesion: 0.10
Nodes (29): src_gundem_data_access_index_repository_contract_version, createMockRepositories(), compareArticles(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, mockArticles(), mockDigest() (+21 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.11
Nodes (18): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti (+10 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (22): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+14 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (25): requireAuth(), 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i (+17 more)

### Community 30 - "theme.ts"
Cohesion: 0.12
Nodes (36): styles, LoginRoute(), styles, styles, styles, RegistrationRoute(), styles, BOS (+28 more)

### Community 31 - "QueryProvider.tsx"
Cohesion: 0.13
Nodes (23): @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, @testing-library/react-native, clients, METRICS, mount(), QUERY_KEY_VERSION (+15 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.12
Nodes (17): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+9 more)

### Community 33 - "kv.ts"
Cohesion: 0.16
Nodes (12): Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4(), resetDeviceIdCache() (+4 more)

### Community 34 - "eventSchema.ts"
Cohesion: 0.06
Nodes (43): ArchiveCard(), İçerik girişi, broken, built, capped, dayBefore, EV1, EV1_INPUT (+35 more)

### Community 35 - "accountApi.ts"
Cohesion: 0.16
Nodes (20): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+12 more)

### Community 36 - "hesap.tsx"
Cohesion: 0.17
Nodes (17): VerifyRoute(), ResetPasswordRoute(), HesapRoute(), OgrenciNo(), styles, digits(), PRIVACY_POLICY_URL, TERMS_URL (+9 more)

### Community 37 - "translateApi.ts"
Cohesion: 0.16
Nodes (17): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, loginLimiter() (+9 more)

### Community 38 - "data.ts"
Cohesion: 0.09
Nodes (24): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, ACCOUNT_DELETE_URL, ARCHIVE_CATEGORIES, DEPARTMENTS, LEGAL_BASE, NOTIFICATION_CATEGORIES, NotificationCategory, ONBOARDING (+16 more)

### Community 39 - "qr.ts"
Cohesion: 0.11
Nodes (31): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr() (+23 more)

### Community 40 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 41 - "react"
Cohesion: 0.09
Nodes (30): AnnouncementRoute(), styles, SponsorRoute(), styles, styles, AnnouncementRow(), styles, Task 9: Slider bileşeni — `src/components/HomeSlider.tsx` (+22 more)

### Community 42 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "ref_node_path"
Cohesion: 0.36
Nodes (7): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), ref_node_path, parsed()

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.20
Nodes (14): RaffleRulesRoute(), styles, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB (+6 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "KOÜ Yazılım Kulübü — agent notes"
Cohesion: 0.33
Nodes (5): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountSchema.ts"
Cohesion: 0.16
Nodes (22): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), SignupRoute(), ageOn(), DateParts, EMAIL_RE, FieldErrors, formatPhone() (+14 more)

### Community 51 - "Mağazaya çıkarma"
Cohesion: 0.33
Nodes (6): Build'e hangi değerler giriyor, İkonlar ve mağaza görselleri, Mağazaya çıkarma, "Otomatik artsın" isteniyorsa, Sürüm ne zaman elle artırılır, Sürüm numaraları

### Community 52 - "check-release.mjs"
Cohesion: 0.20
Nodes (9): Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root, rulesBlock() (+1 more)

### Community 53 - "hermes-safe.test.ts"
Cohesion: 0.16
Nodes (17): GundemRoute(), isTab(), clubCalendar(), base64ToBytes(), bytesToBase64(), decodeCursor(), encodeCursor(), keysetFilter() (+9 more)

### Community 54 - "8. Fazlar"
Cohesion: 0.33
Nodes (6): 8. Fazlar, Faz 2 — giriş, profil, eşleşmiş kayıt, Faz 3 — hesap silme (mağaza şartı), Faz 4 — QR yoklama ve çekiliş, Faz 5 — sertifika, Yapılmayacaklar

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 57 - "README.md"
Cohesion: 0.12
Nodes (15): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Görseller, Katkı, Kurulum, Lisans (+7 more)

### Community 58 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 59 - "announcements.tsx"
Cohesion: 0.16
Nodes (15): 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli, fetchAnnouncement(), fetchAnnouncements() (+7 more)

### Community 60 - "Firebase"
Cohesion: 0.16
Nodes (10): Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı, mockGetExpoPushToken, mockUpsertDevice (+2 more)

### Community 61 - "ref_node_fs"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_fs, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "firebase.ts"
Cohesion: 0.14
Nodes (18): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar, ContentProvider(), ContentSource, ContentValue (+10 more)

### Community 64 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "QrRoute"
Cohesion: 0.27
Nodes (10): QrRoute(), @react-native-async-storage/async-storage, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId(), isQrToken(), parseQrPayload() (+2 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.25
Nodes (6): 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 69 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "notifications.tsx"
Cohesion: 0.17
Nodes (17): ClubEvent, DIGEST_HOURS, DeviceRecord, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications() (+9 more)

### Community 72 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.06
Nodes (66): SponsorsRoute(), SatirLink(), HomeRoute(), Dosya haritası, Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme, Task 11: Sponsor ekranları — `/sponsorlar`, `/sponsor/[id]`, Task 12: "Ödülü sağlayan" — `PrizeProviders`, Task 13: Hesabım — KULÜP grubu (+58 more)

### Community 83 - "integration.test.tsx"
Cohesion: 0.25
Nodes (4): clients, fakePostgrest(), Filters, parseKeyset()

### Community 86 - "mail.ts"
Cohesion: 0.22
Nodes (9): initMail(), Mail, MailConfig, MailEki, MailEnv, mailFrom(), MailResult, readMailConfig() (+1 more)

### Community 87 - "auth.ts"
Cohesion: 0.11
Nodes (36): From the 1.1.0 release, HesapSilRoute(), CertificatesRoute(), Veri: kim neyi okuyor, kim yazıyor, Dosyalar, firebase, YoklamaHatasi, yoklamaMesaji() (+28 more)

## Knowledge Gaps
- **621 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+616 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 768 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `etkinlik/[id].tsx`, `ui.tsx`, `package.json`, `FeedView.tsx`, `useEnrichmentWarmup.ts`, `cekilis/[id].tsx`, `data-access/hooks.ts`, `theme.ts`, `QueryProvider.tsx`, `hesap.tsx`, `data.ts`, `cekilis-kurallari.tsx`, `announcements.tsx`, `Firebase`, `firebase.ts`, `notifications.tsx`, `article-summary.test.tsx`, `vitrinSchema.ts`, `integration.test.tsx`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `err()` connect `client.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `types.ts`, `supabase/repositories.ts`, `demo-account.ts`, `export-registrations.ts`, `mock/repositories.ts`?**
  _High betweenness centrality (0.085) - this node is a cross-community bridge._
- **Why does `ClubEvent` connect `notifications.tsx` to `push.ts`, `eventSchema.ts`, `ui.tsx`, `server.ts`, `Yönetim paneli`, `data.ts`, `parseSourceUrl`, `react`, `vitrinSchema.ts`, `vitrin.ts`, `2. Fikrin değerlendirmesi — zayıf noktalar`, `firebase.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _621 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06696428571428571 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.045739348370927316 - nodes in this community are weakly interconnected._