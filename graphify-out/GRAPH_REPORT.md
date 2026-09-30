# Graph Report - app_seng  (2026-09-30)

## Corpus Check
- 246 files · ~304,111 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 11 file(s) not represented in the graph (top: (none) 4, .ttf 4, .example 1)

## Summary
- 2096 nodes · 5594 edges · 94 communities (88 shown, 6 thin omitted)
- Extraction: 92% EXTRACTED · 8% INFERRED · 0% AMBIGUOUS · INFERRED: 450 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c7f9ee8f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- push.ts
- check-panel.ts
- check-security.ts
- etkinlik/[id].tsx
- theme.ts
- server.ts
- translateApi.ts
- data-access/hooks.ts
- mock/mapper.ts
- esc
- expo
- package.json
- store.ts
- types.ts
- accountSchema.ts
- supabase/repositories.ts
- vitrin.ts
- dependencies
- useEnrichmentWarmup.ts
- pdf.ts
- demo-account.ts
- Pixel.tsx
- useFallbackTranslation.ts
- Giriş sistemi, QR yoklama, sertifika — son plan
- supabase-repositories.test.ts
- auth.ts
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
- Doğrulama ve teklik — plan ve kurulum
- hermes-safe.test.ts
- eventSchema.ts
- QrRoute
- export-registrations.ts
- ui.tsx
- photos.ts
- sync-deps.mjs
- Güvenlik testlerinin değerlendirmesi — 2026-09-24
- raffle-legal.test.tsx
- html.ts
- check-rules.mjs
- sponsors.tsx
- make-icons.py
- accountApi.ts
- data.ts
- ZoomableImage.tsx
- react
- parseSourceUrl
- check-bundle.mjs
- ref_node_fs
- README.md
- Galeri, yenileme göstergesi, karşılama — tasarım
- Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`
- vitrin-cache.test.tsx
- photo-viewer.test.tsx
- repository
- qr.ts
- readingText.ts
- qrSchema.ts
- tsconfig.json
- taramaKarari
- bugs
- allowScripts
- overrides
- data-access/index.ts
- session-start.sh
- announcements.tsx
- article-summary.test.tsx
- getDb
- vitrinSchema.ts
- hesap.tsx
- mail.ts
- gate.ts
- 4. Uygulama
- Galeri, yenileme göstergesi, karşılama — uygulama planı
- firebase.ts
- 8. Fazlar
- @testing-library/react-native
- icons.test.ts
- KOÜ Yazılım Kulübü — agent notes
- deploy-rules.mjs
- Mağazaya çıkarma
- (tabs)/index.tsx
- Yönetim paneli
- gradients

## God Nodes (most connected - your core abstractions)
1. `react` - 82 edges
2. `react-native` - 53 edges
3. `Txt()` - 45 edges
4. `colors` - 44 edges
5. `Load-bearing decisions — the why log` - 38 edges
6. `esc()` - 37 edges
7. `expo-router` - 37 edges
8. `Dosya haritası` - 36 edges
9. `react-native-safe-area-context` - 34 edges
10. `useContent()` - 33 edges

## Surprising Connections (you probably didn't know these)
- `Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı` --references--> `PhotoUploadError`  [INFERRED]
  AGENTS.md → admin/photos.ts
- `Fazlar` --references--> `storage()`  [INFERRED]
  docs/ai-gundem-port.md → admin/photos.ts
- `6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı` --references--> `attendanceRows()`  [INFERRED]
  docs/guvenlik-testleri-degerlendirmesi.md → admin/qr.ts
- `Task 5: Panel görünümü — `admin/vitrinView.ts`, menü, CSS` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-plani.md → admin/views.ts
- `5.1 Menü` --references--> `page()`  [INFERRED]
  docs/sponsorlar-ve-slider-tasarimi.md → admin/views.ts

## Import Cycles
- None detected.

## Communities (94 total, 6 thin omitted)

### Community 0 - "push.ts"
Cohesion: 0.05
Nodes (71): alreadyAnnounced(), announce(), autoPushEnabled(), claimOnce(), deliver(), DeviceSummary, ExpoTicket, flushPending() (+63 more)

### Community 1 - "check-panel.ts"
Cohesion: 0.05
Nodes (47): decideSend(), kayit(), makeCode(), OTP_MAX_ATTEMPTS, OTP_MAX_SENDS, OTP_RESEND_MS, OTP_SEND_WINDOW_MS, OTP_TTL_MS (+39 more)

### Community 2 - "check-security.ts"
Cohesion: 0.07
Nodes (31): AuthLike, esc(), RENK, sertifikaMaili(), SertifikaPostasi, attendanceRows(), zamanMetni(), clientIp() (+23 more)

### Community 3 - "etkinlik/[id].tsx"
Cohesion: 0.08
Nodes (37): Agent setup, keyboardFor(), placeholderFor(), RaffleEntryRoute(), styles, EventDetailRoute(), initials(), styles (+29 more)

### Community 4 - "theme.ts"
Cohesion: 0.09
Nodes (39): Conventions, styles, Durum, styles, styles, styles, Tab, Kurallar ve tuzaklar (+31 more)

### Community 5 - "server.ts"
Cohesion: 0.06
Nodes (35): parsePort(), resolvePort(), QrTanimi, registeredNotPresent(), YoklamaSatiri, inputZaman(), qrLandingPage(), qrPage() (+27 more)

### Community 6 - "translateApi.ts"
Cohesion: 0.16
Nodes (16): AZURE_ENDPOINT, AZURE_MAX_CHARS, azureCevabiOku(), azureCevir(), azureConfig, azureKodunuOku(), CeviriSonuc, Bagimliliklar (+8 more)

### Community 7 - "data-access/hooks.ts"
Cohesion: 0.16
Nodes (22): AI Gündem — kaybolan kayıtlar, çeviri kaynağı ve Azure, Bu turda **bilerek** düzeltilmeyenler, asDataError(), DataErrorThrown, ENRICHMENT_POLL_SCHEDULE_SECONDS, ENRICHMENT_POLL_WINDOW_SECONDS, enrichmentPollDelayMs(), enrichmentStalledMessage() (+14 more)

### Community 8 - "mock/mapper.ts"
Cohesion: 0.07
Nodes (42): base64ToBytes(), bytesToBase64(), cursorOf(), decodeCursor(), encodeCursor(), isAfterCursor(), utf8Bytes(), utf8FromBytes() (+34 more)

### Community 9 - "esc"
Cohesion: 0.13
Nodes (31): durum(), sertifikaPage(), sertifikaYokPage(), deleteAccountPage(), legalPage(), privacyPage(), termsPage(), ceviriSatiri() (+23 more)

### Community 10 - "expo"
Cohesion: 0.05
Nodes (40): backgroundColor, backgroundImage, foregroundImage, adaptiveIcon, blockedPermissions, package, predictiveBackGestureEnabled, projectId (+32 more)

### Community 11 - "package.json"
Cohesion: 0.06
Nodes (30): author, description, license, main, name, private, version, expo (+22 more)

### Community 12 - "store.ts"
Cohesion: 0.16
Nodes (35): AI Gündem portundan — bir çalışma zamanı, bir de kendi testine saklanan hatalar, GundemAraRoute(), useEnabledSources(), useLoaded(), useReadArticles(), useRecentSearches(), useSavedArticles(), useUserSettings() (+27 more)

### Community 13 - "types.ts"
Cohesion: 0.10
Nodes (29): GundemArticleRoute(), bodyFor(), hasSummary(), Segment, segmentState(), ceviriDurumu(), DigestArticleFacts, DigestItemRow (+21 more)

### Community 14 - "accountSchema.ts"
Cohesion: 0.06
Nodes (43): Arka plan zenginleştirmesi ve yapılandırma görünürlüğü, Doğum tarihi kutusu — biçimlendirmenin girdiyi kilitlemesi, DateFields(), Task 1: Adla karşılama, blank, blankKeys, bogus, dev (+35 more)

### Community 15 - "supabase/repositories.ts"
Cohesion: 0.14
Nodes (22): src_gundem_data_access_mock_mapper_isaftercursor, AddSourceOptions, DEFAULT_PAGE_SIZE, DigestRepository, DigestRepositoryV1, EnrichmentRepository, EnrichmentRepositoryV1, FeedRepository (+14 more)

### Community 16 - "vitrin.ts"
Cohesion: 0.13
Nodes (33): moveBy(), placeAt(), sameMembers(), MAX_UPLOAD_BYTES, eventChoices(), Kind, notFound(), orderedDocs() (+25 more)

### Community 17 - "dependencies"
Cohesion: 0.06
Nodes (35): dependencies, expo, expo-build-properties, expo-camera, expo-constants, expo-crypto, expo-dev-client, expo-device (+27 more)

### Community 18 - "useEnrichmentWarmup.ts"
Cohesion: 0.11
Nodes (25): FeedFilter, queryKeys, clients, mockRequestEnrichment, mount(), QUEUED, READY, NOW (+17 more)

### Community 19 - "pdf.ts"
Cohesion: 0.11
Nodes (26): adSinifi(), certificateHtml(), kareSiraso(), muhur(), RENK, SertifikaVerisi, yilOf(), bas() (+18 more)

### Community 20 - "demo-account.ts"
Cohesion: 0.11
Nodes (27): bizimMi(), claimIdentity(), ClaimResult, Kimlik, PHONE_CLAIMS, releaseIdentity(), sahibiysenSil(), sahiplen() (+19 more)

### Community 21 - "Pixel.tsx"
Cohesion: 0.13
Nodes (17): styles, OnboardingRoute(), styles, styles, TabBarProps, TABS, react-native-safe-area-context, react-native-svg (+9 more)

### Community 22 - "useFallbackTranslation.ts"
Cohesion: 0.24
Nodes (7): PANEL_BASE_URL, useFallbackTranslation(), YedekCeviri, yedekGerekli(), CeviriYok, PanelCeviri, panelCevirisi()

### Community 23 - "Giriş sistemi, QR yoklama, sertifika — son plan"
Cohesion: 0.09
Nodes (22): 1. Verilmiş kararlar, 2. Bu tasarım neyi güvence altına alıyor, neyi almıyor, 3.1 Sign in with Apple zorunlu değil — bir şartla, 3.2 Apple girişi dayatmamızı da istemiyor, 3.3 Hesap silme — Apple, 3.4 Hesap silme — Google Play, 3.5 Bizim tarafta ayrıca değişecekler, 3. Apple ve Google gerçekte ne şart koşuyor (+14 more)

### Community 24 - "supabase-repositories.test.ts"
Cohesion: 0.13
Nodes (21): @supabase/supabase-js, keysetFilter(), FEED_VIEW, getSupabaseClient(), PostgrestErrorLike, requireSupabaseClient(), SEARCH_RPC, toDataError() (+13 more)

### Community 25 - "auth.ts"
Cohesion: 0.13
Nodes (24): HesapSilRoute(), firebase, normalizeEmail(), Profile, toProfile(), YoklamaHatasi, YoklamaSonucu, yoklamaVarMi() (+16 more)

### Community 26 - "Load-bearing decisions — the why log"
Cohesion: 0.10
Nodes (21): Apple'ın çekiliş reddinden — 5.3.1 / 5.3.2, Bir turda üç yanlış sayı — ölçmeden ayar değiştirmenin maliyeti, "Bunlar uygulamaya düşmeyecek dememiş miydik?" — kapının tutmadığı yer, Doğrulama postası, teklik ve OTP, Fotoğraf yüklerken 502 — Cloudflare cevabı yutuyordu, Supabase tıkanmıştı, Geçmişi silmek — ETag tuzağı ve telefondaki ölü kimlikler, Giriş sistemi — ölçülen iki çözümleme tuzağı, Herkese açık bir deponun kimliği — LICENSE, README ve About (+13 more)

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
Cohesion: 0.18
Nodes (10): Güvenlik taraması — sekiz sessiz delik ve kapatılmayan ikisi, Faz 1 — kimlik altyapısı, UI yok, failed, json(), pkg, read(), results, root (+2 more)

### Community 31 - "integration.test.tsx"
Cohesion: 0.10
Nodes (26): @tanstack/query-async-storage-persister, @tanstack/react-query, @tanstack/react-query-persist-client, clients, METRICS, mount(), QUERY_KEY_VERSION, asyncStorageFromKv() (+18 more)

### Community 32 - "raffleSchema.ts"
Cohesion: 0.11
Nodes (18): bad, base, FIELDS, NOW, picked, VALID, csvColumns(), DEFAULT_FIELDS (+10 more)

### Community 33 - "kv.ts"
Cohesion: 0.14
Nodes (14): From the 1.1.0 release, expo-crypto, Captured, TEST_CONFIG, generateDeviceId, getDeviceId(), isDeviceId(), randomBytes16() (+6 more)

### Community 34 - "check-event-schema.ts"
Cohesion: 0.08
Nodes (23): inputToForm(), broken, built, capped, dayBefore, EV1, EV1_INPUT, later (+15 more)

### Community 35 - "devDependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, express, firebase-admin, jest, jest-expo, multer, nodemailer (+15 more)

### Community 36 - "Doğrulama ve teklik — plan ve kurulum"
Cohesion: 0.12
Nodes (15): 1. Ne zorlanıyor, ne zorlanmıyor, 2. Doğrulama neden Firebase'in bağlantısı değil, 3. Akış, 4.1 DNS, 4.2 Gönderen hesap, 4.3 Panel ortam değişkenleri, 4.4 Gövdenin kendisi, 4. Postanın gerçekten ulaşması — operatörün işi (+7 more)

### Community 37 - "hermes-safe.test.ts"
Cohesion: 0.26
Nodes (10): GundemRoute(), isTab(), clubCalendar(), ABSOLUTE_AFTER_DAYS, absoluteTr(), calendarDaysBetween(), MONTHS_TR, relativeTimeTr() (+2 more)

### Community 38 - "eventSchema.ts"
Cohesion: 0.16
Nodes (20): ArchiveCard(), buildEvent(), BuildResult, daysInMonth(), EventInput, MAX_PHOTOS, MonthGrid, monthGrids() (+12 more)

### Community 39 - "QrRoute"
Cohesion: 0.33
Nodes (10): QrRoute(), @react-native-async-storage/async-storage, yoklamaMesaji(), bekleyeniOku(), bekleyeniSil(), bekleyeniYaz(), isEventId(), isQrToken() (+2 more)

### Community 40 - "export-registrations.ts"
Cohesion: 0.29
Nodes (7): csvCell(), RFC-4180, dotenv, arg(), COLUMNS, loadServiceAccount(), main()

### Community 41 - "ui.tsx"
Cohesion: 0.11
Nodes (32): styles, SponsorRoute(), styles, styles, TakvimRoute(), View_, Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme, Task 9: Slider bileşeni — `src/components/HomeSlider.tsx` (+24 more)

### Community 42 - "photos.ts"
Cohesion: 0.21
Nodes (17): ACCEPTED_TYPES, bucketName(), deleteFolder(), deletePhotos(), FOLDERS, isBucketMissing(), keyProblem(), missingBucketMessage() (+9 more)

### Community 43 - "sync-deps.mjs"
Cohesion: 0.15
Nodes (16): bundled, changes, compare(), deps(), install(), installed(), latestPatch(), left (+8 more)

### Community 44 - "Güvenlik testlerinin değerlendirmesi — 2026-09-24"
Cohesion: 0.25
Nodes (6): 1. Mevcut testler ne ölçüyordu, 3. Karşılaştırma: aynı testler eski koda karşı, 6. Copilot incelemesinden (PR #74) — üç bulgu, üçü de doğru çıktı, 7. Dağıtım yüzeyleri — bu tur neye dokundu, Güvenlik testlerinin değerlendirmesi — 2026-09-24, safeNext()

### Community 45 - "raffle-legal.test.tsx"
Cohesion: 0.22
Nodes (11): RaffleRulesRoute(), APPLE_DISCLAIMER, OFFICIAL_RULES, ORGANIZER_LINE, RAFFLE_CLUB, RAFFLE_CONTACT_EMAIL, RAFFLE_ORGANIZER, RuleSection (+3 more)

### Community 46 - "html.ts"
Cohesion: 0.16
Nodes (13): a, b, Block, BLOCK_ENDING, decodeEntities(), DROPPED, htmlToPlainText(), InlineRun (+5 more)

### Community 47 - "check-rules.mjs"
Cohesion: 0.15
Nodes (11): 2. Yeni testler, 5. Testin kendisinden çıkan dersler, ref_node_os, assert(), emu, izin(), JAR, KURALLAR (+3 more)

### Community 48 - "sponsors.tsx"
Cohesion: 0.11
Nodes (32): Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`, Task 2: Hook'lar ve ana sayfa kopyayla açılıyor, 1. Sorun, 2. Hedef, 3.1 `src/vitrinCache.ts` (yeni), 3.2 Hook ve sağlayıcı, 3.3 Ana sayfa (`app/(tabs)/index.tsx`), 3. Adım 1 — liste önbelleği (OTA, 1.1.5) (+24 more)

