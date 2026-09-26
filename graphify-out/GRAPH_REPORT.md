# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 223 files · ~289,825 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1967 nodes · 5201 edges · 81 communities (78 shown, 3 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 362 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6a8e3ea8`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- etkinlik/[id].tsx
- ui.tsx
- server.ts
- supabase/repositories.ts
- types.ts
- mock/mapper.ts
- esc
- expo
- package.json
- FeedView.tsx
- vitrinSchema.ts
- env.ts
- qr.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- Pixel.tsx
- devDependencies
- Giriş sistemi, QR yoklama, sertifika — son plan
- enrichment-unavailable.test.tsx
- mock/repositories.ts
- Load-bearing decisions — the why log
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- theme.ts
- QueryProvider.tsx
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- accountApi.ts
- data.ts
- app/_layout.tsx
- store.tsx
- qrSchema.ts
- Doğrulama ve teklik — plan ve kurulum
- react
- eventSchema.ts
- sync-deps.mjs
- credentials.ts
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- 3. Apple ve Google gerçekte ne şart koşuyor
- make-icons.py
- kayit-ol.tsx
- photos.ts
- check-release.mjs
- clubCalendar
- 8. Fazlar
- check-bundle.mjs
- export-registrations.ts
- README.md
- summary-state.test.ts
- (tabs)/index.tsx
- notification-sync.test.tsx
- ref_node_fs
- repository
- firebase.ts
- readingText.ts
- qr.tsx
- tsconfig.json
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- allowScripts
- ClubEvent
- parseSourceUrl
- session-start.sh
- article-summary.test.tsx
- 4. Uygulama
- integration.test.tsx
- vitrinView.ts
- mail.ts
- attendance.ts

## God Nodes (most connected - your core abstractions)
1. `react` - 64 edges
2. `react-native` - 46 edges
3. `Txt()` - 42 edges
4. `colors` - 40 edges
5. `esc()` - 37 edges
6. `Load-bearing decisions — the why log` - 37 edges
7. `Dosya haritası` - 36 edges
8. `expo-router` - 35 edges
9. `useContent()` - 33 edges
10. `page()` - 31 edges

## Surprising Connections (you probably didn't know these)
- `Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı` --references--> `PhotoUploadError`  [INFERRED]
  AGENTS.md → admin/photos.ts
- `Fazlar` --references--> `storage()`  [INFERRED]
  docs/ai-gundem-port.md → admin/photos.ts
- `6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı` --references--> `attendanceRows()`  [INFERRED]
  docs/guvenlik-testleri-degerlendirmesi.md → admin/qr.ts
- `Task 5: Panel görünümü — `admin/vitrinView.ts`, menü, CSS` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/views.ts
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts

## Import Cycles
- None detected.

## Communities (81 total, 3 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (53): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+45 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (41): makeBelgeNo(), publishCertificates(), decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS (+33 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (45): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+37 more)

### Community 3 - "etkinlik/[id].tsx"
Cohesion: 0.12
Nodes (28): Agent setup, BildirimAyarlariRoute(), keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials() (+20 more)

### Community 4 - "ui.tsx"
Cohesion: 0.09
Nodes (34): Conventions, styles, styles, Tab, Kurallar ve tuzaklar, Global Constraints, react-native, PhotoGallery() (+26 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (28): ACCEPTED_TYPES, parsePort(), resolvePort(), registeredNotPresent(), app, attempts, db, formDateTime() (+20 more)

### Community 6 - "supabase/repositories.ts"
Cohesion: 0.09
Nodes (45): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+37 more)

### Community 7 - "types.ts"
Cohesion: 0.15
Nodes (19): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), REPOSITORY_CONTRACT_VERSION, createUnconfiguredRepositories(), DataErrorException, isDataErrorException() (+11 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.09
Nodes (35): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+27 more)

### Community 9 - "esc"
Cohesion: 0.11
Nodes (36): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+28 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (39): author, bugs, url, description, license, main, name, overrides (+31 more)

### Community 12 - "FeedView.tsx"
Cohesion: 0.06
Nodes (71): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, "Çeviri geç geliyor / hiç gelmiyor" raporundan, GundemAraRoute(), Bu turda **bilerek** düzeltilmeyenler, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS (+63 more)

