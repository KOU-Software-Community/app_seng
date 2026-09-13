/**
 * Etkinlik QR'ı ve yoklama — panel tarafı.
 *
 * Jeton `eventQr/{eventId}` dokümanında duruyor ve **istemciye kapalı**.
 * Firestore kuralı onu `get()` ile okuyup yazılan yoklamayla karşılaştırıyor;
 * kural değerlendirmesi istemcinin okuma izninden geçmediği için jeton hiç
 * kabloya çıkmıyor. Sunucu uç noktası, Cloud Function ve Blaze
 * gerektirmemesinin tek sebebi bu.
 */
import { randomBytes } from 'node:crypto';

import { Timestamp, type Firestore } from 'firebase-admin/firestore';

import { toLocalIso } from '../src/eventSchema';
import { defaultWindow, makeQrToken, type Pencere } from '../src/qrSchema';

export const QR_COLLECTION = 'eventQr';
export const ATTENDANCE_COLLECTION = 'attendance';

export type QrTanimi = Pencere & { token: string; eventId: string };

/*
  PENCERE FIRESTORE'A `Timestamp` OLARAK YAZILIYOR, ISO DİZESİ OLARAK DEĞİL.

  Kural şunu diyor:

      request.time >= qrTanimi(eventId).opensAt

  `request.time` bir `timestamp`. Alan bir DİZE olduğu sürece bu karşılaştırma
  bir tip uyuşmazlığı ve kural dili hata veren bir ifadeyi REDDEDEREK bitiriyor
  — yani pencere hiçbir zaman açılmıyordu. Ne varsayılan pencere ne de panelden
  elle girilen pencere işe yarıyordu; belirti ikisinde de aynı: "Bu kod şu anda
  geçerli değil". Operatör tarihi değiştirip tekrar deniyor, hiçbir şey
  değişmiyor, ve sebebi hiçbir yerde yazmıyor.

  Panelin geri kalanı DİZE görüyor: `qrView` ISO'yu regex ile parçalayıp
  `datetime-local` kutularını dolduruyor, `defaultWindow` ISO üretiyor. Dönüşüm
  bu yüzden tam burada, Firestore sınırında duruyor — tek yerde.
*/

/** Firestore'a yazılacak hâl. Okunamayan tarihte `null`. */
function pencereyiYaz(p: Pencere): { opensAt: Timestamp; closesAt: Timestamp } | null {
  const a = new Date(p.opensAt);
  const k = new Date(p.closesAt);
  if (!Number.isFinite(a.getTime()) || !Number.isFinite(k.getTime())) return null;
  return { opensAt: Timestamp.fromDate(a), closesAt: Timestamp.fromDate(k) };
}

/**
 * Dokümandan pencereyi ISO olarak okur.
 *
 * Eski kayıtlar dizeydi ve hâlâ öyle duruyor olabilir; okuma ikisini de
 * kabul ediyor, yazma yalnızca `Timestamp` üretiyor. Tanınmayan değerde boş
 * dize dönüyor — `qrView` onu `—` diye gösteriyor, uydurma bir tarih değil.
 */
function pencereAlani(v: unknown): string {
  if (v instanceof Timestamp) return toLocalIso(v.toDate());
  if (typeof v === 'string') return v;
  return '';
}

function pencereyiOku(d: Record<string, unknown>): Pencere {
  return { opensAt: pencereAlani(d.opensAt), closesAt: pencereAlani(d.closesAt) };
}

/** Kayıtlı pencere kuralın okuyabileceği tipte mi? */
function tipiDogru(d: Record<string, unknown>): boolean {
  return d.opensAt instanceof Timestamp && d.closesAt instanceof Timestamp;
}

function yeniJeton(): string {
  return makeQrToken((n) => Uint8Array.from(randomBytes(n)));
}

/**
 * Etkinliğin QR tanımını verir; yoksa etkinliğin saatinden türetip yazar.
 *
 * Kendiliğinden doğması gerekiyor: operatörün "QR oluştur" diye ayrı bir adım
 * hatırlaması, unutulduğunda etkinlik günü kimsenin okutamaması demek — ve o
 * an düzeltmenin en pahalı olduğu an.
 */
