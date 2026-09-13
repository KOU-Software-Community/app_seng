/**
 * Hesap silme temizliği.
 *
 * Bu iş normalde Auth `onDelete` tetikleyicisinin: kullanıcı silinir,
 * fonksiyon verisini toplar. Cloud Functions bu projede **yok** — Firebase'in
 * kendi belgesi net, dağıtmak için Blaze planı gerekiyor ve bu proje Spark'ta
 * (Storage'ın Blaze istemesiyle aynı sebep). Dolayısıyla temizlik panelin
 * üçüncü yoklayıcısı; `startPushFlusher` ve `startAnnouncementPoller` ile
 * aynı desen.
 *
 * Sıra: önce veri, **en son** Auth kaydı. Ters olsaydı istemci kendi
 * talebinin bittiğini okuyamaz ve Apple'ın istediği "tamamlandı" onayı
 * verilemezdi.
 */
import { getAuth } from 'firebase-admin/auth';
import type { Firestore } from 'firebase-admin/firestore';

import { releaseIdentity } from './claims';

/** Yoklama aralığı. Kullanıcı ekranda bekliyor olabilir; sık ama bedava değil. */
const INTERVAL_MS = 60_000;

/**
 * İstemci Auth kaydını kendisi siliyor (ekranda onayı gördükten sonra).
 * Uygulamayı kapatırsa bu süre sonunda panel siliyor — Apple silmenin
 * tamamlanmasını istiyor, kullanıcının ekranda kalmasını değil.
 */
const AUTH_GRACE_MS = 10 * 60_000;

/**
 * Bir kullanıcının verisinin durduğu yerler.
 *
 * İki liste çünkü iki farklı şekilde bulunuyorlar: profilin doküman kimliği
 * `uid`'in kendisi, kayıtların kimliği ise öğrenci numarasından türüyor ve
 * yalnızca `uid` alanıyla sorgulanabiliyor.
 *
 * `processDeletion` bu listeleri **dolaşıyor**, elle yazılmış bir sırayı
 * değil. Listeye eklenip döngüye eklenmeyen bir koleksiyon, silindiğini sanan
 * bir kullanıcının geride kalan verisi olurdu ve bunu kimse fark etmez —
 * listeyi tek doğru kaynak yapmak o ihtimali ortadan kaldırıyor.
 */
export const USER_DOC_COLLECTIONS = ['users', 'emailOtp'] as const;
/**
 * `attendance` BU LİSTEDE, ve unutulması sertifikayı da kapsıyordu.
 *
 * Yoklama satırı `uid` taşıyor ve üstüne sertifika yazılıyor — yani kişinin
 * adı (yayın anında dondurulmuş hâliyle) orada duruyor. Liste QR turunda
 * yazıldı, `attendance` ise o turdan sonra doğdu: silme sayfası "etkinlik
 * kayıtlarınız" derken bu koleksiyona hiç dokunmuyordu.
 *
 * Sertifikanın kendisi de gidiyor: belge hesaba bağlı, hesap yoksa belgenin
 * dayanağı da yok. Doğrulama adresi artık "böyle bir belge yok" diyor.
 */
export const USER_QUERY_COLLECTIONS = ['registrations', 'raffleEntries', 'attendance'] as const;

/**
 * `uid` TAŞIMAYAN kayıtlar da silinmek zorunda, ve onlar yalnızca öğrenci
 * numarasından bulunabiliyor.
 *
 * Mağazada hesapsız bir sürüm var ve o sürümün yazdığı `registrations`
 * dokümanında `uid` alanı yok — `where('uid','==',uid)` onları hiç görmüyor.
 * Yani hesabını silen bir kullanıcının adı, numarası, bölümü ve telefonu
 * veritabanında kalıyordu, üstelik sayfa "bütün verileriniz silinir" diyerek.
 * Bunu kimse bir hata olarak bildirmez: silinen bir şeyin geride kaldığını
 * ancak veritabanına bakan biri görür.
 *
 * Numara `users/{uid}` okunduğu anda zaten elde; ayrıca bir yerden gelmiyor.
 */
