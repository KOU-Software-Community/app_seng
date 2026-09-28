# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 226 files · ~291,885 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1978 nodes · 5257 edges · 84 communities (79 shown, 5 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 374 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8d53d2e0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- translateApi.ts
- data-access/index.ts
- react-native
- server.ts
- store.tsx
- mock/repositories.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- supabase/repositories.ts
- env.ts
- mail.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- ui.tsx
- devDependencies
- check-release.mjs
- data-access/hooks.ts
- hesap.tsx
- Load-bearing decisions — the why log
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- todayLocal
- integration.test.tsx
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- accountSchema.ts
- buildEvent
- react
- eventSchema.ts
- qr.ts
- Doğrulama ve teklik — plan ve kurulum
- theme.ts
- deploy-rules.mjs
- sync-deps.mjs
- feed-screen.test.tsx
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- attendance.ts
- make-icons.py
- accountApi.ts
- firebase.ts
- home-slider.test.tsx
- clubCalendar
- monthOrder
- check-bundle.mjs
- ref_node_fs
- README.md
- types.ts
- announcements.tsx
- notification-sync.test.tsx
- repository
- app/_layout.tsx
- readingText.ts
- qr.tsx
- tsconfig.json
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- qrSchema.ts
- allowScripts
- notifications.tsx
- parseSourceUrl
- session-start.sh
- Dosya haritası
- article-summary.test.tsx
- vitrinSchema.ts
- auth.ts
- admin/certificates.ts
- data.ts
- FeedView
- 4. Uygulama
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- src/certificates.ts

## God Nodes (most connected - your core abstractions)
1. `react` - 67 edges
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
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `4.3 Kurallar (şekil)` --references--> `get()`  [INFERRED]
  docs/giris-sistemi-plani.md → scripts/check-panel.ts

## Import Cycles
- None detected.

## Communities (84 total, 5 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (50): announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending(), pendingSummary() (+42 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (54): makeBelgeNo(), publishCertificates(), decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS (+46 more)

### Community 2 - "translateApi.ts"
Cohesion: 0.16
Nodes (16): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, Bagimliliklar (+8 more)

### Community 3 - "data-access/index.ts"
Cohesion: 0.15
Nodes (19): getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), createMockRepositories(), mockArticles(), NO_CONTENT_ARTICLE, createMockDigestRepository(), createMockEnrichmentRepository() (+11 more)

### Community 4 - "react-native"
Cohesion: 0.10
Nodes (36): styles, styles, styles, styles, styles, styles, Tab, 4.2 Ana sayfa (`app/(tabs)/index.tsx`) (+28 more)

### Community 5 - "server.ts"
Cohesion: 0.05
Nodes (53): parsePort(), resolvePort(), registeredNotPresent(), app, attempts, authed(), db, formDateTime() (+45 more)

### Community 6 - "store.tsx"
Cohesion: 0.17
Nodes (14): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState (+6 more)

