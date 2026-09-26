# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 216 files · ~286,703 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1939 nodes · 5040 edges · 75 communities (72 shown, 3 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 345 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8e369909`
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
- types.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- react
- env.ts
- certificateDelivery.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- Load-bearing decisions — the why log
- react-native
- attendance.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
- edge.ts
- notificationPlan.ts
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- hesap.tsx
- hermes-safe.test.ts
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- accountApi.ts
- getDb
- firebase.ts
- data.ts
- supabase/mapper.ts
- kayit/[id].tsx
- (tabs)/index.tsx
- eventSchema.ts
- sync-deps.mjs
- ref_node_fs
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- translateApi.ts
- make-icons.py
- deploy-rules.mjs
- digest.ts
- check-release.mjs
- todayLocal
- Doğrulama ve teklik — plan ve kurulum
- check-bundle.mjs
- export-registrations.ts
- README.md
- useFallbackTranslation.ts
- admin/certificates.ts
- qr.ts
- ref_node_path
- FeedView.tsx
- qrSchema.ts
- tsconfig.json
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- allowScripts
- parseSourceUrl
- session-start.sh
- QrRoute
- article-summary.test.tsx
- announcements.tsx
- integration.test.tsx

## God Nodes (most connected - your core abstractions)
1. `react` - 57 edges
2. `react-native` - 42 edges
3. `Txt()` - 39 edges
4. `esc()` - 37 edges
5. `colors` - 37 edges
6. `Load-bearing decisions — the why log` - 37 edges
7. `Dosya haritası` - 33 edges
8. `expo-router` - 32 edges
9. `page()` - 31 edges
10. `useContent()` - 31 edges

## Surprising Connections (you probably didn't know these)
- `Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı` --references--> `PhotoUploadError`  [INFERRED]
  AGENTS.md → admin/photos.ts
