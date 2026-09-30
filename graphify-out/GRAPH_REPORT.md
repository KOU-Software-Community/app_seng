# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 232 files · ~296,332 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2029 nodes · 5384 edges · 85 communities (78 shown, 7 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 410 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6dd93e79`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- pushPolicy.ts
- check-panel.ts
- check-security.ts
- data.ts
- theme.ts
- server.ts
- push.ts
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
- ui.tsx
- accountSchema.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- useEnrichmentWarmup.test.tsx
- firebase.ts
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
- send-push.ts
- eventSchema.ts
- qr.ts
- export-registrations.ts
- (tabs)/index.tsx
- parseSourceUrl
- sync-deps.mjs
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- sponsors.tsx
- make-icons.py
- accountApi.ts
- deploy-rules.mjs
- taramaKarari
- clubCalendar
- photos.ts
- check-bundle.mjs
- ref_node_fs
- README.md
- types.ts
- integration.test.tsx
- app/_layout.tsx
- 3. Apple ve Google gerçekte ne şart koşuyor
- repository
- 8. Fazlar
- Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği
- readingText.ts
- qrSchema.ts
- tsconfig.json
- vitrin-cache.test.tsx
- allowScripts
- data-access/index.ts
- enrichment-unavailable.test.tsx
- session-start.sh
- 4. Uygulama
- article-summary.test.tsx
- vitrinSchema.ts
- react
- certificateDelivery.ts
- store.tsx
- bugs
- overrides
- announcements.tsx
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)

## God Nodes (most connected - your core abstractions)
1. `react` - 69 edges
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
- `Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı` --references--> `PhotoUploadError`  [INFERRED]
  AGENTS.md → admin/photos.ts
- `Fazlar` --references--> `storage()`  [INFERRED]
  docs/ai-gundem-port.md → admin/photos.ts
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `4.3 Kurallar (şekil)` --references--> `get()`  [INFERRED]
  docs/giris-sistemi-plani.md → scripts/check-panel.ts
- `1. Eski "hayır" neden geçersiz, ve yerine ne geliyor` --references--> `get()`  [INFERRED]
  docs/qr-yoklama-plani.md → scripts/check-panel.ts

## Import Cycles
- None detected.

## Communities (85 total, 7 thin omitted)

