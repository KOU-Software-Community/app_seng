# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 249 files · ~306,950 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2118 nodes · 5669 edges · 90 communities (88 shown, 2 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 477 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `05136a25`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- data.ts
- takvim.tsx
- server.ts
- notificationPlan.ts
- data-access/hooks.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- data-access/index.ts
- env.ts
- supabase/repositories.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- Pixel.tsx
- useFallbackTranslation.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- supabase-repositories.test.ts
- auth.ts
- Load-bearing decisions — the why log
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- check-release.mjs
- integration.test.tsx
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- devDependencies
- types.ts
- clubCalendar
- eventSchema.ts
- article-summary.test.tsx
- export-registrations.ts
- ui.tsx
- photos.ts
- sync-deps.mjs
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- raffle-legal.test.tsx
- html.ts
- check-rules.mjs
- sponsors.tsx
- make-icons.py
- accountApi.ts
- Txt
- ZoomableImage.tsx
- photo-hero.test.tsx
- qr.ts
- check-bundle.mjs
- ref_node_fs
- README.md
- Galeri, yenileme göstergesi, karşılama — tasarım
- announcements.tsx
- @testing-library/react-native
- photo-viewer.test.tsx
- repository
- admin/certificates.ts
- credentials.ts
- readingText.ts
- EventDetailRoute
- tsconfig.json
- Review Focus
- allowScripts
- parseSourceUrl
- session-start.sh
- react
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- firebase.ts
- vitrinSchema.ts
- kayit-ol.tsx
- mail.ts
- notificationsView.ts
- FeedView.tsx
- 4. Uygulama
- Galeri, yenileme göstergesi, karşılama — uygulama planı
- notifications.tsx
- icons.test.ts
- KOÜ Yazılım Kulübü — agent notes
- ref_node_path
- Mağazaya çıkarma
- (tabs)/index.tsx
- Yönetim paneli

## God Nodes (most connected - your core abstractions)
1. `react` - 83 edges
2. `react-native` - 53 edges
3. `Txt()` - 46 edges
4. `colors` - 44 edges
5. `Load-bearing decisions — the why log` - 38 edges
6. `esc()` - 37 edges
7. `expo-router` - 37 edges
8. `Dosya haritası` - 36 edges
9. `react-native-safe-area-context` - 35 edges
10. `useContent()` - 34 edges

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

## Communities (90 total, 2 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (51): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+43 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.06
Nodes (36): QR yoklama — kurulurken çıkanlar, archive, b64, cagir(), claimDb(), claimDb2(), Data, decision (+28 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (42): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+34 more)

### Community 3 - "data.ts"
Cohesion: 0.06
Nodes (44): Agent setup, Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, SplashRoute(), styles (+36 more)

### Community 4 - "takvim.tsx"
Cohesion: 0.09
Nodes (43): styles, SponsorRoute(), styles, SponsorsRoute(), styles, ArsivRoute(), styles, HomeRoute() (+35 more)

### Community 5 - "server.ts"
Cohesion: 0.08
Nodes (20): parsePort(), resolvePort(), app, attempts, db, formDateTime(), formToInput(), keptPhotos() (+12 more)

