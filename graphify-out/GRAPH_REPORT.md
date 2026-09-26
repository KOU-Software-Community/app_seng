# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 226 files · ~290,737 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1976 nodes · 5238 edges · 94 communities (91 shown, 3 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 369 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8931862d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- cekilis/[id].tsx
- Txt
- server.ts
- edge.ts
- mock/repositories.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- supabase/repositories.ts
- env.ts
- certificateDelivery.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- ui.tsx
- devDependencies
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
- theme.ts
- Load-bearing decisions — the why log
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- src/otp.ts
- integration.test.tsx
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- kayit-ol.tsx
- eventSchema.ts
- photos.ts
- store.tsx
- qr.ts
- Doğrulama ve teklik — plan ve kurulum
- (tabs)/index.tsx
- deploy-rules.mjs
- sync-deps.mjs
- types.ts
- cekilis-kurallari.tsx
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
- enrichment-unavailable.test.tsx
- readingText.ts
- QrRoute
- tsconfig.json
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- qrSchema.ts
- allowScripts
- ClubEvent
- parseSourceUrl
- session-start.sh
- Dosya haritası
- article-summary.test.tsx
- vitrinSchema.ts
- auth.ts
- admin/certificates.ts
- data.ts
- react
- FeedView
- notifications.tsx
- 4. Uygulama
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- attendance.ts
- duyuru/[id].tsx
- KOÜ Yazılım Kulübü — agent notes
- Mağazaya çıkarma
- icons.test.ts
- Yönetim paneli
- Görseller

## God Nodes (most connected - your core abstractions)
1. `react` - 67 edges
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
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts

## Import Cycles
- None detected.

## Communities (94 total, 3 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (52): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+44 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (38): decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS, OTP_MAX_SENDS, OTP_RESEND_MS (+30 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (43): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+35 more)

### Community 3 - "cekilis/[id].tsx"
Cohesion: 0.12
Nodes (20): Agent setup, BildirimAyarlariRoute(), keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, SplashRoute(), styles (+12 more)

