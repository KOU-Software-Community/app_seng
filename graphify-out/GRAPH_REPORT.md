# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 220 files · ~288,663 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1957 nodes · 5132 edges · 83 communities (80 shown, 3 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 362 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `167d5637`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- notificationsView.ts
- ui.tsx
- server.ts
- supabase/repositories.ts
- types.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- vitrinSchema.ts
- env.ts
- admin/certificates.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- claims.ts
- etkinlik/[id].tsx
- devDependencies
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
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
- Firebase
- content.tsx
- data.ts
- Article
- (tabs)/index.tsx
- eventSchema.ts
- sync-deps.mjs
- ref_node_fs
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- make-icons.py
- auth.ts
- photos.ts
- check-release.mjs
- hermes-safe.test.ts
- check-bundle.mjs
- export-registrations.ts
- README.md
- useFallbackTranslation.ts
- announcements.tsx
- ref_node_path
- hesap.tsx
- firebase.ts
- readingText.ts
- qr.ts
- tsconfig.json
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- allowScripts
- notifications.tsx
- parseSourceUrl
- session-start.sh
- article-summary.test.tsx
- 4. Uygulama
- cursor.ts
- FeedView
- AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar
- feed-screen.test.tsx
- vitrinView.ts
- mail.ts
- src/certificates.ts
- integration.test.tsx
- deploy-rules.mjs
- 5. Panel

## God Nodes (most connected - your core abstractions)
1. `react` - 61 edges
2. `react-native` - 44 edges
3. `Txt()` - 40 edges
4. `colors` - 38 edges
5. `esc()` - 37 edges
6. `Load-bearing decisions — the why log` - 37 edges
7. `Dosya haritası` - 36 edges
8. `expo-router` - 33 edges
9. `page()` - 31 edges
10. `useContent()` - 31 edges

## Surprising Connections (you probably didn't know these)
- `Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı` --references--> `PhotoUploadError`  [INFERRED]
  AGENTS.md → admin/photos.ts
- `Fazlar` --references--> `storage()`  [INFERRED]
  docs/ai-gundem-port.md → admin/photos.ts
- `6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı` --references--> `attendanceRows()`  [INFERRED]
  docs/guvenlik-testleri-degerlendirmesi.md → admin/qr.ts
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`` --references--> `VitrinRow`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/vitrinView.ts

## Import Cycles
- None detected.

## Communities (83 total, 3 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (51): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+43 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (37): decideSend(), kayit(), makeCode(), OTP_MAX_ATTEMPTS, OTP_MAX_SENDS, OTP_RESEND_MS, OTP_SEND_WINDOW_MS, OTP_TTL_MS (+29 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (45): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+37 more)

### Community 3 - "notificationsView.ts"
Cohesion: 0.29
Nodes (9): ceviriSatiri(), DeviceSummary, LogRow, MailStatus, notificationsPage(), num(), PendingRow, when() (+1 more)

