import { DIGEST_HOURS, type ClubEvent } from '../data';
import {
  DIGEST_CATEGORY,
  REMINDER_CATEGORY,
  applyQuietHours,
  isDigestHour,
  planNotifications,
  reminderOffsetMs,
} from '../notificationPlan';
import type { NotificationPrefs, Registration } from '../store';

/**
 * Bu uygulamada artık iki şey bildirim kuruyor: etkinlik hatırlatmaları ve AI
 * Gündem'in günlük bülteni. Zamanlayıcı işe `cancelAllScheduledNotifications`
 * ile başladığı için ikisinin ayrı yaşaması mümkün değil — biri diğerini her
 * yeniden planlamada sessizce silerdi.
 *
 * Buradaki kontroller o birleşmeyi koruyor. En önemlisi sondaki ikisi: sessiz
 * saatlerin hatırlatmayı taşıdığı ama bülteni **taşımadığı**, ve tek bir planın
 * ikisini birden taşıyabildiği.
 */

const event = (over: Partial<ClubEvent> = {}): ClubEvent =>
  ({
    id: 'e1',
    startsAt: '2026-03-12T18:00',
    day: '12',
    mon: 'MAR',
    wd: 'Per',
    monthKey: '2026-03',
    title: 'Git Atölyesi',
    time: '18:00',
    short: 'Git',
    tag: 'Atölye',
    soon: false,
    badge: '',
    ...over,
  }) as ClubEvent;

const registration = (over: Partial<Registration> = {}): Registration =>
  ({
    eventId: 'e1',
    regId: 'e1__2020001',
    seatId: 'tok',
    code: 'KYK-1234',
    name: 'Ada',
    studentNo: '2020001',
    department: 'Bilgisayar',
    year: '3',
    ...over,
  }) as Registration;

const prefs = (over: Partial<NotificationPrefs> = {}): NotificationPrefs => ({
  master: true,
  categories: {},
  reminder: '1 gün önce',
  quietHours: false,
  digestHour: 8,
  ...over,
});

describe('reminderOffsetMs', () => {
  it('maps the three options, and anything else to one day', () => {
    expect(reminderOffsetMs('1 saat önce')).toBe(60 * 60 * 1000);
    expect(reminderOffsetMs('1 gün önce')).toBe(24 * 60 * 60 * 1000);
    expect(reminderOffsetMs('3 gün önce')).toBe(3 * 24 * 60 * 60 * 1000);
    expect(reminderOffsetMs('anlamsız')).toBe(24 * 60 * 60 * 1000);
  });
});

describe('applyQuietHours', () => {
  it('leaves a daytime instant alone', () => {
    const noon = new Date(2026, 2, 11, 12, 0);
    expect(applyQuietHours(noon).getHours()).toBe(12);
  });

  it('moves a small-hours instant to the same morning at 08:00', () => {
    const shifted = applyQuietHours(new Date(2026, 2, 11, 3, 30));
    expect(shifted.getHours()).toBe(8);
    expect(shifted.getDate()).toBe(11);
  });

  it('moves a late-night instant to the NEXT morning', () => {
    const shifted = applyQuietHours(new Date(2026, 2, 11, 23, 30));
    expect(shifted.getHours()).toBe(8);
    expect(shifted.getDate()).toBe(12);
  });
});

describe('planNotifications — reminders', () => {
  const now = new Date(2026, 2, 1, 12, 0);

  it('plans nothing at all when the master switch is off', () => {
    const plan = planNotifications({
      events: [event()],
      registrations: [registration()],
      prefs: prefs({ master: false }),
      now,
    });
    expect(plan).toEqual([]);
  });

  // Plan varsayılan olarak bülteni de taşıyor (kategori açık, saat geçerli), o
  // yüzden hatırlatmaya bakan kontroller listeyi süzüyor. Süzmeyi unutmak, bu
  // testleri yazarken üç kez kırmızı verdirdi — ve haklıydı.
  const reminders = (plan: ReturnType<typeof planNotifications>) =>
    plan.filter((p) => p.kind === 'reminder');

  it('plans one reminder per registration, offset from the start time', () => {
    const plan = reminders(
      planNotifications({
        events: [event()],
        registrations: [registration()],
        prefs: prefs(),
        now,
      }),
    );
    expect(plan).toHaveLength(1);
    const [item] = plan;
    expect(item.kind).toBe('reminder');
    if (item.kind !== 'reminder') return;
    expect(item.data.eventId).toBe('e1');
    expect(item.date).toEqual(new Date(new Date('2026-03-12T18:00').getTime() - 86_400_000));
  });

  it('skips a registration whose event is gone', () => {
    const plan = reminders(
      planNotifications({
        events: [],
        registrations: [registration()],
        prefs: prefs(),
        now,
      }),
    );
    expect(plan).toEqual([]);
  });

  it('skips a reminder that would fire in the past', () => {
    const plan = reminders(
      planNotifications({
        events: [event()],
        registrations: [registration()],
        prefs: prefs(),
        now: new Date(2026, 2, 12, 17, 0),
      }),
    );
    expect(plan).toEqual([]);
  });

  it('drops the category when it is switched off, without touching the digest', () => {
    const plan = planNotifications({
      events: [event()],
      registrations: [registration()],
      prefs: prefs({ categories: { [REMINDER_CATEGORY]: false } }),
      now,
    });
    expect(plan.map((p) => p.kind)).toEqual(['digest']);
  });
});

