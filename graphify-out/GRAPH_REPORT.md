# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 214 files · ~282,690 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1906 nodes · 4879 edges · 90 communities (85 shown, 5 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 335 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `d9d3c443`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- kayit-ol.tsx
- ui.tsx
- server.ts
- supabase/repositories.ts
- mock/repositories.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- QueryProvider.tsx
- env.ts
- admin/certificates.ts
- data-access/repositories.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- theme.ts
- getDb
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
- accountSchema.ts
- REPOSITORY_CONTRACT_VERSION
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- react-native
- vitrinSchema.ts
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- accountApi.ts
- Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`
- app/_layout.tsx
- store.tsx
- devDependencies
- data.ts
- react
- eventSchema.ts
- sync-deps.mjs
- credentials.ts
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- firebase.ts
- make-icons.py
- notifications.tsx
- Load-bearing decisions — the why log
- check-release.mjs
- clubCalendar
- Doğrulama ve teklik — plan ve kurulum
- check-bundle.mjs
- photos.ts
- README.md
- useFallbackTranslation.ts
- hesap.tsx
- qr.ts
- check-env.ts
- Dosya haritası
- FeedView.tsx
- translateApi.ts
- clientIp
- qrSchema.ts
- tsconfig.json
- deploy-rules.mjs
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- allowScripts
- readingText.ts
- parseSourceUrl
- session-start.sh
- QrRoute
- article-summary.test.tsx
- Sponsorlar ve ana sayfa slider'ı — tasarım
- 4. Uygulama
- KOÜ Yazılım Kulübü — agent notes
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- Mağazaya çıkarma
- @testing-library/react-native
- repository
- icons.test.ts
- Yönetim paneli
- Görseller
- bugs
- overrides

## God Nodes (most connected - your core abstractions)
1. `react` - 57 edges
2. `react-native` - 42 edges
3. `Txt()` - 39 edges
4. `colors` - 37 edges
5. `Load-bearing decisions — the why log` - 37 edges
6. `expo-router` - 32 edges
7. `useContent()` - 31 edges
8. `Dosya haritası` - 30 edges
9. `esc()` - 28 edges
10. `useAppStore()` - 27 edges

## Surprising Connections (you probably didn't know these)
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları` --references--> `tohum()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → scripts/check-rules.mjs
- `2. Yeni testler` --references--> `izin()`  [INFERRED]
  docs/guvenlik-testleri-degerlendirmesi.md → scripts/check-rules.mjs
- `5.3 Formlar` --references--> `fetchAnnouncements()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → src/announcementApi.ts
- `2. Doğrulama neden Firebase'in bağlantısı değil` --references--> `refreshVerification()`  [INFERRED]
  docs/dogrulama-ve-teklik-plani.md → src/auth.ts

## Import Cycles
- None detected.

