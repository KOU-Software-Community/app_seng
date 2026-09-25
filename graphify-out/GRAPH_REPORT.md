# Graph Report - app_seng  (2026-09-25)

## Corpus Check
- 209 files · ~261,579 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1821 nodes · 4622 edges · 84 communities (79 shown, 5 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 208 edges (avg confidence: 0.93)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `1b269b1b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- ui.tsx
- arsiv.tsx
- server.ts
- supabase/repositories.ts
- data-access/repositories.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- integration.test.tsx
- env.ts
- admin/certificates.ts
- mock/repositories.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- claims.ts
- Pixel.tsx
- getDb
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
- kayit-ol.tsx
- qr.ts
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- FeedView.tsx
- devDependencies
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- accountApi.ts
- app/_layout.tsx
- firebase.ts
- store.tsx
- data.ts
- etkinlik/[id].tsx
- (tabs)/index.tsx
- eventSchema.ts
- sync-deps.mjs
- Load-bearing decisions — the why log
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- auth.ts
- make-icons.py
- src/otp.ts
- mock-feed.test.ts
- check-release.mjs
- hermes-safe.test.ts
- Doğrulama ve teklik — plan ve kurulum
- check-bundle.mjs
- supabase/mapper.ts
- README.md
- useFallbackTranslation.ts
- announcements.tsx
- From the 1.1.0 release
- ref_node_fs
- article-summary.test.tsx
- export-registrations.ts
- readingText.ts
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- ref_node_path
- tsconfig.json
- demo-account.ts
- mail.ts
- allowScripts
- icons.test.ts
- mailTemplate.ts
- session-start.sh
- 8. Fazlar
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- Firebase
- notification-sync.test.tsx
- sendMail
- repository
- bugs
- overrides

## God Nodes (most connected - your core abstractions)
1. `react` - 57 edges
2. `react-native` - 42 edges
3. `Txt()` - 37 edges
4. `colors` - 37 edges
5. `Load-bearing decisions — the why log` - 37 edges
6. `expo-router` - 32 edges
7. `esc()` - 28 edges
8. `useContent()` - 28 edges
9. `useAppStore()` - 27 edges
10. `gradients` - 27 edges

## Surprising Connections (you probably didn't know these)
- `Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı` --references--> `PhotoUploadError`  [INFERRED]
  AGENTS.md → admin/photos.ts
- `Fazlar` --references--> `storage()`  [INFERRED]
  docs/ai-gundem-port.md → admin/photos.ts
- `Faz 1 — kimlik altyapısı, UI yok` --references--> `rulesBlock()`  [INFERRED]
  docs/giris-sistemi-plani.md → scripts/check-release.mjs
- `2. Doğrulama neden Firebase'in bağlantısı değil` --references--> `refreshVerification()`  [INFERRED]
  docs/dogrulama-ve-teklik-plani.md → src/auth.ts
- `Herkese açık bir deponun kimliği — LICENSE, README ve About` --references--> `ContentNotice()`  [INFERRED]
  AGENTS.md → src/components/ui.tsx

## Import Cycles
- None detected.

## Communities (84 total, 5 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (51): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+43 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.04
Nodes (56): makeBelgeNo(), publishCertificates(), asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, deleteAuthUser(), DeletionOutcome (+48 more)

### Community 2 - "check-security.ts"
Cohesion: 0.05
Nodes (48): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+40 more)

### Community 3 - "ui.tsx"
Cohesion: 0.11
Nodes (51): styles, styles, styles, styles, styles, styles, Durum, styles (+43 more)

### Community 4 - "arsiv.tsx"
Cohesion: 0.25
Nodes (9): Conventions, styles, Kurallar ve tuzaklar, PhotoSlot(), styles, FilterChip(), PixelTxt(), ARCHIVE_CATEGORIES (+1 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (33): ACCEPTED_TYPES, bucketName(), deleteEventPhotos(), deletePhotos(), isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage() (+25 more)

### Community 6 - "supabase/repositories.ts"
Cohesion: 0.10
Nodes (35): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+27 more)

### Community 7 - "data-access/repositories.ts"
Cohesion: 0.09
Nodes (35): K3 — Kullanıcı kaynak ekleyemiyor (v1), Taşınmayanlar, env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), AddSourceOptions, DigestRepositoryV1 (+27 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.11
Nodes (28): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+20 more)

### Community 9 - "esc"
Cohesion: 0.12
Nodes (34): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+26 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (36): author, description, license, main, name, private, version, expo (+28 more)