### Community 49 - "make-icons.py"
Cohesion: 0.20
Nodes (15): Image, pathlib, pil, feature_graphic(), first_line_box(), main(), notification_icon(), play_icon() (+7 more)

### Community 50 - "accountApi.ts"
Cohesion: 0.12
Nodes (26): bearer(), gunlukTavan(), Kim, kimlikCoz(), kodLimiti, numaraLimiti, otpOku(), registerAccountApi() (+18 more)

### Community 51 - "data.ts"
Cohesion: 0.09
Nodes (24): BildirimAyarlariRoute(), styles, styles, expo-linear-gradient, styles, IconTile(), Toggle(), ACCOUNT_DELETE_URL (+16 more)

### Community 52 - "ZoomableImage.tsx"
Cohesion: 0.25
Nodes (8): 5. Test, react-native-reanimated, react-native-worklets, clampOffset(), DOUBLE_TAP_SCALE, MAX_SCALE, Props, ZoomableImage()

### Community 53 - "react"
Cohesion: 0.13
Nodes (13): expo-image, react, styles, PhotoHero(), Props, styles, METRICS, mockEvent (+5 more)

### Community 54 - "parseSourceUrl"
Cohesion: 0.29
Nodes (8): RFC-3986, Task 1: Ortak şema — `src/vitrinSchema.ts`, asciiLower(), hasForbiddenHostChar(), invalid(), ParsedSourceUrl, parseSourceUrl(), SourceUrlProblem

