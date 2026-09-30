# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 253 files · ~308,290 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2134 nodes · 5727 edges · 98 communities (94 shown, 4 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 482 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `48e000ef`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- etkinlik/[id].tsx
- (tabs)/index.tsx
- server.ts
- photos.ts
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
- types.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- supabase/repositories.ts
- accountSchema.ts
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
- clubCalendar
- eventSchema.ts
- article-summary.test.tsx
- export-registrations.ts
- data.ts
- edge.ts
- sync-deps.mjs
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- raffle-legal.test.tsx
- html.ts
- check-rules.mjs
- sponsors.tsx
- make-icons.py
- accountApi.ts
- attendance.ts
- useFallbackTranslation.ts
- react
- QrRoute
- check-bundle.mjs
- ref_node_path
- README.md
- Galeri, yenileme göstergesi, karşılama — uygulama planı
- announcements.tsx
- src/otp.ts
- ClubEvent
- repository
- certificateDelivery.ts
- ref_node_fs
- readingText.ts
- Doğrulama ve teklik — plan ve kurulum
- tsconfig.json
- Review Focus
- qr.ts
- allowScripts
- 4. Uygulama
- ZoomableImage.tsx
- session-start.sh
- duyuru/[id].tsx
- todayLocal
- firebase.ts
- vitrinSchema.ts
- colors
- vitrin-cache.test.tsx
- gate.ts
- ui.tsx
- Galeri, yenileme göstergesi, karşılama — tasarım
- @testing-library/react-native
- 5. Panel
- month-calendar.test.tsx
- Firebase
- photo-viewer.test.tsx
- digits
- takvim-screen.test.tsx
- icons.test.ts
- bugs
- overrides
- KOÜ Yazılım Kulübü — agent notes
- deploy-rules.mjs
- Mağazaya çıkarma
- Yönetim paneli

## God Nodes (most connected - your core abstractions)
1. `react` - 86 edges
2. `react-native` - 55 edges
3. `Txt()` - 47 edges
4. `colors` - 45 edges
5. `Load-bearing decisions — the why log` - 38 edges
6. `esc()` - 37 edges
7. `expo-router` - 37 edges
8. `react-native-safe-area-context` - 36 edges
9. `Dosya haritası` - 36 edges
10. `useContent()` - 33 edges

## Surprising Connections (you probably didn't know these)
- `Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı` --references--> `PhotoUploadError`  [INFERRED]
  AGENTS.md → admin/photos.ts
- `Fazlar` --references--> `storage()`  [INFERRED]
  docs/ai-gundem-port.md → admin/photos.ts
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts
- `4.3 Kurallar (şekil)` --references--> `get()`  [INFERRED]
  docs/giris-sistemi-plani.md → scripts/check-panel.ts
- `1. Eski "hayır" neden geçersiz, ve yerine ne geliyor` --references--> `get()`  [INFERRED]
  docs/qr-yoklama-plani.md → scripts/check-panel.ts

## Import Cycles
- None detected.

## Communities (98 total, 4 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.06
Nodes (61): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+53 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (38): parsePort(), resolvePort(), QR yoklama — kurulurken çıkanlar, archive, b64, cagir(), claimDb(), claimDb2() (+30 more)

### Community 2 - "check-security.ts"
Cohesion: 0.06
Nodes (45): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, attendanceRows() (+37 more)

### Community 3 - "etkinlik/[id].tsx"
Cohesion: 0.14
Nodes (22): Agent setup, BildirimAyarlariRoute(), keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials() (+14 more)

### Community 4 - "(tabs)/index.tsx"
Cohesion: 0.10
Nodes (30): SponsorRoute(), styles, HomeRoute(), styles, ListView(), styles, TakvimRoute(), Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme (+22 more)

### Community 5 - "server.ts"
Cohesion: 0.07
Nodes (25): ACCEPTED_TYPES, app, attempts, authed(), db, formDateTime(), formToInput(), inputToForm() (+17 more)

