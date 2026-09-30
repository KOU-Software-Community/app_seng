# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 253 files · ~309,904 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2141 nodes · 5746 edges · 96 communities (92 shown, 4 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 487 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `80a441e7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- etkinlik/[id].tsx
- (tabs)/index.tsx
- server.ts
- integration.test.tsx
- data-access/hooks.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- parseSourceUrl
- env.ts
- mock/repositories.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- claims.ts
- Pixel.tsx
- SponsorsProvider
- Giriş sistemi, QR yoklama, sertifika — son plan
- supabase/repositories.ts
- accountSchema.ts
- Load-bearing decisions — the why log
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- check-release.mjs
- notifications.tsx
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- devDependencies
- check-gundem.ts
- relativeTime.ts
- qr.ts
- auth.ts
- export-registrations.ts
- data.ts
- enrichment-unavailable.test.tsx
- sync-deps.mjs
- types.ts
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- vitrinSchema.ts
- make-icons.py
- accountApi.ts
- vitrinView.ts
- GundemArticleRoute
- react
- firebase.ts
- check-bundle.mjs
- ref_node_path
- README.md
- expo-router
- Sponsorlar ve ana sayfa slider'ı — tasarım
- translateApi.ts
- eventSchema.ts
- repository
- admin/certificates.ts
- ref_node_fs
- readingText.ts
- Doğrulama ve teklik — plan ve kurulum
- tsconfig.json
- clubCalendar
- qrSchema.ts
- allowScripts
- announcements.tsx
- ZoomableImage.tsx
- session-start.sh
- photos.ts
- todayLocal
- mail.ts
- Dosya haritası
- theme.ts
- src/otp.ts
- gate.ts
- ui.tsx
- notificationPlan.ts
- vitrin-cache.test.tsx
- notificationsView.ts
- PhotoViewer.tsx
- app/_layout.tsx
- store.tsx
- 4. Uygulama
- article-summary.test.tsx
- icons.test.ts
- Galeri, yenileme göstergesi, karşılama — tasarım
- 4. Bulgular
- taramaKarari
- onUiThread

## God Nodes (most connected - your core abstractions)
1. `react` - 86 edges
2. `react-native` - 55 edges
3. `Txt()` - 47 edges
4. `colors` - 45 edges
5. `Load-bearing decisions — the why log` - 39 edges
6. `esc()` - 37 edges
7. `expo-router` - 37 edges
8. `react-native-safe-area-context` - 36 edges
9. `Dosya haritası` - 36 edges
10. `useContent()` - 33 edges

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

## Communities (96 total, 4 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.09
Nodes (49): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+41 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.06
Nodes (36): QR yoklama — kurulurken çıkanlar, archive, b64, cagir(), claimDb(), claimDb2(), Data, decision (+28 more)

### Community 2 - "check-security.ts"
Cohesion: 0.10
Nodes (21): AuthLike, clientIp(), CLOUDFLARE, cookieHeader(), guvenilenEs, iptalEdilen, issueToken(), LOGIN_LOCK_MS (+13 more)

### Community 3 - "etkinlik/[id].tsx"
Cohesion: 0.10
Nodes (31): Agent setup, keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials(), styles (+23 more)

