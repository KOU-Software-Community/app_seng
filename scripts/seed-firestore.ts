/**
 * Seeds Firestore with the club's starter content.
 *
 *   npm run seed
 *
 * Reads config from `.env`, and the content itself from `src/data.ts` so there
 * is one source of truth. Safe to re-run: every document is written by a fixed
 * id, so a second run updates rather than duplicates.
 *
 * Requires the Firestore database to exist — create it once at
 * https://console.firebase.google.com → Build → Firestore Database → Create.
 */
import 'dotenv/config';
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { doc, getFirestore, writeBatch } from 'firebase/firestore';

import { ARCHIVE, EVENTS } from '../src/data';
import { COLLECTIONS } from '../src/firebase';
import { firebaseConfig, isFirebaseConfigured } from '../src/firebaseConfig';

/** Firestore hangs and retries forever when the backend is unreachable. */
const TIMEOUT_MS = 20_000;

function withTimeout<T>(p: Promise<T>, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`${label}: ${TIMEOUT_MS}ms içinde yanıt yok`)), TIMEOUT_MS),
    ),
  ]);
}

/** Stable, readable document id — "kis-kampi-backend-101". */
function slug(input: string) {
  const tr: Record<string, string> = { ç: 'c', ğ: 'g', ı: 'i', İ: 'i', ö: 'o', ş: 's', ü: 'u' };
  return input
    .replace(/[çğıİöşü]/g, (c) => tr[c] ?? c)
    .toLocaleLowerCase('tr')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  if (!isFirebaseConfigured) {
    console.error('.env eksik. .env.example dosyasını .env olarak kopyalayıp doldurun.');
    process.exit(1);
  }

  const db = getFirestore(initializeApp(firebaseConfig as FirebaseOptions));
  const batch = writeBatch(db);

  for (const event of EVENTS) {
    const { id, ...rest } = event;
    batch.set(doc(db, COLLECTIONS.events, id), { ...rest, published: true });
  }

  for (const entry of ARCHIVE) {
    batch.set(doc(db, COLLECTIONS.archive, slug(entry.title)), entry);
  }

  console.log(
    `${firebaseConfig.projectId} projesine yazılıyor: ${EVENTS.length} etkinlik, ${ARCHIVE.length} arşiv kaydı...`,
  );

  try {
    await withTimeout(batch.commit(), 'commit');
    console.log('Tamam. Firestore dolduruldu.');
    process.exit(0);
  } catch (err) {
    const e = err as { code?: string; message?: string };
    console.error(`\nYazma başarısız: ${e.code ?? ''} ${e.message ?? err}`);

    if (String(e.message).includes('has not been used in project')) {
      console.error(
        '\nFirestore veritabanı henüz oluşturulmamış.\n' +
          `https://console.firebase.google.com/project/${firebaseConfig.projectId}/firestore\n` +
          'adresinden "Create database" deyip bölge olarak eur3 (europe-west) seçin, sonra bu komutu tekrar çalıştırın.',
      );
    } else if (e.code === 'permission-denied') {
      console.error(
        '\nGüvenlik kuralları yazmayı engelliyor. firestore.rules dosyasındaki\n' +
          'kuralları konsoldaki Rules sekmesine yapıştırın; geçici olarak seed için\n' +
          'yazmaya izin verip sonra geri kapatın.',
      );
    }
    process.exit(1);
  }
}

main();
