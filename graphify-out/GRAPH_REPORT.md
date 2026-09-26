# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 225 files · ~290,454 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1972 nodes · 5230 edges · 88 communities (83 shown, 5 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 369 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `6dda4b5f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- etkinlik/[id].tsx
- ui.tsx
- server.ts
- edge.ts
- mock/repositories.ts
- mock/mapper.ts
- esc
- expo
- package.json
- FeedView.tsx
- supabase/repositories.ts
- env.ts
- admin/certificates.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- react-native
- devDependencies
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
- qr.tsx
- Load-bearing decisions — the why log
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- hesap.tsx
- integration.test.tsx
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- QueryProvider.tsx
- eventSchema.ts
- photos.ts
- store.tsx
- qr.ts
- Doğrulama ve teklik — plan ve kurulum
- (tabs)/index.tsx
- deploy-rules.mjs
- sync-deps.mjs
- ref_node_path
- react-native-safe-area-context
- html.ts
- check-rules.mjs
- Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`
- make-icons.py
- accountApi.ts
- getDb
- check-release.mjs
- hermes-safe.test.ts
- 8. Fazlar
- check-bundle.mjs
- export-registrations.ts
- README.md
- useFallbackTranslation.ts
- announcements.tsx
- notification-sync.test.tsx
- ref_node_fs
- repository
- firebase.ts
- cursor.ts
- readingText.ts
- QrRoute
- tsconfig.json
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- qrSchema.ts
- allowScripts
- notificationPlan.ts
- mock/index.ts
- session-start.sh
- Dosya haritası
- article-summary.test.tsx
- vitrinSchema.ts
- bugs
- overrides
- data.ts
- summary-state.test.ts
- notificationsView.ts
- notifications.tsx
- 4. Uygulama
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- auth.ts

## God Nodes (most connected - your core abstractions)
1. `react` - 66 edges
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
- `6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı` --references--> `attendanceRows()`  [INFERRED]
  docs/guvenlik-testleri-degerlendirmesi.md → admin/qr.ts
- `Task 5: Panel görünümü — `admin/vitrinView.ts`, menü, CSS` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/views.ts

## Import Cycles
- None detected.

## Communities (88 total, 5 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.09
Nodes (49): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+41 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (41): makeBelgeNo(), publishCertificates(), decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS (+33 more)

### Community 2 - "check-security.ts"
Cohesion: 0.07
Nodes (38): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+30 more)

### Community 3 - "etkinlik/[id].tsx"
Cohesion: 0.13
Nodes (21): keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials(), styles, RegistrationDoneRoute() (+13 more)

### Community 4 - "ui.tsx"
Cohesion: 0.09
Nodes (48): Conventions, styles, styles, styles, styles, ArsivRoute(), styles, styles (+40 more)

### Community 5 - "server.ts"
Cohesion: 0.06
Nodes (35): uploadEventPhoto(), parsePort(), resolvePort(), pendingSummary(), recentPushLog(), registeredNotPresent(), app, attempts (+27 more)

### Community 6 - "edge.ts"
Cohesion: 0.16
Nodes (12): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), callEdgeFunction(), CODE_MAP, EDGE_TIMEOUT_MS, EdgeCallOptions (+4 more)

### Community 7 - "mock/repositories.ts"
Cohesion: 0.09
Nodes (36): src_gundem_data_access_mock_mapper_isaftercursor, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1, EnrichmentRepository, EnrichmentRepositoryV1, FeedRepository (+28 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.08
Nodes (30): compareArticles(), FEED_URLS, hasNoContent(), hoursAgoFromLabel(), isoFromLabel(), MOCK_NOW_ISO, MOCK_NOW_MS, mockDigest() (+22 more)

### Community 9 - "esc"
Cohesion: 0.15
Nodes (28): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), QrTanimi (+20 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (37): author, description, license, main, name, private, version, expo (+29 more)

### Community 12 - "FeedView.tsx"
Cohesion: 0.09
Nodes (53): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), Bu turda **bilerek** düzeltilmeyenler, P9 — grafiğe dayalı temizlik turu (2026-09-02), asDataError(), GateCandidate, GateResult, heldLineTr() (+45 more)

### Community 13 - "supabase/repositories.ts"
Cohesion: 0.11
Nodes (37): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+29 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "admin/certificates.ts"
Cohesion: 0.09
Nodes (29): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+21 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.22
Nodes (19): moveBy(), placeAt(), sameMembers(), deletePhotos(), announcementChoices(), eventChoices(), Kind, notFound() (+11 more)

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
Cohesion: 0.11
Nodes (28): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+20 more)

### Community 21 - "react-native"
Cohesion: 0.12
Nodes (22): styles, styles, styles, styles, styles, TabBarProps, TABS, expo-linear-gradient (+14 more)

### Community 22 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.09
Nodes (22): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+14 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.25
Nodes (17): GundemArticleRoute(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage(), retryPolicy(), unwrap() (+9 more)

### Community 25 - "qr.tsx"
Cohesion: 0.12
Nodes (21): Agent setup, BildirimAyarlariRoute(), styles, SplashRoute(), OnboardingRoute(), Durum, styles, styles (+13 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.11
Nodes (18): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About (+10 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (22): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+14 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (24): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+16 more)

### Community 30 - "hesap.tsx"
Cohesion: 0.10
Nodes (36): styles, VerifyRoute(), LoginRoute(), styles, styles, BOS, styles, ResetPasswordRoute() (+28 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.10
Nodes (18): @tanstack/react-query, @testing-library/react-native, clients, METRICS, mount(), Repositories, CONFIG, mockRepos (+10 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.12
Nodes (18): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+10 more)

### Community 33 - "kv.ts"
Cohesion: 0.16
Nodes (11): Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4(), resetDeviceIdCache() (+3 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.08
Nodes (23): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+15 more)

### Community 35 - "QueryProvider.tsx"
Cohesion: 0.16
Nodes (17): Üç ölü parça, üç ayrı ölüm biçimi, @tanstack/query-async-storage-persister, @tanstack/react-query-persist-client, FeedFilter, QUERY_KEY_VERSION, queryKeys, EnrichmentResponse, asyncStorageFromKv() (+9 more)

### Community 36 - "eventSchema.ts"
Cohesion: 0.16
Nodes (19): ArchiveCard(), EventFact, buildEvent(), BuildResult, daysInMonth(), EVENT_CATEGORIES, MAX_PHOTOS, MonthGrid (+11 more)

### Community 37 - "photos.ts"
Cohesion: 0.20
Nodes (17): ACCEPTED_TYPES, bucketName(), deleteEventPhotos(), deleteFolder(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES (+9 more)

### Community 38 - "store.tsx"
Cohesion: 0.17
Nodes (14): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState (+6 more)

### Community 39 - "qr.ts"
Cohesion: 0.24
Nodes (14): ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr(), setQrWindow() (+6 more)

### Community 40 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 41 - "(tabs)/index.tsx"
Cohesion: 0.11
Nodes (16): SponsorRoute(), styles, Task 9: Slider bileşeni — `src/components/HomeSlider.tsx`, 4.2 Ana sayfa (`app/(tabs)/index.tsx`), Announcement, src_announcements_announcement, HomeSlider(), KICKER (+8 more)

### Community 42 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "ref_node_path"
Cohesion: 0.36
Nodes (7): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), ref_node_path, parsed()

### Community 45 - "react-native-safe-area-context"
Cohesion: 0.19
Nodes (15): RaffleRulesRoute(), styles, react-native-safe-area-context, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE (+7 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`"
Cohesion: 0.20
Nodes (17): choiceOptions(), ChoiceRow, COPY, deleteForm(), formatDay(), imageBlock(), moveForm(), positionOptions() (+9 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.09
Nodes (43): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+35 more)

