# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 236 files · ~300,870 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2059 nodes · 5474 edges · 103 communities (96 shown, 7 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 434 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b0435f9f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- etkinlik/[id].tsx
- ui.tsx
- server.ts
- getDb
- data-access/hooks.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- data-access/index.ts
- check-gundem.ts
- supabase/repositories.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- claims.ts
- Pixel.tsx
- accountSchema.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- supabase-repositories.test.ts
- auth.ts
- Load-bearing decisions — the why log
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- check-release.mjs
- QueryProvider.tsx
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- devDependencies
- Doğrulama ve teklik — plan ve kurulum
- feed-screen.test.tsx
- eventSchema.ts
- qr.ts
- export-registrations.ts
- react
- src/otp.ts
- sync-deps.mjs
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- Txt
- html.ts
- check-rules.mjs
- useSlides
- make-icons.py
- accountApi.ts
- store.tsx
- translateApi.ts
- clubCalendar
- data.ts
- check-bundle.mjs
- ref_node_fs
- README.md
- types.ts
- integration.test.tsx
- vitrin-cache.test.tsx
- todayLocal
- repository
- useFallbackTranslation.ts
- env.ts
- readingText.ts
- qrSchema.ts
- tsconfig.json
- photos.ts
- HomeSlider
- allowScripts
- vitrinView.ts
- parseSourceUrl
- session-start.sh
- 4. Uygulama
- article-summary.test.tsx
- vitrinSchema.ts
- theme.ts
- admin/certificates.ts
- notifications.tsx
- gate.ts
- firebase.ts
- Galeri, yenileme göstergesi, karşılama — tasarım
- announcements.tsx
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- mail.ts
- KOÜ Yazılım Kulübü — agent notes
- Mağazaya çıkarma
- home-slider.test.tsx
- icons.test.ts
- buildEvent
- Yönetim paneli
- Görseller
- demo-account.ts
- deploy-rules.mjs
- credentials.ts
- hesap-kulup.test.tsx
- Firebase
- Sponsorlar ve ana sayfa slider'ı — uygulama planı
- bugs
- overrides

## God Nodes (most connected - your core abstractions)
1. `react` - 71 edges
2. `react-native` - 47 edges
3. `Txt()` - 44 edges
4. `colors` - 42 edges
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

## Communities (103 total, 7 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (53): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+45 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.04
Nodes (57): decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS, OTP_MAX_SENDS, OTP_RESEND_MS (+49 more)

### Community 2 - "check-security.ts"
Cohesion: 0.07
Nodes (29): AuthLike, authed(), panelKoku(), readCookie(), requireAuth(), clientIp(), CLOUDFLARE, cookieHeader() (+21 more)

### Community 3 - "etkinlik/[id].tsx"
Cohesion: 0.10
Nodes (28): keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials(), styles, RegistrationRoute() (+20 more)

### Community 4 - "ui.tsx"
Cohesion: 0.08
Nodes (38): BildirimAyarlariRoute(), styles, styles, styles, Tab, 4.2 Ana sayfa (`app/(tabs)/index.tsx`), 4.3 `/sponsorlar` (`app/sponsorlar.tsx`), 4.4 `/sponsor/[id]` (`app/sponsor/[id].tsx`) (+30 more)

### Community 5 - "server.ts"
Cohesion: 0.08
Nodes (20): parsePort(), resolvePort(), app, attempts, db, formDateTime(), formToInput(), keptPhotos() (+12 more)

