# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 218 files · ~287,220 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1946 nodes · 5081 edges · 83 communities (77 shown, 6 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 360 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `97374ada`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- auth.ts
- ui.tsx
- server.ts
- supabase/repositories.ts
- mock/repositories.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- Dosya haritası
- env.ts
- admin/certificates.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- hesap.tsx
- devDependencies
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
- enrichment-unavailable.test.tsx
- Load-bearing decisions — the why log
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- kayit-ol.tsx
- QueryProvider.tsx
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- accountApi.ts
- Firebase
- firebase.ts
- store.tsx
- types.ts
- data.ts
- Txt
- eventSchema.ts
- sync-deps.mjs
- ref_node_fs
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- translateApi.ts
- make-icons.py
- accountSchema.ts
- photos.ts
- check-release.mjs
- clubCalendar
- Doğrulama ve teklik — plan ve kurulum
- check-bundle.mjs
- export-registrations.ts
- README.md
- useFallbackTranslation.ts
- announcements.tsx
- qr.ts
- ref_node_path
- src/otp.ts
- byOrder
- notificationsView.ts
- readingText.ts
- qrSchema.ts
- tsconfig.json
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- allowScripts
- notification-sync.test.tsx
- parseSourceUrl
- session-start.sh
- taramaKarari
- article-summary.test.tsx
- 4. Uygulama
- repository
- bugs
- overrides
- integration.test.tsx

## God Nodes (most connected - your core abstractions)
1. `react` - 59 edges
2. `react-native` - 42 edges
3. `Txt()` - 39 edges
4. `esc()` - 37 edges
5. `colors` - 37 edges
6. `Load-bearing decisions — the why log` - 37 edges
7. `Dosya haritası` - 36 edges
8. `expo-router` - 32 edges
9. `page()` - 31 edges
10. `useContent()` - 31 edges

