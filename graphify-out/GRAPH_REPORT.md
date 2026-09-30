# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 230 files · ~295,207 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2013 nodes · 5335 edges · 85 communities (82 shown, 3 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 408 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `21b4620f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- enrichment-unavailable.test.tsx
- ui.tsx
- server.ts
- store.tsx
- supabase/repositories.ts
- mock/mapper.ts
- esc
- expo
- package.json
- data-access/hooks.ts
- supabase-repositories.test.ts
- env.ts
- types.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- bildirim-ayarlari.tsx
- supabase/mapper.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- photos.ts
- kayit-ol.tsx
- Load-bearing decisions — the why log
- scripts
- AI Gündem — taşıma planı
- QR yoklama ve sertifika — plan
- check-release.mjs
- QueryProvider.tsx
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- 2. Fikrin değerlendirmesi — zayıf noktalar
- integration.test.tsx
- theme.ts
- eventSchema.ts
- qr.ts
- ref_node_path
- (tabs)/index.tsx
- saveEventWithPhotos
- sync-deps.mjs
- feed-screen.test.tsx
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- Vitrin önbelleği — tasarım
- make-icons.py
- accountApi.ts
- firebase.ts
- KOÜ Yazılım Kulübü — agent notes
- hermes-safe.test.ts
- takvim.tsx
- check-bundle.mjs
- ref_node_fs
- README.md
- summary-state.test.ts
- Mağazaya çıkarma
- notifications.tsx
- icons.test.ts
- repository
- app/_layout.tsx
- Yönetim paneli
- readingText.ts
- qr.tsx
- tsconfig.json
- Görseller
- qrSchema.ts
- allowScripts
- ClubEvent
- parseSourceUrl
- session-start.sh
- Dosya haritası
- article-summary.test.tsx
- vitrinSchema.ts
- react
- admin/certificates.ts
- data.ts
- announcements.tsx
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- attendance.ts

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

## Communities (85 total, 3 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (50): announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending(), pendingSummary() (+42 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (51): decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS, OTP_MAX_SENDS, OTP_RESEND_MS (+43 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (41): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+33 more)

### Community 3 - "enrichment-unavailable.test.tsx"
Cohesion: 0.17
Nodes (15): createMockRepositories(), compareArticles(), hasNoContent(), mockArticles(), mockDigest(), NO_CONTENT_ARTICLE, createMockDigestRepository(), createMockEnrichmentRepository() (+7 more)

### Community 4 - "ui.tsx"
Cohesion: 0.09
Nodes (44): Conventions, styles, styles, ArsivRoute(), styles, styles, Tab, Kurallar ve tuzaklar (+36 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (26): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, parsePort(), resolvePort(), app, attempts (+18 more)

### Community 6 - "store.tsx"
Cohesion: 0.19
Nodes (13): NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState, isDemoRegistration() (+5 more)

### Community 7 - "supabase/repositories.ts"
Cohesion: 0.12
Nodes (25): K3 — Kullanıcı kaynak ekleyemiyor (v1), Taşınmayanlar, src_gundem_data_access_mock_mapper_isaftercursor, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1, EnrichmentRepository (+17 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.08
Nodes (38): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), keysetFilter(), utf8Bytes() (+30 more)

### Community 9 - "esc"
Cohesion: 0.11
Nodes (38): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+30 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (38): author, bugs, url, description, license, main, name, overrides (+30 more)

### Community 12 - "data-access/hooks.ts"
Cohesion: 0.07
Nodes (66): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), Bu turda **bilerek** düzeltilmeyenler, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS (+58 more)