## Communities (90 total, 5 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.07
Nodes (57): announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending(), pendingSummary() (+49 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.04
Nodes (38): decideSend(), kayit(), makeCode(), OTP_MAX_ATTEMPTS, OTP_MAX_SENDS, OTP_RESEND_MS, OTP_SEND_WINDOW_MS, OTP_TTL_MS (+30 more)

### Community 2 - "check-security.ts"
Cohesion: 0.08
Nodes (23): AuthLike, CLOUDFLARE, cookieHeader(), guvenilenEs, iptalEdilen, issueToken(), LOGIN_LOCK_MS, LOGIN_MAX_FAILURES (+15 more)

### Community 3 - "kayit-ol.tsx"
Cohesion: 0.15
Nodes (21): LoginRoute(), BOS, SignupRoute(), styles, formatPhone(), normalizePhone(), Profile, SignupInput (+13 more)

### Community 4 - "ui.tsx"
Cohesion: 0.08
Nodes (46): Conventions, styles, styles, styles, styles, Tab, EventRow(), GridView() (+38 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (30): attendanceRows(), registeredNotPresent(), zamanMetni(), app, attempts, authed(), db, formDateTime() (+22 more)

### Community 6 - "supabase/repositories.ts"
Cohesion: 0.08
Nodes (42): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+34 more)

### Community 7 - "mock/repositories.ts"
Cohesion: 0.10
Nodes (26): createMockRepositories(), cursorOfArticle(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, mockArticles(), mockDigest(), createMockDigestRepository(), createMockEnrichmentRepository() (+18 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.12
Nodes (27): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+19 more)

### Community 9 - "esc"
Cohesion: 0.11
Nodes (37): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+29 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (36): author, description, license, main, name, private, version, expo (+28 more)

### Community 12 - "store.ts"
Cohesion: 0.15
Nodes (36): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), orderBySaved(), SavedView(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles() (+28 more)

### Community 13 - "QueryProvider.tsx"
Cohesion: 0.12
Nodes (25): GundemRoute(), isTab(), @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, clients, METRICS, mount() (+17 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "admin/certificates.ts"
Cohesion: 0.08
Nodes (32): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+24 more)

### Community 16 - "data-access/repositories.ts"
Cohesion: 0.09
Nodes (34): Bu turda **bilerek** düzeltilmeyenler, MOCK_NOW_ISO, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1, EnrichmentRepository, EnrichmentRepositoryV1 (+26 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.12
Nodes (24): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW (+16 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (26): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+18 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.12
Nodes (26): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+18 more)

### Community 21 - "theme.ts"
Cohesion: 0.08
Nodes (32): Agent setup, BildirimAyarlariRoute(), styles, SplashRoute(), styles, RegistrationDoneRoute(), styles, OnboardingRoute() (+24 more)

### Community 22 - "getDb"
Cohesion: 0.14
Nodes (21): HesapSilRoute(), CertificatesRoute(), firebase, YoklamaHatasi, yoklamaMesaji(), YoklamaSonucu, yoklamaVarMi(), yoklamaVer() (+13 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.12
Nodes (26): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS (+18 more)

### Community 25 - "accountSchema.ts"
Cohesion: 0.20
Nodes (17): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), ageOn(), DateParts, digits(), EMAIL_RE, FieldErrors, isValidSignup() (+9 more)

### Community 26 - "REPOSITORY_CONTRACT_VERSION"
Cohesion: 0.17
Nodes (12): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), REPOSITORY_CONTRACT_VERSION, createUnconfiguredRepositories(), Article, ARTICLES (+4 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (22): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil, K5 — Testler geliyor, kırpılarak (+14 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (25): requireAuth(), 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i (+17 more)

### Community 30 - "react-native"
Cohesion: 0.22
Nodes (20): styles, styles, styles, Durum, styles, styles, styles, expo-router (+12 more)

### Community 31 - "vitrinSchema.ts"
Cohesion: 0.22
Nodes (17): 5.4 Sunucu, 7. Test ve kontroller, Build, buildSlide(), buildSponsor(), https(), idList(), isKicker() (+9 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (18): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+10 more)

### Community 33 - "kv.ts"
Cohesion: 0.14
Nodes (13): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+5 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (19): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+11 more)

### Community 35 - "accountApi.ts"
Cohesion: 0.15
Nodes (22): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+14 more)

### Community 36 - "Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`"
Cohesion: 0.31
Nodes (7): moveBy(), placeAt(), sameMembers(), Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`, SlideTarget

### Community 37 - "app/_layout.tsx"
Cohesion: 0.20
Nodes (8): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar, FIREBASE_SETUP_HINT, firebaseConfig, isFirebaseConfigured

### Community 38 - "store.tsx"
Cohesion: 0.17
Nodes (14): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState (+6 more)

### Community 39 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 40 - "data.ts"
Cohesion: 0.08
Nodes (38): keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials(), styles, RegistrationRoute() (+30 more)

### Community 41 - "react"
Cohesion: 0.15
Nodes (15): AnnouncementRoute(), styles, AnnouncementRow(), HomeRoute(), styles, TakvimRoute(), react, Announcement (+7 more)

### Community 42 - "eventSchema.ts"
Cohesion: 0.11
Nodes (25): today(), QR yoklama — kurulurken çıkanlar, ArchiveCard(), EventFact, buildEvent(), BuildResult, daysInMonth(), EVENT_CATEGORIES (+17 more)

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
Cohesion: 0.17
Nodes (9): ref_node_os, assert(), emu, izin(), JAR, KURALLAR, red(), sonuc() (+1 more)

### Community 48 - "firebase.ts"
Cohesion: 0.16
Nodes (21): From the 1.1.0 release, Veri: kim neyi okuyor, kim yazıyor, 4.1 Okuma ve durum, Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, Dosyalar, EAS derlemelerinde, Firebase (+13 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "notifications.tsx"
Cohesion: 0.18
Nodes (16): ClubEvent, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), QUIET_END_HOUR, QUIET_START_HOUR (+8 more)

### Community 51 - "Load-bearing decisions — the why log"
Cohesion: 0.12
Nodes (17): Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti, İşi telefon yaratıyordu, sunucu değil — ve bu defterdeki bir satır yanlıştı (+9 more)

### Community 52 - "check-release.mjs"
Cohesion: 0.16
Nodes (11): Güvenlik taraması — sekiz sessiz delik ve kapatılmayan ikisi, Faz 1 — kimlik altyapısı, UI yok, ref_node_fs, failed, json(), pkg, read(), results (+3 more)

### Community 53 - "clubCalendar"
Cohesion: 0.36
Nodes (7): clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW

### Community 54 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "photos.ts"
Cohesion: 0.17
Nodes (21): ACCEPTED_TYPES, bucketName(), deleteEventPhotos(), deleteFolder(), deletePhotos(), FOLDERS, isBucketMissing(), keyProblem() (+13 more)

### Community 57 - "README.md"
Cohesion: 0.15
Nodes (12): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Katkı, Lisans, Ne yapıyor, Proje yapısı (+4 more)

### Community 58 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 59 - "hesap.tsx"
Cohesion: 0.18
Nodes (16): VerifyRoute(), ResetPasswordRoute(), HesapRoute(), OgrenciNo(), styles, refreshVerification(), useAuth(), cagir() (+8 more)

### Community 60 - "qr.ts"
Cohesion: 0.24
Nodes (13): ATTENDANCE_COLLECTION, ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr() (+5 more)

### Community 61 - "check-env.ts"
Cohesion: 0.14
Nodes (13): csvCell(), RFC-4180, dotenv, app, OPTIONAL, ortak, panel, root (+5 more)

### Community 62 - "Dosya haritası"
Cohesion: 0.22
Nodes (18): Dosya haritası, Task 11: Sponsor ekranları — `/sponsorlar`, `/sponsor/[id]`, Task 12: "Ödülü sağlayan" — `PrizeProviders`, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 3: Panel sıralaması — `admin/ordering.ts`, Task 7: Tema, `PhotoSlot`, iletişim adresi, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides` (+10 more)

### Community 63 - "FeedView.tsx"
Cohesion: 0.16
Nodes (16): asDataError(), GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo() (+8 more)

### Community 64 - "translateApi.ts"
Cohesion: 0.17
Nodes (16): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, loginLimiter() (+8 more)

### Community 65 - "clientIp"
Cohesion: 0.40
Nodes (4): clientIp(), Güvenlik testlerinin değerlendirmesi — testin ölçmediği şey, 1. Mevcut testler ne ölçüyordu, safeNext()

### Community 66 - "qrSchema.ts"
Cohesion: 0.26
Nodes (10): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, toLocalIso(), defaultWindow(), makeQrToken(), pad(), QR_ACILIS_SAAT, QR_ALPHABET, QR_TOKEN_LENGTH (+2 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 69 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.17
Nodes (11): alreadyAnnounced(), Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, Dağıtım yüzeyleri, Git, İçerik girişi, Klasörler, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG) (+3 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 72 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "QrRoute"
Cohesion: 0.25
Nodes (11): QrRoute(), @react-native-async-storage/async-storage, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId(), isQrToken(), parseQrPayload() (+3 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 78 - "Sponsorlar ve ana sayfa slider'ı — tasarım"
Cohesion: 0.11
Nodes (18): 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli (+10 more)

### Community 79 - "4. Uygulama"
Cohesion: 0.25
Nodes (8): SatirLink(), Task 13: Hesabım — KULÜP grubu, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi, 4. Uygulama

### Community 80 - "KOÜ Yazılım Kulübü — agent notes"
Cohesion: 0.33
Nodes (5): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules

### Community 81 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.33
Nodes (5): 2. Yeni testler, 3. Karşılaştırma: aynı testler eski koda karşı, 5. Testin kendisinden çıkan dersler, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24

### Community 82 - "Mağazaya çıkarma"
Cohesion: 0.33
Nodes (6): Build'e hangi değerler giriyor, İkonlar ve mağaza görselleri, Mağazaya çıkarma, "Otomatik artsın" isteniyorsa, Sürüm ne zaman elle artırılır, Sürüm numaraları

### Community 83 - "@testing-library/react-native"
Cohesion: 0.33
Nodes (5): @testing-library/react-native, mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs

### Community 84 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 85 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 86 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

### Community 87 - "Görseller"
Cohesion: 0.67
Nodes (3): Görseller, Kurulum, Neden Firebase Storage değil

## Knowledge Gaps
- **609 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+604 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 748 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `push.ts`, `kayit-ol.tsx`, `ui.tsx`, `supabase/repositories.ts`, `package.json`, `store.ts`, `QueryProvider.tsx`, `useEnrichmentWarmup.ts`, `theme.ts`, `data-access/hooks.ts`, `react-native`, `app/_layout.tsx`, `store.tsx`, `data.ts`, `cekilis-kurallari.tsx`, `notifications.tsx`, `hesap.tsx`, `FeedView.tsx`, `article-summary.test.tsx`, `@testing-library/react-native`?**
  _High betweenness centrality (0.107) - this node is a cross-community bridge._
- **Why does `err()` connect `mock/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `supabase/repositories.ts`, `data-access/repositories.ts`, `demo-account.ts`, `REPOSITORY_CONTRACT_VERSION`, `check-env.ts`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **Why does `firebase-admin` connect `admin/certificates.ts` to `push.ts`, `check-panel.ts`, `accountApi.ts`, `server.ts`, `package.json`, `demo-account.ts`, `qr.ts`, `check-env.ts`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _609 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06826923076923076 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._