describe('planNotifications — digest', () => {
  const now = new Date(2026, 2, 1, 12, 0);
  const noEvents = { events: [], registrations: [] };

  it('repeats daily at the chosen hour', () => {
    const plan = planNotifications({ ...noEvents, prefs: prefs({ digestHour: 7 }), now });
    expect(plan).toHaveLength(1);
    const [item] = plan;
    if (item.kind !== 'digest') throw new Error('bülten bekleniyordu');
    expect(item.daily).toEqual({ hour: 7, minute: 0 });
  });

  /**
   * Yerel bir günlük zamanlayıcı, kurulduğu gün yarının bülteninin var olup
   * olmadığını bilemez. Eskiden metin "Bugünün beş başlığı hazır." diyordu ve
   * bülten üretilmemişken de aynen çalıyordu — olmayan bir şeyin hazır
   * olduğunu söylemek.
   */
  it('içerik hakkında iddiada bulunmuyor', () => {
    const [item] = planNotifications({ ...noEvents, prefs: prefs(), now });
    if (item.kind !== 'digest') throw new Error('bülten bekleniyordu');
    expect(item.body).not.toMatch(/hazır/i);
    expect(item.body).not.toMatch(/beş/i);
  });

  /** Eskiden `data` boştu; dokunmak hiçbir yere gitmiyordu. */
  it('dokununca Bülten sekmesini açacak veriyi taşıyor', () => {
    const [item] = planNotifications({ ...noEvents, prefs: prefs(), now });
    if (item.kind !== 'digest') throw new Error('bülten bekleniyordu');
    expect(item.data).toEqual({ tab: 'bulten' });
  });

  it('is absent when the category is off', () => {
    const plan = planNotifications({
      ...noEvents,
      prefs: prefs({ categories: { [DIGEST_CATEGORY]: false } }),
      now,
    });
    expect(plan).toEqual([]);
  });

  it('is absent for an hour that is not an hour', () => {
    for (const bad of [-1, 24, 8.5, NaN, undefined]) {
      const plan = planNotifications({
        ...noEvents,
        prefs: prefs({ digestHour: bad as number }),
        now,
      });
      expect(plan).toEqual([]);
    }
    expect(isDigestHour(0)).toBe(true);
    expect(isDigestHour(23)).toBe(true);
  });

  /**
   * The decision this file exists to protect. Quiet hours move an automatic
   * reminder, because nobody chose 03:00 for it. They must NOT move the digest:
   * the user picked that hour by hand, and a notification arriving at a time the
   * settings screen does not show is the same defect this repo already recorded
   * on the calendar side.
   */
  it('is NOT moved by quiet hours, even when the chosen hour is inside them', () => {
    const plan = planNotifications({
      ...noEvents,
      prefs: prefs({ digestHour: 6, quietHours: true }),
      now,
    });
    const [item] = plan;
    if (item.kind !== 'digest') throw new Error('bülten bekleniyordu');
    expect(item.daily.hour).toBe(6);
  });
});

describe('planNotifications — the merge itself', () => {
  /**
   * One plan carries both. If these ever came from two schedulers, the second
   * `cancelAllScheduledNotificationsAsync()` would delete the first one's work —
   * no error, no log, just a notification that stops arriving.
   */
  it('returns reminders and the digest together', () => {
    const plan = planNotifications({
      events: [event()],
      registrations: [registration()],
      prefs: prefs({ digestHour: 9 }),
      now: new Date(2026, 2, 1, 12, 0),
    });
    expect(plan.map((p) => p.kind).sort()).toEqual(['digest', 'reminder']);
  });
});

describe('DIGEST_HOURS', () => {
  /**
   * Bülten sunucuda İstanbul saatiyle 06:30–06:50 arasında hazır oluyor. Daha
   * erken bir saat sunmak, henüz üretilmemiş bir bülten için bildirim göndermek
   * demek — kullanıcı açar, "hazırlanıyor" görür ve bildirimin neden geldiğini
   * anlamaz.
   */
  it('offers no hour before the digest can exist', () => {
    expect(DIGEST_HOURS.length).toBeGreaterThan(0);
    for (const hour of DIGEST_HOURS) {
      expect(hour).toBeGreaterThanOrEqual(7);
      expect(isDigestHour(hour)).toBe(true);
    }
  });

  it('offers the default the store ships with', () => {
    expect(DIGEST_HOURS).toContain(8);
  });
});
