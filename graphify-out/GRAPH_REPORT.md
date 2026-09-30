# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 238 files · ~301,726 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2066 nodes · 5500 edges · 86 communities (84 shown, 2 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 440 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `78bda1b4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- session.ts
- kayit/[id].tsx
- ui.tsx
- server.ts
- firebase.ts
- data-access/hooks.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- edge.ts
- env.ts
- types.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- Pixel.tsx
- hesap.tsx
- Giriş sistemi, QR yoklama, sertifika — son plan
- supabase/repositories.ts
- auth.ts
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
- feed-screen.test.tsx
- eventSchema.ts
- Vitrin önbelleği — uygulama planı
- export-registrations.ts
- (tabs)/index.tsx
- 8. Fazlar
- sync-deps.mjs
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- raffle-legal.test.tsx
- html.ts
- check-rules.mjs
- sponsors.tsx
- make-icons.py
- accountApi.ts
- store.tsx
- data.ts
- check-bundle.mjs
- ref_node_fs
- README.md
- summary-state.test.ts
- integration.test.tsx
- useEnrichmentWarmup.test.tsx
- repository
- useFallbackTranslation.ts
- readingText.ts
- qr.tsx
- tsconfig.json
- photos.ts
- home-slider.test.tsx
- allowScripts
- mock/repositories.ts
- session-start.sh
- announcements.tsx
- article-summary.test.tsx
- ZoomableImage.tsx
- vitrinSchema.ts
- react-native
- admin/certificates.ts
- notificationPlan.ts
- gate.ts
- Galeri, yenileme göstergesi, karşılama — tasarım
- KOÜ Yazılım Kulübü — agent notes
- Mağazaya çıkarma
- icons.test.ts
- Yönetim paneli
- Görseller
- ref_node_path
- react

## God Nodes (most connected - your core abstractions)
1. `react` - 74 edges
2. `react-native` - 48 edges
3. `Txt()` - 44 edges
4. `colors` - 42 edges
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
- `6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı` --references--> `attendanceRows()`  [INFERRED]
  docs/guvenlik-testleri-degerlendirmesi.md → admin/qr.ts
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `4.3 Kurallar (şekil)` --references--> `get()`  [INFERRED]
  docs/giris-sistemi-plani.md → scripts/check-panel.ts

## Import Cycles
- None detected.

## Communities (86 total, 2 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.05
Nodes (68): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+60 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.04
Nodes (57): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, decideSend(), decideVerify(), hashCode(), kayit() (+49 more)

### Community 2 - "session.ts"
Cohesion: 0.08
Nodes (33): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, clientIp() (+25 more)

### Community 3 - "kayit/[id].tsx"
Cohesion: 0.10
Nodes (29): Agent setup, keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials(), SplashRoute() (+21 more)

### Community 4 - "ui.tsx"
Cohesion: 0.06
Nodes (64): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, Conventions, BildirimAyarlariRoute(), styles, styles, styles, styles, styles (+56 more)

### Community 5 - "server.ts"
Cohesion: 0.05
Nodes (43): belgeTarihi(), pdfDurumu, parsePort(), resolvePort(), attendanceRows(), registeredNotPresent(), zamanMetni(), app (+35 more)

### Community 6 - "firebase.ts"
Cohesion: 0.09
Nodes (42): From the 1.1.0 release, Veri: kim neyi okuyor, kim yazıyor, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, 4.1 Okuma ve durum, Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, Dosyalar, EAS derlemelerinde (+34 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.22
Nodes (18): "Çeviri geç geliyor / hiç gelmiyor" raporundan, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage(), retryPolicy() (+10 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.09
Nodes (34): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+26 more)

### Community 9 - "esc"
Cohesion: 0.09
Nodes (38): AuthLike, durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage() (+30 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.06
Nodes (34): author, bugs, url, description, license, main, name, overrides (+26 more)

### Community 12 - "store.ts"
Cohesion: 0.14
Nodes (38): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), Bu turda **bilerek** düzeltilmeyenler, P9 — grafiğe dayalı temizlik turu (2026-09-02), SavedView(), useEnabledSources(), useLoaded(), useReadArticles() (+30 more)

### Community 13 - "edge.ts"
Cohesion: 0.15
Nodes (10): CODE_MAP, EDGE_TIMEOUT_MS, EdgeCallOptions, EdgeConfig, EdgeErrorEnvelope, isEnvelope(), DataErrorCode, DataErrorException (+2 more)

### Community 14 - "env.ts"
Cohesion: 0.08
Nodes (25): Task 1: Adla karşılama, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+17 more)

