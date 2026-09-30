# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 245 files · ~303,539 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2093 nodes · 5586 edges · 103 communities (100 shown, 3 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 449 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `509cb061`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- etkinlik/[id].tsx
- Txt
- server.ts
- store.tsx
- data-access/hooks.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- summary-state.test.ts
- env.ts
- data-access/repositories.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- ui.tsx
- kayit-ol.tsx
- Giriş sistemi, QR yoklama, sertifika — son plan
- supabase/repositories.ts
- getDb
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
- eventSchema.ts
- firebase.ts
- ref_node_path
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
- pushPolicy.ts
- check-bundle.mjs
- ref_node_fs
- README.md
- Dosya haritası
- Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`
- vitrin-cache.test.tsx
- todayLocal
- repository
- admin/certificates.ts
- REPOSITORY_CONTRACT_VERSION
- readingText.ts
- qr.ts
- tsconfig.json
- notificationPlan.ts
- edge.ts
- allowScripts
- auth.ts
- mock/repositories.ts
- session-start.sh
- announcements.tsx
- article-summary.test.tsx
- Veri: kim neyi okuyor, kim yazıyor
- vitrinSchema.ts
- theme.ts
- certificateDelivery.ts
- notificationsView.ts
- FeedView
- 4. Uygulama
- ZoomableImage.tsx
- notifications.tsx
- 8. Fazlar
- notification-sync.test.tsx
- Vitrin önbelleği — uygulama planı
- Vitrin önbelleği — tasarım
- vitrinCache.ts
- icons.test.ts
- send-push.ts
- app/_layout.tsx
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- KOÜ Yazılım Kulübü — agent notes
- deploy-rules.mjs
- Mağazaya çıkarma
- (tabs)/index.tsx
- 3. Veri modeli
- Yönetim paneli
- PhotoViewer.tsx
- Görseller

## God Nodes (most connected - your core abstractions)
1. `react` - 81 edges
2. `react-native` - 52 edges
3. `Txt()` - 45 edges
4. `colors` - 44 edges
5. `esc()` - 37 edges
6. `expo-router` - 37 edges
7. `Load-bearing decisions — the why log` - 37 edges
8. `Dosya haritası` - 36 edges
9. `react-native-safe-area-context` - 34 edges
10. `useContent()` - 33 edges

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

## Communities (103 total, 3 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.14
Nodes (24): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), DeviceSummary, ExpoTicket, flushPending(), postChunk() (+16 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (38): parsePort(), resolvePort(), QR yoklama — kurulurken çıkanlar, archive, b64, cagir(), claimDb(), claimDb2() (+30 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (39): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+31 more)

### Community 3 - "etkinlik/[id].tsx"
Cohesion: 0.11
Nodes (26): Agent setup, BildirimAyarlariRoute(), keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials() (+18 more)

### Community 4 - "Txt"
Cohesion: 0.09
Nodes (28): Conventions, styles, Tab, Global Constraints, Task 4: Tam ekran görüntüleyici, Global Constraints, hiddenSpinner, PixelRefresh() (+20 more)

### Community 5 - "server.ts"
Cohesion: 0.06
Nodes (31): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, pendingSummary(), recentPushLog(), app, attempts (+23 more)

### Community 6 - "store.tsx"
Cohesion: 0.19
Nodes (13): NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState, isDemoRegistration() (+5 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.20
Nodes (20): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Bu turda **bilerek** düzeltilmeyenler, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage() (+12 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.11
Nodes (28): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+20 more)

### Community 9 - "esc"
Cohesion: 0.14
Nodes (29): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), QrTanimi (+21 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.06
Nodes (35): author, bugs, url, description, license, main, name, overrides (+27 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (34): GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings(), clearRecentSearches() (+26 more)

### Community 13 - "summary-state.test.ts"
Cohesion: 0.14
Nodes (13): GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), useFallbackTranslation(), YedekCeviri, yedekGerekli() (+5 more)

### Community 14 - "env.ts"
Cohesion: 0.08
Nodes (25): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, Task 1: Adla karşılama, blank, blankKeys, bogus, dev, devEmpty, forcedMock (+17 more)

### Community 15 - "data-access/repositories.ts"
Cohesion: 0.11
Nodes (28): AddSourceOptions, DigestRepository, DigestRepositoryV1, EnrichmentRepository, EnrichmentRepositoryV1, FeedRepository, FeedRepositoryV1, Repositories (+20 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.20
Nodes (21): moveBy(), placeAt(), sameMembers(), deletePhotos(), announcementChoices(), eventChoices(), Kind, notFound() (+13 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+27 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.11
Nodes (25): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW (+17 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (26): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+18 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "ui.tsx"
Cohesion: 0.08
Nodes (32): styles, SplashRoute(), styles, styles, styles, styles, TabBarProps, TABS (+24 more)

### Community 22 - "kayit-ol.tsx"
Cohesion: 0.17
Nodes (24): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, BOS, DateFields(), SignupRoute(), styles, ageOn(), DateParts, digits() (+16 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.09
Nodes (22): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+14 more)

### Community 24 - "supabase/repositories.ts"
Cohesion: 0.11
Nodes (37): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+29 more)

### Community 25 - "getDb"
Cohesion: 0.13
Nodes (22): HesapSilRoute(), CertificatesRoute(), firebase, YoklamaHatasi, yoklamaMesaji(), YoklamaSonucu, yoklamaVarMi(), yoklamaVer() (+14 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.11
Nodes (19): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About (+11 more)

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
Cohesion: 0.20
Nodes (9): Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root, rulesBlock() (+1 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.11
Nodes (26): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, @testing-library/react-native, clients, METRICS, mount() (+18 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (20): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+12 more)

### Community 33 - "kv.ts"
Cohesion: 0.12
Nodes (14): Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4(), resetDeviceIdCache() (+6 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 37 - "hermes-safe.test.ts"
Cohesion: 0.26
Nodes (10): GundemRoute(), isTab(), clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr() (+2 more)

### Community 38 - "eventSchema.ts"
Cohesion: 0.18
Nodes (18): ArchiveCard(), buildEvent(), BuildResult, daysInMonth(), EventInput, MonthGrid, monthGrids(), monthKeyOf() (+10 more)

### Community 39 - "firebase.ts"
Cohesion: 0.31
Nodes (12): Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, 4.1 Okuma ve durum, fetchContent(), fetchSlides(), fetchSponsors(), RegistrationPayload, withTimeout(), FIREBASE_SETUP_HINT (+4 more)

### Community 40 - "ref_node_path"
Cohesion: 0.33
Nodes (7): csvCell(), RFC-4180, ref_node_path, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "takvim.tsx"
Cohesion: 0.12
Nodes (25): SponsorRoute(), styles, SponsorsRoute(), styles, ArsivRoute(), HomeRoute(), GridView(), ListView() (+17 more)

### Community 42 - "photos.ts"
Cohesion: 0.21
Nodes (16): ACCEPTED_TYPES, bucketName(), deleteFolder(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage() (+8 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.22
Nodes (7): Güvenlik taraması — sekiz sessiz delik ve kapatılmayan ikisi, 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

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
Cohesion: 0.21
Nodes (16): Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, Task 2: Hook'lar ve ana sayfa kopyayla açılıyor, 1. Sorun, 3.2 Hook ve sağlayıcı, useSlides(), Ctx, SponsorsProvider(), SponsorsValue (+8 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.09
Nodes (35): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+27 more)

### Community 51 - "data.ts"
Cohesion: 0.12
Nodes (14): ACCOUNT_DELETE_URL, ARCHIVE_CATEGORIES, DEPARTMENTS, EventFact, EVENTS, LEGAL_BASE, NotificationCategory, ONBOARDING (+6 more)

### Community 52 - "src/otp.ts"
Cohesion: 0.25
Nodes (12): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir(), OtpError (+4 more)

### Community 53 - "react"
Cohesion: 0.09
Nodes (20): styles, Task 9: Slider bileşeni — `src/components/HomeSlider.tsx`, expo-image, react, KICKER, styles, Props, styles (+12 more)

### Community 54 - "pushPolicy.ts"
Cohesion: 0.23
Nodes (16): ANNOUNCEMENT_MAX_AGE_HOURS, AnnouncementPlan, decideCancelledEvent(), decideNewEvent(), decideRaffleResult(), DeviceDoc, DeviceRow, nextQuietEnd() (+8 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "ref_node_fs"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_fs, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 57 - "README.md"
Cohesion: 0.15
Nodes (12): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Katkı, Lisans, Ne yapıyor, Proje yapısı (+4 more)

### Community 58 - "Dosya haritası"
Cohesion: 0.18
Nodes (10): SatirLink(), Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 13: Hesabım — KULÜP grubu, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 3: Panel sıralaması — `admin/ordering.ts`, Task 5: Panel görünümü — `admin/vitrinView.ts`, menü, CSS (+2 more)

### Community 59 - "Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`"
Cohesion: 0.25
Nodes (14): choiceOptions(), ChoiceRow, COPY, deleteForm(), imageBlock(), moveForm(), positionOptions(), slideForm() (+6 more)

