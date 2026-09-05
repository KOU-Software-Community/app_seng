/**
 * Otomatik bildirimin **etkili** yarısı: Firestore, Expo push servisi ve
 * sessiz saat kuyruğu. Kararlar burada değil, `src/pushPolicy.ts`'te — orası
 * saf ve jest kapsamında.
 *
 * `npm run push` de bu modülü kullanıyor: iki ayrı gönderim uygulaması,
 * kategorileri ya da sessiz saatleri farklı yorumlayacakları ilk gün ayrışırdı.
 */
import type { Firestore } from 'firebase-admin/firestore';

import { fetchAnnouncements } from '../src/announcementApi';

import {
  planAnnouncementPushes,
  pushLogId,
  inClubQuietHours,
  nextQuietEnd,
  selectTargets,
  type AnnouncementLike,
  type DeviceRow,
  type PushDecision,
  type PushPayload,
  type Target,
} from '../src/pushPolicy';

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';
/** Expo'nun belgelenmiş istek başına mesaj sınırı. */
const CHUNK_SIZE = 100;

const PUSH_LOG = 'pushLog';
const PENDING = 'pendingPushes';
const DEVICES = 'devices';

/**
 * Otomatik gönderim açık mı.
 *
 * Varsayılan **açık**. Kapalı varsayılan, bu depoda iki kez yaşanmış hatanın
 * aynısı olurdu: sessizce çalışmayan bir özellik ve onu kimsenin fark etmemesi.
 * Yerelde panel çalıştırırken gerçek kullanıcılara bildirim gitmesini
 * istemiyorsanız `ADMIN_AUTO_PUSH=off` verin — panel açılışta hangi modda
 * olduğunu yazıyor.
 */
export const autoPushEnabled = (): boolean =>
  (process.env.ADMIN_AUTO_PUSH ?? '').trim().toLowerCase() !== 'off';

export type SendOutcome = {
  registered: number;
  sent: number;
  deferred: number;
  failed: number;
  staleRemoved: number;
  skipped: { noToken: number; master: number; category: number };
};

type ExpoTicket = { status: string; message?: string; details?: { error?: string } };

async function postChunk(
  messages: Record<string, unknown>[],
  fetchImpl: typeof fetch,
): Promise<{ tickets: ExpoTicket[]; error?: string }> {
  const response = await fetchImpl(EXPO_PUSH_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(messages),
  });
  if (!response.ok) {
    return { tickets: [], error: `HTTP ${response.status} ${await response.text()}` };
  }
  const payload = (await response.json()) as { data?: ExpoTicket[]; errors?: unknown };
  if (!payload.data) return { tickets: [], error: JSON.stringify(payload.errors ?? payload) };
  return { tickets: payload.data };
}

/**
 * Verilen hedeflere gönderir; ölü token'ları siler.
 *
 * `DeviceNotRegistered` uygulamanın kaldırıldığı anlamına geliyor ve o token bir
 * daha asla çalışmıyor. Bırakılırsa liste sonsuza kadar büyüyor ve her gönderim
 * yavaşlıyor.
 */
async function pushTo(
  db: Firestore,
  targets: Target[],
  payload: PushPayload,
  fetchImpl: typeof fetch,
): Promise<{ sent: number; failed: number; staleRemoved: number }> {
  let sent = 0;
  let failed = 0;
  const stale: string[] = [];

  for (let i = 0; i < targets.length; i += CHUNK_SIZE) {
    const batch = targets.slice(i, i + CHUNK_SIZE);
    const { tickets, error } = await postChunk(
      batch.map((t) => ({
        to: t.token,
        title: payload.title,
        body: payload.body,
        sound: 'default',
        channelId: 'default',
        data: payload.data,
      })),
      fetchImpl,
    );

    if (error) {
      failed += batch.length;
      console.error(`[push] gönderim başarısız (${batch.length} cihaz): ${error}`);
      continue;
    }

    tickets.forEach((ticket, index) => {
      if (ticket.status === 'ok') {
        sent += 1;
        return;
      }
      if (ticket.details?.error === 'DeviceNotRegistered') {
        stale.push(batch[index].id);
        return;
      }
      failed += 1;
      console.error(`[push] hata (${batch[index].id}): ${ticket.message ?? ticket.status}`);
    });
  }

  if (stale.length) {
    const writes = db.batch();
    stale.forEach((id) => writes.delete(db.collection(DEVICES).doc(id)));
    await writes.commit();
  }

  return { sent, failed, staleRemoved: stale.length };
}

