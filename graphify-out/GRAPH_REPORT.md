# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 250 files · ~307,375 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2122 nodes · 5685 edges · 96 communities (93 shown, 3 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 480 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `61207bae`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- etkinlik/[id].tsx
- takvim.tsx
- server.ts
- notificationPlan.ts
- data-access/hooks.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- enrichment-unavailable.test.tsx
- env.ts
- mock/repositories.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- react-native
- useFallbackTranslation.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- supabase/repositories.ts
- kayit-ol.tsx
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
- auth.ts
- hermes-safe.test.ts
- eventSchema.ts
- article-summary.test.tsx
- export-registrations.ts
- store.tsx
- photos.ts
- sync-deps.mjs
- 8. Fazlar
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- sponsors.tsx
- make-icons.py
- accountApi.ts
- attendance.ts
- translateApi.ts
- react
- qr.tsx
- check-bundle.mjs
- ref_node_path
- README.md
- Galeri, yenileme göstergesi, karşılama — tasarım
- announcementApi.ts
- src/otp.ts
- buildEvent
- repository
- admin/certificates.ts
- ref_node_fs
- readingText.ts
- Doğrulama ve teklik — plan ve kurulum
- tsconfig.json
- Review Focus
- qr.ts
- allowScripts
- Sponsorlar ve ana sayfa slider'ı — tasarım
- parseSourceUrl
- session-start.sh
- data.ts
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- firebase.ts
- vitrinSchema.ts
- ui.tsx
- mail.ts
- gate.ts
- Txt
- 4. Uygulama
- notifications.tsx
- app/_layout.tsx
- Kalıcı takvim, kare yükleme animasyonu, galeriyi dokunarak kapatma — tasarım
- notification-sync.test.tsx
- Sponsorlar ve ana sayfa slider'ı — uygulama planı
- Görseller
- icons.test.ts
- KOÜ Yazılım Kulübü — agent notes
- deploy-rules.mjs
- Mağazaya çıkarma
- (tabs)/index.tsx
- Yönetim paneli

## God Nodes (most connected - your core abstractions)
1. `react` - 83 edges
2. `react-native` - 53 edges
3. `Txt()` - 46 edges
4. `colors` - 44 edges
5. `Load-bearing decisions — the why log` - 38 edges
6. `esc()` - 37 edges
7. `expo-router` - 37 edges
8. `Dosya haritası` - 36 edges
9. `react-native-safe-area-context` - 35 edges
10. `useContent()` - 34 edges