### Community 51 - "getDb"
Cohesion: 0.28
Nodes (15): Veri: kim neyi okuyor, kim yazıyor, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, 4.1 Okuma ve durum, Dosyalar, YoklamaHatasi, yoklamaVer(), loadProfile(), fetchContent() (+7 more)

### Community 52 - "check-release.mjs"
Cohesion: 0.20
Nodes (9): Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root, rulesBlock() (+1 more)

### Community 53 - "hermes-safe.test.ts"
Cohesion: 0.21
Nodes (13): Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, GundemRoute(), isTab(), Klasörler, clubCalendar(), clubHour(), ABSOLUTE_AFTER_DAYS, absoluteTr() (+5 more)

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
Cohesion: 0.05
Nodes (35): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules, Arşiv paneli, Bildirimler, Bildirimler nereden çıkıyor (+27 more)

### Community 58 - "useFallbackTranslation.ts"
Cohesion: 0.27
Nodes (6): useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 59 - "announcements.tsx"
Cohesion: 0.08
Nodes (29): AnnouncementRoute(), AnnouncementRow(), 1. Kapsam, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar (+21 more)

### Community 60 - "notification-sync.test.tsx"
Cohesion: 0.40
Nodes (4): mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs

### Community 61 - "ref_node_fs"
Cohesion: 0.22
Nodes (7): ref_node_fs, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "firebase.ts"
Cohesion: 0.10
Nodes (24): SponsorsRoute(), expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar, ContentProvider(), ContentSource (+16 more)

### Community 64 - "cursor.ts"
Cohesion: 0.24
Nodes (12): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+4 more)

