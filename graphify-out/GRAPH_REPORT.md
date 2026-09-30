# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 235 files · ~300,441 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2054 nodes · 5439 edges · 95 communities (90 shown, 5 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 431 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `077a5da3`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- data.ts
- FeedView.tsx
- server.ts
- firebase.ts
- data-access/hooks.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- supabase/repositories.ts
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
- useEnrichmentWarmup.test.tsx
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
- @testing-library/react-native
- eventSchema.ts
- qr.ts
- ref_node_path
- (tabs)/index.tsx
- src/otp.ts
- sync-deps.mjs
- safeNext
- PixelTxt
- html.ts
- check-rules.mjs
- sponsors.tsx
- make-icons.py
- accountApi.ts
- store.tsx
- QrRoute
- clubCalendar
- react
- check-bundle.mjs
- ref_node_fs
- README.md
- summary-state.test.ts
- integration.test.tsx
- notifications.tsx
- todayLocal
- repository
- useFallbackTranslation.ts
- env.ts
- readingText.ts
- qrSchema.ts
- tsconfig.json
- duyuru/[id].tsx
- HomeSlider
- allowScripts
- REPOSITORY_CONTRACT_VERSION
- enrichment-unavailable.test.tsx
- session-start.sh
- 4. Uygulama
- article-summary.test.tsx
- vitrinSchema.ts
- theme.ts
- admin/certificates.ts
- notificationPlan.ts
- gate.ts
- app/_layout.tsx
- Galeri, yenileme göstergesi, karşılama — tasarım
- announcements.tsx
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- attendance.ts
- KOÜ Yazılım Kulübü — agent notes
- Mağazaya çıkarma
- home-slider.test.tsx
- icons.test.ts
- firstName
- Yönetim paneli
- Görseller

## God Nodes (most connected - your core abstractions)
1. `react` - 70 edges
2. `react-native` - 47 edges
3. `Txt()` - 44 edges
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
- `6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı` --references--> `attendanceRows()`  [INFERRED]
  docs/guvenlik-testleri-degerlendirmesi.md → admin/qr.ts
- `Task 5: Panel görünümü — `admin/vitrinView.ts`, menü, CSS` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/views.ts

## Import Cycles
- None detected.

## Communities (95 total, 5 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.09
Nodes (49): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+41 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.04
Nodes (57): makeBelgeNo(), publishCertificates(), decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS (+49 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (40): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+32 more)

### Community 3 - "data.ts"
Cohesion: 0.07
Nodes (48): Agent setup, BildirimAyarlariRoute(), keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials() (+40 more)

### Community 4 - "FeedView.tsx"
Cohesion: 0.14
Nodes (15): styles, Tab, expo-router, FilterChip(), Segmented(), DAYS_TR, digestDateLine(), DigestView() (+7 more)

### Community 5 - "server.ts"
Cohesion: 0.06
Nodes (31): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, pdfDurumu, pendingSummary(), recentPushLog(), app (+23 more)

