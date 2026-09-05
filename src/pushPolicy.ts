/**
 * Otomatik bildirimin **kararları**. Saf: Firestore yok, ağ yok, zaman yok
 * (girdi olarak alınıyor).
 *
 * Buraya taşınmasının sebebi, `src/eventSchema.ts` ve `src/raffleSchema.ts` ile
 * aynı: bu kurallar hem panelde (gönderen taraf) hem testlerde çalışmak
 * zorunda, ve `admin/**` jest kapsamında değil. Yanlış bir karar burada
 * kullanıcıya giden yanlış bir bildirim demek — bu yüzden her dal tek tek
 * sınanabilir olmalı.
 *
 * Tasarım kuralı: **şüphede kalırsan gönderme.** Gelmeyen bir bildirim can
 * sıkar; gelmemesi gereken bir bildirim güveni bozar ve geri alınamaz.
 */

import type { ClubEvent } from './data';
import { clubHour } from './eventSchema';
import { QUIET_END_HOUR, QUIET_START_HOUR } from './notificationPlan';

/** `clubHour` ile aynı kaydırma, milisaniye cinsinden. */
const CLUB_OFFSET_MS = 3 * 60 * 60_000;

/**
 * Push atılabilen kategoriler. `Hatırlatma` ve `AI Gündem` burada **yok**:
 * ikisi de cihazda yerel olarak kuruluyor, sunucudan gönderilmiyor.
 */
export const PUSHABLE_CATEGORIES = ['Atölye', 'Söyleşi', 'Çekiliş', 'Duyuru'] as const;

/**
 * Etkinlik etiketi → bildirim kategorisi.
 *
 * Etiket listesi (`EVENT_CATEGORIES`) bildirim listesinden geniş: "Teknik Gezi"
 * ve "Yarışma"nın kendi anahtarı yok. Bunları sessizce düşürmek, o etkinliklerin
 * hiç duyurulmaması demek olurdu; `Duyuru`ya düşüyorlar — kullanıcının genel
 * kulüp duyuruları için açtığı anahtar.
 */
export function pushCategoryFor(tag: string): string {
  const trimmed = (tag ?? '').trim();
  return (PUSHABLE_CATEGORIES as readonly string[]).includes(trimmed) ? trimmed : 'Duyuru';
}

export type PushPayload = {
  category: string;
  title: string;
  body: string;
  /** Bildirime dokununca ne açılacak. Boşsa uygulama olduğu yerde açılıyor. */
  data: Record<string, string>;
};

export type PushDecision =
  | { send: true; logId: string; payload: PushPayload }
  | { send: false; reason: string };

const skip = (reason: string): PushDecision => ({ send: false, reason });

/** Aynı olay için ikinci bir bildirimi imkânsız kılan deterministik kimlik. */
export const pushLogId = (kind: string, eventId: string): string => `${kind}__${eventId}`;

const startsAtMs = (event: ClubEvent): number => new Date(event.startsAt).getTime();

const whenLine = (event: ClubEvent): string =>
  [event.title, [event.day, event.mon].filter(Boolean).join(' '), event.time]
    .filter(Boolean)
    .join(' · ');

/**
 * Yeni etkinlik yayımlandı.
 *
 * Düzenlemede gönderilmiyor: operatör bir yazım hatasını düzeltmek için formu
 * kaydettiğinde herkese ikinci bir "yeni atölye" gitmesi, bu otomasyonun en
 * kolay düşeceği hata.
 */
export function decideNewEvent(input: {
  event: ClubEvent;
  editing: boolean;
  now: Date;
}): PushDecision {
  if (input.editing) return skip('düzenleme — yeni etkinlik değil');

  const starts = startsAtMs(input.event);
  if (Number.isNaN(starts)) return skip('başlangıç zamanı okunamıyor');
  // Arşiv kaydı ve geçmiş tarihli giriş duyurulmuyor: kimsenin katılamayacağı
  // bir şey için bildirim, tanımı gereği gürültü.
  if (starts <= input.now.getTime()) return skip('geçmiş tarihli etkinlik');

  const tag = (input.event.tag ?? '').trim();
  return {
    send: true,
    logId: pushLogId('event_created', input.event.id),
    payload: {
      category: pushCategoryFor(tag),
      title: tag ? `Yeni ${tag.toLocaleLowerCase('tr')}` : 'Yeni etkinlik',
      body: whenLine(input.event),
      data: { eventId: input.event.id },
    },
  };
}

