# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 252 files · ~308,429 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2132 nodes · 5728 edges · 91 communities (88 shown, 3 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 485 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9817654b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- etkinlik/[id].tsx
- (tabs)/index.tsx
- server.ts
- ClubEvent
- data-access/hooks.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- enrichment-unavailable.test.tsx
- env.ts
- mock/repositories.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- Pixel.tsx
- types.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- supabase/repositories.ts
- kayit-ol.tsx
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
- auth.ts
- relativeTime.ts
- eventSchema.ts
- article-summary.test.tsx
- export-registrations.ts
- data.ts
- data-access/index.ts
- sync-deps.mjs
- safeNext
- react-native-safe-area-context
- html.ts
- check-rules.mjs
- sponsors.tsx
- make-icons.py
- accountApi.ts
- src/certificates.ts
- translateApi.ts
- react
- qr.tsx
- check-bundle.mjs
- ref_node_fs
- README.md
- PixelLoader
- announcements.tsx
- src/otp.ts
- MonthCalendar.tsx
- repository
- admin/certificates.ts
- credentials.ts
- readingText.ts
- Doğrulama ve teklik — plan ve kurulum
- tsconfig.json
- Review Focus
- qr.ts
- allowScripts
- 4. Uygulama
- parseSourceUrl
- session-start.sh
- 3. Apple ve Google gerçekte ne şart koşuyor
- todayLocal
- firebase.ts
- vitrinSchema.ts
- ui.tsx
- pixel-loading.test.tsx
- FeedView.tsx
- notifications.tsx
- app/_layout.tsx
- month-calendar.test.tsx
- Görseller
- icons.test.ts
- KOÜ Yazılım Kulübü — agent notes
- deploy-rules.mjs
- Mağazaya çıkarma
- Yönetim paneli

## God Nodes (most connected - your core abstractions)
1. `react` - 85 edges
2. `react-native` - 55 edges
3. `Txt()` - 47 edges
4. `colors` - 45 edges
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
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`` --references--> `VitrinRow`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/vitrinView.ts

## Import Cycles
- None detected.

## Communities (91 total, 3 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (51): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+43 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (51): decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS, OTP_MAX_SENDS, OTP_RESEND_MS (+43 more)

### Community 2 - "check-security.ts"
Cohesion: 0.07
Nodes (31): AuthLike, attendanceRows(), zamanMetni(), clientIp(), CLOUDFLARE, cookieHeader(), guvenilenEs, iptalEdilen (+23 more)

### Community 3 - "etkinlik/[id].tsx"
Cohesion: 0.15
Nodes (20): Agent setup, keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials(), styles (+12 more)

### Community 4 - "(tabs)/index.tsx"
Cohesion: 0.08
Nodes (41): AnnouncementRoute(), styles, SponsorRoute(), styles, AnnouncementRow(), HomeRoute(), styles, EventRow() (+33 more)

### Community 5 - "server.ts"
Cohesion: 0.06
Nodes (32): parsePort(), resolvePort(), registeredNotPresent(), app, attempts, authed(), db, formDateTime() (+24 more)