### Community 4 - "ui.tsx"
Cohesion: 0.07
Nodes (49): Conventions, styles, styles, styles, styles, ArsivRoute(), styles, styles (+41 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (28): registeredNotPresent(), app, attempts, db, formDateTime(), formToInput(), inputToForm(), keptPhotos() (+20 more)

### Community 6 - "supabase/repositories.ts"
Cohesion: 0.09
Nodes (45): @supabase/supabase-js, FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError(), toNetworkError() (+37 more)

### Community 7 - "types.ts"
Cohesion: 0.13
Nodes (23): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), Repositories, createUnconfiguredRepositories(), DataErrorCode, DataErrorException (+15 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.09
Nodes (26): FEED_URLS, hoursAgoFromLabel(), isoFromLabel(), MOCK_NOW_ISO, MOCK_NOW_MS, NO_CONTENT_ARTICLE, parseSourceMeta(), SITE_URLS (+18 more)

### Community 9 - "esc"
Cohesion: 0.14
Nodes (29): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), QrTanimi (+21 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (41): author, bugs, url, description, license, main, name, overrides (+33 more)

### Community 12 - "store.ts"
Cohesion: 0.21
Nodes (24): useEnabledSources(), useUserSettings(), clearRecentSearches(), DEFAULT_SETTINGS, ensureEnabledSourceIds(), getEnabledSourceIds(), getRead(), getRecentSearches() (+16 more)

### Community 13 - "vitrinSchema.ts"
Cohesion: 0.20
Nodes (15): ClubEvent, Build, https(), idList(), isKicker(), KICKERS, Slide, SlideDoc (+7 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "admin/certificates.ts"
Cohesion: 0.10
Nodes (24): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+16 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.12
Nodes (41): moveBy(), placeAt(), sameMembers(), deleteFolder(), deletePhotos(), announcementChoices(), eventChoices(), Kind (+33 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.14
Nodes (22): clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW, TODAY, delay() (+14 more)

### Community 19 - "pdf.ts"
Cohesion: 0.12
Nodes (24): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+16 more)

### Community 20 - "claims.ts"
Cohesion: 0.13
Nodes (18): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+10 more)

### Community 21 - "etkinlik/[id].tsx"
Cohesion: 0.07
Nodes (41): Agent setup, BildirimAyarlariRoute(), keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials() (+33 more)

### Community 22 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.20
Nodes (20): "Çeviri geç geliyor / hiç gelmiyor" raporundan, GundemArticleRoute(), asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage() (+12 more)

### Community 25 - "mock/repositories.ts"
Cohesion: 0.12
Nodes (25): createMockRepositories(), compareArticles(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, mockArticles(), mockDigest(), mockSources(), createMockDigestRepository() (+17 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.10
Nodes (21): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About (+13 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (22): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+14 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "theme.ts"
Cohesion: 0.14
Nodes (29): styles, LoginRoute(), styles, styles, styles, BOS, styles, Durum (+21 more)

### Community 31 - "QueryProvider.tsx"
Cohesion: 0.18
Nodes (16): Üç ölü parça, üç ayrı ölüm biçimi, @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, QUERY_KEY_VERSION, queryKeys, EnrichmentResponse, asyncStorageFromKv() (+8 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (20): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+12 more)

### Community 33 - "kv.ts"
Cohesion: 0.14
Nodes (13): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+5 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "accountApi.ts"
Cohesion: 0.13
Nodes (24): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+16 more)

### Community 36 - "Firebase"
Cohesion: 0.40
Nodes (5): Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı

### Community 37 - "content.tsx"
Cohesion: 0.11
Nodes (18): Task 11: Sponsor ekranları — `/sponsorlar`, `/sponsor/[id]`, Task 12: "Ödülü sağlayan" — `PrizeProviders`, expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar, ContentSource (+10 more)

### Community 38 - "data.ts"
Cohesion: 0.09
Nodes (23): ACCOUNT_DELETE_URL, ARCHIVE_CATEGORIES, DEPARTMENTS, DIGEST_HOURS, LEGAL_BASE, NOTIFICATION_CATEGORIES, NotificationCategory, ONBOARDING (+15 more)

### Community 39 - "Article"
Cohesion: 0.13
Nodes (12): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, bodyFor(), Segment, segmentState(), DigestRepositoryV1, EnrichmentRepositoryV1, FeedRepositoryV1 (+4 more)

### Community 41 - "(tabs)/index.tsx"
Cohesion: 0.09
Nodes (30): AnnouncementRoute(), AnnouncementRow(), HomeRoute(), styles, GridView(), ListView(), styles, TakvimRoute() (+22 more)

### Community 42 - "eventSchema.ts"
Cohesion: 0.14
Nodes (22): ArchiveCard(), EventFact, buildEvent(), BuildResult, daysInMonth(), EVENT_CATEGORIES, EventInput, MAX_PHOTOS (+14 more)

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

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "auth.ts"
Cohesion: 0.09
Nodes (44): processDeletion(), Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, HesapSilRoute(), DateFields(), arg(), Girdi, girdiOku(), has() (+36 more)

### Community 51 - "photos.ts"
Cohesion: 0.21
Nodes (16): ACCEPTED_TYPES, bucketName(), deleteEventPhotos(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage() (+8 more)

### Community 52 - "check-release.mjs"
Cohesion: 0.20
Nodes (9): Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root, rulesBlock() (+1 more)

### Community 53 - "hermes-safe.test.ts"
Cohesion: 0.26
Nodes (10): GundemRoute(), isTab(), clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr() (+2 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

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
Cohesion: 0.23
Nodes (9): 3.3 Ayrıştırma ve doğrulama, fetchAnnouncement(), getJson(), toAnnouncement(), unwrapList(), AnnouncementsProvider(), AnnouncementsValue, Ctx (+1 more)

### Community 61 - "ref_node_path"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_path, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 62 - "hesap.tsx"
Cohesion: 0.17
Nodes (19): VerifyRoute(), SignupRoute(), ResetPasswordRoute(), HesapRoute(), OgrenciNo(), styles, digits(), formatPhone() (+11 more)

### Community 63 - "firebase.ts"
Cohesion: 0.23
Nodes (22): From the 1.1.0 release, Veri: kim neyi okuyor, kim yazıyor, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, 2. Kaynak metinden ayrıldığımız yerler, 4.1 Okuma ve durum, Dosyalar, ContentProvider() (+14 more)

### Community 65 - "readingText.ts"
Cohesion: 0.57
Nodes (5): readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "qr.ts"
Cohesion: 0.05
Nodes (55): ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr(), setQrWindow() (+47 more)

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

### Community 71 - "notifications.tsx"
Cohesion: 0.13
Nodes (20): Bildirim gelmedi, nereye bakılır, expo-constants, expo-device, expo-notifications, DeviceRecord, applyQuietHours(), DIGEST_CATEGORY, isDigestHour() (+12 more)

### Community 72 - "parseSourceUrl"
Cohesion: 0.31
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 78 - "4. Uygulama"
Cohesion: 0.11
Nodes (18): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli (+10 more)

### Community 79 - "cursor.ts"
Cohesion: 0.22
Nodes (13): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), keysetFilter(), utf8Bytes() (+5 more)

### Community 80 - "FeedView"
Cohesion: 0.20
Nodes (12): Bu turda **bilerek** düzeltilmeyenler, P9 — grafiğe dayalı temizlik turu (2026-09-02), hasSummary(), GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched() (+4 more)

### Community 81 - "AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar"
Cohesion: 0.26
Nodes (12): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), SavedView(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), MAX_RECENT_SEARCHES (+4 more)

### Community 83 - "feed-screen.test.tsx"
Cohesion: 0.13
Nodes (14): @testing-library/react-native, clients, METRICS, mount(), createQueryClient(), QueryProvider(), clients, KEY (+6 more)

### Community 84 - "vitrinView.ts"
Cohesion: 0.26
Nodes (12): choiceOptions(), ChoiceRow, COPY, deleteForm(), imageBlock(), moveForm(), positionOptions(), slideForm() (+4 more)

### Community 86 - "mail.ts"
Cohesion: 0.22
Nodes (9): initMail(), Mail, MailConfig, MailEki, MailEnv, mailFrom(), MailResult, readMailConfig() (+1 more)

### Community 87 - "src/certificates.ts"
Cohesion: 0.24
Nodes (8): CertificatesRoute(), firebase, sertifikalarimiGetir(), Sertifikam, sertifikaPdfUrl(), sertifikaUrl(), COLLECTIONS, firebase/auth

### Community 88 - "integration.test.tsx"
Cohesion: 0.22
Nodes (5): clients, fakePostgrest(), Filters, parseKeyset(), wrapper()

### Community 89 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 90 - "5. Panel"
Cohesion: 0.40
Nodes (5): 5.1 Menü, 5.2 Liste sayfası, 5.5 Süresi dolan slaytları silen zamanlayıcı, 5.6 Görünüm, 5. Panel

## Knowledge Gaps
- **617 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+612 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 762 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `ui.tsx` to `package.json`, `store.ts`, `vitrinSchema.ts`, `useEnrichmentWarmup.ts`, `etkinlik/[id].tsx`, `data-access/hooks.ts`, `mock/repositories.ts`, `theme.ts`, `QueryProvider.tsx`, `content.tsx`, `data.ts`, `(tabs)/index.tsx`, `cekilis-kurallari.tsx`, `auth.ts`, `announcements.tsx`, `hesap.tsx`, `notifications.tsx`, `article-summary.test.tsx`, `feed-screen.test.tsx`, `integration.test.tsx`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `types.ts`, `auth.ts`, `export-registrations.ts`, `mock/repositories.ts`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `Load-bearing decisions — the why log` connect `Load-bearing decisions — the why log` to `push.ts`, `check-security.ts`, `notificationsView.ts`, `accountApi.ts`, `qr.ts`, `Article`, `env.ts`, `admin/certificates.ts`, `AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar`, `auth.ts`, `pdf.ts`, `claims.ts`, `data-access/hooks.ts`, `README.md`, `QueryProvider.tsx`, `firebase.ts`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _617 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08246753246753247 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.045422781271837874 - nodes in this community are weakly interconnected._