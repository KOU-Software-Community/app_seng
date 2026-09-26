# Sponsorlar ve ana sayfa slider'ı — uygulama planı

> **Ajan için:** Bu plan `superpowers:executing-plans` ile, görev görev ve aynı
> oturumda uygulanır (kullanıcının CLAUDE.md'si `subagent-driven-development`'ı
> istemiyor). Adımlar `- [ ]` ile işaretli. Plan bitince son inceleme
> `fable-reviewer` alt ajanına yaptırılır, Critical maddeler düzeltilir.

**Goal:** Ana sayfaya panelden yönetilen bir slider ve Sponsorlarımız bölümü;
`/sponsorlar` ve `/sponsor/[id]` ekranları; çekilişte "Ödülü sağlayan" etiketi;
panelde sürükle-bırakla sıralanan Slider ve Sponsorlar sayfaları ve süresi dolan
slaytı silen bir zamanlayıcı.

**Architecture:** Paylaşılan saf bir şema modülü (`src/vitrinSchema.ts`) hem
panelin form doğrulamasını hem uygulamanın Firestore okumasını yapıyor. Uygulama
`sponsors` ve `slides`'ı ayrı ayrı, `fetchContent`'ten bağımsız okuyor; sponsorlar
kökte bir provider'da, slaytlar ana sayfaya özel bir hook'ta. Panel iki koleksiyonu
`admin/vitrin.ts`'teki rotalarla yazıyor, sırayı saf fonksiyonlarla
(`admin/ordering.ts`) 1…n tutuyor, görselleri mevcut Supabase bucket'ına yeni
klasörlerle yüklüyor.

**Tech Stack:** Expo SDK 57, React Native 0.86, expo-router; Firebase JS SDK
(Firestore); panel: Express 5, firebase-admin, multer, sharp, Supabase Storage;
Jest (jest-expo) + RNTL 14; `scripts/check-*`.

**Spec:** `docs/sponsorlar-ve-slider-tasarimi.md`

## Global Constraints

- UI metni Türkçe; büyük/küçük harf dönüşümü `toLocaleUpperCase('tr')` ile.
- Renk, radius, gradyan yalnız `src/theme.ts`'ten. Yeni uygulama kodunda hex ya
  da rgba literal yok; beyaz için `colors.white`.
- Ham `Text` yok: `Txt` / `PixelTxt`.
- Dokunulabilir her yeni öğe `accessibilityRole` ve `accessibilityLabel` taşıyor.
- Hermes'te `URL` ayrıştırmıyor: https denetimi `parseSourceUrl` ile.
- Gün kararı `todayLocal(new Date())` ile; cihaz saati ya da `getHours()` değil.
- RNTL 14: `render` async ve `await` ediliyor; elle `unmount()` yok.
- Panel: kullanıcıdan gelen her metin `esc()`'ten geçiyor; 502/504 dönülmüyor
  (503); yeni rotalar `app.use(requireAuth)`'tan sonra; `onsubmit` içinde
  enterpolasyon yok.
- `firestore.rules` değişikliği önce `check:rules`'a senaryo olarak giriyor.
  `npm run rules:deploy`, `firebase deploy`, `eas build/submit/update`
  **çalıştırılmıyor**.
- Commit: `git config user.name Akadirr1`, `git config user.email
  akadirr41@gmail.com`; `Co-Authored-By` ya da `Claude-Session` satırı yok. Kodu
  değiştiren her commit'ten önce `graphify update .`, `graphify-out/` de commit'e.
- `check:release` iddiaları `strip()` ile yorumları atıyor; her yeni iddia,
  koruduğu şey bozulunca kırmızı verdiği görülerek ekleniyor.

## Review Focus

1. **Console'dan elle girilmiş eksik ya da bozuk doküman** (sırasız, hedefsiz,
   http logolu): uygulama çökmeden dokümanı atlıyor ya da alanı yok sayıyor.
   → Task 1 testleri.
2. **Geçmiş bir bitiş tarihiyle kaydedilen slayt:** zamanlayıcı onu hemen
   silerdi; form reddediyor. → Task 1, "geçmiş bitiş tarihi reddediliyor".
3. **Sürükle-bırak sırasında liste başka bir sekmede değişmiş:** eksik, fazla ya
   da tekrarlı kimlikli sıra yazılmıyor. → Task 3, `sameMembers` testleri.
4. **Kurallar yayınlanmadan ya da yapılandırmasız çıkan uygulama:** Sponsorlar
   ekranı hata şeridini ve "Sponsor ol" kartını gösteriyor, "Henüz sponsor yok"
   demiyor. → Task 11, ekran testi.
5. **Yenilemede slayt sayısı azalıyor:** nokta dizini taşmıyor, tek slaytta
   nokta ve otomatik geçiş yok. → Task 9, "slayt sayısı azalınca dizin taşmıyor".

---

## Dosya haritası

| Dosya | Sorumluluk |
|---|---|
| `src/vitrinSchema.ts` (yeni) | Tipler, `buildSponsor`/`buildSlide` (panel), `toSponsor`/`toSlide` (uygulama), `byOrder`, `isOrder`, `visibleSlides`, `expiredSlideIds`, `sponsorEvents` |
| `src/firebase.ts` | `COLLECTIONS.sponsors/slides`, `fetchSponsors`, `fetchSlides` |
| `firestore.rules`, `scripts/check-rules.mjs` | İki koleksiyonun kuralı ve senaryoları |
| `admin/ordering.ts` (yeni) | `placeAt`, `moveBy`, `sameMembers` |
| `admin/photos.ts` | `uploadPhoto(folder, …)`, `deleteFolder`, klasör izin listesi |
| `admin/vitrinView.ts` (yeni) | Liste sayfası (sürükle-bırak betiği dahil), slayt ve sponsor formları |
| `admin/views.ts` | Menü bağlantıları ve yeni CSS sınıfları |
| `admin/vitrin.ts` (yeni) | `registerVitrin` rotaları, `runSlideSweep`, `startSlideSweeper` |
| `admin/server.ts` | `registerVitrin` kaydı ve zamanlayıcının başlatılması |
| `src/theme.ts`, `src/components/PhotoSlot.tsx`, `src/data.ts` | `colors.white`, `gradients.slideShade`, `resizeMode`, `SPONSOR_CONTACT_EMAIL` |
| `src/sponsors.tsx` (yeni), `src/slides.ts` (yeni) | `SponsorsProvider`/`useSponsors`, `useSlides` |
| `src/components/HomeSlider.tsx` (yeni) | Slider |
| `src/components/PrizeProviders.tsx` (yeni) | "Ödülü sağlayan" etiketleri |
| `app/sponsorlar.tsx`, `app/sponsor/[id].tsx` (yeni) | İki ekran |
| `app/_layout.tsx`, `app/(tabs)/index.tsx`, `app/(tabs)/hesap.tsx`, `app/(tabs)/takvim.tsx`, `app/(tabs)/arsiv.tsx`, `app/etkinlik/[id].tsx` | Bağlantılar |
| `scripts/check-panel.ts`, `scripts/check-release.mjs` | Yeni iddialar |
| `src/__tests__/vitrin-schema.test.ts`, `home-slider.test.tsx`, `prize-providers.test.tsx`, `sponsors-screen.test.tsx` (yeni) | Testler |

Şema tek modül (`src/vitrinSchema.ts`): iki koleksiyon `isOrder`, `byOrder` ve
https denetimini paylaşıyor, ayrı dosyada ya birbirini içe aktarırlardı ya
kopyalardı. Spec §2 bunu yazıyor.

---

### Task 1: Ortak şema — `src/vitrinSchema.ts`

**Files:**
- Create: `src/vitrinSchema.ts`
- Test: `src/__tests__/vitrin-schema.test.ts`

**Interfaces:**
- Consumes: `parseSourceUrl` (`src/gundem/data-access/sourceUrl.ts`),
  `ClubEvent` (`src/data.ts`).
- Produces:
  - `KICKERS`, `type Kicker = 'BUGUN' | 'CEKILIS' | 'DUYURU'`
  - `type SlideTarget = {type:'event',id} | {type:'announcement',id} | {type:'url',url}`
  - `type Slide = { id; title; meta; image?; kicker?; target; order; endsAt? }`
  - `type Sponsor = { id; name; sector; description; logo?; url?; host?; eventIds; order }`
  - `type SponsorDoc`, `type SlideDoc` (panelin yazdığı şekil, boş alan `''`)
  - `type Build<T> = {ok:true; value:T} | {ok:false; errors:Record<string,string>}`
  - `isOrder(v: unknown): v is number`, `byOrder(a, b): number`
  - `buildSponsor(input): Build<SponsorDoc>`,
    `buildSlide(input, today: string): Build<SlideDoc>`
  - `toSponsor(id, raw): Sponsor | null`, `toSlide(id, raw): Slide | null`
  - `visibleSlides(slides: Slide[], today: string): Slide[]`
  - `expiredSlideIds(slides: {id; endsAt?: unknown}[], today: string): string[]`
  - `sponsorEvents(sponsor, events, archive, hasRaffle): SponsorEventRow[]`,
    `type SponsorEventRow = { event: ClubEvent; upcoming: boolean; prize: boolean }`

- [ ] **Step 1: Failing testleri yaz**

`src/__tests__/vitrin-schema.test.ts`:

```ts
import type { ClubEvent } from '../data';
import {
  buildSlide,
  buildSponsor,
  byOrder,
  expiredSlideIds,
  sponsorEvents,
  toSlide,
  toSponsor,
  visibleSlides,
  type Slide,
} from '../vitrinSchema';

/**
 * Vitrin şeması iki taraflı: panel yazıyor, uygulama okuyor. Buradaki
 * iddiaların çoğu "Console'dan elle girilmiş bozuk bir doküman uygulamayı
 * düşürmüyor" ve "panel geçersiz bir şeyi kaydetmiyor" diyor.
 */

const TODAY = '2026-10-01';
const LOGO = 'https://ref.supabase.co/storage/v1/object/public/event-photos/sponsors/s1/a.png';

describe('buildSponsor — panel formu', () => {
  const ok = {
    name: ' Örnek A.Ş. ',
    sector: 'Yazılım',
    description: 'Tanıtım',
    url: 'https://Ornek.com',
    logo: LOGO,
    eventIds: ['e1', 'e1', '', 'e2'],
    order: 2,
    active: true,
  };

  it('geçerli girdiyi yazılacak şekle çeviriyor', () => {
    expect(buildSponsor(ok)).toEqual({
      ok: true,
      value: {
        name: 'Örnek A.Ş.',
        sector: 'Yazılım',
        description: 'Tanıtım',
        url: 'https://ornek.com/',
        logo: LOGO,
        eventIds: ['e1', 'e2'],
        order: 2,
        active: true,
      },
    });
  });

  it('ad boşsa kaydetmiyor', () => {
    const r = buildSponsor({ ...ok, name: '   ' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.name).toBeDefined();
  });

  it('https olmayan web sitesini reddediyor', () => {
    const r = buildSponsor({ ...ok, url: 'http://ornek.com' });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.url).toBeDefined();
  });

  it('web sitesi boş bırakılabiliyor', () => {
    const r = buildSponsor({ ...ok, url: '' });
    expect(r.ok && r.value.url).toBe('');
  });

  it('sıra 1 veya daha büyük bir tam sayı olmalı', () => {
    for (const order of [0, -1, 1.5, Number.NaN, '1', undefined]) {
      expect(buildSponsor({ ...ok, order }).ok).toBe(false);
    }
  });
});

describe('toSponsor — uygulamanın okuması', () => {
  it('sırası olmayan doküman düşüyor (sıra zorunlu)', () => {
    expect(toSponsor('s1', { name: 'A', active: true })).toBeNull();
  });

  it('adı olmayan doküman düşüyor', () => {
    expect(toSponsor('s1', { order: 1 })).toBeNull();
  });

  it('https olmayan logo yok sayılıyor, sponsor kalıyor', () => {
    const s = toSponsor('s1', { name: 'A', order: 1, logo: 'http://x.com/a.png' });
    expect(s?.name).toBe('A');
    expect(s?.logo).toBeUndefined();
  });

  it('web sitesinin alan adı detay için çıkarılıyor', () => {
    const s = toSponsor('s1', { name: 'A', order: 1, url: 'https://Ornek.com/hakkimizda' });
    expect(s?.url).toBe('https://ornek.com/hakkimizda');
    expect(s?.host).toBe('ornek.com');
  });

  it('etkinlik kimlikleri temizleniyor', () => {
    const s = toSponsor('s1', { name: 'A', order: 1, eventIds: ['e1', 3, '', 'e1', 'e2'] });
    expect(s?.eventIds).toEqual(['e1', 'e2']);
  });

  it('nesne olmayan gövde düşüyor', () => {
    expect(toSponsor('s1', null)).toBeNull();
    expect(toSponsor('s1', 'metin')).toBeNull();
  });
});

describe('byOrder', () => {
  it('sıra artan, eşitlikte kimlik', () => {
    const list = [
      { id: 'b', order: 2 },
      { id: 'c', order: 1 },
      { id: 'a', order: 2 },
    ];
    expect([...list].sort(byOrder).map((x) => x.id)).toEqual(['c', 'a', 'b']);
  });
});

describe('sponsorEvents — detaydaki satırlar', () => {
  const ev = (id: string) => ({ id, title: id, short: '' }) as ClubEvent;

  it('yaklaşan önce, geçmiş sonra; eşleşmeyen düşüyor; çekiliş işaretli', () => {
    const rows = sponsorEvents(
      { eventIds: ['gecmis', 'silinmis', 'gelecek'] },
      [ev('gelecek'), ev('baska')],
      [ev('gecmis')],
      (id) => id === 'gelecek',
    );
    expect(rows.map((r) => [r.event.id, r.upcoming, r.prize])).toEqual([
      ['gelecek', true, true],
      ['gecmis', false, false],
    ]);
  });
});

describe('buildSlide — panel formu', () => {
  const ok = {
    title: 'Hackathon kayıtları açıldı',
    meta: '48 saat',
    image: '',
    kicker: 'DUYURU',
    targetType: 'url',
    targetId: '',
    targetUrl: 'https://kouseng.com/hackathon',
    endsAt: '',
    order: 1,
    active: true,
  };

  it('geçerli bağlantı slaytı', () => {
    const r = buildSlide(ok, TODAY);
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.value.target).toEqual({ type: 'url', url: 'https://kouseng.com/hackathon' });
      expect(r.value.kicker).toBe('DUYURU');
      expect(r.value.endsAt).toBe('');
    }
  });

  it('başlık zorunlu', () => {
    const r = buildSlide({ ...ok, title: ' ' }, TODAY);
    expect(!r.ok && r.errors.title).toBeTruthy();
  });

  it('etkinlik seçilmeden kaydedilmiyor', () => {
    const r = buildSlide({ ...ok, targetType: 'event', targetId: '' }, TODAY);
    expect(!r.ok && r.errors.target).toBeTruthy();
  });

  it('seçilen etkinlik hedef oluyor', () => {
    const r = buildSlide({ ...ok, targetType: 'event', targetId: 'git-atolyesi' }, TODAY);
    expect(r.ok && r.value.target).toEqual({ type: 'event', id: 'git-atolyesi' });
  });

  it('https olmayan bağlantı reddediliyor', () => {
    const r = buildSlide({ ...ok, targetUrl: 'http://kouseng.com' }, TODAY);
    expect(!r.ok && r.errors.target).toBeTruthy();
  });

  it('listede olmayan rozet reddediliyor', () => {
    const r = buildSlide({ ...ok, kicker: 'YENI' }, TODAY);
    expect(!r.ok && r.errors.kicker).toBeTruthy();
  });

  it('rozetsiz slayt geçerli', () => {
    const r = buildSlide({ ...ok, kicker: '' }, TODAY);
    expect(r.ok && r.value.kicker).toBe('');
  });

  it('bitiş tarihi biçimi denetleniyor', () => {
    const r = buildSlide({ ...ok, endsAt: '12.10.2026' }, TODAY);
    expect(!r.ok && r.errors.endsAt).toBeTruthy();
  });

  it('geçmiş bitiş tarihi reddediliyor (zamanlayıcı slaytı hemen silerdi)', () => {
    const r = buildSlide({ ...ok, endsAt: '2026-09-30' }, TODAY);
    expect(!r.ok && r.errors.endsAt).toBeTruthy();
  });

  it('bugünkü bitiş tarihi kabul ediliyor', () => {
    expect(buildSlide({ ...ok, endsAt: TODAY }, TODAY).ok).toBe(true);
  });

  it('sıra zorunlu', () => {
    expect(buildSlide({ ...ok, order: 0 }, TODAY).ok).toBe(false);
  });
});

describe('toSlide — uygulamanın okuması', () => {
  const doc = {
    title: 'Git atölyesi',
    target: { type: 'event', id: 'git-atolyesi' },
    order: 1,
    active: true,
  };

  it('geçerli doküman okunuyor', () => {
    expect(toSlide('x', doc)).toEqual({
      id: 'x',
      title: 'Git atölyesi',
      meta: '',
      image: undefined,
      kicker: undefined,
      target: { type: 'event', id: 'git-atolyesi' },
      order: 1,
      endsAt: undefined,
    });
  });

  it('hedefi olmayan ya da bozuk doküman düşüyor', () => {
    expect(toSlide('x', { ...doc, target: undefined })).toBeNull();
    expect(toSlide('x', { ...doc, target: { type: 'event' } })).toBeNull();
    expect(toSlide('x', { ...doc, target: { type: 'url', url: 'http://a.com' } })).toBeNull();
    expect(toSlide('x', { ...doc, target: { type: 'baska', id: 'a' } })).toBeNull();
  });

  it('sırası olmayan doküman düşüyor', () => {
    expect(toSlide('x', { ...doc, order: undefined })).toBeNull();
  });

  it('tanınmayan rozet çizilmiyor, slayt kalıyor', () => {
    const s = toSlide('x', { ...doc, kicker: 'YENI' });
    expect(s?.title).toBe('Git atölyesi');
    expect(s?.kicker).toBeUndefined();
  });

  it('https olmayan görsel yok sayılıyor', () => {
    expect(toSlide('x', { ...doc, image: 'http://a.com/a.jpg' })?.image).toBeUndefined();
  });
});

describe('visibleSlides — bitiş tarihi', () => {
  const s = (id: string, order: number, endsAt?: string): Slide => ({
    id,
    title: id,
    meta: '',
    order,
    target: { type: 'event', id: 'e1' },
    endsAt,
  });

  it('bitişi olmayan kalıcı, bugün dahil görünür, dün ve bozuk gizli; sıralı', () => {
    const list = [s('dun', 1, '2026-09-30'), s('kalici', 3), s('bugun', 2, TODAY), s('bozuk', 4, '1 Ekim')];
    expect(visibleSlides(list, TODAY).map((x) => x.id)).toEqual(['bugun', 'kalici']);
  });
});

describe('expiredSlideIds — panelin zamanlayıcısı', () => {
  it('yalnız bitiş tarihi bugünden önce olanlar siliniyor', () => {
    expect(
      expiredSlideIds(
        [
          { id: 'a', endsAt: '2026-09-30' },
          { id: 'b', endsAt: TODAY },
          { id: 'c' },
          { id: 'd', endsAt: 'bozuk' },
          { id: 'e', endsAt: '' },
          { id: 'f', endsAt: 20260930 },
        ],
        TODAY,
      ),
    ).toEqual(['a']);
  });
});
```