async function readDevices(db: Firestore): Promise<DeviceRow[]> {
  const snapshot = await db.collection(DEVICES).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() as DeviceRow['data'] }));
}

/**
 * Bir bildirimi ilgili kategoriye gönderir.
 *
 * Sessiz saatlerdeki cihazlar **atlanmıyor, kuyruğa alınıyor**: eski davranış
 * onları tamamen düşürüyordu, yani gece açılan bir atölyeyi o kullanıcılar hiç
 * duymuyordu.
 */
export async function deliver(
  db: Firestore,
  payload: PushPayload,
  opts: {
    now?: Date;
    /** Kuyruğa alınan bildirim boşa düşmesin diye: etkinlik silinirse iptal edilir. */
    eventId?: string;
    dry?: boolean;
    fetchImpl?: typeof fetch;
  } = {},
): Promise<SendOutcome> {
  const now = opts.now ?? new Date();
  const fetchImpl = opts.fetchImpl ?? fetch;
  const devices = await readDevices(db);
  const selection = selectTargets(devices, payload.category, inClubQuietHours(now));

  const outcome: SendOutcome = {
    registered: devices.length,
    sent: 0,
    deferred: selection.defer.length,
    failed: 0,
    staleRemoved: 0,
    skipped: selection.skipped,
  };

  if (opts.dry) return outcome;

  if (selection.defer.length) {
    await db.collection(PENDING).add({
      notBefore: nextQuietEnd(now).toISOString(),
      createdAt: now.toISOString(),
      tokens: selection.defer.map((t) => t.token),
      payload,
      ...(opts.eventId ? { eventId: opts.eventId } : {}),
    });
  }

  if (selection.send.length) {
    const result = await pushTo(db, selection.send, payload, fetchImpl);
    outcome.sent = result.sent;
    outcome.failed = result.failed;
    outcome.staleRemoved = result.staleRemoved;
  }

  return outcome;
}

/**
 * Aynı olay için ikinci bir bildirimi imkânsız kılar.
 *
 * `create()` var olan dokümanda fırlatıyor, yani iki eşzamanlı istek de aynı
 * kimliği yazamıyor. **Önce iddia, sonra gönderim**: tersi olsaydı gönderim
 * yarıda kalan bir istek yeniden denendiğinde herkese ikinci kez giderdi.
 * Yinelenen bildirim, eksik bildirimden daha çok zarar veriyor.
 */
export async function claimOnce(
  db: Firestore,
  logId: string,
  meta: Record<string, unknown>,
): Promise<boolean> {
  try {
    await db.collection(PUSH_LOG).doc(logId).create({ ...meta, claimedAt: new Date().toISOString() });
    return true;
  } catch {
    return false;
  }
}

/** Bu olay için bildirim daha önce gönderildi mi. */
export async function alreadyAnnounced(db: Firestore, logId: string): Promise<boolean> {
  const doc = await db.collection(PUSH_LOG).doc(logId).get();
  return doc.exists;
}

/**
 * Sessiz saatlerde biriken bildirimleri gönderir.
 *
 * İki şey yeniden kontrol ediliyor, çünkü aradan saatler geçmiş oluyor:
 *
 * - **Etkinlik hâlâ duruyor mu.** Gece açılıp sabah silinmiş bir etkinlik için
 *   "yeni atölye" göndermek, otomasyonun üretebileceği en kötü bildirim.
 * - **Tercihler hâlâ aynı mı.** Gece bildirimleri kapatmış bir kullanıcıya
 *   sabah gönderim yapılmıyor.
 */
