# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 215 files · ~284,487 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1920 nodes · 4926 edges · 76 communities (73 shown, 3 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 341 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `99859b38`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- data.ts
- ui.tsx
- server.ts
- supabase/repositories.ts
- mock/repositories.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- QueryProvider.tsx
- env.ts
- certificateDelivery.ts
- types.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- theme.ts
- firebase.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
- accountSchema.ts
- Article
- scripts
- photos.ts
- 2. Fikrin değerlendirmesi — zayıf noktalar
- kayit/[id].tsx
- Txt
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- accountApi.ts
- notifications.tsx
- app/_layout.tsx
- store.tsx
- GundemArticleRoute
- etkinlik/[id].tsx
- react
- eventSchema.ts
- sync-deps.mjs
- ref_node_fs
- react-native-safe-area-context
- html.ts
- check-rules.mjs
- From the 1.1.0 release
- make-icons.py
- ClubEvent
- Load-bearing decisions — the why log
- check-release.mjs
- hermes-safe.test.ts
- Doğrulama ve teklik — plan ve kurulum
- check-bundle.mjs
- export-registrations.ts
- README.md
- useFallbackTranslation.ts
- qr.ts
- ref_node_path
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- qrSchema.ts
- tsconfig.json
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- allowScripts
- readingText.ts
- parseSourceUrl
- session-start.sh
- QrRoute
- article-summary.test.tsx
- announcements.tsx
- integration.test.tsx
- repository

## God Nodes (most connected - your core abstractions)
1. `react` - 57 edges
2. `react-native` - 42 edges
3. `Txt()` - 39 edges
4. `colors` - 37 edges
5. `Load-bearing decisions — the why log` - 37 edges
6. `esc()` - 34 edges
7. `expo-router` - 32 edges
8. `useContent()` - 31 edges
9. `Dosya haritası` - 30 edges
10. `page()` - 27 edges

## Surprising Connections (you probably didn't know these)
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`` --references--> `VitrinRow`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/vitrinView.ts
- `Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`` --references--> `ChoiceRow`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/vitrinView.ts
- `Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları` --references--> `tohum()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → scripts/check-rules.mjs
- `2. Doğrulama neden Firebase'in bağlantısı değil` --references--> `refreshVerification()`  [INFERRED]
  docs/dogrulama-ve-teklik-plani.md → src/auth.ts

## Import Cycles
- None detected.

## Communities (76 total, 3 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (52): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+44 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (44): makeBelgeNo(), publishCertificates(), decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS (+36 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (43): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+35 more)

### Community 3 - "data.ts"
Cohesion: 0.09
Nodes (24): BOS, SignupRoute(), styles, CertificatesRoute(), styles, HesapRoute(), formatPhone(), src_auth_user (+16 more)