### Community 6 - "firebase.ts"
Cohesion: 0.18
Nodes (23): Veri: kim neyi okuyor, kim yazıyor, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, 4.1 Okuma ve durum, Dosyalar, loadProfile(), fetchContent() (+15 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.15
Nodes (24): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, Bu turda **bilerek** düzeltilmeyenler, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs() (+16 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.10
Nodes (32): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+24 more)

### Community 9 - "esc"
Cohesion: 0.10
Nodes (41): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+33 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (38): author, bugs, url, description, license, main, name, overrides (+30 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "supabase/repositories.ts"
Cohesion: 0.09
Nodes (44): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+36 more)

### Community 14 - "check-gundem.ts"
Cohesion: 0.14
Nodes (12): blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS, ok (+4 more)

### Community 15 - "mock/repositories.ts"
Cohesion: 0.09
Nodes (37): src_gundem_data_access_mock_mapper_isaftercursor, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1, EnrichmentRepository, EnrichmentRepositoryV1, FeedRepository (+29 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.11
Nodes (41): moveBy(), placeAt(), sameMembers(), ACCEPTED_TYPES, bucketName(), deleteFolder(), deletePhotos(), FOLDERS (+33 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+27 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.19
Nodes (17): NOW, TODAY, delay(), isBudget(), readWarmBudget(), useEnrichmentWarmup(), writeWarmBudget(), emptyBudget() (+9 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (25): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+17 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.12
Nodes (26): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+18 more)

### Community 21 - "ui.tsx"
Cohesion: 0.08
Nodes (32): styles, SplashRoute(), styles, styles, OnboardingRoute(), styles, styles, TabBarProps (+24 more)

### Community 22 - "accountSchema.ts"
Cohesion: 0.19
Nodes (21): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), SignupRoute(), ageOn(), DateParts, FieldErrors, formatPhone(), isValidSignup() (+13 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "useEnrichmentWarmup.test.tsx"
Cohesion: 0.22
Nodes (6): queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY

### Community 25 - "auth.ts"
Cohesion: 0.14
Nodes (22): LoginRoute(), HesapSilRoute(), CertificatesRoute(), firebase, Profile, authErrorMessage(), currentUser(), deletionDone() (+14 more)

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
Nodes (24): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+16 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.20
Nodes (9): Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root, rulesBlock() (+1 more)

### Community 31 - "QueryProvider.tsx"
Cohesion: 0.26
Nodes (12): @tanstack/query-async-storage-persister, @tanstack/react-query-persist-client, QUERY_KEY_VERSION, asyncStorageFromKv(), CACHE_BUSTER, capPersistedFeed(), MAX_CACHE_AGE_MS, MAX_PERSISTED_FEED_ARTICLES (+4 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (18): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+10 more)

### Community 33 - "kv.ts"
Cohesion: 0.13
Nodes (15): From the 1.1.0 release, expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16() (+7 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.08
Nodes (23): inputToForm(), broken, built, capped, dayBefore, EV1, EV1_INPUT, later (+15 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 37 - "@testing-library/react-native"
Cohesion: 0.13
Nodes (15): GundemRoute(), isTab(), @tanstack/react-query, @testing-library/react-native, clients, METRICS, mount(), createQueryClient() (+7 more)

### Community 38 - "eventSchema.ts"
Cohesion: 0.13
Nodes (22): ArchiveCard(), EventFact, buildEvent(), BuildResult, daysInMonth(), EVENT_CATEGORIES, EventInput, LOCAL_OFFSET (+14 more)

### Community 39 - "qr.ts"
Cohesion: 0.13
Nodes (25): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, QrTanimi (+17 more)

### Community 40 - "ref_node_path"
Cohesion: 0.33
Nodes (7): csvCell(), RFC-4180, ref_node_path, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "(tabs)/index.tsx"
Cohesion: 0.10
Nodes (30): SponsorRoute(), styles, SponsorsRoute(), styles, HomeRoute(), styles, styles, TakvimRoute() (+22 more)

### Community 42 - "src/otp.ts"
Cohesion: 0.24
Nodes (13): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), digits(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir() (+5 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 45 - "PixelTxt"
Cohesion: 0.13
Nodes (21): Conventions, RaffleRulesRoute(), styles, Kurallar ve tuzaklar, Global Constraints, Task 4: Tam ekran görüntüleyici, Global Constraints, RaffleNotice() (+13 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.11
Nodes (15): 2. Yeni testler, 3. Karşılaştırma: aynı testler eski koda karşı, 5. Testin kendisinden çıkan dersler, 6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, ref_node_os, assert() (+7 more)

### Community 48 - "sponsors.tsx"
Cohesion: 0.06
Nodes (45): Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 1: `src/vitrinCache.ts`, Task 2: Hook'lar ve ana sayfa kopyayla açılıyor, Task 3: Adım 1'i kapat (+37 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.14
Nodes (21): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+13 more)

### Community 51 - "store.tsx"
Cohesion: 0.17
Nodes (14): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState (+6 more)

### Community 52 - "QrRoute"
Cohesion: 0.26
Nodes (9): QrRoute(), @react-native-async-storage/async-storage, yoklamaMesaji(), bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), QrOkuma, taramaKarari (+1 more)

### Community 53 - "clubCalendar"
Cohesion: 0.36
Nodes (7): clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW

### Community 54 - "react"
Cohesion: 0.16
Nodes (9): Task 12: "Ödülü sağlayan" — `PrizeProviders`, react, PrizeProviders(), styles, METRICS, mockAuth, fits(), HostNode (+1 more)

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
Cohesion: 0.27
Nodes (7): GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), CONFIG, ArticleSummary

### Community 59 - "integration.test.tsx"
Cohesion: 0.22
Nodes (5): clients, fakePostgrest(), Filters, parseKeyset(), wrapper()

### Community 60 - "notifications.tsx"
Cohesion: 0.16
Nodes (13): expo-constants, expo-device, expo-notifications, DeviceRecord, ensureAndroidChannel(), NotificationSync(), requestPushToken(), rescheduleReminders() (+5 more)

### Community 61 - "todayLocal"
Cohesion: 0.18
Nodes (13): saveEventWithPhotos(), today(), Klasörler, Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım) (+5 more)

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 64 - "env.ts"
Cohesion: 0.22
Nodes (10): AppEnv, DATA_MODES, DataMode, defaultDataModeFor(), IS_DEV, isDataMode(), RawEnv, ResolvedMode (+2 more)

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "qrSchema.ts"
Cohesion: 0.22
Nodes (13): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, toLocalIso(), defaultWindow(), isEventId(), isQrToken(), pad(), parseQrPayload(), Pencere (+5 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "duyuru/[id].tsx"
Cohesion: 0.24
Nodes (8): AnnouncementRoute(), styles, AnnouncementRow(), Announcement, src_announcements_announcement, src_announcements_fetchannouncement, formatAnnouncementDate(), RichText()

### Community 69 - "HomeSlider"
Cohesion: 0.29
Nodes (9): Galeri, yenileme göstergesi, karşılama — uygulama planı, Review Focus, Task 3: Yakınlaştırılabilir görsel, Task 5: Otomatik kaydırma ortak hook'a, Task 6: Hero slider ve etkinlik detayı, Task 7: Kapanış, 1. Galeri, HomeSlider() (+1 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "REPOSITORY_CONTRACT_VERSION"
Cohesion: 0.17
Nodes (12): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), REPOSITORY_CONTRACT_VERSION, createUnconfiguredRepositories(), Article, ARTICLES (+4 more)

### Community 72 - "enrichment-unavailable.test.tsx"
Cohesion: 0.14
Nodes (19): RFC-3986, createMockRepositories(), mockArticles(), NO_CONTENT_ARTICLE, createMockDigestRepository(), createMockEnrichmentRepository(), createMockFeedRepository(), createMockSourceRepository() (+11 more)

### Community 74 - "4. Uygulama"
Cohesion: 0.10
Nodes (20): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler (+12 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.17
Nodes (27): Dosya haritası, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 1: Ortak şema — `src/vitrinSchema.ts`, Task 3: Panel sıralaması — `admin/ordering.ts`, Task 5: Panel görünümü — `admin/vitrinView.ts`, menü, CSS, Task 7: Tema, `PhotoSlot`, iletişim adresi, 5.4 Sunucu, 7. Test ve kontroller (+19 more)

### Community 79 - "theme.ts"
Cohesion: 0.14
Nodes (32): styles, styles, styles, styles, styles, BOS, styles, Durum (+24 more)

### Community 80 - "admin/certificates.ts"
Cohesion: 0.08
Nodes (31): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+23 more)

### Community 81 - "notificationPlan.ts"
Cohesion: 0.21
Nodes (11): DIGEST_HOURS, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), QUIET_END_HOUR, QUIET_START_HOUR (+3 more)

### Community 82 - "gate.ts"
Cohesion: 0.29
Nodes (8): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW

### Community 83 - "app/_layout.tsx"
Cohesion: 0.22
Nodes (6): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar, AuthProvider()

### Community 84 - "Galeri, yenileme göstergesi, karşılama — tasarım"
Cohesion: 0.25
Nodes (8): Task 2: PixelLoader'lı yenileme göstergesi, 2. Yenileme göstergesi, 3. Karşılama, 4. iOS'ta giriş yapmadan arşiv — değerlendirme, 6. Dağıtım yüzeyleri, 7. Reddedilenler, Galeri, yenileme göstergesi, karşılama — tasarım, PixelLoader()

### Community 85 - "announcements.tsx"
Cohesion: 0.15
Nodes (14): 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli, fetchAnnouncement(), getJson() (+6 more)

### Community 86 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.25
Nodes (7): Dağıtım yüzeyleri, Git, İçerik girişi, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar

### Community 87 - "attendance.ts"
Cohesion: 0.43
Nodes (5): YoklamaHatasi, YoklamaSonucu, yoklamaVarMi(), yoklamaVer(), attendanceId()

### Community 88 - "KOÜ Yazılım Kulübü — agent notes"
Cohesion: 0.33
Nodes (5): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules

### Community 89 - "Mağazaya çıkarma"
Cohesion: 0.33
Nodes (6): Build'e hangi değerler giriyor, İkonlar ve mağaza görselleri, Mağazaya çıkarma, "Otomatik artsın" isteniyorsa, Sürüm ne zaman elle artırılır, Sürüm numaraları

### Community 91 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 92 - "firstName"
Cohesion: 0.50
Nodes (4): Task 1: Adla karşılama, 5. Test, firstName(), trim()

### Community 93 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

### Community 94 - "Görseller"
Cohesion: 0.67
Nodes (3): Görseller, Kurulum, Neden Firebase Storage değil

## Knowledge Gaps
- **647 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+642 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 793 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `data.ts`, `FeedView.tsx`, `firebase.ts`, `data-access/hooks.ts`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `ui.tsx`, `useEnrichmentWarmup.test.tsx`, `QueryProvider.tsx`, `@testing-library/react-native`, `(tabs)/index.tsx`, `PixelTxt`, `sponsors.tsx`, `store.tsx`, `integration.test.tsx`, `notifications.tsx`, `duyuru/[id].tsx`, `enrichment-unavailable.test.tsx`, `article-summary.test.tsx`, `theme.ts`, `app/_layout.tsx`, `announcements.tsx`, `home-slider.test.tsx`?**
  _High betweenness centrality (0.157) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `REPOSITORY_CONTRACT_VERSION`, `ref_node_path`, `enrichment-unavailable.test.tsx`, `mock/repositories.ts`, `demo-account.ts`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `ClubEvent` connect `vitrinSchema.ts` to `push.ts`, `check-event-schema.ts`, `data.ts`, `server.ts`, `eventSchema.ts`, `firebase.ts`, `(tabs)/index.tsx`, `vitrin.ts`, `notificationPlan.ts`, `Yönetim paneli`, `notifications.tsx`, `2. Fikrin değerlendirmesi — zayıf noktalar`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _647 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08735150244584207 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04382284382284382 - nodes in this community are weakly interconnected._