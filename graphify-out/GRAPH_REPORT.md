# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 213 files · ~282,023 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1898 nodes · 4855 edges · 93 communities (87 shown, 6 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 325 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0aa094e5`
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
- FeedView.tsx
- integration.test.tsx
- env.ts
- admin/certificates.ts
- data-access/repositories.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- Pixel.tsx
- attendance.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
- accountSchema.ts
- etkinlik/[id].tsx
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- translateApi.ts
- vitrinSchema.ts
- raffleSchema.ts
- kv.ts
- check-event-schema.ts
- accountApi.ts
- Dosya haritası
- firebase.ts
- data.ts
- devDependencies
- cekilis/[id].tsx
- theme.ts
- eventSchema.ts
- sync-deps.mjs
- ref_node_fs
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- auth.ts
- make-icons.py
- notificationPlan.ts
- Load-bearing decisions — the why log
- check-release.mjs
- hermes-safe.test.ts
- Doğrulama ve teklik — plan ve kurulum
- check-bundle.mjs
- QueryProvider.tsx
- README.md
- useFallbackTranslation.ts
- Sponsorlar ve ana sayfa slider'ı — tasarım
- qr.ts
- ref_node_path
- article-summary.test.tsx
- export-registrations.ts
- src/otp.ts
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- photos.ts
- tsconfig.json
- announcementApi.ts
- qrSchema.ts
- allowScripts
- readingText.ts
- parseSourceUrl
- session-start.sh
- QrRoute
- react
- 4. Uygulama
- From the 1.1.0 release
- segment.ts
- Firebase
- deletion.ts
- @testing-library/react-native
- repository
- KOÜ Yazılım Kulübü — agent notes
- Mağazaya çıkarma
- icons.test.ts
- Yönetim paneli
- Sponsorlar ve ana sayfa slider'ı — uygulama planı
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
8. `esc()` - 28 edges
9. `useAppStore()` - 27 edges
10. `gradients` - 27 edges

## Surprising Connections (you probably didn't know these)
- `Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı` --references--> `PhotoUploadError`  [INFERRED]
  AGENTS.md → admin/photos.ts
- `Fazlar` --references--> `storage()`  [INFERRED]
  docs/ai-gundem-port.md → admin/photos.ts
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları` --references--> `tohum()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → scripts/check-rules.mjs
- `2. Doğrulama neden Firebase'in bağlantısı değil` --references--> `refreshVerification()`  [INFERRED]
  docs/dogrulama-ve-teklik-plani.md → src/auth.ts

## Import Cycles
- None detected.

## Communities (93 total, 6 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.08
Nodes (51): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+43 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (38): decideSend(), decideVerify(), hashCode(), kayit(), makeCode(), OTP_MAX_ATTEMPTS, OTP_MAX_SENDS, OTP_RESEND_MS (+30 more)

### Community 2 - "check-security.ts"
Cohesion: 0.09
Nodes (24): panelKoku(), clientIp(), CLOUDFLARE, cookieHeader(), guvenilenEs, iptalEdilen, issueToken(), LOGIN_LOCK_MS (+16 more)

### Community 3 - "hesap.tsx"
Cohesion: 0.13
Nodes (32): styles, styles, styles, styles, BOS, styles, Durum, styles (+24 more)

### Community 4 - "ui.tsx"
Cohesion: 0.10
Nodes (35): styles, styles, styles, styles, Tab, Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme, 4.3 `/sponsorlar` (`app/sponsorlar.tsx`), 4.4 `/sponsor/[id]` (`app/sponsor/[id].tsx`) (+27 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (27): parsePort(), resolvePort(), app, attempts, authed(), db, formDateTime(), formToInput() (+19 more)

### Community 6 - "supabase/repositories.ts"
Cohesion: 0.08
Nodes (47): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+39 more)

### Community 7 - "mock/repositories.ts"
Cohesion: 0.14
Nodes (20): createMockRepositories(), compareArticles(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, mockArticles(), mockDigest(), NO_CONTENT_ARTICLE, createMockDigestRepository() (+12 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.07
Nodes (40): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+32 more)

### Community 9 - "esc"
Cohesion: 0.10
Nodes (38): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+30 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (41): author, description, license, main, name, private, version, expo (+33 more)

### Community 12 - "FeedView.tsx"
Cohesion: 0.09
Nodes (54): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), Bu turda **bilerek** düzeltilmeyenler, hasSummary(), asDataError(), useFeed(), GateCandidate, GateResult (+46 more)

### Community 13 - "integration.test.tsx"
Cohesion: 0.11
Nodes (17): GundemRoute(), isTab(), @tanstack/react-query, clients, METRICS, mount(), createQueryClient(), QueryProvider() (+9 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "admin/certificates.ts"
Cohesion: 0.06
Nodes (38): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+30 more)