### Community 0 - "pushPolicy.ts"
Cohesion: 0.15
Nodes (23): claimOnce(), syncAnnouncements(), ANNOUNCEMENT_MAX_AGE_HOURS, AnnouncementLike, AnnouncementPlan, decideCancelledEvent(), decideNewEvent(), decideRaffleResult() (+15 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (42): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), QR yoklama — kurulurken çıkanlar, archive, b64 (+34 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (42): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, attendanceRows() (+34 more)

### Community 3 - "data.ts"
Cohesion: 0.08
Nodes (41): Agent setup, keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials(), styles (+33 more)

### Community 4 - "theme.ts"
Cohesion: 0.08
Nodes (47): Conventions, styles, styles, styles, styles, ArsivRoute(), styles, styles (+39 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (30): parsePort(), resolvePort(), registeredNotPresent(), app, attempts, authed(), db, formDateTime() (+22 more)

### Community 6 - "push.ts"
Cohesion: 0.18
Nodes (18): announce(), autoPushEnabled(), DeviceSummary, ExpoTicket, flushPending(), pendingSummary(), postChunk(), pushTo() (+10 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.24
Nodes (17): asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage(), retryPolicy(), unwrap() (+9 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.09
Nodes (34): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+26 more)

### Community 9 - "esc"
Cohesion: 0.11
Nodes (38): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+30 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.06
Nodes (35): author, description, license, main, name, private, version, expo (+27 more)

### Community 12 - "store.ts"
Cohesion: 0.10
Nodes (47): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), Bu turda **bilerek** düzeltilmeyenler, P9 — grafiğe dayalı temizlik turu (2026-09-02), GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES (+39 more)

### Community 13 - "supabase/repositories.ts"
Cohesion: 0.11
Nodes (37): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+29 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "mock/repositories.ts"
Cohesion: 0.09
Nodes (29): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, compareArticles(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, mockDigest(), AddSourceOptions, DEFAULT_PAGE_SIZE (+21 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.09
Nodes (51): moveBy(), placeAt(), sameMembers(), deleteFolder(), deletePhotos(), pathFromUrl(), announcementChoices(), eventChoices() (+43 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+27 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.17
Nodes (18): mount(), NOW, TODAY, delay(), isBudget(), readWarmBudget(), useEnrichmentWarmup(), writeWarmBudget() (+10 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (26): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+18 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (29): revokeCertificate(), bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil() (+21 more)

### Community 21 - "ui.tsx"
Cohesion: 0.08
Nodes (34): BildirimAyarlariRoute(), styles, styles, styles, OnboardingRoute(), styles, styles, styles (+26 more)

### Community 22 - "accountSchema.ts"
Cohesion: 0.11
Nodes (35): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, VerifyRoute(), DateFields(), SignupRoute(), ResetPasswordRoute(), OgrenciNo(), ageOn(), DateParts (+27 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.12
Nodes (16): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 4.1 Koleksiyonlar, 4.2 Akış, 4.3 Kurallar (şekil), 4. Kimlik ve profil modeli — "eşleştirme", 5.1 Tarayıcı görevlide olmalı, öğrencide değil, 5.2 Çekiliş ayrı bir QR akışı değil (+8 more)

### Community 24 - "useEnrichmentWarmup.test.tsx"
Cohesion: 0.18
Nodes (8): FeedFilter, QUERY_KEY_VERSION, queryKeys, clients, mockRequestEnrichment, QUEUED, READY, memoryStore

### Community 25 - "firebase.ts"
Cohesion: 0.11
Nodes (39): HesapSilRoute(), Veri: kim neyi okuyor, kim yazıyor, 4.1 Okuma ve durum, Dosyalar, firebase, YoklamaHatasi, yoklamaMesaji(), YoklamaSonucu (+31 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.10
Nodes (20): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About (+12 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (22): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+14 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (24): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+16 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.16
Nodes (11): Güvenlik taraması — sekiz sessiz delik ve kapatılmayan ikisi, Faz 1 — kimlik altyapısı, UI yok, ref_node_path, failed, json(), pkg, read(), results (+3 more)

### Community 31 - "QueryProvider.tsx"
Cohesion: 0.13
Nodes (23): Üç ölü parça, üç ayrı ölüm biçimi, GundemRoute(), isTab(), @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, clients, METRICS (+15 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (19): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+11 more)

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

### Community 37 - "send-push.ts"
Cohesion: 0.43
Nodes (7): deliver(), Args, loadServiceAccount(), main(), parseArgs(), inClubQuietHours(), PUSHABLE_CATEGORIES

### Community 38 - "eventSchema.ts"
Cohesion: 0.16
Nodes (19): ArchiveCard(), buildEvent(), BuildResult, daysInMonth(), EventInput, MAX_PHOTOS, MonthGrid, monthGrids() (+11 more)

### Community 39 - "qr.ts"
Cohesion: 0.10
Nodes (28): BELGE_NO_UZUNLUK, BulunanSertifika, findCertificate(), makeBelgeNo(), publishCertificates(), SertifikaKaydi, YayinGirdisi, YayinSonucu (+20 more)

### Community 40 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "(tabs)/index.tsx"
Cohesion: 0.09
Nodes (28): AnnouncementRoute(), SponsorRoute(), styles, AnnouncementRow(), HomeRoute(), styles, Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme, Task 11: Sponsor ekranları — `/sponsorlar`, `/sponsor/[id]` (+20 more)

### Community 42 - "parseSourceUrl"
Cohesion: 0.36
Nodes (7): RFC-3986, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.29
Nodes (5): 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.18
Nodes (15): RaffleRulesRoute(), styles, RaffleNotice(), styles, PRIVACY_POLICY_URL, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE (+7 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "sponsors.tsx"
Cohesion: 0.08
Nodes (44): Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 1: `src/vitrinCache.ts`, Task 2: Hook'lar ve ana sayfa kopyayla açılıyor (+36 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.09
Nodes (35): AuthLike, bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku() (+27 more)

### Community 51 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 53 - "clubCalendar"
Cohesion: 0.36
Nodes (7): clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW

### Community 54 - "photos.ts"
Cohesion: 0.24
Nodes (13): ACCEPTED_TYPES, bucketName(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage(), PhotoFolder (+5 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "ref_node_fs"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_fs, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 57 - "README.md"
Cohesion: 0.06
Nodes (30): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules, Arşiv paneli, Bildirimler, Build'e hangi değerler giriyor (+22 more)

### Community 58 - "types.ts"
Cohesion: 0.12
Nodes (17): GundemArticleRoute(), PANEL_BASE_URL, bodyFor(), hasSummary(), Segment, segmentState(), useFallbackTranslation(), YedekCeviri (+9 more)

### Community 59 - "integration.test.tsx"
Cohesion: 0.13
Nodes (10): @testing-library/react-native, MAX_PERSISTED_FEED_ARTICLES, clients, fakePostgrest(), Filters, parseKeyset(), mockGetExpoPushToken, mockUpsertDevice (+2 more)

### Community 60 - "app/_layout.tsx"
Cohesion: 0.09
Nodes (23): From the 1.1.0 release, Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı, expo-constants (+15 more)

### Community 61 - "3. Apple ve Google gerçekte ne şart koşuyor"
Cohesion: 0.33
Nodes (6): 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "8. Fazlar"
Cohesion: 0.33
Nodes (6): 8. Fazlar, Faz 2 — giriş, profil, eşleşmiş kayıt, Faz 3 — hesap silme (mağaza şartı), Faz 4 — QR yoklama ve çekiliş, Faz 5 — sertifika, Yapılmayacaklar

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "qrSchema.ts"
Cohesion: 0.18
Nodes (17): QrRoute(), @react-native-async-storage/async-storage, joinLocal(), LOCAL_OFFSET, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId() (+9 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "vitrin-cache.test.tsx"
Cohesion: 0.20
Nodes (7): ./firebase, Cache, { cacheReady }, METRICS, { SponsorsProvider, useSponsors }, Storage, { useSlides }

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "data-access/index.ts"
Cohesion: 0.11
Nodes (18): env, callEdgeFunction(), CODE_MAP, EDGE_TIMEOUT_MS, EdgeCallOptions, EdgeConfig, EdgeErrorEnvelope, isEnvelope() (+10 more)

### Community 72 - "enrichment-unavailable.test.tsx"
Cohesion: 0.15
Nodes (18): getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), createMockRepositories(), mockArticles(), NO_CONTENT_ARTICLE, createMockDigestRepository(), createMockEnrichmentRepository() (+10 more)

### Community 74 - "4. Uygulama"
Cohesion: 0.11
Nodes (18): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli (+10 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.22
Nodes (15): Task 1: Ortak şema — `src/vitrinSchema.ts`, 7. Test ve kontroller, ClubEvent, Build, buildSlide(), https(), idList(), isKicker() (+7 more)

### Community 79 - "react"
Cohesion: 0.08
Nodes (39): styles, LoginRoute(), styles, styles, BOS, styles, Durum, styles (+31 more)

### Community 80 - "certificateDelivery.ts"
Cohesion: 0.13
Nodes (20): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+12 more)

### Community 81 - "store.tsx"
Cohesion: 0.10
Nodes (25): DIGEST_HOURS, NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications() (+17 more)

### Community 85 - "announcements.tsx"
Cohesion: 0.14
Nodes (17): 3.3 Ayrıştırma ve doğrulama, 5.1 Menü, 5.2 Liste sayfası, 5.3 Formlar, 5.4 Sunucu, 5.5 Süresi dolan slaytları silen zamanlayıcı, 5.6 Görünüm, 5. Panel (+9 more)

### Community 86 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.20
Nodes (9): Dağıtım yüzeyleri, Git, İçerik girişi, Klasörler, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar (+1 more)

## Knowledge Gaps
- **640 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+635 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 783 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `data.ts`, `theme.ts`, `data-access/hooks.ts`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `ui.tsx`, `useEnrichmentWarmup.test.tsx`, `QueryProvider.tsx`, `kv.ts`, `(tabs)/index.tsx`, `cekilis-kurallari.tsx`, `sponsors.tsx`, `integration.test.tsx`, `app/_layout.tsx`, `vitrin-cache.test.tsx`, `enrichment-unavailable.test.tsx`, `article-summary.test.tsx`, `store.tsx`, `announcements.tsx`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Why does `err()` connect `enrichment-unavailable.test.tsx` to `check-panel.ts`, `send-push.ts`, `server.ts`, `data-access/index.ts`, `export-registrations.ts`, `supabase/repositories.ts`, `mock/repositories.ts`, `demo-account.ts`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **Why does `Load-bearing decisions — the why log` connect `Load-bearing decisions — the why log` to `Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği`, `readingText.ts`, `check-security.ts`, `check-panel.ts`, `push.ts`, `qr.ts`, `esc`, `store.ts`, `env.ts`, `mock/repositories.ts`, `pdf.ts`, `demo-account.ts`, `accountSchema.ts`, `README.md`, `app/_layout.tsx`, `check-release.mjs`, `QueryProvider.tsx`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _640 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05142857142857143 - nodes in this community are weakly interconnected._
- **Should `check-security.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06108597285067873 - nodes in this community are weakly interconnected._