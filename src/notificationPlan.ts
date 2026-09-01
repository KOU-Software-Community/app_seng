import type { ClubEvent } from './data';
import type { NotificationPrefs, Registration } from './store';

/**
 * Cihazda hangi bildirimlerin kurulacağına karar veren saf katman.
 *
 * Neden ayrı bir dosya: bu uygulamada artık **iki** şey bildirim kuruyor —
 * etkinlik hatırlatmaları ve AI Gündem'in günlük bülteni — ve zamanlayıcı işe
 * `cancelAllScheduledNotificationsAsync()` ile başlıyor. İki ayrı zamanlayıcı
 * olsaydı biri diğerinin bildirimlerini her yeniden planlamada sessizce silerdi:
 * hata yok, log yok, sadece gelmeyen bir bildirim. Karar tek yerde toplanıp saf
 * hâle getirildi; `notifications.tsx` yalnızca bu listeyi uyguluyor.
 *
 * Saf olması testin de tek şartı: `expo-notifications` olmadan, cihaz olmadan,
 * saat ilerletmeden çağrılabiliyor.
 */

/** Hatırlatma kategorisi — `NOTIFICATION_CATEGORIES` içindeki anahtar. */
export const REMINDER_CATEGORY = 'Hatırlatma';
/** Günlük bülten kategorisi. */
export const DIGEST_CATEGORY = 'AI Gündem';

/** Sessiz saatler: bu aralıkta hiçbir *otomatik* bildirim çalmıyor. */
export const QUIET_START_HOUR = 23;
export const QUIET_END_HOUR = 8;

export type PlannedNotification =
  | {
      kind: 'reminder';
      title: string;
      body: string;
      data: { eventId: string };
      /** Tek seferlik, kesin an. */
      date: Date;
    }
  | {
      kind: 'digest';
      title: string;
      body: string;
      data: Record<string, never>;
      /** Her gün tekrarlıyor. */
      daily: { hour: number; minute: number };
    };

/** `REMINDER_OPTIONS` girdilerinin milisaniye karşılığı. */
export function reminderOffsetMs(option: string): number {
  if (option.startsWith('1 saat')) return 60 * 60 * 1000;
  if (option.startsWith('3 gün')) return 3 * 24 * 60 * 60 * 1000;
  return 24 * 60 * 60 * 1000; // "1 gün önce" — mağazadaki varsayılan.
}

/** Gece yarısına düşen bir hatırlatmayı 08:00'e taşır. */
export function applyQuietHours(when: Date): Date {
  const hour = when.getHours();
  if (hour >= QUIET_END_HOUR && hour < QUIET_START_HOUR) return when;

  const shifted = new Date(when);
  // 23:00–23:59 ertesi sabahı bekliyor; 00:00–07:59 aynı sabahı kullanıyor.
  if (hour >= QUIET_START_HOUR) shifted.setDate(shifted.getDate() + 1);
  shifted.setHours(QUIET_END_HOUR, 0, 0, 0);
  return shifted;
}

/** Geçerli bir saat mi — bozuk bir tercih bülteni gece yarısına atmasın. */
export const isDigestHour = (value: unknown): value is number =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 23;

export function planNotifications(input: {
  events: ClubEvent[];
  registrations: Registration[];
  prefs: NotificationPrefs;
  now?: Date;
}): PlannedNotification[] {
  const { events, registrations, prefs } = input;
  const now = (input.now ?? new Date()).getTime();

  if (!prefs.master) return [];

  const planned: PlannedNotification[] = [];

  if (prefs.categories[REMINDER_CATEGORY] !== false) {
    const offset = reminderOffsetMs(prefs.reminder);

    for (const registration of registrations) {
      const event = events.find((e) => e.id === registration.eventId);
      if (!event) continue;

      const startsAt = new Date(event.startsAt);
      if (Number.isNaN(startsAt.getTime())) continue;

      let when = new Date(startsAt.getTime() - offset);
      if (prefs.quietHours) when = applyQuietHours(when);

      // Geçmişteki bir hatırlatma gürültü; sessiz saatlerin etkinliğin kendisinden
      // sonraya ittiği bir hatırlatma hiç olmamasından kötü.
      if (when.getTime() <= now || when >= startsAt) continue;

      planned.push({
        kind: 'reminder',
        title: event.title,
        body: `${event.time} · ${prefs.reminder} hatırlatma. Kayıt kodun: ${registration.code}`,
        data: { eventId: event.id },
        date: when,
      });
    }
  }

  if (prefs.categories[DIGEST_CATEGORY] !== false && isDigestHour(prefs.digestHour)) {
    // Sessiz saatler bülteni **taşımıyor**, bilerek: saati kullanıcı kendi
    // seçiyor. Seçilen saati "sessiz" diye kaydırmak, ayarın söylediğinden
    // başka bir zamanda çalan bir bildirim demek olurdu — bu deponun why-log'u
    // aynı hatayı takvim tarafında bir kez kaydetmiş.
    planned.push({
      kind: 'digest',
      title: 'Günün AI bülteni',
      body: 'Bugünün beş başlığı hazır.',
      data: {},
      daily: { hour: prefs.digestHour, minute: 0 },
    });
  }

  return planned;
}
