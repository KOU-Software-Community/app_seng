# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 214 files · ~282,439 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1902 nodes · 4870 edges · 84 communities (79 shown, 5 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 332 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8680bf6b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- session.ts
- hesap.tsx
- ui.tsx
- server.ts
- article-summary.test.tsx
- enrichment-unavailable.test.tsx
- mock/mapper.ts
- esc
- expo
- package.json
- FeedView.tsx
- feed-screen.test.tsx
- env.ts
- admin/certificates.ts
- supabase/repositories.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- claims.ts
- Pixel.tsx
- qr.tsx
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
- accountSchema.ts
- data-access/index.ts
- scripts
- photos.ts
- 2. Fikrin değerlendirmesi — zayıf noktalar
- check-security.ts
- vitrinSchema.ts
- raffleSchema.ts
- edge.ts
- check-event-schema.ts
- accountApi.ts
- Dosya haritası
- app/_layout.tsx
- store.tsx
- devDependencies
- data.ts
- announcements.tsx
- eventSchema.ts
- sync-deps.mjs
- credentials.ts
- etkinlik/[id].tsx
- html.ts
- check-rules.mjs
- firebase.ts
- make-icons.py
- notifications.tsx
- Load-bearing decisions — the why log
- check-release.mjs
- clubCalendar
- Doğrulama ve teklik — plan ve kurulum
- check-bundle.mjs
- QueryProvider.tsx
- README.md
- useFallbackTranslation.ts
- 3. Veri modeli
- qr.ts
- ref_node_fs
- mail.ts
- export-registrations.ts
- useEnrichmentWarmup.test.tsx
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- notificationsView.ts
- tsconfig.json
- ref_node_path
- EventDetailRoute
- allowScripts
- readingText.ts
- session-start.sh
- qrSchema.ts
- 4. Uygulama
- From the 1.1.0 release
- types.ts
- Firebase
- integration.test.tsx
- repository
- bugs
- overrides

## God Nodes (most connected - your core abstractions)
1. `react` - 57 edges
2. `react-native` - 42 edges
3. `Txt()` - 39 edges
4. `colors` - 37 edges
5. `Load-bearing decisions — the why log` - 37 edges
6. `expo-router` - 32 edges
7. `useContent()` - 31 edges
8. `Dosya haritası` - 29 edges
9. `esc()` - 28 edges
10. `useAppStore()` - 27 edges

## Surprising Connections (you probably didn't know these)
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları` --references--> `tohum()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → scripts/check-rules.mjs
- `5.3 Formlar` --references--> `fetchAnnouncements()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → src/announcementApi.ts
- `2. Doğrulama neden Firebase'in bağlantısı değil` --references--> `refreshVerification()`  [INFERRED]
  docs/dogrulama-ve-teklik-plani.md → src/auth.ts
- `Herkese açık bir deponun kimliği — LICENSE, README ve About` --references--> `ContentNotice()`  [INFERRED]
  AGENTS.md → src/components/ui.tsx

## Import Cycles
- None detected.

## Communities (84 total, 5 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.06
Nodes (62): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+54 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (23): archive, b64, decision, escaped, escapedList, fresh, json, limiter (+15 more)

### Community 2 - "session.ts"
Cohesion: 0.07
Nodes (38): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, clientIp() (+30 more)

### Community 3 - "hesap.tsx"
Cohesion: 0.09
Nodes (47): styles, VerifyRoute(), LoginRoute(), styles, HesapSilRoute(), styles, BOS, SignupRoute() (+39 more)

### Community 4 - "ui.tsx"
Cohesion: 0.08
Nodes (58): Conventions, BildirimAyarlariRoute(), styles, styles, styles, styles, styles, styles (+50 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (27): parsePort(), resolvePort(), app, attempts, authed(), db, formDateTime(), formToInput() (+19 more)

### Community 6 - "article-summary.test.tsx"
Cohesion: 0.10
Nodes (31): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+23 more)

### Community 7 - "enrichment-unavailable.test.tsx"
Cohesion: 0.14
Nodes (19): RFC-3986, createMockRepositories(), mockArticles(), NO_CONTENT_ARTICLE, createMockDigestRepository(), createMockEnrichmentRepository(), createMockFeedRepository(), createMockSourceRepository() (+11 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.07
Nodes (41): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+33 more)

### Community 9 - "esc"
Cohesion: 0.15
Nodes (28): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), QrTanimi (+20 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.06
Nodes (33): author, description, license, main, name, private, version, expo (+25 more)

### Community 12 - "FeedView.tsx"
Cohesion: 0.08
Nodes (55): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), Bu turda **bilerek** düzeltilmeyenler, asDataError(), useFeed(), GateCandidate, GateResult (+47 more)

