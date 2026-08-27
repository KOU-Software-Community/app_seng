import type { ClubEvent, EventFact } from './data';

/**
 * One place that turns what a human types into a `ClubEvent`.
 *
 * A ClubEvent carries the same facts several times over: `startsAt` is the
 * machine-readable start, and `day`, `mon`, `wd`, `monthKey`, `time`, `short`
 * and the three `facts` rows are all display strings derived from it plus the
 * venue. Typed by hand into a console those drift immediately — a date changed
 * in one field and not the other five is not a hypothetical, it is what happens
 * the first time an event moves.
 *
 * So nothing here is entered twice. The operator gives a date, a start and end
 * time, and a venue; everything shown on screen is computed from those.
 *
 * Both the admin and any seeding script go through `buildEvent`, so an event
 * that reaches Firestore has already been validated.
 */

export const MONTHS_LONG = [
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
];

/** Uppercase three-letter month, as the date tile shows it. */
const MONTHS_SHORT = [
  'OCA',
  'ŞUB',
  'MAR',
  'NİS',
  'MAY',
  'HAZ',
  'TEM',
  'AĞU',
  'EYL',
  'EKİ',
  'KAS',
  'ARA',
];

/** Monday-first, matching `WEEKDAYS` in data.ts and the calendar grid. */
const WEEKDAYS_SHORT = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];
const WEEKDAYS_LONG = [
  'Pazartesi',
  'Salı',
  'Çarşamba',
  'Perşembe',
  'Cuma',
  'Cumartesi',
  'Pazar',
];

/**
 * An explicit offset is required. "2026-03-12T18:00:00" without one means a
 * different instant depending on where it is read, and reminders are scheduled
 * off this value.
 */
const ISO_WITH_OFFSET =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::\d{2})?(Z|[+-]\d{2}:\d{2})$/;

const HHMM = /^([01]\d|2[0-3]):([0-5]\d)$/;

export type EventInput = {
  id: string;
  /** ISO 8601 with an explicit offset, e.g. 2026-03-12T18:00:00+03:00 */
  startsAt: string;
  /** HH:MM, end of the event. */
  endsAt: string;
  /** Full location, shown on the event detail's facts row. */
  venue: string;
  /**
   * Compact form for the calendar rows, e.g. "B Blok 204" against a venue of
   * "Müh. Fak. B Blok 204". Falls back to `venue` when left empty.
   */
  venueShort?: string;
  title: string;
  tag: string;
  desc: string;
  /** Kontenjan, metin olarak (formdan öyle geliyor). Boş ya da 0 = sınırsız. */
  capacity?: string;
  speaker: string;
  speakerRole: string;
  tags: string[];
  soon: boolean;
  badge: string;
  /**
   * Kaç kişi katıldı — etkinlik olduktan sonra panelden giriliyor. Formdan metin
   * geldiği için burada da metin; boş bırakmak geçerli, çünkü henüz olmamış bir
   * etkinliğin katılımcı sayısı yok.
   */
  attendance?: string;
};

export type BuildResult =
  | { ok: true; event: ClubEvent }
  | { ok: false; errors: Record<string, string> };

type Parsed = { year: number; month: number; day: number; hour: number; minute: number };

/**
 * Reads the wall-clock fields straight out of the string rather than going
 * through Date.
 *
 * `new Date(iso).getDate()` answers in whatever timezone the code happens to run
 * in, so the same event would render one day earlier on a server in UTC than on
 * a phone in Istanbul. The literal fields are what the club means, and the
 * offset stays in `startsAt` for reminder scheduling, which does need the
 * instant.
 */
export function parseIso(startsAt: string): Parsed | null {
  const m = ISO_WITH_OFFSET.exec(startsAt.trim());
  if (!m) return null;

  const [, y, mo, d, h, mi] = m;
  const parsed = {
    year: Number(y),
    month: Number(mo),
    day: Number(d),
    hour: Number(h),
    minute: Number(mi),
  };

  if (parsed.month < 1 || parsed.month > 12) return null;
  if (parsed.day < 1 || parsed.day > daysInMonth(parsed.year, parsed.month)) return null;
  return parsed;
}

