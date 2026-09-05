/**
 * Elle push gönderimi.
 *
 *   npm run push -- --category Duyuru --title "Başlık" --body "Metin"
 *   npm run push -- --category Atölye --title "..." --body "..." --event ev2
 *   npm run push -- --category Duyuru --title "..." --body "..." --dry
 *
 * Etkinlik açma, iptal ve çekiliş sonucu **artık otomatik** — panel kaydettiği
 * anda gönderiyor. Bu script onun dışında kalan her şey için: serbest metinli
 * bir duyuru, bir hatırlatma, bir düzeltme.
 *
 * Gönderim mantığı `admin/push.ts`'te ve panel de onu kullanıyor. İki ayrı
 * uygulama, kategorileri ya da sessiz saatleri farklı yorumlayacakları ilk gün
 * ayrışırdı — ve fark ancak birinin bildirimi almamasıyla görünürdü.
 *
 * Servis hesabı anahtarı gerekiyor: `devices` istemciye kapalı ve öyle kalmalı,
 * sızan bir token listesi herkese bildirim göndirebilmek demek.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import './load-env';
import { cert, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import { deliver } from '../admin/push';
import { inClubQuietHours, PUSHABLE_CATEGORIES } from '../src/pushPolicy';

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
      'Eksik argüman.\n\n' +
        `  npm run push -- --category <${PUSHABLE_CATEGORIES.join('|')}> \\\n` +
        '    --title "Başlık" --body "Metin" [--event ev2] [--dry]\n',
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

async function main() {
  const args = parseArgs();

  initializeApp({ credential: cert(loadServiceAccount()) });
  const db = getFirestore();

  const now = new Date();
  const outcome = await deliver(
    db,
    {
      category: args.category,
      title: args.title,
      body: args.body,
      data: args.event ? { eventId: args.event } : {},
    },
    { now, dry: args.dry, ...(args.event ? { eventId: args.event } : {}) },
  );

  console.log(
    `${outcome.registered} cihaz kayıtlı\n` +
      `  bildirimleri kapalı: ${outcome.skipped.master}\n` +
      `  "${args.category}" kategorisi kapalı: ${outcome.skipped.category}\n` +
      `  token'ı yok: ${outcome.skipped.noToken}`,
  );

  if (args.dry) {
    console.log(
      `\n--dry verildi, hiçbir şey gönderilmedi. Gönderilecekti: ` +
        `${outcome.registered - outcome.skipped.master - outcome.skipped.category - outcome.skipped.noToken} cihaz` +
        (outcome.deferred ? ` (${outcome.deferred} tanesi sessiz saatler yüzünden sabaha)` : ''),
    );
    process.exit(0);
  }

  console.log(`\n${outcome.sent} cihaza gönderildi.`);
  if (outcome.failed) console.log(`${outcome.failed} gönderim başarısız — ayrıntı yukarıda.`);
  if (outcome.staleRemoved) {
    console.log(`${outcome.staleRemoved} geçersiz token silindi (uygulama kaldırılmış).`);
  }
  if (outcome.deferred) {
    // Eskiden bu cihazlar tamamen atlanıyordu ve duyuruyu hiç almıyorlardı.
    console.log(
      `${outcome.deferred} cihaz sessiz saatlerde; bildirimleri kuyruğa alındı ve ` +
        'sabah 08:00’de panel tarafından gönderilecek. (Panel çalışıyor olmalı.)',
    );
  } else if (inClubQuietHours(now)) {
    console.log('Şu an sessiz saatler, ama erteleme isteyen cihaz yok.');
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