### Community 60 - "vitrin-cache.test.tsx"
Cohesion: 0.20
Nodes (7): ./firebase, Cache, { cacheReady }, METRICS, { SponsorsProvider, useSponsors }, Storage, { useSlides }

### Community 61 - "todayLocal"
Cohesion: 0.27
Nodes (11): Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, From the 1.1.0 release, Klasörler, Kurallar ve tuzaklar, ContentProvider(), clubHour(), isPast(), splitByDate() (+3 more)

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "admin/certificates.ts"
Cohesion: 0.14
Nodes (14): BELGE_NO_UZUNLUK, BulunanSertifika, findCertificate(), makeBelgeNo(), publishCertificates(), revokeCertificate(), SertifikaKaydi, YayinGirdisi (+6 more)

### Community 64 - "REPOSITORY_CONTRACT_VERSION"
Cohesion: 0.19
Nodes (11): getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), REPOSITORY_CONTRACT_VERSION, createUnconfiguredRepositories(), Article, ARTICLES, CATEGORIES (+3 more)

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "qr.ts"
Cohesion: 0.08
Nodes (40): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr() (+32 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "notificationPlan.ts"
Cohesion: 0.21
Nodes (11): DIGEST_HOURS, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), QUIET_END_HOUR, QUIET_START_HOUR (+3 more)

