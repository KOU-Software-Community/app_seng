/**
 * Sends a push notification to everyone who asked for that category.
 *
 *   npm run push -- --category Duyuru --title "Başlık" --body "Metin"
 *   npm run push -- --category Atölye --title "..." --body "..." --event ev2
 *   npm run push -- --category Duyuru --title "..." --body "..." --dry
 *
 * There is no backend. This runs on a club laptop, reads the `devices`
 * collection with the Admin SDK, and posts to Expo's push service directly.
 *
 * Needs a Firebase service account key, because `devices` is closed to clients
 * by firestore.rules and must stay that way — a leaked token list would let
 * anyone notify every user. Download one from
 *   Firebase Console → Project settings → Service accounts → Generate new key
 * and point FIREBASE_SERVICE_ACCOUNT at it in .env, or drop it at
 * ./service-account.json. Both paths are gitignored. This key bypasses the
 * security rules entirely; never commit it and never ship it in the app.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import './load-env';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';
/** Expo's documented maximum messages per request. */
const CHUNK_SIZE = 100;
/** Mirrors QUIET_START_HOUR / QUIET_END_HOUR in src/notifications.tsx. */
const QUIET_START_HOUR = 23;
const QUIET_END_HOUR = 8;

type Args = {
  category: string;
  title: string;
  body: string;
  event?: string;
  dry: boolean;
};

function parseArgs(): Args {
  const argv = process.argv.slice(2);
  const get = (name: string) => {
    const i = argv.indexOf(`--${name}`);
    return i >= 0 ? argv[i + 1] : undefined;
  };

  const category = get('category');
  const title = get('title');
  const body = get('body');

  if (!category || !title || !body) {
    console.error(
      'Kullanım:\n' +
        '  npm run push -- --category <Atölye|Söyleşi|Çekiliş|Duyuru|Hatırlatma> \\\n' +
        '                  --title "Başlık" --body "Metin" [--event ev2] [--dry]\n\n' +
        '  --event  bildirime dokununca açılacak etkinlik id\'si\n' +
        '  --dry    kimseye göndermeden kaç cihaza gideceğini gösterir',
    );
    process.exit(1);
  }

  return { category, title, body, event: get('event'), dry: argv.includes('--dry') };
}

function loadServiceAccount() {
  const path = resolve(process.env.FIREBASE_SERVICE_ACCOUNT ?? './service-account.json');
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    console.error(
      `Servis hesabı anahtarı okunamadı: ${path}\n\n` +
        'Firebase Console → Project settings → Service accounts → Generate new key\n' +
        "ile indirip ya ./service-account.json olarak koyun ya da .env'e\n" +
        'FIREBASE_SERVICE_ACCOUNT=/tam/yol/anahtar.json yazın.',
    );
    process.exit(1);
  }
}

type DeviceDoc = {
  token?: unknown;
  master?: unknown;
  categories?: Record<string, unknown>;
  quietHours?: unknown;
};

/** True when the club is sending in the middle of the night, local time. */
function inQuietHours(now: Date): boolean {
  const hour = now.getHours();
  return hour >= QUIET_START_HOUR || hour < QUIET_END_HOUR;
}

type ExpoTicket = { status: string; message?: string; details?: { error?: string } };

async function sendChunk(
  messages: Record<string, unknown>[],
): Promise<{ tickets: ExpoTicket[]; error?: string }> {
  const response = await fetch(EXPO_PUSH_URL, {
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

async function main() {
  const args = parseArgs();

  initializeApp({ credential: cert(loadServiceAccount()) });
  const db = getFirestore();

  const snapshot = await db.collection('devices').get();
  if (snapshot.empty) {
    console.log('Kayıtlı cihaz yok. Henüz kimse bildirim izni vermemiş olabilir.');
    process.exit(0);
  }

  const quiet = inQuietHours(new Date());
  let offCount = 0;
  let categoryOffCount = 0;
  let quietCount = 0;

  const targets: { token: string; id: string }[] = [];

  for (const doc of snapshot.docs) {
    const d = doc.data() as DeviceDoc;
    const token = typeof d.token === 'string' ? d.token : null;
    if (!token) continue;

    if (d.master !== true) {
      offCount++;
      continue;
    }
    // Undefined means the category was added after this device last wrote, so
    // treat it as on - matching the app, which defaults new categories to on.
    if (d.categories?.[args.category] === false) {
      categoryOffCount++;
      continue;
    }
    if (quiet && d.quietHours === true) {
      quietCount++;
      continue;
    }

    targets.push({ token, id: doc.id });
  }

  console.log(
    `${snapshot.size} cihaz kayıtlı → ${targets.length} hedef\n` +
      `  bildirimleri kapalı: ${offCount}\n` +
      `  "${args.category}" kategorisi kapalı: ${categoryOffCount}\n` +
      `  sessiz saatlerde: ${quietCount}`,
  );

  if (quiet) {
    console.log(
      `\nŞu an sessiz saatler (${QUIET_START_HOUR}:00–${QUIET_END_HOUR}:00). ` +
        `${quietCount} cihaz atlandı; onlara ulaşmak için sabah tekrar çalıştırın.`,
    );
  }

  if (args.dry) {
    console.log('\n--dry verildi, hiçbir şey gönderilmedi.');
    process.exit(0);
  }
  if (!targets.length) {
    console.log('\nHedef yok, gönderim yapılmadı.');
    process.exit(0);
  }

  let sent = 0;
  const stale: string[] = [];

  for (let i = 0; i < targets.length; i += CHUNK_SIZE) {
    const batch = targets.slice(i, i + CHUNK_SIZE);
    const { tickets, error } = await sendChunk(
      batch.map((t) => ({
        to: t.token,
        title: args.title,
        body: args.body,
        sound: 'default',
        channelId: 'default',
        data: args.event ? { eventId: args.event } : {},
      })),
    );

    if (error) {
      console.error(`\nGönderim başarısız (${batch.length} cihaz): ${error}`);
      continue;
    }

    tickets.forEach((ticket, index) => {
      if (ticket.status === 'ok') {
        sent++;
        return;
      }
      // The user uninstalled or reinstalled; the token will never work again.
      if (ticket.details?.error === 'DeviceNotRegistered') {
        stale.push(batch[index].id);
        return;
      }
      console.error(`  hata (${batch[index].id}): ${ticket.message ?? ticket.status}`);
    });
  }

  console.log(`\n${sent}/${targets.length} cihaza gönderildi.`);

  if (stale.length) {
    // Left behind, these accumulate forever and slow every future send.
    const batch = db.batch();
    stale.forEach((id) => batch.delete(db.collection('devices').doc(id)));
    await batch.commit();
    console.log(`${stale.length} geçersiz token silindi (uygulama kaldırılmış).`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