## Surprising Connections (you probably didn't know these)
- `Review Focus` --references--> `sameMembers()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/ordering.ts
- `Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı` --references--> `PhotoUploadError`  [INFERRED]
  AGENTS.md → admin/photos.ts
- `Fazlar` --references--> `storage()`  [INFERRED]
  docs/ai-gundem-port.md → admin/photos.ts
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları` --references--> `tohum()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → scripts/check-rules.mjs

## Import Cycles
- None detected.

## Communities (83 total, 6 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.06
Nodes (62): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+54 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (25): makeBelgeNo(), publishCertificates(), archive, b64, decision, escaped, escapedList, fresh (+17 more)

### Community 2 - "check-security.ts"
Cohesion: 0.09
Nodes (25): AuthLike, clientIp(), CLOUDFLARE, cookieHeader(), guvenilenEs, iptalEdilen, issueToken(), LOGIN_LOCK_MS (+17 more)

### Community 3 - "auth.ts"
Cohesion: 0.09
Nodes (39): HesapSilRoute(), CertificatesRoute(), Veri: kim neyi okuyor, kim yazıyor, Dosyalar, firebase, normalizeEmail(), Profile, toProfile() (+31 more)

### Community 4 - "ui.tsx"
Cohesion: 0.09
Nodes (49): Conventions, styles, styles, styles, styles, styles, Tab, Task 9: Slider bileşeni — `src/components/HomeSlider.tsx` (+41 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (27): uploadEventPhoto(), parsePort(), resolvePort(), app, attempts, authed(), db, formDateTime() (+19 more)

### Community 6 - "supabase/repositories.ts"
Cohesion: 0.12
Nodes (34): @supabase/supabase-js, keysetFilter(), createMockFeedRepository(), createMockSourceRepository(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient() (+26 more)

### Community 7 - "mock/repositories.ts"
Cohesion: 0.09
Nodes (33): getRepositories(), resetRepositories(), src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1 (+25 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.09
Nodes (36): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+28 more)

### Community 9 - "esc"
Cohesion: 0.14
Nodes (29): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), QrTanimi (+21 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.06
Nodes (33): author, description, license, main, name, private, version, expo (+25 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (34): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+26 more)

### Community 13 - "Dosya haritası"
Cohesion: 0.16
Nodes (27): Dosya haritası, Task 11: Sponsor ekranları — `/sponsorlar`, `/sponsor/[id]`, Task 12: "Ödülü sağlayan" — `PrizeProviders`, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 3: Panel sıralaması — `admin/ordering.ts`, Task 7: Tema, `PhotoSlot`, iletişim adresi, 5.4 Sunucu, 7. Test ve kontroller (+19 more)

### Community 14 - "env.ts"
Cohesion: 0.08
Nodes (25): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+17 more)

### Community 15 - "admin/certificates.ts"
Cohesion: 0.08
Nodes (32): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+24 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.14
Nodes (34): moveBy(), placeAt(), sameMembers(), deletePhotos(), announcementChoices(), eventChoices(), Kind, notFound() (+26 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.13
Nodes (23): clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW, TODAY, delay() (+15 more)

### Community 19 - "pdf.ts"
Cohesion: 0.10
Nodes (27): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+19 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "hesap.tsx"
Cohesion: 0.11
Nodes (19): styles, styles, styles, styles, styles, TabBarProps, TABS, react-native-svg (+11 more)

### Community 22 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.10
Nodes (33): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, "Çeviri geç geliyor / hiç gelmiyor" raporundan, Bu turda **bilerek** düzeltilmeyenler, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs() (+25 more)

### Community 25 - "enrichment-unavailable.test.tsx"
Cohesion: 0.17
Nodes (12): src_gundem_data_access_index_repository_contract_version, createMockRepositories(), hasNoContent(), mockDigest(), NO_CONTENT_ARTICLE, createMockDigestRepository(), createMockEnrichmentRepository(), REPOSITORY_CONTRACT_VERSION (+4 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.10
Nodes (21): Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, İşi telefon yaratıyordu, sunucu değil — ve bu defterdeki bir satır yanlıştı (+13 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.08
Nodes (23): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+15 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (24): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+16 more)

### Community 30 - "kayit-ol.tsx"
Cohesion: 0.15
Nodes (27): styles, LoginRoute(), styles, styles, BOS, SignupRoute(), styles, Durum (+19 more)

### Community 31 - "QueryProvider.tsx"
Cohesion: 0.18
Nodes (16): @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, FeedFilter, QUERY_KEY_VERSION, queryKeys, SourceId, asyncStorageFromKv() (+8 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (18): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+10 more)

### Community 33 - "kv.ts"
Cohesion: 0.15
Nodes (13): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+5 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.08
Nodes (27): EventDetailRoute(), initials(), broken, built, capped, dayBefore, EV1, EV1_INPUT (+19 more)

### Community 35 - "accountApi.ts"
Cohesion: 0.09
Nodes (34): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+26 more)

### Community 36 - "Firebase"
Cohesion: 0.33
Nodes (6): Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı

### Community 37 - "firebase.ts"
Cohesion: 0.12
Nodes (23): expo-constants, expo-device, expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-notifications, expo-splash-screen, expo-status-bar (+15 more)

### Community 38 - "store.tsx"
Cohesion: 0.13
Nodes (18): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, styles, GroupLabel(), IconTile(), Toggle(), NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore (+10 more)

### Community 39 - "types.ts"
Cohesion: 0.11
Nodes (26): GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), DigestArticleFacts, DigestItemRow, DigestRow (+18 more)

### Community 40 - "data.ts"
Cohesion: 0.06
Nodes (46): Agent setup, BildirimAyarlariRoute(), keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, SplashRoute(), RegistrationDoneRoute() (+38 more)

### Community 41 - "Txt"
Cohesion: 0.15
Nodes (15): AnnouncementRoute(), styles, AnnouncementRow(), HomeRoute(), styles, Global Constraints, Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme, Announcement (+7 more)

### Community 42 - "eventSchema.ts"
Cohesion: 0.14
Nodes (24): From the 1.1.0 release, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti, QR yoklama — kurulurken çıkanlar, ArchiveCard(), Klasörler, buildEvent(), BuildResult, daysInMonth() (+16 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "ref_node_fs"
Cohesion: 0.36
Nodes (7): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), ref_node_fs, parsed()

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.20
Nodes (14): RaffleRulesRoute(), styles, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB (+6 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "translateApi.ts"
Cohesion: 0.16
Nodes (16): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, Bagimliliklar (+8 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountSchema.ts"
Cohesion: 0.19
Nodes (17): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), ageOn(), DateParts, EMAIL_RE, FieldErrors, isValidSignup(), joinDate() (+9 more)

### Community 51 - "photos.ts"
Cohesion: 0.20
Nodes (17): ACCEPTED_TYPES, bucketName(), deleteEventPhotos(), deleteFolder(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES (+9 more)

### Community 52 - "check-release.mjs"
Cohesion: 0.20
Nodes (9): Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root, rulesBlock() (+1 more)

### Community 53 - "clubCalendar"
Cohesion: 0.36
Nodes (7): clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW

### Community 54 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.12
Nodes (15): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+7 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.12
Nodes (19): ref_node_child_process, ref_node_url, argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN (+11 more)

### Community 56 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 57 - "README.md"
Cohesion: 0.06
Nodes (30): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules, Arşiv paneli, Bildirimler, Build'e hangi değerler giriyor (+22 more)

### Community 58 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 59 - "announcements.tsx"
Cohesion: 0.16
Nodes (15): 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli, fetchAnnouncement(), fetchAnnouncements() (+7 more)

### Community 60 - "qr.ts"
Cohesion: 0.16
Nodes (20): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr() (+12 more)

### Community 61 - "ref_node_path"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_path, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 62 - "src/otp.ts"
Cohesion: 0.24
Nodes (13): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), digits(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir() (+5 more)

### Community 63 - "byOrder"
Cohesion: 0.26
Nodes (14): Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, 2. Kaynak metinden ayrıldığımız yerler, 4.1 Okuma ve durum, fetchContent(), fetchSlides() (+6 more)

### Community 64 - "notificationsView.ts"
Cohesion: 0.29
Nodes (9): ceviriSatiri(), DeviceSummary, LogRow, MailStatus, notificationsPage(), num(), PendingRow, when() (+1 more)

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "qrSchema.ts"
Cohesion: 0.17
Nodes (18): QrRoute(), @react-native-async-storage/async-storage, joinLocal(), LOCAL_OFFSET, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), defaultWindow() (+10 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.29
Nodes (5): 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 69 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.20
Nodes (9): Dağıtım yüzeyleri, Git, İçerik girişi, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Kurallar ve tuzaklar, Stack, Yasaklar (+1 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "notification-sync.test.tsx"
Cohesion: 0.40
Nodes (4): mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs

### Community 72 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.25
Nodes (10): Repositories, clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount() (+2 more)

### Community 78 - "4. Uygulama"
Cohesion: 0.10
Nodes (19): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi (+11 more)

### Community 79 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 83 - "integration.test.tsx"
Cohesion: 0.10
Nodes (18): GundemRoute(), isTab(), @testing-library/react-native, clients, METRICS, mount(), createQueryClient(), QueryProvider() (+10 more)

## Knowledge Gaps
- **615 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+610 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 755 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `ui.tsx` to `auth.ts`, `firebase.ts`, `store.tsx`, `notification-sync.test.tsx`, `data.ts`, `Txt`, `package.json`, `store.ts`, `cekilis-kurallari.tsx`, `article-summary.test.tsx`, `useEnrichmentWarmup.ts`, `integration.test.tsx`, `hesap.tsx`, `data-access/hooks.ts`, `enrichment-unavailable.test.tsx`, `announcements.tsx`, `kayit-ol.tsx`, `QueryProvider.tsx`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `mock/repositories.ts`, `demo-account.ts`, `export-registrations.ts`, `enrichment-unavailable.test.tsx`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Why does `firebase-admin` connect `admin/certificates.ts` to `push.ts`, `check-panel.ts`, `accountApi.ts`, `server.ts`, `package.json`, `vitrin.ts`, `demo-account.ts`, `export-registrations.ts`, `qr.ts`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _615 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06142410015649452 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05128205128205128 - nodes in this community are weakly interconnected._