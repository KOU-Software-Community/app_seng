import { EVENT_CATEGORIES } from './eventSchema';
import { IconName } from './icons';

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
  /**
   * Kaç kişi katıldı. Etkinlik olmadan bilinemeyeceği için isteğe bağlı —
   * arşiv kartındaki rozeti bu besliyor ve boşsa rozet çizilmiyor.
   */
  attendance?: number;
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

/*
 * FEATURED and FEED used to live here: editorial cards for the home carousel and
 * feed. They were removed with the home screen that rendered them — it now shows
 * real upcoming events and announcements from the club's site instead of a
 * hand-curated list that nobody had maintained since the design was adapted.
 */

/*
 * ARCHIVE, ARCHIVE_TOTALS, ArchiveEntry ve sortArchive buradaydı: altı uydurma
 * etkinlik ve "2023'ten bugüne 38 etkinlik · 412 fotoğraf" diye iki uydurma
 * sayı. İkincisi daha kötüydü — uygulamada fotoğraf deposu hiç yok, yani 412
 * hiçbir şeyi saymıyordu.
 *
 * Arşiv artık ayrı bir veri değil: tarihi geçmiş etkinlik. `ArchiveEntry`
 * alanlarının (title, date, cat, year) hepsi zaten `ClubEvent`'te vardı; tek
 * eksik katılımcı sayısıydı, o da artık `ClubEvent.attendance`. Ayrı tutmak,
 * aynı gerçek etkinliği iki kez girmek demekti.
 *
 * Bölme `splitByDate` içinde — src/eventSchema.ts.
 */

/**
 * Arşiv filtre çipleri, panelin sunduğu kategorilerden türüyor. Elle yazılmış
 * hâlinde 'Çekiliş' ve 'Duyuru' yoktu — o kategorideki geçmiş bir etkinlik
 * arşive düşer ama hiçbir çip onu göstermezdi.
 */
export const ARCHIVE_CATEGORIES = ['Tümü', ...EVENT_CATEGORIES];

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