### Community 55 - "check-bundle.mjs"
Cohesion: 0.20
Nodes (13): argv, bundleFiles(), dist, embeddedJwtRoles(), exportBundle(), FORBIDDEN, FORBIDDEN_JWT_ROLES, main() (+5 more)

### Community 56 - "ref_node_fs"
Cohesion: 0.15
Nodes (14): asBase64Json(), asJson(), parseServiceAccount(), ServiceAccount, loadServiceAccount(), ref_node_fs, ref_node_path, app (+6 more)

### Community 57 - "README.md"
Cohesion: 0.12
Nodes (15): Arşiv paneli, Bildirimler, Ekranlar, Gerekenler, Görseller, Katkı, Kurulum, Lisans (+7 more)

### Community 58 - "Galeri, yenileme göstergesi, karşılama — tasarım"
Cohesion: 0.25
Nodes (8): Task 2: PixelLoader'lı yenileme göstergesi, 2. Yenileme göstergesi, 3. Karşılama, 4. iOS'ta giriş yapmadan arşiv — değerlendirme, 6. Dağıtım yüzeyleri, 7. Reddedilenler, Galeri, yenileme göstergesi, karşılama — tasarım, PixelLoader()

### Community 59 - "Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`"
Cohesion: 0.20
Nodes (17): choiceOptions(), ChoiceRow, COPY, deleteForm(), formatDay(), imageBlock(), moveForm(), positionOptions() (+9 more)