### Community 4 - "(tabs)/index.tsx"
Cohesion: 0.10
Nodes (31): AnnouncementRoute(), SponsorRoute(), styles, SponsorsRoute(), styles, AnnouncementRow(), HomeRoute(), styles (+23 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (27): parsePort(), resolvePort(), app, attempts, authed(), db, formDateTime(), formToInput() (+19 more)

### Community 6 - "integration.test.tsx"
Cohesion: 0.09
Nodes (31): @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, @testing-library/react-native, clients, METRICS, mount(), QUERY_KEY_VERSION (+23 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.18
Nodes (23): Bu turda **bilerek** düzeltilmeyenler, 1. Kare yükleme animasyonu, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage() (+15 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.08
Nodes (37): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+29 more)

### Community 9 - "esc"
Cohesion: 0.18
Nodes (23): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), photoUpload() (+15 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.06
Nodes (34): author, bugs, url, description, license, main, name, overrides (+26 more)

### Community 12 - "store.ts"
Cohesion: 0.15
Nodes (36): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), P9 — grafiğe dayalı temizlik turu (2026-09-02), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles() (+28 more)

### Community 13 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 14 - "env.ts"
Cohesion: 0.18
Nodes (13): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, Task 1: Adla karşılama, AppEnv, DATA_MODES, DataMode, defaultDataModeFor(), IS_DEV, isDataMode() (+5 more)

### Community 15 - "mock/repositories.ts"
Cohesion: 0.11
Nodes (22): src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1, EnrichmentRepository, EnrichmentRepositoryV1 (+14 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.15
Nodes (31): moveBy(), placeAt(), sameMembers(), MAX_UPLOAD_BYTES, eventChoices(), Kind, notFound(), orderedDocs() (+23 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+27 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.12
Nodes (24): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW (+16 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (26): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+18 more)

### Community 20 - "claims.ts"
Cohesion: 0.14
Nodes (19): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+11 more)

### Community 21 - "Pixel.tsx"
Cohesion: 0.16
Nodes (12): styles, styles, TabBarProps, TABS, react-native-svg, PixelIconProps, PixelLoader(), refreshStyles (+4 more)

### Community 22 - "SponsorsProvider"
Cohesion: 0.15
Nodes (13): 1. Sorun, 2. Hedef, 3.2 Hook ve sağlayıcı, 3.3 Ana sayfa (`app/(tabs)/index.tsx`), 3. Adım 1 — liste önbelleği (OTA, 1.1.5), 4. Adım 2 — görseller (mağaza, 1.1.6), 6. Dağıtım yüzeyleri, 7. Reddedilenler (+5 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "supabase/repositories.ts"
Cohesion: 0.09
Nodes (47): @supabase/supabase-js, env, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC (+39 more)

### Community 25 - "accountSchema.ts"
Cohesion: 0.12
Nodes (32): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), SignupRoute(), arg(), Girdi, girdiOku(), has(), loadServiceAccount() (+24 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.10
Nodes (21): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı (+13 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (22): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+14 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (24): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+16 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.15
Nodes (11): Güvenlik taraması — sekiz sessiz delik ve kapatılmayan ikisi, Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root (+3 more)

### Community 31 - "notifications.tsx"
Cohesion: 0.18
Nodes (12): expo-constants, expo-device, expo-notifications, DeviceRecord, ensureAndroidChannel(), NotificationSync(), requestPushToken(), rescheduleReminders() (+4 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (20): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+12 more)

### Community 33 - "kv.ts"
Cohesion: 0.14
Nodes (13): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+5 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "check-gundem.ts"
Cohesion: 0.14
Nodes (12): blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS, ok (+4 more)

### Community 37 - "relativeTime.ts"
Cohesion: 0.36
Nodes (6): ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW

### Community 38 - "qr.ts"
Cohesion: 0.13
Nodes (24): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, QrTanimi (+16 more)

### Community 39 - "auth.ts"
Cohesion: 0.13
Nodes (27): HesapSilRoute(), CertificatesRoute(), firebase, YoklamaHatasi, YoklamaSonucu, yoklamaVarMi(), yoklamaVer(), currentUser() (+19 more)

### Community 40 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "data.ts"
Cohesion: 0.08
Nodes (20): Neden var, styles, ACCOUNT_DELETE_URL, ARCHIVE_CATEGORIES, ClubEvent, DEPARTMENTS, EventFact, EVENTS (+12 more)

### Community 42 - "enrichment-unavailable.test.tsx"
Cohesion: 0.17
Nodes (14): src_gundem_data_access_index_repository_contract_version, createMockRepositories(), mockArticles(), NO_CONTENT_ARTICLE, createMockDigestRepository(), createMockEnrichmentRepository(), createMockFeedRepository(), createMockSourceRepository() (+6 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "types.ts"
Cohesion: 0.14
Nodes (20): getRepositories(), resetRepositories(), createUnconfiguredRepositories(), DataErrorCode, DataErrorException, isDataErrorException(), RETRYABLE_BY_DEFAULT, ArticleSummary (+12 more)

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.20
Nodes (14): RaffleRulesRoute(), styles, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB (+6 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.11
Nodes (15): 1. Mevcut testler ne ölçüyordu, 2. Yeni testler, 3. Karşılaştırma: aynı testler eski koda karşı, 5. Testin kendisinden çıkan dersler, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, ref_node_os, assert() (+7 more)

### Community 48 - "vitrinSchema.ts"
Cohesion: 0.12
Nodes (27): Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 1: `src/vitrinCache.ts`, Task 2: Hook'lar ve ana sayfa kopyayla açılıyor, Task 3: Adım 1'i kapat, Task 4: expo-image ve sürüm 1.1.6 (+19 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.09
Nodes (34): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+26 more)

### Community 51 - "vitrinView.ts"
Cohesion: 0.29
Nodes (11): choiceOptions(), COPY, deleteForm(), imageBlock(), moveForm(), positionOptions(), slideForm(), sponsorForm() (+3 more)

### Community 52 - "GundemArticleRoute"
Cohesion: 0.33
Nodes (5): GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState()

### Community 53 - "react"
Cohesion: 0.08
Nodes (37): Conventions, styles, styles, ArsivRoute(), styles, GundemRoute(), isTab(), styles (+29 more)

### Community 54 - "firebase.ts"
Cohesion: 0.16
Nodes (17): Task 12: "Ödülü sağlayan" — `PrizeProviders`, RegistrationPayload, upsertDevice(), FIREBASE_SETUP_HINT, firebaseConfig, isFirebaseConfigured, lazyUpsertDevice(), Ctx (+9 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.12
Nodes (19): ref_node_child_process, ref_node_url, argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN (+11 more)

### Community 56 - "ref_node_path"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_path, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 57 - "README.md"
Cohesion: 0.05
Nodes (35): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules, Arşiv paneli, Bildirim gelmedi, nereye bakılır, Bildirimler (+27 more)

### Community 58 - "expo-router"
Cohesion: 0.06
Nodes (28): Galeri, yenileme göstergesi, karşılama — uygulama planı, Review Focus, Task 2: PixelLoader'lı yenileme göstergesi, Task 3: Yakınlaştırılabilir görsel, Task 4: Tam ekran görüntüleyici, Task 5: Otomatik kaydırma ortak hook'a, Task 6: Hero slider ve etkinlik detayı, Task 7: Kapanış (+20 more)

### Community 59 - "Sponsorlar ve ana sayfa slider'ı — tasarım"
Cohesion: 0.11
Nodes (17): 1. Kapsam, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli, 5.1 Menü (+9 more)

### Community 60 - "translateApi.ts"
Cohesion: 0.16
Nodes (17): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, loginLimiter() (+9 more)

### Community 61 - "eventSchema.ts"
Cohesion: 0.16
Nodes (22): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, ArchiveCard(), Global Constraints, buildEvent(), BuildResult, dayLabelOf(), daysInMonth(), EventInput (+14 more)

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "admin/certificates.ts"
Cohesion: 0.11
Nodes (24): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+16 more)

### Community 64 - "ref_node_fs"
Cohesion: 0.36
Nodes (7): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), ref_node_fs, parsed()

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "clubCalendar"
Cohesion: 0.16
Nodes (14): Kalıcı takvim, kare yükleme animasyonu, galeriyi dokunarak kapatma — uygulama planı, Review Focus, Task 1: Kare yükleme animasyonu, Task 2: Takvimin saf hesabı, Task 3: `MonthCalendar`, Task 6: Kapanış, 2. Kalıcı takvim, 3. Galeriyi soluk alana dokunarak kapatma (+6 more)

### Community 69 - "qrSchema.ts"
Cohesion: 0.15
Nodes (20): QrRoute(), @react-native-async-storage/async-storage, yoklamaMesaji(), LOCAL_OFFSET, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), defaultWindow() (+12 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "announcements.tsx"
Cohesion: 0.27
Nodes (10): announcementChoices(), Announcement, fetchAnnouncement(), fetchAnnouncements(), getJson(), toAnnouncement(), unwrapList(), AnnouncementsProvider() (+2 more)

### Community 72 - "ZoomableImage.tsx"
Cohesion: 0.18
Nodes (13): 5. Test, Task 5: Soluk alana dokununca kapatma, react-native-gesture-handler, react-native-reanimated, react-native-worklets, BACKDROP_MARGIN, clampOffset(), DOUBLE_TAP_SCALE (+5 more)

### Community 74 - "photos.ts"
Cohesion: 0.21
Nodes (17): ACCEPTED_TYPES, bucketName(), deleteFolder(), deletePhotos(), FOLDERS, isBucketMissing(), keyProblem(), missingBucketMessage() (+9 more)

### Community 75 - "todayLocal"
Cohesion: 0.18
Nodes (13): Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, From the 1.1.0 release, Dağıtım yüzeyleri, Git, İçerik girişi, Klasörler, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG) (+5 more)

### Community 77 - "mail.ts"
Cohesion: 0.22
Nodes (9): initMail(), Mail, MailConfig, MailEki, MailEnv, mailFrom(), MailResult, readMailConfig() (+1 more)

### Community 78 - "Dosya haritası"
Cohesion: 0.19
Nodes (22): Veri: kim neyi okuyor, kim yazıyor, Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 3: Panel sıralaması — `admin/ordering.ts`, Task 7: Tema, `PhotoSlot`, iletişim adresi (+14 more)

### Community 79 - "theme.ts"
Cohesion: 0.11
Nodes (35): styles, LoginRoute(), styles, styles, styles, BOS, styles, Durum (+27 more)

### Community 80 - "src/otp.ts"
Cohesion: 0.12
Nodes (20): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), digits(), PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli() (+12 more)

### Community 81 - "gate.ts"
Cohesion: 0.29
Nodes (8): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW

### Community 82 - "ui.tsx"
Cohesion: 0.10
Nodes (22): BildirimAyarlariRoute(), styles, SplashRoute(), styles, Task 4: Takvim ekranı, expo-linear-gradient, styles, emptyStyles (+14 more)

### Community 83 - "notificationPlan.ts"
Cohesion: 0.20
Nodes (12): DIGEST_HOURS, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), QUIET_END_HOUR, QUIET_START_HOUR (+4 more)

### Community 84 - "vitrin-cache.test.tsx"
Cohesion: 0.17
Nodes (8): ./firebase, METRICS, Cache, { cacheReady }, METRICS, { SponsorsProvider, useSponsors }, Storage, { useSlides }

### Community 85 - "notificationsView.ts"
Cohesion: 0.29
Nodes (9): ceviriSatiri(), DeviceSummary, LogRow, MailStatus, notificationsPage(), num(), PendingRow, when() (+1 more)

### Community 86 - "PhotoViewer.tsx"
Cohesion: 0.22
Nodes (5): Props, styles, METRICS, PHOTOS, { width }

### Community 87 - "app/_layout.tsx"
Cohesion: 0.25
Nodes (5): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar

### Community 88 - "store.tsx"
Cohesion: 0.19
Nodes (13): NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState, isDemoRegistration() (+5 more)

### Community 89 - "4. Uygulama"
Cohesion: 0.25
Nodes (8): SatirLink(), Task 13: Hesabım — KULÜP grubu, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi, 4. Uygulama

### Community 90 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 91 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 92 - "Galeri, yenileme göstergesi, karşılama — tasarım"
Cohesion: 0.29
Nodes (6): 2. Yenileme göstergesi, 3. Karşılama, 4. iOS'ta giriş yapmadan arşiv — değerlendirme, 6. Dağıtım yüzeyleri, 7. Reddedilenler, Galeri, yenileme göstergesi, karşılama — tasarım

### Community 93 - "4. Bulgular"
Cohesion: 0.50
Nodes (4): panelKoku(), 4. Bulgular, Kapatılmayan, bilerek, sources()

## Knowledge Gaps
- **669 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+664 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 831 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `etkinlik/[id].tsx`, `(tabs)/index.tsx`, `integration.test.tsx`, `data-access/hooks.ts`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `Pixel.tsx`, `notifications.tsx`, `data.ts`, `enrichment-unavailable.test.tsx`, `cekilis-kurallari.tsx`, `firebase.ts`, `expo-router`, `announcements.tsx`, `ZoomableImage.tsx`, `theme.ts`, `ui.tsx`, `vitrin-cache.test.tsx`, `PhotoViewer.tsx`, `app/_layout.tsx`, `store.tsx`, `article-summary.test.tsx`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `export-registrations.ts`, `enrichment-unavailable.test.tsx`, `types.ts`, `mock/repositories.ts`, `accountSchema.ts`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `react-native` connect `react` to `etkinlik/[id].tsx`, `(tabs)/index.tsx`, `integration.test.tsx`, `ZoomableImage.tsx`, `data.ts`, `package.json`, `cekilis-kurallari.tsx`, `theme.ts`, `ui.tsx`, `Pixel.tsx`, `PhotoViewer.tsx`, `app/_layout.tsx`, `store.tsx`, `expo-router`, `notifications.tsx`?**
  _High betweenness centrality (0.039) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _669 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0859538784067086 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05647840531561462 - nodes in this community are weakly interconnected._