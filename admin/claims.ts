/**
 * Teklik: bir telefon numarası ve bir öğrenci numarası tek hesaba ait.
 *
 * E-posta tekliği zaten Firebase Auth'un işi (`auth/email-already-in-use`),
 * yani burada yalnızca kalan ikisi var.
 *
 * **Neden kural değil de panel:** kurallarla da yazılabilirdi (değer doküman
 * kimliği olur, `allow create` var olan dokümanda düşer — `set()` bir update
 * sayıldığı için). İki sebeple yazılmadı:
 *
 * 1. **İkisi birden ya da hiçbiri.** İki ayrı istemci yazması atomik değil:
 *    telefon tutuyor, numara çakışıyor, ve geride kimsenin sahiplenmediği bir
 *    telefon kaydı kalıyor. Admin SDK'nın işlemi bunu tek adımda yapıyor.
 * 2. **Çakışan alanın adı söylenebiliyor.** Kural reddi istemciye tek bir
 *    `permission-denied` olarak dönüyor; kullanıcıya "telefon mu numara mı"
 *    denemezdi.
 *
 * **Zorlamadığı şey:** numaranın gerçekten o kişiye ait olduğu. Üniversiteye
 * soracak bir yer yok. Zorladığı tek şey aynı numaranın ikinci bir hesapta
 * kullanılamaması — sertifikanın dayandığı varsayım da yalnızca bu kadarı.
 *
 * **SERBEST BIRAKMA SAHİPLİK KONTROLÜ İSTİYOR, ve bu bir ayrıntı değil.**
 * Serbest bırakılacak eski değerler `users/{uid}`'den okunuyor ve o doküman
 * TAMAMEN İSTEMCİNİN kontrolünde (kural yalnızca sahiplik bakıyor, alan
 * denetimi yok). Koşulsuz silen bir `tx.delete`, kendi profiline kurbanın
 * telefonunu yazan birine **başkasının teklik kaydını sildirme** yetkisi
 * veriyordu: numara boşa düşüyor, saldırgan onu kendi hesabına alıyor, ve
 * kurban bir daha kendi numarasıyla doğrulanamıyor. Belirti kurbanda
 * "numaram başkasında" — kimse bunu bir saldırı olarak bildirmez.
 *
 * Bu yüzden her silme önce kaydı okuyup `uid`'in bize ait olduğunu
 * doğruluyor. Okuma işlem içinde yapılıyor (Firestore bütün okumaları
 * yazmalardan önce istiyor), yani araya kimse giremiyor.
 */
import type { Firestore, Transaction } from 'firebase-admin/firestore';

export const PHONE_CLAIMS = 'phoneClaims';
export const STUDENT_CLAIMS = 'studentClaims';

export type Kimlik = { telefon: string; ogrenciNo: string };

export type ClaimResult =
  | { ok: true }
  | { ok: false; alan: 'telefon' | 'ogrenciNo' };

/**
 * Tek bir sahiplenmeyi işlem içinde dener.
 *
 * `null` → boşta ya da zaten bizim. Aksi hâlde başkasının.
 */
async function sahiplen(
  tx: Transaction,
  db: Firestore,
  koleksiyon: string,
  deger: string,
  uid: string,
): Promise<boolean> {
  const ref = db.collection(koleksiyon).doc(deger);
  const snap = await tx.get(ref);
  if (snap.exists && snap.get('uid') !== uid) return false;
  return true;
}

/**
 * Telefon ve öğrenci numarasını bu hesaba bağlar.
 *
 * Eski değerler serbest bırakılıyor: çakışma yüzünden numarasını düzelten
 * kullanıcı, düzeltmeden önceki değeri sonsuza kadar kilitli bırakmasın.
 *
 * Firestore işlemi **bütün okumaları yazmalardan önce** istiyor, o yüzden iki
 * kontrol de baştan yapılıyor.
 */