### Community 60 - "vitrin-cache.test.tsx"
Cohesion: 0.17
Nodes (8): ./firebase, METRICS, Cache, { cacheReady }, METRICS, { SponsorsProvider, useSponsors }, Storage, { useSlides }

### Community 61 - "photo-viewer.test.tsx"
Cohesion: 0.33
Nodes (4): react-native-gesture-handler, METRICS, PHOTOS, { width }

### Community 62 - "repository"
Cohesion: 0.67
Nodes (3): repository, type, url

### Community 63 - "qr.ts"
Cohesion: 0.10
Nodes (29): TeslimGirdisi, TeslimSonucu, BELGE_NO_UZUNLUK, belgeTarihi(), BulunanSertifika, findCertificate(), makeBelgeNo(), publishCertificates() (+21 more)

### Community 65 - "readingText.ts"
Cohesion: 0.46
Nodes (6): Cihazdan gelen "çeviri gelmiş ama özet oluşturamıyor" raporundan, readingTimeTr(), toParagraphs(), wordCount(), WORDS_PER_MINUTE, ArticleBody()

### Community 66 - "qrSchema.ts"
Cohesion: 0.23
Nodes (10): QR penceresi hiç açılmadı — bir tip uyuşmazlığı, sıfır hata mesajı, LOCAL_OFFSET, defaultWindow(), pad(), QR_ACILIS_SAAT, QR_ALPHABET, QR_TOKEN_LENGTH, QrOkuma (+2 more)

