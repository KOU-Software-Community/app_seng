# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 211 files · ~279,517 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1871 nodes · 4736 edges · 72 communities (69 shown, 3 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 274 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `89545c09`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- hesap.tsx
- ui.tsx
- server.ts
- supabase/repositories.ts
- mock/repositories.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- integration.test.tsx
- env.ts
- admin/certificates.ts
- data-access/index.ts
- dependencies
- useEnrichmentWarmup.ts
- Load-bearing decisions — the why log
- demo-account.ts
- Pixel.tsx
- auth.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
- accountSchema.ts
- qr.ts
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- gate.ts
- translateApi.ts
- raffleSchema.ts
- kv.ts
- eventSchema.ts
- accountApi.ts
- Dosya haritası
- content.tsx
- data.ts
- theme.ts
- cekilis/[id].tsx
- react-native
- mail.ts
- sync-deps.mjs
- credentials.ts
- react
- html.ts
- check-rules.mjs
- make-icons.py
- notifications.tsx
- photos.ts
- check-release.mjs
- hermes-safe.test.ts
- Doğrulama ve teklik — plan ve kurulum
- check-bundle.mjs
- types.ts
- README.md
- useFallbackTranslation.ts
- announcements.tsx
- qrSchema.ts
- ref_node_fs
- article-summary.test.tsx
- export-registrations.ts
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- deploy-rules.mjs
- tsconfig.json
- allowScripts
- sourceUrl.ts
- session-start.sh
- From the 1.1.0 release

## God Nodes (most connected - your core abstractions)
1. `react` - 57 edges
2. `react-native` - 42 edges
3. `Txt()` - 39 edges
4. `colors` - 37 edges
5. `Load-bearing decisions — the why log` - 37 edges
6. `expo-router` - 32 edges
7. `useContent()` - 31 edges
8. `esc()` - 28 edges
9. `useAppStore()` - 27 edges
10. `gradients` - 27 edges

