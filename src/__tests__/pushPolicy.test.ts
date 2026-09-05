import type { ClubEvent } from '../data';
import {
  decideCancelledEvent,
  decideNewEvent,
  decideRaffleResult,
  inClubQuietHours,
  nextQuietEnd,
  pushCategoryFor,
  pushLogId,
  selectTargets,
  type DeviceRow,
} from '../pushPolicy';

/**
 * Otomatik bildirimin kararları.
 *
 * Buradaki iddiaların çoğu "gönderiliyor mu" değil **"gönderilmiyor mu"**.
 * Gelmeyen bir bildirim can sıkar; gelmemesi gereken bir bildirim güveni bozar
 * ve geri alınamaz — bir kez telefonu titrettikten sonra düzeltmesi yok.
 */

const NOW = new Date('2026-09-10T09:00:00+03:00');

const event = (over: Partial<ClubEvent> = {}): ClubEvent =>
  ({
    id: 'ev1',
    startsAt: '2026-09-20T18:00:00+03:00',
    day: '20',
    mon: 'EYL',
    time: '18:00',
    title: 'React Native Atölyesi',
    tag: 'Atölye',
    ...over,
  }) as ClubEvent;

describe('pushCategoryFor', () => {
  it('bildirim anahtarı olan etiketleri olduğu gibi bırakıyor', () => {
    expect(pushCategoryFor('Atölye')).toBe('Atölye');
    expect(pushCategoryFor('Çekiliş')).toBe('Çekiliş');
  });

  /**
   * `EVENT_CATEGORIES`, `NOTIFICATION_CATEGORIES`'ten geniş. Karşılığı olmayan
   * etiketi düşürmek, o etkinliklerin hiç duyurulmaması demek olurdu.
   */
  it('karşılığı olmayan etiketi Duyuru’ya düşürüyor', () => {
    expect(pushCategoryFor('Teknik Gezi')).toBe('Duyuru');
    expect(pushCategoryFor('Yarışma')).toBe('Duyuru');
    expect(pushCategoryFor('')).toBe('Duyuru');
  });

  /** Yerel bildirimler sunucudan gönderilmiyor; kategorileri push hedefi değil. */
  it('Hatırlatma ve AI Gündem push kategorisi değil', () => {
    expect(pushCategoryFor('Hatırlatma')).toBe('Duyuru');
    expect(pushCategoryFor('AI Gündem')).toBe('Duyuru');
  });
});

describe('decideNewEvent', () => {
  it('yeni etkinliği kendi kategorisine duyuruyor', () => {
    const d = decideNewEvent({ event: event(), editing: false, now: NOW });
    if (!d.send) throw new Error(`gönderilmeliydi: ${d.reason}`);
    expect(d.payload.category).toBe('Atölye');
    expect(d.payload.title).toBe('Yeni atölye');
    expect(d.payload.body).toContain('React Native Atölyesi');
    expect(d.payload.data).toEqual({ eventId: 'ev1' });
    expect(d.logId).toBe('event_created__ev1');
  });

  /**
   * Otomasyonun en kolay düşeceği hata: operatör bir yazım hatasını düzeltmek
   * için formu kaydediyor ve herkese ikinci bir "yeni atölye" gidiyor.
   */
  it('DÜZENLEMEDE göndermiyor', () => {
    const d = decideNewEvent({ event: event(), editing: true, now: NOW });
    expect(d.send).toBe(false);
  });

  /** Arşiv kaydı ve geçmiş tarihli giriş: kimsenin katılamayacağı bir şey. */
  it('geçmiş tarihli etkinliği duyurmuyor', () => {
    const past = event({ startsAt: '2026-09-01T18:00:00+03:00' });
    expect(decideNewEvent({ event: past, editing: false, now: NOW }).send).toBe(false);
  });

  it('okunamayan tarihte göndermiyor', () => {
    const broken = event({ startsAt: 'yarın falan' });
    expect(decideNewEvent({ event: broken, editing: false, now: NOW }).send).toBe(false);
  });

  it('Türkçe küçültme doğru — I harfi', () => {
    const d = decideNewEvent({ event: event({ tag: 'Yarışma' }), editing: false, now: NOW });
    if (!d.send) throw new Error('gönderilmeliydi');
    expect(d.payload.title).toBe('Yeni yarışma');
    // Etiketin karşılığı yok; kategori Duyuru’ya düşüyor ama başlık etiketi anıyor.
    expect(d.payload.category).toBe('Duyuru');
  });
});

describe('decideCancelledEvent', () => {
  it('duyurulmuş bir etkinliğin iptalini bildiriyor', () => {
    const d = decideCancelledEvent({ event: event(), announced: true, now: NOW });
    if (!d.send) throw new Error(`gönderilmeliydi: ${d.reason}`);
    expect(d.payload.title).toBe('Etkinlik iptal edildi');
    expect(d.logId).toBe('event_cancelled__ev1');
  });

  /**
   * Otomasyonun üretebileceği en garip bildirim: kullanıcının hiç duymadığı bir
   * etkinliğin iptal edildiğini söylemek.
   */
  it('hiç duyurulmamış etkinliğin iptalini BİLDİRMİYOR', () => {
    expect(decideCancelledEvent({ event: event(), announced: false, now: NOW }).send).toBe(false);
  });

  /** Geçmiş bir kaydı temizlemek bir iptal değil, bakım. */
  it('geçmiş etkinliğin silinmesini bildirmiyor', () => {
    const past = event({ startsAt: '2026-09-01T18:00:00+03:00' });
    expect(decideCancelledEvent({ event: past, announced: true, now: NOW }).send).toBe(false);
  });

  /** Dokununca silinmiş etkinliğin "bulunamadı" ekranı açılmasın. */
  it('dokunma hedefi taşımıyor', () => {
    const d = decideCancelledEvent({ event: event(), announced: true, now: NOW });
    if (!d.send) throw new Error('gönderilmeliydi');
    expect(d.payload.data).toEqual({});
  });
});