### Community 13 - "supabase-repositories.test.ts"
Cohesion: 0.11
Nodes (27): @supabase/supabase-js, FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError(), toNetworkError() (+19 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "types.ts"
Cohesion: 0.16
Nodes (16): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), Repositories, REPOSITORY_CONTRACT_VERSION, createUnconfiguredRepositories(), DataErrorCode (+8 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.13
Nodes (37): moveBy(), placeAt(), sameMembers(), deleteFolder(), deletePhotos(), announcementChoices(), eventChoices(), Kind (+29 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.13
Nodes (23): clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW, TODAY, delay() (+15 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (26): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+18 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (29): revokeCertificate(), bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil() (+21 more)

### Community 21 - "bildirim-ayarlari.tsx"
Cohesion: 0.08
Nodes (31): Agent setup, BildirimAyarlariRoute(), styles, SplashRoute(), styles, RegistrationDoneRoute(), styles, RegistrationRoute() (+23 more)

### Community 22 - "supabase/mapper.ts"
Cohesion: 0.18
Nodes (17): ceviriDurumu(), DigestArticleFacts, DigestItemRow, DigestRow, FEED_COLUMNS, isDigit(), isLetter(), SourceRow (+9 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "photos.ts"
Cohesion: 0.21
Nodes (15): ACCEPTED_TYPES, bucketName(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage(), pathFromUrl() (+7 more)

### Community 25 - "kayit-ol.tsx"
Cohesion: 0.05
Nodes (70): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, VerifyRoute(), LoginRoute(), HesapSilRoute(), BOS, DateFields(), SignupRoute(), styles (+62 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.12
Nodes (17): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti (+9 more)

### Community 27 - "scripts"
Cohesion: 0.04
Nodes (49): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+41 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (21): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K4 — Özetler paylaşımlı, cihaz başına değil, K5 — Testler geliyor, kırpılarak (+13 more)

### Community 29 - "QR yoklama ve sertifika — plan"
Cohesion: 0.14
Nodes (13): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 3. Veri modeli, 4. QR'ın içinde ne var, 5. Sertifika, 6. Uygulama tarafı, 7. Fazlar, 8. Bu planın dayandığı ölçümler, `attendance/{eventId}__{uid}` (+5 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.20
Nodes (9): Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root, rulesBlock() (+1 more)

### Community 31 - "QueryProvider.tsx"
Cohesion: 0.20
Nodes (14): @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, QUERY_KEY_VERSION, queryKeys, asyncStorageFromKv(), CACHE_BUSTER, capPersistedFeed() (+6 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (18): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+10 more)

### Community 33 - "kv.ts"
Cohesion: 0.16
Nodes (11): Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4(), resetDeviceIdCache() (+3 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.08
Nodes (25): EventDetailRoute(), initials(), broken, built, capped, dayBefore, EV1, EV1_INPUT (+17 more)

### Community 35 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.20
Nodes (10): 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta, 2.8 Yayınlanmamış kural = çalışmayan yoklama (+2 more)

### Community 36 - "integration.test.tsx"
Cohesion: 0.22
Nodes (5): clients, fakePostgrest(), Filters, parseKeyset(), wrapper()

### Community 37 - "theme.ts"
Cohesion: 0.16
Nodes (13): styles, styles, expo-router, src_announcements_announcement, src_announcements_fetchannouncement, PhotoGallery(), styles, styles (+5 more)

### Community 38 - "eventSchema.ts"
Cohesion: 0.14
Nodes (21): ArchiveCard(), EventFact, buildEvent(), BuildResult, daysInMonth(), EVENT_CATEGORIES, EventInput, LOCAL_OFFSET (+13 more)

### Community 39 - "qr.ts"
Cohesion: 0.16
Nodes (20): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr() (+12 more)

### Community 40 - "ref_node_path"
Cohesion: 0.33
Nodes (7): csvCell(), RFC-4180, ref_node_path, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "(tabs)/index.tsx"
Cohesion: 0.08
Nodes (29): AnnouncementRoute(), SponsorRoute(), styles, SponsorsRoute(), styles, AnnouncementRow(), HomeRoute(), styles (+21 more)

### Community 42 - "saveEventWithPhotos"
Cohesion: 0.29
Nodes (8): formDateTime(), formToInput(), inputToForm(), keptPhotos(), saveEventWithPhotos(), today(), joinLocal(), splitLocal()

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "feed-screen.test.tsx"
Cohesion: 0.14
Nodes (14): GundemRoute(), isTab(), @testing-library/react-native, clients, METRICS, mount(), createQueryClient(), QueryProvider() (+6 more)

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.20
Nodes (14): RaffleRulesRoute(), styles, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB (+6 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.11
Nodes (15): 1. Mevcut testler ne ölçüyordu, 2. Yeni testler, 3. Karşılaştırma: aynı testler eski koda karşı, 5. Testin kendisinden çıkan dersler, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, ref_node_os, assert() (+7 more)

### Community 48 - "Vitrin önbelleği — tasarım"
Cohesion: 0.25
Nodes (7): 2. Hedef, 3.3 Ana sayfa (`app/(tabs)/index.tsx`), 3. Adım 1 — liste önbelleği (OTA, 1.1.5), 4. Adım 2 — görseller (mağaza, 1.1.6), 6. Dağıtım yüzeyleri, 7. Reddedilenler, Vitrin önbelleği — tasarım

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.15
Nodes (20): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+12 more)

### Community 51 - "firebase.ts"
Cohesion: 0.15
Nodes (33): From the 1.1.0 release, Veri: kim neyi okuyor, kim yazıyor, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, 2. Kaynak metinden ayrıldığımız yerler, 4.1 Okuma ve durum, 1. Sorun, 3.2 Hook ve sağlayıcı (+25 more)

### Community 52 - "KOÜ Yazılım Kulübü — agent notes"
Cohesion: 0.33
Nodes (5): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules

### Community 53 - "hermes-safe.test.ts"
Cohesion: 0.36
Nodes (7): clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW

### Community 54 - "takvim.tsx"
Cohesion: 0.33
Nodes (7): GridView(), ListView(), styles, TakvimRoute(), View_, useContent(), monthOrder()

### Community 55 - "check-bundle.mjs"
Cohesion: 0.12
Nodes (19): ref_node_child_process, ref_node_url, argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN (+11 more)

### Community 56 - "ref_node_fs"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_fs, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 57 - "README.md"
Cohesion: 0.15
Nodes (12): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Katkı, Lisans, Ne yapıyor, Proje yapısı (+4 more)

### Community 58 - "summary-state.test.ts"
Cohesion: 0.13
Nodes (15): GundemArticleRoute(), PANEL_BASE_URL, bodyFor(), hasSummary(), Segment, segmentState(), useFallbackTranslation(), YedekCeviri (+7 more)

### Community 59 - "Mağazaya çıkarma"
Cohesion: 0.33
Nodes (6): Build'e hangi değerler giriyor, İkonlar ve mağaza görselleri, Mağazaya çıkarma, "Otomatik artsın" isteniyorsa, Sürüm ne zaman elle artırılır, Sürüm numaraları

### Community 60 - "notifications.tsx"
Cohesion: 0.16
Nodes (13): Bildirim gelmedi, nereye bakılır, expo-constants, expo-device, expo-notifications, DeviceRecord, ensureAndroidChannel(), NotificationSync(), requestPushToken() (+5 more)

### Community 61 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "app/_layout.tsx"
Cohesion: 0.20
Nodes (8): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar, FIREBASE_SETUP_HINT, firebaseConfig, isFirebaseConfigured

### Community 64 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "qr.tsx"
Cohesion: 0.22
Nodes (13): Durum, QrRoute(), styles, @react-native-async-storage/async-storage, yoklamaMesaji(), YoklamaSonucu, bekleyeniOku(), bekleyeniSil() (+5 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "Görseller"
Cohesion: 0.67
Nodes (3): Görseller, Kurulum, Neden Firebase Storage değil

### Community 69 - "qrSchema.ts"
Cohesion: 0.25
Nodes (11): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, toLocalIso(), defaultWindow(), isQrToken(), pad(), parseQrPayload(), QR_ACILIS_SAAT, QR_ALPHABET (+3 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "ClubEvent"
Cohesion: 0.25
Nodes (10): ClubEvent, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), REMINDER_CATEGORY, reminderOffsetMs() (+2 more)

### Community 72 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "Dosya haritası"
Cohesion: 0.12
Nodes (16): SatirLink(), Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 13: Hesabım — KULÜP grubu, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 3: Panel sıralaması — `admin/ordering.ts`, Task 7: Tema, `PhotoSlot`, iletişim adresi (+8 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.09
Nodes (41): Task 12: "Ödülü sağlayan" — `PrizeProviders`, 5.4 Sunucu, 7. Test ve kontroller, Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 1: `src/vitrinCache.ts` (+33 more)

### Community 79 - "react"
Cohesion: 0.14
Nodes (26): styles, styles, styles, styles, styles, HesapRoute(), styles, react (+18 more)

### Community 80 - "admin/certificates.ts"
Cohesion: 0.07
Nodes (33): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+25 more)

### Community 81 - "data.ts"
Cohesion: 0.10
Nodes (20): keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, styles, AuthGate(), ACCOUNT_DELETE_URL, DEPARTMENTS (+12 more)

### Community 85 - "announcements.tsx"
Cohesion: 0.09
Nodes (26): 1. Kapsam, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli, 5.1 Menü (+18 more)

### Community 86 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.17
Nodes (11): alreadyAnnounced(), Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, Dağıtım yüzeyleri, Git, İçerik girişi, Klasörler, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG) (+3 more)

### Community 87 - "attendance.ts"
Cohesion: 0.19
Nodes (13): CertificatesRoute(), firebase, YoklamaHatasi, yoklamaVarMi(), yoklamaVer(), currentUser(), sertifikalarimiGetir(), Sertifikam (+5 more)

## Knowledge Gaps
- **631 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+626 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 774 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `enrichment-unavailable.test.tsx`, `ui.tsx`, `store.tsx`, `package.json`, `data-access/hooks.ts`, `useEnrichmentWarmup.ts`, `bildirim-ayarlari.tsx`, `kayit-ol.tsx`, `QueryProvider.tsx`, `integration.test.tsx`, `theme.ts`, `(tabs)/index.tsx`, `feed-screen.test.tsx`, `cekilis-kurallari.tsx`, `firebase.ts`, `takvim.tsx`, `notifications.tsx`, `app/_layout.tsx`, `qr.tsx`, `article-summary.test.tsx`, `data.ts`, `announcements.tsx`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase-repositories.test.ts` to `push.ts`, `check-panel.ts`, `enrichment-unavailable.test.tsx`, `server.ts`, `supabase/repositories.ts`, `ref_node_path`, `types.ts`, `demo-account.ts`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _631 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08282828282828283 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04792518994739918 - nodes in this community are weakly interconnected._