const STUDENT_NO_COLLECTIONS = ['registrations'] as const;

export type DeletionOutcome = { uid: string; silinen: number };

/**
 * Tek bir talebi işler.
 *
 * `registrations` ve `raffleEntries` `uid` alanına göre sorgulanıyor —
 * doküman kimliğinden bulunamıyorlar, çünkü kimlik öğrenci numarasından
 * türüyor ve panel kullanıcının numarasını bilmiyor.
 *
 * Koltuk jetonu (`eventSeats`) bilerek **silinmiyor**: jeton rastgele ve
 * kişisel veri taşımıyor, ama listeden çıkarmak kontenjanı geriye açar ve
 * etkinliğe fazladan kişi alınmasına yol açar. Kayıt silindiği için panel
 * "sayacı gerçek kayıtlara eşitle" ile zaten düzeltebiliyor.
 */
export async function processDeletion(
  db: Firestore,
  uid: string,
  now = Date.now(),
): Promise<DeletionOutcome> {
  let silinen = 0;

  // Teklik kayıtları iki listeye de giremiyor: doküman kimlikleri `uid` değil,
  // telefonun ve öğrenci numarasının kendisi, ve `uid` alanıyla sorgulanabilseler
  // bile profil silindikten sonra hangi değerler olduğu okunamaz. Bu yüzden
  // profil OKUNDUKTAN SONRA ama silinmeden önce serbest bırakılıyorlar —
  // atlanırsa silinen hesabın numarası sonsuza kadar kilitli kalır ve aynı
  // kişi bir daha kayıt olamaz.
  const profil = (await db.collection('users').doc(uid).get()).data() ?? {};
  const ogrenciNo = typeof profil.ogrenciNo === 'string' ? profil.ogrenciNo : undefined;
  // `uid` ARTIK VERİLİYOR ve silme ona bağlı: bu değerler istemcinin yazdığı
  // profilden geliyor, dolayısıyla koşulsuz silen bir serbest bırakma,
  // profiline kurbanın numarasını yazan birine BAŞKASININ teklik kaydını
  // sildirirdi (bkz. `admin/claims.ts`).
  await releaseIdentity(db, uid, {
    telefon: typeof profil.telefon === 'string' ? profil.telefon : undefined,
    ogrenciNo,
  });

  for (const name of USER_DOC_COLLECTIONS) {
    await db.collection(name).doc(uid).delete();
    silinen += 1;
  }

  for (const name of USER_QUERY_COLLECTIONS) {
    const snap = await db.collection(name).where('uid', '==', uid).get();
    for (const d of snap.docs) {
      await d.ref.delete();
      silinen += 1;
    }
  }

  // Hesapsız sürümün yazdığı kayıtlarda `uid` alanı hiç yok; yukarıdaki sorgu
  // onları görmüyor. Numara ile ikinci bir tur atılıyor — `d.ref.delete()`
  // zaten silinmiş bir dokümanda da sorun çıkarmıyor, ama sayaç şişmesin diye
  // `uid` taşıyanlar atlanıyor.
  if (ogrenciNo) {
    for (const name of STUDENT_NO_COLLECTIONS) {
      const snap = await db.collection(name).where('studentNo', '==', ogrenciNo).get();
      for (const d of snap.docs) {
        if (d.get('uid')) continue;
        await d.ref.delete();
        silinen += 1;
      }
    }
  }

  // Cihaz kaydının kimliği push jetonu, kullanıcı değil. Kullanıcıya bağlı
  // olmadığı için burada silinemiyor — ve kural `delete`'i tamamen kapatıyor,
  // çünkü koleksiyon kimliksiz yazılıyor: silmeye izin vermek, herkesin
  // herkesin bildirimini kapatabilmesi demek olurdu. Silme sayfası bu yüzden
  // "bildirim kaydınız" diye bir söz VERMİYOR artık; jeton kişiyi tanımlamıyor
  // ve uygulamayı silmek onu zaten bırakıyor.

  await db.collection('deletionRequests').doc(uid).set(
    { status: 'done', completedAt: new Date(now).toISOString(), silinen },
    { merge: true },
  );

  return { uid, silinen };
}

