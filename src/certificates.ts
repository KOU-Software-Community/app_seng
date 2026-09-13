/**
 * Sertifikalarım — istemci tarafı.
 *
 * Okuma doğrudan Firestore'dan: sertifika ayrı bir koleksiyon değil, yoklama
 * satırının üstüne yazılmış bir alan (`admin/certificates.ts`). Kural
 * `attendance` okumasını `resource.data.uid == request.auth.uid` ile
 * sınırlıyor, yani sorgu da kendi kimliğiyle daraltılmak zorunda — başka bir
 * daraltma kuralı geçemez ve sorgu `permission-denied` alır.
 *
 * **Belgenin kendisi burada üretilmiyor.** PDF'i ve doğrulama sayfasını panel
 * basıyor; uygulama yalnızca adresi açıyor. Aksi hâlde belgenin ikinci bir
 * tanımı olurdu ve ikisi ayrışırdı.
 */
import { collection, getDocs, query, where } from 'firebase/firestore';

import { currentUser } from './auth';
import { PANEL_BASE_URL } from './data';
import { COLLECTIONS, getDb } from './firebase';

export type Sertifikam = {
  eventId: string;
  no: string;
  adSoyad: string;
  /** ISO 8601; ekranda tarihe çevriliyor. */
  issuedAt: string;
};

/** Belgenin herkese açık adresi. Panel adresi yoksa boş — düğme çizilmiyor. */
export function sertifikaUrl(no: string): string {
  return PANEL_BASE_URL ? `${PANEL_BASE_URL}/sertifika/${encodeURIComponent(no)}` : '';
}

/** PDF hâli. Aynı adres, `.pdf` uzantılı — panel ikisini de aynı tanımdan basıyor. */
export function sertifikaPdfUrl(no: string): string {
  return PANEL_BASE_URL ? `${PANEL_BASE_URL}/sertifika/${encodeURIComponent(no)}.pdf` : '';
}

export async function sertifikalarimiGetir(): Promise<Sertifikam[]> {
  const user = currentUser();
  if (!user) return [];

  const snap = await getDocs(
    query(collection(getDb(), COLLECTIONS.attendance), where('uid', '==', user.uid)),
  );

  return snap.docs
    .map((d) => {
      const c = d.get('certificate') as
        | { no?: string; adSoyad?: string; issuedAt?: string }
        | undefined;
      // Yoklaması olup sertifikası henüz yayınlanmamış satırlar listede
      // GÖRÜNMÜYOR: "sertifikan yok" demek yerine boş bir satır göstermek,
      // kullanıcıya bir şeyin bozuk olduğunu düşündürür.
      if (!c?.no) return null;
      return {
        eventId: String(d.get('eventId') ?? ''),
        no: c.no,
        adSoyad: String(c.adSoyad ?? ''),
        issuedAt: String(c.issuedAt ?? ''),
      };
    })
    .filter((x): x is Sertifikam => x !== null)
    .sort((a, b) => b.issuedAt.localeCompare(a.issuedAt));
}
