import { ICON, IconName } from './icons';
import { gradients, type GradientStops } from './theme';

export type EventFact = { icon: IconName; label: string; value: string };

export type ClubEvent = {
  id: string;
  /**
   * ISO start time. The `day`/`mon`/`time` strings below are what the design
   * displays; this is the machine-readable value Firestore sorts and filters on.
   */
  startsAt: string;
  day: string;
  mon: string;
  /** Short weekday label used in the calendar list rows. */
  wd: string;
  monthKey: string;
  title: string;
  time: string;
  short: string;
  tag: string;
  /** Registration deadline is imminent — drives the "SON GUN" badge. */
  soon: boolean;
  badge: string;
  spots: string;
  desc: string;
  tags: string[];
  speaker: string;
  speakerRole: string;
  facts: EventFact[];
};

/**
 * Upcoming events.
 *
 * Empty on purpose: the club has no confirmed calendar right now. This used to
 * hold four March–April 2026 events which, months later, were still being shown
 * as "upcoming" — a stale calendar is worse than an honest empty one, and it also
 * meant no reminder could ever be scheduled.
 *
 * Fill this in (or seed Firestore, which takes precedence) when the real
 * calendar exists. Build entries with `buildEvent` from src/eventSchema.ts
 * rather than by hand — half these fields are derived from `startsAt` and drift
 * the moment they are typed twice.
 */
export const EVENTS: ClubEvent[] = [];

/** Undefined when the id matches nothing — callers must handle a missing event. */
export const getEvent = (id?: string | string[]): ClubEvent | undefined => {
  const key = Array.isArray(id) ? id[0] : id;
  return EVENTS.find((e) => e.id === key);
};

/** Highlight cards on the home carousel. Each one deep-links into an event. */
export type FeaturedCard = {
  id: string;
  kicker: string;
  icon: IconName;
  title: string;
  body: string;
  meta: string;
  /** Solid fill, or a gradient stop list for the navy card. */
  bg: string | GradientStops;
  fg: string;
  sub: string;
  badgeBg: string;
  badgeFg: string;
};

export const FEATURED: FeaturedCard[] = [];

export type FeedItem = {
  id: string;
  day: string;
  mon: string;
  tag: string;
  title: string;
  meta: string;
  isNew: boolean;
  tint: string;
};

export const FEED: FeedItem[] = [];

export type ArchiveEntry = {
  title: string;
  date: string;
  cat: string;
  year: string;
  count: number;
};

const TR_MONTHS = [
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

/**
 * Newest first.
 *
 * Firestore returns documents in document-id order unless told otherwise, which
 * for slug ids is alphabetical and meaningless. `date` is a display string
 * ("Aralık 2025"), so ordering is derived from it here rather than relying on
 * whatever order the source happened to use.
 */
export function sortArchive(entries: ArchiveEntry[]): ArchiveEntry[] {
  const weight = (e: ArchiveEntry) => {
    const [month, year] = e.date.split(' ');
    const monthIndex = TR_MONTHS.indexOf(month);
    return Number(year) * 12 + (monthIndex >= 0 ? monthIndex : 0);
  };
  return [...entries].sort((a, b) => weight(b) - weight(a));
}

export const ARCHIVE: ArchiveEntry[] = [
  { title: 'Kış Kampı: Backend 101', date: 'Aralık 2025', cat: 'Atölye', year: '2025', count: 24 },
  { title: 'Teknoloji Gecesi', date: 'Kasım 2025', cat: 'Söyleşi', year: '2025', count: 63 },
  { title: 'TÜBİTAK Teknopark Gezisi', date: 'Ekim 2025', cat: 'Teknik Gezi', year: '2025', count: 41 },
  { title: 'Oyun Geliştirme Atölyesi', date: 'Mayıs 2025', cat: 'Atölye', year: '2025', count: 18 },
  { title: 'Mezunlarla Buluşma', date: 'Nisan 2025', cat: 'Söyleşi', year: '2025', count: 37 },
  { title: 'Yazılım Zirvesi Ziyareti', date: 'Mart 2024', cat: 'Teknik Gezi', year: '2024', count: 52 },
];

/**
 * Club-wide archive totals quoted in the header and home stats. The `ARCHIVE`
 * array above is the recent slice that is actually browsable.
 */
export const ARCHIVE_TOTALS = { events: 38, photos: 412 };

/** "Yarışma" has no archived events yet — that is what drives the empty state. */
export const ARCHIVE_CATEGORIES = ['Tümü', 'Atölye', 'Söyleşi', 'Teknik Gezi', 'Yarışma'];

export const DEPARTMENTS = ['Yazılım Müh.', 'Bilgisayar Müh.', 'Elektronik', 'Diğer'];
export const YEARS = ['Haz.', '1', '2', '3', '4'];
export const REMINDER_OPTIONS = ['1 saat önce', '1 gün önce', '3 gün önce'];

/**
 * Gizlilik politikası ve KVKK aydınlatma metni. Kayıt formundaki onay satırının
 * altından açılır, ve iki mağazanın gizlilik alanına da bu adres yazılır.
 */
export const PRIVACY_POLICY_URL =
  'https://kou-yazilim-kulubu-gizlilik.akadirr41.chatgpt.site';

export type OnboardingPage = {
  kicker: string;
  title: string;
  body: string;
  cta: string;
  /** `logo` shows the club wordmark; the others use pixel scene art. */
  art: 'logo' | 'form' | 'bell';
};

export const ONBOARDING: OnboardingPage[] = [
  {
    kicker: '01 / 03',
    art: 'logo',
    title: 'Kulüpten hiçbir şey kaçmasın',
    body: 'Atölyeler, söyleşiler ve çekilişler tek akışta. Öne çıkanlar en üstte, gerisi zaman sırasıyla.',
    cta: 'Devam',
  },
  {
    kicker: '02 / 03',
    art: 'form',
    title: 'Tek dokunuşla kayıt ol',
    body: 'Ad soyad, öğrenci no ve bölüm — 20 saniyede kaydın tamam. Kontenjan dolmadan yerini ayır.',
    cta: 'Devam',
  },
  {
    kicker: '03 / 03',
    art: 'bell',
    title: 'Sadece istediğin bildirim',
    body: 'Atölye, söyleşi, çekiliş — kategori kategori aç kapa. Sessiz saatlerde rahatsız etmeyiz.',
    cta: 'Başla',
  },
];

export type NotificationCategory = {
  key: string;
  icon: IconName;
  tint: string;
  desc: string;
};

export const NOTIFICATION_CATEGORIES: NotificationCategory[] = [
  { key: 'Atölye', icon: 'code', tint: '#D2E7EC', desc: 'Yeni atölye açıldığında ve kontenjan güncellendiğinde' },
  { key: 'Söyleşi', icon: 'chat', tint: '#E4EEF3', desc: 'Konuk konuşmacı ve panel duyuruları' },
  { key: 'Çekiliş', icon: 'gift', tint: '#D2E7EC', desc: 'Çekiliş başlangıcı ve sonuç açıklaması' },
  { key: 'Duyuru', icon: 'star', tint: '#E4EEF3', desc: 'Genel kulüp duyuruları ve başvuru dönemleri' },
  { key: 'Hatırlatma', icon: 'clock', tint: '#D2E7EC', desc: 'Kayıtlı olduğun etkinlikler için hatırlatma' },
];

export const WEEKDAYS = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];

