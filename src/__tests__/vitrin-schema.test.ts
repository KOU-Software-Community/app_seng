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