### Community 7 - "mock/repositories.ts"
Cohesion: 0.09
Nodes (28): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, compareArticles(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository (+20 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.08
Nodes (38): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+30 more)

### Community 9 - "esc"
Cohesion: 0.09
Nodes (38): AuthLike, durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage() (+30 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (37): author, bugs, url, description, license, main, name, overrides (+29 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "supabase/repositories.ts"
Cohesion: 0.08
Nodes (51): @supabase/supabase-js, env, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC (+43 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "mail.ts"
Cohesion: 0.22
Nodes (9): initMail(), Mail, MailConfig, MailEki, MailEnv, mailFrom(), MailResult, readMailConfig() (+1 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.09
Nodes (50): moveBy(), placeAt(), sameMembers(), ACCEPTED_TYPES, bucketName(), deleteFolder(), deletePhotos(), FOLDERS (+42 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.11
Nodes (25): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW (+17 more)

### Community 19 - "pdf.ts"
Cohesion: 0.12
Nodes (25): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+17 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "ui.tsx"
Cohesion: 0.08
Nodes (38): Conventions, BildirimAyarlariRoute(), styles, SplashRoute(), styles, styles, OnboardingRoute(), styles (+30 more)

### Community 22 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 23 - "check-release.mjs"
Cohesion: 0.05
Nodes (37): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+29 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.20
Nodes (20): Bu turda **bilerek** düzeltilmeyenler, P9 — grafiğe dayalı temizlik turu (2026-09-02), asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage() (+12 more)

### Community 25 - "hesap.tsx"
Cohesion: 0.12
Nodes (31): styles, VerifyRoute(), LoginRoute(), styles, styles, BOS, styles, ResetPasswordRoute() (+23 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.13
Nodes (15): Azure çeviri sağlığı — sessizliğin iki anlamı, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti (+7 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (22): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+14 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "todayLocal"
Cohesion: 0.18
Nodes (14): From the 1.1.0 release, EventDetailRoute(), initials(), Kurallar ve tuzaklar, Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım) (+6 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.10
Nodes (27): Üç ölü parça, üç ayrı ölüm biçimi, @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, QUERY_KEY_VERSION, EnrichmentResponse, asyncStorageFromKv(), CACHE_BUSTER (+19 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.10
Nodes (23): keyboardFor(), placeholderFor(), RaffleEntryRoute(), bad, base, FIELDS, NOW, picked (+15 more)

### Community 33 - "kv.ts"
Cohesion: 0.15
Nodes (11): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+3 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (19): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+11 more)

### Community 35 - "accountSchema.ts"
Cohesion: 0.19
Nodes (21): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), SignupRoute(), ageOn(), DateParts, FieldErrors, formatPhone(), isValidSignup() (+13 more)

### Community 36 - "buildEvent"
Cohesion: 0.23
Nodes (12): ArchiveCard(), ArsivRoute(), GridView(), İçerik girişi, buildEvent(), daysInMonth(), monthGrids(), monthKeyOf() (+4 more)

### Community 37 - "react"
Cohesion: 0.26
Nodes (9): styles, Global Constraints, react, PhotoGallery(), styles, PrizeProviders(), styles, Txt() (+1 more)

### Community 38 - "eventSchema.ts"
Cohesion: 0.17
Nodes (12): BuildResult, EventInput, LOCAL_OFFSET, MAX_PHOTOS, MonthGrid, MONTHS_SHORT, Parsed, seatsLabel() (+4 more)

### Community 39 - "qr.ts"
Cohesion: 0.16
Nodes (21): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr() (+13 more)

### Community 40 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.12
Nodes (15): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+7 more)

### Community 41 - "theme.ts"
Cohesion: 0.09
Nodes (22): AnnouncementRoute(), styles, styles, AnnouncementRow(), styles, styles, View_, expo-router (+14 more)

### Community 42 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "feed-screen.test.tsx"
Cohesion: 0.18
Nodes (9): GundemRoute(), isTab(), @testing-library/react-native, clients, METRICS, mount(), todayLineTr(), METRICS (+1 more)

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.20
Nodes (14): RaffleRulesRoute(), styles, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB (+6 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.17
Nodes (9): ref_node_os, assert(), emu, izin(), JAR, KURALLAR, red(), sonuc() (+1 more)

### Community 48 - "attendance.ts"
Cohesion: 0.43
Nodes (6): YoklamaHatasi, YoklamaSonucu, yoklamaVarMi(), yoklamaVer(), currentUser(), attendanceId()

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.13
Nodes (23): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+15 more)

### Community 51 - "firebase.ts"
Cohesion: 0.18
Nodes (24): Veri: kim neyi okuyor, kim yazıyor, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, 4.1 Okuma ve durum, Dosyalar, fetchContent(), fetchSlides(), fetchSponsors(), getDb() (+16 more)

### Community 53 - "clubCalendar"
Cohesion: 0.36
Nodes (7): clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "ref_node_fs"
Cohesion: 0.10
Nodes (20): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, csvCell(), loadServiceAccount(), RFC-4180, dotenv (+12 more)

### Community 57 - "README.md"
Cohesion: 0.06
Nodes (31): Agent setup, Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules, Arşiv paneli, Bildirimler (+23 more)

### Community 58 - "types.ts"
Cohesion: 0.11
Nodes (17): GundemArticleRoute(), PANEL_BASE_URL, bodyFor(), hasSummary(), Segment, segmentState(), useFallbackTranslation(), YedekCeviri (+9 more)

### Community 59 - "announcements.tsx"
Cohesion: 0.21
Nodes (12): announcementChoices(), 3.3 Ayrıştırma ve doğrulama, fetchAnnouncement(), fetchAnnouncements(), getJson(), toAnnouncement(), unwrapList(), AnnouncementsProvider() (+4 more)

### Community 60 - "notification-sync.test.tsx"
Cohesion: 0.40
Nodes (4): mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "app/_layout.tsx"
Cohesion: 0.25
Nodes (5): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar

### Community 65 - "readingText.ts"
Cohesion: 0.26
Nodes (9): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, Sekiz piksellik bir glif yolu okunarak değerlendirilemez, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody(), rowRuns() (+1 more)

### Community 66 - "qr.tsx"
Cohesion: 0.23
Nodes (14): Durum, QrRoute(), styles, @react-native-async-storage/async-storage, yoklamaMesaji(), bekleyeniOku(), bekleyeniSil(), bekleyeniYaz() (+6 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.22
Nodes (7): 1. Mevcut testler ne ölçüyordu, 2. Yeni testler, 3. Karşılaştırma: aynı testler eski koda karşı, 5. Testin kendisinden çıkan dersler, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 69 - "qrSchema.ts"
Cohesion: 0.31
Nodes (6): joinLocal(), QR_ACILIS_SAAT, QR_ALPHABET, QR_TOKEN_LENGTH, TOKEN_RE, windowOpen()

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "notifications.tsx"
Cohesion: 0.15
Nodes (17): Bildirim gelmedi, nereye bakılır, expo-constants, expo-device, expo-notifications, ClubEvent, DeviceRecord, applyQuietHours(), DIGEST_CATEGORY (+9 more)

### Community 72 - "parseSourceUrl"
Cohesion: 0.31
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "Dosya haritası"
Cohesion: 0.13
Nodes (24): SponsorRoute(), SponsorsRoute(), HomeRoute(), TakvimRoute(), Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme (+16 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.25
Nodes (18): 5.4 Sunucu, 7. Test ve kontroller, Build, buildSlide(), buildSponsor(), expiredSlideIds(), https(), idList() (+10 more)

### Community 79 - "auth.ts"
Cohesion: 0.18
Nodes (16): HesapSilRoute(), HesapRoute(), Profile, deletionDone(), finishAccountDeletion(), getAuthClient(), loadProfile(), requestAccountDeletion() (+8 more)

### Community 80 - "admin/certificates.ts"
Cohesion: 0.11
Nodes (23): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+15 more)

### Community 81 - "data.ts"
Cohesion: 0.09
Nodes (26): styles, RegistrationDoneRoute(), RegistrationRoute(), styles, AuthGate(), styles, ContentSource, ContentValue (+18 more)

### Community 83 - "FeedView"
Cohesion: 0.27
Nodes (9): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW (+1 more)

### Community 85 - "4. Uygulama"
Cohesion: 0.08
Nodes (25): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar (+17 more)

### Community 86 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.17
Nodes (11): alreadyAnnounced(), Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, Dağıtım yüzeyleri, Git, graphify, Klasörler, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG) (+3 more)

### Community 87 - "src/certificates.ts"
Cohesion: 0.24
Nodes (8): CertificatesRoute(), firebase, sertifikalarimiGetir(), Sertifikam, sertifikaPdfUrl(), sertifikaUrl(), COLLECTIONS, firebase/auth

## Knowledge Gaps
- **620 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+615 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 760 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `data-access/index.ts`, `react-native`, `store.tsx`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `ui.tsx`, `data-access/hooks.ts`, `hesap.tsx`, `integration.test.tsx`, `theme.ts`, `feed-screen.test.tsx`, `cekilis-kurallari.tsx`, `firebase.ts`, `home-slider.test.tsx`, `announcements.tsx`, `notification-sync.test.tsx`, `app/_layout.tsx`, `qr.tsx`, `notifications.tsx`, `Dosya haritası`, `article-summary.test.tsx`, `auth.ts`, `data.ts`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `data-access/index.ts`, `server.ts`, `mock/repositories.ts`, `demo-account.ts`, `ref_node_fs`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _620 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08282828282828283 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.046007403490216814 - nodes in this community are weakly interconnected._