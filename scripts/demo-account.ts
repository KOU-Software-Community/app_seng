/**
 * App Review demo hesabı — doğrulanmış hâlde, tek komutla.
 *
 *   npm run demo:hesap -- --eposta appreview@kouseng.com \
 *     --ad "App Review" --telefon 05550000000 --numara 000000001
 *   npm run demo:hesap -- --eposta appreview@kouseng.com --sil
 *
 * **Neden bir script:** Apple'ın inceleyicisine verilecek hesabın
 * `emailVerified` olması şart, yoksa etkinlik kaydı ekranı doğrulama kapısını
 * gösteriyor ve inceleyici gelmeyen bir kodu bekliyor. Uygulamanın normal
 * akışıyla da yapılabilir (kod operatörün kutusuna düşer) ama o akış panelin
 * dağıtılmış ve kuralların yayınlanmış olmasını istiyor; bu script Admin SDK
 * ile çalıştığı için ikisine de bağlı değil.
 *
 * **DEĞİŞMEZ: doğrulanmış ⇒ telefon ve öğrenci numarası sahiplenilmiş.**
 * `admin/accountApi.ts` bu sırayı koruyor ve burada da aynısı yapılıyor: önce
 * `claimIdentity`, sonra `emailVerified`. Ters sıra, hiç sahiplenme yapılmamış
 * bir hesabı doğrulanmış gösterir ve o değişmezi sessizce kırar — bu deponun
 * defterinde parola sıfırlamanın `emailVerified`'a neden dokunmadığı aynı
 * gerekçeyle yazılı.
 *
 * **Silme de scriptin işi.** Firebase Console'dan kullanıcıyı silmek
 * `phoneClaims`/`studentClaims` kayıtlarını GERİDE BIRAKIR: o telefon ve o
 * numara sonsuza kadar kilitli kalır ve bunu kimse bir hata olarak bildirmez.
 * `--sil` panelin kendi silme yolundan (`processDeletion`) geçiyor.
 *
 * Parola verilmezse üretiliyor ve yalnızca terminale yazılıyor. Argüman olarak
 * geçmek kabuk geçmişine düşürür; gerekirse `DEMO_PAROLA=… npm run demo:hesap`.
 */
import { randomBytes } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

import './load-env';
import { cert, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import { claimIdentity } from '../admin/claims';
import { processDeletion } from '../admin/deletion';
import { MIN_PASSWORD, normalizeEmail, normalizePhone, STUDENT_NO_RE } from '../src/accountSchema';

function arg(name: string): string | undefined {
  const argv = process.argv.slice(2);
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : undefined;
}

const has = (name: string) => process.argv.slice(2).includes(`--${name}`);

function loadServiceAccount() {
  const path = resolve(process.env.FIREBASE_SERVICE_ACCOUNT ?? './service-account.json');
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    console.error(
      `Servis hesabı anahtarı okunamadı: ${path}\n\n` +
        'Firebase Console → Project settings → Service accounts → Generate new key\n' +
        "ile indirip ./service-account.json olarak koyun ya da .env'e\n" +
        'FIREBASE_SERVICE_ACCOUNT=/tam/yol/anahtar.json yazın.',
    );
    process.exit(1);
  }
}

/** Okunabilir ama tahmin edilemez: 18 karakter, base64url'den karıştırıcılar atılmış. */
function parolaUret(): string {
  const alfabe = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
  const bayt = randomBytes(64);
  let out = '';
  for (const b of bayt) {
    if (out.length >= 18) break;
    // Modulo sapması burada önemsiz değil ama zararsız: 256 % 57 ≠ 0, aralık
    // dışı baytlar atılıyor (aynı yaklaşım `makeQrToken`'da da var).
    if (b >= 256 - (256 % alfabe.length)) continue;
    out += alfabe[b % alfabe.length];
  }
  return out;
}

/**
 * Argümanlar Firebase'e BAĞLANMADAN ÖNCE doğrulanıyor.
 *
 * Ters sıra, telefonundaki bir yazım hatasını "servis hesabı anahtarı
 * okunamadı" diye gösteriyordu — anahtarı olmayan biri hangi argümanın yanlış
 * olduğunu hiç öğrenemiyor. Burada ayrıca test edilebilir hâle geliyor: dört
 * dalın dördü de anahtarsız bir makinede koşturulup görüldü.
 */
type Girdi = { eposta: string; adSoyad: string; telefon: string; ogrenciNo: string; dogumTarihi: string; parola: string };