### Community 67 - "tsconfig.json"
Cohesion: 0.29
Nodes (6): expo/tsconfig.base, compilerOptions, strict, types, extends, include

### Community 70 - "allowScripts"
Cohesion: 0.40
Nodes (5): allowScripts, esbuild, @firebase/util, fsevents, protobufjs

### Community 72 - "data-access/index.ts"
Cohesion: 0.10
Nodes (30): env, getRepositories(), src_gundem_data_access_index_repository_contract_version, resetRepositories(), createMockRepositories(), hasNoContent(), NO_CONTENT_ARTICLE, createMockEnrichmentRepository() (+22 more)

### Community 74 - "announcements.tsx"
Cohesion: 0.26
Nodes (10): announcementChoices(), fetchAnnouncement(), fetchAnnouncements(), getJson(), toAnnouncement(), unwrapList(), AnnouncementsProvider(), AnnouncementsValue (+2 more)

### Community 75 - "article-summary.test.tsx"
Cohesion: 0.29
Nodes (9): clients, enrichedRow(), fakePostgrest(), LONG_BODY, memoryKv(), METRICS, mount(), stubEdge() (+1 more)

### Community 77 - "getDb"
Cohesion: 0.24
Nodes (18): Veri: kim neyi okuyor, kim yazıyor, Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları, 4.1 Okuma ve durum, Bildirimler nereden çıkıyor, Dosyalar, EAS derlemelerinde, Firebase, Kurulum (tek seferlik, 3 adım) (+10 more)