- `Fazlar` --references--> `storage()`  [INFERRED]
  docs/ai-gundem-port.md → admin/photos.ts
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları` --references--> `tohum()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → scripts/check-rules.mjs
- `Task 7: Tema, `PhotoSlot`, iletişim adresi` --references--> `PhotoSlot()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → src/components/PhotoSlot.tsx

## Import Cycles
- None detected.

## Communities (75 total, 3 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (51): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+43 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (38): decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS, OTP_MAX_SENDS, OTP_RESEND_MS (+30 more)

### Community 2 - "check-security.ts"
Cohesion: 0.07
Nodes (31): attendanceRows(), registeredNotPresent(), zamanMetni(), panelKoku(), qrSayfasi(), clientIp(), CLOUDFLARE, cookieHeader() (+23 more)

### Community 3 - "auth.ts"
Cohesion: 0.22
Nodes (16): normalizeEmail(), Profile, toProfile(), currentUser(), getAuthClient(), loadProfile(), requestAccountDeletion(), signIn() (+8 more)

### Community 4 - "ui.tsx"
Cohesion: 0.10
Nodes (44): Conventions, styles, styles, styles, styles, styles, Tab, styles (+36 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (27): ACCEPTED_TYPES, parsePort(), resolvePort(), app, attempts, authed(), db, formDateTime() (+19 more)

### Community 6 - "supabase/repositories.ts"
Cohesion: 0.11
Nodes (32): @supabase/supabase-js, keysetFilter(), AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, EnrichmentRepository, EnrichmentRepositoryV1, FeedRepository (+24 more)

### Community 7 - "types.ts"
Cohesion: 0.11
Nodes (25): DigestRepositoryV1, FeedRepositoryV1, Repositories, SourceRepositoryV1, createUnconfiguredRepositories(), DataErrorCode, DataErrorException, isDataErrorException() (+17 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.11
Nodes (31): isAfterCursor(), createMockRepositories(), compareArticles(), cursorOfArticle(), FEED_URLS, hasNoContent(), hoursAgoFromLabel(), src_gundem_data_access_mock_mapper_isaftercursor (+23 more)

### Community 9 - "esc"
Cohesion: 0.11
Nodes (37): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+29 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (41): author, bugs, url, description, license, main, name, overrides (+33 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "react"
Cohesion: 0.17
Nodes (16): styles, styles, Durum, styles, styles, react, react-native-safe-area-context, src_announcements_announcement (+8 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "certificateDelivery.ts"
Cohesion: 0.09
Nodes (28): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+20 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.06
Nodes (89): moveBy(), placeAt(), sameMembers(), bucketName(), deleteEventPhotos(), deleteFolder(), deletePhotos(), FOLDERS (+81 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.11
Nodes (25): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW (+17 more)

### Community 19 - "pdf.ts"
Cohesion: 0.13
Nodes (23): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+15 more)

### Community 20 - "Load-bearing decisions — the why log"
Cohesion: 0.05
Nodes (53): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+45 more)

### Community 21 - "react-native"
Cohesion: 0.11
Nodes (22): styles, styles, OnboardingRoute(), styles, styles, TabBarProps, TABS, expo-linear-gradient (+14 more)

### Community 22 - "attendance.ts"
Cohesion: 0.15
Nodes (14): CertificatesRoute(), firebase, YoklamaHatasi, YoklamaSonucu, yoklamaVarMi(), yoklamaVer(), sertifikalarimiGetir(), Sertifikam (+6 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.18
Nodes (20): GundemArticleRoute(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage(), retryPolicy(), unwrap() (+12 more)

### Community 25 - "edge.ts"
Cohesion: 0.11
Nodes (16): env, src_gundem_data_access_index_repository_contract_version, resetRepositories(), callEdgeFunction(), CODE_MAP, EDGE_TIMEOUT_MS, EdgeCallOptions, EdgeConfig (+8 more)

### Community 26 - "notificationPlan.ts"
Cohesion: 0.24
Nodes (10): DIGEST_HOURS, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), REMINDER_CATEGORY, reminderOffsetMs() (+2 more)

### Community 27 - "scripts"
Cohesion: 0.04
Nodes (49): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+41 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.08
Nodes (23): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+15 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (24): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+16 more)

### Community 30 - "hesap.tsx"
Cohesion: 0.08
Nodes (53): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, styles, VerifyRoute(), LoginRoute(), styles, HesapSilRoute(), styles, BOS (+45 more)

### Community 31 - "hermes-safe.test.ts"
Cohesion: 0.31
Nodes (9): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), utf8Bytes(), utf8FromBytes(), Source (+1 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (18): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+10 more)

### Community 33 - "kv.ts"
Cohesion: 0.15
Nodes (13): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+5 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.08
Nodes (26): inputToForm(), EventDetailRoute(), initials(), broken, built, capped, dayBefore, EV1 (+18 more)

### Community 35 - "accountApi.ts"
Cohesion: 0.14
Nodes (21): AuthLike, bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku() (+13 more)

### Community 36 - "getDb"
Cohesion: 0.18
Nodes (19): Veri: kim neyi okuyor, kim yazıyor, 4.1 Okuma ve durum, Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, Dosyalar, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım) (+11 more)

### Community 37 - "firebase.ts"
Cohesion: 0.13
Nodes (20): expo-constants, expo-device, expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-notifications, expo-splash-screen, expo-status-bar (+12 more)

### Community 38 - "data.ts"
Cohesion: 0.09
Nodes (25): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, ACCOUNT_DELETE_URL, ARCHIVE_CATEGORIES, EVENTS, LEGAL_BASE, NOTIFICATION_CATEGORIES, NotificationCategory, OnboardingPage (+17 more)

### Community 39 - "supabase/mapper.ts"
Cohesion: 0.10
Nodes (24): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, bodyFor(), hasSummary(), Segment, segmentState(), ceviriDurumu(), DigestArticleFacts, DigestItemRow (+16 more)

### Community 40 - "kayit/[id].tsx"
Cohesion: 0.12
Nodes (24): Agent setup, BildirimAyarlariRoute(), keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, SplashRoute(), RegistrationDoneRoute() (+16 more)

### Community 41 - "(tabs)/index.tsx"
Cohesion: 0.18
Nodes (11): HomeRoute(), styles, TakvimRoute(), Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme, Task 9: Slider bileşeni — `src/components/HomeSlider.tsx`, 4.2 Ana sayfa (`app/(tabs)/index.tsx`), useAnnouncements(), PhotoSlot() (+3 more)

### Community 42 - "eventSchema.ts"
Cohesion: 0.14
Nodes (21): ArchiveCard(), EventFact, buildEvent(), BuildResult, daysInMonth(), EventInput, LOCAL_OFFSET, MAX_PHOTOS (+13 more)

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
Cohesion: 0.15
Nodes (18): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, loginLimiter() (+10 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 51 - "digest.ts"
Cohesion: 0.33
Nodes (5): DIGEST, DIGEST_DATE, DIGEST_HEADLINE, DIGEST_META, DigestEntry

### Community 52 - "check-release.mjs"
Cohesion: 0.20
Nodes (9): Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root, rulesBlock() (+1 more)

### Community 53 - "todayLocal"
Cohesion: 0.21
Nodes (14): Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, From the 1.1.0 release, Klasörler, Kurallar ve tuzaklar, clubCalendar(), clubHour(), todayLocal(), ABSOLUTE_AFTER_DAYS (+6 more)

### Community 54 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.12
Nodes (15): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+7 more)

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

### Community 59 - "admin/certificates.ts"
Cohesion: 0.16
Nodes (12): BELGE_NO_UZUNLUK, BulunanSertifika, findCertificate(), makeBelgeNo(), publishCertificates(), revokeCertificate(), YayinGirdisi, YayinSonucu (+4 more)

### Community 60 - "qr.ts"
Cohesion: 0.24
Nodes (14): ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr(), setQrWindow() (+6 more)

### Community 61 - "ref_node_path"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_path, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 64 - "FeedView.tsx"
Cohesion: 0.16
Nodes (17): Bu turda **bilerek** düzeltilmeyenler, asDataError(), useFeed(), GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched() (+9 more)

### Community 66 - "qrSchema.ts"
Cohesion: 0.25
Nodes (11): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, defaultWindow(), isQrToken(), pad(), parseQrPayload(), QR_ACILIS_SAAT, QR_ALPHABET, QR_TOKEN_LENGTH (+3 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 69 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.25
Nodes (7): Dağıtım yüzeyleri, Git, İçerik girişi, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 72 - "parseSourceUrl"
Cohesion: 0.31
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "QrRoute"
Cohesion: 0.27
Nodes (9): QrRoute(), @react-native-async-storage/async-storage, yoklamaMesaji(), bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId(), taramaKarari (+1 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 78 - "announcements.tsx"
Cohesion: 0.06
Nodes (37): AnnouncementRoute(), SatirLink(), AnnouncementRow(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama (+29 more)

### Community 83 - "integration.test.tsx"
Cohesion: 0.07
Nodes (34): GundemRoute(), isTab(), @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, @testing-library/react-native, clients, METRICS (+26 more)

## Knowledge Gaps
- **614 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+609 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 754 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `FeedView.tsx`, `auth.ts`, `ui.tsx`, `firebase.ts`, `data.ts`, `kayit/[id].tsx`, `(tabs)/index.tsx`, `package.json`, `store.ts`, `cekilis-kurallari.tsx`, `announcements.tsx`, `article-summary.test.tsx`, `useEnrichmentWarmup.ts`, `integration.test.tsx`, `react-native`, `data-access/hooks.ts`, `hesap.tsx`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `err()` connect `mock/mapper.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `supabase/repositories.ts`, `types.ts`, `Load-bearing decisions — the why log`, `export-registrations.ts`, `edge.ts`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Why does `firebase-admin` connect `admin/certificates.ts` to `push.ts`, `check-panel.ts`, `accountApi.ts`, `server.ts`, `package.json`, `certificateDelivery.ts`, `vitrin.ts`, `Load-bearing decisions — the why log`, `export-registrations.ts`, `qr.ts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _614 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08116883116883117 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.047519217330538085 - nodes in this community are weakly interconnected._