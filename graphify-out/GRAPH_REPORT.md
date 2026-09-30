# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 230 files · ~295,550 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2014 nodes · 5353 edges · 79 communities (75 shown, 4 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 408 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `83380d9d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- mock/repositories.ts
- react-native
- server.ts
- store.tsx
- data-access/hooks.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- supabase/repositories.ts
- env.ts
- types.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- ui.tsx
- supabase/mapper.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- photos.ts
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
- react
- eventSchema.ts
- qr.ts
- export-registrations.ts
- (tabs)/index.tsx
- ref_node_fs
- sync-deps.mjs
- Vitrin önbelleği — uygulama planı
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- firebase.ts
- make-icons.py
- accountApi.ts
- Dosya haritası
- taramaKarari
- hermes-safe.test.ts
- check-bundle.mjs
- ref_node_path
- README.md
- useFallbackTranslation.ts
- notifications.tsx
- repository
- app/_layout.tsx
- readingText.ts
- QrRoute
- tsconfig.json
- qrSchema.ts
- allowScripts
- notificationPlan.ts
- parseSourceUrl
- session-start.sh
- 4. Uygulama
- article-summary.test.tsx
- vitrinSchema.ts
- theme.ts
- admin/certificates.ts
- data.ts
- announcements.tsx
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

## Communities (79 total, 4 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (52): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+44 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.06
Nodes (36): QR yoklama — kurulurken çıkanlar, archive, b64, cagir(), claimDb(), claimDb2(), Data, decision (+28 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (45): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+37 more)

### Community 3 - "mock/repositories.ts"
Cohesion: 0.10
Nodes (29): createMockRepositories(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, mockArticles(), mockDigest(), NO_CONTENT_ARTICLE, createMockDigestRepository() (+21 more)

### Community 4 - "react-native"
Cohesion: 0.10
Nodes (34): Conventions, styles, styles, ArsivRoute(), styles, styles, Tab, Kurallar ve tuzaklar (+26 more)

### Community 5 - "server.ts"
Cohesion: 0.08
Nodes (23): parsePort(), resolvePort(), app, attempts, db, formDateTime(), formToInput(), inputToForm() (+15 more)

### Community 6 - "store.tsx"
Cohesion: 0.19
Nodes (13): NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState, isDemoRegistration() (+5 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.17
Nodes (24): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, GundemArticleRoute(), Bu turda **bilerek** düzeltilmeyenler, hasSummary(), asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS (+16 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.09
Nodes (34): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+26 more)

### Community 9 - "esc"
Cohesion: 0.12
Nodes (33): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+25 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (37): author, bugs, url, description, license, main, name, overrides (+29 more)

### Community 12 - "store.ts"
Cohesion: 0.15
Nodes (36): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), @testing-library/react-native, useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles() (+28 more)

### Community 13 - "supabase/repositories.ts"
Cohesion: 0.13
Nodes (30): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+22 more)

### Community 14 - "env.ts"
Cohesion: 0.08
Nodes (25): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+17 more)