### Community 65 - "readingText.ts"
Cohesion: 0.26
Nodes (9): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, Sekiz piksellik bir glif yolu okunarak değerlendirilemez, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody(), rowRuns() (+1 more)

### Community 66 - "QrRoute"
Cohesion: 0.27
Nodes (10): QrRoute(), @react-native-async-storage/async-storage, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId(), isQrToken(), parseQrPayload() (+2 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.17
Nodes (10): panelKoku(), 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 4. Bulgular, 6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, Kapatılmayan, bilerek (+2 more)

### Community 69 - "qrSchema.ts"
Cohesion: 0.21
Nodes (11): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, joinLocal(), LOCAL_OFFSET, defaultWindow(), pad(), QR_ACILIS_SAAT, QR_ALPHABET, QR_TOKEN_LENGTH (+3 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "notificationPlan.ts"
Cohesion: 0.27
Nodes (8): DIGEST_HOURS, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), REMINDER_CATEGORY, reminderOffsetMs()

### Community 72 - "mock/index.ts"
Cohesion: 0.19
Nodes (16): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, createMockRepositories(), mockArticles(), createMockDigestRepository(), createMockEnrichmentRepository(), createMockFeedRepository(), createMockSourceRepository() (+8 more)

### Community 74 - "Dosya haritası"
Cohesion: 0.19
Nodes (14): HomeRoute(), Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme, Task 11: Sponsor ekranları — `/sponsorlar`, `/sponsor/[id]`, Task 12: "Ödülü sağlayan" — `PrizeProviders`, Task 14: `check:release` kapsamı, belgeler, tam doğrulama (+6 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.19
Nodes (24): Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, 2. Kaynak metinden ayrıldığımız yerler, 5.4 Sunucu, 7. Test ve kontroller, Build, buildSlide(), buildSponsor(), byOrder() (+16 more)

### Community 81 - "data.ts"
Cohesion: 0.15
Nodes (11): ACCOUNT_DELETE_URL, ARCHIVE_CATEGORIES, DEPARTMENTS, LEGAL_BASE, NotificationCategory, ONBOARDING, OnboardingPage, PANEL_BASE_URL (+3 more)

### Community 82 - "summary-state.test.ts"
Cohesion: 0.27
Nodes (6): bodyFor(), hasSummary(), Segment, segmentState(), CONFIG, ArticleSummary

### Community 83 - "notificationsView.ts"
Cohesion: 0.29
Nodes (9): ceviriSatiri(), DeviceSummary, LogRow, MailStatus, notificationsPage(), num(), PendingRow, when() (+1 more)

### Community 84 - "notifications.tsx"
Cohesion: 0.31
Nodes (8): Bildirim gelmedi, nereye bakılır, ClubEvent, ensureAndroidChannel(), NotificationSync(), requestPushToken(), rescheduleReminders(), NotificationPrefs, Registration

### Community 85 - "4. Uygulama"
Cohesion: 0.25
Nodes (8): SatirLink(), Task 13: Hesabım — KULÜP grubu, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi, 4. Uygulama

### Community 86 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.25
Nodes (7): Dağıtım yüzeyleri, Git, İçerik girişi, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar

### Community 87 - "auth.ts"
Cohesion: 0.13
Nodes (23): HesapSilRoute(), CertificatesRoute(), firebase, yoklamaMesaji(), YoklamaSonucu, yoklamaVarMi(), currentUser(), deletionDone() (+15 more)

## Knowledge Gaps
- **621 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+616 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 768 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `ui.tsx` to `etkinlik/[id].tsx`, `QueryProvider.tsx`, `store.tsx`, `(tabs)/index.tsx`, `package.json`, `FeedView.tsx`, `react-native-safe-area-context`, `article-summary.test.tsx`, `notification-sync.test.tsx`, `useEnrichmentWarmup.ts`, `notifications.tsx`, `react-native`, `data-access/hooks.ts`, `qr.tsx`, `announcements.tsx`, `integration.test.tsx`, `hesap.tsx`, `firebase.ts`?**
  _High betweenness centrality (0.135) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `edge.ts`, `mock/repositories.ts`, `mock/index.ts`, `demo-account.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.084) - this node is a cross-community bridge._
- **Why does `ClubEvent` connect `notifications.tsx` to `push.ts`, `check-event-schema.ts`, `ui.tsx`, `server.ts`, `eventSchema.ts`, `notificationPlan.ts`, `mock/index.ts`, `(tabs)/index.tsx`, `vitrinSchema.ts`, `vitrin.ts`, `data.ts`, `firebase.ts`, `qr.tsx`, `2. Fikrin değerlendirmesi — zayıf noktalar`, `README.md`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _621 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0859538784067086 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.045739348370927316 - nodes in this community are weakly interconnected._