### Community 69 - "edge.ts"
Cohesion: 0.14
Nodes (12): env, callEdgeFunction(), CODE_MAP, EDGE_TIMEOUT_MS, EdgeCallOptions, EdgeConfig, EdgeErrorEnvelope, isEnvelope() (+4 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "auth.ts"
Cohesion: 0.26
Nodes (13): LoginRoute(), normalizeEmail(), toProfile(), authErrorMessage(), getAuthClient(), loadProfile(), refreshVerification(), signIn() (+5 more)

### Community 72 - "mock/repositories.ts"
Cohesion: 0.09
Nodes (30): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, createMockRepositories(), compareArticles(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, mockArticles() (+22 more)

### Community 74 - "announcements.tsx"
Cohesion: 0.27
Nodes (10): 3.3 Ayrıştırma ve doğrulama, Announcement, fetchAnnouncement(), fetchAnnouncements(), getJson(), toAnnouncement(), unwrapList(), AnnouncementsProvider() (+2 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 77 - "Veri: kim neyi okuyor, kim yazıyor"
Cohesion: 0.20
Nodes (11): Veri: kim neyi okuyor, kim yazıyor, Bildirimler nereden çıkıyor, Dosyalar, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı, pushRaffleEntry() (+3 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.16
Nodes (19): 5.4 Sunucu, 7. Test ve kontroller, ClubEvent, Build, buildSlide(), buildSponsor(), https(), idList() (+11 more)

### Community 79 - "theme.ts"
Cohesion: 0.14
Nodes (30): styles, styles, styles, styles, styles, Durum, styles, styles (+22 more)

### Community 80 - "certificateDelivery.ts"
Cohesion: 0.13
Nodes (20): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+12 more)

### Community 81 - "notificationsView.ts"
Cohesion: 0.29
Nodes (9): ceviriSatiri(), DeviceSummary, LogRow, MailStatus, notificationsPage(), num(), PendingRow, when() (+1 more)

### Community 82 - "FeedView"
Cohesion: 0.27
Nodes (9): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW (+1 more)

### Community 83 - "4. Uygulama"
Cohesion: 0.11
Nodes (17): 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.7 Rotalar, 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi, 4. Uygulama, 5.1 Menü (+9 more)

### Community 84 - "ZoomableImage.tsx"
Cohesion: 0.08
Nodes (32): Galeri, yenileme göstergesi, karşılama — uygulama planı, Review Focus, Task 2: PixelLoader'lı yenileme göstergesi, Task 3: Yakınlaştırılabilir görsel, Task 5: Otomatik kaydırma ortak hook'a, Task 6: Hero slider ve etkinlik detayı, Task 7: Kapanış, 1. Galeri (+24 more)

### Community 85 - "notifications.tsx"
Cohesion: 0.22
Nodes (9): Bildirim gelmedi, nereye bakılır, expo-constants, expo-device, expo-notifications, DeviceRecord, ensureAndroidChannel(), lazyUpsertDevice(), requestPushToken() (+1 more)

### Community 86 - "8. Fazlar"
Cohesion: 0.33
Nodes (6): 8. Fazlar, Faz 2 — giriş, profil, eşleşmiş kayıt, Faz 3 — hesap silme (mağaza şartı), Faz 4 — QR yoklama ve çekiliş, Faz 5 — sertifika, Yapılmayacaklar

### Community 87 - "notification-sync.test.tsx"
Cohesion: 0.40
Nodes (4): mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs

### Community 88 - "Vitrin önbelleği — uygulama planı"
Cohesion: 0.22
Nodes (8): Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 1: `src/vitrinCache.ts`, Task 3: Adım 1'i kapat, Task 4: expo-image ve sürüm 1.1.6, Vitrin önbelleği — uygulama planı

### Community 89 - "Vitrin önbelleği — tasarım"
Cohesion: 0.22
Nodes (8): 2. Hedef, 3.3 Ana sayfa (`app/(tabs)/index.tsx`), 3. Adım 1 — liste önbelleği (OTA, 1.1.5), 4. Adım 2 — görseller (mağaza, 1.1.6), 5. Test ve kontroller, 6. Dağıtım yüzeyleri, 7. Reddedilenler, Vitrin önbelleği — tasarım

### Community 90 - "vitrinCache.ts"
Cohesion: 0.31
Nodes (8): 3.1 `src/vitrinCache.ts` (yeni), cachedSponsors(), KEYS, Kind, Lists, memory, parsed(), toSponsor()

### Community 91 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 92 - "send-push.ts"
Cohesion: 0.43
Nodes (7): deliver(), Args, loadServiceAccount(), main(), parseArgs(), inClubQuietHours(), PUSHABLE_CATEGORIES

### Community 93 - "app/_layout.tsx"
Cohesion: 0.25
Nodes (5): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar

### Community 94 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.25
Nodes (7): Dağıtım yüzeyleri, Git, İçerik girişi, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar

### Community 95 - "KOÜ Yazılım Kulübü — agent notes"
Cohesion: 0.33
Nodes (5): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules

### Community 96 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 97 - "Mağazaya çıkarma"
Cohesion: 0.33
Nodes (6): Build'e hangi değerler giriyor, İkonlar ve mağaza görselleri, Mağazaya çıkarma, "Otomatik artsın" isteniyorsa, Sürüm ne zaman elle artırılır, Sürüm numaraları

### Community 98 - "(tabs)/index.tsx"
Cohesion: 0.10
Nodes (16): AnnouncementRoute(), styles, HesapRoute(), AnnouncementRow(), styles, react-native-safe-area-context, src_announcements_announcement, src_announcements_fetchannouncement (+8 more)

### Community 99 - "3. Veri modeli"
Cohesion: 0.40
Nodes (5): 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli

### Community 100 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

### Community 102 - "Görseller"
Cohesion: 0.67
Nodes (3): Görseller, Kurulum, Neden Firebase Storage değil

## Knowledge Gaps
- **659 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+654 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 810 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `etkinlik/[id].tsx`, `Txt`, `store.tsx`, `data-access/hooks.ts`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `ui.tsx`, `kayit-ol.tsx`, `integration.test.tsx`, `kv.ts`, `takvim.tsx`, `cekilis-kurallari.tsx`, `sponsors.tsx`, `vitrin-cache.test.tsx`, `mock/repositories.ts`, `announcements.tsx`, `article-summary.test.tsx`, `vitrinSchema.ts`, `theme.ts`, `ZoomableImage.tsx`, `notifications.tsx`, `notification-sync.test.tsx`, `app/_layout.tsx`, `(tabs)/index.tsx`, `PhotoViewer.tsx`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `REPOSITORY_CONTRACT_VERSION`, `check-panel.ts`, `server.ts`, `edge.ts`, `ref_node_path`, `mock/repositories.ts`, `data-access/repositories.ts`, `demo-account.ts`, `send-push.ts`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _659 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14333333333333334 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05410628019323672 - nodes in this community are weakly interconnected._