### Community 6 - "getDb"
Cohesion: 0.19
Nodes (21): From the 1.1.0 release, Veri: kim neyi okuyor, kim yazıyor, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, 4.1 Okuma ve durum, Dosyalar, YoklamaHatasi, yoklamaMesaji(), YoklamaSonucu (+13 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.13
Nodes (25): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Bu turda **bilerek** düzeltilmeyenler, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage() (+17 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.07
Nodes (34): isAfterCursor(), cursorOfArticle(), FEED_URLS, hasNoContent(), hoursAgoFromLabel(), isoFromLabel(), MOCK_NOW_ISO, MOCK_NOW_MS (+26 more)

### Community 9 - "esc"
Cohesion: 0.14
Nodes (30): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+22 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.06
Nodes (34): author, description, license, main, name, private, version, expo (+26 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "data-access/index.ts"
Cohesion: 0.12
Nodes (34): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), createMockRepositories(), mockArticles(), createMockDigestRepository(), createMockEnrichmentRepository() (+26 more)

### Community 14 - "check-gundem.ts"
Cohesion: 0.14
Nodes (12): blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS, ok (+4 more)

### Community 15 - "supabase/repositories.ts"
Cohesion: 0.14
Nodes (23): src_gundem_data_access_mock_mapper_isaftercursor, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1, EnrichmentRepository, EnrichmentRepositoryV1, FeedRepository (+15 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.15
Nodes (35): moveBy(), placeAt(), sameMembers(), deleteFolder(), deletePhotos(), PhotoUploadError, storage(), uploadPhoto() (+27 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+27 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.13
Nodes (23): clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW, TODAY, delay() (+15 more)

### Community 19 - "pdf.ts"
Cohesion: 0.14
Nodes (20): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+12 more)

### Community 20 - "claims.ts"
Cohesion: 0.14
Nodes (19): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+11 more)

### Community 21 - "Pixel.tsx"
Cohesion: 0.09
Nodes (24): Agent setup, SplashRoute(), styles, RegistrationDoneRoute(), styles, OnboardingRoute(), styles, styles (+16 more)

### Community 22 - "accountSchema.ts"
Cohesion: 0.18
Nodes (22): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), SignupRoute(), ageOn(), DateParts, digits(), FieldErrors, firstName() (+14 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.09
Nodes (22): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+14 more)

### Community 24 - "supabase-repositories.test.ts"
Cohesion: 0.12
Nodes (20): @supabase/supabase-js, base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), keysetFilter(), utf8Bytes() (+12 more)