describe('decideRaffleResult', () => {
  it('kazananlar girilince bildiriyor', () => {
    const d = decideRaffleResult({ event: event({ tag: 'Çekiliş' }), winners: ['Elif Y.'] });
    if (!d.send) throw new Error('gönderilmeliydi');
    expect(d.payload.category).toBe('Çekiliş');
    expect(d.logId).toBe('raffle_drawn__ev1');
  });

  /** Boş liste "sonucu geri al" demek; onu duyurmak olmamış bir çekilişi ilan etmek. */
  it('boş kazanan listesinde göndermiyor', () => {
    expect(decideRaffleResult({ event: event(), winners: [] }).send).toBe(false);
  });
});

describe('pushLogId', () => {
  it('aynı olay için hep aynı kimliği üretiyor', () => {
    expect(pushLogId('event_created', 'ev1')).toBe(pushLogId('event_created', 'ev1'));
    expect(pushLogId('event_created', 'ev1')).not.toBe(pushLogId('event_cancelled', 'ev1'));
  });
});

describe('selectTargets', () => {
  const device = (id: string, over: Partial<DeviceRow['data']> = {}): DeviceRow => ({
    id,
    data: { token: `tok-${id}`, master: true, categories: {}, quietHours: false, ...over },
  });

  it('açık cihazlara gönderiyor', () => {
    const s = selectTargets([device('a'), device('b')], 'Atölye', false);
    expect(s.send.map((t) => t.id)).toEqual(['a', 'b']);
    expect(s.defer).toEqual([]);
  });

  it('ana anahtarı kapalı cihazı atlıyor', () => {
    const s = selectTargets([device('a', { master: false })], 'Atölye', false);
    expect(s.send).toEqual([]);
    expect(s.skipped.master).toBe(1);
  });

  it('kategorisi kapalı cihazı atlıyor', () => {
    const s = selectTargets([device('a', { categories: { Atölye: false } })], 'Atölye', false);
    expect(s.send).toEqual([]);
    expect(s.skipped.category).toBe(1);
  });

  /**
   * Kategori cihaz kaydı yazıldıktan sonra eklenmiş olabilir. Kapalı saymak,
   * yeni bir kategoriyi kimsenin almaması demek olurdu.
   */
  it('bilinmeyen kategoriyi açık sayıyor', () => {
    const s = selectTargets([device('a', { categories: {} })], 'Yeni Kategori', false);
    expect(s.send).toHaveLength(1);
  });

  it('token’ı olmayan kaydı atlıyor', () => {
    const s = selectTargets([device('a', { token: '' }), device('b', { token: 42 })], 'Atölye', false);
    expect(s.send).toEqual([]);
    expect(s.skipped.noToken).toBe(2);
  });

  /** Atlamıyor — erteliyor. Eski davranış bu kullanıcıları tamamen düşürüyordu. */
  it('sessiz saatlerde ayarı açık olanı erteliyor, kapalı olanı göndermeye devam ediyor', () => {
    const s = selectTargets(
      [device('sessiz', { quietHours: true }), device('acik', { quietHours: false })],
      'Atölye',
      true,
    );
    expect(s.defer.map((t) => t.id)).toEqual(['sessiz']);
    expect(s.send.map((t) => t.id)).toEqual(['acik']);
  });
});

describe('sessiz saatler — kulüp saatiyle', () => {
  /**
   * Panel bir konteynerde koşuyor ve dilimi genellikle UTC. Sunucunun kendi
   * saatiyle hesaplanan bir pencere üç saat kaymış olurdu.
   */
  it('23:00–08:00 +03:00 arasını sessiz sayıyor', () => {
    expect(inClubQuietHours(new Date('2026-09-10T23:30:00+03:00'))).toBe(true);
    expect(inClubQuietHours(new Date('2026-09-10T03:00:00+03:00'))).toBe(true);
    expect(inClubQuietHours(new Date('2026-09-10T07:59:00+03:00'))).toBe(true);
    expect(inClubQuietHours(new Date('2026-09-10T08:00:00+03:00'))).toBe(false);
    expect(inClubQuietHours(new Date('2026-09-10T22:59:00+03:00'))).toBe(false);
  });

  it('UTC gösterimiyle aynı anı aynı şekilde yorumluyor', () => {
    // 21:00 UTC = 00:00 +03:00 → sessiz.
    expect(inClubQuietHours(new Date('2026-09-10T21:00:00Z'))).toBe(true);
    // 06:00 UTC = 09:00 +03:00 → sessiz değil.
    expect(inClubQuietHours(new Date('2026-09-10T06:00:00Z'))).toBe(false);
  });

  it('gece yarısından önce yakalananı ertesi sabaha atıyor', () => {
    const end = nextQuietEnd(new Date('2026-09-10T23:30:00+03:00'));
    expect(end.toISOString()).toBe(new Date('2026-09-11T08:00:00+03:00').toISOString());
  });

  it('gece yarısından sonra yakalananı aynı sabaha atıyor', () => {
    const end = nextQuietEnd(new Date('2026-09-11T02:00:00+03:00'));
    expect(end.toISOString()).toBe(new Date('2026-09-11T08:00:00+03:00').toISOString());
  });

  it('ay sonunu doğru döndürüyor', () => {
    const end = nextQuietEnd(new Date('2026-09-30T23:30:00+03:00'));
    expect(end.toISOString()).toBe(new Date('2026-10-01T08:00:00+03:00').toISOString());
  });
});