/**
 * Etkinlik silindi.
 *
 * `announced`: bu etkinliğin **oluşturulma bildirimi gerçekten gitti mi.**
 * Gitmediyse iptal bildirimi de gitmiyor — kullanıcıya hiç duymadığı bir şeyin
 * iptal edildiğini söylemek, otomasyonun üretebileceği en garip bildirim.
 *
 * `data` boş bırakılıyor: dokununca silinmiş etkinliğin sayfası açılsaydı
 * kullanıcı bir "bulunamadı" ekranına düşerdi, ki bu bir hata gibi görünür.
 */
export function decideCancelledEvent(input: {
  event: ClubEvent;
  announced: boolean;
  now: Date;
}): PushDecision {
  if (!input.announced) return skip('bu etkinlik hiç duyurulmamıştı');

  const starts = startsAtMs(input.event);
  if (Number.isNaN(starts)) return skip('başlangıç zamanı okunamıyor');
  if (starts <= input.now.getTime()) return skip('geçmiş etkinlik siliniyor');

  return {
    send: true,
    logId: pushLogId('event_cancelled', input.event.id),
    payload: {
      category: pushCategoryFor((input.event.tag ?? '').trim()),
      title: 'Etkinlik iptal edildi',
      body: whenLine(input.event),
      data: {},
    },
  };
}

/**
 * Çekiliş sonucu girildi.
 *
 * Boş liste "sonucu geri al" demek — panel `drawnAt`'i de temizliyor. Onu
 * duyurmak, olmamış bir çekilişi ilan etmek olurdu.
 */
export function decideRaffleResult(input: {
  event: ClubEvent;
  winners: readonly string[];
}): PushDecision {
  if (input.winners.length === 0) return skip('kazanan listesi boş — sonuç geri alınıyor');

  return {
    send: true,
    logId: pushLogId('raffle_drawn', input.event.id),
    payload: {
      category: 'Çekiliş',
      title: 'Çekiliş sonuçlandı',
      body: `${input.event.title} — kazananlar uygulamada.`,
      data: { eventId: input.event.id },
    },
  };
}

// ---------------------------------------------------------------------------
// Hedefleme
// ---------------------------------------------------------------------------

export type DeviceDoc = {
  token?: unknown;
  /** 'ios' | 'android' — yalnızca panelin özet tablosu okuyor. */
  platform?: unknown;
  master?: unknown;
  categories?: Record<string, unknown>;
  quietHours?: unknown;
};

export type DeviceRow = { id: string; data: DeviceDoc };
export type Target = { id: string; token: string };

export type Selection = {
  /** Şimdi gönderilecekler. */
  send: Target[];
  /** Sessiz saatlerde olduğu için sabaha bırakılanlar. */
  defer: Target[];
  skipped: { noToken: number; master: number; category: number };
};

/**
 * Kime gidecek.
 *
 * Bilinmeyen bir kategori **açık** sayılıyor: kategori, cihaz kaydı yazıldıktan
 * sonra eklenmiş olabilir ve uygulamada da varsayılanı açık. Kapalı saymak,
 * yeni bir kategoriyi kimsenin almaması demek olurdu.
 */
export function selectTargets(
  devices: readonly DeviceRow[],
  category: string,
  quiet: boolean,
): Selection {
  const selection: Selection = {
    send: [],
    defer: [],
    skipped: { noToken: 0, master: 0, category: 0 },
  };

  for (const { id, data } of devices) {
    const token = typeof data.token === 'string' ? data.token.trim() : '';
    if (!token) {
      selection.skipped.noToken += 1;
      continue;
    }
    if (data.master !== true) {
      selection.skipped.master += 1;
      continue;
    }
    if (data.categories?.[category] === false) {
      selection.skipped.category += 1;
      continue;
    }
    // Sessiz saatler yalnızca ayarı **açık** olan cihaz için geçerli.
    if (quiet && data.quietHours === true) selection.defer.push({ id, token });
    else selection.send.push({ id, token });
  }

  return selection;
}

// ---------------------------------------------------------------------------
// Sessiz saatler
// ---------------------------------------------------------------------------

