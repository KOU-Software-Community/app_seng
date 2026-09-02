import { clubCalendar } from '../../eventSchema';

/**
 * Turkish relative time.
 *
 * The DTO carries an ISO instant (`publishedAt`); the prototype showed "2 saat
 * önce" / "dün". P1 deliberately kept the label out of the DTO — presentation
 * belongs here — so this is the formatter that keeps prototype parity.
 *
 * Beyond a week a relative label stops being useful ("47 gün önce" tells nobody
 * anything), so it switches to an absolute Turkish date.
 */

const MONTHS_TR = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
] as const;

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Past this age, show the date instead of a relative label. */
export const ABSOLUTE_AFTER_DAYS = 7;

/**
 * "20 Ağustos" — aynı yıl; "20 Ağustos 2025" — başka yıl.
 *
 * Takvim alanları cihazın saat diliminden değil kulübün saatinden (+03:00)
 * okunuyor. `getDate()` cihazın dilimini okur ve +03:00'ın batısındaki her
 * telefonda tarihi bir gün erken gösterirdi — aynı makale, Takvim sekmesindeki
 * bir etkinlikle çelişen bir tarih taşırdı.
 */
export function absoluteTr(date: Date, now: Date): string {
  const then = clubCalendar(date);
  const today = clubCalendar(now);
  const month = MONTHS_TR[then.month];
  return then.year === today.year
    ? `${then.day} ${month}`
    : `${then.day} ${month} ${then.year}`;
}

/** İki anın kulüp saatindeki takvim günü farkı. */
function calendarDaysBetween(then: Date, now: Date): number {
  const a = clubCalendar(then);
  const b = clubCalendar(now);
  return Math.round(
    (Date.UTC(b.year, b.month, b.day) - Date.UTC(a.year, a.month, a.day)) / DAY,
  );
}

/**
 * Format an ISO instant relative to `now`.
 *
 * An unparseable value returns an empty string and warns: a card with no
 * timestamp is survivable, a card reading "NaN saat önce" is not.
 */
export function relativeTimeTr(iso: string, now: Date = new Date()): string {
  const then = new Date(iso);
  const thenMs = then.getTime();
  if (Number.isNaN(thenMs)) {
    console.warn(`[relativeTime] "${iso}" is not a parseable instant.`);
    return '';
  }

  const elapsed = now.getTime() - thenMs;

  // A clock skew or a future publish date is not worth a wrong label.
  if (elapsed < 0) return 'az önce';
  if (elapsed < MINUTE) return 'az önce';

  if (elapsed < HOUR) {
    return `${Math.floor(elapsed / MINUTE)} dakika önce`;
  }
  if (elapsed < DAY) {
    return `${Math.floor(elapsed / HOUR)} saat önce`;
  }

  // "dün" ve "N gün önce" takvim ifadeleri; geçen milisaniye takvim taşımıyor.
  // Eski hâli 47 saat önce yayınlanmış bir habere "dün" diyordu (iki takvim günü
  // geçmişti) ve 25 saat öncesine "1 gün önce" (bir takvim günü). Sınır, bu
  // uygulamanın her yerinde olduğu gibi +03:00 gece yarısı.
  const days = calendarDaysBetween(then, now);
  if (days <= 0) return `${Math.floor(elapsed / HOUR)} saat önce`;
  if (days === 1) return 'dün';
  if (days <= ABSOLUTE_AFTER_DAYS) return `${days} gün önce`;

  return absoluteTr(then, now);
}