export async function ensureQr(db: Firestore, eventId: string, startsAt: string): Promise<QrTanimi> {
  const ref = db.collection(QR_COLLECTION).doc(eventId);
  const snap = await ref.get();
  if (snap.exists) {
    const d = snap.data() ?? {};
    const tanim: QrTanimi = { eventId, token: String(d.token ?? ''), ...pencereyiOku(d) };
    /*
      DİZE OLARAK YAZILMIŞ ESKİ KAYITLAR BURADA ONARILIYOR.

      Tip düzeltmesi tek başına yetmiyordu: `eventQr` dokümanı bir kez doğduktan
      sonra hiçbir yazıcı ona dokunmuyor, yani üretimde duran her doküman dize
      taşımaya devam ederdi ve yoklama o etkinliklerde çalışmamaya devam
      ederdi — yeni kod dağıtılmış olmasına rağmen. Operatörün "QR" sayfasını
      açması onarım için yeterli; ayrı bir göç adımı hatırlanması gereken bir
      şey olurdu ve hatırlanmadığında belirtisi yine sessizlik.
    */
    if (!tipiDogru(d)) {
      const yazilacak = pencereyiYaz(tanim);
      if (yazilacak) await ref.set(yazilacak, { merge: true });
    }
    return tanim;
  }

  const pencere = defaultWindow(startsAt);
  if (!pencere) {
    throw new Error(`Etkinliğin başlangıç saati okunamadı, QR penceresi hesaplanamıyor: ${startsAt}`);
  }
  const yazilacak = pencereyiYaz(pencere);
  if (!yazilacak) {
    throw new Error(`QR penceresi tarihe çevrilemedi: ${pencere.opensAt} – ${pencere.closesAt}`);
  }
  const tanim: QrTanimi = { eventId, token: yeniJeton(), ...pencere };
  await ref.set({ eventId, token: tanim.token, ...yazilacak });
  return tanim;
}

/**
 * Jetonu yeniler. Eski jeton o anda ölüyor.
 *
 * Var olma sebebi: yanlış basılmış bir afiş, sızdığına pişman olunan bir kod,
 * ya da yanlış etkinliğin QR'ının projeksiyona düşmesi. Pencere korunuyor —
 * yenileme bir zaman kararı değil, bir kimlik kararı.
 */
export async function regenerateQr(db: Firestore, eventId: string): Promise<QrTanimi> {
  const ref = db.collection(QR_COLLECTION).doc(eventId);
  const snap = await ref.get();
  const d = snap.data() ?? {};
  const tanim: QrTanimi = { eventId, token: yeniJeton(), ...pencereyiOku(d) };
  // Pencere korunuyor ve yazarken TİPİ de düzeliyor: dize taşıyan eski bir
  // doküman jeton yenilendikten sonra da kural tarafından okunamaz kalmasın.
  const yazilacak = pencereyiYaz(tanim);
  await ref.set({ eventId, token: tanim.token, ...(yazilacak ?? {}) }, { merge: !yazilacak });
  return tanim;
}

/** Pencereyi elle değiştirir. Jeton korunuyor — basılmış afiş geçerli kalsın. */
export async function setQrWindow(db: Firestore, eventId: string, pencere: Pencere): Promise<void> {
  const yazilacak = pencereyiYaz(pencere);
  if (!yazilacak) throw new Error(`Pencere tarihe çevrilemedi: ${pencere.opensAt} – ${pencere.closesAt}`);
  await db.collection(QR_COLLECTION).doc(eventId).set(yazilacak, { merge: true });
}

export type YoklamaSatiri = {
  uid: string;
  adSoyad: string;
  ogrenciNo: string;
  email: string;
  kaynak: 'qr' | 'panel';
  checkedInAt: string;
  sertifikaNo?: string;
  /** Teslim durumu. `sertifikaNo` varken ikisi de boşsa belge hiç gönderilmemiş. */
  postaGitti?: boolean;
  postaHatasi?: string;
};

/**
 * Bir etkinliğin yoklama listesi, profillerle birleştirilmiş.
 *
 * İsim `attendance` dokümanında DURMUYOR ve durmamalı: orası yoklama defteri,
 * kişisel veri kopyası değil. İki yerde tutmak, ikisinin ayrışmasının tek
 * sebebi olurdu — ad profilde değişince yoklama eski adı gösterirdi.
 */