## Surprising Connections (you probably didn't know these)
- `Review Focus` --references--> `sameMembers()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/ordering.ts
- `Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı` --references--> `PhotoUploadError`  [INFERRED]
  AGENTS.md → admin/photos.ts
- `Fazlar` --references--> `storage()`  [INFERRED]
  docs/ai-gundem-port.md → admin/photos.ts
- `Task 5: Panel görünümü — `admin/vitrinView.ts`, menü, CSS` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/views.ts
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts

## Import Cycles
- None detected.

## Communities (96 total, 3 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (53): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+45 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (38): parsePort(), resolvePort(), QR yoklama — kurulurken çıkanlar, archive, b64, cagir(), claimDb(), claimDb2() (+30 more)

### Community 2 - "check-security.ts"
Cohesion: 0.07
Nodes (33): attendanceRows(), zamanMetni(), clientIp(), CLOUDFLARE, cookieHeader(), guvenilenEs, iptalEdilen, issueToken() (+25 more)

### Community 3 - "etkinlik/[id].tsx"
Cohesion: 0.09
Nodes (33): Agent setup, keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials(), styles (+25 more)

### Community 4 - "takvim.tsx"
Cohesion: 0.12
Nodes (24): SponsorRoute(), styles, EventRow(), GridView(), MonthCard(), styles, TakvimRoute(), View_ (+16 more)

### Community 5 - "server.ts"
Cohesion: 0.08
Nodes (26): registeredNotPresent(), app, attempts, db, formDateTime(), formToInput(), inputToForm(), keptPhotos() (+18 more)

### Community 6 - "notificationPlan.ts"
Cohesion: 0.27
Nodes (8): DIGEST_HOURS, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), REMINDER_CATEGORY, reminderOffsetMs()

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.14
Nodes (24): GundemArticleRoute(), Bu turda **bilerek** düzeltilmeyenler, bodyFor(), hasSummary(), Segment, segmentState(), asDataError(), DataErrorThrown (+16 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.08
Nodes (37): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), keysetFilter(), utf8Bytes() (+29 more)

### Community 9 - "esc"
Cohesion: 0.11
Nodes (37): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+29 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (38): author, bugs, url, description, license, main, name, overrides (+30 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "enrichment-unavailable.test.tsx"
Cohesion: 0.10
Nodes (28): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), createMockRepositories(), NO_CONTENT_ARTICLE, createMockDigestRepository(), createMockEnrichmentRepository() (+20 more)

### Community 14 - "env.ts"
Cohesion: 0.08
Nodes (25): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, Task 1: Adla karşılama, blank, blankKeys, bogus, dev, devEmpty, forcedMock (+17 more)

### Community 15 - "mock/repositories.ts"
Cohesion: 0.08
Nodes (40): hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, mockDigest(), AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1 (+32 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.13
Nodes (36): moveBy(), placeAt(), sameMembers(), deletePhotos(), announcementChoices(), eventChoices(), Kind, notFound() (+28 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+27 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.11
Nodes (25): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW (+17 more)

### Community 19 - "pdf.ts"
Cohesion: 0.13
Nodes (21): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+13 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "react-native"
Cohesion: 0.11
Nodes (23): styles, styles, OnboardingRoute(), styles, styles, styles, TabBarProps, TABS (+15 more)

### Community 22 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.09
Nodes (22): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+14 more)

### Community 24 - "supabase/repositories.ts"
Cohesion: 0.11
Nodes (33): FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError(), toNetworkError(), createSupabaseRepositories() (+25 more)

### Community 25 - "kayit-ol.tsx"
Cohesion: 0.15
Nodes (27): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, BOS, DateFields(), SignupRoute(), styles, ageOn(), DateParts, EMAIL_RE (+19 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.10
Nodes (20): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About (+12 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.08
Nodes (23): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+15 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.07
Nodes (27): authed(), readCookie(), requireAuth(), 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap (+19 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.22
Nodes (7): failed, json(), pkg, read(), results, root, store

### Community 31 - "integration.test.tsx"
Cohesion: 0.09
Nodes (28): @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, clients, METRICS, mount(), QUERY_KEY_VERSION, asyncStorageFromKv() (+20 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (21): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+13 more)

### Community 33 - "kv.ts"
Cohesion: 0.15
Nodes (12): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+4 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.08
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "auth.ts"
Cohesion: 0.19
Nodes (16): HesapSilRoute(), Profile, authErrorMessage(), deletionDone(), finishAccountDeletion(), getAuthClient(), loadProfile(), requestAccountDeletion() (+8 more)

### Community 37 - "hermes-safe.test.ts"
Cohesion: 0.26
Nodes (10): GundemRoute(), isTab(), clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr() (+2 more)

### Community 38 - "eventSchema.ts"
Cohesion: 0.12
Nodes (18): ListView(), AnnouncementsProvider(), AnnouncementsValue, Ctx, EventFact, BuildResult, EVENT_CATEGORIES, LOCAL_OFFSET (+10 more)

### Community 39 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 40 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "store.tsx"
Cohesion: 0.17
Nodes (14): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState (+6 more)

### Community 42 - "photos.ts"
Cohesion: 0.21
Nodes (15): ACCEPTED_TYPES, bucketName(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage(), pathFromUrl() (+7 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "8. Fazlar"
Cohesion: 0.17
Nodes (11): Güvenlik taraması — sekiz sessiz delik ve kapatılmayan ikisi, LoginRoute(), 8. Fazlar, Faz 1 — kimlik altyapısı, UI yok, Faz 2 — giriş, profil, eşleşmiş kayıt, Faz 3 — hesap silme (mağaza şartı), Faz 4 — QR yoklama ve çekiliş, Faz 5 — sertifika (+3 more)

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.20
Nodes (14): RaffleRulesRoute(), styles, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB (+6 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "sponsors.tsx"
Cohesion: 0.06
Nodes (50): SponsorsRoute(), Klasörler, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 2: Hook'lar ve ana sayfa kopyayla açılıyor (+42 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.09
Nodes (35): AuthLike, bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku() (+27 more)

### Community 51 - "attendance.ts"
Cohesion: 0.18
Nodes (14): CertificatesRoute(), firebase, YoklamaHatasi, yoklamaVarMi(), yoklamaVer(), currentUser(), refreshVerification(), sertifikalarimiGetir() (+6 more)

### Community 52 - "translateApi.ts"
Cohesion: 0.16
Nodes (15): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, Bagimliliklar (+7 more)

### Community 53 - "react"
Cohesion: 0.05
Nodes (44): Galeri, yenileme göstergesi, karşılama — uygulama planı, Review Focus, Task 2: PixelLoader'lı yenileme göstergesi, Task 3: Yakınlaştırılabilir görsel, Task 4: Tam ekran görüntüleyici, Task 5: Otomatik kaydırma ortak hook'a, Task 6: Hero slider ve etkinlik detayı, Task 7: Kapanış (+36 more)

### Community 54 - "qr.tsx"
Cohesion: 0.14
Nodes (23): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, Durum, QrRoute(), styles, @react-native-async-storage/async-storage, yoklamaMesaji(), YoklamaSonucu, bekleyeniOku() (+15 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "ref_node_path"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_path, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 57 - "README.md"
Cohesion: 0.15
Nodes (12): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Katkı, Lisans, Ne yapıyor, Proje yapısı (+4 more)

### Community 58 - "Galeri, yenileme göstergesi, karşılama — tasarım"
Cohesion: 0.29
Nodes (6): 2. Yenileme göstergesi, 3. Karşılama, 4. iOS'ta giriş yapmadan arşiv — değerlendirme, 6. Dağıtım yüzeyleri, 7. Reddedilenler, Galeri, yenileme göstergesi, karşılama — tasarım

### Community 59 - "announcementApi.ts"
Cohesion: 0.21
Nodes (10): 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli, fetchAnnouncement(), getJson() (+2 more)

### Community 60 - "src/otp.ts"
Cohesion: 0.24
Nodes (13): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), digits(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir() (+5 more)

### Community 61 - "buildEvent"
Cohesion: 0.18
Nodes (14): ArchiveCard(), ArsivRoute(), İçerik girişi, Global Constraints, Kalıcı takvim, kare yükleme animasyonu, galeriyi dokunarak kapatma — uygulama planı, addMonths(), buildEvent(), dayLabelOf() (+6 more)

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "admin/certificates.ts"
Cohesion: 0.10
Nodes (27): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+19 more)

### Community 64 - "ref_node_fs"
Cohesion: 0.36
Nodes (7): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), ref_node_fs, parsed()

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "Review Focus"
Cohesion: 0.33
Nodes (6): Review Focus, Task 1: Kare yükleme animasyonu, Task 2: Takvimin saf hesabı, Task 3: `MonthCalendar`, Task 5: Soluk alana dokununca kapatma, Task 6: Kapanış

### Community 69 - "qr.ts"
Cohesion: 0.25
Nodes (13): ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr(), setQrWindow() (+5 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "Sponsorlar ve ana sayfa slider'ı — tasarım"
Cohesion: 0.17
Nodes (11): 1. Kapsam, 5.1 Menü, 5.2 Liste sayfası, 5.3 Formlar, 5.5 Süresi dolan slaytları silen zamanlayıcı, 5.6 Görünüm, 5. Panel, 6. Durum tablosu (uygulama) (+3 more)

### Community 72 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "data.ts"
Cohesion: 0.17
Nodes (10): ACCOUNT_DELETE_URL, ARCHIVE_CATEGORIES, DEPARTMENTS, LEGAL_BASE, NotificationCategory, ONBOARDING, OnboardingPage, SPONSOR_CONTACT_EMAIL (+2 more)

### Community 75 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.29
Nodes (6): Dağıtım yüzeyleri, Git, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar

### Community 77 - "firebase.ts"
Cohesion: 0.20
Nodes (21): From the 1.1.0 release, Veri: kim neyi okuyor, kim yazıyor, 4.1 Okuma ve durum, Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, Dosyalar, EAS derlemelerinde, Firebase (+13 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.14
Nodes (34): deleteFolder(), runSlideSweep(), startSlideSweeper(), Dosya haritası, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 3: Panel sıralaması — `admin/ordering.ts`, Task 4: Panel görselleri — `admin/photos.ts` genelleşiyor (+26 more)

### Community 79 - "ui.tsx"
Cohesion: 0.12
Nodes (39): BildirimAyarlariRoute(), styles, styles, styles, styles, styles, styles, styles (+31 more)

### Community 80 - "mail.ts"
Cohesion: 0.22
Nodes (9): initMail(), Mail, MailConfig, MailEki, MailEnv, mailFrom(), MailResult, readMailConfig() (+1 more)

### Community 81 - "gate.ts"
Cohesion: 0.29
Nodes (8): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW

### Community 82 - "Txt"
Cohesion: 0.09
Nodes (33): Conventions, styles, styles, Tab, Kurallar ve tuzaklar, Global Constraints, Global Constraints, 4.3 `/sponsorlar` (`app/sponsorlar.tsx`) (+25 more)

### Community 83 - "4. Uygulama"
Cohesion: 0.25
Nodes (8): SatirLink(), Task 13: Hesabım — KULÜP grubu, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi, 4. Uygulama

### Community 84 - "notifications.tsx"
Cohesion: 0.31
Nodes (8): ClubEvent, DeviceRecord, ensureAndroidChannel(), NotificationSync(), requestPushToken(), rescheduleReminders(), NotificationPrefs, Registration

### Community 85 - "app/_layout.tsx"
Cohesion: 0.25
Nodes (5): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar

### Community 86 - "Kalıcı takvim, kare yükleme animasyonu, galeriyi dokunarak kapatma — tasarım"
Cohesion: 0.33
Nodes (5): 2. Kalıcı takvim, 3. Galeriyi soluk alana dokunarak kapatma, 4. Test, 5. Dağıtım yüzeyleri, Kalıcı takvim, kare yükleme animasyonu, galeriyi dokunarak kapatma — tasarım

### Community 87 - "notification-sync.test.tsx"
Cohesion: 0.40
Nodes (4): mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs

### Community 89 - "Görseller"
Cohesion: 0.67
Nodes (3): Görseller, Kurulum, Neden Firebase Storage değil

### Community 91 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 95 - "KOÜ Yazılım Kulübü — agent notes"
Cohesion: 0.33
Nodes (5): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules

### Community 96 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 97 - "Mağazaya çıkarma"
Cohesion: 0.33
Nodes (6): Build'e hangi değerler giriyor, İkonlar ve mağaza görselleri, Mağazaya çıkarma, "Otomatik artsın" isteniyorsa, Sürüm ne zaman elle artırılır, Sürüm numaraları

### Community 98 - "(tabs)/index.tsx"
Cohesion: 0.13
Nodes (13): AnnouncementRoute(), styles, AnnouncementRow(), styles, Announcement, src_announcements_announcement, src_announcements_fetchannouncement, formatAnnouncementDate() (+5 more)

### Community 100 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

## Knowledge Gaps
- **665 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+660 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 819 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `etkinlik/[id].tsx`, `takvim.tsx`, `data-access/hooks.ts`, `package.json`, `store.ts`, `enrichment-unavailable.test.tsx`, `useEnrichmentWarmup.ts`, `react-native`, `kayit-ol.tsx`, `integration.test.tsx`, `auth.ts`, `eventSchema.ts`, `article-summary.test.tsx`, `store.tsx`, `cekilis-kurallari.tsx`, `sponsors.tsx`, `qr.tsx`, `ui.tsx`, `Txt`, `notifications.tsx`, `app/_layout.tsx`, `notification-sync.test.tsx`, `(tabs)/index.tsx`?**
  _High betweenness centrality (0.153) - this node is a cross-community bridge._
- **Why does `err()` connect `enrichment-unavailable.test.tsx` to `push.ts`, `check-panel.ts`, `server.ts`, `export-registrations.ts`, `mock/repositories.ts`, `demo-account.ts`, `supabase/repositories.ts`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **Why does `react-native` connect `react-native` to `(tabs)/index.tsx`, `etkinlik/[id].tsx`, `takvim.tsx`, `store.tsx`, `package.json`, `cekilis-kurallari.tsx`, `ui.tsx`, `Txt`, `notifications.tsx`, `app/_layout.tsx`, `qr.tsx`, `react`, `kayit-ol.tsx`, `integration.test.tsx`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _665 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0780399274047187 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05410628019323672 - nodes in this community are weakly interconnected._