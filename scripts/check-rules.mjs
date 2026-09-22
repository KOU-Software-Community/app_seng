/**
 * `npm run check:rules [kurallar-dosyası]`
 *
 * firestore.rules'u Firestore emülatöründe GERÇEKTEN çalıştırır.
 *
 * Bu depo aylarca "kuralları burada koşturacak ortam yok" diye yazdı ve kurallar
 * iki kez sessizce kırıldı: QR penceresi dize/timestamp karşılaştırdığı için hiç
 * açılmadı, `matches()` RE2'de `[]]` gerçek jetonu eşlemiyordu. İkisi de ancak
 * üretimde ya da elle görüldü. Emülatör tek bir JAR ve Java istiyor; ikisi de
 * CI'da ve bulut konteynerinde var.
 *
 * Senaryolar istemcinin kablodan gönderdiği şekli kuruyor (`pushRegistration`
 * ile aynı batch), kuralın metnini değil. Argüman olarak başka bir kurallar
 * dosyası verilebiliyor: bir korumayı silip bu kontrolün kırmızı verdiğini
 * görmenin yolu bu.
 */
import { execFileSync, spawn } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { initializeApp } from 'firebase/app';
import {
  arrayUnion,
  connectFirestoreEmulator,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
  setLogLevel,
  updateDoc,
  writeBatch,
} from 'firebase/firestore/lite';

const SURUM = '1.19.8';
const JAR = join(homedir(), '.cache', 'firebase-emulators', `cloud-firestore-emulator-v${SURUM}.jar`);
const PORT = 8089;
const PROJE = 'demo-kurallar';
const TABAN = `http://127.0.0.1:${PORT}`;
const KURALLAR = resolve(process.argv[2] ?? 'firestore.rules');

// Reddedilen her yazmayı SDK hata seviyesinde basıyor; burada ret beklenen sonuç.
setLogLevel('silent');

let failed = 0;
function assert(name, condition, detail = '') {
  console.log(`${condition ? '✓' : '✗'} ${name}${condition ? '' : `\n    ${detail}`}`);
  if (!condition) failed += 1;
}

// curl, fetch değil: Node'un fetch'i HTTPS_PROXY'yi okumuyor, curl okuyor.
if (!existsSync(JAR)) {
  mkdirSync(dirname(JAR), { recursive: true });
  execFileSync('curl', [
    '-fsSL',
    '-o',
    JAR,
    `https://storage.googleapis.com/firebase-preview-drop/emulator/cloud-firestore-emulator-v${SURUM}.jar`,
  ]);
}

const emu = spawn(
  'java',
  ['-jar', JAR, '--host=127.0.0.1', `--port=${PORT}`, `--project_id=${PROJE}`, `--rules=${KURALLAR}`],
  { stdio: ['ignore', 'ignore', 'pipe'] },
);
let emuHata = '';
emu.stderr.on('data', (b) => (emuHata += b));

/** Kuralları atlayan yazma (emülatörün `owner` jetonu): sahne kurmak için. */
async function tohum(yol, alanlar) {
  const deger = (v) =>
    Array.isArray(v)
      ? { arrayValue: { values: v.map(deger) } }
      : typeof v === 'number'
        ? { integerValue: String(v) }
        : { stringValue: String(v) };
  const res = await fetch(`${TABAN}/v1/projects/${PROJE}/databases/(default)/documents/${yol}`, {
    method: 'PATCH',
    headers: { Authorization: 'Bearer owner', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fields: Object.fromEntries(Object.entries(alanlar).map(([k, v]) => [k, deger(v)])),
    }),
  });
  if (!res.ok) throw new Error(`tohum ${yol}: ${res.status} ${await res.text()}`);
}

let n = 0;
/** `uid` yoksa kimliksiz istemci. */
function istemci(uid) {
  const db = getFirestore(initializeApp({ projectId: PROJE }, `istemci-${n++}`));
  connectFirestoreEmulator(db, '127.0.0.1', PORT, uid ? { mockUserToken: { sub: uid } } : {});
  return db;
}

/** `src/firebase.ts` → `pushRegistration` ile aynı batch. */
function kaydol(db, p) {
  const b = writeBatch(db);
  b.set(doc(db, 'registrations', p.regId), { ...p, createdAt: serverTimestamp() });
  b.set(doc(db, 'eventSeats', p.eventId), { eventId: p.eventId, seatIds: arrayUnion(p.seatId) }, { merge: true });
  return b.commit();
}

/**
 * Saldırının şekli: yalnızca kayıt dokümanı. Numara işgali için koltuğa gerek
 * yok, ve batch'le sınansaydı koltuk kuralının reddi kayıt kuralındaki bir
 * deliği maskelerdi — ölçüldü, iki bozma o yüzden yeşil kalmıştı.
 */
function kayitYaz(db, p) {
  return setDoc(doc(db, 'registrations', p.regId), { ...p, createdAt: serverTimestamp() });
}