### Community 4 - "Txt"
Cohesion: 0.10
Nodes (29): Conventions, ArsivRoute(), styles, styles, Tab, Kurallar ve tuzaklar, Global Constraints, 4.3 `/sponsorlar` (`app/sponsorlar.tsx`) (+21 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (27): pdfDurumu, ACCEPTED_TYPES, parsePort(), resolvePort(), app, attempts, db, formDateTime() (+19 more)

### Community 6 - "edge.ts"
Cohesion: 0.16
Nodes (11): callEdgeFunction(), CODE_MAP, EDGE_TIMEOUT_MS, EdgeCallOptions, EdgeConfig, EdgeErrorEnvelope, isEnvelope(), DataErrorCode (+3 more)

### Community 7 - "mock/repositories.ts"
Cohesion: 0.11
Nodes (24): compareArticles(), src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1, EnrichmentRepository (+16 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.08
Nodes (38): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+30 more)

### Community 9 - "esc"
Cohesion: 0.10
Nodes (39): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+31 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (38): author, bugs, url, description, license, main, name, overrides (+30 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (34): GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings(), clearRecentSearches() (+26 more)

### Community 13 - "supabase/repositories.ts"
Cohesion: 0.11
Nodes (38): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+30 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "certificateDelivery.ts"
Cohesion: 0.13
Nodes (20): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+12 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.22
Nodes (19): moveBy(), placeAt(), sameMembers(), deletePhotos(), announcementChoices(), eventChoices(), Kind, notFound() (+11 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.11
Nodes (25): FeedFilter, QUERY_KEY_VERSION, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY (+17 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (25): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+17 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "ui.tsx"
Cohesion: 0.09
Nodes (27): styles, OnboardingRoute(), styles, styles, TabBarProps, TABS, PixelArt(), PixelIcon() (+19 more)

### Community 22 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.09
Nodes (22): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+14 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.20
Nodes (20): Bu turda **bilerek** düzeltilmeyenler, P9 — grafiğe dayalı temizlik turu (2026-09-02), asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage() (+12 more)

### Community 25 - "theme.ts"
Cohesion: 0.17
Nodes (25): styles, styles, styles, styles, styles, Durum, styles, styles (+17 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.12
Nodes (17): Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti, İşi telefon yaratıyordu, sunucu değil — ve bu defterdeki bir satır yanlıştı (+9 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (22): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+14 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (24): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+16 more)

### Community 30 - "src/otp.ts"
Cohesion: 0.25
Nodes (12): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir(), OtpError (+4 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.10
Nodes (29): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, @testing-library/react-native, clients, METRICS, mount() (+21 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (19): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+11 more)

### Community 33 - "kv.ts"
Cohesion: 0.14
Nodes (12): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+4 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "kayit-ol.tsx"
Cohesion: 0.17
Nodes (23): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, BOS, DateFields(), SignupRoute(), styles, ageOn(), DateParts, digits() (+15 more)

### Community 36 - "eventSchema.ts"
Cohesion: 0.13
Nodes (23): ArchiveCard(), İçerik girişi, EventFact, buildEvent(), BuildResult, daysInMonth(), EVENT_CATEGORIES, EventInput (+15 more)

### Community 37 - "photos.ts"
Cohesion: 0.24
Nodes (16): bucketName(), deleteEventPhotos(), deleteFolder(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage() (+8 more)

### Community 38 - "store.tsx"
Cohesion: 0.17
Nodes (14): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState (+6 more)

### Community 39 - "qr.ts"
Cohesion: 0.16
Nodes (20): ATTENDANCE_COLLECTION, attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION (+12 more)

### Community 40 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 41 - "(tabs)/index.tsx"
Cohesion: 0.08
Nodes (37): EventDetailRoute(), initials(), styles, SponsorRoute(), styles, HomeRoute(), styles, GridView() (+29 more)

### Community 42 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "types.ts"
Cohesion: 0.17
Nodes (15): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), REPOSITORY_CONTRACT_VERSION, createUnconfiguredRepositories(), Digest, DigestId (+7 more)

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.20
Nodes (14): RaffleRulesRoute(), styles, RaffleNotice(), styles, APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB (+6 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.17
Nodes (9): ref_node_os, assert(), emu, izin(), JAR, KURALLAR, red(), sonuc() (+1 more)

### Community 48 - "Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`"
Cohesion: 0.21
Nodes (16): choiceOptions(), ChoiceRow, COPY, deleteForm(), formatDay(), imageBlock(), moveForm(), positionOptions() (+8 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.15
Nodes (20): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+12 more)

### Community 51 - "getDb"
Cohesion: 0.20
Nodes (18): From the 1.1.0 release, Veri: kim neyi okuyor, kim yazıyor, Bildirimler nereden çıkıyor, Dosyalar, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı (+10 more)

### Community 52 - "check-release.mjs"
Cohesion: 0.20
Nodes (9): Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root, rulesBlock() (+1 more)

### Community 53 - "hermes-safe.test.ts"
Cohesion: 0.26
Nodes (10): GundemRoute(), isTab(), clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr() (+2 more)

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
Cohesion: 0.15
Nodes (12): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Katkı, Lisans, Ne yapıyor, Proje yapısı (+4 more)

### Community 58 - "useFallbackTranslation.ts"
Cohesion: 0.13
Nodes (14): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, GundemArticleRoute(), PANEL_BASE_URL, bodyFor(), hasSummary(), Segment, segmentState(), useFallbackTranslation() (+6 more)

### Community 59 - "announcements.tsx"
Cohesion: 0.16
Nodes (15): 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli, fetchAnnouncement(), fetchAnnouncements() (+7 more)

### Community 60 - "notification-sync.test.tsx"
Cohesion: 0.40
Nodes (4): mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs

### Community 61 - "ref_node_fs"
Cohesion: 0.15
Nodes (14): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), ref_node_fs, ref_node_path, app (+6 more)

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "firebase.ts"
Cohesion: 0.17
Nodes (12): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar, RegistrationPayload, FIREBASE_SETUP_HINT, firebaseConfig (+4 more)

### Community 64 - "enrichment-unavailable.test.tsx"
Cohesion: 0.20
Nodes (13): createMockRepositories(), mockArticles(), NO_CONTENT_ARTICLE, createMockDigestRepository(), createMockEnrichmentRepository(), createMockFeedRepository(), createMockSourceRepository(), Repositories (+5 more)

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "QrRoute"
Cohesion: 0.27
Nodes (10): QrRoute(), @react-native-async-storage/async-storage, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId(), isQrToken(), parseQrPayload() (+2 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.20
Nodes (8): 1. Mevcut testler ne ölçüyordu, 2. Yeni testler, 3. Karşılaştırma: aynı testler eski koda karşı, 5. Testin kendisinden çıkan dersler, 6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 69 - "qrSchema.ts"
Cohesion: 0.16
Nodes (14): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, Klasörler, clubHour(), joinLocal(), LOCAL_OFFSET, defaultWindow(), pad(), Pencere (+6 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "ClubEvent"
Cohesion: 0.25
Nodes (10): ClubEvent, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), REMINDER_CATEGORY, reminderOffsetMs() (+2 more)

### Community 72 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "Dosya haritası"
Cohesion: 0.22
Nodes (17): Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 3: Panel sıralaması — `admin/ordering.ts`, Task 7: Tema, `PhotoSlot`, iletişim adresi, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides` (+9 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.23
Nodes (19): 5.4 Sunucu, 7. Test ve kontroller, Build, buildSlide(), buildSponsor(), expiredSlideIds(), https(), idList() (+11 more)

### Community 79 - "auth.ts"
Cohesion: 0.26
Nodes (14): LoginRoute(), HesapSilRoute(), normalizeEmail(), toProfile(), authErrorMessage(), deletionDone(), finishAccountDeletion(), getAuthClient() (+6 more)

### Community 80 - "admin/certificates.ts"
Cohesion: 0.16
Nodes (12): BELGE_NO_UZUNLUK, BulunanSertifika, findCertificate(), makeBelgeNo(), publishCertificates(), revokeCertificate(), SertifikaKaydi, YayinGirdisi (+4 more)

### Community 81 - "data.ts"
Cohesion: 0.08
Nodes (26): RegistrationRoute(), styles, HesapRoute(), styles, src_auth_user, AuthState, Ctx, useAuth() (+18 more)

### Community 82 - "react"
Cohesion: 0.19
Nodes (8): SponsorsRoute(), styles, react, styles, SPONSOR_CONTACT_EMAIL, ./firebase, mockPush, METRICS

### Community 83 - "FeedView"
Cohesion: 0.27
Nodes (9): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW (+1 more)

### Community 84 - "notifications.tsx"
Cohesion: 0.24
Nodes (10): Bildirim gelmedi, nereye bakılır, expo-constants, expo-device, expo-notifications, DeviceRecord, ensureAndroidChannel(), lazyUpsertDevice(), NotificationSync() (+2 more)

### Community 85 - "4. Uygulama"
Cohesion: 0.10
Nodes (19): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi (+11 more)

### Community 86 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.29
Nodes (6): Dağıtım yüzeyleri, Git, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar

### Community 87 - "attendance.ts"
Cohesion: 0.15
Nodes (16): CertificatesRoute(), firebase, YoklamaHatasi, yoklamaMesaji(), YoklamaSonucu, yoklamaVarMi(), yoklamaVer(), currentUser() (+8 more)

### Community 88 - "duyuru/[id].tsx"
Cohesion: 0.24
Nodes (8): AnnouncementRoute(), styles, AnnouncementRow(), Announcement, src_announcements_announcement, src_announcements_fetchannouncement, formatAnnouncementDate(), RichText()

### Community 89 - "KOÜ Yazılım Kulübü — agent notes"
Cohesion: 0.33
Nodes (5): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules

### Community 90 - "Mağazaya çıkarma"
Cohesion: 0.33
Nodes (6): Build'e hangi değerler giriyor, İkonlar ve mağaza görselleri, Mağazaya çıkarma, "Otomatik artsın" isteniyorsa, Sürüm ne zaman elle artırılır, Sürüm numaraları

### Community 91 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 92 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

### Community 93 - "Görseller"
Cohesion: 0.67
Nodes (3): Görseller, Kurulum, Neden Firebase Storage değil

## Knowledge Gaps
- **623 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+618 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 771 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `cekilis/[id].tsx`, `Txt`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `ui.tsx`, `data-access/hooks.ts`, `theme.ts`, `integration.test.tsx`, `kayit-ol.tsx`, `store.tsx`, `(tabs)/index.tsx`, `cekilis-kurallari.tsx`, `announcements.tsx`, `notification-sync.test.tsx`, `firebase.ts`, `enrichment-unavailable.test.tsx`, `Dosya haritası`, `article-summary.test.tsx`, `data.ts`, `notifications.tsx`, `duyuru/[id].tsx`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `enrichment-unavailable.test.tsx`, `server.ts`, `edge.ts`, `mock/repositories.ts`, `types.ts`, `demo-account.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _623 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07894736842105263 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.047519217330538085 - nodes in this community are weakly interconnected._