### Community 12 - "store.ts"
Cohesion: 0.15
Nodes (36): GundemAraRoute(), @testing-library/react-native, SavedView(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles() (+28 more)

### Community 13 - "integration.test.tsx"
Cohesion: 0.10
Nodes (29): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, clients, METRICS, mount(), QUERY_KEY_VERSION (+21 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "admin/certificates.ts"
Cohesion: 0.10
Nodes (25): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+17 more)

### Community 16 - "mock/repositories.ts"
Cohesion: 0.11
Nodes (24): RFC-3986, createMockRepositories(), compareArticles(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, mockArticles(), mockDigest(), NO_CONTENT_ARTICLE (+16 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.14
Nodes (22): clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW, TODAY, delay() (+14 more)

### Community 19 - "pdf.ts"
Cohesion: 0.13
Nodes (23): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+15 more)

### Community 20 - "claims.ts"
Cohesion: 0.21
Nodes (11): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+3 more)

### Community 21 - "Pixel.tsx"
Cohesion: 0.11
Nodes (20): styles, styles, OnboardingRoute(), styles, styles, TabBarProps, TABS, expo-linear-gradient (+12 more)

### Community 22 - "getDb"
Cohesion: 0.16
Nodes (18): CertificatesRoute(), firebase, YoklamaHatasi, YoklamaSonucu, yoklamaVarMi(), yoklamaVer(), currentUser(), refreshVerification() (+10 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.09
Nodes (22): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+14 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.18
Nodes (20): "Çeviri geç geliyor / hiç gelmiyor" raporundan, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage(), retryPolicy() (+12 more)

### Community 25 - "kayit-ol.tsx"
Cohesion: 0.18
Nodes (21): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, BOS, DateFields(), SignupRoute(), styles, ageOn(), DateParts, FieldErrors (+13 more)

### Community 26 - "qr.ts"
Cohesion: 0.09
Nodes (38): ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, QrTanimi, regenerateQr() (+30 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.10
Nodes (20): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K4 — Özetler paylaşımlı, cihaz başına değil, K5 — Testler geliyor, kırpılarak (+12 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "FeedView.tsx"
Cohesion: 0.15
Nodes (16): Bu turda **bilerek** düzeltilmeyenler, P9 — grafiğe dayalı temizlik turu (2026-09-02), GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article() (+8 more)

### Community 31 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (20): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+12 more)

### Community 33 - "kv.ts"
Cohesion: 0.15
Nodes (10): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), resetDeviceIdCache(), kv (+2 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "accountApi.ts"
Cohesion: 0.19
Nodes (14): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+6 more)

### Community 36 - "app/_layout.tsx"
Cohesion: 0.25
Nodes (5): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar

### Community 37 - "firebase.ts"
Cohesion: 0.26
Nodes (13): Veri: kim neyi okuyor, kim yazıyor, Dosyalar, ContentProvider(), fetchContent(), pushRaffleEntry(), pushRegistration(), RegistrationPayload, upsertDevice() (+5 more)

### Community 38 - "store.tsx"
Cohesion: 0.09
Nodes (33): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, styles, Bildirim gelmedi, nereye bakılır, IconTile(), Toggle(), DIGEST_HOURS, NOTIFICATION_CATEGORIES, REMINDER_OPTIONS (+25 more)

### Community 39 - "data.ts"
Cohesion: 0.10
Nodes (19): styles, styles, AuthGate(), GroupLabel(), ContentSource, ContentValue, Ctx, ACCOUNT_DELETE_URL (+11 more)

### Community 40 - "etkinlik/[id].tsx"
Cohesion: 0.13
Nodes (26): Agent setup, BildirimAyarlariRoute(), keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials() (+18 more)

### Community 41 - "(tabs)/index.tsx"
Cohesion: 0.12
Nodes (17): AnnouncementRoute(), AnnouncementRow(), HomeRoute(), styles, ListView(), styles, TakvimRoute(), View_ (+9 more)

### Community 42 - "eventSchema.ts"
Cohesion: 0.16
Nodes (19): ArchiveCard(), buildEvent(), BuildResult, daysInMonth(), EventInput, LOCAL_OFFSET, MAX_PHOTOS, MonthGrid (+11 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "Load-bearing decisions — the why log"
Cohesion: 0.13
Nodes (15): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, İşi telefon yaratıyordu, sunucu değil — ve bu defterdeki bir satır yanlıştı (+7 more)

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.20
Nodes (14): RaffleRulesRoute(), styles, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB (+6 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (10): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+2 more)

### Community 48 - "auth.ts"
Cohesion: 0.16
Nodes (21): LoginRoute(), HesapSilRoute(), HesapRoute(), normalizeEmail(), Profile, toProfile(), authErrorMessage(), deletionDone() (+13 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "src/otp.ts"
Cohesion: 0.24
Nodes (13): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), digits(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir() (+5 more)

### Community 51 - "mock-feed.test.ts"
Cohesion: 0.15
Nodes (11): MOCK_NOW_ISO, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, ALL_IDS, repos, Article, ARTICLES, CATEGORIES (+3 more)

### Community 52 - "check-release.mjs"
Cohesion: 0.22
Nodes (8): failed, json(), pkg, read(), results, root, rulesBlock(), store

### Community 53 - "hermes-safe.test.ts"
Cohesion: 0.26
Nodes (10): GundemRoute(), isTab(), clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr() (+2 more)

### Community 54 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "supabase/mapper.ts"
Cohesion: 0.12
Nodes (23): GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), ceviriDurumu(), DigestArticleFacts, DigestItemRow (+15 more)

### Community 57 - "README.md"
Cohesion: 0.06
Nodes (30): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules, Arşiv paneli, Bildirimler, Build'e hangi değerler giriyor (+22 more)

### Community 58 - "useFallbackTranslation.ts"
Cohesion: 0.27
Nodes (6): useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 59 - "announcements.tsx"
Cohesion: 0.30
Nodes (9): Announcement, fetchAnnouncement(), fetchAnnouncements(), getJson(), toAnnouncement(), unwrapList(), AnnouncementsProvider(), AnnouncementsValue (+1 more)

### Community 60 - "From the 1.1.0 release"
Cohesion: 0.19
Nodes (13): inputToForm(), today(), cookieHeader(), Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, From the 1.1.0 release, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti, QR yoklama — kurulurken çıkanlar, Klasörler (+5 more)

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

### Community 68 - "demo-account.ts"
Cohesion: 0.36
Nodes (9): processDeletion(), arg(), Girdi, girdiOku(), has(), loadServiceAccount(), main(), parolaUret() (+1 more)

### Community 69 - "mail.ts"
Cohesion: 0.22
Nodes (9): initMail(), Mail, MailConfig, MailEki, MailEnv, mailFrom(), MailResult, readMailConfig() (+1 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 72 - "mailTemplate.ts"
Cohesion: 0.43
Nodes (6): kodMail(), KodMailGirdi, kodMetni(), otpMail, RENK, sifreMail()

### Community 74 - "8. Fazlar"
Cohesion: 0.29
Nodes (7): 8. Fazlar, Faz 1 — kimlik altyapısı, UI yok, Faz 2 — giriş, profil, eşleşmiş kayıt, Faz 3 — hesap silme (mağaza şartı), Faz 4 — QR yoklama ve çekiliş, Faz 5 — sertifika, Yapılmayacaklar

### Community 75 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.25
Nodes (7): Dağıtım yüzeyleri, Git, İçerik girişi, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar

### Community 78 - "Firebase"
Cohesion: 0.40
Nodes (5): Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı

### Community 79 - "notification-sync.test.tsx"
Cohesion: 0.40
Nodes (4): mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs

### Community 80 - "sendMail"
Cohesion: 0.67
Nodes (3): sendMail(), Doğrulama postası, teklik ve OTP, verifyIdToken()

### Community 81 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

## Knowledge Gaps
- **585 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+580 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 724 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `ui.tsx` to `arsiv.tsx`, `package.json`, `store.ts`, `integration.test.tsx`, `mock/repositories.ts`, `useEnrichmentWarmup.ts`, `Pixel.tsx`, `data-access/hooks.ts`, `kayit-ol.tsx`, `FeedView.tsx`, `app/_layout.tsx`, `store.tsx`, `data.ts`, `etkinlik/[id].tsx`, `(tabs)/index.tsx`, `cekilis-kurallari.tsx`, `auth.ts`, `announcements.tsx`, `article-summary.test.tsx`, `notification-sync.test.tsx`?**
  _High betweenness centrality (0.128) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `demo-account.ts`, `server.ts`, `data-access/repositories.ts`, `mock/repositories.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **Why does `firebase-admin` connect `admin/certificates.ts` to `push.ts`, `check-panel.ts`, `accountApi.ts`, `demo-account.ts`, `server.ts`, `package.json`, `claims.ts`, `qr.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _585 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08116883116883117 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.03711711711711712 - nodes in this community are weakly interconnected._