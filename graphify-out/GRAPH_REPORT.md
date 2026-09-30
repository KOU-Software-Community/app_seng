# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 240 files · ~302,294 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2076 nodes · 5530 edges · 95 communities (90 shown, 5 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 444 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a698dbf7`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- hesap.tsx
- ui.tsx
- server.ts
- content.tsx
- data-access/hooks.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- qr.ts
- env.ts
- data-access/repositories.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- Pixel.tsx
- accountSchema.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- supabase/repositories.ts
- auth.ts
- Load-bearing decisions — the why log
- scripts
- AI Gündem — taşıma planı
- 2. Fikrin değerlendirmesi — zayıf noktalar
- check-release.mjs
- integration.test.tsx
- raffleSchema.ts
- edge.ts
- check-event-schema.ts
- devDependencies
- Doğrulama ve teklik — plan ve kurulum
- hermes-safe.test.ts
- eventSchema.ts
- firebase.ts
- ref_node_path
- react-native
- translateApi.ts
- sync-deps.mjs
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- cekilis-kurallari.tsx
- html.ts
- check-rules.mjs
- sponsors.tsx
- make-icons.py
- accountApi.ts
- data.ts
- src/otp.ts
- admin/certificates.ts
- 4. Uygulama
- check-bundle.mjs
- ref_node_fs
- README.md
- Dosya haritası
- vitrinView.ts
- vitrin-cache.test.tsx
- src/certificates.ts
- repository
- useFallbackTranslation.ts
- notificationsView.ts
- readingText.ts
- qrSchema.ts
- tsconfig.json
- todayLocal
- react
- allowScripts
- KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)
- parseSourceUrl
- session-start.sh
- announcements.tsx
- attendance.ts
- cursor.ts
- vitrinSchema.ts
- etkinlik/[id].tsx
- certificateDelivery.ts
- EventDetailRoute
- FeedView
- 3. Veri modeli
- Galeri, yenileme göstergesi, karşılama — tasarım
- taramaKarari
- bugs
- overrides
- KOÜ Yazılım Kulübü — agent notes
- Mağazaya çıkarma
- icons.test.ts
- Yönetim paneli
- Görseller
- deploy-rules.mjs
- (tabs)/index.tsx

## God Nodes (most connected - your core abstractions)
1. `react` - 76 edges
2. `react-native` - 50 edges
3. `Txt()` - 44 edges
4. `colors` - 43 edges
5. `esc()` - 37 edges
6. `Load-bearing decisions — the why log` - 37 edges
7. `expo-router` - 36 edges
8. `Dosya haritası` - 36 edges
9. `useContent()` - 33 edges
10. `react-native-safe-area-context` - 32 edges

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

## Communities (95 total, 5 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.06
Nodes (61): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+53 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.06
Nodes (36): QR yoklama — kurulurken çıkanlar, archive, b64, cagir(), claimDb(), claimDb2(), Data, decision (+28 more)

### Community 2 - "check-security.ts"
Cohesion: 0.08
Nodes (29): AuthLike, attendanceRows(), zamanMetni(), authed(), readCookie(), clientIp(), CLOUDFLARE, cookieHeader() (+21 more)

### Community 3 - "hesap.tsx"
Cohesion: 0.11
Nodes (21): Agent setup, BildirimAyarlariRoute(), SplashRoute(), RegistrationRoute(), styles, HesapRoute(), styles, EventRow() (+13 more)

### Community 4 - "ui.tsx"
Cohesion: 0.08
Nodes (46): Conventions, styles, styles, ArsivRoute(), styles, styles, Tab, Global Constraints (+38 more)

### Community 5 - "server.ts"
Cohesion: 0.06
Nodes (32): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, parsePort(), resolvePort(), registeredNotPresent(), app (+24 more)