### Community 16 - "data-access/repositories.ts"
Cohesion: 0.12
Nodes (28): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), DigestRepositoryV1, EnrichmentRepositoryV1, FeedRepositoryV1, Repositories (+20 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.14
Nodes (22): clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW, TODAY, delay() (+14 more)

### Community 19 - "pdf.ts"
Cohesion: 0.13
Nodes (23): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+15 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.17
Nodes (18): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+10 more)

### Community 21 - "Pixel.tsx"
Cohesion: 0.15
Nodes (13): OnboardingRoute(), styles, styles, TabBarProps, TABS, PixelArt(), PixelIcon(), PixelIconProps (+5 more)

### Community 22 - "attendance.ts"
Cohesion: 0.24
Nodes (8): firebase, YoklamaHatasi, yoklamaMesaji(), YoklamaSonucu, yoklamaVarMi(), yoklamaVer(), firebase/auth, attendanceId()

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.18
Nodes (20): GundemArticleRoute(), segmentState(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage(), retryPolicy() (+12 more)

### Community 25 - "accountSchema.ts"
Cohesion: 0.20
Nodes (20): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), SignupRoute(), ageOn(), DateParts, digits(), FieldErrors, formatPhone() (+12 more)

### Community 26 - "etkinlik/[id].tsx"
Cohesion: 0.14
Nodes (16): Conventions, styles, styles, Global Constraints, 4.2 Ana sayfa (`app/(tabs)/index.tsx`), PhotoGallery(), styles, PhotoSlot() (+8 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.08
Nodes (23): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+15 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "translateApi.ts"
Cohesion: 0.16
Nodes (17): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, loginLimiter() (+9 more)

### Community 31 - "vitrinSchema.ts"
Cohesion: 0.20
Nodes (20): Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`, 5.4 Sunucu, 7. Test ve kontroller, Build, buildSlide(), buildSponsor(), expiredSlideIds(), https() (+12 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (18): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+10 more)

### Community 33 - "kv.ts"
Cohesion: 0.14
Nodes (13): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+5 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.08
Nodes (24): EventDetailRoute(), initials(), broken, built, capped, dayBefore, EV1, EV1_INPUT (+16 more)

### Community 35 - "accountApi.ts"
Cohesion: 0.13
Nodes (23): AuthLike, bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku() (+15 more)

### Community 36 - "Dosya haritası"
Cohesion: 0.24
Nodes (17): Dosya haritası, Task 11: Sponsor ekranları — `/sponsorlar`, `/sponsor/[id]`, Task 12: "Ödülü sağlayan" — `PrizeProviders`, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 3: Panel sıralaması — `admin/ordering.ts`, Task 7: Tema, `PhotoSlot`, iletişim adresi, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides` (+9 more)

### Community 37 - "firebase.ts"
Cohesion: 0.16
Nodes (17): AnnouncementsProvider(), ContentSource, ContentValue, Ctx, ClubEvent, EVENTS, DeviceRecord, RegistrationPayload (+9 more)

### Community 38 - "data.ts"
Cohesion: 0.10
Nodes (23): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, ACCOUNT_DELETE_URL, ARCHIVE_CATEGORIES, DEPARTMENTS, LEGAL_BASE, NOTIFICATION_CATEGORIES, NotificationCategory, ONBOARDING (+15 more)

### Community 39 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 40 - "cekilis/[id].tsx"
Cohesion: 0.11
Nodes (25): Agent setup, BildirimAyarlariRoute(), keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, SplashRoute(), styles (+17 more)

### Community 41 - "theme.ts"
Cohesion: 0.14
Nodes (15): AnnouncementRoute(), styles, AnnouncementRow(), HomeRoute(), styles, Announcement, src_announcements_announcement, AnnouncementsValue (+7 more)

### Community 42 - "eventSchema.ts"
Cohesion: 0.14
Nodes (21): ArchiveCard(), EventFact, buildEvent(), BuildResult, daysInMonth(), EVENT_CATEGORIES, EventInput, MAX_PHOTOS (+13 more)

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

### Community 48 - "auth.ts"
Cohesion: 0.13
Nodes (32): LoginRoute(), HesapSilRoute(), Veri: kim neyi okuyor, kim yazıyor, 4.1 Okuma ve durum, Dosyalar, Profile, authErrorMessage(), currentUser() (+24 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "notificationPlan.ts"
Cohesion: 0.24
Nodes (10): DIGEST_HOURS, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), REMINDER_CATEGORY, reminderOffsetMs() (+2 more)

### Community 51 - "Load-bearing decisions — the why log"
Cohesion: 0.11
Nodes (18): Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti, İşi telefon yaratıyordu, sunucu değil — ve bu defterdeki bir satır yanlıştı (+10 more)

### Community 52 - "check-release.mjs"
Cohesion: 0.20
Nodes (9): Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root, rulesBlock() (+1 more)

### Community 53 - "hermes-safe.test.ts"
Cohesion: 0.33
Nodes (8): clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW, todayLineTr()

### Community 54 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.12
Nodes (19): ref_node_child_process, ref_node_url, argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN (+11 more)

### Community 56 - "QueryProvider.tsx"
Cohesion: 0.20
Nodes (14): @tanstack/query-async-storage-persister, @tanstack/react-query-persist-client, FeedFilter, QUERY_KEY_VERSION, queryKeys, asyncStorageFromKv(), CACHE_BUSTER, capPersistedFeed() (+6 more)

### Community 57 - "README.md"
Cohesion: 0.15
Nodes (12): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Katkı, Lisans, Ne yapıyor, Proje yapısı (+4 more)

### Community 58 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 59 - "Sponsorlar ve ana sayfa slider'ı — tasarım"
Cohesion: 0.15
Nodes (12): 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli (+4 more)

### Community 60 - "qr.ts"
Cohesion: 0.17
Nodes (19): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr() (+11 more)

### Community 61 - "ref_node_path"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_path, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 62 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 63 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 64 - "src/otp.ts"
Cohesion: 0.25
Nodes (12): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir(), OtpError (+4 more)

### Community 65 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.29
Nodes (5): 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 66 - "photos.ts"
Cohesion: 0.27
Nodes (15): ACCEPTED_TYPES, bucketName(), deleteEventPhotos(), deletePhotos(), isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage() (+7 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "announcementApi.ts"
Cohesion: 0.22
Nodes (11): 5.1 Menü, 5.2 Liste sayfası, 5.3 Formlar, 5.5 Süresi dolan slaytları silen zamanlayıcı, 5.6 Görünüm, 5. Panel, fetchAnnouncement(), fetchAnnouncements() (+3 more)

### Community 69 - "qrSchema.ts"
Cohesion: 0.21
Nodes (11): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, joinLocal(), LOCAL_OFFSET, defaultWindow(), pad(), QR_ACILIS_SAAT, QR_ALPHABET, QR_TOKEN_LENGTH (+3 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "readingText.ts"
Cohesion: 0.57
Nodes (5): readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 72 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "QrRoute"
Cohesion: 0.27
Nodes (10): QrRoute(), @react-native-async-storage/async-storage, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId(), isQrToken(), parseQrPayload() (+2 more)

### Community 75 - "react"
Cohesion: 0.29
Nodes (7): ListView(), styles, TakvimRoute(), View_, react, monthOrder(), useOpenEvent()

### Community 78 - "4. Uygulama"
Cohesion: 0.25
Nodes (8): SatirLink(), Task 13: Hesabım — KULÜP grubu, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi, 4. Uygulama

### Community 79 - "From the 1.1.0 release"
Cohesion: 0.16
Nodes (16): today(), Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, From the 1.1.0 release, Dağıtım yüzeyleri, Git, İçerik girişi, Klasörler, Komutlar (+8 more)

### Community 80 - "segment.ts"
Cohesion: 0.28
Nodes (5): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, bodyFor(), Segment, ArticleSummary

### Community 81 - "Firebase"
Cohesion: 0.33
Nodes (6): Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı

### Community 82 - "deletion.ts"
Cohesion: 0.32
Nodes (7): deleteAuthUser(), DeletionOutcome, runDeletionSweep(), startDeletionSweeper(), STUDENT_NO_COLLECTIONS, USER_DOC_COLLECTIONS, USER_QUERY_COLLECTIONS

### Community 83 - "@testing-library/react-native"
Cohesion: 0.33
Nodes (5): @testing-library/react-native, mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs

### Community 84 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 85 - "KOÜ Yazılım Kulübü — agent notes"
Cohesion: 0.33
Nodes (5): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules

### Community 86 - "Mağazaya çıkarma"
Cohesion: 0.33
Nodes (6): Build'e hangi değerler giriyor, İkonlar ve mağaza görselleri, Mağazaya çıkarma, "Otomatik artsın" isteniyorsa, Sürüm ne zaman elle artırılır, Sürüm numaraları

### Community 87 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 88 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

### Community 90 - "Görseller"
Cohesion: 0.67
Nodes (3): Görseller, Kurulum, Neden Firebase Storage değil

## Knowledge Gaps
- **607 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+602 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 746 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `hesap.tsx`, `ui.tsx`, `firebase.ts`, `QueryProvider.tsx`, `data.ts`, `cekilis/[id].tsx`, `theme.ts`, `package.json`, `FeedView.tsx`, `cekilis-kurallari.tsx`, `integration.test.tsx`, `auth.ts`, `useEnrichmentWarmup.ts`, `@testing-library/react-native`, `Pixel.tsx`, `data-access/hooks.ts`, `etkinlik/[id].tsx`, `article-summary.test.tsx`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `mock/repositories.ts`, `data-access/repositories.ts`, `demo-account.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.094) - this node is a cross-community bridge._
- **Why does `firebase-admin` connect `admin/certificates.ts` to `push.ts`, `check-panel.ts`, `accountApi.ts`, `server.ts`, `package.json`, `deletion.ts`, `demo-account.ts`, `qr.ts`, `export-registrations.ts`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _607 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08116883116883117 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.047519217330538085 - nodes in this community are weakly interconnected._