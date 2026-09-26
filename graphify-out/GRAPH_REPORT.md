# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 213 files · ~281,689 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1896 nodes · 4831 edges · 85 communities (82 shown, 3 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 315 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e2cc9a01`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- theme.ts
- react
- server.ts
- supabase/repositories.ts
- mock/repositories.ts
- cursor.ts
- esc
- expo
- package.json
- store.ts
- integration.test.tsx
- env.ts
- admin/certificates.ts
- mock/mapper.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- ui.tsx
- getDb
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
- accountSchema.ts
- edge.ts
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- gate.ts
- vitrinSchema.ts
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- accountApi.ts
- Dosya haritası
- firebase.ts
- data.ts
- devDependencies
- etkinlik/[id].tsx
- (tabs)/index.tsx
- eventSchema.ts
- sync-deps.mjs
- ref_node_fs
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- auth.ts
- make-icons.py
- notifications.tsx
- Load-bearing decisions — the why log
- check-release.mjs
- hermes-safe.test.ts
- Doğrulama ve teklik — plan ve kurulum
- check-bundle.mjs
- QueryProvider.tsx
- README.md
- useFallbackTranslation.ts
- Sponsorlar ve ana sayfa slider'ı — tasarım
- qr.ts
- ref_node_path
- article-summary.test.tsx
- export-registrations.ts
- src/otp.ts
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- deploy-rules.mjs
- tsconfig.json
- announcements.tsx
- useEnrichmentWarmup.test.tsx
- allowScripts
- readingText.ts
- sourceUrl.ts
- session-start.sh
- app/_layout.tsx
- From the 1.1.0 release
- 4. Uygulama
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- 5. Panel
- Firebase
- digest.ts
- notification-sync.test.tsx
- repository

## God Nodes (most connected - your core abstractions)
1. `react` - 57 edges
2. `react-native` - 42 edges
3. `Txt()` - 39 edges
4. `colors` - 37 edges
5. `Load-bearing decisions — the why log` - 37 edges
6. `expo-router` - 32 edges
7. `useContent()` - 31 edges
8. `esc()` - 28 edges
9. `useAppStore()` - 27 edges
10. `gradients` - 27 edges

## Surprising Connections (you probably didn't know these)
- `Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı` --references--> `PhotoUploadError`  [INFERRED]
  AGENTS.md → admin/photos.ts
- `Fazlar` --references--> `storage()`  [INFERRED]
  docs/ai-gundem-port.md → admin/photos.ts
- `6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı` --references--> `attendanceRows()`  [INFERRED]
  docs/guvenlik-testleri-degerlendirmesi.md → admin/qr.ts
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları` --references--> `tohum()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → scripts/check-rules.mjs

## Import Cycles
- None detected.

## Communities (85 total, 3 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (51): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+43 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.04
Nodes (43): makeBelgeNo(), publishCertificates(), decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS (+35 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (41): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+33 more)

### Community 3 - "theme.ts"
Cohesion: 0.12
Nodes (38): styles, styles, styles, styles, styles, BOS, styles, Durum (+30 more)