export async function attendanceRows(db: Firestore, eventId: string): Promise<YoklamaSatiri[]> {
  const snap = await db.collection(ATTENDANCE_COLLECTION).where('eventId', '==', eventId).get();
  if (snap.empty) return [];

  const uidler = snap.docs.map((d) => String(d.get('uid') ?? '')).filter(Boolean);
  const profiller = new Map<string, Record<string, unknown>>();
  // `getAll` tek turda okuyor; uid başına ayrı `get()` yüz kişilik bir
  // etkinlikte yüz gidiş dönüş demekti.
  if (uidler.length) {
    const refs = uidler.map((u) => db.collection('users').doc(u));
    const docs = await db.getAll(...refs);
    docs.forEach((d, i) => profiller.set(uidler[i], d.data() ?? {}));
  }

  return snap.docs
    .map((d) => {
      const uid = String(d.get('uid') ?? '');
      const p = profiller.get(uid) ?? {};
      const sertifika = d.get('certificate') as
        | { no?: string; mailedAt?: string; mailError?: string }
        | undefined;
      return {
        uid,
        adSoyad: String(p.adSoyad ?? '(profil yok)'),
        ogrenciNo: String(p.ogrenciNo ?? ''),
        email: String(p.email ?? ''),
        kaynak: (d.get('kaynak') === 'panel' ? 'panel' : 'qr') as 'qr' | 'panel',
        checkedInAt: zamanMetni(d.get('checkedInAt')),
        sertifikaNo: sertifika?.no,
        postaGitti: Boolean(sertifika?.mailedAt),
        postaHatasi: sertifika?.mailError || undefined,
      };
    })
    .sort((a, b) => a.adSoyad.localeCompare(b.adSoyad, 'tr'));
}

function zamanMetni(v: unknown): string {
  if (v && typeof v === 'object' && 'toDate' in (v as object)) {
    try {
      return (v as { toDate(): Date }).toDate().toISOString();
    } catch {
      return '';
    }
  }
  return typeof v === 'string' ? v : '';
}

/**
 * Elle yoklama — QR okutamamış ya da telefonu olmayan katılımcı için.
 *
 * **Sertifika akışının QR'a bağımlı olmamasının sebebi bu.** QR henüz her
 * etkinlikte kullanılmıyor; yoklama kaydı panelden de doğabiliyor ve
 * sertifika ikisini ayırt etmiyor. `kaynak` alanı yalnızca panelde görünüyor,
 * sertifikaya girmiyor: belge "katıldı" diyor, "nasıl işaretlendi" demiyor.
 */
export async function markAttendance(db: Firestore, eventId: string, uid: string, now: Date): Promise<void> {
  await db
    .collection(ATTENDANCE_COLLECTION)
    .doc(`${eventId}__${uid}`)
    .set({ eventId, uid, kaynak: 'panel', checkedInAt: now }, { merge: true });
}

/**
 * Elle işaretlemeyi geri alır.
 *
 * Sertifikası yayınlanmış bir yoklama **silinmiyor**: belge dışarıda, adresi
 * paylaşılmış olabilir, ve dayanağını silmek onu doğrulanamaz hâle getirir.
 * Böyle bir satırı geri almak isteyen operatörün önce sertifikayı iptal
 * etmesi gerekiyor — o ayrı ve bilerek daha görünür bir işlem.
 */
export async function unmarkAttendance(db: Firestore, eventId: string, uid: string): Promise<'silindi' | 'sertifika-var'> {
  const ref = db.collection(ATTENDANCE_COLLECTION).doc(`${eventId}__${uid}`);
  const snap = await ref.get();
  if (!snap.exists) return 'silindi';
  if (snap.get('certificate')) return 'sertifika-var';
  await ref.delete();
  return 'silindi';
}

/** Kaydolmuş ama yoklamada olmayanlar — kulübün en çok sorduğu liste. */
export async function registeredNotPresent(
  db: Firestore,
  eventId: string,
): Promise<{ adSoyad: string; studentNo: string; hesapVar: boolean }[]> {
  const [kayitlar, yoklama] = await Promise.all([
    db.collection('registrations').where('eventId', '==', eventId).get(),
    db.collection(ATTENDANCE_COLLECTION).where('eventId', '==', eventId).get(),
  ]);
  const gelenler = new Set(yoklama.docs.map((d) => String(d.get('uid') ?? '')));
  return kayitlar.docs
    .filter((d) => {
      const uid = String(d.get('uid') ?? '');
      return !uid || !gelenler.has(uid);
    })
    .map((d) => ({
      adSoyad: String(d.get('name') ?? ''),
      studentNo: String(d.get('studentNo') ?? ''),
      // Hesabı olmayan kayıt yoklamaya giremiyor ve sertifika alamıyor —
      // operatör bunu listede görmeli, yoksa "neden işaretleyemiyorum" diye
      // sorar ve cevabı hiçbir yerde yazmaz.
      hesapVar: Boolean(d.get('uid')),
    }))
    .sort((a, b) => a.adSoyad.localeCompare(b.adSoyad, 'tr'));
}
