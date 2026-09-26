/**
 * Vitrin — ana sayfanın slider'ı ve sponsorlar: şema, doğrulama, okuma.
 *
 * Bu modülü iki taraf paylaşıyor (`announcementApi.ts` gibi): panel formu
 * `buildSponsor` / `buildSlide` ile doğruluyor, uygulama Firestore'dan geleni
 * `toSponsor` / `toSlide` ile okuyor. Kural tek yerde; biri değişip öbürü
 * kalsaydı panelin kaydettiği şey uygulamada görünmez olurdu.
 *
 * Okuma katı ama kırılgan değil: zorunlu alanı bozuk doküman atlanıyor, listeyi
 * düşürmüyor; isteğe bağlı alan bozuksa yok sayılıyor. Veri Firebase
 * Console'dan elle de girilebilir ve Console hiçbir şeyi doğrulamıyor.
 */
import type { ClubEvent } from './data';
import { parseSourceUrl } from './gundem/data-access/sourceUrl';

/**
 * Tasarımın rozet dili ASCII ("SON GUN", "CEKILIS") — pixel fontunda Türkçe
 * harfler var, bu bir font sınırı değil, görünüm kararı. Değer sabit bir liste
 * çünkü ikon bundan seçiliyor.
 */
export const KICKERS = ['BUGUN', 'CEKILIS', 'DUYURU'] as const;
export type Kicker = (typeof KICKERS)[number];

export type SlideTarget =
  | { type: 'event'; id: string }
  | { type: 'announcement'; id: string }
  | { type: 'url'; url: string };

export type Slide = {
  id: string;
  title: string;
  meta: string;
  image?: string;
  kicker?: Kicker;
  target: SlideTarget;
  order: number;
  /** `YYYY-AA-GG`; yoksa slayt kalıcı. */
  endsAt?: string;
};

export type Sponsor = {
  id: string;
  name: string;
  sector: string;
  description: string;
  logo?: string;
  url?: string;
  /** `url`'nin alan adı — detayda düğmenin altındaki satır. */
  host?: string;
  eventIds: string[];
  order: number;
};

/** Panelin yazdığı şekil. Firestore `undefined` kabul etmiyor: boş alan `''`. */
export type SponsorDoc = {
  name: string;
  sector: string;
  description: string;
  logo: string;
  url: string;
  eventIds: string[];
  order: number;
  active: boolean;
};

export type SlideDoc = {
  title: string;
  meta: string;
  image: string;
  kicker: Kicker | '';
  target: SlideTarget;
  endsAt: string;
  order: number;
  active: boolean;
};

export type Build<T> = { ok: true; value: T } | { ok: false; errors: Record<string, string> };

export type SponsorEventRow = { event: ClubEvent; upcoming: boolean; prize: boolean };

const DAY = /^\d{4}-\d{2}-\d{2}$/;

const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

const isKicker = (v: string): v is Kicker => (KICKERS as readonly string[]).includes(v);

/** https ise normalleştirilmiş adres ve alan adı, değilse null. */
function https(raw: string): { url: string; host: string } | null {
  if (!raw) return null;
  const parsed = parseSourceUrl(raw);
  return parsed.ok ? { url: parsed.url, host: parsed.host } : null;
}

/** Sıra 1 veya daha büyük bir tam sayı. Panel her değişiklikte 1…n yazıyor. */
export function isOrder(v: unknown): v is number {
  return typeof v === 'number' && Number.isInteger(v) && v >= 1;
}

/** `order` artan; eşitlikte kimlik, yani her açılışta aynı sıra. */
export function byOrder(a: { id: string; order: number }, b: { id: string; order: number }): number {
  if (a.order !== b.order) return a.order - b.order;
  return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
}

function idList(v: unknown): string[] {
  return Array.isArray(v) ? [...new Set(v.map(str).filter(Boolean))] : [];
}

function toTarget(raw: unknown): SlideTarget | null {
  if (!raw || typeof raw !== 'object') return null;
  const t = raw as Record<string, unknown>;
  if (t.type === 'event' || t.type === 'announcement') {
    const id = str(t.id);
    return id ? { type: t.type, id } : null;
  }
  if (t.type === 'url') {
    const link = https(str(t.url));
    return link ? { type: 'url', url: link.url } : null;
  }
  return null;
}

export function buildSponsor(input: {
  name: unknown;
  sector: unknown;
  description: unknown;
  url: unknown;
  logo: unknown;
  eventIds: unknown;
  order: unknown;
  active: unknown;
}): Build<SponsorDoc> {
  const errors: Record<string, string> = {};
  const name = str(input.name);
  if (!name) errors.name = 'Ad boş olamaz.';

  const rawUrl = str(input.url);
  const site = https(rawUrl);
  if (rawUrl && !site) errors.url = 'Web sitesi https:// ile başlayan geçerli bir adres olmalı.';

  const order = input.order;
  if (!isOrder(order)) errors.order = 'Sıra 1 veya daha büyük bir tam sayı olmalı.';
  if (!isOrder(order) || Object.keys(errors).length) return { ok: false, errors };

  return {
    ok: true,
    value: {
      name,
      sector: str(input.sector),
      description: str(input.description),
      logo: https(str(input.logo))?.url ?? '',
      url: site?.url ?? '',
      eventIds: idList(input.eventIds),
      order,
      active: input.active === true,
    },
  };
}