### Community 78 - "vitrinSchema.ts"
Cohesion: 0.12
Nodes (24): Adım 1 — liste önbelleği (dal `fix/vitrin-onbellek`, OTA), Adım 2 — görseller (dal `fix/gorsel-onbellek`, 1.1.6), Global Constraints, Review Focus, Task 1: `src/vitrinCache.ts`, Task 3: Adım 1'i kapat, Task 4: expo-image ve sürüm 1.1.6, Vitrin önbelleği — uygulama planı (+16 more)

### Community 79 - "hesap.tsx"
Cohesion: 0.09
Nodes (39): styles, VerifyRoute(), LoginRoute(), styles, styles, BOS, SignupRoute(), styles (+31 more)

### Community 80 - "mail.ts"
Cohesion: 0.22
Nodes (9): initMail(), Mail, MailConfig, MailEki, MailEnv, mailFrom(), MailResult, readMailConfig() (+1 more)

### Community 82 - "gate.ts"
Cohesion: 0.29
Nodes (8): GateCandidate, GateResult, heldLineTr(), HOLD_WINDOW_MINUTES, holdUnenriched(), article(), minutesAgo(), NOW

### Community 83 - "4. Uygulama"
Cohesion: 0.08
Nodes (25): SatirLink(), Task 13: Hesabım — KULÜP grubu, 1. Kapsam, 3.1 `sponsors/{id}`, 3.2 `slides/{id}`, 3.3 Ayrıştırma ve doğrulama, 3.4 Sıralama, görünürlük, silinme, 3.5 Kurallar (+17 more)