function girdiOku(): Girdi {
  const eposta = normalizeEmail(arg('eposta') ?? '');
  if (!eposta.includes('@')) {
    console.error('--eposta gerekiyor. Örnek: --eposta appreview@kouseng.com');
    process.exit(1);
  }
  if (has('sil')) {
    return { eposta, adSoyad: '', telefon: '', ogrenciNo: '', dogumTarihi: '', parola: '' };
  }

  const adSoyad = (arg('ad') ?? 'App Review').trim().replace(/\s+/g, ' ');
  const telefon = normalizePhone(arg('telefon') ?? '');
  const ogrenciNo = (arg('numara') ?? '').trim();
  const dogumTarihi = arg('dogum') ?? '2000-01-01';

  if (adSoyad.length < 3 || adSoyad.length > 80) {
    console.error('--ad 3–80 karakter olmalı.');
    process.exit(1);
  }
  if (!telefon) {
    console.error('--telefon geçersiz. Örnek: --telefon 05550000000');
    process.exit(1);
  }
  if (!STUDENT_NO_RE.test(ogrenciNo)) {
    console.error('--numara tam dokuz hane olmalı. Örnek: --numara 000000001');
    process.exit(1);
  }

  const parola = process.env.DEMO_PAROLA || parolaUret();
  if (parola.length < MIN_PASSWORD) {
    console.error(`Parola en az ${MIN_PASSWORD} karakter olmalı.`);
    process.exit(1);
  }

  return { eposta, adSoyad, telefon, ogrenciNo, dogumTarihi, parola };
}

async function main() {
  const { eposta, adSoyad, telefon, ogrenciNo, dogumTarihi, parola } = girdiOku();

  initializeApp({ credential: cert(loadServiceAccount()) });
  const db = getFirestore();
  const auth = getAuth();

  if (has('sil')) {
    const kullanici = await auth.getUserByEmail(eposta).catch(() => null);
    if (!kullanici) {
      console.error(`${eposta} diye bir hesap yok.`);
      process.exit(1);
    }
    // Panelin kendi yolu: teklik kayıtlarını serbest bırakıp verileri siliyor.
    const sonuc = await processDeletion(db, kullanici.uid);
    await auth.deleteUser(kullanici.uid);
    console.log(`Silindi: ${eposta} (${sonuc.silinen} doküman, teklik kayıtları serbest).`);
    return;
  }

  // Var olan hesap yeniden kullanılıyor: komutu ikinci kez çalıştırmak yeni
  // bir hesap üretip numarayı ikinci kez sahiplenmeye çalışmasın.
  const mevcut = await auth.getUserByEmail(eposta).catch(() => null);
  const uid = mevcut
    ? (await auth.updateUser(mevcut.uid, { password: parola, displayName: adSoyad })).uid
    : (await auth.createUser({ email: eposta, password: parola, displayName: adSoyad })).uid;

  const simdi = new Date().toISOString();
  // Alan listesi `firestore.rules`'taki `hasOnly` ile birebir: fazladan bir
  // alan, aynı profili uygulamadan güncellemeyi reddettirir.
  await db.collection('users').doc(uid).set(
    {
      adSoyad,
      email: eposta,
      dogumTarihi,
      telefon,
      ogrenciNo,
      kvkkOnayAt: simdi,
      kosullarOnayAt: simdi,
      createdAt: simdi,
    },
    { merge: true },
  );

  // ÖNCE sahiplenme. Panelin `/api/hesap/dogrula` sırasının aynısı.
  const claim = await claimIdentity(db, uid, { telefon, ogrenciNo }, {});
  if (!claim.ok) {
    console.error(
      claim.alan === 'telefon'
        ? `Telefon (${telefon}) başka bir hesapta. Başka bir numara verin.`
        : `Öğrenci numarası (${ogrenciNo}) başka bir hesapta. Başka bir numara verin.`,
    );
    process.exit(1);
  }

  await auth.updateUser(uid, { emailVerified: true });

  console.log(
    [
      '',
      'Demo hesap hazır — App Store Connect → App Review Information → Sign-In Information:',
      '',
      `  User name : ${eposta}`,
      `  Password  : ${parola}`,
      '',
      `  uid       : ${uid}`,
      `  telefon   : ${telefon}`,
      `  öğrenci no: ${ogrenciNo}`,
      '',
      'E-posta doğrulanmış olarak işaretlendi; inceleyiciden kod istenmeyecek.',
      `İnceleme bitince: npm run demo:hesap -- --eposta ${eposta} --sil`,
      '',
    ].join('\n'),
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