### Community 13 - "vitrinSchema.ts"
Cohesion: 0.25
Nodes (12): Build, https(), idList(), isKicker(), SlideDoc, SponsorDoc, SponsorEventRow, sponsorEvents() (+4 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "qr.ts"
Cohesion: 0.08
Nodes (37): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+29 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.13
Nodes (36): moveBy(), placeAt(), sameMembers(), deletePhotos(), announcementChoices(), eventChoices(), Kind, notFound() (+28 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.14
Nodes (22): clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW, TODAY, delay() (+14 more)

### Community 19 - "pdf.ts"
Cohesion: 0.12
Nodes (24): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+16 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "Pixel.tsx"
Cohesion: 0.11
Nodes (21): styles, styles, OnboardingRoute(), styles, styles, TabBarProps, TABS, expo-linear-gradient (+13 more)

### Community 22 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.12
Nodes (16): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 4.1 Koleksiyonlar, 4.2 Akış, 4.3 Kurallar (şekil), 4. Kimlik ve profil modeli — "eşleştirme", 5.1 Tarayıcı görevlide olmalı, öğrencide değil, 5.2 Çekiliş ayrı bir QR akışı değil (+8 more)

### Community 24 - "enrichment-unavailable.test.tsx"
Cohesion: 0.17
Nodes (14): createMockRepositories(), hasNoContent(), mockArticles(), mockDigest(), NO_CONTENT_ARTICLE, createMockDigestRepository(), createMockEnrichmentRepository(), createMockFeedRepository() (+6 more)

### Community 25 - "mock/repositories.ts"
Cohesion: 0.11
Nodes (23): src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1, EnrichmentRepository, EnrichmentRepositoryV1 (+15 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.12
Nodes (17): Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti, İşi telefon yaratıyordu, sunucu değil — ve bu defterdeki bir satır yanlıştı (+9 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.08
Nodes (23): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+15 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (25): requireAuth(), 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i (+17 more)

### Community 30 - "theme.ts"
Cohesion: 0.14
Nodes (30): styles, styles, styles, styles, styles, styles, styles, styles (+22 more)

### Community 31 - "QueryProvider.tsx"
Cohesion: 0.16
Nodes (17): Üç ölü parça, üç ayrı ölüm biçimi, @tanstack/query-async-storage-persister, @tanstack/react-query-persist-client, FeedFilter, QUERY_KEY_VERSION, queryKeys, EnrichmentResponse, asyncStorageFromKv() (+9 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (18): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+10 more)

### Community 33 - "kv.ts"
Cohesion: 0.15
Nodes (12): Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4(), resetDeviceIdCache() (+4 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "accountApi.ts"
Cohesion: 0.13
Nodes (23): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+15 more)

### Community 36 - "data.ts"
Cohesion: 0.14
Nodes (13): styles, ContentSource, ContentValue, Ctx, ACCOUNT_DELETE_URL, ARCHIVE_CATEGORIES, DEPARTMENTS, EVENTS (+5 more)

### Community 37 - "app/_layout.tsx"
Cohesion: 0.14
Nodes (14): Bildirim gelmedi, nereye bakılır, expo-constants, expo-device, expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-notifications, expo-splash-screen (+6 more)

### Community 38 - "store.tsx"
Cohesion: 0.17
Nodes (14): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState (+6 more)

### Community 39 - "qrSchema.ts"
Cohesion: 0.25
Nodes (11): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, toLocalIso(), defaultWindow(), isQrToken(), pad(), parseQrPayload(), QR_ACILIS_SAAT, QR_ALPHABET (+3 more)

### Community 40 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.14
Nodes (13): 1. Ne zorlanıyor, ne zorlanmıyor, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi, 5. Sertifika şablonu (+5 more)

### Community 41 - "react"
Cohesion: 0.09
Nodes (29): styles, SponsorsRoute(), styles, styles, TakvimRoute(), View_, Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme, Task 9: Slider bileşeni — `src/components/HomeSlider.tsx` (+21 more)

### Community 42 - "eventSchema.ts"
Cohesion: 0.13
Nodes (23): ArchiveCard(), EventFact, buildEvent(), BuildResult, daysInMonth(), EVENT_CATEGORIES, EventInput, joinLocal() (+15 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "credentials.ts"
Cohesion: 0.43
Nodes (6): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), parsed()

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.20
Nodes (14): RaffleRulesRoute(), styles, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB (+6 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "3. Apple ve Google gerçekte ne şart koşuyor"
Cohesion: 0.33
Nodes (6): 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "kayit-ol.tsx"
Cohesion: 0.07
Nodes (56): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, VerifyRoute(), LoginRoute(), HesapSilRoute(), BOS, DateFields(), SignupRoute(), styles (+48 more)

### Community 51 - "photos.ts"
Cohesion: 0.24
Nodes (16): bucketName(), deleteEventPhotos(), deleteFolder(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage() (+8 more)

### Community 52 - "check-release.mjs"
Cohesion: 0.18
Nodes (10): Faz 1 — kimlik altyapısı, UI yok, ref_node_url, failed, json(), pkg, read(), results, root (+2 more)

### Community 53 - "clubCalendar"
Cohesion: 0.36
Nodes (7): clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW

### Community 54 - "8. Fazlar"
Cohesion: 0.33
Nodes (6): 8. Fazlar, Faz 2 — giriş, profil, eşleşmiş kayıt, Faz 3 — hesap silme (mağaza şartı), Faz 4 — QR yoklama ve çekiliş, Faz 5 — sertifika, Yapılmayacaklar

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "export-registrations.ts"
Cohesion: 0.29
Nodes (7): csvCell(), RFC-4180, dotenv, arg(), COLUMNS, loadServiceAccount(), main()

### Community 57 - "README.md"
Cohesion: 0.06
Nodes (30): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules, Arşiv paneli, Bildirimler, Build'e hangi değerler giriyor (+22 more)

### Community 58 - "summary-state.test.ts"
Cohesion: 0.13
Nodes (14): GundemArticleRoute(), PANEL_BASE_URL, bodyFor(), hasSummary(), Segment, segmentState(), useFallbackTranslation(), YedekCeviri (+6 more)

### Community 59 - "(tabs)/index.tsx"
Cohesion: 0.16
Nodes (13): AnnouncementRoute(), styles, AnnouncementRow(), styles, Announcement, src_announcements_announcement, AnnouncementsValue, Ctx (+5 more)

### Community 60 - "notification-sync.test.tsx"
Cohesion: 0.40
Nodes (4): mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs

### Community 61 - "ref_node_fs"
Cohesion: 0.12
Nodes (13): ref_node_child_process, ref_node_fs, ref_node_path, app, OPTIONAL, ortak, panel, root (+5 more)

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "firebase.ts"
Cohesion: 0.12
Nodes (38): From the 1.1.0 release, Klasörler, Veri: kim neyi okuyor, kim yazıyor, Task 12: "Ödülü sağlayan" — `PrizeProviders`, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, 2. Kaynak metinden ayrıldığımız yerler, 4.1 Okuma ve durum (+30 more)

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "qr.tsx"
Cohesion: 0.22
Nodes (13): Durum, QrRoute(), styles, @react-native-async-storage/async-storage, yoklamaMesaji(), YoklamaSonucu, bekleyeniOku(), bekleyeniSil() (+5 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.25
Nodes (6): 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 69 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.25
Nodes (7): Dağıtım yüzeyleri, Git, İçerik girişi, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "ClubEvent"
Cohesion: 0.25
Nodes (10): ClubEvent, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), REMINDER_CATEGORY, reminderOffsetMs() (+2 more)

### Community 72 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.25
Nodes (10): FeedArticleRow, clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount() (+2 more)

### Community 78 - "4. Uygulama"
Cohesion: 0.07
Nodes (31): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar (+23 more)

### Community 83 - "integration.test.tsx"
Cohesion: 0.10
Nodes (18): GundemRoute(), isTab(), @tanstack/react-query, @testing-library/react-native, clients, METRICS, mount(), createQueryClient() (+10 more)

### Community 84 - "vitrinView.ts"
Cohesion: 0.26
Nodes (12): choiceOptions(), COPY, deleteForm(), imageBlock(), moveForm(), positionOptions(), slideForm(), sponsorForm() (+4 more)

### Community 86 - "mail.ts"
Cohesion: 0.22
Nodes (9): initMail(), Mail, MailConfig, MailEki, MailEnv, mailFrom(), MailResult, readMailConfig() (+1 more)

### Community 87 - "attendance.ts"
Cohesion: 0.19
Nodes (13): CertificatesRoute(), firebase, YoklamaHatasi, yoklamaVarMi(), yoklamaVer(), currentUser(), sertifikalarimiGetir(), Sertifikam (+5 more)

## Knowledge Gaps
- **619 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+614 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 766 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `etkinlik/[id].tsx`, `ui.tsx`, `package.json`, `FeedView.tsx`, `useEnrichmentWarmup.ts`, `Pixel.tsx`, `enrichment-unavailable.test.tsx`, `theme.ts`, `QueryProvider.tsx`, `data.ts`, `app/_layout.tsx`, `store.tsx`, `cekilis-kurallari.tsx`, `kayit-ol.tsx`, `(tabs)/index.tsx`, `notification-sync.test.tsx`, `firebase.ts`, `qr.tsx`, `article-summary.test.tsx`, `integration.test.tsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `types.ts`, `demo-account.ts`, `export-registrations.ts`, `mock/repositories.ts`, `enrichment-unavailable.test.tsx`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `ClubEvent` connect `ClubEvent` to `push.ts`, `check-event-schema.ts`, `data.ts`, `server.ts`, `app/_layout.tsx`, `parseSourceUrl`, `react`, `eventSchema.ts`, `vitrinSchema.ts`, `vitrin.ts`, `README.md`, `(tabs)/index.tsx`, `2. Fikrin değerlendirmesi — zayıf noktalar`, `firebase.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _619 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0780399274047187 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.045739348370927316 - nodes in this community are weakly interconnected._