### Community 25 - "auth.ts"
Cohesion: 0.13
Nodes (23): HesapSilRoute(), CertificatesRoute(), firebase, currentUser(), deletionDone(), finishAccountDeletion(), getAuthClient(), loadProfile() (+15 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.12
Nodes (16): Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti, İşi telefon yaratıyordu, sunucu değil — ve bu defterdeki bir satır yanlıştı (+8 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.08
Nodes (23): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+15 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.12
Nodes (15): 8. Fazlar, Faz 1 — kimlik altyapısı, UI yok, Faz 2 — giriş, profil, eşleşmiş kayıt, Faz 3 — hesap silme (mağaza şartı), Faz 4 — QR yoklama ve çekiliş, Faz 5 — sertifika, Yapılmayacaklar, failed (+7 more)

### Community 31 - "QueryProvider.tsx"
Cohesion: 0.20
Nodes (14): @tanstack/query-async-storage-persister, @tanstack/react-query-persist-client, FeedFilter, QUERY_KEY_VERSION, queryKeys, asyncStorageFromKv(), CACHE_BUSTER, capPersistedFeed() (+6 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (19): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+11 more)

### Community 33 - "kv.ts"
Cohesion: 0.15
Nodes (12): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+4 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (19): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+11 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 37 - "feed-screen.test.tsx"
Cohesion: 0.17
Nodes (12): GundemRoute(), isTab(), clients, METRICS, mount(), createQueryClient(), QueryProvider(), clients (+4 more)

### Community 38 - "eventSchema.ts"
Cohesion: 0.13
Nodes (15): inputToForm(), EventFact, BuildResult, EVENT_CATEGORIES, EventInput, MAX_PHOTOS, MonthGrid, MONTHS_SHORT (+7 more)

### Community 39 - "qr.ts"
Cohesion: 0.13
Nodes (25): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, QrTanimi (+17 more)

### Community 40 - "export-registrations.ts"
Cohesion: 0.29
Nodes (7): csvCell(), RFC-4180, dotenv, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "react"
Cohesion: 0.07
Nodes (36): AnnouncementRoute(), styles, SponsorRoute(), styles, SponsorsRoute(), styles, AnnouncementRow(), HomeRoute() (+28 more)

### Community 42 - "src/otp.ts"
Cohesion: 0.25
Nodes (12): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir(), OtpError (+4 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.25
Nodes (6): 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 45 - "Txt"
Cohesion: 0.14
Nodes (22): Conventions, RaffleRulesRoute(), styles, Kurallar ve tuzaklar, Global Constraints, Task 4: Tam ekran görüntüleyici, Global Constraints, RaffleNotice() (+14 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "useSlides"
Cohesion: 0.11
Nodes (33): Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 1: `src/vitrinCache.ts`, Task 2: Hook'lar ve ana sayfa kopyayla açılıyor, Task 3: Adım 1'i kapat, Task 4: expo-image ve sürüm 1.1.6 (+25 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.15
Nodes (20): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+12 more)

### Community 51 - "store.tsx"
Cohesion: 0.17
Nodes (14): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState (+6 more)

### Community 52 - "translateApi.ts"
Cohesion: 0.16
Nodes (16): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, Bagimliliklar (+8 more)

### Community 53 - "clubCalendar"
Cohesion: 0.36
Nodes (7): clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW

### Community 54 - "data.ts"
Cohesion: 0.13
Nodes (13): ArsivRoute(), styles, PixelRefresh(), ACCOUNT_DELETE_URL, ARCHIVE_CATEGORIES, DEPARTMENTS, LEGAL_BASE, NotificationCategory (+5 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "ref_node_fs"
Cohesion: 0.22
Nodes (7): ref_node_fs, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 57 - "README.md"
Cohesion: 0.15
Nodes (12): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Katkı, Lisans, Ne yapıyor, Proje yapısı (+4 more)

### Community 58 - "types.ts"
Cohesion: 0.10
Nodes (30): GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), ceviriDurumu(), DigestArticleFacts, DigestItemRow (+22 more)

### Community 59 - "integration.test.tsx"
Cohesion: 0.22
Nodes (5): clients, fakePostgrest(), Filters, parseKeyset(), wrapper()

### Community 60 - "vitrin-cache.test.tsx"
Cohesion: 0.09
Nodes (17): @react-native-async-storage/async-storage, @testing-library/react-native, ./firebase, mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs, METRICS (+9 more)

### Community 61 - "todayLocal"
Cohesion: 0.32
Nodes (8): saveEventWithPhotos(), today(), Klasörler, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, ContentProvider(), isPast(), splitByDate(), todayLocal()

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "useFallbackTranslation.ts"
Cohesion: 0.27
Nodes (6): useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 64 - "env.ts"
Cohesion: 0.18
Nodes (13): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, Task 1: Adla karşılama, AppEnv, DATA_MODES, DataMode, defaultDataModeFor(), IS_DEV, isDataMode() (+5 more)

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "qrSchema.ts"
Cohesion: 0.14
Nodes (20): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, QrRoute(), LOCAL_OFFSET, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), defaultWindow(), isEventId() (+12 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "photos.ts"
Cohesion: 0.18
Nodes (12): ACCEPTED_TYPES, bucketName(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage(), pathFromUrl() (+4 more)

### Community 69 - "HomeSlider"
Cohesion: 0.29
Nodes (9): Galeri, yenileme göstergesi, karşılama — uygulama planı, Review Focus, Task 3: Yakınlaştırılabilir görsel, Task 5: Otomatik kaydırma ortak hook'a, Task 6: Hero slider ve etkinlik detayı, Task 7: Kapanış, 1. Galeri, HomeSlider() (+1 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "vitrinView.ts"
Cohesion: 0.29
Nodes (11): choiceOptions(), COPY, deleteForm(), imageBlock(), moveForm(), positionOptions(), slideForm(), sponsorForm() (+3 more)

### Community 72 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "4. Uygulama"
Cohesion: 0.08
Nodes (25): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar (+17 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.25
Nodes (10): @tanstack/react-query, clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount() (+2 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.21
Nodes (15): 7. Test ve kontroller, Build, buildSlide(), byOrder(), https(), idList(), isKicker(), KICKERS (+7 more)

### Community 79 - "theme.ts"
Cohesion: 0.11
Nodes (39): styles, LoginRoute(), styles, styles, styles, styles, BOS, styles (+31 more)

### Community 80 - "admin/certificates.ts"
Cohesion: 0.09
Nodes (28): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+20 more)

### Community 81 - "notifications.tsx"
Cohesion: 0.14
Nodes (18): Bildirim gelmedi, nereye bakılır, expo-constants, expo-device, expo-notifications, ClubEvent, DeviceRecord, applyQuietHours(), DIGEST_CATEGORY (+10 more)

### Community 82 - "gate.ts"
Cohesion: 0.29
Nodes (8): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW

### Community 83 - "firebase.ts"
Cohesion: 0.16
Nodes (14): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar, RegistrationPayload, FIREBASE_SETUP_HINT, firebaseConfig (+6 more)

### Community 84 - "Galeri, yenileme göstergesi, karşılama — tasarım"
Cohesion: 0.22
Nodes (9): Task 2: PixelLoader'lı yenileme göstergesi, 2. Yenileme göstergesi, 3. Karşılama, 4. iOS'ta giriş yapmadan arşiv — değerlendirme, 5. Test, 6. Dağıtım yüzeyleri, 7. Reddedilenler, Galeri, yenileme göstergesi, karşılama — tasarım (+1 more)

### Community 85 - "announcements.tsx"
Cohesion: 0.23
Nodes (11): 3.3 Ayrıştırma ve doğrulama, 5.3 Formlar, fetchAnnouncement(), fetchAnnouncements(), getJson(), toAnnouncement(), unwrapList(), AnnouncementsProvider() (+3 more)

### Community 86 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.25
Nodes (7): Dağıtım yüzeyleri, Git, İçerik girişi, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar

### Community 87 - "mail.ts"
Cohesion: 0.22
Nodes (9): initMail(), Mail, MailConfig, MailEki, MailEnv, mailFrom(), MailResult, readMailConfig() (+1 more)

### Community 88 - "KOÜ Yazılım Kulübü — agent notes"
Cohesion: 0.33
Nodes (5): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules

### Community 89 - "Mağazaya çıkarma"
Cohesion: 0.33
Nodes (6): Build'e hangi değerler giriyor, İkonlar ve mağaza görselleri, Mağazaya çıkarma, "Otomatik artsın" isteniyorsa, Sürüm ne zaman elle artırılır, Sürüm numaraları

### Community 91 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 92 - "buildEvent"
Cohesion: 0.29
Nodes (10): ArchiveCard(), buildEvent(), daysInMonth(), monthGrids(), monthKeyOf(), monthLabelOf(), monthOrder(), pad() (+2 more)

### Community 93 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

### Community 94 - "Görseller"
Cohesion: 0.67
Nodes (3): Görseller, Kurulum, Neden Firebase Storage değil

### Community 95 - "demo-account.ts"
Cohesion: 0.33
Nodes (9): arg(), Girdi, girdiOku(), has(), loadServiceAccount(), main(), parolaUret(), MIN_PASSWORD (+1 more)

### Community 96 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 97 - "credentials.ts"
Cohesion: 0.43
Nodes (6): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), parsed()

### Community 98 - "hesap-kulup.test.tsx"
Cohesion: 0.40
Nodes (3): HesapRoute(), METRICS, mockPush

### Community 99 - "Firebase"
Cohesion: 0.40
Nodes (5): Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı

## Knowledge Gaps
- **649 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+644 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 795 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `etkinlik/[id].tsx`, `ui.tsx`, `data-access/hooks.ts`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `Pixel.tsx`, `QueryProvider.tsx`, `feed-screen.test.tsx`, `Txt`, `store.tsx`, `data.ts`, `integration.test.tsx`, `vitrin-cache.test.tsx`, `article-summary.test.tsx`, `theme.ts`, `notifications.tsx`, `firebase.ts`, `announcements.tsx`, `home-slider.test.tsx`, `hesap-kulup.test.tsx`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Why does `err()` connect `data-access/index.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `export-registrations.ts`, `supabase/repositories.ts`, `supabase-repositories.test.ts`, `demo-account.ts`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **Why does `ClubEvent` connect `notifications.tsx` to `push.ts`, `check-event-schema.ts`, `etkinlik/[id].tsx`, `server.ts`, `eventSchema.ts`, `parseSourceUrl`, `react`, `vitrinSchema.ts`, `vitrin.ts`, `firebase.ts`, `Yönetim paneli`, `data.ts`, `2. Fikrin değerlendirmesi — zayıf noktalar`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _649 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0780399274047187 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04471153846153846 - nodes in this community are weakly interconnected._