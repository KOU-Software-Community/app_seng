# Graph Report - app_seng  (2026-09-26)

## Corpus Check
- 226 files · ~291,677 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 1980 nodes · 5264 edges · 95 communities (88 shown, 7 thin omitted)
- Extraction: 93% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 377 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `05006fd4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- pushPolicy.ts
- arsiv.tsx
- server.ts
- edge.ts
- data-access/repositories.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- supabase/repositories.ts
- env.ts
- mail.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- ui.tsx
- devDependencies
- Giriş sistemi, QR yoklama, sertifika — son plan
- data-access/hooks.ts
- react
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
- hermes-safe.test.ts
- qr.ts
- Doğrulama ve teklik — plan ve kurulum
- (tabs)/index.tsx
- deploy-rules.mjs
- sync-deps.mjs
- saved.test.ts
- PixelTxt
- html.ts
- check-rules.mjs
- Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`
- make-icons.py
- accountApi.ts
- getDb
- check-release.mjs
- clubCalendar
- notificationsView.ts
- check-bundle.mjs
- ref_node_fs
- README.md
- useFallbackTranslation.ts
- announcements.tsx
- @testing-library/react-native
- credentials.ts
- repository
- firebase.ts
- send-push.ts
- readingText.ts
- QrRoute
- tsconfig.json
- safeNext
- qrSchema.ts
- allowScripts
- notifications.tsx
- mock/repositories.ts
- session-start.sh
- Dosya haritası
- article-summary.test.tsx
- vitrinSchema.ts
- auth.ts
- admin/certificates.ts
- data.ts
- sponsorlar.tsx
- FeedView.tsx
- requireAuth
- 4. Uygulama
- todayLocal
- attendance.ts
- bugs
- KOÜ Yazılım Kulübü — agent notes
- Mağazaya çıkarma
- icons.test.ts
- Yönetim paneli
- Görseller
- overrides

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
- `Task 5: Panel görünümü — `admin/vitrinView.ts`, menü, CSS` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/views.ts

## Import Cycles
- None detected.

