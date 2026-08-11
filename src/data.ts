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

export const EVENTS: ClubEvent[] = [
  {
    id: 'ev1',
    startsAt: '2026-03-12T18:00:00+03:00',
    day: '12',
    mon: 'MAR',
    wd: 'Per',
    monthKey: 'MART 2026',
    title: 'Git & GitHub Atölyesi',
    time: '18:00 – 20:30 · B Blok 204',
    short: '12 Mart · B Blok 204',
    tag: 'Atölye',
    soon: true,
    badge: 'SON GUN',
    spots: '12 / 60 yer kaldı',
    desc: 'Versiyon kontrolüne sıfırdan başlıyoruz. Kendi bilgisayarında repo açmaktan pull request göndermeye kadar tüm akışı birlikte yapacağız. Laptopunu getirmen yeterli — kurulumu birlikte hallediyoruz.',
    tags: ['Başlangıç seviye', 'Laptop getir', 'Sertifikalı'],
    speaker: 'Mert Aydın',
    speakerRole: '3. sınıf · Kulüp teknik ekip',
    facts: [
      { icon: 'cal', label: 'Tarih', value: '12 Mart 2026, Perşembe' },
      { icon: 'clock', label: 'Saat', value: '18:00 – 20:30' },
      { icon: 'pin', label: 'Yer', value: 'Müh. Fak. B Blok 204' },
    ],
  },
  {
    id: 'ev2',
    startsAt: '2026-03-19T18:00:00+03:00',
    day: '19',
    mon: 'MAR',
    wd: 'Per',
    monthKey: 'MART 2026',
    title: 'React ile Web Geliştirme',
    time: '18:00 – 21:00 · Bilgisayar Lab 3',
    short: '19 Mart · Lab 3',
    tag: 'Atölye',
    soon: false,
    badge: 'ATOLYE',
    spots: '31 / 40 yer kaldı',
    desc: 'Component mantığı, state yönetimi ve küçük bir proje. Atölye sonunda kendi mini uygulamanı yayına almış olacaksın.',
    tags: ['Orta seviye', '3 saat', 'Proje çıktılı'],
    speaker: 'Zeynep Kara',
    speakerRole: '4. sınıf · Frontend',
    facts: [
      { icon: 'cal', label: 'Tarih', value: '19 Mart 2026, Perşembe' },
      { icon: 'clock', label: 'Saat', value: '18:00 – 21:00' },
      { icon: 'pin', label: 'Yer', value: 'Bilgisayar Lab 3' },
    ],
  },
  {
    id: 'ev3',
    startsAt: '2026-03-26T19:00:00+03:00',
    day: '26',
    mon: 'MAR',
    wd: 'Per',
    monthKey: 'MART 2026',
    title: 'Kariyer Sohbetleri: İlk Staj',
    time: '19:00 – 20:30 · Konferans Salonu',
    short: '26 Mart · Konferans Salonu',
    tag: 'Söyleşi',
    soon: false,
    badge: 'SOYLESI',
    spots: '180 kişilik salon',
    desc: 'İlk stajını yeni bitiren üç mezunumuz deneyimlerini anlatıyor: CV, mülakat ve ilk üç ay. Sonunda soru-cevap var.',
    tags: ['Herkese açık', 'Kayıt gerekli', 'Mezun konuk'],
    speaker: 'Panel',
    speakerRole: '3 mezun konuşmacı',
    facts: [
      { icon: 'cal', label: 'Tarih', value: '26 Mart 2026, Perşembe' },
      { icon: 'clock', label: 'Saat', value: '19:00 – 20:30' },
      { icon: 'pin', label: 'Yer', value: 'Konferans Salonu' },
    ],
  },
  {
    id: 'ev4',
    startsAt: '2026-04-02T18:30:00+03:00',
    day: '02',
    mon: 'NİS',
    wd: 'Per',
    monthKey: 'NİSAN 2026',
    title: 'KOÜ Hackathon Tanıtım Gecesi',
    time: '18:30 – 20:00 · Konferans Salonu',
    short: '2 Nisan · Konferans Salonu',
    tag: 'Yarışma',
    soon: false,
    badge: 'YARISMA',
    spots: 'Takımlar 4 kişilik',
    desc: "48 saatlik hackathon'un kuralları, jüri, ödüller ve takım kurma oturumu. Takımın yoksa burada bulabilirsin.",
    tags: ['Takım kur', 'Ödüllü', '48 saat'],
    speaker: 'Organizasyon Ekibi',
    speakerRole: 'Kulüp yönetim kurulu',
    facts: [
      { icon: 'cal', label: 'Tarih', value: '2 Nisan 2026, Perşembe' },
      { icon: 'clock', label: 'Saat', value: '18:30 – 20:00' },
      { icon: 'pin', label: 'Yer', value: 'Konferans Salonu' },
    ],
  },
];