export async function claimIdentity(
  db: Firestore,
  uid: string,
  yeni: Kimlik,
  eski: Partial<Kimlik> = {},
): Promise<ClaimResult> {
  return db.runTransaction(async (tx) => {
    if (!(await sahiplen(tx, db, PHONE_CLAIMS, yeni.telefon, uid))) {
      return { ok: false, alan: 'telefon' } as const;
    }
    if (!(await sahiplen(tx, db, STUDENT_CLAIMS, yeni.ogrenciNo, uid))) {
      return { ok: false, alan: 'ogrenciNo' } as const;
    }

    // Serbest bırakılacak eski değerler İSTEMCİNİN yazdığı profilden geliyor;
    // bizim olduklarını burada doğrulamak zorundayız. Okumalar yazmalardan
    // ÖNCE — Firestore işlemi başka türlüsünü kabul etmiyor.
    const telefonBizim =
      !!eski.telefon &&
      eski.telefon !== yeni.telefon &&
      (await bizimMi(tx, db, PHONE_CLAIMS, eski.telefon, uid));
    const ogrenciBizim =
      !!eski.ogrenciNo &&
      eski.ogrenciNo !== yeni.ogrenciNo &&
      (await bizimMi(tx, db, STUDENT_CLAIMS, eski.ogrenciNo, uid));

    const now = new Date().toISOString();
    tx.set(db.collection(PHONE_CLAIMS).doc(yeni.telefon), { uid, claimedAt: now });
    tx.set(db.collection(STUDENT_CLAIMS).doc(yeni.ogrenciNo), { uid, claimedAt: now });

    if (telefonBizim) tx.delete(db.collection(PHONE_CLAIMS).doc(eski.telefon!));
    if (ogrenciBizim) tx.delete(db.collection(STUDENT_CLAIMS).doc(eski.ogrenciNo!));

    return { ok: true } as const;
  });
}

/** Kayıt var ve bu hesaba mı ait? Yoksa (ya da başkasınınsa) silinmeyecek. */
async function bizimMi(
  tx: Transaction,
  db: Firestore,
  koleksiyon: string,
  deger: string,
  uid: string,
): Promise<boolean> {
  const snap = await tx.get(db.collection(koleksiyon).doc(deger));
  return snap.exists && snap.get('uid') === uid;
}

/**
 * Hesap silinirken sahiplenmeleri serbest bırakır.
 *
 * `admin/deletion.ts` koleksiyon listelerinden gidiyor ve bunlar o listelere
 * girmiyor: doküman kimliği `uid` değil, telefonun/numaranın kendisi. Silme
 * yoklayıcısı bu fonksiyonu çağırmazsa **silinen hesabın numarası sonsuza
 * kadar kilitli kalır** ve aynı kişi bir daha kayıt olamaz.
 *
 * `uid` ARTIK ZORUNLU ve silme ona bağlı. Değerler yine `users/{uid}`'den,
 * yani istemcinin yazdığı yerden geliyor; koşulsuz silen eski hâl, silinmek
 * üzere olan bir hesabın profiline kurbanın numarasını yazarak **kurbanın
 * teklik kaydını sildirmeye** izin veriyordu. Silinen hesabın kendi kaydı
 * zaten `uid` eşleştiği için serbest kalıyor.
 */
export async function releaseIdentity(
  db: Firestore,
  uid: string,
  kimlik: Partial<Kimlik>,
): Promise<void> {
  await sahibiysenSil(db, PHONE_CLAIMS, kimlik.telefon, uid);
  await sahibiysenSil(db, STUDENT_CLAIMS, kimlik.ogrenciNo, uid);
}

async function sahibiysenSil(
  db: Firestore,
  koleksiyon: string,
  deger: string | undefined,
  uid: string,
): Promise<void> {
  if (!deger) return;
  const ref = db.collection(koleksiyon).doc(deger);
  const snap = await ref.get();
  if (snap.exists && snap.get('uid') === uid) await ref.delete();
}