- [ ] **Step 2: Testin düştüğünü gör**

Run: `npx jest src/__tests__/vitrin-schema.test.ts`
Expected: FAIL — `Cannot find module '../vitrinSchema'`.

- [ ] **Step 3: Modülü yaz**

`src/vitrinSchema.ts`:

```ts
/**
 * Vitrin — ana sayfanın slider'ı ve sponsorlar: şema, doğrulama, okuma.
 *
 * Bu modülü iki taraf paylaşıyor (`announcementApi.ts` gibi): panel formu
 * `buildSponsor` / `buildSlide` ile doğruluyor, uygulama Firestore'dan geleni
 * `toSponsor` / `toSlide` ile okuyor. Kural tek yerde; biri değişip öbürü
 * kalsaydı panelin kaydettiği şey uygulamada görünmez olurdu.
 *
 * Okuma katı ama kırılgan değil: zorunlu alanı bozuk doküman atlanıyor, listeyi
 * düşürmüyor; isteğe bağlı alan bozuksa yok sayılıyor. Veri Firebase
 * Console'dan elle de girilebilir ve Console hiçbir şeyi doğrulamıyor.
 */
import type { ClubEvent } from './data';
import { parseSourceUrl } from './gundem/data-access/sourceUrl';

/**
 * Tasarımın rozet dili ASCII ("SON GUN", "CEKILIS") — pixel fontunda Türkçe
 * harfler var, bu bir font sınırı değil, görünüm kararı. Değer sabit bir liste
 * çünkü ikon bundan seçiliyor.
 */
export const KICKERS = ['BUGUN', 'CEKILIS', 'DUYURU'] as const;
export type Kicker = (typeof KICKERS)[number];

export type SlideTarget =
  | { type: 'event'; id: string }
  | { type: 'announcement'; id: string }
  | { type: 'url'; url: string };

export type Slide = {
  id: string;
  title: string;
  meta: string;
  image?: string;
  kicker?: Kicker;
  target: SlideTarget;
  order: number;
  /** `YYYY-AA-GG`; yoksa slayt kalıcı. */
  endsAt?: string;
};

export type Sponsor = {
  id: string;
  name: string;
  sector: string;
  description: string;
  logo?: string;
  url?: string;
  /** `url`'nin alan adı — detayda düğmenin altındaki satır. */
  host?: string;
  eventIds: string[];
  order: number;
};

/** Panelin yazdığı şekil. Firestore `undefined` kabul etmiyor: boş alan `''`. */
export type SponsorDoc = {
  name: string;
  sector: string;
  description: string;
  logo: string;
  url: string;
  eventIds: string[];
  order: number;
  active: boolean;
};

export type SlideDoc = {
  title: string;
  meta: string;
  image: string;
  kicker: Kicker | '';
  target: SlideTarget;
  endsAt: string;
  order: number;
  active: boolean;
};

export type Build<T> = { ok: true; value: T } | { ok: false; errors: Record<string, string> };

export type SponsorEventRow = { event: ClubEvent; upcoming: boolean; prize: boolean };

const DAY = /^\d{4}-\d{2}-\d{2}$/;

const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

const isKicker = (v: string): v is Kicker => (KICKERS as readonly string[]).includes(v);

/** https ise normalleştirilmiş adres ve alan adı, değilse null. */
function https(raw: string): { url: string; host: string } | null {
  if (!raw) return null;
  const parsed = parseSourceUrl(raw);
  return parsed.ok ? { url: parsed.url, host: parsed.host } : null;
}

/** Sıra 1 veya daha büyük bir tam sayı. Panel her değişiklikte 1…n yazıyor. */
export function isOrder(v: unknown): v is number {
  return typeof v === 'number' && Number.isInteger(v) && v >= 1;
}

/** `order` artan; eşitlikte kimlik, yani her açılışta aynı sıra. */
export function byOrder(a: { id: string; order: number }, b: { id: string; order: number }): number {
  if (a.order !== b.order) return a.order - b.order;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

function idList(v: unknown): string[] {
  return Array.isArray(v) ? [...new Set(v.map(str).filter(Boolean))] : [];
}

function toTarget(raw: unknown): SlideTarget | null {
  if (!raw || typeof raw !== 'object') return null;
  const t = raw as Record<string, unknown>;
  if (t.type === 'event' || t.type === 'announcement') {
    const id = str(t.id);
    return id ? { type: t.type, id } : null;
  }
  if (t.type === 'url') {
    const link = https(str(t.url));
    return link ? { type: 'url', url: link.url } : null;
  }
  return null;
}

export function buildSponsor(input: {
  name: unknown;
  sector: unknown;
  description: unknown;
  url: unknown;
  logo: unknown;
  eventIds: unknown;
  order: unknown;
  active: unknown;
}): Build<SponsorDoc> {
  const errors: Record<string, string> = {};
  const name = str(input.name);
  if (!name) errors.name = 'Ad boş olamaz.';

  const rawUrl = str(input.url);
  const site = https(rawUrl);
  if (rawUrl && !site) errors.url = 'Web sitesi https:// ile başlayan geçerli bir adres olmalı.';

  const order = input.order;
  if (!isOrder(order)) errors.order = 'Sıra 1 veya daha büyük bir tam sayı olmalı.';
  if (!isOrder(order) || Object.keys(errors).length) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name,
      sector: str(input.sector),
      description: str(input.description),
      logo: https(str(input.logo))?.url ?? '',
      url: site?.url ?? '',
      eventIds: idList(input.eventIds),
      order,
      active: input.active === true,
    },
  };
}

export function toSponsor(id: string, raw: unknown): Sponsor | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const name = str(r.name);
  const order = r.order;
  if (!name || !isOrder(order)) return null;

  const site = https(str(r.url));
  return {
    id,
    name,
    sector: str(r.sector),
    description: str(r.description),
    logo: https(str(r.logo))?.url,
    url: site?.url,
    host: site?.host,
    eventIds: idList(r.eventIds),
    order,
  };
}

/**
 * Sponsor detayındaki etkinlik satırları: önce yaklaşanlar (takvim sırası),
 * sonra geçmişler (arşiv sırası). Listede olmayan kimlik düşüyor — silinmiş
 * bir etkinliğe giden satır "Etkinlik bulunamadı"ya açılırdı.
 */
export function sponsorEvents(
  sponsor: Pick<Sponsor, 'eventIds'>,
  events: ClubEvent[],
  archive: ClubEvent[],
  hasRaffle: (eventId: string) => boolean,
): SponsorEventRow[] {
  const wanted = new Set(sponsor.eventIds);
  const rows = (list: ClubEvent[], upcoming: boolean) =>
    list
      .filter((e) => wanted.has(e.id))
      .map((event) => ({ event, upcoming, prize: hasRaffle(event.id) }));
  return [...rows(events, true), ...rows(archive, false)];
}

export function buildSlide(
  input: {
    title: unknown;
    meta: unknown;
    image: unknown;
    kicker: unknown;
    targetType: unknown;
    targetId: unknown;
    targetUrl: unknown;
    endsAt: unknown;
    order: unknown;
    active: unknown;
  },
  today: string,
): Build<SlideDoc> {
  const errors: Record<string, string> = {};
  const title = str(input.title);
  if (!title) errors.title = 'Başlık boş olamaz.';

  const kicker = str(input.kicker);
  if (kicker && !isKicker(kicker)) errors.kicker = 'Rozet listeden seçilmeli.';

  const target = toTarget({ type: input.targetType, id: input.targetId, url: input.targetUrl });
  if (!target) {
    errors.target =
      input.targetType === 'url'
        ? 'Bağlantı https:// ile başlayan geçerli bir adres olmalı.'
        : 'Slayta dokununca açılacak etkinliği ya da duyuruyu seçin.';
  }

  const endsAt = str(input.endsAt);
  if (endsAt && !DAY.test(endsAt)) errors.endsAt = 'Bitiş tarihi YYYY-AA-GG biçiminde olmalı.';
  // Geçmiş bir tarih kaydedilseydi zamanlayıcı slaytı bir sonraki turda silerdi.
  else if (endsAt && endsAt < today) errors.endsAt = 'Bitiş tarihi bugünden önce olamaz.';

  const order = input.order;
  if (!isOrder(order)) errors.order = 'Sıra 1 veya daha büyük bir tam sayı olmalı.';
  if (!target || !isOrder(order) || Object.keys(errors).length) return { ok: false, errors };

  return {
    ok: true,
    value: {
      title,
      meta: str(input.meta),
      image: https(str(input.image))?.url ?? '',
      kicker: isKicker(kicker) ? kicker : '',
      target,
      endsAt,
      order,
      active: input.active === true,
    },
  };
}

export function toSlide(id: string, raw: unknown): Slide | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const title = str(r.title);
  const target = toTarget(r.target);
  const order = r.order;
  if (!title || !target || !isOrder(order)) return null;

  const kicker = str(r.kicker);
  return {
    id,
    title,
    meta: str(r.meta),
    image: https(str(r.image))?.url,
    kicker: isKicker(kicker) ? kicker : undefined,
    target,
    order,
    endsAt: str(r.endsAt) || undefined,
  };
}

/** Uygulamada görünenler: bitiş tarihi yoksa ya da bugün veya sonrasıysa. Bozuk tarih gizler. */
export function visibleSlides(slides: Slide[], today: string): Slide[] {
  return slides
    .filter((s) => !s.endsAt || (DAY.test(s.endsAt) && s.endsAt >= today))
    .sort(byOrder);
}

/** Panelin zamanlayıcısının sileceği slaytlar: bitiş tarihi bugünden önce olanlar. */
export function expiredSlideIds(slides: { id: string; endsAt?: unknown }[], today: string): string[] {
  return slides
    .filter((s) => typeof s.endsAt === 'string' && DAY.test(s.endsAt) && s.endsAt < today)
    .map((s) => s.id);
}
```

- [ ] **Step 4: Testin geçtiğini gör**

Run: `npx jest src/__tests__/vitrin-schema.test.ts && npm run typecheck`
Expected: PASS, typecheck temiz.

- [ ] **Step 5: Commit**

```bash
graphify update .
git add src/vitrinSchema.ts src/__tests__/vitrin-schema.test.ts graphify-out/
git commit -m "feat(vitrin): sponsor ve slayt için ortak şema — panel doğruluyor, uygulama okuyor"
```

---

### Task 2: Firestore — kurallar, `check:rules`, okuma fonksiyonları

