# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 248 files · ~306,378 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2113 nodes · 5636 edges · 97 communities (92 shown, 5 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 477 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2742b766`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- etkinlik/[id].tsx
- ui.tsx
- server.ts
- notifications.tsx
- data-access/hooks.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- edge.ts
- env.ts
- mock/repositories.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- Pixel.tsx
- useFallbackTranslation.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- supabase/repositories.ts
- auth.ts
- Load-bearing decisions — the why log
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- check-release.mjs
- integration.test.tsx
- raffleSchema.ts
- useEnrichmentWarmup.test.tsx
- check-event-schema.ts
- devDependencies
- Doğrulama ve teklik — plan ve kurulum
- hermes-safe.test.ts
- eventSchema.ts
- QrRoute
- export-registrations.ts
- (tabs)/index.tsx
- photos.ts
- sync-deps.mjs
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- sponsors.tsx
- make-icons.py
- accountApi.ts
- data.ts
- ZoomableImage.tsx
- @testing-library/react-native
- qr.ts
- check-bundle.mjs
- ref_node_fs
- README.md
- Galeri, yenileme göstergesi, karşılama — tasarım
- Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`
- vitrin-cache.test.tsx
- photo-viewer.test.tsx
- repository
- admin/certificates.ts
- Dosya haritası
- readingText.ts
- qrSchema.ts
- tsconfig.json
- PixelLoader
- bugs
- allowScripts
- overrides
- enrichment-unavailable.test.tsx
- session-start.sh
- react
- todayLocal
- firebase.ts
- vitrinSchema.ts
- kayit-ol.tsx
- certificateDelivery.ts
- notificationsView.ts
- FeedView.tsx
- 4. Uygulama
- Galeri, yenileme göstergesi, karşılama — uygulama planı
- app/_layout.tsx
- Vitrin önbelleği — uygulama planı
- notification-sync.test.tsx
- Vitrin önbelleği — tasarım
- Firebase
- react-native-reanimated
- icons.test.ts
- KOÜ Yazılım Kulübü — agent notes
- ref_node_path
- Mağazaya çıkarma
- react-native
- Yönetim paneli

## God Nodes (most connected - your core abstractions)
1. `react` - 82 edges
2. `react-native` - 53 edges
3. `Txt()` - 46 edges
4. `colors` - 44 edges
5. `Load-bearing decisions — the why log` - 38 edges
6. `esc()` - 37 edges
7. `expo-router` - 37 edges
8. `Dosya haritası` - 36 edges
9. `react-native-safe-area-context` - 34 edges
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

## Communities (97 total, 5 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.06
Nodes (62): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+54 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (38): parsePort(), resolvePort(), QR yoklama — kurulurken çıkanlar, archive, b64, cagir(), claimDb(), claimDb2() (+30 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (40): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+32 more)

### Community 3 - "etkinlik/[id].tsx"
Cohesion: 0.09
Nodes (37): Agent setup, keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials(), styles (+29 more)

### Community 4 - "ui.tsx"
Cohesion: 0.09
Nodes (43): Conventions, styles, styles, styles, ArsivRoute(), styles, styles, Tab (+35 more)

### Community 5 - "server.ts"
Cohesion: 0.06
Nodes (32): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, pendingSummary(), recentPushLog(), app, attempts (+24 more)

### Community 6 - "notifications.tsx"
Cohesion: 0.13
Nodes (20): Bildirim gelmedi, nereye bakılır, expo-constants, expo-device, expo-notifications, ClubEvent, DIGEST_HOURS, DeviceRecord, applyQuietHours() (+12 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.16
Nodes (22): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, "Çeviri geç geliyor / hiç gelmiyor" raporundan, Bu turda **bilerek** düzeltilmeyenler, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs() (+14 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.07
Nodes (39): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+31 more)

### Community 9 - "esc"
Cohesion: 0.15
Nodes (28): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), QrTanimi (+20 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.06
Nodes (30): author, description, license, main, name, private, version, expo (+22 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "edge.ts"
Cohesion: 0.12
Nodes (13): env, CODE_MAP, EDGE_TIMEOUT_MS, EdgeCallOptions, EdgeConfig, EdgeErrorEnvelope, isEnvelope(), DataErrorCode (+5 more)

### Community 14 - "env.ts"
Cohesion: 0.08
Nodes (25): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, Task 1: Adla karşılama, blank, blankKeys, bogus, dev, devEmpty, forcedMock (+17 more)

### Community 15 - "mock/repositories.ts"
Cohesion: 0.10
Nodes (36): K3 — Kullanıcı kaynak ekleyemiyor (v1), Taşınmayanlar, getRepositories(), resetRepositories(), src_gundem_data_access_mock_mapper_isaftercursor, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository (+28 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.24
Nodes (17): moveBy(), placeAt(), sameMembers(), deletePhotos(), announcementChoices(), eventChoices(), Kind, notFound() (+9 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+27 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.19
Nodes (17): NOW, TODAY, delay(), isBudget(), readWarmBudget(), useEnrichmentWarmup(), writeWarmBudget(), emptyBudget() (+9 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (26): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+18 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.12
Nodes (26): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+18 more)

### Community 21 - "Pixel.tsx"
Cohesion: 0.09
Nodes (22): SplashRoute(), styles, OnboardingRoute(), styles, styles, TabBarProps, TABS, expo-linear-gradient (+14 more)

### Community 22 - "useFallbackTranslation.ts"
Cohesion: 0.14
Nodes (13): GundemArticleRoute(), PANEL_BASE_URL, bodyFor(), hasSummary(), Segment, segmentState(), useFallbackTranslation(), YedekCeviri (+5 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (29): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+21 more)

### Community 24 - "supabase/repositories.ts"
Cohesion: 0.08
Nodes (49): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+41 more)

### Community 25 - "auth.ts"
Cohesion: 0.06
Nodes (64): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, VerifyRoute(), DateFields(), SignupRoute(), CertificatesRoute(), ResetPasswordRoute(), OgrenciNo(), 2. Doğrulama neden Firebase'in bağlantısı değil (+56 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.11
Nodes (18): Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti (+10 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (21): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K4 — Özetler paylaşımlı, cihaz başına değil, K5 — Testler geliyor, kırpılarak (+13 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (25): requireAuth(), 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i (+17 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.20
Nodes (9): ref_node_url, failed, json(), pkg, read(), results, root, rulesBlock() (+1 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.09
Nodes (28): @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, clients, METRICS, mount(), FeedFilter, QUERY_KEY_VERSION (+20 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (19): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+11 more)

### Community 33 - "useEnrichmentWarmup.test.tsx"
Cohesion: 0.11
Nodes (16): expo-crypto, Captured, TEST_CONFIG, clients, mockRequestEnrichment, mount(), QUEUED, READY (+8 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.14
Nodes (13): 1. Ne zorlanıyor, ne zorlanmıyor, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi, 5. Sertifika şablonu (+5 more)

### Community 37 - "hermes-safe.test.ts"
Cohesion: 0.24
Nodes (11): GundemRoute(), isTab(), clubCalendar(), compareArticles(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR (+3 more)

### Community 38 - "eventSchema.ts"
Cohesion: 0.16
Nodes (20): ArchiveCard(), Global Constraints, buildEvent(), BuildResult, daysInMonth(), EventInput, MAX_PHOTOS, MonthGrid (+12 more)

### Community 39 - "QrRoute"
Cohesion: 0.27
Nodes (10): QrRoute(), @react-native-async-storage/async-storage, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId(), isQrToken(), parseQrPayload() (+2 more)

### Community 40 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "(tabs)/index.tsx"
Cohesion: 0.10
Nodes (25): SponsorRoute(), styles, SponsorsRoute(), styles, styles, Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme, Task 12: "Ödülü sağlayan" — `PrizeProviders`, Task 9: Slider bileşeni — `src/components/HomeSlider.tsx` (+17 more)

### Community 42 - "photos.ts"
Cohesion: 0.23
Nodes (14): ACCEPTED_TYPES, bucketName(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage(), pathFromUrl() (+6 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.25
Nodes (6): 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.20
Nodes (14): RaffleRulesRoute(), styles, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB (+6 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "sponsors.tsx"
Cohesion: 0.15
Nodes (24): Task 2: Hook'lar ve ana sayfa kopyayla açılıyor, 1. Sorun, 3.1 `src/vitrinCache.ts` (yeni), 3.2 Hook ve sağlayıcı, 3.3 Ana sayfa (`app/(tabs)/index.tsx`), 3. Adım 1 — liste önbelleği (OTA, 1.1.5), useSlides(), Ctx (+16 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.09
Nodes (36): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+28 more)

### Community 51 - "data.ts"
Cohesion: 0.09
Nodes (26): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, BildirimAyarlariRoute(), styles, IconTile(), Toggle(), ACCOUNT_DELETE_URL, EventFact, LEGAL_BASE (+18 more)

### Community 52 - "ZoomableImage.tsx"
Cohesion: 0.25
Nodes (9): Task 3: Yakınlaştırılabilir görsel, Task 5: Soluk alana dokununca kapatma, react-native-gesture-handler, react-native-worklets, clampOffset(), DOUBLE_TAP_SCALE, MAX_SCALE, Props (+1 more)

### Community 53 - "@testing-library/react-native"
Cohesion: 0.13
Nodes (7): @testing-library/react-native, METRICS, mockEvent, PHOTOS, METRICS, PHOTOS, SLIDE_INTERVAL_MS

### Community 54 - "qr.ts"
Cohesion: 0.16
Nodes (20): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr() (+12 more)

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

### Community 59 - "Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`"
Cohesion: 0.20
Nodes (17): choiceOptions(), ChoiceRow, COPY, deleteForm(), formatDay(), imageBlock(), moveForm(), positionOptions() (+9 more)