## Surprising Connections (you probably didn't know these)
- `5.4 Sunucu` --references--> `sameOrigin()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/session.ts
- `Task 5: Panel görünümü — `admin/vitrinView.ts`, menü, CSS` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/views.ts
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `Task 7: Tema, `PhotoSlot`, iletişim adresi` --references--> `PhotoSlot()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → src/components/PhotoSlot.tsx
- `2. Kaynak metinden ayrıldığımız yerler` --references--> `PhotoSlot()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → src/components/PhotoSlot.tsx

## Import Cycles
- None detected.

## Communities (72 total, 3 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.09
Nodes (47): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+39 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (40): decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS, OTP_MAX_SENDS, OTP_RESEND_MS (+32 more)

### Community 2 - "check-security.ts"
Cohesion: 0.09
Nodes (25): AuthLike, panelKoku(), clientIp(), CLOUDFLARE, guvenilenEs, iptalEdilen, issueToken(), LOGIN_LOCK_MS (+17 more)

### Community 3 - "hesap.tsx"
Cohesion: 0.10
Nodes (35): styles, VerifyRoute(), LoginRoute(), styles, styles, BOS, styles, ResetPasswordRoute() (+27 more)

### Community 4 - "ui.tsx"
Cohesion: 0.08
Nodes (52): Conventions, styles, styles, styles, styles, styles, styles, Tab (+44 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (29): belgeTarihi(), pdfDurumu, pendingSummary(), recentPushLog(), app, attempts, authed(), db (+21 more)

### Community 6 - "supabase/repositories.ts"
Cohesion: 0.13
Nodes (31): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+23 more)

### Community 7 - "mock/repositories.ts"
Cohesion: 0.10
Nodes (27): compareArticles(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, mockDigest(), AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository (+19 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.09
Nodes (35): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+27 more)

### Community 9 - "esc"
Cohesion: 0.12
Nodes (35): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+27 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (40): author, bugs, url, description, license, main, name, overrides (+32 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "integration.test.tsx"
Cohesion: 0.10
Nodes (27): @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, @testing-library/react-native, clients, METRICS, mount(), QUERY_KEY_VERSION (+19 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "admin/certificates.ts"
Cohesion: 0.09
Nodes (26): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+18 more)

### Community 16 - "data-access/index.ts"
Cohesion: 0.12
Nodes (23): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), createMockRepositories(), mockArticles(), NO_CONTENT_ARTICLE, createMockDigestRepository() (+15 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.11
Nodes (25): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW (+17 more)

### Community 19 - "Load-bearing decisions — the why log"
Cohesion: 0.06
Nodes (47): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+39 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.12
Nodes (26): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+18 more)

### Community 21 - "Pixel.tsx"
Cohesion: 0.16
Nodes (12): OnboardingRoute(), styles, styles, TabBarProps, TABS, PixelArt(), PixelIconProps, ICON (+4 more)

### Community 22 - "auth.ts"
Cohesion: 0.10
Nodes (35): Öğrenci numarası — teklik hesapta vardı, kayıtta yoktu, HesapSilRoute(), CertificatesRoute(), Veri: kim neyi okuyor, kim yazıyor, Bildirimler nereden çıkıyor, Dosyalar, EAS derlemelerinde, Firebase (+27 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.15
Nodes (25): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, GundemArticleRoute(), Bu turda **bilerek** düzeltilmeyenler, bodyFor(), hasSummary(), asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS (+17 more)

### Community 25 - "accountSchema.ts"
Cohesion: 0.19
Nodes (21): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), SignupRoute(), ageOn(), DateParts, FieldErrors, formatPhone(), isValidSignup() (+13 more)

### Community 26 - "qr.ts"
Cohesion: 0.18
Nodes (18): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr() (+10 more)

### Community 27 - "scripts"
Cohesion: 0.04
Nodes (49): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+41 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (22): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil, K5 — Testler geliyor, kırpılarak (+14 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (24): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+16 more)

### Community 30 - "gate.ts"
Cohesion: 0.29
Nodes (8): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW

### Community 31 - "translateApi.ts"
Cohesion: 0.16
Nodes (16): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, Bagimliliklar (+8 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (21): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+13 more)

### Community 33 - "kv.ts"
Cohesion: 0.15
Nodes (13): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+5 more)

### Community 34 - "eventSchema.ts"
Cohesion: 0.06
Nodes (46): ArchiveCard(), ArsivRoute(), GridView(), ListView(), broken, built, capped, dayBefore (+38 more)

### Community 35 - "accountApi.ts"
Cohesion: 0.15
Nodes (20): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+12 more)

### Community 36 - "Dosya haritası"
Cohesion: 0.14
Nodes (14): Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 11: Sponsor ekranları — `/sponsorlar`, `/sponsor/[id]`, Task 12: "Ödülü sağlayan" — `PrizeProviders`, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 1: Ortak şema — `src/vitrinSchema.ts`, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları (+6 more)

### Community 37 - "content.tsx"
Cohesion: 0.14
Nodes (17): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar, ContentProvider(), ContentSource, ContentValue (+9 more)

### Community 38 - "data.ts"
Cohesion: 0.09
Nodes (25): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, ACCOUNT_DELETE_URL, ARCHIVE_CATEGORIES, DEPARTMENTS, DIGEST_HOURS, EVENTS, LEGAL_BASE, NOTIFICATION_CATEGORIES (+17 more)

### Community 39 - "theme.ts"
Cohesion: 0.19
Nodes (15): styles, styles, Durum, styles, react-native-safe-area-context, AuthGate(), styles, PhotoGallery() (+7 more)

### Community 40 - "cekilis/[id].tsx"
Cohesion: 0.12
Nodes (24): Agent setup, BildirimAyarlariRoute(), keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials() (+16 more)

### Community 41 - "react-native"
Cohesion: 0.11
Nodes (21): AnnouncementRoute(), styles, AnnouncementRow(), HomeRoute(), styles, Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme, Task 9: Slider bileşeni — `src/components/HomeSlider.tsx`, 4.2 Ana sayfa (`app/(tabs)/index.tsx`) (+13 more)

### Community 42 - "mail.ts"
Cohesion: 0.22
Nodes (9): initMail(), Mail, MailConfig, MailEki, MailEnv, mailFrom(), MailResult, readMailConfig() (+1 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "credentials.ts"
Cohesion: 0.43
Nodes (6): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), parsed()

### Community 45 - "react"
Cohesion: 0.19
Nodes (15): RaffleRulesRoute(), styles, react, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE (+7 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.16
Nodes (10): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+2 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "notifications.tsx"
Cohesion: 0.10
Nodes (25): Bildirim gelmedi, nereye bakılır, expo-constants, expo-device, expo-notifications, ClubEvent, DeviceRecord, applyQuietHours(), DIGEST_CATEGORY (+17 more)

### Community 51 - "photos.ts"
Cohesion: 0.22
Nodes (17): ACCEPTED_TYPES, bucketName(), deleteEventPhotos(), deletePhotos(), isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage() (+9 more)

### Community 52 - "check-release.mjs"
Cohesion: 0.18
Nodes (10): Faz 1 — kimlik altyapısı, UI yok, ref_node_path, failed, json(), pkg, read(), results, root (+2 more)

### Community 53 - "hermes-safe.test.ts"
Cohesion: 0.26
Nodes (10): GundemRoute(), isTab(), clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr() (+2 more)

### Community 54 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.12
Nodes (15): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+7 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "types.ts"
Cohesion: 0.10
Nodes (25): Segment, segmentState(), DigestArticleFacts, DigestItemRow, DigestRow, FEED_COLUMNS, FeedArticleRow, isDigit() (+17 more)

### Community 57 - "README.md"
Cohesion: 0.06
Nodes (30): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules, Arşiv paneli, Bildirimler, Build'e hangi değerler giriyor (+22 more)

### Community 58 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 59 - "announcements.tsx"
Cohesion: 0.06
Nodes (37): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme (+29 more)

### Community 60 - "qrSchema.ts"
Cohesion: 0.12
Nodes (23): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, QrRoute(), @react-native-async-storage/async-storage, yoklamaMesaji(), joinLocal(), LOCAL_OFFSET, bekleyeniOku(), bekleyeniSil() (+15 more)

### Community 61 - "ref_node_fs"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_fs, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 62 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 63 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 65 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.29
Nodes (5): 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 66 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 72 - "sourceUrl.ts"
Cohesion: 0.33
Nodes (7): RFC-3986, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 75 - "From the 1.1.0 release"
Cohesion: 0.13
Nodes (19): today(), cookieHeader(), Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, From the 1.1.0 release, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti, QR yoklama — kurulurken çıkanlar, Dağıtım yüzeyleri, Git (+11 more)

## Knowledge Gaps
- **602 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+597 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 741 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `hesap.tsx`, `ui.tsx`, `content.tsx`, `data.ts`, `theme.ts`, `cekilis/[id].tsx`, `react-native`, `package.json`, `store.ts`, `integration.test.tsx`, `data-access/index.ts`, `useEnrichmentWarmup.ts`, `notifications.tsx`, `Pixel.tsx`, `data-access/hooks.ts`, `announcements.tsx`, `article-summary.test.tsx`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `mock/repositories.ts`, `data-access/index.ts`, `demo-account.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `firebase-admin` connect `admin/certificates.ts` to `push.ts`, `check-panel.ts`, `accountApi.ts`, `server.ts`, `package.json`, `demo-account.ts`, `qr.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _602 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09125188536953242 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.045739348370927316 - nodes in this community are weakly interconnected._