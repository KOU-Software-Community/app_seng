# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 210 files · ~264,135 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1846 nodes · 4673 edges · 83 communities (80 shown, 3 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 235 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `de9e2605`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- theme.ts
- react-native
- server.ts
- supabase/repositories.ts
- types.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- QueryProvider.tsx
- env.ts
- admin/certificates.ts
- mock/repositories.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- ui.tsx
- getDb
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
- accountSchema.ts
- qr.ts
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- FeedView
- devDependencies
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- accountApi.ts
- hermes-safe.test.ts
- content.tsx
- data.ts
- cekilis/[id].tsx
- etkinlik/[id].tsx
- react
- eventSchema.ts
- sync-deps.mjs
- Load-bearing decisions — the why log
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- auth.ts
- make-icons.py
- notificationPlan.ts
- photos.ts
- check-release.mjs
- relativeTime.ts
- Doğrulama ve teklik — plan ve kurulum
- check-bundle.mjs
- summary-state.test.ts
- README.md
- useFallbackTranslation.ts
- announcements.tsx
- QrRoute
- ref_node_fs
- article-summary.test.tsx
- export-registrations.ts
- readingText.ts
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- ref_node_path
- tsconfig.json
- qrSchema.ts
- src/certificates.ts
- allowScripts
- icons.test.ts
- sourceUrl.ts
- session-start.sh
- 8. Fazlar
- From the 1.1.0 release
- Firebase
- integration.test.tsx
- KOÜ Yazılım Kulübü — agent notes
- Mağazaya çıkarma
- Yönetim paneli

## God Nodes (most connected - your core abstractions)
1. `react` - 57 edges
2. `react-native` - 42 edges
3. `Txt()` - 37 edges
4. `colors` - 37 edges
5. `Load-bearing decisions — the why log` - 37 edges
6. `expo-router` - 32 edges
7. `useContent()` - 29 edges
8. `esc()` - 28 edges
9. `useAppStore()` - 27 edges
10. `gradients` - 27 edges

## Surprising Connections (you probably didn't know these)
- `Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı` --references--> `PhotoUploadError`  [INFERRED]
  AGENTS.md → admin/photos.ts
- `Fazlar` --references--> `storage()`  [INFERRED]
  docs/ai-gundem-port.md → admin/photos.ts
- `Faz 1 — kimlik altyapısı, UI yok` --references--> `rulesBlock()`  [INFERRED]
  docs/giris-sistemi-plani.md → scripts/check-release.mjs