### Community 6 - "photos.ts"
Cohesion: 0.24
Nodes (15): bucketName(), deleteFolder(), deletePhotos(), FOLDERS, isBucketMissing(), keyProblem(), MAX_UPLOAD_BYTES, missingBucketMessage() (+7 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.16
Nodes (26): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, GundemArticleRoute(), Bu turda **bilerek** düzeltilmeyenler, 1. Kare yükleme animasyonu, hasSummary(), asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS (+18 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.07
Nodes (40): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+32 more)

### Community 9 - "esc"
Cohesion: 0.11
Nodes (38): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+30 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.05
Nodes (39): author, description, license, main, name, private, version, expo (+31 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "enrichment-unavailable.test.tsx"
Cohesion: 0.13
Nodes (19): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, createMockRepositories(), mockArticles(), NO_CONTENT_ARTICLE, createMockDigestRepository(), createMockEnrichmentRepository(), createMockFeedRepository() (+11 more)

### Community 14 - "env.ts"
Cohesion: 0.08
Nodes (25): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, Task 1: Adla karşılama, blank, blankKeys, bogus, dev, devEmpty, forcedMock (+17 more)

### Community 15 - "mock/repositories.ts"
Cohesion: 0.11
Nodes (30): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), src_gundem_data_access_mock_mapper_isaftercursor, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository (+22 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.11
Nodes (38): moveBy(), placeAt(), sameMembers(), announcementChoices(), eventChoices(), Kind, notFound(), orderedDocs() (+30 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+27 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.13
Nodes (23): clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW, TODAY, delay() (+15 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (26): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+18 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (29): revokeCertificate(), bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil() (+21 more)

### Community 21 - "react-native"
Cohesion: 0.08
Nodes (30): styles, styles, styles, SponsorsRoute(), styles, styles, TabBarProps, TABS (+22 more)

### Community 22 - "types.ts"
Cohesion: 0.10
Nodes (22): bodyFor(), Segment, segmentState(), DigestArticleFacts, DigestItemRow, DigestRow, FEED_COLUMNS, isDigit() (+14 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (29): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+21 more)

### Community 24 - "supabase/repositories.ts"
Cohesion: 0.14
Nodes (30): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+22 more)

### Community 25 - "accountSchema.ts"
Cohesion: 0.19
Nodes (20): SignupRoute(), ageOn(), DateParts, EMAIL_RE, FieldErrors, firstName(), formatPhone(), isValidSignup() (+12 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.12
Nodes (17): Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti, İşi telefon yaratıyordu, sunucu değil — ve bu defterdeki bir satır yanlıştı (+9 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.08
Nodes (23): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+15 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (23): 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i, 2.7 Doğrulanmamış e-posta (+15 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.16
Nodes (11): verifyPassword(), WebAuthError, Güvenlik taraması — sekiz sessiz delik ve kapatılmayan ikisi, failed, json(), pkg, read(), results (+3 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.08
Nodes (31): GundemRoute(), isTab(), @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, clients, METRICS, mount() (+23 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (18): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+10 more)

### Community 33 - "kv.ts"
Cohesion: 0.11
Nodes (16): expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16(), randomUuidV4() (+8 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (21): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+13 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "auth.ts"
Cohesion: 0.27
Nodes (11): HesapSilRoute(), deletionDone(), finishAccountDeletion(), getAuthClient(), loadProfile(), requestAccountDeletion(), signIn(), signOut() (+3 more)

### Community 37 - "clubCalendar"
Cohesion: 0.36
Nodes (7): clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr(), NOW

### Community 38 - "eventSchema.ts"
Cohesion: 0.22
Nodes (10): BuildResult, EventInput, monthGrids(), monthOrder(), MONTHS_SHORT, pad(), Parsed, toInput() (+2 more)

### Community 39 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 40 - "export-registrations.ts"
Cohesion: 0.39
Nodes (6): csvCell(), RFC-4180, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "data.ts"
Cohesion: 0.07
Nodes (37): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, styles, GroupLabel(), IconTile(), Toggle(), ContentSource, ContentValue, Ctx (+29 more)

### Community 42 - "edge.ts"
Cohesion: 0.15
Nodes (10): CODE_MAP, EDGE_TIMEOUT_MS, EdgeCallOptions, EdgeConfig, EdgeErrorEnvelope, isEnvelope(), DataErrorCode, DataErrorException (+2 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.22
Nodes (7): 1. Mevcut testler ne ölçüyordu, 2. Yeni testler, 3. Karşılaştırma: aynı testler eski koda karşı, 5. Testin kendisinden çıkan dersler, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

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
Cohesion: 0.09
Nodes (37): Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 2: Hook'lar ve ana sayfa kopyayla açılıyor, Task 3: Adım 1'i kapat, Task 4: expo-image ve sürüm 1.1.6 (+29 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.09
Nodes (34): AuthLike, bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku() (+26 more)

### Community 51 - "attendance.ts"
Cohesion: 0.18
Nodes (14): CertificatesRoute(), firebase, YoklamaHatasi, YoklamaSonucu, yoklamaVarMi(), yoklamaVer(), currentUser(), sertifikalarimiGetir() (+6 more)

### Community 52 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 53 - "react"
Cohesion: 0.12
Nodes (11): react, Props, styles, PrizeProviders(), styles, METRICS, mockEvent, METRICS (+3 more)

### Community 54 - "QrRoute"
Cohesion: 0.23
Nodes (12): QrRoute(), @react-native-async-storage/async-storage, yoklamaMesaji(), bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId(), isQrToken() (+4 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "ref_node_path"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_path, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 57 - "README.md"
Cohesion: 0.12
Nodes (15): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Görseller, Katkı, Kurulum, Lisans (+7 more)

### Community 58 - "Galeri, yenileme göstergesi, karşılama — uygulama planı"
Cohesion: 0.28
Nodes (12): Galeri, yenileme göstergesi, karşılama — uygulama planı, Review Focus, Task 3: Yakınlaştırılabilir görsel, Task 5: Otomatik kaydırma ortak hook'a, Task 6: Hero slider ve etkinlik detayı, Task 7: Kapanış, 1. Galeri, HomeSlider() (+4 more)

### Community 59 - "announcements.tsx"
Cohesion: 0.16
Nodes (15): 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli, fetchAnnouncement(), fetchAnnouncements() (+7 more)

### Community 60 - "src/otp.ts"
Cohesion: 0.25
Nodes (12): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir(), OtpError (+4 more)

### Community 61 - "ClubEvent"
Cohesion: 0.18
Nodes (17): ArchiveCard(), Global Constraints, Kalıcı takvim, kare yükleme animasyonu, galeriyi dokunarak kapatma — uygulama planı, 4. Test, Neden var, MonthCalendar(), styles, ClubEvent (+9 more)

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "certificateDelivery.ts"
Cohesion: 0.11
Nodes (22): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+14 more)

### Community 64 - "ref_node_fs"
Cohesion: 0.36
Nodes (7): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), ref_node_fs, parsed()

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.12
Nodes (15): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+7 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "Review Focus"
Cohesion: 0.33
Nodes (6): Review Focus, Task 1: Kare yükleme animasyonu, Task 2: Takvimin saf hesabı, Task 3: `MonthCalendar`, Task 5: Soluk alana dokununca kapatma, Task 6: Kapanış

### Community 69 - "qr.ts"
Cohesion: 0.08
Nodes (37): BELGE_NO_UZUNLUK, BulunanSertifika, findCertificate(), makeBelgeNo(), publishCertificates(), SertifikaKaydi, YayinGirdisi, YayinSonucu (+29 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "4. Uygulama"
Cohesion: 0.13
Nodes (14): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler (+6 more)

### Community 72 - "ZoomableImage.tsx"
Cohesion: 0.25
Nodes (8): 5. Test, react-native-reanimated, react-native-worklets, clampOffset(), DOUBLE_TAP_SCALE, MAX_SCALE, Props, ZoomableImage()

### Community 74 - "duyuru/[id].tsx"
Cohesion: 0.24
Nodes (8): AnnouncementRoute(), styles, AnnouncementRow(), Announcement, src_announcements_announcement, src_announcements_fetchannouncement, formatAnnouncementDate(), RichText()

### Community 75 - "todayLocal"
Cohesion: 0.16
Nodes (15): Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, From the 1.1.0 release, Dağıtım yüzeyleri, Git, İçerik girişi, Klasörler, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG) (+7 more)

### Community 77 - "firebase.ts"
Cohesion: 0.23
Nodes (21): Veri: kim neyi okuyor, kim yazıyor, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, 4.1 Okuma ve durum, Dosyalar, ContentProvider(), DeviceRecord, fetchContent(), fetchSlides() (+13 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.20
Nodes (23): Dosya haritası, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 3: Panel sıralaması — `admin/ordering.ts`, Task 7: Tema, `PhotoSlot`, iletişim adresi, 7. Test ve kontroller, Task 1: `src/vitrinCache.ts`, 5. Test ve kontroller, Build (+15 more)

### Community 79 - "colors"
Cohesion: 0.10
Nodes (41): styles, styles, LoginRoute(), styles, styles, styles, BOS, styles (+33 more)

### Community 80 - "vitrin-cache.test.tsx"
Cohesion: 0.20
Nodes (7): ./firebase, Cache, { cacheReady }, METRICS, { SponsorsProvider, useSponsors }, Storage, { useSlides }

### Community 81 - "gate.ts"
Cohesion: 0.29
Nodes (8): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW

### Community 82 - "ui.tsx"
Cohesion: 0.08
Nodes (40): Conventions, styles, styles, ArsivRoute(), styles, styles, Tab, Global Constraints (+32 more)

### Community 83 - "Galeri, yenileme göstergesi, karşılama — tasarım"
Cohesion: 0.29
Nodes (6): 2. Yenileme göstergesi, 3. Karşılama, 4. iOS'ta giriş yapmadan arşiv — değerlendirme, 6. Dağıtım yüzeyleri, 7. Reddedilenler, Galeri, yenileme göstergesi, karşılama — tasarım

### Community 84 - "@testing-library/react-native"
Cohesion: 0.13
Nodes (8): @testing-library/react-native, mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs, PHOTOS, fits(), HostNode

### Community 85 - "5. Panel"
Cohesion: 0.33
Nodes (6): 5.1 Menü, 5.2 Liste sayfası, 5.3 Formlar, 5.5 Süresi dolan slaytları silen zamanlayıcı, 5.6 Görünüm, 5. Panel

### Community 86 - "month-calendar.test.tsx"
Cohesion: 0.18
Nodes (5): 2. Kalıcı takvim, 3. Galeriyi soluk alana dokunarak kapatma, 5. Dağıtım yüzeyleri, Kalıcı takvim, kare yükleme animasyonu, galeriyi dokunarak kapatma — tasarım, header()

### Community 87 - "Firebase"
Cohesion: 0.33
Nodes (6): Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı

### Community 88 - "photo-viewer.test.tsx"
Cohesion: 0.33
Nodes (4): react-native-gesture-handler, METRICS, PHOTOS, { width }

### Community 89 - "digits"
Cohesion: 0.70
Nodes (5): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), digits(), joinDate(), splitDate()

### Community 90 - "takvim-screen.test.tsx"
Cohesion: 0.40
Nodes (3): HACKATHON, METRICS, mockContent

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

### Community 100 - "Yönetim paneli"
Cohesion: 0.67
Nodes (3): Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

## Knowledge Gaps
- **668 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+663 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 828 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `etkinlik/[id].tsx`, `(tabs)/index.tsx`, `data-access/hooks.ts`, `package.json`, `store.ts`, `enrichment-unavailable.test.tsx`, `useEnrichmentWarmup.ts`, `react-native`, `integration.test.tsx`, `kv.ts`, `article-summary.test.tsx`, `data.ts`, `raffle-legal.test.tsx`, `sponsors.tsx`, `announcements.tsx`, `ClubEvent`, `ZoomableImage.tsx`, `duyuru/[id].tsx`, `colors`, `vitrin-cache.test.tsx`, `ui.tsx`, `@testing-library/react-native`, `month-calendar.test.tsx`, `photo-viewer.test.tsx`, `takvim-screen.test.tsx`?**
  _High betweenness centrality (0.162) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `export-registrations.ts`, `edge.ts`, `enrichment-unavailable.test.tsx`, `mock/repositories.ts`, `demo-account.ts`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `ClubEvent` connect `ClubEvent` to `push.ts`, `check-event-schema.ts`, `(tabs)/index.tsx`, `server.ts`, `eventSchema.ts`, `data.ts`, `enrichment-unavailable.test.tsx`, `firebase.ts`, `vitrinSchema.ts`, `vitrin.ts`, `ui.tsx`, `month-calendar.test.tsx`, `takvim-screen.test.tsx`, `2. Fikrin değerlendirmesi — zayıf noktalar`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _668 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.061569416498993966 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05410628019323672 - nodes in this community are weakly interconnected._