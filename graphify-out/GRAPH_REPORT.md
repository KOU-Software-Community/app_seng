# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 242 files · ~302,485 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2079 nodes · 5545 edges · 91 communities (89 shown, 2 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 446 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `aec31010`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- etkinlik/[id].tsx
- FeedView.tsx
- server.ts
- firebase.ts
- data-access/hooks.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- types.ts
- check-gundem.ts
- mock/repositories.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- ui.tsx
- accountSchema.ts
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
- kv.ts
- check-event-schema.ts
- devDependencies
- Doğrulama ve teklik — plan ve kurulum
- hermes-safe.test.ts
- buildEvent
- getDb
- export-registrations.ts
- takvim.tsx
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
- src/otp.ts
- react
- 4. Uygulama
- check-bundle.mjs
- ref_node_fs
- README.md
- Dosya haritası
- Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`
- vitrin-cache.test.tsx
- Txt
- repository
- useFallbackTranslation.ts
- REPOSITORY_CONTRACT_VERSION
- readingText.ts
- qr.ts
- tsconfig.json
- notifications.tsx
- ZoomableImage.tsx
- allowScripts
- env.ts
- enrichment-unavailable.test.tsx
- session-start.sh
- announcements.tsx
- article-summary.test.tsx
- deletion.ts
- vitrinSchema.ts
- theme.ts
- admin/certificates.ts
- eventSchema.ts
- gate.ts
- Sponsorlar ve ana sayfa slider'ı — tasarım
- Galeri, yenileme göstergesi, karşılama — uygulama planı
- 3. Apple ve Google gerçekte ne şart koşuyor
- 8. Fazlar
- notification-sync.test.tsx
- icons.test.ts
- deploy-rules.mjs
- (tabs)/index.tsx

## God Nodes (most connected - your core abstractions)
1. `react` - 78 edges
2. `react-native` - 51 edges
3. `Txt()` - 44 edges
4. `colors` - 43 edges
5. `esc()` - 37 edges
6. `expo-router` - 37 edges
7. `Load-bearing decisions — the why log` - 37 edges
8. `Dosya haritası` - 36 edges
9. `useContent()` - 33 edges
10. `react-native-safe-area-context` - 32 edges

## Surprising Connections (you probably didn't know these)
- `Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı` --references--> `PhotoUploadError`  [INFERRED]
  AGENTS.md → admin/photos.ts
- `Fazlar` --references--> `storage()`  [INFERRED]
  docs/ai-gundem-port.md → admin/photos.ts
- `6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı` --references--> `attendanceRows()`  [INFERRED]
  docs/guvenlik-testleri-degerlendirmesi.md → admin/qr.ts
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `4.3 Kurallar (şekil)` --references--> `get()`  [INFERRED]
  docs/giris-sistemi-plani.md → scripts/check-panel.ts

## Import Cycles
- None detected.

## Communities (91 total, 2 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.07
Nodes (58): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+50 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (54): makeBelgeNo(), publishCertificates(), decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS (+46 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (44): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+36 more)

### Community 3 - "etkinlik/[id].tsx"
Cohesion: 0.10
Nodes (35): Agent setup, BildirimAyarlariRoute(), keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials() (+27 more)

### Community 4 - "FeedView.tsx"
Cohesion: 0.09
Nodes (24): ArsivRoute(), styles, styles, Tab, hiddenSpinner, PixelRefresh(), FilterChip(), Segmented() (+16 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (28): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, parsePort(), resolvePort(), app, attempts (+20 more)

### Community 6 - "firebase.ts"
Cohesion: 0.10
Nodes (25): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar, ContentProvider(), DeviceRecord (+17 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.18
Nodes (22): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, "Çeviri geç geliyor / hiç gelmiyor" raporundan, Bu turda **bilerek** düzeltilmeyenler, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs() (+14 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.11
Nodes (29): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+21 more)

### Community 9 - "esc"
Cohesion: 0.11
Nodes (38): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+30 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (37): author, bugs, url, description, license, main, name, overrides (+29 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (34): GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings(), clearRecentSearches() (+26 more)

### Community 13 - "types.ts"
Cohesion: 0.09
Nodes (31): GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), FeedArticleRow, isDigit(), isLetter() (+23 more)

### Community 14 - "check-gundem.ts"
Cohesion: 0.14
Nodes (12): blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS, ok (+4 more)

### Community 15 - "mock/repositories.ts"
Cohesion: 0.10
Nodes (25): compareArticles(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, mockDigest(), AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository (+17 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.21
Nodes (22): deletePhotos(), eventChoices(), Kind, notFound(), orderedDocs(), registerVitrin(), saveSlide(), saveSponsor() (+14 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+27 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.12
Nodes (24): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW (+16 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (26): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+18 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.16
Nodes (19): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+11 more)

### Community 21 - "ui.tsx"
Cohesion: 0.09
Nodes (28): SplashRoute(), styles, RegistrationDoneRoute(), styles, styles, styles, TabBarProps, TABS (+20 more)

### Community 22 - "accountSchema.ts"
Cohesion: 0.19
Nodes (21): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), SignupRoute(), ageOn(), DateParts, digits(), FieldErrors, firstName() (+13 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.12
Nodes (16): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 4.1 Koleksiyonlar, 4.2 Akış, 4.3 Kurallar (şekil), 4. Kimlik ve profil modeli — "eşleştirme", 5.1 Tarayıcı görevlide olmalı, öğrencide değil, 5.2 Çekiliş ayrı bir QR akışı değil (+8 more)

### Community 24 - "supabase/repositories.ts"
Cohesion: 0.10
Nodes (38): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+30 more)

### Community 25 - "auth.ts"
Cohesion: 0.11
Nodes (28): LoginRoute(), HesapSilRoute(), firebase, Profile, YoklamaSonucu, yoklamaVarMi(), authErrorMessage(), currentUser() (+20 more)

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
Nodes (25): requireAuth(), 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i (+17 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.18
Nodes (10): Faz 1 — kimlik altyapısı, UI yok, ref_node_path, failed, json(), pkg, read(), results, root (+2 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.10
Nodes (30): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, @testing-library/react-native, clients, METRICS, mount() (+22 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (18): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+10 more)

### Community 33 - "kv.ts"
Cohesion: 0.15
Nodes (10): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), resetDeviceIdCache(), kv (+2 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (19): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+11 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 37 - "hermes-safe.test.ts"
Cohesion: 0.21
Nodes (13): Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, GundemRoute(), isTab(), Klasörler, clubCalendar(), clubHour(), ABSOLUTE_AFTER_DAYS, absoluteTr() (+5 more)

### Community 38 - "buildEvent"
Cohesion: 0.29
Nodes (10): ArchiveCard(), buildEvent(), daysInMonth(), monthGrids(), monthKeyOf(), monthLabelOf(), monthOrder(), pad() (+2 more)

### Community 39 - "getDb"
Cohesion: 0.27
Nodes (16): From the 1.1.0 release, Veri: kim neyi okuyor, kim yazıyor, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, 4.1 Okuma ve durum, Dosyalar, YoklamaHatasi, yoklamaVer(), fetchContent() (+8 more)

### Community 40 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "takvim.tsx"
Cohesion: 0.11
Nodes (25): styles, SponsorRoute(), styles, SponsorsRoute(), styles, styles, TakvimRoute(), View_ (+17 more)

### Community 42 - "photos.ts"
Cohesion: 0.18
Nodes (18): ACCEPTED_TYPES, bucketName(), deleteFolder(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage() (+10 more)

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
Cohesion: 0.08
Nodes (43): today(), Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 1: `src/vitrinCache.ts`, Task 2: Hook'lar ve ana sayfa kopyayla açılıyor (+35 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.14
Nodes (22): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+14 more)

### Community 51 - "data.ts"
Cohesion: 0.13
Nodes (15): styles, IconTile(), Toggle(), ACCOUNT_DELETE_URL, DEPARTMENTS, DIGEST_HOURS, LEGAL_BASE, NOTIFICATION_CATEGORIES (+7 more)

### Community 52 - "src/otp.ts"
Cohesion: 0.25
Nodes (12): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir(), OtpError (+4 more)

### Community 53 - "react"
Cohesion: 0.13
Nodes (9): react, METRICS, mockPush, METRICS, mockAuth, fits(), HostNode, mockPush (+1 more)

### Community 54 - "4. Uygulama"
Cohesion: 0.25
Nodes (8): SatirLink(), Task 13: Hesabım — KULÜP grubu, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi, 4. Uygulama

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "ref_node_fs"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_fs, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 57 - "README.md"
Cohesion: 0.05
Nodes (35): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules, Arşiv paneli, Bildirimler, Bildirimler nereden çıkıyor (+27 more)

### Community 58 - "Dosya haritası"
Cohesion: 0.25
Nodes (9): moveBy(), placeAt(), sameMembers(), Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 3: Panel sıralaması — `admin/ordering.ts` (+1 more)

### Community 59 - "Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`"
Cohesion: 0.21
Nodes (16): choiceOptions(), ChoiceRow, COPY, deleteForm(), formatDay(), imageBlock(), moveForm(), positionOptions() (+8 more)