- `2. Kaynak metinden ayrıldığımız yerler` --references--> `PhotoSlot()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → src/components/PhotoSlot.tsx
- `Herkese açık bir deponun kimliği — LICENSE, README ve About` --references--> `ContentNotice()`  [INFERRED]
  AGENTS.md → src/components/ui.tsx

## Import Cycles
- None detected.

## Communities (83 total, 3 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.09
Nodes (49): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+41 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (41): makeBelgeNo(), publishCertificates(), decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS (+33 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (40): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, panelKoku() (+32 more)

### Community 3 - "theme.ts"
Cohesion: 0.12
Nodes (35): styles, LoginRoute(), styles, styles, styles, BOS, styles, Durum (+27 more)

### Community 4 - "react-native"
Cohesion: 0.13
Nodes (21): styles, styles, Tab, expo-router, react-native, ContentNotice(), FilterChip(), Segmented() (+13 more)

### Community 5 - "server.ts"
Cohesion: 0.06
Nodes (35): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, parsePort(), resolvePort(), app, attempts (+27 more)

### Community 6 - "supabase/repositories.ts"
Cohesion: 0.09
Nodes (46): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC (+38 more)

### Community 7 - "types.ts"
Cohesion: 0.10
Nodes (29): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), DigestRepositoryV1, EnrichmentRepositoryV1, FeedRepositoryV1, Repositories (+21 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.09
Nodes (26): FEED_URLS, hoursAgoFromLabel(), isoFromLabel(), MOCK_NOW_ISO, MOCK_NOW_MS, NO_CONTENT_ARTICLE, parseSourceMeta(), SITE_URLS (+18 more)

### Community 9 - "esc"
Cohesion: 0.11
Nodes (36): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+28 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.04
Nodes (47): author, bugs, url, description, license, main, name, overrides (+39 more)

### Community 12 - "store.ts"
Cohesion: 0.13
Nodes (37): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), orderBySaved(), SavedView(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches() (+29 more)

### Community 13 - "QueryProvider.tsx"
Cohesion: 0.12
Nodes (25): GundemRoute(), isTab(), @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, clients, METRICS, mount() (+17 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "admin/certificates.ts"
Cohesion: 0.08
Nodes (32): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+24 more)

### Community 16 - "mock/repositories.ts"
Cohesion: 0.12
Nodes (25): createMockRepositories(), compareArticles(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, mockArticles(), mockDigest(), mockSources(), createMockDigestRepository() (+17 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.13
Nodes (23): clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW, TODAY, delay() (+15 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (26): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+18 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.12
Nodes (26): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+18 more)

### Community 21 - "ui.tsx"
Cohesion: 0.09
Nodes (31): Conventions, SplashRoute(), styles, RegistrationDoneRoute(), styles, styles, styles, TabBarProps (+23 more)

### Community 22 - "getDb"
Cohesion: 0.19
Nodes (18): Veri: kim neyi okuyor, kim yazıyor, 4.1 Okuma ve durum, Dosyalar, YoklamaHatasi, yoklamaMesaji(), YoklamaSonucu, yoklamaVarMi(), yoklamaVer() (+10 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.09
Nodes (22): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+14 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.24
Nodes (17): asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage(), retryPolicy(), unwrap() (+9 more)

### Community 25 - "accountSchema.ts"
Cohesion: 0.12
Nodes (31): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, VerifyRoute(), DateFields(), SignupRoute(), ResetPasswordRoute(), OgrenciNo(), ageOn(), DateParts (+23 more)

### Community 26 - "qr.ts"
Cohesion: 0.15
Nodes (22): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr() (+14 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (22): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+14 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "FeedView"
Cohesion: 0.22
Nodes (11): Bu turda **bilerek** düzeltilmeyenler, P9 — grafiğe dayalı temizlik turu (2026-09-02), GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article() (+3 more)

### Community 31 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (17): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+9 more)

### Community 33 - "kv.ts"
Cohesion: 0.12
Nodes (14): Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4(), resetDeviceIdCache() (+6 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "accountApi.ts"
Cohesion: 0.14
Nodes (21): AuthLike, bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku() (+13 more)

### Community 36 - "hermes-safe.test.ts"
Cohesion: 0.24
Nodes (12): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+4 more)

### Community 37 - "content.tsx"
Cohesion: 0.19
Nodes (15): expo-constants, expo-device, expo-notifications, ContentSource, ContentValue, Ctx, ClubEvent, DeviceRecord (+7 more)

### Community 38 - "data.ts"
Cohesion: 0.07
Nodes (32): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, BildirimAyarlariRoute(), styles, styles, AuthGate(), GroupLabel(), IconTile(), Toggle() (+24 more)

### Community 39 - "cekilis/[id].tsx"
Cohesion: 0.31
Nodes (7): keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, PRIVACY_POLICY_URL, validateEntry(), fonts

### Community 40 - "etkinlik/[id].tsx"
Cohesion: 0.10
Nodes (33): Agent setup, EventDetailRoute(), initials(), styles, RegistrationRoute(), OnboardingRoute(), ArsivRoute(), styles (+25 more)

### Community 41 - "react"
Cohesion: 0.16
Nodes (12): AnnouncementRoute(), styles, AnnouncementRow(), styles, react, src_announcements_announcement, src_announcements_fetchannouncement, formatAnnouncementDate() (+4 more)

### Community 42 - "eventSchema.ts"
Cohesion: 0.13
Nodes (22): ArchiveCard(), EventFact, buildEvent(), BuildResult, daysInMonth(), EventInput, joinLocal(), LOCAL_OFFSET (+14 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "Load-bearing decisions — the why log"
Cohesion: 0.11
Nodes (18): Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti, İşi telefon yaratıyordu, sunucu değil — ve bu defterdeki bir satır yanlıştı (+10 more)

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.19
Nodes (15): RaffleRulesRoute(), styles, RaffleNotice(), styles, PixelTxt(), APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE (+7 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (10): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+2 more)

### Community 48 - "auth.ts"
Cohesion: 0.23
Nodes (16): HesapSilRoute(), 2. Doğrulama neden Firebase'in bağlantısı değil, normalizeEmail(), Profile, toProfile(), currentUser(), deletionDone(), finishAccountDeletion() (+8 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "notificationPlan.ts"
Cohesion: 0.22
Nodes (11): applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), QUIET_END_HOUR, QUIET_START_HOUR, REMINDER_CATEGORY (+3 more)

### Community 51 - "photos.ts"
Cohesion: 0.27
Nodes (14): ACCEPTED_TYPES, bucketName(), deleteEventPhotos(), deletePhotos(), isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage() (+6 more)

### Community 52 - "check-release.mjs"
Cohesion: 0.22
Nodes (8): failed, json(), pkg, read(), results, root, rulesBlock(), store

### Community 53 - "relativeTime.ts"
Cohesion: 0.36
Nodes (6): ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW

### Community 54 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.14
Nodes (13): 1. Ne zorlanıyor, ne zorlanmıyor, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi, 5. Sertifika şablonu (+5 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "summary-state.test.ts"
Cohesion: 0.27
Nodes (7): GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), CONFIG, ArticleSummary

### Community 57 - "README.md"
Cohesion: 0.12
Nodes (15): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Görseller, Katkı, Kurulum, Lisans (+7 more)

### Community 58 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 59 - "announcements.tsx"
Cohesion: 0.07
Nodes (30): SatirLink(), 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Console'dan giriş (panel gelene kadar), 3.4 Ayrıştırma, 3.5 Sıralama ve görünürlük (+22 more)

### Community 60 - "QrRoute"
Cohesion: 0.29
Nodes (8): QrRoute(), @react-native-async-storage/async-storage, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), QrOkuma, taramaKarari, GECERLI

### Community 61 - "ref_node_fs"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_fs, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 62 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 63 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 64 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 65 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.29
Nodes (5): 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 66 - "ref_node_path"
Cohesion: 0.22
Nodes (7): ref_node_child_process, ref_node_path, ref_node_url, cli, projectId, result, root

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "qrSchema.ts"
Cohesion: 0.27
Nodes (9): isEventId(), isQrToken(), parseQrPayload(), Pencere, QR_ACILIS_SAAT, QR_ALPHABET, QR_TOKEN_LENGTH, TOKEN_RE (+1 more)

### Community 69 - "src/certificates.ts"
Cohesion: 0.28
Nodes (7): CertificatesRoute(), firebase, sertifikalarimiGetir(), Sertifikam, sertifikaPdfUrl(), sertifikaUrl(), firebase/auth

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 72 - "sourceUrl.ts"
Cohesion: 0.33
Nodes (7): RFC-3986, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "8. Fazlar"
Cohesion: 0.29
Nodes (7): 8. Fazlar, Faz 1 — kimlik altyapısı, UI yok, Faz 2 — giriş, profil, eşleşmiş kayıt, Faz 3 — hesap silme (mağaza şartı), Faz 4 — QR yoklama ve çekiliş, Faz 5 — sertifika, Yapılmayacaklar

### Community 75 - "From the 1.1.0 release"
Cohesion: 0.16
Nodes (18): today(), Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, From the 1.1.0 release, Dağıtım yüzeyleri, Git, İçerik girişi, Klasörler, Komutlar (+10 more)

### Community 78 - "Firebase"
Cohesion: 0.25
Nodes (8): Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı, ensureAndroidChannel(), requestPushToken()

### Community 79 - "integration.test.tsx"
Cohesion: 0.14
Nodes (9): @testing-library/react-native, clients, fakePostgrest(), Filters, parseKeyset(), mockGetExpoPushToken, mockUpsertDevice, { NotificationSync } (+1 more)

### Community 80 - "KOÜ Yazılım Kulübü — agent notes"
Cohesion: 0.33
Nodes (5): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules

### Community 81 - "Mağazaya çıkarma"
Cohesion: 0.33
Nodes (6): Build'e hangi değerler giriyor, İkonlar ve mağaza görselleri, Mağazaya çıkarma, "Otomatik artsın" isteniyorsa, Sürüm ne zaman elle artırılır, Sürüm numaraları

### Community 82 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

## Knowledge Gaps
- **596 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+591 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 735 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `kv.ts`, `theme.ts`, `react-native`, `content.tsx`, `data.ts`, `cekilis/[id].tsx`, `etkinlik/[id].tsx`, `package.json`, `store.ts`, `cekilis-kurallari.tsx`, `QueryProvider.tsx`, `integration.test.tsx`, `mock/repositories.ts`, `useEnrichmentWarmup.ts`, `ui.tsx`, `data-access/hooks.ts`, `announcements.tsx`, `article-summary.test.tsx`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `types.ts`, `mock/repositories.ts`, `demo-account.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `firebase-admin` connect `admin/certificates.ts` to `push.ts`, `check-panel.ts`, `accountApi.ts`, `server.ts`, `package.json`, `demo-account.ts`, `qr.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _596 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0859538784067086 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.045739348370927316 - nodes in this community are weakly interconnected._