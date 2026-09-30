# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 231 files · ~296,095 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2024 nodes · 5374 edges · 88 communities (82 shown, 6 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 410 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `36987197`
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
- supabase/repositories.ts
- env.ts
- mock/repositories.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- hesap.tsx
- accountSchema.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- (tabs)/index.tsx
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
- src/otp.ts
- eventSchema.ts
- qr.ts
- export-registrations.ts
- takvim.tsx
- ref_node_fs
- sync-deps.mjs
- Vitrin önbelleği — uygulama planı
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- sponsors.tsx
- make-icons.py
- accountApi.ts
- getDb
- taramaKarari
- hermes-safe.test.ts
- photos.ts
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
- qrSchema.ts
- tsconfig.json
- vitrin-cache.test.tsx
- react
- allowScripts
- data-access/index.ts
- enrichment-unavailable.test.tsx
- session-start.sh
- 4. Uygulama
- article-summary.test.tsx
- vitrinSchema.ts
- Txt
- admin/certificates.ts
- data.ts
- Vitrin önbelleği — tasarım
- bugs
- overrides
- announcements.tsx
- todayLocal
- useFallbackTranslation.ts

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
- `Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`` --references--> `VitrinRow`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/vitrinView.ts

## Import Cycles
- None detected.

## Communities (88 total, 6 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.06
Nodes (61): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+53 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.06
Nodes (36): QR yoklama — kurulurken çıkanlar, archive, b64, cagir(), claimDb(), claimDb2(), Data, decision (+28 more)

### Community 2 - "check-security.ts"
Cohesion: 0.09
Nodes (25): AuthLike, clientIp(), CLOUDFLARE, cookieHeader(), guvenilenEs, iptalEdilen, issueToken(), LOGIN_LOCK_MS (+17 more)

### Community 3 - "etkinlik/[id].tsx"
Cohesion: 0.10
Nodes (32): Agent setup, keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials(), styles (+24 more)

### Community 4 - "ui.tsx"
Cohesion: 0.10
Nodes (35): Conventions, styles, styles, styles, Global Constraints, Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme, 4.2 Ana sayfa (`app/(tabs)/index.tsx`), 4.3 `/sponsorlar` (`app/sponsorlar.tsx`) (+27 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (27): parsePort(), resolvePort(), app, attempts, authed(), db, formDateTime(), formToInput() (+19 more)

### Community 6 - "translateApi.ts"
Cohesion: 0.16
Nodes (16): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, Bagimliliklar (+8 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.24
Nodes (17): asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage(), retryPolicy(), unwrap() (+9 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.09
Nodes (34): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+26 more)

### Community 9 - "esc"
Cohesion: 0.15
Nodes (28): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), YoklamaSatiri (+20 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.06
Nodes (34): author, description, license, main, name, private, version, expo (+26 more)

### Community 12 - "store.ts"
Cohesion: 0.10
Nodes (47): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), Bu turda **bilerek** düzeltilmeyenler, P9 — grafiğe dayalı temizlik turu (2026-09-02), GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES (+39 more)

### Community 13 - "supabase/repositories.ts"
Cohesion: 0.13
Nodes (31): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+23 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "mock/repositories.ts"
Cohesion: 0.11
Nodes (27): src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1, EnrichmentRepository, EnrichmentRepositoryV1 (+19 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.16
Nodes (32): moveBy(), placeAt(), sameMembers(), deleteFolder(), deletePhotos(), announcementChoices(), eventChoices(), Kind (+24 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.12
Nodes (24): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW (+16 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (26): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+18 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "hesap.tsx"
Cohesion: 0.10
Nodes (21): styles, styles, OnboardingRoute(), styles, styles, styles, TabBarProps, TABS (+13 more)

### Community 22 - "accountSchema.ts"
Cohesion: 0.19
Nodes (21): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), SignupRoute(), ageOn(), DateParts, FieldErrors, formatPhone(), isValidSignup() (+13 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "(tabs)/index.tsx"
Cohesion: 0.16
Nodes (13): AnnouncementRoute(), styles, AnnouncementRow(), HomeRoute(), styles, react-native, Announcement, src_announcements_announcement (+5 more)

### Community 25 - "auth.ts"
Cohesion: 0.11
Nodes (28): HesapSilRoute(), CertificatesRoute(), 2. Doğrulama neden Firebase'in bağlantısı değil, firebase, Profile, YoklamaHatasi, yoklamaMesaji(), YoklamaSonucu (+20 more)

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
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.15
Nodes (11): Güvenlik taraması — sekiz sessiz delik ve kapatılmayan ikisi, Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root (+3 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.10
Nodes (26): Üç ölü parça, üç ayrı ölüm biçimi, @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, clients, METRICS, mount(), QUERY_KEY_VERSION (+18 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (19): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+11 more)

### Community 33 - "kv.ts"
Cohesion: 0.12
Nodes (15): Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4(), resetDeviceIdCache() (+7 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.14
Nodes (13): 1. Ne zorlanıyor, ne zorlanmıyor, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi, 5. Sertifika şablonu (+5 more)

### Community 37 - "src/otp.ts"
Cohesion: 0.24
Nodes (13): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), digits(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir() (+5 more)

### Community 38 - "eventSchema.ts"
Cohesion: 0.13
Nodes (21): ArchiveCard(), İçerik girişi, EventFact, buildEvent(), BuildResult, daysInMonth(), EventInput, LOCAL_OFFSET (+13 more)

### Community 39 - "qr.ts"
Cohesion: 0.15
Nodes (21): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, QrTanimi (+13 more)

### Community 40 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "takvim.tsx"
Cohesion: 0.10
Nodes (18): SponsorRoute(), styles, GridView(), ListView(), styles, TakvimRoute(), View_, Task 9: Slider bileşeni — `src/components/HomeSlider.tsx` (+10 more)

### Community 42 - "ref_node_fs"
Cohesion: 0.36
Nodes (7): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), ref_node_fs, parsed()

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "Vitrin önbelleği — uygulama planı"
Cohesion: 0.22
Nodes (8): Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 1: `src/vitrinCache.ts`, Task 3: Adım 1'i kapat, Task 4: expo-image ve sürüm 1.1.6, Vitrin önbelleği — uygulama planı

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.19
Nodes (14): RaffleRulesRoute(), styles, styles, PRIVACY_POLICY_URL, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB (+6 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.11
Nodes (15): 1. Mevcut testler ne ölçüyordu, 2. Yeni testler, 3. Karşılaştırma: aynı testler eski koda karşı, 5. Testin kendisinden çıkan dersler, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, ref_node_os, assert() (+7 more)

### Community 48 - "sponsors.tsx"
Cohesion: 0.15
Nodes (23): Task 2: Hook'lar ve ana sayfa kopyayla açılıyor, 1. Sorun, 3.1 `src/vitrinCache.ts` (yeni), 3.2 Hook ve sağlayıcı, 3.3 Ana sayfa (`app/(tabs)/index.tsx`), 3. Adım 1 — liste önbelleği (OTA, 1.1.5), useSlides(), Ctx (+15 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.09
Nodes (34): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+26 more)

### Community 51 - "getDb"
Cohesion: 0.16
Nodes (21): From the 1.1.0 release, Veri: kim neyi okuyor, kim yazıyor, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, 4.1 Okuma ve durum, Bildirimler nereden çıkıyor, Dosyalar, EAS derlemelerinde (+13 more)

### Community 53 - "hermes-safe.test.ts"
Cohesion: 0.26
Nodes (10): GundemRoute(), isTab(), clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr() (+2 more)

### Community 54 - "photos.ts"
Cohesion: 0.21
Nodes (15): ACCEPTED_TYPES, bucketName(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage(), pathFromUrl() (+7 more)

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
Cohesion: 0.09
Nodes (30): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), DigestArticleFacts, DigestItemRow (+22 more)

### Community 59 - "@testing-library/react-native"
Cohesion: 0.20
Nodes (7): @testing-library/react-native, METRICS, mockPush, mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs

### Community 60 - "firebase.ts"
Cohesion: 0.12
Nodes (19): Bildirim gelmedi, nereye bakılır, expo-constants, expo-device, expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-notifications, expo-splash-screen (+11 more)

### Community 61 - "vitrinView.ts"
Cohesion: 0.26
Nodes (12): choiceOptions(), COPY, deleteForm(), imageBlock(), moveForm(), positionOptions(), slideForm(), sponsorForm() (+4 more)

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

### Community 66 - "qrSchema.ts"
Cohesion: 0.16
Nodes (19): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, QrRoute(), @react-native-async-storage/async-storage, joinLocal(), bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), defaultWindow() (+11 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "vitrin-cache.test.tsx"
Cohesion: 0.15
Nodes (9): SponsorsRoute(), ./firebase, METRICS, Cache, { cacheReady }, METRICS, { SponsorsProvider, useSponsors }, Storage (+1 more)

### Community 69 - "react"
Cohesion: 0.17
Nodes (12): styles, Tab, react, PrizeProviders(), styles, Segmented(), DAYS_TR, digestDateLine() (+4 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "data-access/index.ts"
Cohesion: 0.23
Nodes (9): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), createUnconfiguredRepositories(), DataErrorCode, DataErrorException, isDataErrorException() (+1 more)

### Community 72 - "enrichment-unavailable.test.tsx"
Cohesion: 0.11
Nodes (22): RFC-3986, createMockRepositories(), compareArticles(), hasNoContent(), mockArticles(), mockDigest(), NO_CONTENT_ARTICLE, createMockDigestRepository() (+14 more)

### Community 74 - "4. Uygulama"
Cohesion: 0.25
Nodes (8): SatirLink(), Task 13: Hesabım — KULÜP grubu, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi, 4. Uygulama

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.14
Nodes (29): Dosya haritası, Task 11: Sponsor ekranları — `/sponsorlar`, `/sponsor/[id]`, Task 12: "Ödülü sağlayan" — `PrizeProviders`, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 1: Ortak şema — `src/vitrinSchema.ts`, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 3: Panel sıralaması — `admin/ordering.ts`, Task 7: Tema, `PhotoSlot`, iletişim adresi (+21 more)

### Community 79 - "Txt"
Cohesion: 0.14
Nodes (31): styles, LoginRoute(), styles, styles, styles, BOS, styles, Durum (+23 more)

### Community 80 - "admin/certificates.ts"
Cohesion: 0.11
Nodes (24): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+16 more)

### Community 81 - "data.ts"
Cohesion: 0.08
Nodes (28): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, BildirimAyarlariRoute(), styles, GroupLabel(), IconTile(), Toggle(), ACCOUNT_DELETE_URL, ARCHIVE_CATEGORIES (+20 more)

### Community 82 - "Vitrin önbelleği — tasarım"
Cohesion: 0.29
Nodes (6): 2. Hedef, 4. Adım 2 — görseller (mağaza, 1.1.6), 5. Test ve kontroller, 6. Dağıtım yüzeyleri, 7. Reddedilenler, Vitrin önbelleği — tasarım

### Community 85 - "announcements.tsx"
Cohesion: 0.09
Nodes (26): 1. Kapsam, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli, 5.1 Menü (+18 more)

### Community 86 - "todayLocal"
Cohesion: 0.19
Nodes (12): Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, Dağıtım yüzeyleri, Git, Klasörler, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Kurallar ve tuzaklar, Stack (+4 more)

### Community 87 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

## Knowledge Gaps
- **638 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+633 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 781 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `etkinlik/[id].tsx`, `ui.tsx`, `data-access/hooks.ts`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `hesap.tsx`, `(tabs)/index.tsx`, `integration.test.tsx`, `kv.ts`, `takvim.tsx`, `cekilis-kurallari.tsx`, `sponsors.tsx`, `@testing-library/react-native`, `firebase.ts`, `vitrin-cache.test.tsx`, `enrichment-unavailable.test.tsx`, `article-summary.test.tsx`, `Txt`, `data.ts`, `announcements.tsx`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `data-access/index.ts`, `export-registrations.ts`, `enrichment-unavailable.test.tsx`, `mock/repositories.ts`, `demo-account.ts`?**
  _High betweenness centrality (0.090) - this node is a cross-community bridge._
- **Why does `Load-bearing decisions — the why log` connect `Load-bearing decisions — the why log` to `push.ts`, `check-panel.ts`, `check-security.ts`, `store.ts`, `env.ts`, `pdf.ts`, `demo-account.ts`, `accountSchema.ts`, `check-release.mjs`, `integration.test.tsx`, `getDb`, `README.md`, `types.ts`, `notificationsView.ts`, `readingText.ts`, `qrSchema.ts`, `admin/certificates.ts`, `data.ts`, `todayLocal`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _638 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.061569416498993966 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05647840531561462 - nodes in this community are weakly interconnected._