### Community 13 - "feed-screen.test.tsx"
Cohesion: 0.15
Nodes (13): GundemRoute(), isTab(), @tanstack/react-query, clients, METRICS, mount(), createQueryClient(), clients (+5 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "admin/certificates.ts"
Cohesion: 0.11
Nodes (23): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, BELGE_NO_UZUNLUK, belgeTarihi(), BulunanSertifika, findCertificate() (+15 more)

### Community 16 - "supabase/repositories.ts"
Cohesion: 0.14
Nodes (22): src_gundem_data_access_mock_mapper_isaftercursor, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1, EnrichmentRepository, EnrichmentRepositoryV1, FeedRepository (+14 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.17
Nodes (18): mount(), NOW, TODAY, delay(), isBudget(), readWarmBudget(), useEnrichmentWarmup(), writeWarmBudget() (+10 more)

### Community 19 - "pdf.ts"
Cohesion: 0.13
Nodes (22): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+14 more)

### Community 20 - "claims.ts"
Cohesion: 0.14
Nodes (19): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+11 more)

### Community 21 - "Pixel.tsx"
Cohesion: 0.10
Nodes (22): SplashRoute(), styles, styles, OnboardingRoute(), styles, styles, TabBarProps, TABS (+14 more)

### Community 22 - "qr.tsx"
Cohesion: 0.15
Nodes (19): Durum, styles, CertificatesRoute(), styles, firebase, YoklamaHatasi, yoklamaMesaji(), YoklamaSonucu (+11 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.27
Nodes (15): DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage(), retryPolicy(), unwrap(), useArticle() (+7 more)

### Community 25 - "accountSchema.ts"
Cohesion: 0.15
Nodes (26): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), arg(), Girdi, girdiOku(), has(), loadServiceAccount(), main() (+18 more)