## Communities (95 total, 7 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.13
Nodes (25): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), DeviceSummary, ExpoTicket, flushPending(), pendingSummary() (+17 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (38): Doğrulama postası, teklik ve OTP, QR yoklama — kurulurken çıkanlar, archive, b64, cagir(), claimDb(), claimDb2(), Data (+30 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (42): AuthLike, AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc (+34 more)

### Community 3 - "pushPolicy.ts"
Cohesion: 0.22
Nodes (17): ANNOUNCEMENT_MAX_AGE_HOURS, AnnouncementPlan, decideCancelledEvent(), decideNewEvent(), decideRaffleResult(), DeviceDoc, DeviceRow, nextQuietEnd() (+9 more)

### Community 4 - "arsiv.tsx"
Cohesion: 0.14
Nodes (15): ArsivRoute(), styles, styles, Tab, 4.3 `/sponsorlar` (`app/sponsorlar.tsx`), DottedRule(), EmptyState(), FilterChip() (+7 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (28): parsePort(), resolvePort(), registeredNotPresent(), app, attempts, db, formDateTime(), formToInput() (+20 more)

### Community 6 - "edge.ts"
Cohesion: 0.14
Nodes (12): env, callEdgeFunction(), CODE_MAP, EDGE_TIMEOUT_MS, EdgeCallOptions, EdgeConfig, EdgeErrorEnvelope, isEnvelope() (+4 more)

### Community 7 - "data-access/repositories.ts"
Cohesion: 0.10
Nodes (35): getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), AddSourceOptions, DigestRepository, DigestRepositoryV1, EnrichmentRepository, EnrichmentRepositoryV1 (+27 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.08
Nodes (29): FEED_URLS, hoursAgoFromLabel(), isoFromLabel(), MOCK_NOW_ISO, MOCK_NOW_MS, mockSources(), NO_CONTENT_ARTICLE, parseSourceMeta() (+21 more)

### Community 9 - "esc"
Cohesion: 0.15
Nodes (28): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), QrTanimi (+20 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (36): author, description, license, main, name, private, version, expo (+28 more)

### Community 12 - "store.ts"
Cohesion: 0.14
Nodes (37): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), SavedView(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches() (+29 more)

### Community 13 - "supabase/repositories.ts"
Cohesion: 0.11
Nodes (37): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+29 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "mail.ts"
Cohesion: 0.22
Nodes (9): initMail(), Mail, MailConfig, MailEki, MailEnv, mailFrom(), MailResult, readMailConfig() (+1 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.22
Nodes (18): moveBy(), placeAt(), sameMembers(), MAX_UPLOAD_BYTES, eventChoices(), Kind, notFound(), orderedDocs() (+10 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (34): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+26 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.12
Nodes (24): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW (+16 more)

### Community 19 - "pdf.ts"
Cohesion: 0.14
Nodes (20): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+12 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "ui.tsx"
Cohesion: 0.08
Nodes (31): Conventions, SplashRoute(), styles, styles, OnboardingRoute(), styles, styles, TabBarProps (+23 more)

### Community 22 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (29): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+21 more)

### Community 24 - "data-access/hooks.ts"
Cohesion: 0.22
Nodes (18): "Çeviri geç geliyor / hiç gelmiyor" raporundan, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage(), retryPolicy() (+10 more)

### Community 25 - "react"
Cohesion: 0.14
Nodes (38): styles, styles, styles, styles, styles, styles, styles, Durum (+30 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.12
Nodes (17): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti (+9 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (22): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+14 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.10
Nodes (20): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+12 more)

### Community 30 - "src/otp.ts"
Cohesion: 0.25
Nodes (12): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir(), OtpError (+4 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.09
Nodes (31): GundemRoute(), isTab(), @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, clients, METRICS, mount() (+23 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (18): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+10 more)

### Community 33 - "kv.ts"
Cohesion: 0.14
Nodes (12): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+4 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.08
Nodes (26): EventDetailRoute(), initials(), broken, built, capped, dayBefore, EV1, EV1_INPUT (+18 more)

### Community 35 - "kayit-ol.tsx"
Cohesion: 0.17
Nodes (25): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, BOS, DateFields(), SignupRoute(), styles, ageOn(), DateParts, digits() (+17 more)

### Community 36 - "eventSchema.ts"
Cohesion: 0.19
Nodes (17): ArchiveCard(), buildEvent(), BuildResult, daysInMonth(), MAX_PHOTOS, MonthGrid, monthGrids(), monthKeyOf() (+9 more)

### Community 37 - "photos.ts"
Cohesion: 0.21
Nodes (18): ACCEPTED_TYPES, bucketName(), deleteEventPhotos(), deleteFolder(), deletePhotos(), FOLDERS, isBucketMissing(), keyProblem() (+10 more)

### Community 38 - "hermes-safe.test.ts"
Cohesion: 0.24
Nodes (12): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+4 more)

### Community 39 - "qr.ts"
Cohesion: 0.19
Nodes (18): attendanceRows(), ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr() (+10 more)

### Community 40 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.14
Nodes (13): 1. Ne zorlanıyor, ne zorlanmıyor, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi, 5. Sertifika şablonu (+5 more)

### Community 41 - "(tabs)/index.tsx"
Cohesion: 0.08
Nodes (36): AnnouncementRoute(), SponsorRoute(), styles, AnnouncementRow(), HomeRoute(), styles, GridView(), ListView() (+28 more)

### Community 42 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 45 - "PixelTxt"
Cohesion: 0.18
Nodes (16): RaffleRulesRoute(), styles, Global Constraints, RaffleNotice(), styles, PixelTxt(), APPLE_DISCLAIMER, OFFICIAL_RULES (+8 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.11
Nodes (16): 1. Mevcut testler ne ölçüyordu, 2. Yeni testler, 3. Karşılaştırma: aynı testler eski koda karşı, 5. Testin kendisinden çıkan dersler, 6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, ref_node_os (+8 more)

### Community 48 - "Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`"
Cohesion: 0.23
Nodes (15): choiceOptions(), ChoiceRow, COPY, deleteForm(), formatDay(), imageBlock(), moveForm(), positionOptions() (+7 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.08
Nodes (37): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+29 more)

### Community 51 - "getDb"
Cohesion: 0.16
Nodes (19): Veri: kim neyi okuyor, kim yazıyor, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, Dosyalar, EAS derlemelerinde, Firebase (+11 more)

### Community 52 - "check-release.mjs"
Cohesion: 0.22
Nodes (8): failed, json(), pkg, read(), results, root, rulesBlock(), store

### Community 53 - "clubCalendar"
Cohesion: 0.27
Nodes (9): Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, clubCalendar(), clubHour(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr() (+1 more)

### Community 54 - "notificationsView.ts"
Cohesion: 0.29
Nodes (9): ceviriSatiri(), DeviceSummary, LogRow, MailStatus, notificationsPage(), num(), PendingRow, when() (+1 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "ref_node_fs"
Cohesion: 0.13
Nodes (15): csvCell(), RFC-4180, dotenv, ref_node_fs, ref_node_path, app, OPTIONAL, ortak (+7 more)

### Community 57 - "README.md"
Cohesion: 0.15
Nodes (12): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Katkı, Lisans, Ne yapıyor, Proje yapısı (+4 more)

### Community 58 - "useFallbackTranslation.ts"
Cohesion: 0.15
Nodes (12): GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), useFallbackTranslation(), YedekCeviri, yedekGerekli() (+4 more)

### Community 59 - "announcements.tsx"
Cohesion: 0.15
Nodes (16): announcementChoices(), 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli, fetchAnnouncement() (+8 more)

### Community 60 - "@testing-library/react-native"
Cohesion: 0.25
Nodes (6): @testing-library/react-native, mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs, mockPush

### Community 61 - "credentials.ts"
Cohesion: 0.43
Nodes (6): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), parsed()

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "firebase.ts"
Cohesion: 0.14
Nodes (15): expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-splash-screen, expo-status-bar, RegistrationPayload, FIREBASE_SETUP_HINT, firebaseConfig (+7 more)

### Community 64 - "send-push.ts"
Cohesion: 0.43
Nodes (7): deliver(), Args, loadServiceAccount(), main(), parseArgs(), inClubQuietHours(), PUSHABLE_CATEGORIES

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "QrRoute"
Cohesion: 0.25
Nodes (11): QrRoute(), @react-native-async-storage/async-storage, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId(), isQrToken(), parseQrPayload() (+3 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 69 - "qrSchema.ts"
Cohesion: 0.21
Nodes (9): joinLocal(), LOCAL_OFFSET, pad(), Pencere, QR_ACILIS_SAAT, QR_ALPHABET, QR_TOKEN_LENGTH, TOKEN_RE (+1 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "notifications.tsx"
Cohesion: 0.17
Nodes (15): ClubEvent, DIGEST_HOURS, DeviceRecord, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications() (+7 more)

### Community 72 - "mock/repositories.ts"
Cohesion: 0.16
Nodes (21): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, createMockRepositories(), compareArticles(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, mockArticles(), mockDigest() (+13 more)

### Community 74 - "Dosya haritası"
Cohesion: 0.30
Nodes (15): Dosya haritası, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 3: Panel sıralaması — `admin/ordering.ts`, Task 5: Panel görünümü — `admin/vitrinView.ts`, menü, CSS, Task 7: Tema, `PhotoSlot`, iletişim adresi, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, 2. Kaynak metinden ayrıldığımız yerler (+7 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.23
Nodes (19): 5.4 Sunucu, 7. Test ve kontroller, Build, buildSlide(), buildSponsor(), expiredSlideIds(), https(), idList() (+11 more)

### Community 79 - "auth.ts"
Cohesion: 0.16
Nodes (20): LoginRoute(), HesapSilRoute(), 2. Doğrulama neden Firebase'in bağlantısı değil, Profile, authErrorMessage(), currentUser(), deletionDone(), finishAccountDeletion() (+12 more)

### Community 80 - "admin/certificates.ts"
Cohesion: 0.09
Nodes (28): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+20 more)

### Community 81 - "data.ts"
Cohesion: 0.05
Nodes (49): Agent setup, BildirimAyarlariRoute(), styles, keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, RegistrationDoneRoute() (+41 more)

### Community 82 - "sponsorlar.tsx"
Cohesion: 0.20
Nodes (8): SponsorsRoute(), styles, SPONSOR_CONTACT_EMAIL, Ctx, SponsorsValue, ./firebase, METRICS, Sponsor

### Community 83 - "FeedView.tsx"
Cohesion: 0.15
Nodes (16): Bu turda **bilerek** düzeltilmeyenler, P9 — grafiğe dayalı temizlik turu (2026-09-02), GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article() (+8 more)

### Community 84 - "requireAuth"
Cohesion: 0.40
Nodes (5): requireAuth(), 5. Sertifika, Nasıl ulaşıyor, Nasıl üretiliyor, Sayfadaki cümle

### Community 85 - "4. Uygulama"
Cohesion: 0.10
Nodes (19): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler, 4.9 Yenileme göstergesi (+11 more)

### Community 86 - "todayLocal"
Cohesion: 0.17
Nodes (14): From the 1.1.0 release, Dağıtım yüzeyleri, Git, İçerik girişi, Klasörler, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Kurallar ve tuzaklar (+6 more)

### Community 87 - "attendance.ts"
Cohesion: 0.14
Nodes (15): CertificatesRoute(), firebase, YoklamaHatasi, yoklamaMesaji(), YoklamaSonucu, yoklamaVarMi(), yoklamaVer(), sertifikalarimiGetir() (+7 more)

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
- **620 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+615 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 760 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `arsiv.tsx`, `data-access/repositories.ts`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `ui.tsx`, `data-access/hooks.ts`, `integration.test.tsx`, `kayit-ol.tsx`, `(tabs)/index.tsx`, `PixelTxt`, `announcements.tsx`, `@testing-library/react-native`, `firebase.ts`, `notifications.tsx`, `article-summary.test.tsx`, `auth.ts`, `data.ts`, `sponsorlar.tsx`, `FeedView.tsx`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `err()` connect `mock/repositories.ts` to `send-push.ts`, `check-panel.ts`, `server.ts`, `edge.ts`, `data-access/repositories.ts`, `supabase/repositories.ts`, `demo-account.ts`, `ref_node_fs`?**
  _High betweenness centrality (0.091) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _620 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13230769230769232 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05353535353535353 - nodes in this community are weakly interconnected._