### Community 15 - "types.ts"
Cohesion: 0.12
Nodes (24): getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), DigestRepositoryV1, FeedRepositoryV1, REPOSITORY_CONTRACT_VERSION, SourceRepositoryV1, createUnconfiguredRepositories() (+16 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.10
Nodes (46): moveBy(), placeAt(), sameMembers(), deleteFolder(), deletePhotos(), pathFromUrl(), announcementChoices(), eventChoices() (+38 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+27 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.19
Nodes (17): NOW, TODAY, delay(), isBudget(), readWarmBudget(), useEnrichmentWarmup(), writeWarmBudget(), emptyBudget() (+9 more)

### Community 19 - "pdf.ts"
Cohesion: 0.14
Nodes (19): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+11 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.10
Nodes (30): revokeCertificate(), bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil() (+22 more)

### Community 21 - "Pixel.tsx"
Cohesion: 0.11
Nodes (18): styles, RegistrationDoneRoute(), styles, styles, styles, TabBarProps, TABS, react-native-svg (+10 more)

### Community 22 - "hesap.tsx"
Cohesion: 0.09
Nodes (42): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, VerifyRoute(), BOS, DateFields(), SignupRoute(), styles, ResetPasswordRoute(), styles (+34 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.09
Nodes (22): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+14 more)

### Community 24 - "supabase/repositories.ts"
Cohesion: 0.10
Nodes (41): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Azure çeviri sağlığı — sessizliğin iki anlamı, @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient() (+33 more)

### Community 25 - "auth.ts"
Cohesion: 0.13
Nodes (26): HesapSilRoute(), CertificatesRoute(), firebase, normalizeEmail(), toProfile(), YoklamaHatasi, yoklamaVarMi(), yoklamaVer() (+18 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.13
Nodes (15): Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti, İşi telefon yaratıyordu, sunucu değil — ve bu defterdeki bir satır yanlıştı (+7 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.09
Nodes (22): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+14 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.18
Nodes (10): Faz 1 — kimlik altyapısı, UI yok, ref_node_url, failed, json(), pkg, read(), results, root (+2 more)

### Community 31 - "QueryProvider.tsx"
Cohesion: 0.19
Nodes (15): @tanstack/query-async-storage-persister, @tanstack/react-query-persist-client, FeedFilter, QUERY_KEY_VERSION, queryKeys, asyncStorageFromKv(), CACHE_BUSTER, capPersistedFeed() (+7 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (18): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+10 more)

### Community 33 - "kv.ts"
Cohesion: 0.15
Nodes (12): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+4 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.13
Nodes (14): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+6 more)

### Community 37 - "feed-screen.test.tsx"
Cohesion: 0.15
Nodes (13): GundemRoute(), isTab(), @tanstack/react-query, clients, METRICS, mount(), createQueryClient(), clients (+5 more)

### Community 38 - "eventSchema.ts"
Cohesion: 0.14
Nodes (21): ArchiveCard(), buildEvent(), BuildResult, daysInMonth(), EVENT_CATEGORIES, EventInput, LOCAL_OFFSET, MAX_PHOTOS (+13 more)

### Community 39 - "Vitrin önbelleği — uygulama planı"
Cohesion: 0.25
Nodes (7): Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 3: Adım 1'i kapat, Task 4: expo-image ve sürüm 1.1.6, Vitrin önbelleği — uygulama planı

### Community 40 - "export-registrations.ts"
Cohesion: 0.29
Nodes (7): csvCell(), RFC-4180, dotenv, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "(tabs)/index.tsx"
Cohesion: 0.09
Nodes (33): AnnouncementRoute(), styles, SponsorRoute(), styles, SponsorsRoute(), styles, AnnouncementRow(), HomeRoute() (+25 more)

### Community 42 - "8. Fazlar"
Cohesion: 0.33
Nodes (6): 8. Fazlar, Faz 2 — giriş, profil, eşleşmiş kayıt, Faz 3 — hesap silme (mağaza şartı), Faz 4 — QR yoklama ve çekiliş, Faz 5 — sertifika, Yapılmayacaklar

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.20
Nodes (8): 1. Mevcut testler ne ölçüyordu, 2. Yeni testler, 3. Karşılaştırma: aynı testler eski koda karşı, 5. Testin kendisinden çıkan dersler, 6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 45 - "raffle-legal.test.tsx"
Cohesion: 0.22
Nodes (11): RaffleRulesRoute(), APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB, RAFFLE_CONTACT_EMAIL, RAFFLE_ORGANIZER, RuleSection (+3 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.17
Nodes (9): ref_node_os, assert(), emu, izin(), JAR, KURALLAR, red(), sonuc() (+1 more)

### Community 48 - "sponsors.tsx"
Cohesion: 0.07
Nodes (41): Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, Task 2: Hook'lar ve ana sayfa kopyayla açılıyor, 1. Sorun, 2. Hedef, 3.1 `src/vitrinCache.ts` (yeni), 3.2 Hook ve sağlayıcı, 3.3 Ana sayfa (`app/(tabs)/index.tsx`), 3. Adım 1 — liste önbelleği (OTA, 1.1.5) (+33 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.15
Nodes (20): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+12 more)

### Community 51 - "store.tsx"
Cohesion: 0.17
Nodes (14): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, NOTIFICATION_CATEGORIES, REMINDER_OPTIONS, AppStore, AppStoreProvider(), Ctx, defaultNotifications, defaultState (+6 more)

### Community 54 - "data.ts"
Cohesion: 0.14
Nodes (12): ACCOUNT_DELETE_URL, ARCHIVE_CATEGORIES, DEPARTMENTS, EventFact, EVENTS, LEGAL_BASE, NotificationCategory, ONBOARDING (+4 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "ref_node_fs"
Cohesion: 0.22
Nodes (7): ref_node_fs, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 57 - "README.md"
Cohesion: 0.15
Nodes (12): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Katkı, Lisans, Ne yapıyor, Proje yapısı (+4 more)

### Community 58 - "summary-state.test.ts"
Cohesion: 0.27
Nodes (7): GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), CONFIG, ArticleSummary

### Community 59 - "integration.test.tsx"
Cohesion: 0.25
Nodes (4): clients, fakePostgrest(), Filters, parseKeyset()

### Community 60 - "useEnrichmentWarmup.test.tsx"
Cohesion: 0.14
Nodes (11): @testing-library/react-native, clients, mockRequestEnrichment, mount(), QUEUED, READY, memoryStore, mockGetExpoPushToken (+3 more)

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "qr.tsx"
Cohesion: 0.09
Nodes (37): ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, regenerateQr(), setQrWindow() (+29 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "photos.ts"
Cohesion: 0.24
Nodes (13): ACCEPTED_TYPES, bucketName(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage(), PhotoFolder (+5 more)

### Community 69 - "home-slider.test.tsx"
Cohesion: 0.14
Nodes (13): Galeri, yenileme göstergesi, karşılama — uygulama planı, Global Constraints, Review Focus, Task 2: PixelLoader'lı yenileme göstergesi, Task 3: Yakınlaştırılabilir görsel, Task 4: Tam ekran görüntüleyici, Task 5: Otomatik kaydırma ortak hook'a, Task 6: Hero slider ve etkinlik detayı (+5 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 72 - "mock/repositories.ts"
Cohesion: 0.08
Nodes (37): RFC-3986, createMockRepositories(), compareArticles(), hasNoContent(), src_gundem_data_access_mock_mapper_isaftercursor, MOCK_NOW_ISO, mockArticles(), mockDigest() (+29 more)

### Community 74 - "announcements.tsx"
Cohesion: 0.07
Nodes (34): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar (+26 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 77 - "ZoomableImage.tsx"
Cohesion: 0.22
Nodes (10): 5. Test, expo-image, react-native-gesture-handler, react-native-reanimated, react-native-worklets, clampOffset(), DOUBLE_TAP_SCALE, MAX_SCALE (+2 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.19
Nodes (23): 2. Kaynak metinden ayrıldığımız yerler, 5.4 Sunucu, 7. Test ve kontroller, Task 1: `src/vitrinCache.ts`, 5. Test ve kontroller, ClubEvent, Build, buildSlide() (+15 more)

### Community 79 - "react-native"
Cohesion: 0.22
Nodes (16): styles, LoginRoute(), styles, styles, react-native, react-native-safe-area-context, authErrorMessage(), ErrorBanner() (+8 more)

### Community 80 - "admin/certificates.ts"
Cohesion: 0.06
Nodes (39): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+31 more)

### Community 81 - "notificationPlan.ts"
Cohesion: 0.24
Nodes (10): DIGEST_HOURS, applyQuietHours(), DIGEST_CATEGORY, isDigestHour(), PlannedNotification, planNotifications(), REMINDER_CATEGORY, reminderOffsetMs() (+2 more)

### Community 82 - "gate.ts"
Cohesion: 0.32
Nodes (6): GateCandidate, GateResult, HOLD_WINDOW_MINUTES, article(), minutesAgo(), NOW

### Community 84 - "Galeri, yenileme göstergesi, karşılama — tasarım"
Cohesion: 0.29
Nodes (6): 2. Yenileme göstergesi, 3. Karşılama, 4. iOS'ta giriş yapmadan arşiv — değerlendirme, 6. Dağıtım yüzeyleri, 7. Reddedilenler, Galeri, yenileme göstergesi, karşılama — tasarım

### Community 88 - "KOÜ Yazılım Kulübü — agent notes"
Cohesion: 0.33
Nodes (5): Checks, Dağıtım yüzeyleri — her değişiklik bunlardan birine düşüyor, KOÜ Yazılım Kulübü — agent notes, Layout, Working rules

### Community 89 - "Mağazaya çıkarma"
Cohesion: 0.33
Nodes (6): Build'e hangi değerler giriyor, İkonlar ve mağaza görselleri, Mağazaya çıkarma, "Otomatik artsın" isteniyorsa, Sürüm ne zaman elle artırılır, Sürüm numaraları

### Community 91 - "icons.test.ts"
Cohesion: 0.67
Nodes (3): Sekiz piksellik bir glif yolu okunarak değerlendirilemez, rowRuns(), rowWidths()

### Community 93 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

### Community 94 - "Görseller"
Cohesion: 0.67
Nodes (3): Görseller, Kurulum, Neden Firebase Storage değil

### Community 96 - "ref_node_path"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_path, cli, projectId, result, root

### Community 98 - "react"
Cohesion: 0.13
Nodes (10): react, PrizeProviders(), styles, METRICS, mockPush, METRICS, mockAuth, fits() (+2 more)

## Knowledge Gaps
- **648 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+643 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 793 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `kayit/[id].tsx`, `ui.tsx`, `firebase.ts`, `data-access/hooks.ts`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `Pixel.tsx`, `hesap.tsx`, `QueryProvider.tsx`, `feed-screen.test.tsx`, `(tabs)/index.tsx`, `raffle-legal.test.tsx`, `sponsors.tsx`, `store.tsx`, `integration.test.tsx`, `useEnrichmentWarmup.test.tsx`, `qr.tsx`, `home-slider.test.tsx`, `mock/repositories.ts`, `announcements.tsx`, `article-summary.test.tsx`, `ZoomableImage.tsx`, `react-native`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `export-registrations.ts`, `mock/repositories.ts`, `edge.ts`, `types.ts`, `demo-account.ts`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **Why does `ClubEvent` connect `vitrinSchema.ts` to `push.ts`, `check-event-schema.ts`, `kayit/[id].tsx`, `ui.tsx`, `server.ts`, `eventSchema.ts`, `firebase.ts`, `(tabs)/index.tsx`, `vitrin.ts`, `notificationPlan.ts`, `Yönetim paneli`, `data.ts`, `2. Fikrin değerlendirmesi — zayıf noktalar`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _648 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05365686944634313 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04382284382284382 - nodes in this community are weakly interconnected._