### Community 60 - "vitrin-cache.test.tsx"
Cohesion: 0.20
Nodes (7): ./firebase, Cache, { cacheReady }, METRICS, { SponsorsProvider, useSponsors }, Storage, { useSlides }

### Community 61 - "photo-viewer.test.tsx"
Cohesion: 0.40
Nodes (3): METRICS, PHOTOS, { width }

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "admin/certificates.ts"
Cohesion: 0.14
Nodes (14): BELGE_NO_UZUNLUK, BulunanSertifika, findCertificate(), makeBelgeNo(), publishCertificates(), revokeCertificate(), SertifikaKaydi, YayinGirdisi (+6 more)

### Community 64 - "Dosya haritası"
Cohesion: 0.16
Nodes (15): deleteFolder(), runSlideSweep(), startSlideSweeper(), SatirLink(), Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 13: Hesabım — KULÜP grubu (+7 more)

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "qrSchema.ts"
Cohesion: 0.23
Nodes (10): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, LOCAL_OFFSET, defaultWindow(), pad(), Pencere, QR_ACILIS_SAAT, QR_ALPHABET, QR_TOKEN_LENGTH (+2 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "PixelLoader"
Cohesion: 0.16
Nodes (13): Kalıcı takvim, kare yükleme animasyonu, galeriyi dokunarak kapatma — uygulama planı, Review Focus, Task 1: Kare yükleme animasyonu, Task 2: Takvimin saf hesabı, Task 3: `MonthCalendar`, Task 6: Kapanış, 1. Kare yükleme animasyonu, 2. Kalıcı takvim (+5 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 72 - "enrichment-unavailable.test.tsx"
Cohesion: 0.11
Nodes (22): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, src_gundem_data_access_index_repository_contract_version, createMockRepositories(), mockArticles(), NO_CONTENT_ARTICLE, createMockDigestRepository(), createMockEnrichmentRepository() (+14 more)

### Community 74 - "react"
Cohesion: 0.16
Nodes (8): react, PrizeProviders(), styles, METRICS, mockPush, METRICS, mockAuth, mockPush

### Community 75 - "todayLocal"
Cohesion: 0.19
Nodes (12): Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, Dağıtım yüzeyleri, Git, İçerik girişi, Klasörler, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Kurallar ve tuzaklar (+4 more)

### Community 77 - "firebase.ts"
Cohesion: 0.27
Nodes (18): From the 1.1.0 release, Veri: kim neyi okuyor, kim yazıyor, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, 4.1 Okuma ve durum, Dosyalar, ContentProvider(), fetchContent(), fetchSlides() (+10 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.18
Nodes (25): Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, 2. Kaynak metinden ayrıldığımız yerler, 5.4 Sunucu, 7. Test ve kontroller, Task 1: `src/vitrinCache.ts`, 5. Test ve kontroller, Build, buildSlide() (+17 more)

### Community 79 - "kayit-ol.tsx"
Cohesion: 0.10
Nodes (32): styles, LoginRoute(), styles, HesapSilRoute(), styles, styles, BOS, styles (+24 more)

### Community 80 - "certificateDelivery.ts"
Cohesion: 0.13
Nodes (20): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+12 more)

### Community 81 - "notificationsView.ts"
Cohesion: 0.29
Nodes (9): ceviriSatiri(), DeviceSummary, LogRow, MailStatus, notificationsPage(), num(), PendingRow, when() (+1 more)

### Community 82 - "FeedView.tsx"
Cohesion: 0.18
Nodes (14): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW (+6 more)

### Community 83 - "4. Uygulama"
Cohesion: 0.12
Nodes (16): 1. Kapsam, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.7 Rotalar, 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi, 4. Uygulama, 5.1 Menü, 5.2 Liste sayfası (+8 more)

### Community 84 - "Galeri, yenileme göstergesi, karşılama — uygulama planı"
Cohesion: 0.25
Nodes (14): Galeri, yenileme göstergesi, karşılama — uygulama planı, Review Focus, Task 2: PixelLoader'lı yenileme göstergesi, Task 5: Otomatik kaydırma ortak hook'a, Task 6: Hero slider ve etkinlik detayı, Task 7: Kapanış, 1. Galeri, 5. Test (+6 more)

### Community 85 - "app/_layout.tsx"
Cohesion: 0.20
Nodes (8): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar, FIREBASE_SETUP_HINT, firebaseConfig, isFirebaseConfigured

### Community 86 - "Vitrin önbelleği — uygulama planı"
Cohesion: 0.25
Nodes (7): Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 3: Adım 1'i kapat, Task 4: expo-image ve sürüm 1.1.6, Vitrin önbelleği — uygulama planı

### Community 87 - "notification-sync.test.tsx"
Cohesion: 0.21
Nodes (6): mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs, fits(), HostNode

### Community 88 - "Vitrin önbelleği — tasarım"
Cohesion: 0.33
Nodes (5): 2. Hedef, 4. Adım 2 — görseller (mağaza, 1.1.6), 6. Dağıtım yüzeyleri, 7. Reddedilenler, Vitrin önbelleği — tasarım

### Community 89 - "Firebase"
Cohesion: 0.40
Nodes (5): Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı

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

### Community 98 - "react-native"
Cohesion: 0.19
Nodes (10): AnnouncementRoute(), styles, AnnouncementRow(), react-native, src_announcements_fetchannouncement, formatAnnouncementDate(), useAnnouncements(), Props (+2 more)

### Community 100 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

## Knowledge Gaps
- **663 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+658 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 815 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `push.ts`, `etkinlik/[id].tsx`, `ui.tsx`, `notifications.tsx`, `data-access/hooks.ts`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `Pixel.tsx`, `supabase/repositories.ts`, `auth.ts`, `integration.test.tsx`, `useEnrichmentWarmup.test.tsx`, `(tabs)/index.tsx`, `cekilis-kurallari.tsx`, `sponsors.tsx`, `data.ts`, `ZoomableImage.tsx`, `@testing-library/react-native`, `vitrin-cache.test.tsx`, `photo-viewer.test.tsx`, `enrichment-unavailable.test.tsx`, `kayit-ol.tsx`, `FeedView.tsx`, `app/_layout.tsx`, `notification-sync.test.tsx`, `react-native-reanimated`, `react-native`?**
  _High betweenness centrality (0.172) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `export-registrations.ts`, `enrichment-unavailable.test.tsx`, `edge.ts`, `mock/repositories.ts`, `demo-account.ts`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `react-native` connect `react-native` to `etkinlik/[id].tsx`, `ui.tsx`, `notifications.tsx`, `(tabs)/index.tsx`, `react`, `package.json`, `cekilis-kurallari.tsx`, `kayit-ol.tsx`, `FeedView.tsx`, `data.ts`, `ZoomableImage.tsx`, `Pixel.tsx`, `app/_layout.tsx`, `@testing-library/react-native`, `photo-viewer.test.tsx`, `integration.test.tsx`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _663 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06169772256728778 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05410628019323672 - nodes in this community are weakly interconnected._