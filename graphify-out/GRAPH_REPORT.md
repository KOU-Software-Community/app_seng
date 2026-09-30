# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 231 files · ~295,993 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2021 nodes · 5372 edges · 87 communities (81 shown, 6 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 409 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4808541f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- etkinlik/[id].tsx
- ui.tsx
- server.ts
- translateApi.ts
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
- supabase/mapper.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- announcements.tsx
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
- hesap.tsx
- eventSchema.ts
- qr.ts
- export-registrations.ts
- (tabs)/index.tsx
- ref_node_fs
- sync-deps.mjs
- Vitrin önbelleği — uygulama planı
- react-native-safe-area-context
- html.ts
- check-rules.mjs
- sponsors.tsx
- make-icons.py
- accountApi.ts
- Dosya haritası
- taramaKarari
- supabase-repositories.test.ts
- FeedView.tsx
- check-bundle.mjs
- ref_node_path
- README.md
- types.ts
- @testing-library/react-native
- firebase.ts
- vitrinView.ts
- repository
- mail.ts
- notificationsView.ts
- readingText.ts
- QrRoute
- tsconfig.json
- vitrin-cache.test.tsx
- qrSchema.ts
- allowScripts
- certificate.ts
- parseSourceUrl
- session-start.sh
- 4. Uygulama
- article-summary.test.tsx
- vitrinSchema.ts
- theme.ts
- admin/certificates.ts
- data.ts
- Vitrin önbelleği — tasarım
- bugs
- overrides
- Sponsorlar ve ana sayfa slider'ı — tasarım
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)

## God Nodes (most connected - your core abstractions)
1. `react` - 68 edges
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

## Communities (87 total, 6 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.06
Nodes (63): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+55 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (38): parsePort(), resolvePort(), QR yoklama — kurulurken çıkanlar, archive, b64, cagir(), claimDb(), claimDb2() (+30 more)

### Community 2 - "check-security.ts"
Cohesion: 0.09
Nodes (25): AuthLike, clientIp(), CLOUDFLARE, cookieHeader(), guvenilenEs, iptalEdilen, issueToken(), LOGIN_LOCK_MS (+17 more)

### Community 3 - "etkinlik/[id].tsx"
Cohesion: 0.18
Nodes (16): keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials(), styles, RegistrationDoneRoute() (+8 more)

### Community 4 - "ui.tsx"
Cohesion: 0.08
Nodes (43): Conventions, styles, styles, styles, ArsivRoute(), styles, styles, Tab (+35 more)

### Community 5 - "server.ts"
Cohesion: 0.06
Nodes (34): attendanceRows(), registeredNotPresent(), zamanMetni(), app, attempts, authed(), db, formDateTime() (+26 more)