export async function flushPending(
  db: Firestore,
  opts: { now?: Date; fetchImpl?: typeof fetch } = {},
): Promise<{ flushed: number; dropped: number; sent: number }> {
  const now = opts.now ?? new Date();
  const fetchImpl = opts.fetchImpl ?? fetch;

  const due = await db.collection(PENDING).where('notBefore', '<=', now.toISOString()).get();
  if (due.empty) return { flushed: 0, dropped: 0, sent: 0 };

  const devices = await readDevices(db);
  let flushed = 0;
  let dropped = 0;
  let sent = 0;

  for (const doc of due.docs) {
    const row = doc.data() as {
      tokens?: unknown;
      payload?: PushPayload;
      eventId?: unknown;
    };
    const payload = row.payload;
    const tokens = Array.isArray(row.tokens) ? row.tokens.filter((t) => typeof t === 'string') : [];

    // Kuyruk dokümanı önce siliniyor: gönderim yarıda kalırsa bir sonraki tur
    // aynı bildirimi tekrar göndermesin.
    await doc.ref.delete();

    if (!payload || tokens.length === 0) {
      dropped += 1;
      continue;
    }

    if (typeof row.eventId === 'string') {
      const event = await db.collection('events').doc(row.eventId).get();
      if (!event.exists) {
        console.log(`[push] kuyruktaki bildirim iptal edildi — etkinlik silinmiş (${row.eventId})`);
        dropped += 1;
        continue;
      }
    }

    // Tercihleri yeniden doğrula: aradan gece geçti.
    const stillWanted = selectTargets(
      devices.filter((d) => typeof d.data.token === 'string' && tokens.includes(d.data.token)),
      payload.category,
      false,
    );
    if (!stillWanted.send.length) {
      dropped += 1;
      continue;
    }

    const result = await pushTo(db, stillWanted.send, payload, fetchImpl);
    sent += result.sent;
    flushed += 1;
  }

  return { flushed, dropped, sent };
}

/** Kuyruğu düzenli aralıklarla boşaltan zamanlayıcı. */
export function startPushFlusher(db: Firestore, everyMs = 10 * 60_000): ReturnType<typeof setInterval> {
  const run = () => {
    void flushPending(db)
      .then(({ flushed, dropped, sent }) => {
        if (flushed || dropped) {
          console.log(`[push] kuyruk: ${flushed} bildirim, ${sent} cihaz, ${dropped} düşürüldü.`);
        }
      })
      .catch((err: unknown) => console.error('[push] kuyruk boşaltılamadı:', err));
  };
  run();
  const timer = setInterval(run, everyMs);
  // Konteyner kapanırken açık bir zamanlayıcı yüzünden beklemesin. Tip
  // tarafında `setInterval` DOM imzasıyla geliyor (bu tsconfig React Native
  // için kurulu), Node'da dönen nesnede `unref` var.
  (timer as unknown as { unref?: () => void }).unref?.();
  return timer;
}

/**
 * Bir kararı uygular: gönderilmeyecekse sebebini yazar, gönderilecekse önce
 * kilidi alır sonra gönderir.
 *
 * **Hiçbir hata çağırana ulaşmıyor.** Bu fonksiyon bir etkinlik kaydedildikten
 * *sonra* çağrılıyor; bildirim gönderilemedi diye kaydın başarısız görünmesi,
 * operatörün formu tekrar doldurması demek olurdu — ve o kayıt zaten yazılmış
 * olurdu.
 */