/** Auth kaydını siler; istemci kendisi sildiyse zaten yok. */
async function deleteAuthUser(uid: string): Promise<void> {
  try {
    await getAuth().deleteUser(uid);
  } catch (err) {
    // `user-not-found` beklenen durum: istemci onayı görüp kendi kaydını
    // silmiş. Hata saymak, temiz biten bir akışı kırmızı gösterirdi.
    const code = (err as { code?: string })?.code;
    if (code !== 'auth/user-not-found') {
      console.error(`[silme] ${uid} Auth kaydı silinemedi:`, err);
    }
  }
}

/** Bir turda bekleyen talepleri işler. Testten de çağrılabilsin diye ayrı. */
export async function runDeletionSweep(db: Firestore, now = Date.now()): Promise<DeletionOutcome[]> {
  const sonuc: DeletionOutcome[] = [];

  const bekleyen = await db.collection('deletionRequests').where('status', '==', 'pending').get();
  for (const doc of bekleyen.docs) {
    const uid = doc.id;
    try {
      sonuc.push(await processDeletion(db, uid, now));
      console.log(`[silme] ${uid} verisi silindi.`);
    } catch (err) {
      console.error(`[silme] ${uid} işlenemedi:`, err);
    }
  }

  // Verisi silinmiş ama Auth kaydı hâlâ duranlar: istemci ekranı kapatmış.
  const bitmis = await db.collection('deletionRequests').where('status', '==', 'done').get();
  for (const doc of bitmis.docs) {
    const data = doc.data() as { completedAt?: string; authSilindi?: boolean };
    if (data.authSilindi) continue;
    const bittiAt = Date.parse(String(data.completedAt ?? ''));
    // Okunamayan tarihte bekleniyor, silinmiyor: buradaki iki hatadan biri
    // geç silinen bir hesap, öteki yanlış zamanda silinen bir hesap.
    if (!Number.isFinite(bittiAt) || now - bittiAt < AUTH_GRACE_MS) continue;
    await deleteAuthUser(doc.id);
    await doc.ref.set({ authSilindi: true }, { merge: true });
  }

  // TALEP DOKÜMANININ KENDİSİ DE SİLİNİYOR, ve bu bir temizlik değil bir söz.
  // İçinde uid ve e-posta var; süresiz kalması "hesabınız ve e-postanız
  // kalıcı olarak silinir" cümlesini yanlış yapıyordu — silinen kişinin
  // adresi, silindiğinin kaydı olarak veritabanında duruyordu.
  //
  // Auth silindikten sonra bekleniyor çünkü istemci "bitti mi" diye bu
  // dokümanı okuyor: erken silmek ekranı sonsuza kadar bekletirdi. Pencere
  // Auth gecikmesinin iki katı, yani istemcinin okuması kesin bitmiş oluyor.
  const temizlenecek = await db.collection('deletionRequests').where('authSilindi', '==', true).get();
  for (const doc of temizlenecek.docs) {
    const bittiAt = Date.parse(String((doc.data() as { completedAt?: string }).completedAt ?? ''));
    if (!Number.isFinite(bittiAt) || now - bittiAt < AUTH_GRACE_MS * 2) continue;
    await doc.ref.delete();
    console.log(`[silme] ${doc.id} talep kaydı da silindi.`);
  }

  return sonuc;
}

export function startDeletionSweeper(db: Firestore): void {
  const tick = () => {
    runDeletionSweep(db).catch((err) => console.error('[silme] tur başarısız:', err));
  };
  tick();
  // Tipler DOM'un `setInterval`'ını görüyor (bu depoda `lib` DOM içeriyor),
  // çalışma zamanı Node. `unref` orada var ve süreci açık tutmamasını
  // sağlıyor; tipin görmemesi varlığını değiştirmiyor.
  (setInterval(tick, INTERVAL_MS) as unknown as { unref?: () => void }).unref?.();
}