### Community 84 - "Galeri, yenileme göstergesi, karşılama — uygulama planı"
Cohesion: 0.29
Nodes (10): Galeri, yenileme göstergesi, karşılama — uygulama planı, Review Focus, Task 3: Yakınlaştırılabilir görsel, Task 5: Otomatik kaydırma ortak hook'a, Task 6: Hero slider ve etkinlik detayı, Task 7: Kapanış, 1. Galeri, HomeSlider() (+2 more)

### Community 85 - "firebase.ts"
Cohesion: 0.09
Nodes (26): Bildirim gelmedi, nereye bakılır, expo-constants, expo-device, expo-font, @expo-google-fonts/plus-jakarta-sans, @expo-google-fonts/press-start-2p, expo-notifications, expo-splash-screen (+18 more)

### Community 86 - "8. Fazlar"
Cohesion: 0.33
Nodes (6): 8. Fazlar, Faz 2 — giriş, profil, eşleşmiş kayıt, Faz 3 — hesap silme (mağaza şartı), Faz 4 — QR yoklama ve çekiliş, Faz 5 — sertifika, Yapılmayacaklar

### Community 87 - "@testing-library/react-native"
Cohesion: 0.18
Nodes (8): @testing-library/react-native, mockGetExpoPushToken, mockUpsertDevice, { NotificationSync }, prefs, PHOTOS, fits(), HostNode

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
Nodes (15): AnnouncementRoute(), styles, AnnouncementRow(), HomeRoute(), styles, react-native, Announcement, src_announcements_announcement (+7 more)

### Community 100 - "Yönetim paneli"
Cohesion: 0.50
Nodes (4): Neden var, Panelin ortam değişkenleri, Sunucuya koyarken, Yönetim paneli

### Community 101 - "gradients"
Cohesion: 0.14
Nodes (13): styles, CertificatesRoute(), styles, Task 4: Tam ekran görüntüleyici, sertifikaPdfUrl(), sertifikaUrl(), AuthGate(), styles (+5 more)

## Knowledge Gaps
- **660 isolated node(s):** `session-start.sh script`, `PATH`, `kodLimiti`, `sifreGonderLimiti`, `sifreDegistirLimiti` (+655 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 811 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `etkinlik/[id].tsx`, `theme.ts`, `data-access/hooks.ts`, `package.json`, `store.ts`, `useEnrichmentWarmup.ts`, `Pixel.tsx`, `integration.test.tsx`, `ui.tsx`, `raffle-legal.test.tsx`, `sponsors.tsx`, `data.ts`, `ZoomableImage.tsx`, `vitrin-cache.test.tsx`, `photo-viewer.test.tsx`, `home-slider.test.tsx`, `data-access/index.ts`, `announcements.tsx`, `article-summary.test.tsx`, `hesap.tsx`, `firebase.ts`, `@testing-library/react-native`, `(tabs)/index.tsx`, `gradients`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **Why does `err()` connect `data-access/index.ts` to `push.ts`, `check-panel.ts`, `server.ts`, `export-registrations.ts`, `supabase/repositories.ts`, `demo-account.ts`, `supabase-repositories.test.ts`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **Why does `ClubEvent` connect `vitrinSchema.ts` to `push.ts`, `(tabs)/index.tsx`, `check-event-schema.ts`, `theme.ts`, `server.ts`, `Yönetim paneli`, `etkinlik/[id].tsx`, `eventSchema.ts`, `ui.tsx`, `vitrin.ts`, `data.ts`, `firebase.ts`, `parseSourceUrl`, `2. Fikrin değerlendirmesi — zayıf noktalar`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `Txt()` (e.g. with `Conventions` and `Klasörler`) actually correct?**
  _`Txt()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `session-start.sh script`, `PATH`, `kodLimiti` to the rest of the system?**
  _660 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `push.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.050286058416139714 - nodes in this community are weakly interconnected._
- **Should `check-panel.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.04915824915824916 - nodes in this community are weakly interconnected._