### Community 6 - "notificationPlan.ts"
Cohesion: 0.20
Nodes (12): DIGEST_HOURS, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), QUIET_END_HOUR, QUIET_START_HOUR (+4 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.11
Nodes (27): Bu turda **bilerek** düzeltilmeyenler, P9 — grafiğe dayalı temizlik turu (2026-09-02), asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage() (+19 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.07
Nodes (44): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+36 more)

### Community 9 - "esc"
Cohesion: 0.20
Nodes (22): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), photoUpload() (+14 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (39): author, bugs, url, description, license, main, name, overrides (+31 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "data-access/index.ts"
Cohesion: 0.14
Nodes (25): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), createMockRepositories(), createMockDigestRepository(), createMockEnrichmentRepository(), createMockFeedRepository() (+17 more)

### Community 14 - "env.ts"
Cohesion: 0.05
Nodes (42): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, Task 1: Adla karşılama, 1. Kare yükleme animasyonu, 2. Kalıcı takvim, 3. Galeriyi soluk alana dokunarak kapatma, 4. Test, 5. Dağıtım yüzeyleri, Kalıcı takvim, kare yükleme animasyonu, galeriyi dokunarak kapatma — tasarım (+34 more)

### Community 15 - "supabase/repositories.ts"
Cohesion: 0.14
Nodes (22): src_gundem_data_access_mock_mapper_isaftercursor, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1, EnrichmentRepository, EnrichmentRepositoryV1, FeedRepository (+14 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.14
Nodes (35): moveBy(), placeAt(), sameMembers(), deleteFolder(), deletePhotos(), announcementChoices(), eventChoices(), Kind (+27 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+27 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.13
Nodes (23): clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW, TODAY, delay() (+15 more)

### Community 19 - "pdf.ts"
Cohesion: 0.13
Nodes (22): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+14 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "Pixel.tsx"
Cohesion: 0.10
Nodes (19): OnboardingRoute(), styles, HesapRoute(), styles, styles, TabBarProps, TABS, PixelArt() (+11 more)

### Community 22 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "supabase-repositories.test.ts"
Cohesion: 0.13
Nodes (21): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+13 more)

### Community 25 - "auth.ts"
Cohesion: 0.05
Nodes (66): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, VerifyRoute(), HesapSilRoute(), DateFields(), SignupRoute(), ResetPasswordRoute(), OgrenciNo(), 1. Ne zorlanıyor, ne zorlanmıyor (+58 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.11
Nodes (19): Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti (+11 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (22): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+14 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (25): requireAuth(), 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i (+17 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.16
Nodes (11): Güvenlik taraması — sekiz sessiz delik ve kapatılmayan ikisi, Faz 1 — kimlik altyapısı, UI yok, ref_node_url, failed, json(), pkg, read(), results (+3 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.13
Nodes (18): @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, QUERY_KEY_VERSION, asyncStorageFromKv(), CACHE_BUSTER, capPersistedFeed(), MAX_CACHE_AGE_MS (+10 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (21): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+13 more)

### Community 33 - "kv.ts"
Cohesion: 0.11
Nodes (16): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+8 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.08
Nodes (21): inputToForm(), broken, built, capped, dayBefore, EV1, EV1_INPUT, later (+13 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "types.ts"
Cohesion: 0.10
Nodes (29): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), ceviriDurumu(), DigestArticleFacts (+21 more)

### Community 37 - "clubCalendar"
Cohesion: 0.36
Nodes (7): clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW

### Community 38 - "eventSchema.ts"
Cohesion: 0.14
Nodes (22): ArchiveCard(), Global Constraints, EventFact, buildEvent(), BuildResult, daysInMonth(), EventInput, LOCAL_OFFSET (+14 more)

### Community 39 - "article-summary.test.tsx"
Cohesion: 0.16
Nodes (15): mount(), createQueryClient(), QueryProvider(), clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv() (+7 more)

### Community 40 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "ui.tsx"
Cohesion: 0.12
Nodes (18): BildirimAyarlariRoute(), styles, expo-linear-gradient, KICKER, styles, styles, emptyStyles, IconTile() (+10 more)

### Community 42 - "photos.ts"
Cohesion: 0.16
Nodes (18): ACCEPTED_TYPES, bucketName(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage(), pathFromUrl() (+10 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.25
Nodes (6): 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 45 - "raffle-legal.test.tsx"
Cohesion: 0.22
Nodes (11): RaffleRulesRoute(), APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB, RAFFLE_CONTACT_EMAIL, RAFFLE_ORGANIZER, RuleSection (+3 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "sponsors.tsx"
Cohesion: 0.06
Nodes (55): Klasörler, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, 2. Kaynak metinden ayrıldığımız yerler, Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 1: `src/vitrinCache.ts` (+47 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.09
Nodes (34): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+26 more)

### Community 51 - "Txt"
Cohesion: 0.23
Nodes (11): Conventions, Durum, styles, styles, Kurallar ve tuzaklar, Global Constraints, Global Constraints, GroupLabel() (+3 more)

### Community 52 - "ZoomableImage.tsx"
Cohesion: 0.21
Nodes (10): Task 3: Yakınlaştırılabilir görsel, Task 4: Tam ekran görüntüleyici, react-native-gesture-handler, react-native-reanimated, react-native-worklets, clampOffset(), DOUBLE_TAP_SCALE, MAX_SCALE (+2 more)

### Community 53 - "photo-hero.test.tsx"
Cohesion: 0.19
Nodes (6): METRICS, mockEvent, METRICS, PHOTOS, SLIDE_INTERVAL_MS, useAutoAdvance()

### Community 54 - "qr.ts"
Cohesion: 0.05
Nodes (61): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, QrTanimi (+53 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "ref_node_fs"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_fs, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 57 - "README.md"
Cohesion: 0.12
Nodes (15): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Görseller, Katkı, Kurulum, Lisans (+7 more)

### Community 58 - "Galeri, yenileme göstergesi, karşılama — tasarım"
Cohesion: 0.29
Nodes (6): 2. Yenileme göstergesi, 3. Karşılama, 4. iOS'ta giriş yapmadan arşiv — değerlendirme, 6. Dağıtım yüzeyleri, 7. Reddedilenler, Galeri, yenileme göstergesi, karşılama — tasarım

### Community 59 - "announcements.tsx"
Cohesion: 0.23
Nodes (9): 3.3 Ayrıştırma ve doğrulama, fetchAnnouncement(), getJson(), toAnnouncement(), unwrapList(), AnnouncementsProvider(), AnnouncementsValue, Ctx (+1 more)

### Community 60 - "@testing-library/react-native"
Cohesion: 0.25
Nodes (3): @testing-library/react-native, fits(), HostNode

### Community 61 - "photo-viewer.test.tsx"
Cohesion: 0.40
Nodes (3): METRICS, PHOTOS, { width }

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "admin/certificates.ts"
Cohesion: 0.10
Nodes (27): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+19 more)

### Community 64 - "credentials.ts"
Cohesion: 0.43
Nodes (6): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), parsed()

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "EventDetailRoute"
Cohesion: 0.50
Nodes (5): EventDetailRoute(), initials(), isFull(), seatsLabel(), seatsLeft()

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "Review Focus"
Cohesion: 0.29
Nodes (6): Kalıcı takvim, kare yükleme animasyonu, galeriyi dokunarak kapatma — uygulama planı, Review Focus, Task 1: Kare yükleme animasyonu, Task 2: Takvimin saf hesabı, Task 3: `MonthCalendar`, Task 6: Kapanış

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 72 - "parseSourceUrl"
Cohesion: 0.36
Nodes (7): RFC-3986, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "react"
Cohesion: 0.15
Nodes (21): styles, styles, expo-image, react, react-native, styles, Props, styles (+13 more)

### Community 75 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.25
Nodes (7): Dağıtım yüzeyleri, Git, İçerik girişi, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar

### Community 77 - "firebase.ts"
Cohesion: 0.18
Nodes (26): From the 1.1.0 release, Veri: kim neyi okuyor, kim yazıyor, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, 4.1 Okuma ve durum, Bildirimler nereden çıkıyor, Dosyalar, EAS derlemelerinde, Firebase (+18 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.09
Nodes (32): Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 1: Ortak şema — `src/vitrinSchema.ts`, Task 3: Panel sıralaması — `admin/ordering.ts`, Task 5: Panel görünümü — `admin/vitrinView.ts`, menü, CSS, Task 7: Tema, `PhotoSlot`, iletişim adresi (+24 more)

### Community 79 - "kayit-ol.tsx"
Cohesion: 0.11
Nodes (26): styles, styles, LoginRoute(), styles, styles, BOS, styles, styles (+18 more)

### Community 80 - "mail.ts"
Cohesion: 0.22
Nodes (9): initMail(), Mail, MailConfig, MailEki, MailEnv, mailFrom(), MailResult, readMailConfig() (+1 more)

### Community 81 - "notificationsView.ts"
Cohesion: 0.29
Nodes (9): ceviriSatiri(), DeviceSummary, LogRow, MailStatus, notificationsPage(), num(), PendingRow, when() (+1 more)

### Community 82 - "FeedView.tsx"
Cohesion: 0.17
Nodes (13): GundemRoute(), isTab(), styles, Tab, FilterChip(), clients, METRICS, CATEGORIES (+5 more)

### Community 83 - "4. Uygulama"
Cohesion: 0.11
Nodes (18): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli (+10 more)

### Community 84 - "Galeri, yenileme göstergesi, karşılama — uygulama planı"
Cohesion: 0.21
Nodes (13): Galeri, yenileme göstergesi, karşılama — uygulama planı, Review Focus, Task 5: Otomatik kaydırma ortak hook'a, Task 6: Hero slider ve etkinlik detayı, Task 7: Kapanış, 1. Galeri, 5. Test, Task 5: Soluk alana dokununca kapatma (+5 more)

### Community 87 - "notifications.tsx"
Cohesion: 0.15
Nodes (12): Bildirim gelmedi, nereye bakılır, expo-constants, expo-device, expo-notifications, DeviceRecord, ensureAndroidChannel(), lazyUpsertDevice(), requestPushToken() (+4 more)

### Community 91 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 95 - "KOÜ Yazılım Kulübü — agent notes"
Cohesion: 0.33
Nodes (5): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules

### Community 96 - "ref_node_path"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_path, cli, projectId, result, root

### Community 97 - "Mağazaya çıkarma"
Cohesion: 0.33
Nodes (6): Build'e hangi değerler giriyor, İkonlar ve mağaza görselleri, Mağazaya çıkarma, "Otomatik artsın" isteniyorsa, Sürüm ne zaman elle artırılır, Sürüm numaraları

### Community 98 - "(tabs)/index.tsx"
Cohesion: 0.13
Nodes (13): AnnouncementRoute(), styles, AnnouncementRow(), styles, Announcement, src_announcements_announcement, src_announcements_fetchannouncement, formatAnnouncementDate() (+5 more)

### Community 100 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

## Knowledge Gaps
- **665 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+660 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 818 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `data.ts`, `takvim.tsx`, `data-access/hooks.ts`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `Pixel.tsx`, `auth.ts`, `integration.test.tsx`, `kv.ts`, `article-summary.test.tsx`, `ui.tsx`, `raffle-legal.test.tsx`, `sponsors.tsx`, `Txt`, `ZoomableImage.tsx`, `photo-hero.test.tsx`, `announcements.tsx`, `@testing-library/react-native`, `photo-viewer.test.tsx`, `kayit-ol.tsx`, `FeedView.tsx`, `Galeri, yenileme göstergesi, karşılama — uygulama planı`, `notifications.tsx`, `(tabs)/index.tsx`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Why does `err()` connect `data-access/index.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `export-registrations.ts`, `supabase/repositories.ts`, `demo-account.ts`, `supabase-repositories.test.ts`?**
  _High betweenness centrality (0.054) - this node is a cross-community bridge._
- **Why does `react-native` connect `react` to `kv.ts`, `(tabs)/index.tsx`, `data.ts`, `takvim.tsx`, `ui.tsx`, `package.json`, `kayit-ol.tsx`, `FeedView.tsx`, `Txt`, `ZoomableImage.tsx`, `Pixel.tsx`, `photo-hero.test.tsx`, `notifications.tsx`, `@testing-library/react-native`, `photo-viewer.test.tsx`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _665 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08246753246753247 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05647840531561462 - nodes in this community are weakly interconnected._