### Community 60 - "vitrin-cache.test.tsx"
Cohesion: 0.20
Nodes (7): ./firebase, Cache, { cacheReady }, METRICS, { SponsorsProvider, useSponsors }, Storage, { useSlides }

### Community 61 - "Txt"
Cohesion: 0.22
Nodes (13): Conventions, CertificatesRoute(), styles, Kurallar ve tuzaklar, Global Constraints, Task 4: Tam ekran görüntüleyici, Global Constraints, sertifikaPdfUrl() (+5 more)

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 64 - "REPOSITORY_CONTRACT_VERSION"
Cohesion: 0.17
Nodes (12): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), REPOSITORY_CONTRACT_VERSION, createUnconfiguredRepositories(), Article, ARTICLES (+4 more)

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "qr.ts"
Cohesion: 0.09
Nodes (37): ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr(), registeredNotPresent() (+29 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "notifications.tsx"
Cohesion: 0.19
Nodes (15): Bildirim gelmedi, nereye bakılır, ClubEvent, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), REMINDER_CATEGORY (+7 more)

### Community 69 - "ZoomableImage.tsx"
Cohesion: 0.13
Nodes (14): Task 3: Yakınlaştırılabilir görsel, 5. Test, expo-image, react-native-gesture-handler, react-native-reanimated, react-native-worklets, clampOffset(), DOUBLE_TAP_SCALE (+6 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "env.ts"
Cohesion: 0.18
Nodes (13): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, Task 1: Adla karşılama, AppEnv, DATA_MODES, DataMode, defaultDataModeFor(), IS_DEV, isDataMode() (+5 more)

### Community 72 - "enrichment-unavailable.test.tsx"
Cohesion: 0.12
Nodes (20): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, createMockRepositories(), mockArticles(), NO_CONTENT_ARTICLE, createMockDigestRepository(), createMockEnrichmentRepository(), createMockFeedRepository() (+12 more)

### Community 74 - "announcements.tsx"
Cohesion: 0.26
Nodes (10): announcementChoices(), fetchAnnouncement(), fetchAnnouncements(), getJson(), toAnnouncement(), unwrapList(), AnnouncementsProvider(), AnnouncementsValue (+2 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 77 - "deletion.ts"
Cohesion: 0.32
Nodes (7): deleteAuthUser(), DeletionOutcome, runDeletionSweep(), startDeletionSweeper(), STUDENT_NO_COLLECTIONS, USER_DOC_COLLECTIONS, USER_QUERY_COLLECTIONS

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.17
Nodes (12): Build, https(), idList(), isKicker(), Slide, SlideDoc, SponsorDoc, SponsorEventRow (+4 more)

### Community 79 - "theme.ts"
Cohesion: 0.12
Nodes (33): styles, styles, styles, styles, BOS, styles, Durum, styles (+25 more)

### Community 80 - "admin/certificates.ts"
Cohesion: 0.08
Nodes (31): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+23 more)

### Community 81 - "eventSchema.ts"
Cohesion: 0.12
Nodes (16): inputToForm(), EventFact, BuildResult, EVENT_CATEGORIES, EventInput, LOCAL_OFFSET, MAX_PHOTOS, MonthGrid (+8 more)

### Community 82 - "gate.ts"
Cohesion: 0.29
Nodes (8): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW

### Community 83 - "Sponsorlar ve ana sayfa slider'ı — tasarım"
Cohesion: 0.11
Nodes (18): 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli (+10 more)

### Community 84 - "Galeri, yenileme göstergesi, karşılama — uygulama planı"
Cohesion: 0.16
Nodes (18): Galeri, yenileme göstergesi, karşılama — uygulama planı, Review Focus, Task 2: PixelLoader'lı yenileme göstergesi, Task 5: Otomatik kaydırma ortak hook'a, Task 6: Hero slider ve etkinlik detayı, Task 7: Kapanış, 1. Galeri, 2. Yenileme göstergesi (+10 more)

### Community 85 - "3. Apple ve Google gerçekte ne şart koşuyor"
Cohesion: 0.33
Nodes (6): 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor

### Community 86 - "8. Fazlar"
Cohesion: 0.33
Nodes (6): 8. Fazlar, Faz 2 — giriş, profil, eşleşmiş kayıt, Faz 3 — hesap silme (mağaza şartı), Faz 4 — QR yoklama ve çekiliş, Faz 5 — sertifika, Yapılmayacaklar

### Community 87 - "notification-sync.test.tsx"
Cohesion: 0.40
Nodes (4): mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs

### Community 91 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 96 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 98 - "(tabs)/index.tsx"
Cohesion: 0.17
Nodes (11): AnnouncementRoute(), styles, AnnouncementRow(), styles, Announcement, src_announcements_announcement, src_announcements_fetchannouncement, formatAnnouncementDate() (+3 more)

## Knowledge Gaps
- **653 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+648 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 800 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `etkinlik/[id].tsx`, `FeedView.tsx`, `firebase.ts`, `data-access/hooks.ts`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `ui.tsx`, `auth.ts`, `integration.test.tsx`, `takvim.tsx`, `cekilis-kurallari.tsx`, `sponsors.tsx`, `data.ts`, `vitrin-cache.test.tsx`, `Txt`, `notifications.tsx`, `ZoomableImage.tsx`, `enrichment-unavailable.test.tsx`, `announcements.tsx`, `article-summary.test.tsx`, `vitrinSchema.ts`, `theme.ts`, `notification-sync.test.tsx`, `(tabs)/index.tsx`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `REPOSITORY_CONTRACT_VERSION`, `server.ts`, `export-registrations.ts`, `enrichment-unavailable.test.tsx`, `types.ts`, `mock/repositories.ts`, `demo-account.ts`?**
  _High betweenness centrality (0.053) - this node is a cross-community bridge._
- **Why does `ClubEvent` connect `notifications.tsx` to `push.ts`, `(tabs)/index.tsx`, `check-event-schema.ts`, `FeedView.tsx`, `server.ts`, `etkinlik/[id].tsx`, `firebase.ts`, `enrichment-unavailable.test.tsx`, `takvim.tsx`, `vitrinSchema.ts`, `vitrin.ts`, `eventSchema.ts`, `data.ts`, `README.md`, `2. Fikrin değerlendirmesi — zayıf noktalar`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _653 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06597222222222222 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.046536224219989424 - nodes in this community are weakly interconnected._