export async function announce(
  db: Firestore,
  decision: PushDecision,
  opts: { eventId?: string; now?: Date; fetchImpl?: typeof fetch } = {},
): Promise<void> {
  try {
    if (!decision.send) {
      console.log(`[push] gönderilmedi — ${decision.reason}`);
      return;
    }
    if (!autoPushEnabled()) {
      console.log(`[push] ADMIN_AUTO_PUSH=off — "${decision.payload.title}" gönderilmedi.`);
      return;
    }

    const claimed = await claimOnce(db, decision.logId, {
      category: decision.payload.category,
      title: decision.payload.title,
      ...(opts.eventId ? { eventId: opts.eventId } : {}),
    });
    if (!claimed) {
      console.log(`[push] "${decision.logId}" için bildirim zaten gönderilmiş.`);
      return;
    }

    const outcome = await deliver(db, decision.payload, opts);
    console.log(
      `[push] "${decision.payload.title}" → ${outcome.sent} gönderildi, ` +
        `${outcome.deferred} sessiz saate ertelendi, ${outcome.failed} başarısız ` +
        `(${outcome.registered} kayıtlı cihaz).`,
    );
  } catch (err) {
    // Kaydı bozmuyoruz; operatör panelde bir şey görmüyor, sebep günlükte.
    console.error('[push] bildirim gönderilemedi:', err);
  }
}

// ---------------------------------------------------------------------------
// Duyurular
// ---------------------------------------------------------------------------

const PUSH_STATE = 'pushState';
const ANNOUNCEMENT_STATE = 'announcements';

/**
 * Kulübün sitesindeki duyuruları yoklar, yeni olanı bildirir.
 *
 * Duyurular panelde yazılmıyor — kulübün kendi sitesinde yazılıyor ve
 * `api.kouseng.com` üzerinden yayımlanıyor. Etkinliklerdeki gibi bir "kaydet"
 * anı olmadığı için tek yol yoklamak.
 *
 * **İlk tur hiçbir şey göndermiyor**, yalnızca mevcut listeyi işaretliyor:
 * defter boşken sitedeki her duyuru "yeni" görünür ve otomasyon devreye girdiği
 * gün herkesin telefonu arka arkaya titrerdi.
 */
export async function syncAnnouncements(
  db: Firestore,
  opts: {
    now?: Date;
    fetchImpl?: typeof fetch;
    /** Test tohumu. */
    load?: () => Promise<AnnouncementLike[]>;
  } = {},
): Promise<{ announced: number; seeded: number }> {
  const now = opts.now ?? new Date();
  const load = opts.load ?? fetchAnnouncements;

  const stateRef = db.collection(PUSH_STATE).doc(ANNOUNCEMENT_STATE);
  const state = await stateRef.get();
  const seeded = state.exists && typeof state.data()?.seededAt === 'string';

  const announcements = await load();
  if (!announcements.length) return { announced: 0, seeded: 0 };

  // Hangileri deftere girmiş. Liste on kalem civarı, tek tek okumak yeterli.
  const seen = new Set<string>();
  await Promise.all(
    announcements.map(async (item) => {
      if (await alreadyAnnounced(db, pushLogId('announcement', item.id))) seen.add(item.id);
    }),
  );

  const plan = planAnnouncementPushes({ announcements, seen, seeded, now });

  for (const id of plan.seedOnly) {
    await claimOnce(db, pushLogId('announcement', id), { kind: 'announcement', silent: true });
  }
  for (const item of plan.announce) {
    await announce(db, { send: true, logId: item.logId, payload: item.payload }, { now });
  }

  if (!seeded) {
    await stateRef.set({ seededAt: now.toISOString() });
    console.log(
      `[push] duyuru defteri kuruldu: ${plan.seedOnly.length} mevcut duyuru ` +
        'sessizce işaretlendi. Bildirimler bundan sonraki duyurularla başlıyor.',
    );
  }

  return { announced: plan.announce.length, seeded: plan.seedOnly.length };
}

/** Duyuruları düzenli aralıklarla yoklayan zamanlayıcı. */
export function startAnnouncementPoller(
  db: Firestore,
  everyMs = 15 * 60_000,
): ReturnType<typeof setInterval> {
  const run = () => {
    void syncAnnouncements(db)
      .then(({ announced }) => {
        if (announced) console.log(`[push] ${announced} yeni duyuru bildirildi.`);
      })
      // Kulübün sitesi bakıma girerse panel çalışmaya devam etmeli.
      .catch((err: unknown) => console.error('[push] duyurular yoklanamadı:', err));
  };
  run();
  const timer = setInterval(run, everyMs);
  (timer as unknown as { unref?: () => void }).unref?.();
  return timer;
}