### Community 15 - "types.ts"
Cohesion: 0.09
Nodes (29): K3 — Kullanıcı kaynak ekleyemiyor (v1), Taşınmayanlar, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), DigestRepositoryV1, EnrichmentRepositoryV1, FeedRepositoryV1 (+21 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.11
Nodes (43): moveBy(), placeAt(), sameMembers(), deleteFolder(), deletePhotos(), announcementChoices(), eventChoices(), Kind (+35 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.11
Nodes (25): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW (+17 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (25): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+17 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "ui.tsx"
Cohesion: 0.08
Nodes (28): styles, SplashRoute(), styles, OnboardingRoute(), styles, styles, TabBarProps, TABS (+20 more)

### Community 22 - "supabase/mapper.ts"
Cohesion: 0.13
Nodes (20): bodyFor(), Segment, segmentState(), ceviriDurumu(), DigestArticleFacts, DigestItemRow, DigestRow, FEED_COLUMNS (+12 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "photos.ts"
Cohesion: 0.21
Nodes (15): ACCEPTED_TYPES, bucketName(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage(), pathFromUrl() (+7 more)

### Community 25 - "auth.ts"
Cohesion: 0.05
Nodes (73): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, VerifyRoute(), HesapSilRoute(), DateFields(), SignupRoute(), CertificatesRoute(), ResetPasswordRoute(), OgrenciNo() (+65 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.10
Nodes (20): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About (+12 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.07
Nodes (29): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K4 — Özetler paylaşımlı, cihaz başına değil, K5 — Testler geliyor, kırpılarak (+21 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.15
Nodes (11): Güvenlik taraması — sekiz sessiz delik ve kapatılmayan ikisi, Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root (+3 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.08
Nodes (30): Üç ölü parça, üç ayrı ölüm biçimi, GundemRoute(), isTab(), @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, clients, METRICS (+22 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (19): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+11 more)

### Community 33 - "kv.ts"
Cohesion: 0.15
Nodes (13): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+5 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 37 - "react"
Cohesion: 0.14
Nodes (12): styles, HesapRoute(), react, Announcement, src_announcements_announcement, src_announcements_fetchannouncement, PrizeProviders(), styles (+4 more)

### Community 38 - "eventSchema.ts"
Cohesion: 0.14
Nodes (20): ArchiveCard(), EventFact, buildEvent(), BuildResult, daysInMonth(), EVENT_CATEGORIES, EventInput, MAX_PHOTOS (+12 more)

### Community 39 - "qr.ts"
Cohesion: 0.13
Nodes (25): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, QrTanimi (+17 more)

### Community 40 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "(tabs)/index.tsx"
Cohesion: 0.09
Nodes (28): AnnouncementRoute(), SponsorRoute(), styles, styles, AnnouncementRow(), HomeRoute(), styles, Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme (+20 more)

### Community 42 - "ref_node_fs"
Cohesion: 0.36
Nodes (7): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), ref_node_fs, parsed()

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "Vitrin önbelleği — uygulama planı"
Cohesion: 0.25
Nodes (7): Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 3: Adım 1'i kapat, Task 4: expo-image ve sürüm 1.1.6, Vitrin önbelleği — uygulama planı

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.20
Nodes (14): RaffleRulesRoute(), styles, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB (+6 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.11
Nodes (15): 1. Mevcut testler ne ölçüyordu, 2. Yeni testler, 3. Karşılaştırma: aynı testler eski koda karşı, 5. Testin kendisinden çıkan dersler, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, ref_node_os, assert() (+7 more)

### Community 48 - "firebase.ts"
Cohesion: 0.10
Nodes (32): SponsorsRoute(), Task 2: Hook'lar ve ana sayfa kopyayla açılıyor, 1. Sorun, 2. Hedef, 3.1 `src/vitrinCache.ts` (yeni), 3.2 Hook ve sağlayıcı, 3.3 Ana sayfa (`app/(tabs)/index.tsx`), 3. Adım 1 — liste önbelleği (OTA, 1.1.5) (+24 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.10
Nodes (33): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+25 more)

### Community 51 - "Dosya haritası"
Cohesion: 0.20
Nodes (20): Veri: kim neyi okuyor, kim yazıyor, Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 11: Sponsor ekranları — `/sponsorlar`, `/sponsor/[id]`, Task 12: "Ödülü sağlayan" — `PrizeProviders`, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları (+12 more)

### Community 53 - "hermes-safe.test.ts"
Cohesion: 0.29
Nodes (9): clubCalendar(), compareArticles(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW (+1 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.12
Nodes (19): ref_node_child_process, ref_node_url, argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN (+11 more)

### Community 56 - "ref_node_path"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_path, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 57 - "README.md"
Cohesion: 0.06
Nodes (30): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules, Arşiv paneli, Bildirimler, Build'e hangi değerler giriyor (+22 more)

### Community 58 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 60 - "notifications.tsx"
Cohesion: 0.16
Nodes (13): expo-constants, expo-device, expo-notifications, DeviceRecord, ensureAndroidChannel(), lazyUpsertDevice(), NotificationSync(), requestPushToken() (+5 more)

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "app/_layout.tsx"
Cohesion: 0.25
Nodes (5): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "QrRoute"
Cohesion: 0.38
Nodes (9): QrRoute(), @react-native-async-storage/async-storage, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId(), isQrToken(), parseQrPayload() (+1 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 69 - "qrSchema.ts"
Cohesion: 0.17
Nodes (14): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, joinLocal(), LOCAL_OFFSET, pad(), toLocalIso(), defaultWindow(), pad(), Pencere (+6 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "notificationPlan.ts"
Cohesion: 0.20
Nodes (12): DIGEST_HOURS, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), QUIET_END_HOUR, QUIET_START_HOUR (+4 more)

### Community 72 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "4. Uygulama"
Cohesion: 0.25
Nodes (8): SatirLink(), Task 13: Hesabım — KULÜP grubu, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi, 4. Uygulama

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.17
Nodes (23): 5.4 Sunucu, 7. Test ve kontroller, Task 1: `src/vitrinCache.ts`, 5. Test ve kontroller, Cache, METRICS, Storage, Build (+15 more)

### Community 79 - "theme.ts"
Cohesion: 0.12
Nodes (33): styles, LoginRoute(), styles, styles, BOS, styles, Durum, styles (+25 more)

### Community 80 - "admin/certificates.ts"
Cohesion: 0.08
Nodes (33): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+25 more)

### Community 81 - "data.ts"
Cohesion: 0.07
Nodes (43): Agent setup, BildirimAyarlariRoute(), keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials() (+35 more)

### Community 85 - "announcements.tsx"
Cohesion: 0.09
Nodes (26): 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli (+18 more)

### Community 86 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.25
Nodes (7): Dağıtım yüzeyleri, Git, İçerik girişi, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar

## Knowledge Gaps
- **631 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+626 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 774 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `mock/repositories.ts`, `react-native`, `store.tsx`, `data-access/hooks.ts`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `ui.tsx`, `integration.test.tsx`, `(tabs)/index.tsx`, `cekilis-kurallari.tsx`, `firebase.ts`, `notifications.tsx`, `app/_layout.tsx`, `article-summary.test.tsx`, `vitrinSchema.ts`, `theme.ts`, `data.ts`, `announcements.tsx`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `mock/repositories.ts`, `server.ts`, `export-registrations.ts`, `types.ts`, `demo-account.ts`?**
  _High betweenness centrality (0.082) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _631 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08082706766917293 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05647840531561462 - nodes in this community are weakly interconnected._