### Community 6 - "ClubEvent"
Cohesion: 0.25
Nodes (10): ClubEvent, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), REMINDER_CATEGORY, reminderOffsetMs() (+2 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.24
Nodes (17): asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage(), retryPolicy(), unwrap() (+9 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.09
Nodes (34): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+26 more)

### Community 9 - "esc"
Cohesion: 0.09
Nodes (44): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+36 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.06
Nodes (35): author, bugs, url, description, license, main, name, overrides (+27 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "enrichment-unavailable.test.tsx"
Cohesion: 0.13
Nodes (23): createMockRepositories(), mockArticles(), NO_CONTENT_ARTICLE, createMockDigestRepository(), createMockEnrichmentRepository(), createMockFeedRepository(), createMockSourceRepository(), Repositories (+15 more)

### Community 14 - "env.ts"
Cohesion: 0.08
Nodes (25): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, Task 1: Adla karşılama, blank, blankKeys, bogus, dev, devEmpty, forcedMock (+17 more)

### Community 15 - "mock/repositories.ts"
Cohesion: 0.09
Nodes (28): compareArticles(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, mockDigest(), AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository (+20 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.12
Nodes (39): moveBy(), placeAt(), sameMembers(), ACCEPTED_TYPES, bucketName(), deleteFolder(), deletePhotos(), FOLDERS (+31 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+27 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.13
Nodes (23): clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW, TODAY, delay() (+15 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (25): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+17 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "Pixel.tsx"
Cohesion: 0.10
Nodes (21): SplashRoute(), styles, styles, OnboardingRoute(), styles, styles, TabBarProps, TABS (+13 more)

### Community 22 - "types.ts"
Cohesion: 0.12
Nodes (17): GundemArticleRoute(), PANEL_BASE_URL, bodyFor(), hasSummary(), Segment, segmentState(), useFallbackTranslation(), YedekCeviri (+9 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.09
Nodes (22): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 4.1 Koleksiyonlar, 4.2 Akış, 4.3 Kurallar (şekil), 4. Kimlik ve profil modeli — "eşleştirme", 5.1 Tarayıcı görevlide olmalı, öğrencide değil, 5.2 Çekiliş ayrı bir QR akışı değil (+14 more)

### Community 24 - "supabase/repositories.ts"
Cohesion: 0.12
Nodes (34): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+26 more)

### Community 25 - "kayit-ol.tsx"
Cohesion: 0.17
Nodes (26): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, BOS, DateFields(), SignupRoute(), styles, ageOn(), DateParts, digits() (+18 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.10
Nodes (20): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About (+12 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (22): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+14 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.16
Nodes (11): Güvenlik taraması — sekiz sessiz delik ve kapatılmayan ikisi, Faz 1 — kimlik altyapısı, UI yok, ref_node_path, failed, json(), pkg, read(), results (+3 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.09
Nodes (30): GundemRoute(), isTab(), @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, clients, METRICS, mount() (+22 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (20): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+12 more)

### Community 33 - "kv.ts"
Cohesion: 0.12
Nodes (15): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+7 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "auth.ts"
Cohesion: 0.18
Nodes (19): LoginRoute(), HesapSilRoute(), Profile, authErrorMessage(), currentUser(), deletionDone(), finishAccountDeletion(), getAuthClient() (+11 more)

### Community 37 - "relativeTime.ts"
Cohesion: 0.36
Nodes (6): ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW

### Community 38 - "eventSchema.ts"
Cohesion: 0.19
Nodes (13): İçerik girişi, buildEvent(), BuildResult, EventInput, monthGrids(), monthKeyOf(), monthOrder(), MONTHS_SHORT (+5 more)

### Community 39 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 40 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "data.ts"
Cohesion: 0.08
Nodes (30): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, BildirimAyarlariRoute(), styles, GroupLabel(), IconTile(), Toggle(), ACCOUNT_DELETE_URL, DEPARTMENTS (+22 more)

### Community 42 - "data-access/index.ts"
Cohesion: 0.15
Nodes (16): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), REPOSITORY_CONTRACT_VERSION, createUnconfiguredRepositories(), DataErrorCode, DataErrorException (+8 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 45 - "react-native-safe-area-context"
Cohesion: 0.11
Nodes (21): RaffleRulesRoute(), styles, react-native-gesture-handler, react-native-safe-area-context, Props, styles, RaffleNotice(), styles (+13 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "sponsors.tsx"
Cohesion: 0.06
Nodes (44): Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 1: `src/vitrinCache.ts`, Task 2: Hook'lar ve ana sayfa kopyayla açılıyor, Task 3: Adım 1'i kapat, Task 4: expo-image ve sürüm 1.1.6 (+36 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.09
Nodes (29): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+21 more)

### Community 51 - "src/certificates.ts"
Cohesion: 0.24
Nodes (8): CertificatesRoute(), firebase, sertifikalarimiGetir(), Sertifikam, sertifikaPdfUrl(), sertifikaUrl(), COLLECTIONS, firebase/auth

### Community 52 - "translateApi.ts"
Cohesion: 0.16
Nodes (17): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, loginLimiter() (+9 more)

### Community 53 - "react"
Cohesion: 0.06
Nodes (24): HesapRoute(), expo-image, react, react-native-reanimated, @testing-library/react-native, Props, styles, PrizeProviders() (+16 more)

### Community 54 - "qr.tsx"
Cohesion: 0.13
Nodes (25): Durum, QrRoute(), styles, @react-native-async-storage/async-storage, YoklamaHatasi, yoklamaMesaji(), YoklamaSonucu, yoklamaVarMi() (+17 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "ref_node_fs"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_fs, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 57 - "README.md"
Cohesion: 0.15
Nodes (12): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Katkı, Lisans, Ne yapıyor, Proje yapısı (+4 more)

### Community 58 - "PixelLoader"
Cohesion: 0.13
Nodes (25): Galeri, yenileme göstergesi, karşılama — uygulama planı, Review Focus, Task 2: PixelLoader'lı yenileme göstergesi, Task 3: Yakınlaştırılabilir görsel, Task 4: Tam ekran görüntüleyici, Task 5: Otomatik kaydırma ortak hook'a, Task 6: Hero slider ve etkinlik detayı, Task 7: Kapanış (+17 more)

### Community 59 - "announcements.tsx"
Cohesion: 0.23
Nodes (11): announcementChoices(), 3.3 Ayrıştırma ve doğrulama, fetchAnnouncement(), fetchAnnouncements(), getJson(), toAnnouncement(), unwrapList(), AnnouncementsProvider() (+3 more)

### Community 60 - "src/otp.ts"
Cohesion: 0.25
Nodes (12): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir(), OtpError (+4 more)

### Community 61 - "MonthCalendar.tsx"
Cohesion: 0.22
Nodes (13): ArchiveCard(), Global Constraints, Kalıcı takvim, kare yükleme animasyonu, galeriyi dokunarak kapatma — uygulama planı, 4. Test, MonthCalendar(), styles, addMonths(), dayLabelOf() (+5 more)

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "admin/certificates.ts"
Cohesion: 0.10
Nodes (24): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+16 more)

### Community 64 - "credentials.ts"
Cohesion: 0.43
Nodes (6): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), parsed()

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "Review Focus"
Cohesion: 0.40
Nodes (5): Review Focus, Task 1: Kare yükleme animasyonu, Task 2: Takvimin saf hesabı, Task 3: `MonthCalendar`, Task 6: Kapanış

### Community 69 - "qr.ts"
Cohesion: 0.14
Nodes (23): ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, QrTanimi, regenerateQr() (+15 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "4. Uygulama"
Cohesion: 0.08
Nodes (25): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar (+17 more)

### Community 72 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "3. Apple ve Google gerçekte ne şart koşuyor"
Cohesion: 0.33
Nodes (6): 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor

### Community 75 - "todayLocal"
Cohesion: 0.21
Nodes (13): Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, From the 1.1.0 release, Dağıtım yüzeyleri, Git, Klasörler, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Kurallar ve tuzaklar (+5 more)

### Community 77 - "firebase.ts"
Cohesion: 0.15
Nodes (28): Veri: kim neyi okuyor, kim yazıyor, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, 4.1 Okuma ve durum, Bildirimler nereden çıkıyor, Dosyalar (+20 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.19
Nodes (25): startSlideSweeper(), Dosya haritası, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 3: Panel sıralaması — `admin/ordering.ts`, Task 7: Tema, `PhotoSlot`, iletişim adresi, 5.4 Sunucu, 7. Test ve kontroller, 5. Test ve kontroller (+17 more)

### Community 79 - "ui.tsx"
Cohesion: 0.11
Nodes (44): Conventions, styles, styles, styles, styles, styles, styles, styles (+36 more)

### Community 81 - "pixel-loading.test.tsx"
Cohesion: 0.13
Nodes (17): Bu turda **bilerek** düzeltilmeyenler, P9 — grafiğe dayalı temizlik turu (2026-09-02), 1. Kare yükleme animasyonu, GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched() (+9 more)

### Community 82 - "FeedView.tsx"
Cohesion: 0.09
Nodes (26): SponsorsRoute(), styles, ArsivRoute(), styles, Global Constraints, Global Constraints, 4.3 `/sponsorlar` (`app/sponsorlar.tsx`), hiddenSpinner (+18 more)

### Community 84 - "notifications.tsx"
Cohesion: 0.16
Nodes (13): Bildirim gelmedi, nereye bakılır, expo-constants, expo-device, expo-notifications, DeviceRecord, ensureAndroidChannel(), NotificationSync(), requestPushToken() (+5 more)

### Community 85 - "app/_layout.tsx"
Cohesion: 0.22
Nodes (6): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar, FIREBASE_SETUP_HINT

### Community 86 - "month-calendar.test.tsx"
Cohesion: 0.18
Nodes (5): 2. Kalıcı takvim, 3. Galeriyi soluk alana dokunarak kapatma, 5. Dağıtım yüzeyleri, Kalıcı takvim, kare yükleme animasyonu, galeriyi dokunarak kapatma — tasarım, header()

### Community 89 - "Görseller"
Cohesion: 0.67
Nodes (3): Görseller, Kurulum, Neden Firebase Storage değil

### Community 91 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 95 - "KOÜ Yazılım Kulübü — agent notes"
Cohesion: 0.33
Nodes (5): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules

### Community 96 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 97 - "Mağazaya çıkarma"
Cohesion: 0.33
Nodes (6): Build'e hangi değerler giriyor, İkonlar ve mağaza görselleri, Mağazaya çıkarma, "Otomatik artsın" isteniyorsa, Sürüm ne zaman elle artırılır, Sürüm numaraları

### Community 100 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

## Knowledge Gaps
- **666 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+661 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 825 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `etkinlik/[id].tsx`, `(tabs)/index.tsx`, `data-access/hooks.ts`, `package.json`, `store.ts`, `enrichment-unavailable.test.tsx`, `useEnrichmentWarmup.ts`, `Pixel.tsx`, `kayit-ol.tsx`, `integration.test.tsx`, `kv.ts`, `auth.ts`, `article-summary.test.tsx`, `data.ts`, `react-native-safe-area-context`, `sponsors.tsx`, `qr.tsx`, `PixelLoader`, `announcements.tsx`, `MonthCalendar.tsx`, `ui.tsx`, `pixel-loading.test.tsx`, `FeedView.tsx`, `notifications.tsx`, `app/_layout.tsx`, `month-calendar.test.tsx`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Why does `err()` connect `enrichment-unavailable.test.tsx` to `push.ts`, `check-panel.ts`, `server.ts`, `export-registrations.ts`, `data-access/index.ts`, `mock/repositories.ts`, `demo-account.ts`, `supabase/repositories.ts`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `react-native` connect `ui.tsx` to `kv.ts`, `etkinlik/[id].tsx`, `(tabs)/index.tsx`, `data.ts`, `package.json`, `react-native-safe-area-context`, `FeedView.tsx`, `notifications.tsx`, `Pixel.tsx`, `app/_layout.tsx`, `qr.tsx`, `react`, `kayit-ol.tsx`, `month-calendar.test.tsx`, `MonthCalendar.tsx`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _666 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08116883116883117 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04792518994739918 - nodes in this community are weakly interconnected._