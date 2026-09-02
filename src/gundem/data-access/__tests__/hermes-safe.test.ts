import { clubCalendar } from '../../../eventSchema';
import { absoluteTr, relativeTimeTr } from '../../format/relativeTime';
import { todayLineTr } from '../../screens/FeedView';
import { cursorOf, decodeCursor, encodeCursor } from '../cursor';
import { compareArticles } from '../mock/mapper';
import { tileFromSlug } from '../supabase/mapper';
import type { Article } from '../../domain/types';

/**
 * Taşınan kodun bu çalışma zamanı hakkında yanlış olan varsayımları.
 *
 * Hepsi aynı sınıftan: kaynak uygulama tarayıcı ya da Node varsayıyordu, burada
 * Hermes var. Biri cihazda zaten patlamıştı (`crypto.getRandomValues`), geri
 * kalanı bu dosyanın konusu.
 */

describe('cursor base64 — no browser and no Node', () => {
  /**
   * En önemli test: Hermes'i birebir taklit ediyor.
   *
   * Eski kod `typeof btoa === 'function' ? btoa(...) : Buffer.from(...)` idi ve
   * "ya tarayıcı ya Node" varsayıyordu. Jest **Node** olduğu için orada hep
   * yeşildi; cihazda ise ikisi de yok ve ikinci dal
   * `ReferenceError: Property 'Buffer' doesn't exist` ile düşüyordu. Globalleri
   * silmek, testi cihazın gördüğü dünyaya sokmanın tek yolu.
   */
  it('round-trips with btoa, atob and Buffer all removed', () => {
    const g = globalThis as Record<string, unknown>;
    const saved = { btoa: g.btoa, atob: g.atob, Buffer: g.Buffer };
    delete g.btoa;
    delete g.atob;
    delete g.Buffer;
    try {
      const cursor = cursorOf('2026-08-20T06:41:00.000Z', 'a1b2');
      const decoded = decodeCursor(encodeCursor(cursor));
      expect(decoded).not.toBeNull();
      expect(decoded?.publishedAt).toBe('2026-08-20T06:41:00.000Z');
      expect(decoded?.id).toBe('a1b2');
    } finally {
      Object.assign(g, saved);
    }
  });

  it('survives Turkish text in the id — UTF-8, not latin-1', () => {
    const cursor = cursorOf('2026-08-20T06:41:00.000Z', 'şığüöç-İTÜ-😀');
    expect(decodeCursor(encodeCursor(cursor))?.id).toBe('şığüöç-İTÜ-😀');
  });

  it('emits URL-safe output only', () => {
    const encoded = encodeCursor(cursorOf('2026-08-20T06:41:00.000Z', '////++++'));
    expect(encoded).not.toMatch(/[+/=]/);
  });

  it('still refuses something that is not one of ours', () => {
    expect(decodeCursor('bu-bir-cursor-degil')).toBeNull();
  });
});

describe('tileFromSlug — Turkish letters are kept, not deleted', () => {
  /**
   * Ölçülen eski davranış: `/[^a-z0-9]/gi` Türkçe harfleri süzüp atıyordu, yani
   * rozet yanlış harflerden kuruluyordu — düzeltilmesi gereken bir büyük/küçük
   * harf sorunu değil, eksik harf sorunu.
   */
  it('no longer produces "TY" for İTÜ', () => {
    expect(tileFromSlug('', 'İTÜ Yapay Zekâ')).toBe('İT');
  });

  it('no longer produces "IR" for şirket-blog', () => {
    expect(tileFromSlug('şirket-blog', '')).toBe('Şİ');
  });

  it('uppercases the Turkish way — i becomes İ', () => {
    expect(tileFromSlug('itu-yapay-zeka', '')).toBe('İT');
  });

  it('drops separators and keeps digits', () => {
    expect(tileFromSlug('4-hafta', '')).toBe('4H');
  });

  it('falls back when there is nothing to take', () => {
    expect(tileFromSlug('---', '')).toBe('??');
  });
});

describe('compareArticles — deterministic on every engine', () => {
  const at = (id: string, publishedAt = '2026-08-20T06:41:00.000Z'): Article =>
    ({ id, publishedAt }) as Article;

  /**
   * Eşitlik bozucu `localeCompare` idi ve Hermes onu platformun harmanlayıcısına
   * indiriyor. Sayfa sınırını belirleyen `isAfterCursor` ise düz `<` kullanıyor;
   * ikisi ayrışırsa sayfa 2 bir kaydı ya atlar ya iki kez gösterir.
   */
  it('orders equal timestamps by id descending, by code unit', () => {
    const ids = [at('a'), at('c'), at('b')].sort(compareArticles).map((a) => a.id);
    expect(ids).toEqual(['c', 'b', 'a']);
  });

  it('agrees with the plain comparison isAfterCursor uses', () => {
    const pair = [at('İ'), at('I')];
    const sorted = [...pair].sort(compareArticles).map((a) => a.id);
    const plain = [...pair].sort((x, y) => (x.id < y.id ? 1 : x.id > y.id ? -1 : 0)).map((a) => a.id);
    expect(sorted).toEqual(plain);
  });

  it('still puts the newer article first', () => {
    const older = at('z', '2026-08-19T06:41:00.000Z');
    const newer = at('a', '2026-08-20T06:41:00.000Z');
    expect([older, newer].sort(compareArticles)[0]).toBe(newer);
  });
});

describe('dates read the club clock, not the device', () => {
  /**
   * 19 Ağustos 22:30 UTC, kulüp saatiyle 20 Ağustos 01:30. Cihazın diliminden
   * okuyan eski kod bu testin ortamında (UTC) "19" diyordu; Takvim sekmesi ise
   * aynı anda "20" diyor, çünkü `todayLocal` +03:00 okuyor.
   */
  const AFTER_MIDNIGHT_IN_ISTANBUL = new Date('2026-08-19T22:30:00.000Z');

  it('clubCalendar shifts to +03:00', () => {
    const c = clubCalendar(AFTER_MIDNIGHT_IN_ISTANBUL);
    expect(c.day).toBe(20);
    expect(c.month).toBe(7); // Ağustos
    expect(c.year).toBe(2026);
  });

  it('the feed day line names the club’s day', () => {
    expect(todayLineTr(AFTER_MIDNIGHT_IN_ISTANBUL)).toBe('Perşembe, 20 Ağustos');
  });

  it('an absolute article date names the club’s day', () => {
    expect(absoluteTr(AFTER_MIDNIGHT_IN_ISTANBUL, new Date('2026-09-01T09:00:00.000Z'))).toBe(
      '20 Ağustos',
    );
  });

  /**
   * "dün" bir takvim ifadesi. 47 saat, iki takvim günü olabilir; 25 saat bir
   * takvim günü. Geçen milisaniye bunu bilmiyor.
   */
  it('“dün” means the previous calendar day, not 24-48 hours', () => {
    const published = new Date('2026-08-18T20:00:00.000Z'); // 18 Ağu 23:00 +03:00
    const now = new Date('2026-08-20T19:00:00.000Z'); // 20 Ağu 22:00 +03:00 — 47 saat
    expect(relativeTimeTr(published.toISOString(), now)).toBe('2 gün önce');
  });
});