### Community 6 - "content.tsx"
Cohesion: 0.08
Nodes (26): Bildirim gelmedi, nereye bakılır, Bildirimler nereden çıkıyor, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım), Neler bağlı, expo-font, @expo-google-fonts/plus-jakarta-sans (+18 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.18
Nodes (22): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, "Çeviri geç geliyor / hiç gelmiyor" raporundan, Bu turda **bilerek** düzeltilmeyenler, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs() (+14 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.07
Nodes (47): cursorOf(), isAfterCursor(), src_gundem_data_access_index_repository_contract_version, createMockRepositories(), compareArticles(), cursorOfArticle(), FEED_URLS, hasNoContent() (+39 more)

### Community 9 - "esc"
Cohesion: 0.18
Nodes (23): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), photoUpload() (+15 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.06
Nodes (34): author, description, license, main, name, private, version, expo (+26 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "qr.ts"
Cohesion: 0.16
Nodes (21): ensureQr(), markAttendance(), pencereAlani(), pencereyiOku(), pencereyiYaz(), QR_COLLECTION, QrTanimi, regenerateQr() (+13 more)

### Community 14 - "env.ts"
Cohesion: 0.09
Nodes (24): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, blank, blankKeys, bogus, dev, devEmpty, forcedMock, KEYS (+16 more)

### Community 15 - "data-access/repositories.ts"
Cohesion: 0.08
Nodes (38): getRepositories(), resetRepositories(), AddSourceOptions, DigestRepository, DigestRepositoryV1, EnrichmentRepository, EnrichmentRepositoryV1, FeedRepository (+30 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.12
Nodes (37): moveBy(), placeAt(), sameMembers(), ACCEPTED_TYPES, bucketName(), deleteFolder(), deletePhotos(), FOLDERS (+29 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+27 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.12
Nodes (24): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW (+16 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (26): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+18 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "Pixel.tsx"
Cohesion: 0.13
Nodes (15): OnboardingRoute(), styles, styles, TabBarProps, TABS, PixelArt(), PixelIcon(), PixelIconProps (+7 more)

### Community 22 - "accountSchema.ts"
Cohesion: 0.18
Nodes (22): Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), SignupRoute(), ageOn(), DateParts, EMAIL_RE, FieldErrors, formatPhone() (+14 more)

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.07
Nodes (28): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+20 more)

### Community 24 - "supabase/repositories.ts"
Cohesion: 0.11
Nodes (38): @supabase/supabase-js, FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError(), toNetworkError() (+30 more)

### Community 25 - "auth.ts"
Cohesion: 0.18
Nodes (18): HesapSilRoute(), 2. Doğrulama neden Firebase'in bağlantısı değil, Profile, currentUser(), deletionDone(), finishAccountDeletion(), getAuthClient(), loadProfile() (+10 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.13
Nodes (15): Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About, "Hesabım yok aq" — yazılmış ama bağlanmamış bir ekranın maliyeti (+7 more)

### Community 27 - "scripts"
Cohesion: 0.08
Nodes (26): scripts, admin, android, check:all, check:bundle, check:gundem, check:html, check:panel (+18 more)

### Community 28 - "AI Gündem — taşıma planı"
Cohesion: 0.08
Nodes (23): AI Gündem — taşıma planı, Bundan sonrası için, Doğrulanmamışlar — doğrulanmış gibi anlatmayın, Fazlar, K1 — Backend yerinde kalıyor, K2 — Yerleşim: 5. sekme "AI Gündem", K3 — Kullanıcı kaynak ekleyemiyor (v1), K4 — Özetler paylaşımlı, cihaz başına değil (+15 more)

### Community 29 - "2. Fikrin değerlendirmesi — zayıf noktalar"
Cohesion: 0.08
Nodes (25): requireAuth(), 1. Eski "hayır" neden geçersiz, ve yerine ne geliyor, 2.1 Asıl risk QR değil, sertifikadaki isim, 2.2 Ad, düzenlendiği an dondurulmalı, 2.3 Sertifika adresi kişisel veri taşıyor, 2.4 Bir insan, iki hesap, 2.5 Okutma anında giriş yoksa jeton kaybolmamalı, 2.6 Etkinlik salonunun internet'i (+17 more)

### Community 30 - "check-release.mjs"
Cohesion: 0.20
Nodes (9): Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root, rulesBlock() (+1 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.07
Nodes (42): Üç ölü parça, üç ayrı ölüm biçimi, @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, @testing-library/react-native, clients, METRICS, mount() (+34 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.10
Nodes (23): keyboardFor(), placeholderFor(), RaffleEntryRoute(), bad, base, FIELDS, NOW, picked (+15 more)

### Community 33 - "edge.ts"
Cohesion: 0.13
Nodes (17): env, callEdgeFunction(), CODE_MAP, EDGE_TIMEOUT_MS, EdgeCallOptions, EdgeConfig, EdgeErrorEnvelope, isEnvelope() (+9 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.09
Nodes (19): broken, built, capped, dayBefore, EV1, EV1_INPUT, later, mart (+11 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.14
Nodes (13): 1. Ne zorlanıyor, ne zorlanmıyor, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi, 5. Sertifika şablonu (+5 more)

### Community 37 - "hermes-safe.test.ts"
Cohesion: 0.26
Nodes (10): GundemRoute(), isTab(), clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr() (+2 more)

### Community 38 - "eventSchema.ts"
Cohesion: 0.16
Nodes (19): ArchiveCard(), buildEvent(), BuildResult, daysInMonth(), EventInput, joinLocal(), MonthGrid, monthGrids() (+11 more)

### Community 39 - "firebase.ts"
Cohesion: 0.29
Nodes (18): Veri: kim neyi okuyor, kim yazıyor, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, 4.1 Okuma ve durum, Dosyalar, ContentProvider(), fetchContent(), fetchSlides() (+10 more)

### Community 40 - "ref_node_path"
Cohesion: 0.33
Nodes (7): csvCell(), RFC-4180, ref_node_path, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "react-native"
Cohesion: 0.08
Nodes (25): styles, RegistrationDoneRoute(), styles, styles, styles, Task 9: Slider bileşeni — `src/components/HomeSlider.tsx`, expo-image, expo-linear-gradient (+17 more)

### Community 42 - "translateApi.ts"
Cohesion: 0.16
Nodes (16): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, Bagimliliklar (+8 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.22
Nodes (7): Güvenlik taraması — sekiz sessiz delik ve kapatılmayan ikisi, 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 45 - "cekilis-kurallari.tsx"
Cohesion: 0.16
Nodes (17): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, RaffleRulesRoute(), styles, RaffleNotice(), styles, PRIVACY_POLICY_URL, APPLE_DISCLAIMER, OFFICIAL_RULES (+9 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "sponsors.tsx"
Cohesion: 0.09
Nodes (35): Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 2: Hook'lar ve ana sayfa kopyayla açılıyor, Task 3: Adım 1'i kapat, Task 4: expo-image ve sürüm 1.1.6, Vitrin önbelleği — uygulama planı (+27 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.10
Nodes (33): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+25 more)

### Community 51 - "data.ts"
Cohesion: 0.10
Nodes (22): styles, IconTile(), Toggle(), ACCOUNT_DELETE_URL, EventFact, EVENTS, LEGAL_BASE, NOTIFICATION_CATEGORIES (+14 more)

### Community 52 - "src/otp.ts"
Cohesion: 0.24
Nodes (13): VerifyRoute(), ResetPasswordRoute(), OgrenciNo(), digits(), cagir(), kodDogrula(), kodIste(), ogrenciNoDegistir() (+5 more)

### Community 53 - "admin/certificates.ts"
Cohesion: 0.15
Nodes (13): BELGE_NO_UZUNLUK, BulunanSertifika, findCertificate(), makeBelgeNo(), publishCertificates(), revokeCertificate(), SertifikaKaydi, YayinGirdisi (+5 more)

### Community 54 - "4. Uygulama"
Cohesion: 0.13
Nodes (14): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 2. Kaynak metinden ayrıldığımız yerler, 4.5 Etkinlik detayı — "Ödülü sağlayan", 4.6 Hesabım (`app/(tabs)/hesap.tsx`), 4.7 Rotalar, 4.8 Tema ve ortak bileşenler (+6 more)

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "ref_node_fs"
Cohesion: 0.18
Nodes (8): dotenv, ref_node_fs, app, OPTIONAL, ortak, panel, root, servisHesabiDosyasi

### Community 57 - "README.md"
Cohesion: 0.15
Nodes (12): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Katkı, Lisans, Ne yapıyor, Proje yapısı (+4 more)

### Community 58 - "Dosya haritası"
Cohesion: 0.19
Nodes (13): SponsorRoute(), Dosya haritası, Review Focus, Sponsorlar ve ana sayfa slider'ı — uygulama planı, Task 11: Sponsor ekranları — `/sponsorlar`, `/sponsor/[id]`, Task 12: "Ödülü sağlayan" — `PrizeProviders`, Task 14: `check:release` kapsamı, belgeler, tam doğrulama, Task 3: Panel sıralaması — `admin/ordering.ts` (+5 more)

### Community 59 - "vitrinView.ts"
Cohesion: 0.26
Nodes (12): choiceOptions(), ChoiceRow, COPY, deleteForm(), imageBlock(), moveForm(), positionOptions(), slideForm() (+4 more)

### Community 60 - "vitrin-cache.test.tsx"
Cohesion: 0.15
Nodes (9): SponsorsRoute(), ./firebase, METRICS, Cache, { cacheReady }, METRICS, { SponsorsProvider, useSponsors }, Storage (+1 more)

### Community 61 - "src/certificates.ts"
Cohesion: 0.22
Nodes (9): CertificatesRoute(), firebase, sertifikalarimiGetir(), Sertifikam, sertifikaPdfUrl(), sertifikaUrl(), PANEL_BASE_URL, COLLECTIONS (+1 more)

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "useFallbackTranslation.ts"
Cohesion: 0.15
Nodes (12): GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), useFallbackTranslation(), YedekCeviri, yedekGerekli() (+4 more)

### Community 64 - "notificationsView.ts"
Cohesion: 0.29
Nodes (9): ceviriSatiri(), DeviceSummary, LogRow, MailStatus, notificationsPage(), num(), PendingRow, when() (+1 more)

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "qrSchema.ts"
Cohesion: 0.17
Nodes (18): QrRoute(), @react-native-async-storage/async-storage, LOCAL_OFFSET, bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId(), isQrToken() (+10 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 68 - "todayLocal"
Cohesion: 0.29
Nodes (10): Bildirim otomasyonu — kime, neye göre, ve neyin gitmemesi gerektiği, From the 1.1.0 release, Klasörler, Kurallar ve tuzaklar, clubHour(), isPast(), splitByDate(), splitLocal() (+2 more)

### Community 69 - "react"
Cohesion: 0.09
Nodes (31): Galeri, yenileme göstergesi, karşılama — uygulama planı, Review Focus, Task 1: Adla karşılama, Task 2: PixelLoader'lı yenileme göstergesi, Task 3: Yakınlaştırılabilir görsel, Task 4: Tam ekran görüntüleyici, Task 5: Otomatik kaydırma ortak hook'a, Task 6: Hero slider ve etkinlik detayı (+23 more)

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 71 - "KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG)"
Cohesion: 0.25
Nodes (7): Dağıtım yüzeyleri, Git, İçerik girişi, Komutlar, KOÜ Yazılım Kulübü — mobil uygulama (KOU SENG), Stack, Yasaklar

### Community 72 - "parseSourceUrl"
Cohesion: 0.31
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 74 - "announcements.tsx"
Cohesion: 0.14
Nodes (17): announcementChoices(), 3.3 Ayrıştırma ve doğrulama, 5.1 Menü, 5.2 Liste sayfası, 5.3 Formlar, 5.5 Süresi dolan slaytları silen zamanlayıcı, 5.6 Görünüm, 5. Panel (+9 more)

### Community 75 - "attendance.ts"
Cohesion: 0.36
Nodes (6): YoklamaHatasi, yoklamaMesaji(), YoklamaSonucu, yoklamaVarMi(), yoklamaVer(), attendanceId()

### Community 77 - "cursor.ts"
Cohesion: 0.39
Nodes (7): base64ToBytes(), bytesToBase64(), decodeCursor(), encodeCursor(), keysetFilter(), utf8Bytes(), utf8FromBytes()

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.19
Nodes (22): 5.4 Sunucu, 7. Test ve kontroller, Task 1: `src/vitrinCache.ts`, 5. Test ve kontroller, ClubEvent, Build, buildSlide(), buildSponsor() (+14 more)

### Community 79 - "etkinlik/[id].tsx"
Cohesion: 0.09
Nodes (37): styles, styles, styles, LoginRoute(), styles, styles, styles, BOS (+29 more)

### Community 80 - "certificateDelivery.ts"
Cohesion: 0.13
Nodes (20): deliverCertificates(), dogrulamaUrl(), TeslimGirdisi, TeslimSonucu, esc(), RENK, sertifikaMaili(), SertifikaPostasi (+12 more)

### Community 81 - "EventDetailRoute"
Cohesion: 0.50
Nodes (5): EventDetailRoute(), initials(), isFull(), seatsLabel(), seatsLeft()

### Community 82 - "FeedView"
Cohesion: 0.27
Nodes (9): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW (+1 more)

### Community 83 - "3. Veri modeli"
Cohesion: 0.40
Nodes (5): 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar, 3. Veri modeli

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

### Community 96 - "deploy-rules.mjs"
Cohesion: 0.25
Nodes (6): ref_node_child_process, ref_node_url, cli, projectId, result, root

### Community 98 - "(tabs)/index.tsx"
Cohesion: 0.14
Nodes (14): AnnouncementRoute(), styles, AnnouncementRow(), HomeRoute(), styles, Announcement, src_announcements_announcement, src_announcements_fetchannouncement (+6 more)

## Knowledge Gaps
- **653 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+648 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 800 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `hesap.tsx`, `ui.tsx`, `content.tsx`, `data-access/hooks.ts`, `package.json`, `store.ts`, `data-access/repositories.ts`, `useEnrichmentWarmup.ts`, `Pixel.tsx`, `auth.ts`, `integration.test.tsx`, `react-native`, `cekilis-kurallari.tsx`, `sponsors.tsx`, `data.ts`, `vitrin-cache.test.tsx`, `announcements.tsx`, `etkinlik/[id].tsx`, `(tabs)/index.tsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Why does `err()` connect `supabase/repositories.ts` to `push.ts`, `check-panel.ts`, `edge.ts`, `server.ts`, `ref_node_path`, `mock/mapper.ts`, `data-access/repositories.ts`, `demo-account.ts`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Why does `ClubEvent` connect `vitrinSchema.ts` to `push.ts`, `(tabs)/index.tsx`, `hesap.tsx`, `ui.tsx`, `server.ts`, `check-event-schema.ts`, `content.tsx`, `parseSourceUrl`, `eventSchema.ts`, `firebase.ts`, `vitrin.ts`, `data.ts`, `Yönetim paneli`, `2. Fikrin değerlendirmesi — zayıf noktalar`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _653 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.061569416498993966 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05647840531561462 - nodes in this community are weakly interconnected._