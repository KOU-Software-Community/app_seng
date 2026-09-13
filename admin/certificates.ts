/**
 * Katılım sertifikası — yayınlama, iptal, arama.
 *
 * **Sertifika ayrı bir koleksiyon değil.** Yoklama satırının kendisi, üstüne
 * `certificate` alanı yazılmış hâli. Bu deponun defterinde aynı kararın kaydı
 * var: `ArchiveEntry` ayrı bir varlık sanılmıştı ve her alanı zaten
 * `ClubEvent`'te vardı — ikinci koleksiyon, aynı gerçeği iki kez girmek ve
 * ikisinin ayrışmasını beklemek demekti.
 *
 * Yazan taraf yalnızca panel (Admin SDK). Kural istemcinin `certificate`
 * alanına dokunmasını zaten engelliyor: güncelleme dalı yalnızca
 * `checkedInAt` değişimine izin veriyor.
 */
import { randomInt } from 'node:crypto';

import type { Firestore } from 'firebase-admin/firestore';

import { MONTHS_LONG, parseIso } from '../src/eventSchema';
import { QR_ALPHABET } from '../src/qrSchema';
import { ATTENDANCE_COLLECTION } from './qr';

/**
 * Belge numarası uzunluğu. 8 hane × 31 harf ≈ 8.5·10¹¹ — adres tahmin
 * edilerek başka birinin belgesine ulaşılamaz.
 *
 * **Uid ya da öğrenci numarası KULLANILAMAZ.** Belge sayfası herkese açık ve
 * üzerinde ad, etkinlik ve tarih yazıyor; adres tahmin edilebilir olsaydı
 * listenin tamamı dışarıdan taranabilirdi. Bu deponun koltuk jetonu kararı
 * birebir aynı gerekçeyle alınmıştı.
 */
export const BELGE_NO_UZUNLUK = 8;

export function makeBelgeNo(): string {
  const sinir = 256 - (256 % QR_ALPHABET.length);
  let out = '';
  while (out.length < BELGE_NO_UZUNLUK) {
    const b = randomInt(0, 256);
    if (b >= sinir) continue;
    out += QR_ALPHABET[b % QR_ALPHABET.length];
  }
  return out;
}

/** `2026-03-12T18:00:00+03:00` → `12 Mart 2026`. Okunamayan tarihte boş. */
export function belgeTarihi(startsAt: string): string {
  const p = parseIso(startsAt);
  if (!p) return '';
  return `${p.day} ${MONTHS_LONG[p.month - 1]} ${p.year}`;
}

export type SertifikaKaydi = {
  no: string;
  adSoyad: string;
  issuedAt: string;
  /** Postanın kabul edildiği an. Boşsa belge yayınlandı ama teslim edilmedi. */
  mailedAt?: string;
  /** Son teslim denemesinin hatası. Panel bunu ekrana yazıyor ve tekrar deneyebiliyor. */
  mailError?: string;
};

export type YayinGirdisi = { uid: string; adSoyad: string };

export type YayinSonucu = {
  yayinlanan: number;
  atlanan: { uid: string; sebep: string }[];
};

/**
 * Seçilen katılımcılara sertifika yayınlar.
 *
 * Ad **yayın anında donduruluyor**, profilden canlı okunmuyor: belge dışarıda
 * ve adresi paylaşılmış olabilir; kişi profilini değiştirdiğinde belgenin
 * sessizce değişmesi, belgeyi belge olmaktan çıkarır.
 *
 * Zaten sertifikası olan atlanıyor — ikinci kez yayınlamak yeni bir numara
 * üretir ve eskisini geçersiz kılar, yani dışarıdaki bağlantıyı kırar.
 */
