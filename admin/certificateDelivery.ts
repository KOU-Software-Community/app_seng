/**
 * Sertifikanın teslimi — PDF üret, postaya ekle, sonucu kayda yaz.
 *
 * **Yayınlama ile teslim ayrı iki adım ve öyle kalmak zorunda.** Yayınlama
 * belgeyi var ediyor (numara + donmuş ad); teslim onu kişiye ulaştırıyor.
 * Tek adım olsaydı posta patladığında belge de yayınlanmamış sayılırdı ve
 * ikinci deneme yeni bir numara üretirdi — dışarıda paylaşılmış bir adres
 * kırılırdı. Şimdi teslim başarısız olursa kayıtta `mailError` duruyor ve
 * panel aynı belgeyi yeniden gönderebiliyor.
 *
 * **Bir tarayıcı, bütün parti.** Chromium açılışı ~400 ms sabit maliyet; 200
 * katılımcı için 200 kez açmak dakikalar demek. `sertifikaPdf` bu yüzden liste
 * alıyor.
 */
import type { Firestore } from 'firebase-admin/firestore';
import QRCode from 'qrcode';

import { ATTENDANCE_COLLECTION } from './qr';
import { belgeTarihi, type SertifikaKaydi } from './certificates';
import { sendMail, mailReady } from './mail';
import { sertifikaMaili } from './certificateMail';
import { sertifikaPdf, type PdfIsi } from './pdf';

export type TeslimGirdisi = {
  uid: string;
  email: string;
};

export type TeslimSonucu = {
  gonderilen: number;
  hatali: { uid: string; sebep: string }[];
};

/** `.../sertifika/<no>` — belgenin üstünde basılı olan adres. */
export function dogrulamaUrl(kok: string, no: string): string {
  return `${kok.replace(/\/+$/, '')}/sertifika/${encodeURIComponent(no)}`;
}

/**
 * Yayınlanmış sertifikaları postayla gönderir.
 *
 * Postası olmayan atlanıyor: adres yoksa gönderilecek yer de yok, ve
 * `users` profilinden okunan boş bir alanı "hata" saymak operatöre
 * düzeltemeyeceği bir satır göstermek olurdu — sebep yazılıyor.
 */
export async function deliverCertificates(
  db: Firestore,
  eventId: string,
  etkinlikAdi: string,
  startsAt: string,
  kok: string,
  girdiler: TeslimGirdisi[],
): Promise<TeslimSonucu> {
  const sonuc: TeslimSonucu = { gonderilen: 0, hatali: [] };
  if (!girdiler.length) return sonuc;

  if (!mailReady()) {
    // Sessizce "gönderildi" demek bu defterde defalarca yazılmış hata.
    for (const g of girdiler) sonuc.hatali.push({ uid: g.uid, sebep: 'SMTP yapılandırılmamış' });
    return sonuc;
  }

  const tarih = belgeTarihi(startsAt);

  // 1) Kayıtları oku ve PDF işlerini kur. Yayınlanmamış olan hiç sıraya girmiyor.
  type Hazir = { uid: string; email: string; kayit: SertifikaKaydi; is: PdfIsi; url: string };
  const hazirlar: Hazir[] = [];

  for (const g of girdiler) {
    const snap = await db.collection(ATTENDANCE_COLLECTION).doc(`${eventId}__${g.uid}`).get();
    const kayit = snap.get('certificate') as SertifikaKaydi | undefined;
    if (!kayit?.no) {
      sonuc.hatali.push({ uid: g.uid, sebep: 'sertifika yayınlanmamış' });
      continue;
    }
    if (!g.email) {
      sonuc.hatali.push({ uid: g.uid, sebep: 'profilde e-posta yok' });
      continue;
    }
    const url = dogrulamaUrl(kok, kayit.no);
    hazirlar.push({
      uid: g.uid,
      email: g.email,
      kayit,
      url,
      is: {
        // Ad KAYITTAN okunuyor, profilden değil: belge yayın anında donduruldu
        // ve kişi profilini değiştirdi diye belgenin değişmemesi gerekiyor.
        adSoyad: kayit.adSoyad,
        etkinlik: etkinlikAdi,
        tarih,
        belgeNo: kayit.no,
        dogrulamaUrl: url,
        qrSvg: await QRCode.toString(url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' }),
      },
    });
  }

  if (!hazirlar.length) return sonuc;

  // 2) Tek tarayıcı açılışıyla bütün PDF'ler.
  let pdfler: Buffer[];
  try {
    pdfler = await sertifikaPdf(hazirlar.map((h) => h.is));
  } catch (err) {
    // Tarayıcı hiç açılmadıysa kimse için PDF yok; hepsi aynı sebeple hatalı.
    const sebep = `PDF üretilemedi: ${(err as Error).message}`;
    for (const h of hazirlar) sonuc.hatali.push({ uid: h.uid, sebep });
    return sonuc;
  }

  // 3) Gönder ve sonucu kayda yaz.
  for (const [i, h] of hazirlar.entries()) {
    const ref = db.collection(ATTENDANCE_COLLECTION).doc(`${eventId}__${h.uid}`);
    try {
      const posta = sertifikaMaili({
        adSoyad: h.kayit.adSoyad,
        etkinlik: etkinlikAdi,
        tarih,
        belgeNo: h.kayit.no,
        dogrulamaUrl: h.url,
      });
      const cevap = await sendMail({
        to: h.email,
        ...posta,
        attachments: [
          {
            // Dosya adı kişinin adını taşımıyor: ek indirildiğinde adres
            // defterindeki adla değil belgeyle anılsın, ve Türkçe karakterli
            // dosya adları bazı istemcilerde bozuluyor.
            filename: `KOU-Yazilim-Kulubu-Katilim-Belgesi-${h.kayit.no}.pdf`,
            content: pdfler[i],
            contentType: 'application/pdf',
          },
        ],
      });
      if (!cevap.accepted.length) {
        // `sendMail` alıcı reddinde FIRLATMIYOR; "gönderildi" demek yanlış olur.
        throw new Error(`alıcı reddedildi: ${cevap.rejected.join(', ') || 'sebep yok'}`);
      }
      await ref.set(
        { certificate: { ...h.kayit, mailedAt: new Date().toISOString(), mailError: '' } },
        { merge: true },
      );
      console.log(`[sertifika] ${h.kayit.no} → ${h.email} · kabul: ${cevap.accepted.join(', ')}`);
      sonuc.gonderilen += 1;
    } catch (err) {
      const sebep = (err as Error).message;
      await ref
        .set({ certificate: { ...h.kayit, mailError: sebep } }, { merge: true })
        .catch(() => {});
      console.error(`[sertifika] ${h.kayit.no} gönderilemedi:`, err);
      sonuc.hatali.push({ uid: h.uid, sebep });
    }
  }

  return sonuc;
}