export function daysInMonth(year: number, month: number): number {
  // Day 0 of the next month is the last day of this one.
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

/** Monday-first weekday index (0 = Monday), computed in UTC so it cannot shift. */
export function weekdayIndex(year: number, month: number, day: number): number {
  const sunday0 = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  return (sunday0 + 6) % 7;
}

/** "MART 2026" — the grouping key used by the calendar list. */
export function monthKeyOf(year: number, month: number): string {
  return `${MONTHS_LONG[month - 1].toLocaleUpperCase('tr')} ${year}`;
}

/** "Mart 2026" — the heading on the calendar grid. */
export function monthLabelOf(year: number, month: number): string {
  return `${MONTHS_LONG[month - 1]} ${year}`;
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * Turkey has been permanently UTC+3 since 2016 — no DST, no second offset to
 * pick between. So the panel never asks for a timezone: it shows a date picker
 * and a time picker and stamps the offset itself, which is what makes a
 * malformed `startsAt` impossible to type.
 */
export const LOCAL_OFFSET = '+03:00';

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/;

/**
 * `2026-03-12` + `18:00` → `2026-03-12T18:00:00+03:00`.
 *
 * Returns an empty string when either half is missing or malformed, so the
 * caller lands on `buildEvent`'s ordinary date error rather than on a
 * half-built string that happens to parse as something else. `<input
 * type="date">` already normalises what a person picks; this is what stops a
 * hand-rolled POST from getting further.
 */
export function joinLocal(date: string, time: string): string {
  const d = (date ?? '').trim();
  const t = (time ?? '').trim();
  if (!DATE_ONLY.test(d) || !HHMM.test(t)) return '';
  return `${d}T${t}:00${LOCAL_OFFSET}`;
}

/**
 * The inverse, for filling the pickers when an event is edited.
 *
 * The wall-clock fields are read literally — exactly as `parseIso` reads them —
 * and a stored offset other than +03:00 is deliberately *not* converted. Every
 * string the app shows is derived from those literal fields, so they are what
 * the event is as far as anyone reading the calendar is concerned; a form
 * showing a converted time would disagree with the row the operator just
 * clicked on.
 *
 * Saving then re-stamps the value as +03:00, which lines the machine-readable
 * instant back up with the time on screen. Nothing visible moves; what changes
 * is that the reminder for such an event stops firing at the wrong moment.
 *
 * Anything unparseable comes back empty rather than guessed.
 */
export function splitLocal(startsAt: string): { date: string; time: string } {
  const m = ISO_WITH_OFFSET.exec((startsAt ?? '').trim());
  if (!m) return { date: '', time: '' };

  const [, y, mo, d, h, mi] = m;
  return { date: `${y}-${mo}-${d}`, time: `${h}:${mi}` };
}

/**
 * What the panel offers in the category dropdown.
 *
 * It used to be a free-text box, and free text means one person types "atölye"
 * and the calendar shows a differently-cased chip next to "Söyleşi". An event
 * already stored with something off this list keeps it — this is the panel's
 * menu, not a rule the data model enforces.
 */
export const EVENT_CATEGORIES = [
  'Atölye',
  'Söyleşi',
  'Çekiliş',
  'Teknik Gezi',
  'Yarışma',
  'Duyuru',
];

/**
 * Validates and derives. Every message is aimed at whoever is filling the form,
 * so it says what to do rather than what failed.
 */
export function buildEvent(input: EventInput): BuildResult {
  const errors: Record<string, string> = {};
  const text = (v: string) => (v ?? '').trim();

  if (!/^[a-z0-9-]{2,40}$/.test(text(input.id))) {
    errors.id = 'Kimlik 2-40 karakter olmalı; küçük harf, rakam ve tire kullanın.';
  }

  const parsed = parseIso(input.startsAt ?? '');
  if (!parsed) {
    // Panelde tarih ve saat seçiciyle giriliyor, dolayısıyla buraya ancak
    // seçilmemiş ya da imkânsız bir tarih düşer. Biçim ayrıntısı EventInput'un
    // tip yorumunda; mesaj formu dolduran kişiye göre yazılmış.
    errors.startsAt = 'Geçerli bir tarih ve başlangıç saati seçin.';
  }

  if (!HHMM.test(text(input.endsAt))) {
    errors.endsAt = 'Bitiş saati HH:MM biçiminde olmalı, örneğin 20:30.';
  } else if (parsed) {
    const start = parsed.hour * 60 + parsed.minute;
    const [eh, em] = text(input.endsAt).split(':').map(Number);
    if (eh * 60 + em <= start) errors.endsAt = 'Bitiş saati başlangıçtan sonra olmalı.';
  }

  const capacity = text(input.capacity ?? '');
  if (capacity && !/^\d{1,6}$/.test(capacity)) {
    errors.capacity = 'Kontenjan 0 veya daha büyük bir tam sayı olmalı. Boş bırakırsanız sınırsız.';
  }

  const attendance = text(input.attendance ?? '');
  if (attendance && !/^\d{1,6}$/.test(attendance)) {
    errors.attendance = 'Katılımcı sayısı 0 veya daha büyük bir tam sayı olmalı.';
  }

  if (!text(input.title)) errors.title = 'Başlık boş olamaz.';
  if (!text(input.venue)) errors.venue = 'Yer boş olamaz.';
  if (!text(input.tag)) errors.tag = 'Kategori boş olamaz.';
  if (!text(input.desc)) errors.desc = 'Açıklama boş olamaz.';

  if (Object.keys(errors).length || !parsed) return { ok: false, errors };

  const { year, month, day, hour, minute } = parsed;
  const venue = text(input.venue);
  const venueShort = text(input.venueShort ?? '') || venue;
  const startTime = `${pad(hour)}:${pad(minute)}`;
  const endTime = text(input.endsAt);
  // En dash and middle dot, matching the rest of the UI copy.
  const timeRange = `${startTime} – ${endTime}`;
  const wdIndex = weekdayIndex(year, month, day);

  const facts: EventFact[] = [
    {
      icon: 'cal',
      label: 'Tarih',
      value: `${day} ${MONTHS_LONG[month - 1]} ${year}, ${WEEKDAYS_LONG[wdIndex]}`,
    },
    { icon: 'clock', label: 'Saat', value: timeRange },
    { icon: 'pin', label: 'Yer', value: venue },
  ];

  return {
    ok: true,
    event: {
      id: text(input.id),
      startsAt: input.startsAt.trim(),
      day: String(day),
      mon: MONTHS_SHORT[month - 1],
      wd: WEEKDAYS_SHORT[wdIndex],
      monthKey: monthKeyOf(year, month),
      title: text(input.title),
      time: `${timeRange} · ${venueShort}`,
      short: `${day} ${MONTHS_LONG[month - 1]} · ${venueShort}`,
      tag: text(input.tag),
      soon: !!input.soon,
      badge: text(input.badge),
      desc: text(input.desc),
      tags: (input.tags ?? []).map(text).filter(Boolean),
      speaker: text(input.speaker),
      speakerRole: text(input.speakerRole),
      facts,
      // 0 ile boş aynı şey: ikisi de sınırsız. Alan hiç yazılmıyor ki
      // "kontenjan 0" gibi okunmasın.
      ...(capacity && Number(capacity) > 0 ? { capacity: Number(capacity) } : {}),
      // Boşsa alan hiç yazılmıyor: Firestore'da `attendance: undefined` yazmak
      // hata verir ve `attendance: 0` "sıfır kişi geldi" demek olurdu.
      ...(attendance ? { attendance: Number(attendance) } : {}),
    },
  };
}

/**
 * Turns a stored event back into form values, so editing shows what was entered
 * rather than the derived strings.
 */
export function toInput(event: ClubEvent): EventInput {
  const saat = event.facts.find((f) => f.label === 'Saat')?.value ?? '';
  const yer = event.facts.find((f) => f.label === 'Yer')?.value ?? '';
  return {
    id: event.id,
    startsAt: event.startsAt,
    endsAt: saat.split('–')[1]?.trim() ?? '',
    venue: yer,
    // `time` is "18:00 – 20:30 · B Blok 204"; everything after the dot is the
    // compact venue.
    venueShort: event.time.split('·')[1]?.trim() ?? '',
    title: event.title,
    tag: event.tag,
    desc: event.desc,
    capacity: event.capacity === undefined ? '' : String(event.capacity),
    speaker: event.speaker,
    speakerRole: event.speakerRole,
    tags: event.tags ?? [],
    soon: event.soon,
    badge: event.badge,
    attendance: event.attendance === undefined ? '' : String(event.attendance),
  };
}

/**
 * Kalan yer.
 *
 * `capacity` yoksa ya da 0 ise sınırsız demek ve `null` dönüyor. Sayı döndürmek
 * "sınırsız" ile "sıfır yer kaldı"yı aynı değere indirirdi ve kayıt düğmesi
 * sınırsız bir etkinlikte kapanırdı.
 *
 * `registered` gerçek kayıt sayısı — `eventSeats` dokümanındaki kimlik
 * listesinin uzunluğu. Elle yazılan bir cümle değil.
 */
export function seatsLeft(event: ClubEvent, registered: number): number | null {
  if (!event.capacity || event.capacity <= 0) return null;
  return Math.max(0, event.capacity - Math.max(0, registered));
}

export function isFull(event: ClubEvent, registered: number): boolean {
  return seatsLeft(event, registered) === 0;
}

/** Detay ekranındaki kontenjan satırı — tek yerde, iki ekran aynı şeyi desin. */
export function seatsLabel(event: ClubEvent, registered: number): string {
  const left = seatsLeft(event, registered);
  if (left === null) return 'Sınırsız';
  if (left === 0) return 'Kontenjan doldu';
  return `${left} / ${event.capacity} yer kaldı`;
}

/**
 * Bugünün tarihi, `YYYY-MM-DD`, +03:00'a göre.
 *
 * Cihazın kendi saat diliminden okunmuyor: yurt dışındaki bir telefon, kulübün
 * takviminde hâlâ bugün olan bir etkinliği arşive düşmüş gösterirdi.
 */
export function todayLocal(now: Date): string {
  const local = new Date(now.getTime() + 3 * 60 * 60_000);
  return `${local.getUTCFullYear()}-${pad(local.getUTCMonth() + 1)}-${pad(local.getUTCDate())}`;
}

/**
 * Etkinlikleri takvim ve arşiv olarak ikiye ayırır.
 *
 * Arşiv ayrı bir koleksiyon değil; geçmiş etkinliğin ta kendisi. Ayrı tutmak,
 * aynı gerçek etkinliği iki kez girmek ve ikisinin birbirinden kayması demekti.
 *
 * Sınır gün bazında: 12 Mart'taki etkinlik 12 Mart boyunca takvimde kalır, 13
 * Mart'ta arşive geçer. Başlangıç anına göre bölmek, üç saatlik bir etkinliği
 * daha başlarken arşive atardı.
 */
/**
 * Etkinlik geçti mi — `today` `YYYY-MM-DD` biçiminde, `todayLocal`'dan.
 *
 * Tarihi okunamayan etkinlik geçmemiş sayılıyor. Yanlış tarafta olacaksa
 * görünür tarafta olsun: arşive atmak onu olmuş gibi gösterir, ve kayıt
 * düğmesini de kaldırır.
 */
export function isPast(event: ClubEvent, today: string): boolean {
  const date = (event.startsAt ?? '').slice(0, 10);
  return DATE_ONLY.test(date) && date < today;
}

export function splitByDate(
  events: ClubEvent[],
  today: string,
): { upcoming: ClubEvent[]; past: ClubEvent[] } {
  const upcoming: ClubEvent[] = [];
  const past: ClubEvent[] = [];

  for (const event of events) {
    if (isPast(event, today)) past.push(event);
    else upcoming.push(event);
  }

  upcoming.sort((a, b) => (a.startsAt ?? '').localeCompare(b.startsAt ?? ''));
  // Arşiv en yeniden eskiye.
  past.sort((a, b) => (b.startsAt ?? '').localeCompare(a.startsAt ?? ''));
  return { upcoming, past };
}

export type MonthGrid = {
  key: string;
  label: string;
  /** Blank cells before the 1st, so it lands in the right weekday column. */
  leadingBlanks: number;
  days: number;
  /** Day number → event id, for the dotted markers. */
  eventByDay: Record<number, string>;
};

/**
 * Builds one grid per month that actually has events, oldest first.
 *
 * This replaces a hardcoded March 2026 constant that would have shown the wrong
 * month the moment a real calendar existed. Events whose `startsAt` will not
 * parse are skipped rather than crashing the tab — bad data should cost one
 * missing marker, not the whole screen.
 */
export function monthGrids(events: ClubEvent[]): MonthGrid[] {
  const byMonth = new Map<string, MonthGrid>();

  for (const event of events) {
    const parsed = parseIso(event.startsAt ?? '');
    if (!parsed) continue;

    const { year, month, day } = parsed;
    const sortKey = `${year}-${pad(month)}`;
    let grid = byMonth.get(sortKey);
    if (!grid) {
      grid = {
        key: monthKeyOf(year, month),
        label: monthLabelOf(year, month),
        leadingBlanks: weekdayIndex(year, month, 1),
        days: daysInMonth(year, month),
        eventByDay: {},
      };
      byMonth.set(sortKey, grid);
    }
    // Two events on one day: the first keeps the marker, since a day cell can
    // only link to one of them.
    if (!grid.eventByDay[day]) grid.eventByDay[day] = event.id;
  }

  return [...byMonth.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([, grid]) => grid);
}

/** Month keys present in the events, oldest first — what the list groups by. */
export function monthOrder(events: ClubEvent[]): string[] {
  return monthGrids(events).map((grid) => grid.key);
}