export const MONTH_ORDER = ['MART 2026', 'NİSAN 2026'] as const;

export const getEvent = (id?: string | string[]) => {
  const key = Array.isArray(id) ? id[0] : id;
  return EVENTS.find((e) => e.id === key) ?? EVENTS[0];
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

export const FEATURED: FeaturedCard[] = [
  {
    id: 'ev1',
    kicker: 'CEKILIS',
    icon: 'gift',
    title: 'Mechanical Keyboard Çekilişi',
    body: 'Atölyeye kayıt olan herkes çekilişe otomatik katılıyor.',
    meta: 'Son 3 gün',
    bg: gradients.featured,
    fg: '#FFFFFF',
    sub: '#93CBDC',
    badgeBg: 'rgba(147,203,220,0.22)',
    badgeFg: '#D2E7EC',
  },
  {
    id: 'ev3',
    kicker: 'DUYURU',
    icon: 'star',
    title: 'Bahar dönemi başvuruları açıldı',
    body: "Kulüp üyeliği ve ekip başvuruları 20 Mart'a kadar.",
    meta: 'Yeni',
    bg: '#D2E7EC',
    fg: '#001B4A',
    sub: '#41586B',
    badgeBg: '#014576',
    badgeFg: '#D2E7EC',
  },
  {
    id: 'ev4',
    kicker: 'SON GUN',
    icon: 'clock',
    title: 'Hackathon takım kaydı bitiyor',
    body: '4 kişilik takımını kur, son başvuru 1 Nisan.',
    meta: '2 Nisan',
    bg: '#FFFFFF',
    fg: '#001B4A',
    sub: '#5B7185',
    badgeBg: '#D2E7EC',
    badgeFg: '#014576',
  },
];

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

export const FEED: FeedItem[] = [
  {
    id: 'ev1',
    day: '12',
    mon: 'MAR',
    tag: 'Atölye',
    title: 'Git & GitHub Atölyesi kontenjanı açıldı',
    meta: '48 / 60 kişi kayıtlı',
    isNew: true,
    tint: '#D2E7EC',
  },
  {
    id: 'ev2',
    day: '19',
    mon: 'MAR',
    tag: 'Atölye',
    title: 'React atölyesi için ön hazırlık dokümanı',
    meta: 'Kayıtlı olduğun etkinlik',
    isNew: false,
    tint: '#E4EEF3',
  },
  {
    id: 'ev3',
    day: '26',
    mon: 'MAR',
    tag: 'Söyleşi',
    title: 'Kariyer Sohbetleri: İlk Staj deneyimi',
    meta: '3 mezun konuşmacı',
    isNew: true,
    tint: '#D2E7EC',
  },
  {
    id: 'ev4',
    day: '02',
    mon: 'NİS',
    tag: 'Yarışma',
    title: 'Hackathon tanıtım gecesi tarihi belli oldu',
    meta: 'Takım kurma oturumu var',
    isNew: false,
    tint: '#E4EEF3',
  },
];

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

/**
 * March 2026 grid. The 1st lands on a Sunday, so the month starts in the last
 * column of the first row — hence the six leading blanks.
 */
export const MARCH_2026 = {
  label: 'Mart 2026',
  leadingBlanks: 6,
  days: 31,
  /** Day number → event id, for the dotted "has an event" markers. */
  eventByDay: { 12: 'ev1', 19: 'ev2', 26: 'ev3' } as Record<number, string>,
};
