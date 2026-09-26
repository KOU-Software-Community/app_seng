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
  Timestamp,
  arrayUnion,
  collection,
  connectFirestoreEmulator,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  setLogLevel,
  updateDoc,
  where,
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
    v instanceof Date
      ? { timestampValue: v.toISOString() }
      : Array.isArray(v)
      ? { arrayValue: { values: v.map(deger) } }
      : typeof v === 'boolean'
        ? { booleanValue: v }
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
/** `uid` yoksa kimliksiz istemci. `email` verilirse jeton e-posta iddiasını da taşıyor. */
function istemci(uid, email) {
  const db = getFirestore(initializeApp({ projectId: PROJE }, `istemci-${n++}`));
  const jeton = uid ? { sub: uid, ...(email ? { email, email_verified: true } : {}) } : undefined;
  connectFirestoreEmulator(db, '127.0.0.1', PORT, jeton ? { mockUserToken: jeton } : {});
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

/** `src/attendance.ts` → `yoklamaVer` ile aynı yazma. */
function yoklama(db, eventId, uid, token) {
  return setDoc(doc(db, 'attendance', `${eventId}__${uid}`), {
    eventId,
    uid,
    token,
    checkedInAt: serverTimestamp(),
  });
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
  // Pencere alanları TIMESTAMP: panel bir süre ISO dizesi yazdı ve kural
  // timestamp ile dizeyi karşılaştıramadığı için pencere hiç açılmadı.
  const saat = 3600_000;
  await tohum('eventQr/e1', {
    token: 'dogru-jeton-e1',
    opensAt: new Date(Date.now() - saat),
    closesAt: new Date(Date.now() + saat),
  });
  await tohum('events/e2', { title: 'Dünkü Atölye' });
  await tohum('eventQr/e2', {
    token: 'dogru-jeton-e2',
    opensAt: new Date(Date.now() - 3 * saat),
    closesAt: new Date(Date.now() - saat),
  });

  // Jeton e-postası profildekiyle aynı: kural profilin e-postasını hesabın
  // adresine eşitliyor, o yüzden e-postasız bir jetonla profil güncellenemez.
  const u1 = istemci('u1', PROFIL.email);
  const u2 = istemci('u2', PROFIL.email);

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

  // --- yoklama (QR)
  await izin('pencere açıkken doğru jetonla yoklama geçiyor', () => yoklama(u1, 'e1', 'u1', 'dogru-jeton-e1'));
  await red('yanlış jetonla yoklama reddediliyor', () => yoklama(u2, 'e1', 'u2', 'uydurma-jeton'));
  await red('pencere kapalıyken yoklama reddediliyor', () => yoklama(u2, 'e2', 'u2', 'dogru-jeton-e2'));
  await red('başkası adına yoklama reddediliyor', () => yoklama(u2, 'e1', 'u3', 'dogru-jeton-e1'));
  await red('kimliksiz yoklama reddediliyor', () => yoklama(istemci(), 'e1', 'u9', 'dogru-jeton-e1'));

  // --- profil
  await red('profildeki öğrenci numarası istemciden değişmiyor', () =>
    updateDoc(doc(u1, 'users', 'u1'), { ogrenciNo: '210000009' }),
  );
  await red('profildeki telefon istemciden değişmiyor', () =>
    updateDoc(doc(u1, 'users', 'u1'), { telefon: '+905559999999' }),
  );
  await izin('profilin öteki alanları değişebiliyor', () => updateDoc(doc(u1, 'users', 'u1'), { adSoyad: 'Elif Yıldız' }));

  // ========================================================================
  // GÜVENLİK TARAMASI — saldırganın şekliyle
  //
  // Yukarısı kuralın YAZMA yollarını sınıyordu; okuma gizliliği, catch-all,
  // panel-özel koleksiyonların kapalılığı ve alan tipleri hiç sınanmamıştı.
  // Aşağıdaki her senaryo ya bir sızıntıyı ya da kuralın istemciye bıraktığı
  // bir serbestliği ölçüyor. Tasarım gereği açık olan yerler `izin` ile
  // yazılıyor ki "kapalı sanılan ama açık" ile "bilerek açık" ayrışsın.
  // ========================================================================
  const anon = istemci();
  const TOK = 'ExponentPushToken[abcDEF123_-xyz]';
  const gecmis = Timestamp.fromDate(new Date('2020-01-01T00:00:00Z'));
  const gelecek = Timestamp.fromDate(new Date('2030-01-01T00:00:00Z'));

  // --- okuma gizliliği
  await red('başkasının kaydı okunamıyor', () => getDoc(doc(u2, 'registrations', 'e1__210000001')));
  await red('kimliksiz kayıt okunamıyor', () => getDoc(doc(anon, 'registrations', 'e1__210000001')));
  await red('kayıt listesi filtresiz okunamıyor', () => getDocs(collection(u1, 'registrations')));
  await red('başkasının uid filtresiyle liste okunamıyor', () =>
    getDocs(query(collection(u2, 'registrations'), where('uid', '==', 'u1'))),
  );
  await izin('kendi kayıtları listelenebiliyor', () =>
    getDocs(query(collection(u1, 'registrations'), where('uid', '==', 'u1'))),
  );
  await izin('kendi yoklaması okunabiliyor', () => getDoc(doc(u1, 'attendance', 'e1__u1')));
  await red('başkasının yoklaması okunamıyor', () => getDoc(doc(u2, 'attendance', 'e1__u1')));
  await red('yoklama listesi etkinlik filtresiyle okunamıyor', () =>
    getDocs(query(collection(u2, 'attendance'), where('eventId', '==', 'e1'))),
  );
  await red('başkasının profili okunamıyor', () => getDoc(doc(u2, 'users', 'u1')));
  await red('kimliksiz profil okunamıyor', () => getDoc(doc(anon, 'users', 'u1')));
  await red('başkasının silme talebi okunamıyor', () => getDoc(doc(u2, 'deletionRequests', 'u1')));
  for (const [kol, id] of [
    ['eventQr', 'e1'],
    ['emailOtp', 'u1'],
    ['phoneClaims', '+905551112233'],
    ['studentClaims', '210000001'],
    ['passwordReset', 'abc'],
    ['pushLog', 'event_created__e1'],
    ['pendingPushes', 'x'],
    ['devices', TOK],
    ['raffleEntries', 'ABCDEFGH23456789'],
    ['tanimsiz', 'x'],
  ]) {
    await red(`${kol} istemciye kapalı (okuma)`, () => getDoc(doc(u1, kol, id)));
  }
  await izin('etkinlik herkese açık', () => getDoc(doc(anon, 'events', 'e1')));
  await izin('koltuk listesi herkese açık', () => getDoc(doc(anon, 'eventSeats', 'e1')));

  // --- panelin koleksiyonları istemciden yazılamıyor
  await red('etkinlik istemciden yazılamıyor', () => setDoc(doc(u1, 'events', 'e9'), { title: 'Sahte' }));
  await red('etkinlik istemciden silinemiyor', () => deleteDoc(doc(u1, 'events', 'e1')));
  await red('çekiliş tanımı istemciden yazılamıyor', () =>
    setDoc(doc(u1, 'raffles', 'e1'), { winners: ['ben'] }, { merge: true }),
  );
  await red('QR jetonu istemciden yazılamıyor', () => setDoc(doc(u1, 'eventQr', 'e1'), { token: 'benim' }, { merge: true }));
  await red('öğrenci numarası istemciden sahiplenilemiyor', () =>
    setDoc(doc(u1, 'studentClaims', '210000003'), { uid: 'u1' }),
  );
  await red('telefon istemciden sahiplenilemiyor', () => setDoc(doc(u1, 'phoneClaims', '+905551112255'), { uid: 'u1' }));

  // --- vitrin: sponsorlar ve slaytlar. Yayındakiler herkese açık, taslak
  //     kapalı, yazan yalnız panel. Liste sorgusu `where('active','==',true)`
  //     taşımak zorunda: kural filtresiz listeyi reddediyor, yoksa taslaklar
  //     da gelirdi.
  await tohum('sponsors/s1', { name: 'Örnek A.Ş.', order: 1, active: true });
  await tohum('sponsors/s2', { name: 'Taslak Ltd.', order: 2, active: false });
  await tohum('slides/sl1', { title: 'Hackathon', order: 1, active: true });
  await tohum('slides/sl2', { title: 'Taslak', order: 2, active: false });
  for (const [kol, acik, taslak] of [
    ['sponsors', 's1', 's2'],
    ['slides', 'sl1', 'sl2'],
  ]) {
    await izin(`${kol}: yayındakiler listelenebiliyor`, () =>
      getDocs(query(collection(anon, kol), where('active', '==', true))),
    );
    await red(`${kol}: filtresiz liste okunamıyor`, () => getDocs(collection(anon, kol)));
    await izin(`${kol}: yayındaki doküman okunuyor`, () => getDoc(doc(anon, kol, acik)));
    await red(`${kol}: taslak okunamıyor`, () => getDoc(doc(anon, kol, taslak)));
    await red(`${kol}: istemci yazamıyor`, () =>
      setDoc(doc(u1, kol, 'sahte'), { name: 'Sahte', title: 'Sahte', order: 1, active: true }),
    );
    await red(`${kol}: istemci taslağı yayına alamıyor`, () =>
      setDoc(doc(u1, kol, taslak), { active: true }, { merge: true }),
    );
  }
  await red('OTP sayacı istemciden sıfırlanamıyor', () =>
    setDoc(doc(u1, 'emailOtp', 'u1'), { attempts: 0 }, { merge: true }),
  );
  await red('sıfırlama kaydı istemciden yazılamıyor', () => setDoc(doc(anon, 'passwordReset', 'abc'), { attempts: 0 }));
  await red('bildirim defteri istemciden yazılamıyor', () => setDoc(doc(u1, 'pushLog', 'x'), { sent: 1 }));
  await red('bildirim kuyruğu istemciden yazılamıyor', () => setDoc(doc(u1, 'pendingPushes', 'x'), { tokens: [TOK] }));
  await red('kayıt silinemiyor', () => deleteDoc(doc(u1, 'registrations', 'e1__210000001')));
  await red('yoklama silinemiyor', () => deleteDoc(doc(u1, 'attendance', 'e1__u1')));
  await red('profil silinemiyor', () => deleteDoc(doc(u1, 'users', 'u1')));
  await red('koltuk dokümanı silinemiyor', () => deleteDoc(doc(u1, 'eventSeats', 'e1')));

  // --- kayıt: istemcinin seçemeyeceği alanlar
  // Her senaryo AYRI etkinlikte: aynı kimliğe ikinci yazma bir update olur ve
  // o dal zaten katı — ilk senaryo geçseydi sonrakiler yanlış sebeple
  // reddedilir ve eksik bir kontrol yeşil görünürdü (eski kurallara karşı
  // ölçüldü: iki tavan kontrolü tam bu yüzden "geçmiş" görünmüştü).
  for (const e of ['e3', 'e4', 'e5', 'e6']) await tohum(`events/${e}`, { title: `Etkinlik ${e}` });
  const yeniKayit = (e, over = {}) => ({
    ...kayit('210000001', 'u1', `koltuk-u1-${e}`),
    regId: `${e}__210000001`,
    eventId: e,
    createdAt: serverTimestamp(),
    ...over,
  });
  const kayitDene = (e, over) => setDoc(doc(u1, 'registrations', `${e}__210000001`), yeniKayit(e, over));
  await red('kayıt saati istemciden seçilemiyor', () => kayitDene('e3', { createdAt: gecmis }));
  await red('kayıt kodu dev metin olamıyor', () => kayitDene('e4', { code: 'x'.repeat(200_000) }));
  await red('kayıt bölümü dev metin olamıyor', () => kayitDene('e5', { department: 'x'.repeat(200_000) }));
  await red('kayıt fazladan alan taşıyamıyor', () => kayitDene('e6', { certificate: 'x' }));
  await red('kayıt adı sonradan değişmiyor', () =>
    updateDoc(doc(u1, 'registrations', 'e1__210000001'), { name: 'Başka Ad' }),
  );
  await red('yeniden gönderimde saat istemciden seçilemiyor', () =>
    updateDoc(doc(u1, 'registrations', 'e1__210000001'), { createdAt: gelecek }),
  );

  // --- koltuklar
  await red('koltuk listesinden koltuk silinemiyor', () =>
    setDoc(doc(u1, 'eventSeats', 'e1'), { eventId: 'e1', seatIds: ['koltuk-u1-1'] }),
  );
  await red('başkasının koltuğu eklenemiyor', () =>
    setDoc(doc(u1, 'eventSeats', 'e1'), { eventId: 'e1', seatIds: arrayUnion('sahte-koltuk-77') }, { merge: true }),
  );
  await red('koltuk dokümanının etkinliği değiştirilemiyor', () =>
    setDoc(doc(u1, 'eventSeats', 'e1'), { eventId: 'e2', seatIds: arrayUnion('koltuk-u1-1') }, { merge: true }),
  );

  // --- yoklama: saat ve sertifika alanı
  await red('yoklama saati dizeye çevrilemiyor', () =>
    updateDoc(doc(u1, 'attendance', 'e1__u1'), { checkedInAt: 'dün' }),
  );
  await red('yoklamaya sertifika istemciden yazılamıyor', () =>
    updateDoc(doc(u1, 'attendance', 'e1__u1'), { certificate: { no: 'SAHTE123', adSoyad: 'Sahte' } }),
  );
  await red('yoklama fazladan alan taşıyamıyor', () =>
    setDoc(doc(u2, 'attendance', 'e1__u2'), {
      eventId: 'e1',
      uid: 'u2',
      token: 'dogru-jeton-e1',
      checkedInAt: serverTimestamp(),
      kaynak: 'panel',
    }),
  );
  await red('yoklama saati geçmişe çekilemiyor', () =>
    setDoc(doc(u2, 'attendance', 'e1__u2'), { eventId: 'e1', uid: 'u2', token: 'dogru-jeton-e1', checkedInAt: gecmis }),
  );
  await red('olmayan etkinliğe yoklama yazılamıyor', () => yoklama(u1, 'e9', 'u1', 'x'));
  await izin('yoklama yeniden gönderimi geçiyor', () => yoklama(u1, 'e1', 'u1', 'dogru-jeton-e1'));

  // --- silme talepleri
  const talep = (uid, over = {}) => ({
    uid,
    email: 'elif@example.com',
    status: 'pending',
    requestedAt: serverTimestamp(),
    ...over,
  });
  await red('başkası adına silme talebi yazılamıyor', () => setDoc(doc(u2, 'deletionRequests', 'u1'), talep('u1')));
  await red('silme talebi "bitti" doğamıyor', () =>
    setDoc(doc(u2, 'deletionRequests', 'u2'), talep('u2', { status: 'done' })),
  );
  await red('silme talebi panel alanı taşıyamıyor', () =>
    setDoc(doc(u2, 'deletionRequests', 'u2'), talep('u2', { kaynak: 'web' })),
  );
  await izin('kendi silme talebi yazılabiliyor', () => setDoc(doc(u2, 'deletionRequests', 'u2'), talep('u2')));
  await red('silme talebi istemciden "bitti" yapılamıyor', () =>
    updateDoc(doc(u2, 'deletionRequests', 'u2'), { status: 'done' }),
  );
  await red('silme talebi istemciden silinemiyor', () => deleteDoc(doc(u2, 'deletionRequests', 'u2')));

  // --- cihazlar (kimliksiz yazılan tek koleksiyon)
  const cihaz = (over = {}) => ({
    token: TOK,
    platform: 'ios',
    master: true,
    categories: { Atölye: true },
    reminder: '1 saat önce',
    quietHours: false,
    updatedAt: serverTimestamp(),
    ...over,
  });
  await izin('cihaz kaydı kimliksiz yazılabiliyor (tasarım)', () => setDoc(doc(anon, 'devices', TOK), cihaz()));
  await red('cihaz kaydı başka jetonun üstüne yazılamıyor', () =>
    setDoc(doc(anon, 'devices', 'ExponentPushToken[baskasi]'), cihaz()),
  );
  await red('uydurma biçimli jeton yazılamıyor', () => setDoc(doc(anon, 'devices', 'abc'), cihaz({ token: 'abc' })));
  await red('cihaz platformu keyfi olamıyor', () => setDoc(doc(anon, 'devices', TOK), cihaz({ platform: 'web' })));
  await red('cihaz kaydı 21 kategori taşıyamıyor', () =>
    setDoc(
      doc(anon, 'devices', TOK),
      cihaz({ categories: Object.fromEntries(Array.from({ length: 21 }, (_, i) => [`k${i}`, true])) }),
    ),
  );
  await red('cihaz kaydına dev updatedAt yazılamıyor', () =>
    setDoc(doc(anon, 'devices', TOK), cihaz({ updatedAt: 'x'.repeat(200_000) })),
  );
  await red('cihaz kaydı okunamıyor', () => getDoc(doc(anon, 'devices', TOK)));
  await red('cihaz kaydı silinemiyor', () => deleteDoc(doc(anon, 'devices', TOK)));

  // --- çekiliş katılımları (kimliksiz yazılabilen ikinci koleksiyon)
  await tohum('raffles/e1', { winnerCount: 1, entriesCloseAt: '2030-01-01T23:59:00+03:00' });
  const ENTRY = 'ABCDEFGH23456789';
  const ENTRY3 = 'CCCCCCCC23456789';
  /** Her olumsuz senaryo kendi kimliğinde — gerekçesi kayıt senaryolarında. */
  const kimlik = (harf) => harf.repeat(8) + '23456789';
  const katilim = (over = {}) => ({
    entryId: ENTRY,
    eventId: 'e1',
    values: { ad: 'Elif' },
    createdAt: serverTimestamp(),
    ...over,
  });
  await izin('kimliksiz çekiliş katılımı yazılabiliyor (tasarım)', () =>
    setDoc(doc(anon, 'raffleEntries', ENTRY), katilim()),
  );
  await izin('aynı katılımın yeniden gönderimi geçiyor', () => setDoc(doc(anon, 'raffleEntries', ENTRY), katilim()));
  await red('katılım değerleri sonradan değiştirilemiyor', () =>
    updateDoc(doc(anon, 'raffleEntries', ENTRY), { values: { ad: 'Başka' } }),
  );
  await red('olmayan çekilişe katılım yazılamıyor', () =>
    setDoc(doc(anon, 'raffleEntries', kimlik('D')), katilim({ entryId: kimlik('D'), eventId: 'e9' })),
  );
  await red('katılım 13 alan taşıyamıyor', () =>
    setDoc(
      doc(anon, 'raffleEntries', kimlik('E')),
      katilim({ entryId: kimlik('E'), values: Object.fromEntries(Array.from({ length: 13 }, (_, i) => [`a${i}`, 'x'])) }),
    ),
  );
  await red('katılım başkasının uid’siyle yazılamıyor', () =>
    setDoc(doc(u1, 'raffleEntries', kimlik('F')), katilim({ entryId: kimlik('F'), uid: 'u2' })),
  );
  await red('katılım saati istemciden seçilemiyor', () =>
    setDoc(doc(anon, 'raffleEntries', kimlik('G')), katilim({ entryId: kimlik('G'), createdAt: gecmis })),
  );
  await red('katılım kimliği keyfi olamıyor', () => setDoc(doc(anon, 'raffleEntries', 'x'), katilim({ entryId: 'x' })));
  await izin('uid taşıyan katılım sahibince yazılabiliyor', () =>
    setDoc(doc(u1, 'raffleEntries', ENTRY3), katilim({ entryId: ENTRY3, uid: 'u1' })),
  );
  await red('uid taşıyan katılıma başkası dokunamıyor', () =>
    setDoc(doc(u2, 'raffleEntries', ENTRY3), katilim({ entryId: ENTRY3, uid: 'u1' })),
  );
  await red('uid taşıyan katılıma kimliksiz dokunulamıyor', () =>
    setDoc(doc(anon, 'raffleEntries', ENTRY3), katilim({ entryId: ENTRY3, uid: 'u1' })),
  );

  // --- profil: panelin sertifika postasını gönderdiği adres burada
  const u4 = istemci('u4', 'u4@example.com');
  const profil = (over = {}) => ({
    ...PROFIL,
    email: 'u4@example.com',
    telefon: '+905551112266',
    ogrenciNo: '210000004',
    createdAt: serverTimestamp(),
    ...over,
  });
  await red('profil başkasının kimliğine yazılamıyor', () => setDoc(doc(u4, 'users', 'u1'), profil()));
  await red('profil telefonu biçimsiz olamıyor', () => setDoc(doc(u4, 'users', 'u4'), profil({ telefon: '05551112266' })));
  await red('profil numarası biçimsiz olamıyor', () => setDoc(doc(u4, 'users', 'u4'), profil({ ogrenciNo: '2100' })));
  await red('profil fazladan alan taşıyamıyor', () => setDoc(doc(u4, 'users', 'u4'), profil({ rol: 'admin' })));
  await red('profil e-postası 300 karakter olamıyor', () =>
    setDoc(doc(u4, 'users', 'u4'), profil({ email: `${'a'.repeat(300)}@example.com` })),
  );
  await red('profil e-postası jetondakinden farklı olamıyor', () =>
    setDoc(doc(u4, 'users', 'u4'), profil({ email: 'kurban@example.com' })),
  );
  await red('profil onay damgası dev metin olamıyor', () =>
    setDoc(doc(u4, 'users', 'u4'), profil({ kvkkOnayAt: 'x'.repeat(200_000) })),
  );
  await red('profil oluşturulma saati istemciden seçilemiyor', () =>
    setDoc(doc(u4, 'users', 'u4'), profil({ createdAt: gecmis })),
  );
  await izin('kendi profili yazılabiliyor', () => setDoc(doc(u4, 'users', 'u4'), profil()));
  await red('profil e-postası yabancı bir adrese çevrilemiyor', () =>
    updateDoc(doc(u4, 'users', 'u4'), { email: 'baska@example.com' }),
  );
  await red('profil oluşturulma saati sonradan değişmiyor', () =>
    updateDoc(doc(u4, 'users', 'u4'), { createdAt: gelecek }),
  );
  await izin('profil adı sonradan değişebiliyor', () => updateDoc(doc(u4, 'users', 'u4'), { adSoyad: 'Elif Yıldız Demir' }));

  // Eski kurallarla yazılmış, hesabın adresinden farklı e-posta taşıyan profil
  // (PR #74 incelemesi): yalnızca "değişmesin" denseydi bu adres sonsuza kadar
  // geçerli kalırdı. Şimdi adres düzeltilmeden hiçbir alan güncellenemiyor,
  // düzeltmesi de tek yol — hesabın kendi adresi.
  await tohum('users/u5', { ...PROFIL, email: 'kurban@example.com', telefon: '+905551112277', ogrenciNo: '210000005' });
  const u5 = istemci('u5', 'u5@example.com');
  await red('uyumsuz e-postalı eski profil düzeltilmeden güncellenemiyor', () =>
    updateDoc(doc(u5, 'users', 'u5'), { adSoyad: 'Başka Ad' }),
  );
  await red('uyumsuz e-posta başka bir yabancı adrese çevrilemiyor', () =>
    updateDoc(doc(u5, 'users', 'u5'), { email: 'baska@example.com' }),
  );
  await izin('e-postayı hesabın adresine eşitleyen güncelleme geçiyor', () =>
    updateDoc(doc(u5, 'users', 'u5'), { email: 'u5@example.com', adSoyad: 'Düzeltilmiş Ad' }),
  );
} catch (err) {
  console.error(err instanceof Error ? err.message : err);
  failed += 1;
} finally {
  emu.kill();
}

console.log(failed ? `\n${failed} kontrol başarısız.` : '\nTüm kontroller geçti.');
process.exit(failed ? 1 : 0);