function kayit(no, uid, seatId) {
  return {
    regId: `e1__${no}`,
    seatId,
    eventId: 'e1',
    code: 'KOD123',
    name: 'Elif Yılmaz',
    studentNo: no,
    department: 'Bilgisayar Mühendisliği',
    year: '2',
    ...(uid ? { uid } : {}),
  };
}

/** Sonuç: 'izin' ya da hata kodu. */
async function sonuc(fn) {
  try {
    await fn();
    return 'izin';
  } catch (err) {
    return err?.code ?? String(err);
  }
}
const izin = async (ad, fn) => {
  const r = await sonuc(fn);
  assert(ad, r === 'izin', r);
};
const red = async (ad, fn) => {
  const r = await sonuc(fn);
  assert(ad, r === 'permission-denied', r);
};

try {
  const bitis = Date.now() + 60_000;
  for (;;) {
    const hazir = await fetch(`${TABAN}/`).then((r) => r.ok, () => false);
    if (hazir) break;
    if (emu.exitCode !== null || Date.now() > bitis) {
      throw new Error(`emülatör açılmadı:\n${emuHata.slice(-2000)}`);
    }
    await new Promise((r) => setTimeout(r, 250));
  }

  const PROFIL = {
    adSoyad: 'Elif Yılmaz',
    email: 'elif@example.com',
    dogumTarihi: '2004-05-06',
    kvkkOnayAt: '2026-09-01T00:00:00Z',
    kosullarOnayAt: '2026-09-01T00:00:00Z',
  };
  await tohum('events/e1', { title: 'Git Atölyesi' });
  await tohum('users/u1', { ...PROFIL, telefon: '+905551112233', ogrenciNo: '210000001' });
  await tohum('users/u2', { ...PROFIL, telefon: '+905551112244', ogrenciNo: '210000002' });
  // u3: doğrulanmış ama teklik kaydı olmayan hesap (teklikten önce doğrulanan test hesabı).
  await tohum('users/u3', { ...PROFIL, telefon: '+905551112255', ogrenciNo: '210000003' });
  await tohum('studentClaims/210000001', { uid: 'u1' });
  await tohum('studentClaims/210000002', { uid: 'u2' });

  const u1 = istemci('u1');
  const u2 = istemci('u2');

  // --- kayıtlar
  await red('kimliksiz kayıt reddediliyor', () => kayitYaz(istemci(), kayit('210000001', null, 'koltuk-anon-1')));
  await red('başkasının numarasıyla kayıt reddediliyor', () =>
    kayitYaz(u1, kayit('210000002', 'u1', 'koltuk-u1-baskasi')),
  );
  await red('başkasının uid’siyle kayıt reddediliyor', () =>
    kayitYaz(u1, kayit('210000002', 'u2', 'koltuk-u1-sahte')),
  );
  await red('teklik kaydı olmayan hesap kaydolamıyor', () =>
    kayitYaz(istemci('u3'), kayit('210000003', 'u3', 'koltuk-u3-1')),
  );
  await izin('kendi numarasıyla kayıt geçiyor (ilk koltuk: create dalı)', () =>
    kaydol(u1, kayit('210000001', 'u1', 'koltuk-u1-1')),
  );
  await izin('aynı kaydın yeniden gönderimi geçiyor', () => kaydol(u1, kayit('210000001', 'u1', 'koltuk-u1-1')));
  await red('başkasının kaydını yeniden göndermek reddediliyor', () =>
    kayitYaz(u2, kayit('210000001', 'u1', 'koltuk-u1-1')),
  );
  await izin('ikinci kişi kaydolabiliyor (update dalı)', () => kaydol(u2, kayit('210000002', 'u2', 'koltuk-u2-1')));

  // --- koltuklar
  await red('kayıtsız sahte koltuk reddediliyor', () =>
    setDoc(doc(u2, 'eventSeats', 'e1'), { eventId: 'e1', seatIds: arrayUnion('sahte-koltuk-99') }, { merge: true }),
  );
  await red('kimliksiz sahte koltuk reddediliyor', () =>
    setDoc(doc(istemci(), 'eventSeats', 'e1'), { eventId: 'e1', seatIds: arrayUnion('sahte-koltuk-98') }, { merge: true }),
  );

  // --- profil
  await red('profildeki öğrenci numarası istemciden değişmiyor', () =>
    updateDoc(doc(u1, 'users', 'u1'), { ogrenciNo: '210000009' }),
  );
  await red('profildeki telefon istemciden değişmiyor', () =>
    updateDoc(doc(u1, 'users', 'u1'), { telefon: '+905559999999' }),
  );
  await izin('profilin öteki alanları değişebiliyor', () => updateDoc(doc(u1, 'users', 'u1'), { adSoyad: 'Elif Yıldız' }));
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  failed += 1;
} finally {
  emu.kill();
}

console.log(failed ? `\n${failed} kontrol başarısız.` : '\nTüm kontroller geçti.');
process.exit(failed ? 1 : 0);