### Community 4 - "ui.tsx"
Cohesion: 0.09
Nodes (44): styles, styles, styles, ArsivRoute(), styles, styles, Tab, 4.3 `/sponsorlar` (`app/sponsorlar.tsx`) (+36 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (28): parsePort(), resolvePort(), registeredNotPresent(), app, attempts, authed(), db, formDateTime() (+20 more)

### Community 6 - "supabase/repositories.ts"
Cohesion: 0.09
Nodes (44): @supabase/supabase-js, FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError(), toNetworkError() (+36 more)

### Community 7 - "mock/repositories.ts"
Cohesion: 0.11
Nodes (27): createMockRepositories(), compareArticles(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, mockArticles(), mockDigest(), NO_CONTENT_ARTICLE, createMockDigestRepository() (+19 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.08
Nodes (38): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), keysetFilter(), utf8Bytes() (+30 more)

### Community 9 - "esc"
Cohesion: 0.08
Nodes (51): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+43 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (37): author, bugs, url, description, license, main, name, overrides (+29 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "QueryProvider.tsx"
Cohesion: 0.11
Nodes (25): Üç ölü parça, üç ayrı ölüm biçimi, @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, clients, METRICS, mount(), FeedFilter (+17 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "certificateDelivery.ts"
Cohesion: 0.13
Nodes (20): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+12 more)

### Community 16 - "types.ts"
Cohesion: 0.14
Nodes (22): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), Repositories, createUnconfiguredRepositories(), DataErrorCode, DataErrorException (+14 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.14
Nodes (22): clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW, TODAY, delay() (+14 more)

### Community 19 - "pdf.ts"
Cohesion: 0.12
Nodes (23): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+15 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "theme.ts"
Cohesion: 0.10
Nodes (25): SplashRoute(), styles, RegistrationDoneRoute(), styles, styles, styles, styles, TabBarProps (+17 more)

### Community 22 - "firebase.ts"
Cohesion: 0.06
Nodes (83): moveBy(), placeAt(), sameMembers(), HesapSilRoute(), Veri: kim neyi okuyor, kim yazıyor, Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı (+75 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.11
Nodes (30): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Bu turda **bilerek** düzeltilmeyenler, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage() (+22 more)

### Community 25 - "accountSchema.ts"
Cohesion: 0.11
Nodes (33): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, VerifyRoute(), DateFields(), ResetPasswordRoute(), OgrenciNo(), ageOn(), DateParts, digits() (+25 more)

### Community 26 - "Article"
Cohesion: 0.21
Nodes (8): DigestRepositoryV1, EnrichmentRepositoryV1, FeedRepositoryV1, SourceRepositoryV1, Result, Article, ArticleId, Source

### Community 27 - "scripts"
Cohesion: 0.04
Nodes (49): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+41 more)

### Community 28 - "photos.ts"
Cohesion: 0.06
Nodes (43): ACCEPTED_TYPES, bucketName(), deleteEventPhotos(), deleteFolder(), deletePhotos(), FOLDERS, isBucketMissing(), keyProblem() (+35 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "kayit/[id].tsx"
Cohesion: 0.17
Nodes (18): styles, LoginRoute(), styles, styles, styles, styles, authErrorMessage(), Consent() (+10 more)

### Community 31 - "Txt"
Cohesion: 0.24
Nodes (10): Conventions, Durum, styles, Kurallar ve tuzaklar, Global Constraints, PhotoGallery(), styles, PixelTxt() (+2 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (20): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+12 more)

### Community 33 - "kv.ts"
Cohesion: 0.14
Nodes (14): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+6 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "accountApi.ts"
Cohesion: 0.16
Nodes (19): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+11 more)

### Community 36 - "notifications.tsx"
Cohesion: 0.24
Nodes (10): Bildirim gelmedi, nereye bakılır, expo-constants, expo-device, expo-notifications, DeviceRecord, ensureAndroidChannel(), NotificationSync(), requestPushToken() (+2 more)

### Community 37 - "app/_layout.tsx"
Cohesion: 0.20
Nodes (8): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar, FIREBASE_SETUP_HINT, firebaseConfig, isFirebaseConfigured

### Community 38 - "store.tsx"
Cohesion: 0.17
Nodes (14): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState (+6 more)

### Community 39 - "GundemArticleRoute"
Cohesion: 0.33
Nodes (5): GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState()

### Community 40 - "etkinlik/[id].tsx"
Cohesion: 0.15
Nodes (22): Agent setup, BildirimAyarlariRoute(), keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials() (+14 more)

### Community 41 - "react"
Cohesion: 0.11
Nodes (22): AnnouncementRoute(), styles, HomeRoute(), styles, GridView(), ListView(), styles, TakvimRoute() (+14 more)

### Community 42 - "eventSchema.ts"
Cohesion: 0.14
Nodes (22): ArchiveCard(), EventFact, buildEvent(), BuildResult, daysInMonth(), EVENT_CATEGORIES, EventInput, MAX_PHOTOS (+14 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "ref_node_fs"
Cohesion: 0.36
Nodes (7): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), ref_node_fs, parsed()

### Community 45 - "react-native-safe-area-context"
Cohesion: 0.19
Nodes (15): RaffleRulesRoute(), styles, react-native-safe-area-context, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE (+7 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "From the 1.1.0 release"
Cohesion: 0.16
Nodes (14): inputToForm(), today(), cookieHeader(), From the 1.1.0 release, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti, QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, QR yoklama — kurulurken çıkanlar, Klasörler (+6 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "ClubEvent"
Cohesion: 0.26
Nodes (9): ClubEvent, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), REMINDER_CATEGORY, reminderOffsetMs() (+1 more)

### Community 51 - "Load-bearing decisions — the why log"
Cohesion: 0.14
Nodes (14): Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, İşi telefon yaratıyordu, sunucu değil — ve bu defterdeki bir satır yanlıştı, Load-bearing decisions — the why log (+6 more)

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
Cohesion: 0.12
Nodes (19): ref_node_child_process, ref_node_url, argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN (+11 more)

### Community 56 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 57 - "README.md"
Cohesion: 0.06
Nodes (30): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules, Arşiv paneli, Bildirimler, Build'e hangi değerler giriyor (+22 more)

### Community 58 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 60 - "qr.ts"
Cohesion: 0.12
Nodes (23): BELGE_NO_UZUNLUK, BulunanSertifika, findCertificate(), revokeCertificate(), SertifikaKaydi, YayinGirdisi, YayinSonucu, ATTENDANCE_COLLECTION (+15 more)

### Community 61 - "ref_node_path"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_path, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 65 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.29
Nodes (5): 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 66 - "qrSchema.ts"
Cohesion: 0.23
Nodes (11): joinLocal(), LOCAL_OFFSET, defaultWindow(), isEventId(), isQrToken(), pad(), parseQrPayload(), QR_ACILIS_SAAT (+3 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 69 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.25
Nodes (7): Dağıtım yüzeyleri, Git, İçerik girişi, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "readingText.ts"
Cohesion: 0.26
Nodes (9): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, Sekiz piksellik bir glif yolu okunarak değerlendirilemez, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody(), rowRuns() (+1 more)

### Community 72 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "QrRoute"
Cohesion: 0.26
Nodes (9): QrRoute(), @react-native-async-storage/async-storage, yoklamaMesaji(), bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), QrOkuma, taramaKarari (+1 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 78 - "announcements.tsx"
Cohesion: 0.06
Nodes (36): SatirLink(), AnnouncementRow(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme (+28 more)

### Community 83 - "integration.test.tsx"
Cohesion: 0.13
Nodes (10): @testing-library/react-native, clients, fakePostgrest(), Filters, parseKeyset(), wrapper(), mockGetExpoPushToken, mockUpsertDevice (+2 more)

### Community 84 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

## Knowledge Gaps
- **610 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+605 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 749 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `data.ts`, `ui.tsx`, `mock/repositories.ts`, `package.json`, `store.ts`, `QueryProvider.tsx`, `useEnrichmentWarmup.ts`, `theme.ts`, `data-access/hooks.ts`, `kayit/[id].tsx`, `Txt`, `notifications.tsx`, `app/_layout.tsx`, `store.tsx`, `etkinlik/[id].tsx`, `react-native-safe-area-context`, `article-summary.test.tsx`, `announcements.tsx`, `integration.test.tsx`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `mock/repositories.ts`, `types.ts`, `demo-account.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `firebase-admin` connect `qr.ts` to `push.ts`, `check-panel.ts`, `accountApi.ts`, `server.ts`, `package.json`, `certificateDelivery.ts`, `demo-account.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _610 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07894736842105263 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04519774011299435 - nodes in this community are weakly interconnected._