/**
 * Şu an sessiz saatlerde miyiz — **kulüp saatine göre**.
 *
 * Sunucunun kendi saatiyle değil: panel bir konteynerde koşuyor ve o
 * konteynerin dilimi genellikle UTC, yani `getHours()` üç saat kaymış bir
 * pencere üretirdi. Kullanıcının kendi diliminden de okunamıyor — sunucu onu
 * bilmiyor — ve bu uygulamanın kullanıcıları Kocaeli'de.
 */
export function inClubQuietHours(now: Date): boolean {
  const hour = clubHour(now);
  return hour >= QUIET_START_HOUR || hour < QUIET_END_HOUR;
}

/**
 * Sessiz saatlerin biteceği ilk an.
 *
 * Sessiz saatlerde yakalanan bir bildirim **atlanmıyor, erteleniyor**: eski
 * davranış onu tamamen düşürüyordu, yani gece yarısı açılan bir atölyeyi o
 * kullanıcılar hiç duymuyordu. Otomasyonun anlamı, birinin sabah hatırlayıp
 * komutu tekrar çalıştırmasına bağlı olmaması.
 */
export function nextQuietEnd(now: Date): Date {
  const club = new Date(now.getTime() + CLUB_OFFSET_MS);
  const sameDay = club.getUTCHours() < QUIET_END_HOUR;
  const utcMs = Date.UTC(
    club.getUTCFullYear(),
    club.getUTCMonth(),
    club.getUTCDate() + (sameDay ? 0 : 1),
    QUIET_END_HOUR,
    0,
    0,
  );
  return new Date(utcMs - CLUB_OFFSET_MS);
}

// ---------------------------------------------------------------------------
// Duyurular
// ---------------------------------------------------------------------------

/**
 * Bir duyurunun bildirim üretebileceği en uzun yaş.
 *
 * Duyurular panelde değil kulübün sitesinde yazılıyor, yani panel onları
 * yoklayarak öğreniyor. Yoklama bir süre çalışmazsa (panel kapalı, API
 * erişilemez) geri döndüğünde birikmiş listeyi görüyor; yaş sınırı olmadan
 * hepsi aynı anda bildirim olurdu.
 */
export const ANNOUNCEMENT_MAX_AGE_HOURS = 24;

export type AnnouncementLike = {
  id: string;
  title: string;
  createdAt: string;
};

export type AnnouncementPlan = {
  /** Bildirim gönderilecekler. */
  announce: { id: string; logId: string; payload: PushPayload }[];
  /** Yalnızca deftere yazılacaklar — bir daha bakılmasın diye, ama sessizce. */
  seedOnly: string[];
};

/**
 * Hangi duyurular bildirilecek.
 *
 * `seeded` bu fonksiyonun en önemli girdisi: **ilk çalıştırmada hiçbir şey
 * gönderilmiyor.** Defter boşken sitedeki her duyuru "yeni" görünür ve
 * otomasyon devreye girdiği gün herkesin telefonu arka arkaya on kez titrerdi.
 * İlk tur yalnızca mevcut listeyi işaretliyor; bildirim bir sonraki gerçekten
 * yeni duyuruyla başlıyor.
 */
export function planAnnouncementPushes(input: {
  announcements: readonly AnnouncementLike[];
  seen: ReadonlySet<string>;
  seeded: boolean;
  now: Date;
  maxAgeHours?: number;
}): AnnouncementPlan {
  const maxAgeMs = (input.maxAgeHours ?? ANNOUNCEMENT_MAX_AGE_HOURS) * 60 * 60_000;
  const plan: AnnouncementPlan = { announce: [], seedOnly: [] };

  for (const item of input.announcements) {
    const id = (item.id ?? '').trim();
    if (!id || input.seen.has(id)) continue;

    if (!input.seeded) {
      plan.seedOnly.push(id);
      continue;
    }

    const created = Date.parse(item.createdAt);
    // Okunamayan tarihte **göndermiyoruz**. Etkinliklerde tersi geçerliydi
    // (bozuk tarih yüzünden içerik saklamamak için); burada risk ters yönde:
    // tarihi okunamayan eski bir kayıt, sınırı aşamadığı için bildirim olurdu.
    if (Number.isNaN(created) || input.now.getTime() - created > maxAgeMs) {
      plan.seedOnly.push(id);
      continue;
    }

    plan.announce.push({
      id,
      logId: pushLogId('announcement', id),
      payload: {
        category: 'Duyuru',
        title: 'Yeni duyuru',
        body: item.title,
        data: { announcementId: id },
      },
    });
  }

  return plan;
}