export async function publishCertificates(
  db: Firestore,
  eventId: string,
  girdiler: YayinGirdisi[],
  now: Date,
): Promise<YayinSonucu> {
  const sonuc: YayinSonucu = { yayinlanan: 0, atlanan: [] };

  /*
    Sertifikanın ŞARTI iki tane: kayıt ve yoklama.

    Yoklama "salondaydı" diyor, kayıt "gelmeyi taahhüt etmişti" diyor, ve belge
    ikisini birden iddia ediyor. Yalnızca yoklamaya bakmak, kaydolmadan gelip
    kodu okutan birine kayıtlıymış gibi bir belge vermek olurdu.

    **Zorlayan taraf BURASI, Firestore kuralı değil.** Kural yoklamayı kayıt
    aramadan kabul ediyor ve bu bilerek: mağazadaki hesapsız sürümle yapılmış
    kayıtlarda `uid` alanı yok, yani kural o kaydı yazan kişiye bağlayamıyor —
    şartı kurala koymak o kullanıcıları kapıda bırakırdı. Uygulama da
    okutmadan önce uyarıyor (`src/scanGate.ts`) ama o bir istemci kararı;
    belgeyi üreten tek yer burası, o yüzden şart burada.

    Tek sorgu, tek alan, dizin gerekmiyor — ve parti başına bir kez.
  */
  const kayitlar = await db.collection('registrations').where('eventId', '==', eventId).get();
  const kayitliUidler = new Set(
    kayitlar.docs.map((d) => String(d.get('uid') ?? '')).filter(Boolean),
  );

  for (const g of girdiler) {
    const ad = g.adSoyad.trim().replace(/\s+/g, ' ');
    if (ad.length < 3) {
      sonuc.atlanan.push({ uid: g.uid, sebep: 'ad çok kısa' });
      continue;
    }

    const ref = db.collection(ATTENDANCE_COLLECTION).doc(`${eventId}__${g.uid}`);
    const snap = await ref.get();
    if (!snap.exists) {
      // Yoklaması olmayana sertifika yayınlamak, belgenin dayanağını
      // ortadan kaldırır: doğrulama sayfası neye bakacak?
      sonuc.atlanan.push({ uid: g.uid, sebep: 'yoklama kaydı yok' });
      continue;
    }
    if (snap.get('certificate')) {
      sonuc.atlanan.push({ uid: g.uid, sebep: 'zaten yayınlanmış' });
      continue;
    }
    if (!kayitliUidler.has(g.uid)) {
      // Sebep operatöre olduğu gibi gösteriliyor: "yayınlandı 3, atlandı 1"
      // diye bir özet, atlananın neden atlandığını söylemezse operatör
      // öğrenciye de söyleyemez.
      sonuc.atlanan.push({ uid: g.uid, sebep: 'etkinliğe kayıt bulunamadı' });
      continue;
    }

    const kayit: SertifikaKaydi = {
      no: makeBelgeNo(),
      adSoyad: ad,
      issuedAt: now.toISOString(),
    };
    await ref.set({ certificate: kayit }, { merge: true });
    sonuc.yayinlanan += 1;
  }

  return sonuc;
}

/**
 * Sertifikayı iptal eder.
 *
 * Alan siliniyor, yoklama kaydı DURUYOR: kişi etkinliğe katıldı, o gerçek
 * değişmiyor. İptal edilen belgenin adresi artık bulunamıyor ve sayfa
 * "böyle bir belge yok" diyor — sahte bir "geçersiz" damgası basmak yerine,
 * çünkü numara zaten tahmin edilemez ve varlığı bilgi taşıyor.
 */
export async function revokeCertificate(db: Firestore, eventId: string, uid: string): Promise<boolean> {
  const ref = db.collection(ATTENDANCE_COLLECTION).doc(`${eventId}__${uid}`);
  const snap = await ref.get();
  if (!snap.exists || !snap.get('certificate')) return false;
  const { FieldValue } = await import('firebase-admin/firestore');
  await ref.update({ certificate: FieldValue.delete() });
  return true;
}

export type BulunanSertifika = {
  no: string;
  adSoyad: string;
  eventId: string;
  issuedAt: string;
};

/**
 * Belge numarasından sertifikayı bulur.
 *
 * Sorgu `certificate.no` üzerinde; Firestore tek alanlı dizinleri
 * kendiliğinden oluşturuyor, elle dizin tanımı gerekmiyor.
 */
export async function findCertificate(db: Firestore, no: string): Promise<BulunanSertifika | null> {
  const temiz = (no ?? '').trim().toUpperCase();
  // Biçim tutmuyorsa sorguya hiç gitmiyoruz: uydurma adreslerle okuma
  // kotası harcamanın anlamı yok.
  if (!new RegExp(`^[${QR_ALPHABET}]{${BELGE_NO_UZUNLUK}}$`).test(temiz)) return null;

  const snap = await db
    .collection(ATTENDANCE_COLLECTION)
    .where('certificate.no', '==', temiz)
    .limit(1)
    .get();
  if (snap.empty) return null;

  const d = snap.docs[0];
  const c = d.get('certificate') as SertifikaKaydi;
  return {
    no: c.no,
    adSoyad: c.adSoyad,
    eventId: String(d.get('eventId') ?? ''),
    issuedAt: c.issuedAt,
  };
}