### Community 26 - "data-access/index.ts"
Cohesion: 0.22
Nodes (11): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), Repositories, REPOSITORY_CONTRACT_VERSION, createUnconfiguredRepositories(), DataErrorCode (+3 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "photos.ts"
Cohesion: 0.07
Nodes (39): ACCEPTED_TYPES, bucketName(), deleteEventPhotos(), deletePhotos(), isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage() (+31 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "check-security.ts"
Cohesion: 0.16
Nodes (6): AuthLike, esc(), RENK, sertifikaMaili(), SertifikaPostasi, Rota

### Community 31 - "vitrinSchema.ts"
Cohesion: 0.22
Nodes (20): 5.4 Sunucu, 7. Test ve kontroller, Build, buildSlide(), buildSponsor(), expiredSlideIds(), https(), idList() (+12 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.09
Nodes (24): keyboardFor(), placeholderFor(), RaffleEntryRoute(), bad, base, FIELDS, NOW, picked (+16 more)

### Community 33 - "edge.ts"
Cohesion: 0.11
Nodes (18): expo-crypto, CODE_MAP, EDGE_TIMEOUT_MS, EdgeCallOptions, EdgeConfig, EdgeErrorEnvelope, isEnvelope(), Captured (+10 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (19): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+11 more)

### Community 35 - "accountApi.ts"
Cohesion: 0.09
Nodes (35): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+27 more)

### Community 36 - "Dosya haritası"
Cohesion: 0.24
Nodes (11): moveBy(), placeAt(), sameMembers(), Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 1: Ortak şema — `src/vitrinSchema.ts` (+3 more)

### Community 37 - "app/_layout.tsx"
Cohesion: 0.25
Nodes (5): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar

### Community 38 - "store.tsx"
Cohesion: 0.17
Nodes (14): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState (+6 more)

### Community 39 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 40 - "data.ts"
Cohesion: 0.06
Nodes (43): styles, RegistrationDoneRoute(), RegistrationRoute(), styles, HesapRoute(), HomeRoute(), styles, EventRow() (+35 more)

### Community 41 - "announcements.tsx"
Cohesion: 0.21
Nodes (13): AnnouncementRoute(), AnnouncementRow(), fetchAnnouncement(), fetchAnnouncements(), getJson(), toAnnouncement(), unwrapList(), AnnouncementsProvider() (+5 more)

### Community 42 - "eventSchema.ts"
Cohesion: 0.14
Nodes (21): ArchiveCard(), ArsivRoute(), EventFact, buildEvent(), BuildResult, daysInMonth(), EVENT_CATEGORIES, EventInput (+13 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "credentials.ts"
Cohesion: 0.43
Nodes (6): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), parsed()

### Community 45 - "etkinlik/[id].tsx"
Cohesion: 0.15
Nodes (19): RaffleRulesRoute(), styles, styles, react-native-safe-area-context, PhotoGallery(), styles, RaffleNotice(), styles (+11 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "firebase.ts"
Cohesion: 0.19
Nodes (23): Veri: kim neyi okuyor, kim yazıyor, Task 12: "Ödülü sağlayan" — `PrizeProviders`, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, 4.1 Okuma ve durum, Dosyalar, fetchContent(), fetchSlides() (+15 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "notifications.tsx"
Cohesion: 0.17
Nodes (15): expo-constants, expo-device, expo-notifications, ClubEvent, DeviceRecord, applyQuietHours(), DIGEST_CATEGORY, isDigestHour() (+7 more)

### Community 51 - "Load-bearing decisions — the why log"
Cohesion: 0.15
Nodes (13): Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti, İşi telefon yaratıyordu, sunucu değil — ve bu defterdeki bir satır yanlıştı, Load-bearing decisions — the why log (+5 more)

### Community 52 - "check-release.mjs"
Cohesion: 0.18
Nodes (10): Faz 1 — kimlik altyapısı, UI yok, ref_node_url, failed, json(), pkg, read(), results, root (+2 more)

### Community 53 - "clubCalendar"
Cohesion: 0.36
Nodes (7): clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW

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
Nodes (31): Agent setup, Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules, Arşiv paneli, Bildirimler (+23 more)

### Community 58 - "useFallbackTranslation.ts"
Cohesion: 0.27
Nodes (6): useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 59 - "3. Veri modeli"
Cohesion: 0.33
Nodes (6): 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli

### Community 60 - "qr.ts"
Cohesion: 0.14
Nodes (23): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr() (+15 more)

### Community 61 - "ref_node_fs"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_fs, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 62 - "mail.ts"
Cohesion: 0.17
Nodes (12): initMail(), Mail, MailConfig, MailEki, MailEnv, mailFrom(), MailResult, readMailConfig() (+4 more)

### Community 63 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 64 - "useEnrichmentWarmup.test.tsx"
Cohesion: 0.20
Nodes (7): FeedFilter, queryKeys, clients, mockRequestEnrichment, QUEUED, READY, memoryStore

### Community 65 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.29
Nodes (5): 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 66 - "notificationsView.ts"
Cohesion: 0.29
Nodes (9): ceviriSatiri(), DeviceSummary, LogRow, MailStatus, notificationsPage(), num(), PendingRow, when() (+1 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "ref_node_path"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_path, cli, projectId, result, root

### Community 69 - "EventDetailRoute"
Cohesion: 0.50
Nodes (5): EventDetailRoute(), initials(), isFull(), seatsLabel(), seatsLeft()

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "readingText.ts"
Cohesion: 0.26
Nodes (9): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, Sekiz piksellik bir glif yolu okunarak değerlendirilemez, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody(), rowRuns() (+1 more)

### Community 74 - "qrSchema.ts"
Cohesion: 0.16
Nodes (17): QrRoute(), @react-native-async-storage/async-storage, LOCAL_OFFSET, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId(), isQrToken() (+9 more)

### Community 78 - "4. Uygulama"
Cohesion: 0.10
Nodes (20): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler (+12 more)

### Community 79 - "From the 1.1.0 release"
Cohesion: 0.28
Nodes (9): today(), cookieHeader(), From the 1.1.0 release, QR yoklama — kurulurken çıkanlar, ContentProvider(), isPast(), splitByDate(), todayLocal() (+1 more)

### Community 80 - "types.ts"
Cohesion: 0.10
Nodes (30): GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), ceviriDurumu(), DigestArticleFacts, DigestItemRow (+22 more)

### Community 81 - "Firebase"
Cohesion: 0.25
Nodes (8): Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı, ensureAndroidChannel(), requestPushToken()

### Community 83 - "integration.test.tsx"
Cohesion: 0.14
Nodes (9): @testing-library/react-native, clients, fakePostgrest(), Filters, parseKeyset(), mockGetExpoPushToken, mockUpsertDevice, { NotificationSync } (+1 more)

### Community 84 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

## Knowledge Gaps
- **606 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+601 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 745 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `ui.tsx` to `hesap.tsx`, `article-summary.test.tsx`, `enrichment-unavailable.test.tsx`, `package.json`, `FeedView.tsx`, `feed-screen.test.tsx`, `useEnrichmentWarmup.ts`, `Pixel.tsx`, `qr.tsx`, `data-access/hooks.ts`, `app/_layout.tsx`, `store.tsx`, `data.ts`, `announcements.tsx`, `etkinlik/[id].tsx`, `notifications.tsx`, `QueryProvider.tsx`, `useEnrichmentWarmup.test.tsx`, `integration.test.tsx`?**
  _High betweenness centrality (0.106) - this node is a cross-community bridge._
- **Why does `err()` connect `article-summary.test.tsx` to `push.ts`, `check-panel.ts`, `edge.ts`, `server.ts`, `enrichment-unavailable.test.tsx`, `supabase/repositories.ts`, `accountSchema.ts`, `data-access/index.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `firebase-admin` connect `admin/certificates.ts` to `push.ts`, `check-panel.ts`, `accountApi.ts`, `server.ts`, `package.json`, `claims.ts`, `accountSchema.ts`, `qr.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _606 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.061457418788410885 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05263157894736842 - nodes in this community are weakly interconnected._