### Community 4 - "react"
Cohesion: 0.09
Nodes (33): Conventions, styles, ArsivRoute(), styles, styles, Tab, Kurallar ve tuzaklar, Global Constraints (+25 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (38): ACCEPTED_TYPES, bucketName(), deleteEventPhotos(), deletePhotos(), isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage() (+30 more)

### Community 6 - "supabase/repositories.ts"
Cohesion: 0.11
Nodes (29): @supabase/supabase-js, cursorOf(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, ceviriDurumu() (+21 more)

### Community 7 - "mock/repositories.ts"
Cohesion: 0.10
Nodes (25): isAfterCursor(), compareArticles(), cursorOfArticle(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, mockDigest(), paginate(), AddSourceOptions (+17 more)

### Community 8 - "cursor.ts"
Cohesion: 0.21
Nodes (12): base64ToBytes(), bytesToBase64(), decodeCursor(), encodeCursor(), keysetFilter(), utf8Bytes(), utf8FromBytes(), mockSources() (+4 more)

### Community 9 - "esc"
Cohesion: 0.11
Nodes (37): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+29 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (37): author, bugs, url, description, license, main, name, overrides (+29 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "integration.test.tsx"
Cohesion: 0.12
Nodes (15): @tanstack/react-query, @testing-library/react-native, clients, METRICS, mount(), createQueryClient(), clients, KEY (+7 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "admin/certificates.ts"
Cohesion: 0.08
Nodes (30): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+22 more)

### Community 16 - "mock/mapper.ts"
Cohesion: 0.07
Nodes (40): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), FEED_URLS, hoursAgoFromLabel(), isoFromLabel(), MOCK_NOW_ISO (+32 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.19
Nodes (17): NOW, TODAY, delay(), isBudget(), readWarmBudget(), useEnrichmentWarmup(), writeWarmBudget(), emptyBudget() (+9 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (26): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+18 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "ui.tsx"
Cohesion: 0.08
Nodes (31): BildirimAyarlariRoute(), styles, SplashRoute(), styles, OnboardingRoute(), styles, styles, TabBarProps (+23 more)

### Community 22 - "getDb"
Cohesion: 0.21
Nodes (13): firebase, YoklamaHatasi, YoklamaSonucu, yoklamaVarMi(), yoklamaVer(), currentUser(), requestAccountDeletion(), sertifikalarimiGetir() (+5 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.14
Nodes (25): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Bu turda **bilerek** düzeltilmeyenler, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage() (+17 more)

### Community 25 - "accountSchema.ts"
Cohesion: 0.19
Nodes (21): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), SignupRoute(), ageOn(), DateParts, FieldErrors, formatPhone(), isValidSignup() (+13 more)

### Community 26 - "edge.ts"
Cohesion: 0.16
Nodes (26): createMockRepositories(), mockArticles(), createMockDigestRepository(), createMockEnrichmentRepository(), createMockFeedRepository(), createMockSourceRepository(), Repositories, toDataError() (+18 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.08
Nodes (23): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+15 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "gate.ts"
Cohesion: 0.29
Nodes (8): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW

### Community 31 - "vitrinSchema.ts"
Cohesion: 0.21
Nodes (23): Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`, 7. Test ve kontroller, Build, buildSlide(), buildSponsor(), byOrder(), expiredSlideIds() (+15 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (19): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+11 more)

### Community 33 - "kv.ts"
Cohesion: 0.15
Nodes (11): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), resetDeviceIdCache(), kv (+3 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "accountApi.ts"
Cohesion: 0.15
Nodes (20): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+12 more)

### Community 36 - "Dosya haritası"
Cohesion: 0.14
Nodes (14): Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 11: Sponsor ekranları — `/sponsorlar`, `/sponsor/[id]`, Task 12: "Ödülü sağlayan" — `PrizeProviders`, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 1: Ortak şema — `src/vitrinSchema.ts`, Task 3: Panel sıralaması — `admin/ordering.ts` (+6 more)

### Community 37 - "firebase.ts"
Cohesion: 0.24
Nodes (14): Veri: kim neyi okuyor, kim yazıyor, 4.1 Okuma ve durum, Dosyalar, ContentProvider(), fetchContent(), pushRaffleEntry(), pushRegistration(), RegistrationPayload (+6 more)

### Community 38 - "data.ts"
Cohesion: 0.11
Nodes (20): ACCOUNT_DELETE_URL, DEPARTMENTS, DIGEST_HOURS, LEGAL_BASE, NOTIFICATION_CATEGORIES, NotificationCategory, OnboardingPage, REMINDER_OPTIONS (+12 more)

### Community 39 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 40 - "etkinlik/[id].tsx"
Cohesion: 0.09
Nodes (41): Agent setup, keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials(), styles (+33 more)

### Community 41 - "(tabs)/index.tsx"
Cohesion: 0.17
Nodes (11): AnnouncementRoute(), styles, AnnouncementRow(), styles, Announcement, src_announcements_announcement, src_announcements_fetchannouncement, formatAnnouncementDate() (+3 more)

### Community 42 - "eventSchema.ts"
Cohesion: 0.14
Nodes (20): ArchiveCard(), EventFact, buildEvent(), BuildResult, daysInMonth(), EVENT_CATEGORIES, EventInput, MAX_PHOTOS (+12 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "ref_node_fs"
Cohesion: 0.36
Nodes (7): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), ref_node_fs, parsed()

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.20
Nodes (14): RaffleRulesRoute(), styles, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB (+6 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "auth.ts"
Cohesion: 0.18
Nodes (17): LoginRoute(), HesapSilRoute(), Profile, authErrorMessage(), deletionDone(), finishAccountDeletion(), getAuthClient(), loadProfile() (+9 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "notifications.tsx"
Cohesion: 0.16
Nodes (18): expo-constants, expo-device, expo-notifications, ClubEvent, DeviceRecord, applyQuietHours(), DIGEST_CATEGORY, isDigestHour() (+10 more)

### Community 51 - "Load-bearing decisions — the why log"
Cohesion: 0.10
Nodes (20): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About (+12 more)

### Community 52 - "check-release.mjs"
Cohesion: 0.20
Nodes (9): Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root, rulesBlock() (+1 more)

### Community 53 - "hermes-safe.test.ts"
Cohesion: 0.26
Nodes (10): GundemRoute(), isTab(), clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr() (+2 more)

### Community 54 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "QueryProvider.tsx"
Cohesion: 0.20
Nodes (15): Üç ölü parça, üç ayrı ölüm biçimi, @tanstack/query-async-storage-persister, @tanstack/react-query-persist-client, QUERY_KEY_VERSION, EnrichmentResponse, asyncStorageFromKv(), CACHE_BUSTER, capPersistedFeed() (+7 more)

### Community 57 - "README.md"
Cohesion: 0.06
Nodes (30): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules, Arşiv paneli, Bildirimler, Build'e hangi değerler giriyor (+22 more)

### Community 58 - "useFallbackTranslation.ts"
Cohesion: 0.14
Nodes (13): GundemArticleRoute(), PANEL_BASE_URL, bodyFor(), hasSummary(), Segment, segmentState(), useFallbackTranslation(), YedekCeviri (+5 more)

### Community 59 - "Sponsorlar ve ana sayfa slider'ı — tasarım"
Cohesion: 0.15
Nodes (12): 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli (+4 more)

### Community 60 - "qr.ts"
Cohesion: 0.08
Nodes (40): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr() (+32 more)

### Community 61 - "ref_node_path"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_path, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 62 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 63 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 64 - "src/otp.ts"
Cohesion: 0.24
Nodes (13): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), digits(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir() (+5 more)

### Community 65 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.25
Nodes (6): 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 66 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "announcements.tsx"
Cohesion: 0.29
Nodes (9): fetchAnnouncement(), fetchAnnouncements(), getJson(), toAnnouncement(), unwrapList(), AnnouncementsProvider(), AnnouncementsValue, Ctx (+1 more)

### Community 69 - "useEnrichmentWarmup.test.tsx"
Cohesion: 0.20
Nodes (7): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 72 - "sourceUrl.ts"
Cohesion: 0.33
Nodes (7): RFC-3986, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "app/_layout.tsx"
Cohesion: 0.25
Nodes (5): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar

### Community 75 - "From the 1.1.0 release"
Cohesion: 0.18
Nodes (14): inputToForm(), today(), cookieHeader(), Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, From the 1.1.0 release, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti, QR yoklama — kurulurken çıkanlar, Klasörler (+6 more)

### Community 78 - "4. Uygulama"
Cohesion: 0.25
Nodes (8): SatirLink(), Task 13: Hesabım — KULÜP grubu, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi, 4. Uygulama

### Community 79 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.25
Nodes (7): Dağıtım yüzeyleri, Git, İçerik girişi, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar

### Community 80 - "5. Panel"
Cohesion: 0.29
Nodes (7): 5.1 Menü, 5.2 Liste sayfası, 5.3 Formlar, 5.4 Sunucu, 5.5 Süresi dolan slaytları silen zamanlayıcı, 5.6 Görünüm, 5. Panel

### Community 81 - "Firebase"
Cohesion: 0.33
Nodes (6): Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı

### Community 82 - "digest.ts"
Cohesion: 0.33
Nodes (5): DIGEST, DIGEST_DATE, DIGEST_HEADLINE, DIGEST_META, DigestEntry

### Community 83 - "notification-sync.test.tsx"
Cohesion: 0.40
Nodes (4): mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs

### Community 84 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

## Knowledge Gaps
- **607 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+602 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 746 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `theme.ts`, `package.json`, `store.ts`, `integration.test.tsx`, `useEnrichmentWarmup.ts`, `ui.tsx`, `data-access/hooks.ts`, `data.ts`, `etkinlik/[id].tsx`, `(tabs)/index.tsx`, `cekilis-kurallari.tsx`, `auth.ts`, `notifications.tsx`, `QueryProvider.tsx`, `article-summary.test.tsx`, `announcements.tsx`, `useEnrichmentWarmup.test.tsx`, `app/_layout.tsx`, `notification-sync.test.tsx`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `err()` connect `edge.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `supabase/repositories.ts`, `mock/repositories.ts`, `mock/mapper.ts`, `demo-account.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `firebase-admin` connect `admin/certificates.ts` to `push.ts`, `check-panel.ts`, `accountApi.ts`, `server.ts`, `package.json`, `demo-account.ts`, `qr.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _607 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08116883116883117 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04406779661016949 - nodes in this community are weakly interconnected._