### Community 6 - "translateApi.ts"
Cohesion: 0.16
Nodes (16): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, Bagimliliklar (+8 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.20
Nodes (20): "Çeviri geç geliyor / hiç gelmiyor" raporundan, Bu turda **bilerek** düzeltilmeyenler, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage() (+12 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.07
Nodes (35): isAfterCursor(), cursorOfArticle(), FEED_URLS, hasNoContent(), hoursAgoFromLabel(), isoFromLabel(), MOCK_NOW_ISO, MOCK_NOW_MS (+27 more)

### Community 9 - "esc"
Cohesion: 0.15
Nodes (27): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), YoklamaSatiri (+19 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (41): author, description, license, main, name, private, version, expo (+33 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "data-access/index.ts"
Cohesion: 0.10
Nodes (37): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), createMockRepositories(), mockArticles(), createMockDigestRepository(), createMockEnrichmentRepository() (+29 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "supabase/repositories.ts"
Cohesion: 0.14
Nodes (23): src_gundem_data_access_mock_mapper_isaftercursor, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1, EnrichmentRepository, EnrichmentRepositoryV1, FeedRepository (+15 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.11
Nodes (44): moveBy(), placeAt(), sameMembers(), ACCEPTED_TYPES, bucketName(), deleteFolder(), deletePhotos(), FOLDERS (+36 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.13
Nodes (23): clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW, TODAY, delay() (+15 more)

### Community 19 - "pdf.ts"
Cohesion: 0.16
Nodes (14): bas(), FONT_DIR, FONT_DOSYALARI, fontlariGom(), fontTabani(), PDF_SIRA_SINIRI, pdfDurumu, PdfIsi (+6 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "Pixel.tsx"
Cohesion: 0.11
Nodes (18): SplashRoute(), styles, styles, OnboardingRoute(), styles, styles, TabBarProps, TABS (+10 more)

### Community 22 - "supabase/mapper.ts"
Cohesion: 0.15
Nodes (19): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, ceviriDurumu(), DigestArticleFacts, DigestItemRow, DigestRow, FEED_COLUMNS, isDigit(), isLetter() (+11 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "announcements.tsx"
Cohesion: 0.18
Nodes (14): announcementChoices(), AnnouncementRoute(), AnnouncementRow(), 3.3 Ayrıştırma ve doğrulama, fetchAnnouncement(), fetchAnnouncements(), getJson(), toAnnouncement() (+6 more)

### Community 25 - "auth.ts"
Cohesion: 0.05
Nodes (75): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, VerifyRoute(), LoginRoute(), HesapSilRoute(), DateFields(), SignupRoute(), CertificatesRoute(), ResetPasswordRoute() (+67 more)

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
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.15
Nodes (11): Güvenlik taraması — sekiz sessiz delik ve kapatılmayan ikisi, Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root (+3 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.09
Nodes (29): Üç ölü parça, üç ayrı ölüm biçimi, @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, FeedFilter, QUERY_KEY_VERSION, queryKeys, EnrichmentResponse (+21 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (20): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+12 more)

### Community 33 - "kv.ts"
Cohesion: 0.15
Nodes (11): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+3 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 37 - "hesap.tsx"
Cohesion: 0.10
Nodes (24): Agent setup, RegistrationRoute(), Durum, styles, styles, HesapRoute(), styles, EventRow() (+16 more)

### Community 38 - "eventSchema.ts"
Cohesion: 0.15
Nodes (21): ArchiveCard(), buildEvent(), BuildResult, daysInMonth(), EVENT_CATEGORIES, EventInput, MAX_PHOTOS, MonthGrid (+13 more)

### Community 39 - "qr.ts"
Cohesion: 0.23
Nodes (14): ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, QrTanimi, regenerateQr() (+6 more)

### Community 40 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "(tabs)/index.tsx"
Cohesion: 0.11
Nodes (22): SponsorRoute(), styles, styles, styles, Task 9: Slider bileşeni — `src/components/HomeSlider.tsx`, 4.2 Ana sayfa (`app/(tabs)/index.tsx`), 4.4 `/sponsor/[id]` (`app/sponsor/[id].tsx`), expo-linear-gradient (+14 more)

### Community 42 - "ref_node_fs"
Cohesion: 0.36
Nodes (7): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), ref_node_fs, parsed()

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "Vitrin önbelleği — uygulama planı"
Cohesion: 0.25
Nodes (7): Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 3: Adım 1'i kapat, Task 4: expo-image ve sürüm 1.1.6, Vitrin önbelleği — uygulama planı

### Community 45 - "react-native-safe-area-context"
Cohesion: 0.19
Nodes (15): RaffleRulesRoute(), styles, react-native-safe-area-context, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE (+7 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.11
Nodes (15): 1. Mevcut testler ne ölçüyordu, 2. Yeni testler, 3. Karşılaştırma: aynı testler eski koda karşı, 5. Testin kendisinden çıkan dersler, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, ref_node_os, assert() (+7 more)

### Community 48 - "sponsors.tsx"
Cohesion: 0.16
Nodes (21): 2. Kaynak metinden ayrıldığımız yerler, Task 2: Hook'lar ve ana sayfa kopyayla açılıyor, 1. Sorun, 3.2 Hook ve sağlayıcı, useSlides(), Ctx, SponsorsProvider(), SponsorsValue (+13 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.10
Nodes (33): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+25 more)

### Community 51 - "Dosya haritası"
Cohesion: 0.17
Nodes (24): HomeRoute(), Veri: kim neyi okuyor, kim yazıyor, Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme, Task 11: Sponsor ekranları — `/sponsorlar`, `/sponsor/[id]`, Task 12: "Ödülü sağlayan" — `PrizeProviders` (+16 more)

### Community 53 - "supabase-repositories.test.ts"
Cohesion: 0.12
Nodes (22): clubCalendar(), base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), keysetFilter(), utf8Bytes() (+14 more)

### Community 54 - "FeedView.tsx"
Cohesion: 0.18
Nodes (14): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW (+6 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.12
Nodes (19): ref_node_child_process, ref_node_url, argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN (+11 more)

### Community 56 - "ref_node_path"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_path, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 57 - "README.md"
Cohesion: 0.06
Nodes (30): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules, Arşiv paneli, Bildirimler, Build'e hangi değerler giriyor (+22 more)

### Community 58 - "types.ts"
Cohesion: 0.10
Nodes (18): GundemArticleRoute(), PANEL_BASE_URL, bodyFor(), hasSummary(), Segment, segmentState(), useFallbackTranslation(), YedekCeviri (+10 more)

### Community 59 - "@testing-library/react-native"
Cohesion: 0.17
Nodes (11): GundemRoute(), isTab(), @testing-library/react-native, clients, METRICS, mount(), todayLineTr(), mockGetExpoPushToken (+3 more)

### Community 60 - "firebase.ts"
Cohesion: 0.15
Nodes (20): From the 1.1.0 release, Klasörler, Bildirim gelmedi, nereye bakılır, ContentProvider(), ContentSource, ContentValue, Ctx, splitByDate() (+12 more)

### Community 61 - "vitrinView.ts"
Cohesion: 0.29
Nodes (11): choiceOptions(), COPY, deleteForm(), formatDay(), imageBlock(), moveForm(), positionOptions(), slideForm() (+3 more)

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "mail.ts"
Cohesion: 0.22
Nodes (9): initMail(), Mail, MailConfig, MailEki, MailEnv, mailFrom(), MailResult, readMailConfig() (+1 more)

### Community 64 - "notificationsView.ts"
Cohesion: 0.29
Nodes (9): ceviriSatiri(), DeviceSummary, LogRow, MailStatus, notificationsPage(), num(), PendingRow, when() (+1 more)

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "QrRoute"
Cohesion: 0.38
Nodes (9): QrRoute(), @react-native-async-storage/async-storage, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId(), isQrToken(), parseQrPayload() (+1 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "vitrin-cache.test.tsx"
Cohesion: 0.20
Nodes (6): SponsorsRoute(), ./firebase, METRICS, Cache, METRICS, Storage

### Community 69 - "qrSchema.ts"
Cohesion: 0.24
Nodes (10): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, LOCAL_OFFSET, defaultWindow(), pad(), QR_ACILIS_SAAT, QR_ALPHABET, QR_TOKEN_LENGTH, qrPayload() (+2 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "certificate.ts"
Cohesion: 0.36
Nodes (8): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), Parola sıfırlama, sertifika ve sunucuda PDF

### Community 72 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "4. Uygulama"
Cohesion: 0.25
Nodes (8): SatirLink(), Task 13: Hesabım — KULÜP grubu, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi, 4. Uygulama

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.15
Nodes (15): @supabase/supabase-js, FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, clients, enrichedRow() (+7 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.19
Nodes (17): Task 1: `src/vitrinCache.ts`, 3.1 `src/vitrinCache.ts` (yeni), 5. Test ve kontroller, ClubEvent, Build, https(), idList(), isKicker() (+9 more)

### Community 79 - "theme.ts"
Cohesion: 0.15
Nodes (21): styles, styles, styles, BOS, styles, styles, 4.3 `/sponsorlar` (`app/sponsorlar.tsx`), Consent() (+13 more)

### Community 80 - "admin/certificates.ts"
Cohesion: 0.09
Nodes (28): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+20 more)

### Community 81 - "data.ts"
Cohesion: 0.08
Nodes (29): BildirimAyarlariRoute(), styles, styles, IconTile(), Toggle(), ACCOUNT_DELETE_URL, DEPARTMENTS, EventFact (+21 more)

### Community 82 - "Vitrin önbelleği — tasarım"
Cohesion: 0.25
Nodes (7): 2. Hedef, 3.3 Ana sayfa (`app/(tabs)/index.tsx`), 3. Adım 1 — liste önbelleği (OTA, 1.1.5), 4. Adım 2 — görseller (mağaza, 1.1.6), 6. Dağıtım yüzeyleri, 7. Reddedilenler, Vitrin önbelleği — tasarım

### Community 85 - "Sponsorlar ve ana sayfa slider'ı — tasarım"
Cohesion: 0.12
Nodes (16): 1. Kapsam, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli, 5.1 Menü, 5.2 Liste sayfası (+8 more)

### Community 86 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.22
Nodes (8): Dağıtım yüzeyleri, Git, İçerik girişi, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Kurallar ve tuzaklar, Stack, Yasaklar

## Knowledge Gaps
- **635 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+630 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 778 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `ui.tsx` to `etkinlik/[id].tsx`, `data-access/hooks.ts`, `package.json`, `store.ts`, `data-access/index.ts`, `useEnrichmentWarmup.ts`, `Pixel.tsx`, `announcements.tsx`, `integration.test.tsx`, `hesap.tsx`, `(tabs)/index.tsx`, `react-native-safe-area-context`, `sponsors.tsx`, `FeedView.tsx`, `@testing-library/react-native`, `firebase.ts`, `vitrin-cache.test.tsx`, `article-summary.test.tsx`, `theme.ts`, `data.ts`?**
  _High betweenness centrality (0.119) - this node is a cross-community bridge._
- **Why does `err()` connect `data-access/index.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `export-registrations.ts`, `article-summary.test.tsx`, `supabase/repositories.ts`, `demo-account.ts`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _635 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05974124809741248 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05410628019323672 - nodes in this community are weakly interconnected._