**Files:**
- Modify: `firestore.rules` (`match /raffles/{eventId}` bloğunun hemen altı)
- Modify: `scripts/check-rules.mjs` (`tohum` içindeki `deger`; "panelin
  koleksiyonları istemciden yazılamıyor" bloğunun sonu)
- Modify: `src/firebase.ts` (`COLLECTIONS`, yeni `fetchSponsors`/`fetchSlides`)

**Interfaces:**
- Consumes: `toSponsor`, `toSlide`, `byOrder`, `Sponsor`, `Slide` (Task 1).
- Produces: `COLLECTIONS.sponsors = 'sponsors'`, `COLLECTIONS.slides = 'slides'`,
  `fetchSponsors(): Promise<Sponsor[]>` (aktifler, sıralı),
  `fetchSlides(): Promise<Slide[]>` (aktifler, `endsAt` süzmesi YOK — o
  `visibleSlides`'ın işi).

- [ ] **Step 1: `check:rules`'a senaryoları ekle (önce)**

`scripts/check-rules.mjs` → `tohum` içindeki `deger`e boolean desteği (şu an
`true`'yu `"true"` metnine çeviriyor, kural `== true` ile eşleşmezdi):

```js
  const deger = (v) =>
    v instanceof Date
      ? { timestampValue: v.toISOString() }
      : Array.isArray(v)
      ? { arrayValue: { values: v.map(deger) } }
      : typeof v === 'boolean'
        ? { booleanValue: v }
        : typeof v === 'number'
          ? { integerValue: String(v) }
          : { stringValue: String(v) };
```

Aynı dosyada, `telefon istemciden sahiplenilemiyor` satırının hemen altına:

```js
  // --- vitrin: sponsorlar ve slaytlar. Yayındakiler herkese açık, taslak
  //     kapalı, yazan yalnız panel. Liste sorgusu `where('active','==',true)`
  //     taşımak zorunda: kural filtresiz listeyi reddediyor, yoksa taslaklar
  //     da gelirdi.
  await tohum('sponsors/s1', { name: 'Örnek A.Ş.', order: 1, active: true });
  await tohum('sponsors/s2', { name: 'Taslak Ltd.', order: 2, active: false });
  await tohum('slides/sl1', { title: 'Hackathon', order: 1, active: true });
  await tohum('slides/sl2', { title: 'Taslak', order: 2, active: false });
  for (const [kol, acik, taslak] of [
    ['sponsors', 's1', 's2'],
    ['slides', 'sl1', 'sl2'],
  ]) {
    await izin(`${kol}: yayındakiler listelenebiliyor`, () =>
      getDocs(query(collection(anon, kol), where('active', '==', true))),
    );
    await red(`${kol}: filtresiz liste okunamıyor`, () => getDocs(collection(anon, kol)));
    await izin(`${kol}: yayındaki doküman okunuyor`, () => getDoc(doc(anon, kol, acik)));
    await red(`${kol}: taslak okunamıyor`, () => getDoc(doc(anon, kol, taslak)));
    await red(`${kol}: istemci yazamıyor`, () =>
      setDoc(doc(u1, kol, 'sahte'), { name: 'Sahte', title: 'Sahte', order: 1, active: true }),
    );
    await red(`${kol}: istemci taslağı yayına alamıyor`, () =>
      setDoc(doc(u1, kol, taslak), { active: true }, { merge: true }),
    );
  }
```

- [ ] **Step 2: Kural senaryolarının düştüğünü gör**

Run: `npm run check:rules`
Expected: FAIL — "sponsors: yayındakiler listelenebiliyor" ve
"slides: yayındakiler listelenebiliyor" (+ "yayındaki doküman okunuyor")
`permission-denied` ile kırmızı; ret senaryoları zaten yeşil (sondaki
"eşleşmeyen her şey kapalı" bloğu).

- [ ] **Step 3: Kuralları yaz**

`firestore.rules` → `match /raffles/{eventId} { … }` bloğunun hemen altına:

```
    // Vitrin: ana sayfanın slaytları ve sponsorlar. Yazan yalnız panel (Admin
    // SDK, bu kuralları görmez). Okuma yalnız yayındakiler: pasif doküman
    // (taslak) istemciye hiç gitmiyor. Liste sorgusu da bu yüzden
    // `where('active', '==', true)` taşımak zorunda — filtresiz liste reddediliyor.
    match /sponsors/{id} {
      allow read: if resource.data.active == true;
      allow write: if false;
    }
    match /slides/{id} {
      allow read: if resource.data.active == true;
      allow write: if false;
    }
```

- [ ] **Step 4: Kuralların geçtiğini gör**

Run: `npm run check:rules`
Expected: PASS, "Tüm kontroller geçti."

- [ ] **Step 5: Okuma fonksiyonlarını yaz**

`src/firebase.ts`:
- `firebase/firestore` içe aktarımına `where` ekle.
- Tip içe aktarımı:
  `import { byOrder, toSlide, toSponsor, type Slide, type Sponsor } from './vitrinSchema';`
- `COLLECTIONS` nesnesinin sonuna, `attendance: 'attendance',` satırının altına
  (yorumda `}` karakteri kullanma — "her koleksiyonun bir kuralı var" kontrolü
  nesneyi ilk `}`'e kadar okuyor):

```ts
  /**
   * Vitrin: ana sayfanın slaytları ve sponsorlar. Panel yazıyor; istemci
   * yalnız `active == true` olanları okuyabiliyor, sorgu da bunu söylemek
   * zorunda.
   */
  sponsors: 'sponsors',
  slides: 'slides',
```

- `fetchContent`'in altına:

```ts
/**
 * Sponsorlar — yalnız yayındakiler, sıralı.
 *
 * `fetchContent`'in `Promise.all`'ına girmiyor, bilerek: bu okuma düşerse
 * (kural henüz yayınlanmadıysa) etkinlikler düşmemeli. `where` kuralın şartı;
 * sıralama istemcide, çünkü `where` + `orderBy` birleşik indeks isterdi.
 */
export async function fetchSponsors(): Promise<Sponsor[]> {
  const snap = await withTimeout(
    getDocs(query(collection(getDb(), COLLECTIONS.sponsors), where('active', '==', true))),
    'sponsors',
  );
  return snap.docs
    .map((d) => toSponsor(d.id, d.data()))
    .filter((s): s is Sponsor => s !== null)
    .sort(byOrder);
}

/** Slaytlar — yalnız yayındakiler. Bitiş tarihi süzmesi `visibleSlides`'ta. */
export async function fetchSlides(): Promise<Slide[]> {
  const snap = await withTimeout(
    getDocs(query(collection(getDb(), COLLECTIONS.slides), where('active', '==', true))),
    'slides',
  );
  return snap.docs
    .map((d) => toSlide(d.id, d.data()))
    .filter((s): s is Slide => s !== null)
    .sort(byOrder);
}
```

- [ ] **Step 6: Doğrula**

Run: `npm run typecheck && npm run check:release`
Expected: PASS — "her koleksiyonun bir kuralı var" yeni iki koleksiyonu da
buluyor, "tek koleksiyon uygulamayı karartmıyor" yeşil.

Kırmızı sınaması: `firestore.rules`'tan `match /slides/{id}` bloğunu geçici sil →
`npm run check:release` "kuralsız koleksiyon: slides" diye kırmızı → geri al.

- [ ] **Step 7: Commit**

```bash
graphify update .
git add firestore.rules scripts/check-rules.mjs src/firebase.ts graphify-out/
git commit -m "feat(vitrin): sponsors ve slides kuralları, check:rules senaryoları, okuma fonksiyonları"
```

---

### Task 3: Panel sıralaması — `admin/ordering.ts`

**Files:**
- Create: `admin/ordering.ts`
- Test: `scripts/check-panel.ts` (`void (async () => {` satırından hemen önce)

**Interfaces:**
- Produces: `placeAt(ids: string[], id: string, position: number): string[]`,
  `moveBy(ids: string[], id: string, delta: -1 | 1): string[]`,
  `sameMembers(a: string[], b: string[]): boolean`.

- [ ] **Step 1: Failing iddiaları yaz**

`scripts/check-panel.ts` → içe aktarımlara:
`import { moveBy, placeAt, sameMembers } from '../admin/ordering';`

`void (async () => {` satırından hemen önce:

```ts
// ------------------------------------------------------------- vitrin sırası
// Sıra 1…n ve boşluksuz. "Yeni bir şeyi 1 numara yaparsak diğerleri kaysın" —
// kullanıcının tarifi; yerleştirme, taşıma ve sürükle-bırakın kabulü burada.
{
  const j = (ids: string[]) => ids.join(',');
  assert('yeni öğe 1. sıraya konunca diğerleri kayıyor', j(placeAt(['a', 'b', 'c'], 'd', 1)) === 'd,a,b,c');
  assert('var olan öğe başa alınınca diğerleri kayıyor', j(placeAt(['a', 'b', 'c'], 'c', 1)) === 'c,a,b');
  assert('öğe ortaya konabiliyor', j(placeAt(['a', 'b', 'c'], 'a', 2)) === 'b,a,c');
  assert('aralık dışı büyük sıra sona sıkışıyor', j(placeAt(['a', 'b'], 'c', 99)) === 'a,b,c');
  assert('sıfır ve eksi sıra başa sıkışıyor', j(placeAt(['a', 'b'], 'c', 0)) === 'c,a,b');
  assert('yukarı taşıma komşuyla yer değiştiriyor', j(moveBy(['a', 'b', 'c'], 'b', -1)) === 'b,a,c');
  assert('aşağı taşıma komşuyla yer değiştiriyor', j(moveBy(['a', 'b', 'c'], 'b', 1)) === 'a,c,b');
  assert('en üstteki yukarı gitmiyor', j(moveBy(['a', 'b', 'c'], 'a', -1)) === 'a,b,c');
  assert('en alttaki aşağı gitmiyor', j(moveBy(['a', 'b', 'c'], 'c', 1)) === 'a,b,c');
  assert('bilinmeyen kimlik listeyi değiştirmiyor', j(moveBy(['a', 'b'], 'x', 1)) === 'a,b');
  assert('sürükle-bırak aynı kümeyi kabul ediyor', sameMembers(['a', 'b', 'c'], ['c', 'a', 'b']));
  assert('eksik kimlikli sıra reddediliyor', !sameMembers(['a', 'b', 'c'], ['a', 'b']));
  assert('yabancı kimlikli sıra reddediliyor', !sameMembers(['a', 'b'], ['a', 'x']));
  assert('tekrarlı kimlikli sıra reddediliyor', !sameMembers(['a', 'b'], ['a', 'a']));
}
```

- [ ] **Step 2: Düştüğünü gör**

Run: `npm run check:panel`
Expected: FAIL — `Cannot find module '../admin/ordering'`.

- [ ] **Step 3: Modülü yaz**

`admin/ordering.ts`:

```ts
/**
 * Vitrin sırası — panelin Slider ve Sponsorlar listeleri.
 *
 * Kural tek: sıra 1…n ve boşluksuz. Bir öğe k. sıraya konunca oradaki ve
 * sonrakiler bir kayıyor; bu yüzden her değişiklik listenin tamamını yeniden
 * numaralıyor. Liste onlarca öğe — bütün listeyi yazmak ucuz, "yalnız değişeni
 * yaz" hesabı ise hata üretmeye değmez.
 */

/** `id`'yi listeden çıkarıp 1 tabanlı `position`'a yerleştirir. Aralık dışı konum uca sıkışır. */
export function placeAt(ids: string[], id: string, position: number): string[] {
  const rest = ids.filter((x) => x !== id);
  const at = Math.min(Math.max(Math.trunc(position) - 1, 0), rest.length);
  return [...rest.slice(0, at), id, ...rest.slice(at)];
}

/** Bir adım yukarı (-1) ya da aşağı (+1). Uçtaki ve bilinmeyen öğe listeyi değiştirmez. */
export function moveBy(ids: string[], id: string, delta: -1 | 1): string[] {
  const i = ids.indexOf(id);
  if (i < 0) return ids;
  return placeAt(ids, id, i + 1 + delta);
}

/**
 * Sürükle-bırakın gönderdiği sıra mevcut listeyle aynı kümede mi?
 *
 * Değilse liste bu arada başka bir sekmede değişmiş demektir: eksik kimlik bir
 * öğeyi sırasız bırakır, yabancı kimlik olmayan bir dokümana yazmaya kalkar.
 */
export function sameMembers(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const set = new Set(a);
  return set.size === a.length && new Set(b).size === b.length && b.every((x) => set.has(x));
}
```

- [ ] **Step 4: Geçtiğini gör**

Run: `npm run check:panel`
Expected: PASS, yeni 14 iddia ✓.

- [ ] **Step 5: Commit**

```bash
graphify update .
git add admin/ordering.ts scripts/check-panel.ts graphify-out/
git commit -m "feat(panel): vitrin sırası — yerleştir, taşı, sürükle-bırak kümesi"
```

---

### Task 4: Panel görselleri — `admin/photos.ts` genelleşiyor

**Files:**
- Modify: `admin/photos.ts`
- Test: `scripts/check-panel.ts`

**Interfaces:**
- Produces: `type PhotoFolder = 'events' | 'sponsors' | 'slides'`,
  `uploadPhoto(folder: PhotoFolder, ownerId: string, input: Buffer): Promise<string>`,
  `deleteFolder(folder: PhotoFolder, ownerId: string): Promise<void>`,
  `pathFromUrl(url: string): string | null` (artık export).
  `uploadEventPhoto` ve `deleteEventPhotos` adlarıyla kalıyor
  (`check:release` "yükleme yetim dosya bırakmıyor" onları arıyor).

- [ ] **Step 1: Failing iddiaları yaz**

`scripts/check-panel.ts` → `import { isBucketMissing, keyProblem } from '../admin/photos';`
satırını `import { isBucketMissing, keyProblem, pathFromUrl } from '../admin/photos';`
yap. Task 3 bloğunun altına:

```ts
// ------------------------------------------------------------- vitrin görselleri
// Silme yalnız panelin yazdığı klasörlere dokunuyor; sponsor logosu ve slayt
// görseli de o listede olmalı, yoksa silinen öğenin dosyası bucket'ta kalır.
{
  const bucket = process.env.SUPABASE_STORAGE_BUCKET || 'event-photos';
  const u = (p: string) => `https://ref.supabase.co/storage/v1/object/public/${bucket}/${p}`;
  assert('sponsor logosu silinebilir yol', pathFromUrl(u('sponsors/s1/a.png')) === 'sponsors/s1/a.png');
  assert('slayt görseli silinebilir yol', pathFromUrl(u('slides/x/b.jpg')) === 'slides/x/b.jpg');
  assert('etkinlik görseli hâlâ silinebilir', pathFromUrl(u('events/e/c.jpg')) === 'events/e/c.jpg');
  assert('panelin olmayan klasörü silinemez', pathFromUrl(u('baska/d.jpg')) === null);
  assert('başka bucket silinemez', pathFromUrl('https://ref.supabase.co/storage/v1/object/public/diger/events/e/c.jpg') === null);
}
```

- [ ] **Step 2: Düştüğünü gör**

Run: `npm run check:panel`
Expected: FAIL — `pathFromUrl` export edilmiyor (tsx: "does not provide an
export named 'pathFromUrl'").

- [ ] **Step 3: Genelleştir**

`admin/photos.ts`:
- `objectPath` fonksiyonunu ve `uploadEventPhoto` gövdesini şununla değiştir:

```ts
/**
 * Panelin yazdığı klasörler. Silme yalnız bunlara dokunuyor: bu panelden
 * çıkmamış bir dosya silinmez.
 */
const FOLDERS = ['events', 'sponsors', 'slides'] as const;
export type PhotoFolder = (typeof FOLDERS)[number];

/**
 * Klasör başına biçim. Logo en büyük 88 px çiziliyor ve çoğu şeffaf zeminli
 * PNG: JPEG'e çevirmek zemini siyaha boyardı. Slayt görseli etkinlik kapağı
 * gibi tam genişlikte, 1600 px yetiyor.
 */
const VARIANT: Record<PhotoFolder, { maxEdge: number; format: 'jpeg' | 'png' }> = {
  events: { maxEdge: MAX_EDGE, format: 'jpeg' },
  slides: { maxEdge: MAX_EDGE, format: 'jpeg' },
  sponsors: { maxEdge: 512, format: 'png' },
};

/**
 * Bir görseli küçültüp `folder/ownerId/` altına yükler ve herkese açık adresini
 * döndürür. Ad rastgele: aynı ada yazıp eskisini ezmiyoruz.
 *
 * Bucket public olduğu için adres kalıcı ve imzasız:
 * `https://<ref>.supabase.co/storage/v1/object/public/<bucket>/<yol>`
 */
export async function uploadPhoto(folder: PhotoFolder, ownerId: string, input: Buffer): Promise<string> {
  const bucket = storage();
  const { maxEdge, format } = VARIANT[folder];
  const path = `${folder}/${ownerId}/${randomBytes(8).toString('hex')}.${format === 'png' ? 'png' : 'jpg'}`;

  const image = sharp(input)
    .rotate() // EXIF yönü — telefon fotoğrafları yan yatmasın.
    .resize({ width: maxEdge, height: maxEdge, fit: 'inside', withoutEnlargement: true });
  const body = await (format === 'png'
    ? image.png()
    : image.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
  ).toBuffer();

  // supabase-js hata fırlatmıyor, `error` alanı döndürüyor. `throw` beklemek
  // sessizce başarılı sanmak olurdu.
  const { error } = await bucket.upload(path, body, {
    contentType: `image/${format}`,
    // Bir yıl: görseller değişmiyor, değişirse yeni bir ad alıyorlar.
    cacheControl: '31536000',
    upsert: false,
  });

  if (error) {
    if (isBucketMissing(error)) throw missingBucketMessage();
    throw new PhotoUploadError(`Görsel Supabase Storage'a yüklenemedi: ${error.message}`);
  }

  return bucket.getPublicUrl(path).data.publicUrl;
}

/** Etkinlik görseli — `check:release` bu adla arıyor. */
export function uploadEventPhoto(eventId: string, input: Buffer): Promise<string> {
  return uploadPhoto('events', eventId, input);
}
```

- `pathFromUrl`'i export et ve klasör denetimini genişlet:

```ts
/**
 * Adresten dosya yolunu geri çıkarır. Bizim üretmediğimiz bir adres için null.
 *
 * Silme yalnızca bizim yüklediklerimize dokunsun diye: panelin klasörlerinden
 * biriyle başlamayan bir yol bu panelden çıkmamıştır.
 */
export function pathFromUrl(url: string): string | null {
  const m = new RegExp(`/object/public/${bucketName()}/(.+)$`).exec(url);
  if (!m) return null;
  const path = decodeURIComponent(m[1].split('?')[0]);
  return FOLDERS.some((f) => path.startsWith(`${f}/`)) ? path : null;
}
```

- `deleteEventPhotos`'u `deleteFolder`'a genelleştir:

```ts
/** Bir öğe silinince klasöründeki her şey gider. Hata yutuluyor: kalan şey bir yetim dosya. */
export async function deleteFolder(folder: PhotoFolder, ownerId: string): Promise<void> {
  const dir = `${folder}/${ownerId}`;
  try {
    const bucket = storage();
    const { data, error } = await bucket.list(dir);
    if (error) {
      console.error(`[panel] ${dir} görselleri listelenemedi:`, error.message);
      return;
    }
    if (!data?.length) return;

    const { error: removeError } = await bucket.remove(data.map((f) => `${dir}/${f.name}`));
    if (removeError) console.error(`[panel] ${dir} görselleri silinemedi:`, removeError.message);
  } catch (err) {
    console.error(`[panel] ${dir} görselleri silinemedi:`, err);
  }
}

/** Etkinlik silinince altındaki her şey gider — `check:release` bu adla arıyor. */
export function deleteEventPhotos(eventId: string): Promise<void> {
  return deleteFolder('events', eventId);
}
```

- [ ] **Step 4: Geçtiğini gör**

Run: `npm run check:panel && npm run typecheck && npm run check:release`
Expected: PASS; "yükleme yetim dosya bırakmıyor" yeşil kalıyor.

- [ ] **Step 5: Commit**

```bash
graphify update .
git add admin/photos.ts scripts/check-panel.ts graphify-out/
git commit -m "feat(panel): görsel yükleme klasör başına — logo PNG 512 px, slayt JPEG 1600 px"
```

---

### Task 5: Panel görünümü — `admin/vitrinView.ts`, menü, CSS

**Files:**
- Create: `admin/vitrinView.ts`
- Modify: `admin/views.ts` (`STYLE` sonuna yeni sınıflar; `page()` menüsüne iki bağlantı)
- Test: `scripts/check-panel.ts`

**Interfaces:**
- Consumes: `esc`, `page` (`admin/views.ts`); `KICKERS` (Task 1);
  `MONTHS_LONG` (`src/eventSchema.ts`).
- Produces:
  - `type VitrinKind = 'slider' | 'sponsorlar'`
  - `type VitrinRow = { id: string; title: string; sub: string; image: string; active: boolean }`
  - `type ChoiceRow = { id: string; label: string; raffle?: boolean }`
  - `formatDay(day: string): string` → `"12 Ekim 2026"`
  - `vitrinList(kind: VitrinKind, rows: VitrinRow[]): string`
  - `slideForm(values, errors, opts: { editing: boolean; id?: string; positions: number; events: ChoiceRow[]; announcements: ChoiceRow[] | null }): string`
  - `sponsorForm(values, errors, opts: { editing: boolean; id?: string; positions: number; events: ChoiceRow[] }): string`
  - Form alan adları (Task 6 bunları okuyor): slayt → `title`, `meta`,
    `kicker`, `image` (dosya), `dropImage`, `targetType`, `eventId`,
    `announcementId`, `targetUrl`, `endsAt`, `position`, `active`; sponsor →
    `name`, `sector`, `description`, `url`, `logo` (dosya), `dropLogo`,
    `eventIds` (çoklu), `position`, `active`. Liste → `sirala` formunda `ids`,
    `tasi` formunda `yon` (`yukari` | `asagi`).

- [ ] **Step 1: Failing iddiaları yaz**

`scripts/check-panel.ts` içe aktarımlarına:
`import { formatDay, slideForm, sponsorForm, vitrinList } from '../admin/vitrinView';`

Task 4 bloğunun altına:

```ts
// ------------------------------------------------------------- vitrin sayfaları
{
  const liste = vitrinList('slider', [
    { id: 'x1', title: '<b>Hack</b>', sub: 'DUYURU · bağlantı', image: '', active: true },
    { id: 'x2', title: 'İki', sub: '', image: '', active: false },
  ]);
  assert('liste başlıkları kaçırıyor', liste.includes('&lt;b&gt;Hack&lt;/b&gt;') && !liste.includes('<b>Hack</b>'));
  assert('liste durumları yazıyor', liste.includes('Yayında') && liste.includes('Pasif'));
  assert('uçtaki taşıma düğmeleri kapalı (ilk ↑, son ↓)', (liste.match(/ disabled>/g) ?? []).length === 2);
  assert('sürükle-bırak betiği ve sıra formu sayfada', liste.includes('id="sirala"') && liste.includes("addEventListener('dragend'"));
  assert('boş liste betik taşımıyor', !vitrinList('sponsorlar', []).includes('<script>'));
  assert('menüde slider ve sponsorlar var', liste.includes('href="/slider"') && liste.includes('href="/sponsorlar"'));
  assert('tarih okunur yazılıyor', formatDay('2026-10-12') === '12 Ekim 2026');

  const yeni = slideForm(
    { title: 'A', targetType: 'url', targetUrl: 'https://ornek.com', position: 2, active: true },
    { target: 'Hedef seçin.' },
    { editing: false, positions: 3, events: [], announcements: null },
  );
  assert('slayt formu hatayı gösteriyor', yeni.includes('Hedef seçin.'));
  assert('slayt formunda seçilen sıra işaretli', yeni.includes('<option value="2" selected>2</option>'));
  assert('duyurular alınamayınca form bunu söylüyor', yeni.includes('Duyurular kulüp sitesinden alınamadı'));
  assert('yeni slayt formunda sil düğmesi yok', !yeni.includes('/sil"'));
  assert('bitiş tarihi tarih seçicisi', yeni.includes('<input type="date" name="endsAt"'));

  const sponsor = sponsorForm(
    { name: 'A', eventIds: ['e2'], position: 1, active: true },
    {},
    { editing: true, id: 's1', positions: 2, events: [{ id: 'e1', label: 'Bir' }, { id: 'e2', label: 'İki', raffle: true }] },
  );
  assert('sponsor formu seçili etkinliği işaretliyor', /value="e2" checked/.test(sponsor) && !/value="e1" checked/.test(sponsor));
  assert('sponsor formu çekilişi "Ödülü sağlayan" diye işaretliyor', sponsor.includes('Ödülü sağlayan'));
  assert('düzenleme formunda sil düğmesi var', sponsor.includes('action="/sponsorlar/s1/sil"'));
  assert('sil onayı enterpolasyon taşımıyor', !/onsubmit="return confirm\('\$\{/.test(sponsor));
}
```

- [ ] **Step 2: Düştüğünü gör**

Run: `npm run check:panel`
Expected: FAIL — `Cannot find module '../admin/vitrinView'`.

- [ ] **Step 3: CSS ve menü**

`admin/views.ts` → `page()` menüsünde `<a href="/raffles">Çekilişler</a>`
satırının altına:

```ts
         <a href="/slider">Slider</a>
         <a href="/sponsorlar">Sponsorlar</a>
```

`STYLE` sonuna (`.empty { … }` satırının altına):

```css
/* Vitrin: slider ve sponsor listeleri. Yalnız yeni sayfalar kullanıyor. */
.vlist { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
.vitem {
  display: flex; align-items: center; gap: 12px; background: var(--surface);
  border: 1px solid var(--border); border-radius: 12px; padding: 10px 12px;
  box-shadow: 0 4px 14px rgba(0,27,74,.06);
}
.vitem.dragging { opacity: .45; }
.handle { cursor: grab; color: var(--muted); font-size: 18px; user-select: none; }
.vno { font-weight: 800; color: var(--navy700); width: 20px; text-align: center; }
.vthumb {
  width: 96px; height: 54px; border-radius: 8px; object-fit: cover;
  background: var(--blue100); flex: none; display: block;
}
.vthumb.logo { width: 72px; object-fit: contain; background: var(--bg); }
.vbody { flex: 1; min-width: 0; }
.vbody strong { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.vmeta { color: var(--muted); font-size: 12.5px; }
.pill { font-size: 11.5px; font-weight: 700; border-radius: 999px; padding: 3px 10px; white-space: nowrap; }
.pill.on { background: #E8F5EC; color: #1E6B36; }
.pill.off { background: var(--blue100); color: var(--navy700); }
.vact { display: flex; gap: 6px; align-items: center; }
.vact form { margin: 0; }
.icon-btn {
  padding: 6px 10px; font-size: 13px; background: transparent; color: var(--navy700);
  border: 1.5px solid var(--border);
}
.icon-btn:disabled { opacity: .35; cursor: default; }
fieldset { border: 1.5px solid var(--border); border-radius: 10px; padding: 12px 14px 2px; margin: 0 0 16px; }
legend { font-weight: 700; font-size: 13.5px; padding: 0 6px; }
.radios { display: flex; gap: 18px; flex-wrap: wrap; margin: 0 0 12px; }
.radios label, .checks label { font-weight: 500; margin: 0; display: flex; gap: 8px; align-items: flex-start; }
.checks { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 8px 16px; margin-bottom: 12px; }
@media (max-width: 560px) {
  .vitem { flex-wrap: wrap; }
  .handle { display: none; }
  .vthumb { width: 72px; height: 40px; }
}
```

- [ ] **Step 4: Görünüm modülünü yaz**

`admin/vitrinView.ts`:

```ts
/**
 * Vitrin sayfaları — slider ve sponsor listeleri, formları.
 *
 * Kural `views.ts` ile aynı: kullanıcıdan gelen hiçbir metin `esc` olmadan
 * HTML'e girmez. Liste sayfasında panelin tek betiği var — sürükle-bırak. Onsuz
 * da her şey çalışıyor: ↑/↓ düğmeleri betiksiz küçük formlar (iPhone'da
 * tarayıcının sürükle-bırakı güvenilir değil).
 */
import { MONTHS_LONG } from '../src/eventSchema';
import { KICKERS } from '../src/vitrinSchema';
import { esc, page } from './views';

export type VitrinKind = 'slider' | 'sponsorlar';
export type VitrinRow = { id: string; title: string; sub: string; image: string; active: boolean };
export type ChoiceRow = { id: string; label: string; raffle?: boolean };

const COPY: Record<VitrinKind, { title: string; add: string; hint: string; empty: string; logo: boolean }> = {
  slider: {
    title: 'Slider',
    add: 'Yeni slayt',
    hint:
      'Uygulamada ana sayfanın en üstünde bu sırayla döner. Sürükleyip bırakarak ya da ' +
      '↑ ↓ ile sıralayın. Bitiş tarihi olan slayt o gün bitince silinir; olmayan kalıcıdır.',
    empty: 'Henüz slayt yok. Uygulamada slider, slayt eklenene kadar görünmez.',
    logo: false,
  },
  sponsorlar: {
    title: 'Sponsorlar',
    add: 'Yeni sponsor',
    hint:
      'Uygulamada ana sayfada ve Sponsorlarımız ekranında bu sırayla görünür. ' +
      'Büyük sponsorları üste alın.',
    empty: 'Henüz sponsor yok. Uygulamada Sponsorlarımız bölümü, sponsor eklenene kadar görünmez.',
    logo: true,
  },
};

/** `2026-10-12` → `12 Ekim 2026`. */
export function formatDay(day: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day);
  return m ? `${Number(m[3])} ${MONTHS_LONG[Number(m[2]) - 1]} ${m[1]}` : day;
}

/**
 * Sürükle-bırak. Bırakınca sıra değiştiyse gizli formu gönderiyor; sunucu
 * gönderilen kümeyi mevcut listeyle karşılaştırıp 1…n yazıyor.
 * Şablon dizesinin içinde: ters tırnak ve dolar-süslü parantez kullanılmıyor.
 */
const DRAG_SCRIPT = `
(function () {
  var list = document.querySelector('.vlist');
  var form = document.getElementById('sirala');
  if (!list || !form) return;
  var dragged = null;
  var before = '';
  function order() {
    return Array.prototype.map.call(list.querySelectorAll('.vitem'), function (li) {
      return li.getAttribute('data-id');
    }).join(',');
  }
  list.addEventListener('dragstart', function (e) {
    dragged = e.target.closest('.vitem');
    if (!dragged) return;
    before = order();
    dragged.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', dragged.getAttribute('data-id'));
  });
  list.addEventListener('dragover', function (e) {
    var over = e.target.closest('.vitem');
    if (!dragged || !over || over === dragged) return;
    e.preventDefault();
    var box = over.getBoundingClientRect();
    list.insertBefore(dragged, e.clientY > box.top + box.height / 2 ? over.nextSibling : over);
  });
  list.addEventListener('dragend', function () {
    if (!dragged) return;
    dragged.classList.remove('dragging');
    dragged = null;
    var now = order();
    if (now === before) return;
    form.elements.ids.value = now;
    form.submit();
  });
})();
`;

function moveForm(base: string, id: string, yon: 'yukari' | 'asagi', disabled: boolean): string {
  return `<form method="post" action="${base}/${encodeURIComponent(id)}/tasi">
      <input type="hidden" name="yon" value="${yon}">
      <button class="icon-btn" type="submit" aria-label="${yon === 'yukari' ? 'Yukarı taşı' : 'Aşağı taşı'}"${disabled ? ' disabled' : ''}>${yon === 'yukari' ? '↑' : '↓'}</button>
    </form>`;
}

export function vitrinList(kind: VitrinKind, rows: VitrinRow[]): string {
  const c = COPY[kind];
  const base = `/${kind}`;
  const thumb = c.logo ? 'vthumb logo' : 'vthumb';

  const items = rows
    .map(
      (r, i) => `<li class="vitem" draggable="true" data-id="${esc(r.id)}">
        <span class="handle" aria-hidden="true">⠿</span>
        <span class="vno">${i + 1}</span>
        ${r.image ? `<img class="${thumb}" src="${esc(r.image)}" alt="">` : `<span class="${thumb}"></span>`}
        <div class="vbody">
          <strong>${esc(r.title)}</strong>
          <span class="vmeta">${esc(r.sub)}</span>
        </div>
        <span class="pill ${r.active ? 'on' : 'off'}">${r.active ? 'Yayında' : 'Pasif'}</span>
        <div class="vact">
          ${moveForm(base, r.id, 'yukari', i === 0)}
          ${moveForm(base, r.id, 'asagi', i === rows.length - 1)}
          <a class="btn btn-ghost icon-btn" href="${base}/${encodeURIComponent(r.id)}">Düzenle</a>
        </div>
      </li>`,
    )
    .join('');

  return page(
    c.title,
    `<div class="card">
       <div style="display:flex;align-items:center;margin-bottom:12px">
         <h2 style="margin:0">${c.title}</h2>
         <a class="btn" style="margin-left:auto" href="${base}/yeni">+ ${c.add}</a>
       </div>
       <p class="hint" style="margin-top:0">${c.hint}</p>
       ${
         rows.length
           ? `<ul class="vlist">${items}</ul>
              <form id="sirala" method="post" action="${base}/sirala"><input type="hidden" name="ids" value=""></form>
              <script>${DRAG_SCRIPT}</script>`
           : `<p class="empty">${c.empty}</p>`
       }
     </div>`,
  );
}

function positionOptions(count: number, current: number): string {
  return Array.from({ length: count }, (_, i) => i + 1)
    .map((p) => `<option value="${p}"${p === current ? ' selected' : ''}>${p}</option>`)
    .join('');
}

function choiceOptions(list: ChoiceRow[], current: string): string {
  return [
    '<option value="">Seçin…</option>',
    ...list.map(
      (c) => `<option value="${esc(c.id)}"${c.id === current ? ' selected' : ''}>${esc(c.label)}</option>`,
    ),
  ].join('');
}

/** Onay metni sabit: `onsubmit` içinde enterpolasyon yok, `esc()` orada koruma sağlamıyor. */
function deleteForm(action: string): string {
  return `<form method="post" action="${action}" onsubmit="return confirm('Silinsin mi? Görseli de silinir, geri alınamaz.')" style="margin-top:14px">
      <button class="btn-danger" type="submit">Sil</button>
    </form>`;
}

/** Mevcut görselin önizlemesi ve kaldırma kutusu. Sunucu mevcut görseli dokümandan okuyor. */
function imageBlock(url: unknown, drop: 'dropImage' | 'dropLogo', label: string): string {
  if (!url) return '';
  return `<div class="photos"><div class="photo">
      <img src="${esc(url)}" alt="">
      <label class="photo-drop"><input type="checkbox" name="${drop}" value="1" style="width:auto"> ${label}</label>
    </div></div>`;
}

export function slideForm(
  values: Record<string, unknown>,
  errors: Record<string, string>,
  opts: { editing: boolean; id?: string; positions: number; events: ChoiceRow[]; announcements: ChoiceRow[] | null },
): string {
  const v = (k: string) => esc(values[k] ?? '');
  const e = (k: string) => (errors[k] ? `<div class="err">${esc(errors[k])}</div>` : '');
  const type = String(values.targetType || 'event');
  const title = opts.editing ? 'Slaytı düzenle' : 'Yeni slayt';
  const action = opts.editing ? `/slider/${encodeURIComponent(opts.id ?? '')}` : '/slider/yeni';
  const radio = (value: string, label: string) =>
    `<label><input type="radio" name="targetType" value="${value}"${type === value ? ' checked' : ''} style="width:auto"> ${label}</label>`;

  return page(
    title,
    `<div class="card">
      <h2>${title}</h2>
      ${Object.keys(errors).length ? '<div class="banner">Form kaydedilmedi — aşağıdaki alanları düzeltin.</div>' : ''}
      <form method="post" action="${action}" enctype="multipart/form-data">
        <label>Başlık
          <input type="text" name="title" value="${v('title')}" placeholder="Hackathon kayıtları açıldı" required>
          ${e('title')}
        </label>
        <div class="row">
          <label>Alt satır <span class="hint">(tarih, yer gibi kısa bilgi)</span>
            <input type="text" name="meta" value="${v('meta')}" placeholder="48 saat · 12 Ekim · B Blok">
          </label>
          <label>Rozet
            <select name="kicker">${['', ...KICKERS]
              .map((k) => `<option value="${k}"${k === String(values.kicker ?? '') ? ' selected' : ''}>${k || 'Rozet yok'}</option>`)
              .join('')}</select>
            ${e('kicker')}
          </label>
        </div>

        <label>Görsel <span class="hint">(1600 px'e küçültülüp JPEG'e çevrilir)</span>
          <input type="file" name="image" accept="image/*">
        </label>
        ${e('image')}
        ${imageBlock(values.image, 'dropImage', 'Görseli kaldır')}

        <fieldset>
          <legend>Dokununca açılacak yer</legend>
          <div class="radios">${radio('event', 'Etkinlik')}${radio('announcement', 'Duyuru')}${radio('url', 'Bağlantı')}</div>
          <label>Etkinlik
            <select name="eventId">${choiceOptions(opts.events, String(values.eventId ?? ''))}</select>
          </label>
          ${
            opts.announcements
              ? `<label>Duyuru
                   <select name="announcementId">${choiceOptions(opts.announcements, String(values.announcementId ?? ''))}</select>
                 </label>`
              : `<p class="hint">Duyurular kulüp sitesinden alınamadı; şu an duyuru seçilemiyor.</p>
                 <input type="hidden" name="announcementId" value="${v('announcementId')}">`
          }
          <label>Bağlantı
            <input type="url" name="targetUrl" value="${v('targetUrl')}" placeholder="https://">
          </label>
          ${e('target')}
        </fieldset>

        <div class="row">
          <label>Bitiş tarihi <span class="hint">(boş = kalıcı; doluysa o gün bitince silinir)</span>
            <input type="date" name="endsAt" value="${v('endsAt')}">
            ${e('endsAt')}
          </label>
          <label>Sıra <span class="hint">(seçilen yere yerleşir, diğerleri kayar)</span>
            <select name="position">${positionOptions(opts.positions, Number(values.position))}</select>
            ${e('order')}
          </label>
        </div>

        <label style="display:flex;gap:8px;align-items:center">
          <input type="checkbox" name="active" value="1"${values.active ? ' checked' : ''} style="width:auto"> Yayında
        </label>

        <div class="actions">
          <button type="submit">${opts.editing ? 'Kaydet' : 'Oluştur'}</button>
          <a class="btn btn-ghost" href="/slider">Vazgeç</a>
        </div>
      </form>
      ${opts.editing ? deleteForm(`/slider/${encodeURIComponent(opts.id ?? '')}/sil`) : ''}
    </div>`,
  );
}

export function sponsorForm(
  values: Record<string, unknown>,
  errors: Record<string, string>,
  opts: { editing: boolean; id?: string; positions: number; events: ChoiceRow[] },
): string {
  const v = (k: string) => esc(values[k] ?? '');
  const e = (k: string) => (errors[k] ? `<div class="err">${esc(errors[k])}</div>` : '');
  const title = opts.editing ? 'Sponsoru düzenle' : 'Yeni sponsor';
  const action = opts.editing ? `/sponsorlar/${encodeURIComponent(opts.id ?? '')}` : '/sponsorlar/yeni';
  const selected = new Set(Array.isArray(values.eventIds) ? values.eventIds.map(String) : []);

  return page(
    title,
    `<div class="card">
      <h2>${title}</h2>
      ${Object.keys(errors).length ? '<div class="banner">Form kaydedilmedi — aşağıdaki alanları düzeltin.</div>' : ''}
      <form method="post" action="${action}" enctype="multipart/form-data">
        <div class="row">
          <label>Ad
            <input type="text" name="name" value="${v('name')}" placeholder="Örnek Yazılım A.Ş." required>
            ${e('name')}
          </label>
          <label>Sektör
            <input type="text" name="sector" value="${v('sector')}" placeholder="Yazılım">
          </label>
        </div>
        <label>Tanıtım
          <textarea name="description">${v('description')}</textarea>
        </label>
        <label>Web sitesi
          <input type="url" name="url" value="${v('url')}" placeholder="https://">
          ${e('url')}
        </label>

        <label>Logo <span class="hint">(PNG önerilir — şeffaf zemin korunur, 512 px'e küçültülür)</span>
          <input type="file" name="logo" accept="image/*">
        </label>
        ${e('logo')}
        ${imageBlock(values.logo, 'dropLogo', 'Logoyu kaldır')}

        <fieldset>
          <legend>Desteklediği etkinlikler</legend>
          ${
            opts.events.length
              ? `<div class="checks">${opts.events
                  .map(
                    (c) => `<label><input type="checkbox" name="eventIds" value="${esc(c.id)}"${selected.has(c.id) ? ' checked' : ''} style="width:auto">
                      <span>${esc(c.label)}${c.raffle ? ' <span class="hint">— çekiliş: uygulamada “Ödülü sağlayan” olarak görünür</span>' : ''}</span></label>`,
                  )
                  .join('')}</div>`
              : '<p class="hint">Henüz etkinlik yok.</p>'
          }
        </fieldset>

        <div class="row">
          <label>Sıra <span class="hint">(seçilen yere yerleşir, diğerleri kayar)</span>
            <select name="position">${positionOptions(opts.positions, Number(values.position))}</select>
            ${e('order')}
          </label>
          <label style="display:flex;gap:8px;align-items:center;flex:0 0 auto">
            <input type="checkbox" name="active" value="1"${values.active ? ' checked' : ''} style="width:auto"> Yayında
          </label>
        </div>

        <div class="actions">
          <button type="submit">${opts.editing ? 'Kaydet' : 'Oluştur'}</button>
          <a class="btn btn-ghost" href="/sponsorlar">Vazgeç</a>
        </div>
      </form>
      ${opts.editing ? deleteForm(`/sponsorlar/${encodeURIComponent(opts.id ?? '')}/sil`) : ''}
    </div>`,
  );
}
```

- [ ] **Step 5: Geçtiğini gör**

Run: `npm run check:panel && npm run typecheck`
Expected: PASS; vitrin sayfası iddiaları ✓. `check:release`'in
"panel 502/504 dönmüyor" kontrolü `admin/vitrinView.ts`'i de tarıyor:
`npm run check:release` yeşil.

- [ ] **Step 6: Commit**

```bash
graphify update .
git add admin/vitrinView.ts admin/views.ts scripts/check-panel.ts graphify-out/
git commit -m "feat(panel): slider ve sponsor sayfaları — sürükle-bırak liste, formlar, menü"
```

---

### Task 6: Panel rotaları ve zamanlayıcı — `admin/vitrin.ts`

**Files:**
- Create: `admin/vitrin.ts`
- Modify: `admin/server.ts` (`app.use(requireAuth);` satırının altı; `app.listen`
  içinde `startDeletionSweeper(db);` satırının altı)
- Modify: `scripts/check-release.mjs` (yeni kontrol, "panel 502/504 dönmüyor"dan önce)

**Interfaces:**
- Consumes: Task 1 (`buildSlide`, `buildSponsor`, `byOrder`, `isOrder`,
  `expiredSlideIds`, `SlideTarget`), Task 3 (`placeAt`, `moveBy`,
  `sameMembers`), Task 4 (`uploadPhoto`, `deleteFolder`, `deletePhotos`,
  `PhotoUploadError`, `MAX_UPLOAD_BYTES`), Task 5 (`vitrinList`, `slideForm`,
  `sponsorForm`, `formatDay`, `ChoiceRow`, `VitrinRow`), `fetchAnnouncements`,
  `splitByDate`, `todayLocal`, `isPast`.
- Produces: `registerVitrin(app: Express, db: Firestore, upload: multer.Multer): void`,
  `runSlideSweep(db: Firestore, today: string): Promise<string[]>`,
  `startSlideSweeper(db: Firestore): void`.

- [ ] **Step 1: `check:release` kontrolünü yaz (önce)**

`scripts/check-release.mjs` → `check('panel 502/504 dönmüyor', …)` çağrısının
hemen üstüne:

```js
check(
  'vitrin paneli bağlı ve yetim dosya bırakmıyor',
  'Slayt ve sponsor sayfaları panelin giriş duvarının arkasında olmalı; önüne ' +
    'düşerlerse kulübün ana sayfasını herkes değiştirebilir. Süresi dolan slaytı ' +
    'silen zamanlayıcı başlamazsa bitiş tarihi uygulamada çalışır ama slayt ' +
    'veritabanında ve görseli bucket’ta sonsuza kadar kalır — ikisi de sessiz.',
  () => {
    const strip = (src) => src.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    if (!existsSync(join(root, 'admin/vitrin.ts'))) return 'admin/vitrin.ts yok';
    const server = strip(read('admin/server.ts'));
    const guard = server.indexOf('app.use(requireAuth)');
    const at = server.indexOf('registerVitrin(app');
    if (at < 0) return 'admin/server.ts vitrin rotalarını kurmuyor';
    if (guard < 0 || at < guard) return 'vitrin rotaları requireAuth’tan ÖNCE kurulmuş — giriş istemez';
    if (!/startSlideSweeper\(db\)/.test(server)) return 'süresi dolan slaytları silen zamanlayıcı başlamıyor';

    const vitrin = strip(read('admin/vitrin.ts'));
    if (!/deleteFolder\(kind\.col, /.test(vitrin)) return 'silinen öğenin görsel klasörü silinmiyor';
    if (!/deleteFolder\('slides', /.test(vitrin)) return 'zamanlayıcı sildiği slaytın görselini bırakıyor';
    if (!/deletePhotos\(\[uploaded\]\)/.test(vitrin)) return 'kayıt düşünce yüklenen görsel geri alınmıyor';
    return null;
  },
);
```

- [ ] **Step 2: Kontrolün düştüğünü gör**

Run: `npm run check:release`
Expected: FAIL — "vitrin paneli bağlı…: admin/vitrin.ts yok".

- [ ] **Step 3: Rotaları ve zamanlayıcıyı yaz**

`admin/vitrin.ts`:

```ts
/**
 * Vitrin — ana sayfanın slider'ı ve sponsorlar, panel tarafı.
 *
 * İki koleksiyon aynı iş akışını paylaşıyor: sıralı liste, form, görsel, silme.
 * Sıra 1…n ve boşluksuz, her değişiklik listenin tamamını yeniden numaralıyor
 * (`ordering.ts`). Doğrulama uygulamanın okumasıyla aynı modülden
 * (`src/vitrinSchema.ts`): panelin kaydettiğini uygulama okuyabilmeli.
 *
 * Rotalar `app.use(requireAuth)`'tan SONRA kuruluyor; `check:release` tutuyor.
 * Kaydetme sırası etkinlik formuyla aynı: doğrula → yükle → yaz → eski görseli
 * sil. Ters olsaydı geçersiz formda dosya Storage'a gider, yetim kalırdı.
 */
import type { Express, NextFunction, Request, Response } from 'express';
import type { Firestore, QueryDocumentSnapshot, WriteBatch } from 'firebase-admin/firestore';
import type multer from 'multer';

import { fetchAnnouncements } from '../src/announcementApi';
import type { ClubEvent } from '../src/data';
import { splitByDate, todayLocal } from '../src/eventSchema';
import {
  buildSlide,
  buildSponsor,
  byOrder,
  expiredSlideIds,
  isOrder,
  type SlideTarget,
} from '../src/vitrinSchema';
import { moveBy, placeAt, sameMembers } from './ordering';
import { MAX_UPLOAD_BYTES, PhotoUploadError, deleteFolder, deletePhotos, uploadPhoto } from './photos';
import { esc, page } from './views';
import { formatDay, slideForm, sponsorForm, vitrinList, type ChoiceRow } from './vitrinView';

type Kind = { base: '/slider' | '/sponsorlar'; col: 'slides' | 'sponsors' };
const SLIDER: Kind = { base: '/slider', col: 'slides' };
const SPONSORS: Kind = { base: '/sponsorlar', col: 'sponsors' };

/** Saatte bir. Bitiş tarihi gün sınırında, uygulama da kendi süzmesini yapıyor. */
const SWEEP_MS = 60 * 60_000;

const today = () => todayLocal(new Date());

/** Formdan gelen tekil ya da çoklu alan → dizi. */
function list(v: unknown): string[] {
  return (Array.isArray(v) ? v : v === undefined ? [] : [v]).map(String).filter(Boolean);
}

/** Dokümanlar sırasıyla. Sırası bozuk olanlar (Console'dan elle girilmiş) sona. */
async function orderedDocs(db: Firestore, col: string): Promise<QueryDocumentSnapshot[]> {
  const snap = await db.collection(col).get();
  const key = (d: QueryDocumentSnapshot) => {
    const order = d.get('order');
    return { id: d.id, order: isOrder(order) ? order : Number.MAX_SAFE_INTEGER };
  };
  return [...snap.docs].sort((a, b) => byOrder(key(a), key(b)));
}

/** `ids` sırasını 1…n yazar. `skip` aynı batch'te ayrıca `set` edilen doküman. */
function renumber(db: Firestore, batch: WriteBatch, col: string, ids: string[], skip?: string): void {
  ids.forEach((id, i) => {
    if (id !== skip) batch.update(db.collection(col).doc(id), { order: i + 1 });
  });
}

/** Tek görsel alanı. Hata olursa ne olduğunu söyleyen bir sayfa; form yeniden çizilmiyor. */
function oneImage(upload: multer.Multer, field: string, back: string) {
  return (req: Request, res: Response, next: NextFunction) =>
    upload.single(field)(req, res, (err: unknown) => {
      if (!err) return next();
      const code = (err as { code?: string }).code;
      const message =
        code === 'LIMIT_FILE_SIZE'
          ? `Görsel çok büyük — en fazla ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)} MB.`
          : err instanceof Error
            ? err.message
            : 'Görsel yüklenemedi.';
      console.error('[panel] vitrin görseli reddedildi:', err);
      res
        .status(400)
        .type('html')
        .send(
          page(
            'Görsel yüklenemedi',
            `<div class="card">
               <div class="banner">${esc(message)}</div>
               <p class="hint">Formdaki diğer bilgiler kaydedilmedi.</p>
               <div class="actions"><a class="btn btn-ghost" href="${back}">Geri dön</a></div>
             </div>`,
          ),
        );
    });
}

/** Etkinlik seçenekleri: önce yaklaşanlar, sonra geçmişler; çekilişler işaretli. */
async function eventChoices(db: Firestore): Promise<ChoiceRow[]> {
  const [events, raffles] = await Promise.all([
    db.collection('events').get(),
    db.collection('raffles').get(),
  ]);
  const raffleIds = new Set(raffles.docs.map((d) => d.id));
  const all = events.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ClubEvent, 'id'>) }) as ClubEvent);
  const { upcoming, past } = splitByDate(all, today());
  return [
    ...upcoming.map((e) => ({ id: e.id, label: `${e.title} · ${e.day} ${e.mon}`, raffle: raffleIds.has(e.id) })),
    ...past.map((e) => ({ id: e.id, label: `${e.title} · ${e.day} ${e.mon} (geçmiş)`, raffle: raffleIds.has(e.id) })),
  ];
}

/** Duyuru seçenekleri kulüp sitesinden. Site yanıt vermezse null: form bunu söylüyor. */
async function announcementChoices(): Promise<ChoiceRow[] | null> {
  try {
    return (await fetchAnnouncements()).map((a) => ({ id: a.id, label: a.title }));
  } catch (err) {
    console.error('[panel] duyurular alınamadı:', err);
    return null;
  }
}

function targetLabel(target: SlideTarget | undefined, titles: Map<string, string>): string {
  if (!target) return 'hedef yok';
  if (target.type === 'event') return `etkinlik: ${titles.get(target.id) ?? target.id}`;
  if (target.type === 'announcement') return 'duyuru';
  return 'bağlantı';
}

const notFound = (what: string) =>
  page('Bulunamadı', `<div class="card">${esc(what)} bulunamadı.</div>`);

/** Süresi dolan slaytları ve görsellerini siler, kalanları 1…n numaralar. */
export async function runSlideSweep(db: Firestore, day: string): Promise<string[]> {
  const docs = await orderedDocs(db, 'slides');
  const expired = expiredSlideIds(docs.map((d) => ({ id: d.id, endsAt: d.get('endsAt') })), day);
  if (!expired.length) return [];

  const gone = new Set(expired);
  const batch = db.batch();
  for (const id of expired) batch.delete(db.collection('slides').doc(id));
  renumber(db, batch, 'slides', docs.map((d) => d.id).filter((id) => !gone.has(id)));
  await batch.commit();
  // Kayıttan sonra: silme düşseydi görseli olmayan bir slayt kalırdı.
  await Promise.all(expired.map((id) => deleteFolder('slides', id)));
  console.log(`[vitrin] süresi dolan ${expired.length} slayt silindi.`);
  return expired;
}

/** Panelin dördüncü yoklayıcısı: açılışta bir kez, sonra saatte bir. */
export function startSlideSweeper(db: Firestore): void {
  const tick = () => {
    runSlideSweep(db, today()).catch((err) => console.error('[vitrin] slayt temizliği başarısız:', err));
  };
  tick();
  // Tipler DOM'un `setInterval`'ını görüyor; çalışma zamanı Node ve `unref` orada var.
  (setInterval(tick, SWEEP_MS) as unknown as { unref?: () => void }).unref?.();
}

export function registerVitrin(app: Express, db: Firestore, upload: multer.Multer): void {
  // Statik yollar `:id`'den ÖNCE: yoksa "sirala" ve "yeni" birer kimlik sanılırdı.
  for (const kind of [SLIDER, SPONSORS]) {
    app.post(`${kind.base}/sirala`, async (req, res) => {
      const posted = String(req.body.ids ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const current = (await orderedDocs(db, kind.col)).map((d) => d.id);
      if (!sameMembers(current, posted)) {
        res
          .status(409)
          .type('html')
          .send(
            page(
              'Sıra kaydedilmedi',
              `<div class="card">
                 <div class="banner">Liste bu arada değişmiş; sıra kaydedilmedi. Sayfayı yenileyip tekrar deneyin.</div>
                 <a class="btn btn-ghost" href="${kind.base}">Listeye dön</a>
               </div>`,
            ),
          );
        return;
      }
      const batch = db.batch();
      renumber(db, batch, kind.col, posted);
      await batch.commit();
      res.redirect(kind.base);
    });
  }

  // ---------------------------------------------------------------- slider

  app.get('/slider', async (_req, res) => {
    const [docs, events] = await Promise.all([orderedDocs(db, 'slides'), db.collection('events').get()]);
    const titles = new Map(events.docs.map((d) => [d.id, String(d.get('title') ?? d.id)]));
    const rows = docs.map((d) => {
      const endsAt = String(d.get('endsAt') ?? '');
      return {
        id: d.id,
        title: String(d.get('title') ?? ''),
        sub: [
          String(d.get('kicker') ?? ''),
          targetLabel(d.get('target') as SlideTarget | undefined, titles),
          endsAt ? `bitiş ${formatDay(endsAt)}` : 'kalıcı',
        ]
          .filter(Boolean)
          .join(' · '),
        image: String(d.get('image') ?? ''),
        active: d.get('active') === true,
      };
    });
    res.type('html').send(vitrinList('slider', rows));
  });

  const slideOpts = async (positions: number, editing: boolean, id?: string) => ({
    editing,
    id,
    positions,
    events: await eventChoices(db),
    announcements: await announcementChoices(),
  });

  app.get('/slider/yeni', async (_req, res) => {
    const docs = await orderedDocs(db, 'slides');
    res
      .type('html')
      .send(slideForm({ position: 1, active: true, targetType: 'event' }, {}, await slideOpts(docs.length + 1, false)));
  });

  async function saveSlide(req: Request, res: Response, editingId: string | null): Promise<void> {
    const docs = await orderedDocs(db, 'slides');
    const existing = editingId ? docs.find((d) => d.id === editingId) : undefined;
    if (editingId && !existing) {
      res.status(404).type('html').send(notFound('Slayt'));
      return;
    }
    const ref = existing ? existing.ref : db.collection('slides').doc();
    const body = req.body as Record<string, unknown>;
    const before = String(existing?.get('image') ?? '');
    const kept = body.dropImage ? '' : before;
    const position = Number(body.position);
    const targetType = String(body.targetType ?? '');
    const values = { ...body, image: kept, position, active: body.active === '1' };
    const opts = () => slideOpts(editingId ? docs.length : docs.length + 1, !!editingId, editingId ?? undefined);

    const checked = buildSlide(
      {
        title: body.title,
        meta: body.meta,
        image: kept,
        kicker: body.kicker,
        targetType,
        targetId: targetType === 'announcement' ? body.announcementId : body.eventId,
        targetUrl: body.targetUrl,
        endsAt: body.endsAt,
        order: position,
        active: body.active === '1',
      },
      today(),
    );
    if (!checked.ok) {
      res.status(400).type('html').send(slideForm(values, checked.errors, await opts()));
      return;
    }

    let uploaded = '';
    if (req.file) {
      try {
        uploaded = await uploadPhoto('slides', ref.id, req.file.buffer);
      } catch (err) {
        if (!(err instanceof PhotoUploadError)) throw err;
        console.error('[panel] slayt görseli yüklenemedi:', err.message);
        // 502 DEĞİL: Cloudflare 502/504 gövdesini yutuyor.
        res.status(503).type('html').send(slideForm(values, { image: err.message }, await opts()));
        return;
      }
    }

    const slide = { ...checked.value, image: uploaded || checked.value.image };
    const ids = placeAt(docs.map((d) => d.id), ref.id, position);
    const batch = db.batch();
    batch.set(ref, { ...slide, order: ids.indexOf(ref.id) + 1 });
    renumber(db, batch, 'slides', ids, ref.id);
    try {
      await batch.commit();
    } catch (err) {
      if (uploaded) await deletePhotos([uploaded]);
      throw err;
    }
    if (before && before !== slide.image) await deletePhotos([before]);
    res.redirect('/slider');
  }

  app.post('/slider/yeni', oneImage(upload, 'image', '/slider'), (req, res) => saveSlide(req, res, null));

  app.get('/slider/:id', async (req, res) => {
    const docs = await orderedDocs(db, 'slides');
    const i = docs.findIndex((d) => d.id === req.params.id);
    if (i < 0) return res.status(404).type('html').send(notFound('Slayt'));
    const d = docs[i];
    const target = (d.get('target') ?? {}) as Partial<{ type: string; id: string; url: string }>;
    res.type('html').send(
      slideForm(
        {
          title: d.get('title'),
          meta: d.get('meta'),
          kicker: d.get('kicker'),
          image: d.get('image'),
          targetType: target.type ?? 'event',
          eventId: target.type === 'event' ? target.id : '',
          announcementId: target.type === 'announcement' ? target.id : '',
          targetUrl: target.type === 'url' ? target.url : '',
          endsAt: d.get('endsAt'),
          position: i + 1,
          active: d.get('active') === true,
        },
        {},
        await slideOpts(docs.length, true, d.id),
      ),
    );
  });

  app.post('/slider/:id', oneImage(upload, 'image', '/slider'), (req, res) =>
    saveSlide(req, res, String(req.params.id)),
  );

  // ------------------------------------------------------------- sponsorlar

  app.get('/sponsorlar', async (_req, res) => {
    const docs = await orderedDocs(db, 'sponsors');
    const rows = docs.map((d) => {
      const events = Array.isArray(d.get('eventIds')) ? (d.get('eventIds') as unknown[]).length : 0;
      return {
        id: d.id,
        title: String(d.get('name') ?? ''),
        sub: [String(d.get('sector') ?? ''), events ? `${events} etkinlik` : ''].filter(Boolean).join(' · '),
        image: String(d.get('logo') ?? ''),
        active: d.get('active') === true,
      };
    });
    res.type('html').send(vitrinList('sponsorlar', rows));
  });

  const sponsorOpts = async (positions: number, editing: boolean, id?: string) => ({
    editing,
    id,
    positions,
    events: await eventChoices(db),
  });

  app.get('/sponsorlar/yeni', async (_req, res) => {
    const docs = await orderedDocs(db, 'sponsors');
    res
      .type('html')
      .send(sponsorForm({ position: docs.length + 1, active: true }, {}, await sponsorOpts(docs.length + 1, false)));
  });

  async function saveSponsor(req: Request, res: Response, editingId: string | null): Promise<void> {
    const docs = await orderedDocs(db, 'sponsors');
    const existing = editingId ? docs.find((d) => d.id === editingId) : undefined;
    if (editingId && !existing) {
      res.status(404).type('html').send(notFound('Sponsor'));
      return;
    }
    const ref = existing ? existing.ref : db.collection('sponsors').doc();
    const body = req.body as Record<string, unknown>;
    const before = String(existing?.get('logo') ?? '');
    const kept = body.dropLogo ? '' : before;
    const position = Number(body.position);
    const eventIds = list(body.eventIds);
    const values = { ...body, logo: kept, eventIds, position, active: body.active === '1' };
    const opts = () => sponsorOpts(editingId ? docs.length : docs.length + 1, !!editingId, editingId ?? undefined);

    const checked = buildSponsor({
      name: body.name,
      sector: body.sector,
      description: body.description,
      url: body.url,
      logo: kept,
      eventIds,
      order: position,
      active: body.active === '1',
    });
    if (!checked.ok) {
      res.status(400).type('html').send(sponsorForm(values, checked.errors, await opts()));
      return;
    }

    let uploaded = '';
    if (req.file) {
      try {
        uploaded = await uploadPhoto('sponsors', ref.id, req.file.buffer);
      } catch (err) {
        if (!(err instanceof PhotoUploadError)) throw err;
        console.error('[panel] sponsor logosu yüklenemedi:', err.message);
        res.status(503).type('html').send(sponsorForm(values, { logo: err.message }, await opts()));
        return;
      }
    }

    const sponsor = { ...checked.value, logo: uploaded || checked.value.logo };
    const ids = placeAt(docs.map((d) => d.id), ref.id, position);
    const batch = db.batch();
    batch.set(ref, { ...sponsor, order: ids.indexOf(ref.id) + 1 });
    renumber(db, batch, 'sponsors', ids, ref.id);
    try {
      await batch.commit();
    } catch (err) {
      if (uploaded) await deletePhotos([uploaded]);
      throw err;
    }
    if (before && before !== sponsor.logo) await deletePhotos([before]);
    res.redirect('/sponsorlar');
  }

  app.post('/sponsorlar/yeni', oneImage(upload, 'logo', '/sponsorlar'), (req, res) => saveSponsor(req, res, null));

  app.get('/sponsorlar/:id', async (req, res) => {
    const docs = await orderedDocs(db, 'sponsors');
    const i = docs.findIndex((d) => d.id === req.params.id);
    if (i < 0) return res.status(404).type('html').send(notFound('Sponsor'));
    const d = docs[i];
    res.type('html').send(
      sponsorForm(
        {
          name: d.get('name'),
          sector: d.get('sector'),
          description: d.get('description'),
          url: d.get('url'),
          logo: d.get('logo'),
          eventIds: Array.isArray(d.get('eventIds')) ? d.get('eventIds') : [],
          position: i + 1,
          active: d.get('active') === true,
        },
        {},
        await sponsorOpts(docs.length, true, d.id),
      ),
    );
  });

  app.post('/sponsorlar/:id', oneImage(upload, 'logo', '/sponsorlar'), (req, res) =>
    saveSponsor(req, res, String(req.params.id)),
  );

  // ------------------------------------------------------- ortak: taşı, sil

  for (const kind of [SLIDER, SPONSORS]) {
    app.post(`${kind.base}/:id/tasi`, async (req, res) => {
      const ids = (await orderedDocs(db, kind.col)).map((d) => d.id);
      const batch = db.batch();
      renumber(db, batch, kind.col, moveBy(ids, String(req.params.id), req.body.yon === 'yukari' ? -1 : 1));
      await batch.commit();
      res.redirect(kind.base);
    });

    app.post(`${kind.base}/:id/sil`, async (req, res) => {
      const id = String(req.params.id);
      const ids = (await orderedDocs(db, kind.col)).map((d) => d.id);
      if (!ids.includes(id)) return res.status(404).type('html').send(notFound('Kayıt'));
      const batch = db.batch();
      batch.delete(db.collection(kind.col).doc(id));
      renumber(db, batch, kind.col, ids.filter((x) => x !== id));
      await batch.commit();
      // Kayıttan sonra: silme düşseydi görseli olmayan bir kayıt kalırdı.
      await deleteFolder(kind.col, id);
      res.redirect(kind.base);
    });
  }
}
```

- [ ] **Step 4: Sunucuya bağla**

`admin/server.ts`:
- İçe aktarım (diğer `./` içe aktarımlarının yanına):
  `import { registerVitrin, startSlideSweeper } from './vitrin';`
- `app.use(requireAuth);` satırının hemen altına:

```ts
// Vitrin: slider ve sponsorlar. Giriş duvarının ARKASINDA — kulübün ana
// sayfasını değiştiren sayfalar (check:release tutuyor).
registerVitrin(app, db, upload);
```

- `app.listen` içinde `startDeletionSweeper(db);` satırının altına:

```ts
  // Süresi dolan slaytları ve görsellerini silen dördüncü yoklayıcı. Uygulama
  // bitiş tarihini kendisi de süzüyor; bu, veritabanını ve bucket'ı temizliyor.
  startSlideSweeper(db);
```

- [ ] **Step 5: Doğrula**

Run: `npm run typecheck && npm run check:release && npm run check:panel`
Expected: PASS; "vitrin paneli bağlı ve yetim dosya bırakmıyor" ✓.

Kırmızı sınaması (her biri ayrı, sonra geri al):
1. `registerVitrin(app, db, upload);` satırını `app.use(requireAuth);`'un üstüne
   taşı → "requireAuth’tan ÖNCE kurulmuş".
2. `startSlideSweeper(db);` satırını sil → "zamanlayıcı başlamıyor".
3. `admin/vitrin.ts`'te `await deleteFolder(kind.col, id);` satırını sil →
   "görsel klasörü silinmiyor".

Yerel duman testi (üretim servis hesabı ile açılıyorsa `ADMIN_AUTO_PUSH=off`):
`ADMIN_AUTO_PUSH=off npm run admin` → `/slider` ve `/sponsorlar` açılıyor, yeni
kayıt, ↑/↓, sürükle-bırak, silme çalışıyor. Servis hesabı yoksa bu adım atlanır
ve raporda "yerel duman testi yapılamadı" diye yazılır.

- [ ] **Step 6: Commit**

```bash
graphify update .
git add admin/vitrin.ts admin/server.ts scripts/check-release.mjs graphify-out/
git commit -m "feat(panel): slider ve sponsor rotaları, süresi dolan slaytları silen zamanlayıcı"
```

---

### Task 7: Tema, `PhotoSlot`, iletişim adresi

**Files:**
- Modify: `src/theme.ts`, `src/components/PhotoSlot.tsx`, `src/data.ts`

**Interfaces:**
- Produces: `colors.white`, `gradients.slideShade`,
  `PhotoSlot` prop `resizeMode?: 'cover' | 'contain'`,
  `SPONSOR_CONTACT_EMAIL = 'info@kouseng.com'`.

- [ ] **Step 1: Token'lar**

`src/theme.ts` → `colors` içinde `onNavy: '#D2E7EC',` satırının altına:

```ts
  /** Koyu zemin üstünde yazı ve beyaz dolgulu düğme. Mevcut `'#fff'`'ler yerinde duruyor. */
  white: '#FFFFFF',
```

`gradients` içinde `masterCard` satırının altına:

```ts
  /**
   * Slider kartının karartması: `navy900` alttan yukarı. `HomeSlider`
   * `locations={[0.35, 1]}` veriyor — üst üçte bir tamamen şeffaf.
   */
  slideShade: ['rgba(0,27,74,0)', 'rgba(0,27,74,0.85)'],
```

- [ ] **Step 2: `PhotoSlot`'a `resizeMode`**

`src/components/PhotoSlot.tsx` → prop listesine `resizeMode = 'cover',`, tipe
`resizeMode?: 'cover' | 'contain';` ve `<Image … resizeMode="cover" />` →
`resizeMode={resizeMode}`. Doc yorumuna bir satır: "Logolar `contain`
kullanıyor: kırpılan bir logo başka bir marka gibi okunur."

- [ ] **Step 3: İletişim adresi**

`src/data.ts` → `ACCOUNT_DELETE_URL` satırının altına:

```ts
/** Sponsorlar ekranındaki "İletişime geç" — kulübün adresi, çalışıyor (2026-09-26 teyit). */
export const SPONSOR_CONTACT_EMAIL = 'info@kouseng.com';
```

- [ ] **Step 4: Doğrula**

Run: `npm run typecheck && npx jest`
Expected: PASS (davranış değişmedi; mevcut testler yeşil).

- [ ] **Step 5: Commit**

```bash
graphify update .
git add src/theme.ts src/components/PhotoSlot.tsx src/data.ts graphify-out/
git commit -m "feat(tema): colors.white, slider karartması, PhotoSlot resizeMode, sponsor iletişim adresi"
```

---

### Task 8: Veri hook'ları — `SponsorsProvider`, `useSlides`

**Files:**
- Create: `src/sponsors.tsx`, `src/slides.ts`
- Modify: `app/_layout.tsx` (`SponsorsProvider`)

**Interfaces:**
- Consumes: `fetchSponsors`, `fetchSlides` (Task 2, dinamik import),
  `visibleSlides` (Task 1), `todayLocal`, `isFirebaseConfigured`.
- Produces:
  - `SponsorsProvider`, `useSponsors(): { sponsors: Sponsor[]; loading: boolean; error: string | null; refresh: () => void; get: (id?: string | string[]) => Sponsor | undefined }`
  - `useSlides(): { slides: Slide[]; loading: boolean; error: string | null; refresh: () => void }`

- [ ] **Step 1: Sponsor sağlayıcısı**

`src/sponsors.tsx`:

```tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { isFirebaseConfigured } from './firebaseConfig';
import type { Sponsor } from './vitrinSchema';

/**
 * Sponsorlar — dört ekran okuyor (ana sayfa, liste, detay, etkinlik detayındaki
 * "Ödülü sağlayan"), o yüzden kökte bir sağlayıcı.
 *
 * Durum makinesi `AnnouncementsProvider` ile aynı: iptal bayrağı, `nonce` ile
 * yenileme, hata olunca eldeki liste korunuyor. Okuma `fetchContent`'ten ayrı:
 * `sponsors` kuralı henüz yayınlanmadıysa etkinlikler bundan etkilenmiyor.
 */
type SponsorsValue = {
  sponsors: Sponsor[];
  loading: boolean;
  /** Yalnız okuma başarısız olduğunda dolu. Boş liste hata değil. */
  error: string | null;
  refresh: () => void;
  get: (id?: string | string[]) => Sponsor | undefined;
};

const Ctx = createContext<SponsorsValue | null>(null);

export function SponsorsProvider({ children }: { children: React.ReactNode }) {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setError('Uygulama yapılandırması eksik.');
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    // Dinamik: Firestore SDK başlangıç paketine girmesin.
    import('./firebase')
      .then(({ fetchSponsors }) => fetchSponsors())
      .then((list) => {
        if (cancelled) return;
        setSponsors(list);
        setError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        console.log(`[sponsor] alınamadı: ${message}`);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [nonce]);

  const value = useMemo<SponsorsValue>(
    () => ({
      sponsors,
      loading,
      error,
      refresh: () => setNonce((n) => n + 1),
      get: (id) => {
        const key = Array.isArray(id) ? id[0] : id;
        return sponsors.find((s) => s.id === key);
      },
    }),
    [sponsors, loading, error],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSponsors() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSponsors must be used inside <SponsorsProvider>');
  return ctx;
}
```

- [ ] **Step 2: Slayt hook'u**

`src/slides.ts`:

```ts
import { useEffect, useMemo, useState } from 'react';

import { todayLocal } from './eventSchema';
import { isFirebaseConfigured } from './firebaseConfig';
import { visibleSlides, type Slide } from './vitrinSchema';

/**
 * Ana sayfanın slaytları. Tek tüketici ana sayfa, o yüzden sağlayıcı yok.
 *
 * Bitiş tarihi okuma ve yenileme anında değerlendiriliyor (`nonce` bağımlılık) —
 * takvimdeki `splitByDate` ile aynı: gece yarısını açık geçiren uygulama slaytı
 * bir sonraki yenilemeye kadar gösterir. Panel süresi dolanı zaten siliyor.
 */
export function useSlides() {
  const [all, setAll] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setError('Uygulama yapılandırması eksik.');
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    import('./firebase')
      .then(({ fetchSlides }) => fetchSlides())
      .then((list) => {
        if (cancelled) return;
        setAll(list);
        setError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        console.log(`[slider] alınamadı: ${message}`);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [nonce]);

  const slides = useMemo(() => visibleSlides(all, todayLocal(new Date())), [all, nonce]);

  return { slides, loading, error, refresh: () => setNonce((n) => n + 1) };
}
```

- [ ] **Step 3: Kökte sağlayıcı**

`app/_layout.tsx`:
- İçe aktarım: `import { SponsorsProvider } from '../src/sponsors';`
- `<AnnouncementsProvider>` açılışının hemen içine `<SponsorsProvider>`,
  `</AnnouncementsProvider>` kapanışının hemen önüne `</SponsorsProvider>`;
  aradaki içerik (StatusBar, NotificationSync, QueryProvider) aynen kalıyor.

- [ ] **Step 4: Doğrula**

Run: `npm run typecheck && npx jest`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
graphify update .
git add src/sponsors.tsx src/slides.ts app/_layout.tsx graphify-out/
git commit -m "feat(vitrin): SponsorsProvider ve useSlides — fetchContent'ten bağımsız okuma"
```

---

### Task 9: Slider bileşeni — `src/components/HomeSlider.tsx`

**Files:**
- Create: `src/components/HomeSlider.tsx`
- Test: `src/__tests__/home-slider.test.tsx`

**Interfaces:**
- Consumes: `Slide`, `Kicker` (Task 1); `colors.white`, `gradients.slideShade`
  (Task 7); `PhotoSlot`, `PixelBadge`, `Txt`; `useOpenEvent`.
- Produces: `HomeSlider({ slides }: { slides: Slide[] })`,
  `SLIDE_INTERVAL_MS = 4500`.

- [ ] **Step 1: Failing testleri yaz**

`src/__tests__/home-slider.test.tsx`:

```tsx
import { act, render, screen } from '@testing-library/react-native';
import React from 'react';
import { AccessibilityInfo } from 'react-native';

import { HomeSlider, SLIDE_INTERVAL_MS } from '../components/HomeSlider';
import type { Slide } from '../vitrinSchema';

/**
 * Slider'ın zamanlayıcısı: 4,5 saniyede bir ilerliyor, sonda başa dönüyor,
 * tek slaytta ve "hareketi azalt" açıkken hiç çalışmıyor. Noktaların seçili
 * durumu hangi slaytta olunduğunu söylüyor — kaydırmanın kendisi Jest'te
 * çizilmiyor, `ScrollView.scrollTo` bir taklit.
 */

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    useRouter: () => ({ push: jest.fn(), navigate: jest.fn() }),
    // Ekran odakta: geri çağrıyı bir kez çalıştır, temizliği sökülünce çağır.
    useFocusEffect: (cb: () => void | (() => void)) => useEffect(cb, [cb]),
  };
});

const slide = (id: string): Slide => ({
  id,
  title: `Slayt ${id}`,
  meta: '',
  order: 1,
  target: { type: 'url', url: 'https://ornek.com/' },
});

const dot = (n: number, selected: boolean) =>
  screen.queryByRole('button', { name: `${n}. slayta git`, selected });

/** Erişilebilirlik ayarları bir promise; ilk render'dan sonra çözülmesini bekle. */
const settle = () => act(async () => {});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it('tek slaytta nokta yok', async () => {
  await render(<HomeSlider slides={[slide('a')]} />);
  await settle();
  expect(screen.queryAllByRole('button', { name: /slayta git/ })).toHaveLength(0);
  expect(screen.getByText('Slayt a')).toBeTruthy();
});

it('4,5 saniyede bir ilerliyor ve sonda başa dönüyor', async () => {
  await render(<HomeSlider slides={[slide('a'), slide('b')]} />);
  await settle();
  expect(dot(1, true)).toBeTruthy();

  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS);
  });
  expect(dot(2, true)).toBeTruthy();

  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS);
  });
  expect(dot(1, true)).toBeTruthy();
});

it('"hareketi azalt" açıkken ilerlemiyor', async () => {
  jest.mocked(AccessibilityInfo.isReduceMotionEnabled).mockResolvedValueOnce(true);
  await render(<HomeSlider slides={[slide('a'), slide('b')]} />);
  await settle();

  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS * 2);
  });
  expect(dot(1, true)).toBeTruthy();
});

it('slayt sayısı azalınca dizin taşmıyor', async () => {
  const { rerender } = await render(<HomeSlider slides={[slide('a'), slide('b'), slide('c')]} />);
  await settle();
  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS * 2);
  });
  expect(dot(3, true)).toBeTruthy();

  await rerender(<HomeSlider slides={[slide('a'), slide('b')]} />);
  expect(dot(1, true) ?? dot(2, true)).toBeTruthy();
  expect(dot(3, true)).toBeNull();
});

it('ekran okuyucu etiketi okunur Türkçe', async () => {
  await render(<HomeSlider slides={[{ ...slide('a'), kicker: 'BUGUN', meta: '18.00 · B Blok' }]} />);
  await settle();
  expect(screen.getByRole('link', { name: 'Bugün: Slayt a. 18.00 · B Blok' })).toBeTruthy();
});
```

- [ ] **Step 2: Düştüğünü gör**

Run: `npx jest src/__tests__/home-slider.test.tsx`
Expected: FAIL — `Cannot find module '../components/HomeSlider'`.

- [ ] **Step 3: Bileşeni yaz**

`src/components/HomeSlider.tsx`:

```tsx
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AccessibilityInfo,
  FlatList,
  Linking,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';

import type { IconName } from '../icons';
import { colors, gradients, shadow } from '../theme';
import { useOpenEvent } from '../useOpenEvent';
import type { Kicker, Slide } from '../vitrinSchema';
import { PhotoSlot } from './PhotoSlot';
import { PixelBadge, Txt } from './ui';

/** Otomatik geçiş aralığı. */
export const SLIDE_INTERVAL_MS = 4500;

const SIDE = 20;
const GAP = 12;
const HEIGHT = 190;

/**
 * Rozet ASCII yazıyor (tasarımın dili); ekran okuyucu ise doğru Türkçeyi
 * okumalı — "BUGUN" harf harf ya da yanlış telaffuzla okunurdu.
 */
const KICKER: Record<Kicker, { icon: IconName; spoken: string }> = {
  BUGUN: { icon: 'cal', spoken: 'Bugün' },
  CEKILIS: { icon: 'gift', spoken: 'Çekiliş' },
  DUYURU: { icon: 'star', spoken: 'Duyuru' },
};

/**
 * Ana sayfanın slider'ı.
 *
 * Kart genişliği ekran − 40 ve kaydırma `snapToInterval` ile: `pagingEnabled`
 * ekran genişliğinde sayfalıyor, 20px kenar boşluğuyla uyuşmuyor.
 *
 * Otomatik geçiş dört koşulda duruyor: tek slayt, ekran odakta değil, kullanıcı
 * kaydırıyor, ya da "hareketi azalt" veya ekran okuyucu açık — kendi kendine
 * kayan içerik ekran okuyucuyla gezeni yerinden eder (WCAG 2.2.2).
 */
export function HomeSlider({ slides }: { slides: Slide[] }) {
  const { width } = useWindowDimensions();
  const cardWidth = width - SIDE * 2;
  const step = cardWidth + GAP;
  const list = useRef<FlatList<Slide>>(null);
  const router = useRouter();
  const openEvent = useOpenEvent();

  const [index, setIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  // Ayar okunana kadar durgun: ilk kareden kaymaya başlamasın.
  // ponytail: ayar yalnız açılışta okunuyor; uygulama açıkken değişirse bir sonraki açılışta geçerli.
  const [still, setStill] = useState(true);

  useEffect(() => {
    let alive = true;
    Promise.all([AccessibilityInfo.isReduceMotionEnabled(), AccessibilityInfo.isScreenReaderEnabled()])
      .then(([reduce, reader]) => {
        if (alive) setStill(reduce || reader);
      })
      .catch(() => {
        if (alive) setStill(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      setFocused(true);
      return () => setFocused(false);
    }, []),
  );

  const count = slides.length;
  // Yenileme listeyi kısaltırsa dizin dışarıda kalmasın.
  const current = count ? index % count : 0;

  const go = useCallback(
    (next: number) => {
      setIndex(next);
      list.current?.scrollToOffset({ offset: next * step, animated: true });
    },
    [step],
  );

  useEffect(() => {
    if (count < 2 || still || !focused || dragging) return;
    const timer = setTimeout(() => go((current + 1) % count), SLIDE_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [count, still, focused, dragging, current, go]);

  if (!count) return null;

  const open = (s: Slide) => {
    const t = s.target;
    if (t.type === 'event') openEvent(t.id);
    else if (t.type === 'announcement') router.navigate(`/duyuru/${t.id}`);
    else void Linking.openURL(t.url).catch(() => {});
  };

  return (
    <View style={styles.root}>
      <FlatList
        ref={list}
        data={slides}
        keyExtractor={(s) => s.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={step}
        snapToAlignment="start"
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SIDE }}
        ItemSeparatorComponent={Separator}
        onScrollBeginDrag={() => setDragging(true)}
        onScrollEndDrag={() => setDragging(false)}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / step))}
        renderItem={({ item }) => <SlideCard slide={item} width={cardWidth} onPress={() => open(item)} />}
      />

      {count > 1 ? (
        <View style={styles.dots}>
          {slides.map((s, i) => (
            <Pressable
              key={s.id}
              onPress={() => go(i)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={`${i + 1}. slayta git`}
              accessibilityState={{ selected: i === current }}
              style={[styles.dot, i === current && styles.dotActive]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

function Separator() {
  return <View style={{ width: GAP }} />;
}

function SlideCard({ slide, width, onPress }: { slide: Slide; width: number; onPress: () => void }) {
  const kicker = slide.kicker ? KICKER[slide.kicker] : null;
  const heading = kicker ? `${kicker.spoken}: ${slide.title}` : slide.title;
  const label = slide.meta ? `${heading}. ${slide.meta}` : heading;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={slide.target.type === 'url' ? 'link' : 'button'}
      accessibilityLabel={label}
      style={({ pressed }) => [styles.card, { width, opacity: pressed ? 0.92 : 1 }]}
    >
      <PhotoSlot uri={slide.image} showLabel={false} style={styles.photo}>
        <LinearGradient colors={gradients.slideShade} locations={[0.35, 1]} style={StyleSheet.absoluteFill} />
        <View style={styles.caption}>
          {slide.kicker && kicker ? (
            <PixelBadge icon={kicker.icon} label={slide.kicker} bg={colors.blue500} fg={colors.white} />
          ) : null}
          <Txt
            weight="extrabold"
            size={18}
            color={colors.white}
            tracking={-0.3}
            numberOfLines={2}
            style={{ marginTop: 8 }}
          >
            {slide.title}
          </Txt>
          {slide.meta ? (
            <Txt size={12} color={colors.onNavy} numberOfLines={1} style={{ marginTop: 4 }}>
              {slide.meta}
            </Txt>
          ) : null}
        </View>
      </PhotoSlot>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: { marginTop: 20 },
  // Gölge dışta: `overflow: hidden` (PhotoSlot'ta) iOS'ta gölgeyi keserdi.
  card: { height: HEIGHT, borderRadius: 16, backgroundColor: colors.navy900, ...shadow.card },
  photo: { flex: 1, borderRadius: 16 },
  caption: { position: 'absolute', left: 16, right: 16, bottom: 14 },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 12 },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.dotIdle },
  dotActive: { width: 20, backgroundColor: colors.blue500 },
});
```

- [ ] **Step 4: Geçtiğini gör**

Run: `npx jest src/__tests__/home-slider.test.tsx && npm run typecheck`
Expected: PASS. Kırmızı sınaması: `if (count < 2 || still || …)` satırından
`still ||`'i geçici sil → "hareketi azalt açıkken ilerlemiyor" kırmızı → geri al.

- [ ] **Step 5: Commit**

```bash
graphify update .
git add src/components/HomeSlider.tsx src/__tests__/home-slider.test.tsx graphify-out/
git commit -m "feat(ana sayfa): slider — 4,5 sn geçiş, odak ve sürüklemede durur, hareketi azalt'a uyar"
```

---

### Task 10: Ana sayfa — slider, Sponsorlarımız, yenileme

**Files:**
- Modify: `app/(tabs)/index.tsx`, `app/(tabs)/takvim.tsx`, `app/(tabs)/arsiv.tsx`

**Interfaces:**
- Consumes: `HomeSlider` (Task 9), `useSlides`, `useSponsors` (Task 8),
  `PhotoSlot` `resizeMode` (Task 7), `Card`.

- [ ] **Step 1: Ana sayfa**

`app/(tabs)/index.tsx`:
- İçe aktarımlar:

```tsx
import { HomeSlider } from '../../src/components/HomeSlider';
import { PhotoSlot } from '../../src/components/PhotoSlot';
import { useSlides } from '../../src/slides';
import { useSponsors } from '../../src/sponsors';
```
  ve `ui` içe aktarımına `Card` ekle.
- `useAnnouncements()` yapısal atamasına `refresh: refreshAnnouncements` ekle.
  Altına:

```tsx
  const { slides, error: slidesError, refresh: refreshSlides } = useSlides();
  const { sponsors, error: sponsorsError, refresh: refreshSponsors } = useSponsors();

  // Aşağı çekmek ana sayfadaki her şeyi yeniler. Duyurular daha önce burada
  // yenilenmiyordu; çeken kişi hepsinin tazelendiğini sanıyordu.
  const onRefresh = () => {
    refresh();
    refreshSlides();
    refreshSponsors();
    refreshAnnouncements();
  };
```
- `RefreshControl`:

```tsx
        <RefreshControl
          refreshing={loading}
          onRefresh={onRefresh}
          // blue200 açık zeminde görünmüyordu. `tintColor` yalnız iOS; Android `colors` okuyor.
          tintColor={colors.blue500}
          colors={[colors.blue500]}
        />
```
- `{error ? <ContentNotice … /> : null}` satırının altına, "Yaklaşan
  Etkinlikler" `SectionTitle`'ının üstüne:

```tsx
      {/* Hata ya da boşken hiç çizilmiyor: bir süs, ana sayfayı bekletmemeli. */}
      {!slidesError ? <HomeSlider slides={slides} /> : null}

      {!sponsorsError && sponsors.length ? (
        <>
          <SectionTitle
            icon="grid"
            style={{ paddingTop: 20 }}
            trailing={
              <Pressable
                onPress={() => router.push('/sponsorlar')}
                accessibilityRole="button"
                accessibilityLabel="Tüm sponsorlar"
              >
                <Txt weight="semibold" size={12} color={colors.blue500}>
                  Tümü →
                </Txt>
              </Pressable>
            }
          >
            Sponsorlarımız
          </SectionTitle>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sponsorRail}>
            {sponsors.map((s) => (
              <Pressable
                key={s.id}
                onPress={() => router.push(`/sponsor/${s.id}`)}
                accessibilityRole="button"
                accessibilityLabel={s.name}
              >
                <Card style={styles.sponsorCard}>
                  <PhotoSlot uri={s.logo} resizeMode="contain" showLabel={false} style={styles.sponsorLogo} />
                  <Txt weight="bold" size={12} numberOfLines={1} style={{ marginTop: 8 }}>
                    {s.name}
                  </Txt>
                </Card>
              </Pressable>
            ))}
            <Pressable
              onPress={() => router.push('/sponsorlar')}
              accessibilityRole="button"
              accessibilityLabel="Sponsor ol"
              style={({ pressed }) => [styles.sponsorJoin, pressed && { opacity: 0.7 }]}
            >
              <Txt weight="bold" size={18} color={colors.blue500}>
                +
              </Txt>
              <Txt weight="bold" size={12} color={colors.blue500}>
                Sponsor ol
              </Txt>
            </Pressable>
          </ScrollView>
        </>
      ) : null}
```
- `styles`'a:

```tsx
  sponsorRail: { paddingHorizontal: 20, gap: 10 },
  // 112 − 2 kenarlık − 2×10 boşluk = 90: logo tam oturuyor.
  sponsorCard: { width: 112, borderRadius: radius.lg, padding: 10 },
  sponsorLogo: { width: 90, height: 56, borderRadius: 9, backgroundColor: colors.bg },
  // Satırın çapraz ekseni `stretch`: kart diğerleriyle aynı boyda.
  sponsorJoin: {
    width: 112,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.blue200,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
```

- [ ] **Step 2: Takvim ve arşiv (Android rengi)**

`app/(tabs)/takvim.tsx` ve `app/(tabs)/arsiv.tsx` → `RefreshControl`'e
`colors={[colors.blue500]}` ekle (`tintColor` zaten `blue500`).

- [ ] **Step 3: Doğrula**

Run: `npm run typecheck && npm run check:release && npx jest`
Expected: PASS — "içerik durumu ekranlara bağlı" (ana sayfada `ContentNotice`
ve `RefreshControl` duruyor) ve "QR yoklama zinciri bağlı" (`push('/qr')`)
yeşil kalıyor.

- [ ] **Step 4: Commit**

```bash
graphify update .
git add "app/(tabs)/index.tsx" "app/(tabs)/takvim.tsx" "app/(tabs)/arsiv.tsx" graphify-out/
git commit -m "feat(ana sayfa): slider ve Sponsorlarımız; aşağı çekme her şeyi yeniliyor, gösterge tema mavisinde"
```

---

### Task 11: Sponsor ekranları — `/sponsorlar`, `/sponsor/[id]`

**Files:**
- Create: `app/sponsorlar.tsx`, `app/sponsor/[id].tsx`
- Modify: `app/_layout.tsx` (iki `Stack.Screen`)
- Test: `src/__tests__/sponsors-screen.test.tsx`

**Interfaces:**
- Consumes: `useSponsors` (Task 8), `sponsorEvents` (Task 1), `useContent`,
  `useOpenEvent`, `SPONSOR_CONTACT_EMAIL` (Task 7), `ui` bileşenleri.

- [ ] **Step 1: Failing testi yaz**

`src/__tests__/sponsors-screen.test.tsx`:

```tsx
import { act, render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

import SponsorsRoute from '../../app/sponsorlar';
import { SponsorsProvider } from '../sponsors';

/**
 * Kurallar yayınlanmadan ya da yapılandırmasız çıkan bir sürümde sponsor
 * okuması düşer. Ekran bunu "Henüz sponsor yok" diye göstermemeli — bir
 * bağlantı sorunu boş bir kulüp gibi görünürdü — ve "Sponsor ol" kartı her
 * durumda durmalı.
 *
 * Okuma taklit ediliyor ve reddediyor (yayınlanmamış kural gibi). Yapılandırma
 * yoksa sağlayıcı zaten hata yolundan geçiyor; varsa (yerelde `.env`) bu taklit
 * testin gerçek Firestore'a gitmesini engelliyor — iki durumda da sonuç hata.
 */

jest.mock('expo-router', () => ({ useRouter: () => ({ push: jest.fn(), back: jest.fn() }) }));
jest.mock('../firebase', () => ({
  fetchSponsors: () => Promise.reject(new Error('Missing or insufficient permissions.')),
}));

const METRICS: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

it('okuma düşünce hata şeridi ve "Sponsor ol" kartı, "Henüz sponsor yok" değil', async () => {
  await render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <SponsorsProvider>
        <SponsorsRoute />
      </SponsorsProvider>
    </SafeAreaProvider>,
  );
  // Reddedilen okumanın sonucu bir sonraki mikro görevde geliyor.
  await act(async () => {});

  expect(screen.getByText('Güncel içeriğe ulaşılamadı')).toBeTruthy();
  expect(screen.getByRole('button', { name: /İletişime geç/ })).toBeTruthy();
  expect(screen.queryByText('Henüz sponsor yok')).toBeNull();
});
```

- [ ] **Step 2: Düştüğünü gör**

Run: `npx jest src/__tests__/sponsors-screen.test.tsx`
Expected: FAIL — `Cannot find module '../../app/sponsorlar'`.

- [ ] **Step 3: Liste ekranı**

`app/sponsorlar.tsx`:

```tsx
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { PhotoSlot } from '../src/components/PhotoSlot';
import {
  Card,
  ContentNotice,
  DottedRule,
  EmptyState,
  GlassButton,
  GradientHeader,
  PixelTxt,
  Txt,
} from '../src/components/ui';
import { SPONSOR_CONTACT_EMAIL } from '../src/data';
import { useSponsors } from '../src/sponsors';
import { colors, gradientDirection, gradients } from '../src/theme';

/**
 * Sponsorlarımız — tek liste, kademe yok; sıra panelden (büyük sponsorlar üstte).
 *
 * "Sponsor ol" kartı her durumda en altta: liste boşken de, okunamazken de —
 * kulübe ulaşmanın yolu listenin durumuna bağlı olmamalı.
 */
export default function SponsorsRoute() {
  const router = useRouter();
  const { sponsors, loading, error, refresh } = useSponsors();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
      <GradientHeader gradient={gradients.section}>
        <View style={styles.titleRow}>
          <GlassButton label="‹" accessibilityLabel="Geri" onPress={() => router.back()} size={36} />
          <Txt weight="extrabold" size={20} color={colors.white}>
            Sponsorlarımız
          </Txt>
        </View>
        <Txt size={13} color={colors.white} style={{ opacity: 0.82, marginTop: 10 }}>
          Kulübün etkinliklerini destekleyen kurumlar.
        </Txt>
        <DottedRule style={{ marginTop: 14 }} />
      </GradientHeader>

      {error ? <ContentNotice onRetry={refresh} retrying={loading} /> : null}

      <View style={styles.body}>
        {sponsors.length ? (
          sponsors.map((s) => (
            <Pressable
              key={s.id}
              onPress={() => router.push(`/sponsor/${s.id}`)}
              accessibilityRole="button"
              accessibilityLabel={s.sector ? `${s.name}, ${s.sector}` : s.name}
            >
              <Card style={styles.row}>
                <PhotoSlot uri={s.logo} resizeMode="contain" showLabel={false} style={styles.logo} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Txt weight="bold" size={15} numberOfLines={1}>
                    {s.name}
                  </Txt>
                  {s.sector ? (
                    <Txt size={12.5} color={colors.muted} style={{ marginTop: 3 }}>
                      {s.sector}
                    </Txt>
                  ) : null}
                </View>
                <Txt size={16} color={colors.faint}>
                  ›
                </Txt>
              </Card>
            </Pressable>
          ))
        ) : loading ? (
          <EmptyState title="Yükleniyor" body="Sponsorlar getiriliyor." />
        ) : error ? null : (
          <EmptyState title="Henüz sponsor yok" body="Kulübü destekleyen kurumlar burada listelenecek." />
        )}

        <JoinCard />
      </View>
    </ScrollView>
  );
}

function JoinCard() {
  return (
    <LinearGradient
      colors={gradients.home}
      start={gradientDirection.diagonal.start}
      end={gradientDirection.diagonal.end}
      style={styles.join}
    >
      <PixelTxt size={7} color={colors.blue200}>
        SPONSOR OL
      </PixelTxt>
      <Txt weight="extrabold" size={16} color={colors.white} style={{ marginTop: 10 }}>
        Kulübü desteklemek ister misin?
      </Txt>
      <Txt size={13} leading={1.5} color={colors.blue100} style={{ marginTop: 6 }}>
        Atölye, hackathon ya da teknik gezi için destek olabilirsin. Ekibimiz seninle iletişime geçer.
      </Txt>
      <Pressable
        onPress={() =>
          void Linking.openURL(`mailto:${SPONSOR_CONTACT_EMAIL}?subject=Sponsorluk`).catch(() => {})
        }
        accessibilityRole="button"
        accessibilityLabel="İletişime geç, e-posta yaz"
        style={({ pressed }) => [styles.joinButton, pressed && { opacity: 0.85 }]}
      >
        <Txt weight="bold" size={14} color={colors.navy900}>
          İletişime geç
        </Txt>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  body: { paddingHorizontal: 20, paddingTop: 16, gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  logo: { width: 56, height: 56, borderRadius: 12, backgroundColor: colors.bg },
  join: { borderRadius: 16, padding: 18, marginTop: 6 },
  joinButton: {
    marginTop: 14,
    backgroundColor: colors.white,
    borderRadius: 11,
    paddingVertical: 12,
    alignItems: 'center',
  },
});
```

- [ ] **Step 4: Detay ekranı**

`app/sponsor/[id].tsx`:

```tsx
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Linking, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { PhotoSlot } from '../../src/components/PhotoSlot';
import {
  Card,
  ContentNotice,
  EmptyState,
  GlassButton,
  GradientHeader,
  PrimaryButton,
  Tag,
  Txt,
} from '../../src/components/ui';
import { useContent } from '../../src/content';
import { useSponsors } from '../../src/sponsors';
import { colors, gradients, radius, shadow } from '../../src/theme';
import { useOpenEvent } from '../../src/useOpenEvent';
import { sponsorEvents } from '../../src/vitrinSchema';

/**
 * Kurum detayı. Sayfanın başlığı kurumun adı; bulunduğunda görünen hiçbir
 * metin "sponsor" kelimesini taşımıyor. Çekiliş etkinliğinden "Ödülü sağlayan"
 * etiketiyle buraya gelinebiliyor ve Apple 5.3.2 çekilişin sponsorunun
 * geliştirici olmasını istiyor — `raffleLegal.ts`.
 */
export default function SponsorRoute() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { get, loading, error, refresh } = useSponsors();
  const { events, archive, getRaffle } = useContent();
  const openEvent = useOpenEvent();
  const sponsor = get(id);

  const header = (
    <GradientHeader gradient={gradients.form} style={{ paddingBottom: 64 }}>
      <GlassButton label="‹" accessibilityLabel="Geri" onPress={() => router.back()} size={36} />
    </GradientHeader>
  );

  if (!sponsor) {
    return (
      <View style={styles.screen}>
        {header}
        {loading ? (
          <EmptyState title="Yükleniyor" body="Kurum bilgileri getiriliyor." />
        ) : error ? (
          <ContentNotice onRetry={refresh} retrying={loading} />
        ) : (
          <EmptyState
            title="Sponsor bulunamadı"
            body="Bu kurum listeden kaldırılmış ya da bağlantı eskimiş olabilir."
            ctaLabel="Geri dön"
            onPress={() => router.back()}
          />
        )}
      </View>
    );
  }

  const rows = sponsorEvents(sponsor, events, archive, (eventId) => !!getRaffle(eventId));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
      {header}

      <Card style={styles.hero}>
        <PhotoSlot uri={sponsor.logo} resizeMode="contain" showLabel={false} style={styles.logo} />
        <Txt weight="extrabold" size={22} color={colors.navy900} style={{ marginTop: 14 }}>
          {sponsor.name}
        </Txt>
        {sponsor.sector ? <Tag label={sponsor.sector} style={{ alignSelf: 'flex-start', marginTop: 10 }} /> : null}
        {sponsor.description ? (
          <Txt size={14.5} leading={1.68} color={colors.textBody} style={{ marginTop: 12 }}>
            {sponsor.description}
          </Txt>
        ) : null}
      </Card>

      {rows.length ? (
        <View style={styles.block}>
          <Txt weight="extrabold" size={16} color={colors.navy900} style={{ marginBottom: 10 }}>
            Desteklediği etkinlikler
          </Txt>
          <View style={{ gap: 10 }}>
            {rows.map(({ event, upcoming, prize }) => (
              <Pressable
                key={event.id}
                onPress={() => openEvent(event.id)}
                accessibilityRole="button"
                accessibilityLabel={[event.title, upcoming ? null : 'geçmiş etkinlik', prize ? 'ödülü sağlayan' : null]
                  .filter(Boolean)
                  .join(', ')}
                style={({ pressed }) => [styles.eventRow, pressed && { borderColor: colors.blue200 }]}
              >
                <View style={[styles.bar, { backgroundColor: upcoming ? colors.blue500 : colors.blue200 }]} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Txt weight="bold" size={14.5} color={colors.text}>
                    {event.title}
                  </Txt>
                  <Txt size={12.5} color={colors.muted} style={{ marginTop: 3 }}>
                    {event.short}
                  </Txt>
                  {prize ? <Tag label="Ödülü sağlayan" style={{ alignSelf: 'flex-start', marginTop: 8 }} /> : null}
                </View>
                <Txt size={16} color={colors.faint}>
                  ›
                </Txt>
              </Pressable>
            ))}
          </View>
        </View>
      ) : null}

      {sponsor.url ? (
        <View style={styles.block}>
          <PrimaryButton label="Web sitesine git" onPress={() => void Linking.openURL(sponsor.url!).catch(() => {})} />
          {sponsor.host ? (
            <Txt size={12} color={colors.faint} style={{ textAlign: 'center', marginTop: 8 }}>
              {sponsor.host}
            </Txt>
          ) : null}
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  hero: { marginTop: -48, marginHorizontal: 20, padding: 18, ...shadow.card },
  logo: { width: 88, height: 88, borderRadius: 16, backgroundColor: colors.bg },
  block: { paddingHorizontal: 20, paddingTop: 22 },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: 14,
  },
  bar: { width: 4, alignSelf: 'stretch', borderRadius: 2 },
});
```

- [ ] **Step 5: Rotalar**

`app/_layout.tsx` → `<Stack.Screen name="cekilis-kurallari" />` satırının altına:

```tsx
        <Stack.Screen name="sponsorlar" />
        <Stack.Screen name="sponsor/[id]" />
```

- [ ] **Step 6: Doğrula**

Run: `npx jest src/__tests__/sponsors-screen.test.tsx && npm run typecheck && npm run check:release`
Expected: PASS; "yığın ekranlarında geri düğmesi var" iki yeni ekranı da
`label="‹"` ile buluyor.

- [ ] **Step 7: Commit**

```bash
graphify update .
git add app/sponsorlar.tsx "app/sponsor/[id].tsx" app/_layout.tsx src/__tests__/sponsors-screen.test.tsx graphify-out/
git commit -m "feat(sponsor): Sponsorlarımız listesi ve kurum detayı"
```

---

### Task 12: "Ödülü sağlayan" — `PrizeProviders`

**Files:**
- Create: `src/components/PrizeProviders.tsx`
- Modify: `app/etkinlik/[id].tsx` ("Etkinlik hakkında" bloğu, etiketlerin altı)
- Test: `src/__tests__/prize-providers.test.tsx`

**Interfaces:**
- Consumes: `Sponsor` (Task 1), `useSponsors` (Task 8).
- Produces: `PrizeProviders({ providers }: { providers: Pick<Sponsor, 'id' | 'name'>[] })`.

- [ ] **Step 1: Failing testleri yaz**

`src/__tests__/prize-providers.test.tsx`:

```tsx
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { PrizeProviders } from '../components/PrizeProviders';

/**
 * Apple 5.3.2: çekilişin sponsoru geliştiricinin kendisi. `raffleLegal.ts`
 * "ödülü sağlayan taraf çekilişin sponsoru değildir" diyor. Bu blok çekiliş
 * etkinliğinin ekranında duruyor; ekrana yazdığı hiçbir şey "sponsor"
 * kelimesini taşıyamaz — bir yeniden düzenlemede "Sponsor: X" olursa ret
 * sebebi geri gelir.
 */

const mockPush = jest.fn();
jest.mock('expo-router', () => ({ useRouter: () => ({ push: mockPush }) }));

beforeEach(() => mockPush.mockClear());

it('"Ödülü sağlayan" yazıyor, hiçbir yerde "sponsor" yazmıyor', async () => {
  await render(<PrizeProviders providers={[{ id: 's1', name: 'Örnek A.Ş.' }]} />);
  expect(screen.getByText('Ödülü sağlayan')).toBeTruthy();
  expect(screen.getByText('Örnek A.Ş.')).toBeTruthy();
  expect(JSON.stringify(screen.toJSON())).not.toMatch(/sponsor/i);
});

it('dokununca kurumun sayfası açılıyor', async () => {
  await render(<PrizeProviders providers={[{ id: 's1', name: 'Örnek A.Ş.' }]} />);
  fireEvent.press(screen.getByRole('button', { name: 'Ödülü sağlayan: Örnek A.Ş.' }));
  expect(mockPush).toHaveBeenCalledWith('/sponsor/s1');
});

it('kurum yoksa hiçbir şey çizmiyor', async () => {
  await render(<PrizeProviders providers={[]} />);
  expect(screen.toJSON()).toBeNull();
});
```

- [ ] **Step 2: Düştüğünü gör**

Run: `npx jest src/__tests__/prize-providers.test.tsx`
Expected: FAIL — `Cannot find module '../components/PrizeProviders'`.

- [ ] **Step 3: Bileşeni yaz**

`src/components/PrizeProviders.tsx`:

```tsx
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, radius } from '../theme';
import type { Sponsor } from '../vitrinSchema';
import { Txt } from './ui';

/**
 * Çekiliş etkinliğinde ödülü sağlayan kurumlar — kurumun sayfasına gidiyor,
 * linkler ve tanıtım orada.
 *
 * Bu blokta "sponsor" kelimesi YOK ve olmamalı: Apple 5.3.2 çekilişin
 * sponsorunun geliştirici olmasını istiyor, `raffleLegal.ts` de ödülü
 * sağlayanın sponsor olmadığını söylüyor. Testi bunu tutuyor.
 */
export function PrizeProviders({ providers }: { providers: Pick<Sponsor, 'id' | 'name'>[] }) {
  const router = useRouter();
  if (!providers.length) return null;

  return (
    <View style={styles.root}>
      <Txt weight="semibold" size={12.5} color={colors.muted}>
        Ödülü sağlayan
      </Txt>
      <View style={styles.chips}>
        {providers.map((p) => (
          <Pressable
            key={p.id}
            onPress={() => router.push(`/sponsor/${p.id}`)}
            accessibilityRole="button"
            accessibilityLabel={`Ödülü sağlayan: ${p.name}`}
            style={({ pressed }) => [styles.chip, pressed && { borderColor: colors.blue500 }]}
          >
            <Txt weight="semibold" size={12.5} color={colors.navy700}>
              {p.name}
            </Txt>
            <Txt size={12.5} color={colors.blue500}>
              ›
            </Txt>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { marginTop: 16 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: colors.blue200,
    borderRadius: radius.sm,
    paddingHorizontal: 11,
    paddingVertical: 7,
    backgroundColor: colors.surface,
  },
});
```

- [ ] **Step 4: Etkinlik detayına bağla**

`app/etkinlik/[id].tsx`:
- İçe aktarımlar:

```tsx
import { PrizeProviders } from '../../src/components/PrizeProviders';
import { useSponsors } from '../../src/sponsors';
```
- `const raffle = getRaffle(event.id);` satırı hook'lardan sonra geliyor; hook
  kuralı için `useSponsors()` çağrısı mevcut hook çağrılarının yanına (ekranın
  en üstü, `useContent()` satırının altı):
  `const { sponsors } = useSponsors();`
- "Etkinlik hakkında" bloğunda etiketleri çizen `<View style={styles.tags}>…</View>`
  kapanışının hemen altına:

```tsx
          {/* Çekilişte ödülü sağlayan kurum. Çekiliş kuralları "böyle bir taraf
              varsa etkinliğin açıklamasında belirtilir" diyor — burası orası. */}
          {raffle ? (
            <PrizeProviders providers={sponsors.filter((s) => s.eventIds.includes(event.id))} />
          ) : null}
```

- [ ] **Step 5: Doğrula**

Run: `npx jest src/__tests__/prize-providers.test.tsx && npm run typecheck`
Expected: PASS. Kırmızı sınaması: bileşendeki başlığı geçici olarak "Sponsor"
yap → ilk test kırmızı → geri al.

- [ ] **Step 6: Commit**

```bash
graphify update .
git add src/components/PrizeProviders.tsx "app/etkinlik/[id].tsx" src/__tests__/prize-providers.test.tsx graphify-out/
git commit -m "feat(çekiliş): \"Ödülü sağlayan\" etiketi kurum sayfasına gidiyor — sponsor kelimesi yok"
```

---

### Task 13: Hesabım — KULÜP grubu

**Files:**
- Modify: `app/(tabs)/hesap.tsx`

- [ ] **Step 1: Grup ve erişilebilirlik**

`app/(tabs)/hesap.tsx`:
- `<GroupLabel style={styles.groupLabel}>AYARLAR</GroupLabel>` satırının hemen
  üstüne (oturum koşulunun dışında):

```tsx
        {/* Oturumsuz da görünüyor: sponsorlar hesaba bağlı değil (5.1.1(v)). */}
        <GroupLabel style={styles.groupLabel}>KULÜP</GroupLabel>
        <View style={styles.card}>
          <SatirLink
            icon="grid"
            label="Sponsorlarımız"
            hint="Kulübü destekleyen kurumlar"
            onPress={() => router.push('/sponsorlar')}
          />
        </View>
```
- `SatirLink` içindeki `Pressable`'a `accessibilityLabel={label}` ekle.

- [ ] **Step 2: Doğrula**

Run: `npm run typecheck && npm run check:release`
Expected: PASS ("hesap sekmesi ve bildirim ayarları yerinde" yeşil).

- [ ] **Step 3: Commit**

```bash
graphify update .
git add "app/(tabs)/hesap.tsx" graphify-out/
git commit -m "feat(hesap): KULÜP → Sponsorlarımız, oturumsuz da görünüyor"
```

---

### Task 14: `check:release` kapsamı, belgeler, tam doğrulama

**Files:**
- Modify: `scripts/check-release.mjs`, `CLAUDE.md`

- [ ] **Step 1: "sponsor ekranları bağlı" kontrolü**

`scripts/check-release.mjs` → Task 6'daki kontrolün hemen altına:

```js
check(
  'sponsor ekranları bağlı',
  'Ekranın var olması ona gidilebildiği anlamına gelmiyor — bu depo aynı hatayı ' +
    'giriş ekranlarında ve sertifikalarda yaşadı. Kopan halkanın belirtisi bir hata ' +
    'değil, görünmeyen bir bölüm: panelden veri girilir, uygulamada hiçbir şey çıkmaz.',
  () => {
    const strip = (src) => src.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');
    for (const f of ['app/sponsorlar.tsx', 'app/sponsor/[id].tsx']) {
      if (!existsSync(join(root, f))) return `${f} yok`;
    }
    const layout = strip(read('app/_layout.tsx'));
    if (!/name="sponsorlar"/.test(layout)) return 'sponsorlar rotası kök yığına kayıtlı değil';
    if (!/name="sponsor\/\[id\]"/.test(layout)) return 'sponsor/[id] rotası kök yığına kayıtlı değil';
    if (!/<SponsorsProvider\b/.test(layout)) return 'SponsorsProvider mount edilmiyor';

    const hesap = strip(read('app/(tabs)/hesap.tsx'));
    if (!/['"`]\/sponsorlar['"`]/.test(hesap)) return 'Hesabım sponsorlar ekranına bağlanmıyor';

    const ana = strip(read('app/(tabs)/index.tsx'));
    if (!/<HomeSlider\b/.test(ana)) return 'ana sayfa slider’ı çizmiyor';
    if (!/['"`]\/sponsorlar['"`]/.test(ana)) return 'ana sayfa sponsorlar ekranına bağlanmıyor';

    const etkinlik = strip(read('app/etkinlik/[id].tsx'));
    if (!/<PrizeProviders\b/.test(etkinlik)) return 'etkinlik detayı "Ödülü sağlayan" etiketini çizmiyor';
    return null;
  },
);
```

- [ ] **Step 2: Kırmızı sınaması**

Her biri ayrı, sonra geri al; `npm run check:release` her seferinde bu
kontrolü kırmızı vermeli:
1. `app/_layout.tsx`'ten `<Stack.Screen name="sponsor/[id]" />` satırını sil.
2. `app/_layout.tsx`'te `<SponsorsProvider>` sarmasını kaldır.
3. `app/(tabs)/hesap.tsx`'te KULÜP grubunu yorum satırına al (strip onu atıyor
   olmalı — yorumdaki `'/sponsorlar'` kontrolü yeşile boyamamalı).
4. `app/(tabs)/index.tsx`'te `<HomeSlider … />` satırını sil.
5. `app/etkinlik/[id].tsx`'te `<PrizeProviders … />` satırını sil.

- [ ] **Step 3: Belgeler**

`CLAUDE.md` → "Veri: kim neyi okuyor, kim yazıyor" tablosuna, `devices`
satırının altına:

```
| `sponsors` | okur — `useSponsors` (`src/sponsors.tsx` → `fetchSponsors`, yalnız `active`): Ana Sayfa, `sponsorlar`, `sponsor/[id]`, `etkinlik/[id]` ("Ödülü sağlayan") | yazar: `/sponsorlar` (`admin/vitrin.ts`) |
| `slides` | okur — `useSlides` (`src/slides.ts` → `fetchSlides`, yalnız `active`, `endsAt` süzmesi): Ana Sayfa | yazar: `/slider`; süresi doleni `startSlideSweeper` siliyor |
```

"İçerik girişi" paragrafının sonuna bir cümle: "Slider ve sponsorlar
panelin `/slider` ve `/sponsorlar` sayfalarından giriliyor; görseller aynı
Supabase bucket'ında `slides/` ve `sponsors/` klasörlerinde."

- [ ] **Step 4: Tam doğrulama**

Run, sırayla ve her birinin çıkış kodunu ayrı oku (`check:all | tail` her zaman
0 döner, boru kullanma):

```bash
npm run check:all
npm run check:rules
npx expo export --platform ios
npm run check:bundle
```
Expected: dördü de 0 ile çıkıyor; `check:all` sonunda Jest "Tests: … passed".

- [ ] **Step 5: Commit ve push**

```bash
graphify update .
git add scripts/check-release.mjs CLAUDE.md graphify-out/
git commit -m "chore(vitrin): check:release sponsor ekranları bağlı, CLAUDE.md veri tablosu"
git push -u origin claude/wonderful-johnson-qgvpar
```

- [ ] **Step 6: Son inceleme**

`fable-reviewer` alt ajanına dalın tamamını incelet (spec + plan yolu ile). Critical
maddeleri düzelt, doğrulamayı (Step 4) yeniden koş, commit + push. PR açıklamasını
dağıtım yüzeyleri tablosuyla güncelle (spec §8): kurallar → panel → uygulama.