export function toSponsor(id: string, raw: unknown): Sponsor | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const name = str(r.name);
  const order = r.order;
  if (!name || !isOrder(order)) return null;

  const site = https(str(r.url));
  return {
    id,
    name,
    sector: str(r.sector),
    description: str(r.description),
    logo: https(str(r.logo))?.url,
    url: site?.url,
    host: site?.host,
    eventIds: idList(r.eventIds),
    order,
  };
}

/**
 * Sponsor detayındaki etkinlik satırları: önce yaklaşanlar (takvim sırası),
 * sonra geçmişler (arşiv sırası). Listede olmayan kimlik düşüyor — silinmiş
 * bir etkinliğe giden satır "Etkinlik bulunamadı"ya açılırdı.
 */
export function sponsorEvents(
  sponsor: Pick<Sponsor, 'eventIds'>,
  events: ClubEvent[],
  archive: ClubEvent[],
  hasRaffle: (eventId: string) => boolean,
): SponsorEventRow[] {
  const wanted = new Set(sponsor.eventIds);
  const rows = (list: ClubEvent[], upcoming: boolean) =>
    list
      .filter((e) => wanted.has(e.id))
      .map((event) => ({ event, upcoming, prize: hasRaffle(event.id) }));
  return [...rows(events, true), ...rows(archive, false)];
}

export function buildSlide(
  input: {
    title: unknown;
    meta: unknown;
    image: unknown;
    kicker: unknown;
    targetType: unknown;
    targetId: unknown;
    targetUrl: unknown;
    endsAt: unknown;
    order: unknown;
    active: unknown;
  },
  today: string,
): Build<SlideDoc> {
  const errors: Record<string, string> = {};
  const title = str(input.title);
  if (!title) errors.title = 'Başlık boş olamaz.';

  const kicker = str(input.kicker);
  if (kicker && !isKicker(kicker)) errors.kicker = 'Rozet listeden seçilmeli.';

  const target = toTarget({ type: input.targetType, id: input.targetId, url: input.targetUrl });
  if (!target) {
    errors.target =
      input.targetType === 'url'
        ? 'Bağlantı https:// ile başlayan geçerli bir adres olmalı.'
        : 'Slayta dokununca açılacak etkinliği ya da duyuruyu seçin.';
  }

  const endsAt = str(input.endsAt);
  if (endsAt && !DAY.test(endsAt)) errors.endsAt = 'Bitiş tarihi YYYY-AA-GG biçiminde olmalı.';
  // Geçmiş bir tarih kaydedilseydi zamanlayıcı slaytı bir sonraki turda silerdi.
  else if (endsAt && endsAt < today) errors.endsAt = 'Bitiş tarihi bugünden önce olamaz.';

  const order = input.order;
  if (!isOrder(order)) errors.order = 'Sıra 1 veya daha büyük bir tam sayı olmalı.';
  if (!target || !isOrder(order) || Object.keys(errors).length) return { ok: false, errors };

  return {
    ok: true,
    value: {
      title,
      meta: str(input.meta),
      image: https(str(input.image))?.url ?? '',
      kicker: isKicker(kicker) ? kicker : '',
      target,
      endsAt,
      order,
      active: input.active === true,
    },
  };
}

export function toSlide(id: string, raw: unknown): Slide | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const title = str(r.title);
  const target = toTarget(r.target);
  const order = r.order;
  if (!title || !target || !isOrder(order)) return null;

  const kicker = str(r.kicker);
  return {
    id,
    title,
    meta: str(r.meta),
    image: https(str(r.image))?.url,
    kicker: isKicker(kicker) ? kicker : undefined,
    target,
    order,
    endsAt: str(r.endsAt) || undefined,
  };
}

/** Uygulamada görünenler: bitiş tarihi yoksa ya da bugün veya sonrasıysa. Bozuk tarih gizler. */
export function visibleSlides(slides: Slide[], today: string): Slide[] {
  return slides
    .filter((s) => !s.endsAt || (DAY.test(s.endsAt) && s.endsAt >= today))
    .sort(byOrder);
}

/** Panelin zamanlayıcısının sileceği slaytlar: bitiş tarihi bugünden önce olanlar. */
export function expiredSlideIds(slides: { id: string; endsAt?: unknown }[], today: string): string[] {
  return slides
    .filter((s) => typeof s.endsAt === 'string' && DAY.test(s.endsAt) && s.endsAt < today)
    .map((s) => s.id);
}
