/**
 * Etkinlik görselleri — küçültme ve Firebase Storage'a yazma.
 *
 * Uygulama Storage SDK'sını hiç kullanmıyor: elinde bir adres var ve onu
 * `<Image>` ile çekiyor. Yani buradan çıkan tek şey bir URL, ve yükleme
 * tamamen Admin SDK ile burada oluyor.
 */
import { randomUUID, randomBytes } from 'node:crypto';

import { getStorage } from 'firebase-admin/storage';
import sharp from 'sharp';

/**
 * Uzun kenar sınırı.
 *
 * Arşiv kartı ~170 px, detay hero'su ekran genişliği kadar çiziyor. Telefondan
 * çıkan 4000 px'lik bir kare hem gereksiz hem pahalı: bir etkinliğin altı
 * görseli 20 MB'ı bulurdu ve detay ekranı hepsini indiriyor. 1600 px, 2x
 * ekranda hero için de fazlasıyla yeterli.
 */
const MAX_EDGE = 1600;
const JPEG_QUALITY = 82;

/** Yüklemeden önce reddedilen boyut. Küçültme sonrası değil, gelen dosya. */
export const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;

export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic'];

function bucketName(): string {
  const name = process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET;
  if (!name) {
    throw new Error(
      'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET tanımlı değil — görsel yüklenemez.\n' +
        'Uygulamanın kullandığı .env değişkeninin aynısı.',
    );
  }
  return name;
}

/** `events/{eventId}/` altındaki dosya yolu. Ad rastgele: aynı ada yazıp eskisini ezmiyoruz. */
function objectPath(eventId: string): string {
  return `events/${eventId}/${randomBytes(8).toString('hex')}.jpg`;
}

/** Kuruluma bağlı, yöneticiye gösterilebilir yükleme hatası. */
export class PhotoUploadError extends Error {}

/**
 * "Bucket yok" hatası mı?
 *
 * `err.code === 404` diye bakılıyordu ve **hiç tutmuyordu**: gaxios 6 bu durumda
 * `code` yazmıyor, `status` yazıyor. Hata genel yakalayıcıya düşüp yöneticiye
 * yine "Bir şeyler ters gitti" gösteriyordu.
 *
 * Artık üçüne birden bakılıyor. Mesaj kontrolü de var çünkü katman değişirse
 * (Admin SDK sararsa) sayısal alanların hangisinin taşındığı yine değişebilir;
 * Storage'ın kendi cümlesi değişmiyor.
 */
export function isBucketMissing(err: unknown): boolean {
  const e = err as { code?: unknown; status?: unknown; message?: unknown };
  const status = Number(e?.status ?? e?.code);
  return status === 404 || /bucket does not exist/i.test(String(e?.message ?? ''));
}

/**
 * Projede gerçekten hangi bucket'lar var?
 *
 * Hata mesajına ekleniyor. "Bucket yok" iki farklı sebepten geliyor — Storage
 * hiç açılmamış, ya da ad tutmuyor — ve ikisi aynı 404'ü veriyor. Listeyi
 * göstermek ayrımı yöneticinin yerine yapıyor.
 */
async function existingBuckets(): Promise<string> {
  try {
    const [buckets] = await getStorage().bucket(bucketName()).storage.getBuckets();
    if (!buckets.length) return 'Projede hiç bucket yok — Storage henüz açılmamış.';
    return `Projedeki bucket'lar: ${buckets.map((b) => b.name).join(', ')}`;
  } catch {
    // Listeleme yetkisi olmayabilir. Asıl hatayı bunun üstüne yığmıyoruz.
    return 'Projedeki bucket listesi okunamadı.';
  }
}

/**
 * Bir görseli küçültüp yükler ve indirme adresini döndürür.
 *
 * Adres `firebasestorage.googleapis.com/...?token=` biçiminde. `makePublic()`
 * kullanılmadı: yeni projelerde bucket düzeyinde tek tip erişim açık geliyor ve
 * o durumda nesne ACL'leri devre dışı, `makePublic()` hata veriyor. Token'lı
 * adres iki yapılandırmada da çalışıyor ve bucket'ı listelenebilir yapmıyor.
 */
export async function uploadEventPhoto(eventId: string, input: Buffer): Promise<string> {
  const bucket = getStorage().bucket(bucketName());
  const path = objectPath(eventId);

  const body = await sharp(input)
    .rotate() // EXIF yönü — telefon fotoğrafları yan yatmasın.
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();

  const token = randomUUID();
  try {
    await bucket.file(path).save(body, {
      contentType: 'image/jpeg',
      metadata: {
        // Bir yıl: görseller değişmiyor, değişirse yeni bir ad alıyorlar.
        cacheControl: 'public, max-age=31536000, immutable',
        metadata: { firebaseStorageDownloadTokens: token },
      },
    });
  } catch (err) {
    // En sık görülen kurulum hatası. Genel yakalayıcıya bırakılırsa yönetici
    // "Bir şeyler ters gitti" görüyor — fotoğraf sayısı yüzünden mi, Storage
    // kapalı olduğu için mi bilmiyor.
    if (isBucketMissing(err)) {
      throw new PhotoUploadError(
        `Storage bucket bulunamadı: ${bucketName()}\n\n` +
          `${await existingBuckets()}\n\n` +
          'Liste boşsa: Firebase Console → Storage → "Get started". Bucket ancak o ' +
          'adımda oluşuyor; yapılandırmada adı görünmesi yetmiyor.\n' +
          'Listede başka bir ad varsa: onu .env dosyasındaki ' +
          'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET değerine yazın. Eski projeler ' +
          '<proje>.appspot.com, yeniler <proje>.firebasestorage.app kullanıyor.',
      );
    }
    throw err;
  }

  return `https://firebasestorage.googleapis.com/v0/b/${bucketName()}/o/${encodeURIComponent(
    path,
  )}?alt=media&token=${token}`;
}

/** Adresten dosya yolunu geri çıkarır. Bizim üretmediğimiz bir adres için null. */
function pathFromUrl(url: string): string | null {
  const m = /\/o\/([^?]+)\?/.exec(url);
  if (!m) return null;
  const path = decodeURIComponent(m[1]);
  return path.startsWith('events/') ? path : null;
}

/**
 * Silinen görsellerin dosyalarını da siler.
 *
 * Hata yutuluyor: dosya zaten yoksa ya da silinemiyorsa bu, etkinliğin
 * kaydedilmesini engellememeli — kalan şey bir yetim dosya, kırık bir kayıt
 * değil.
 */
export async function deletePhotos(urls: string[]): Promise<void> {
  const bucket = getStorage().bucket(bucketName());
  await Promise.all(
    urls.map(async (url) => {
      const path = pathFromUrl(url);
      if (!path) return;
      try {
        await bucket.file(path).delete({ ignoreNotFound: true });
      } catch (err) {
        console.error(`[panel] görsel silinemedi (${path}):`, err);
      }
    }),
  );
}

/** Etkinlik silinince altındaki her şey gider. */
export async function deleteEventPhotos(eventId: string): Promise<void> {
  try {
    await getStorage().bucket(bucketName()).deleteFiles({ prefix: `events/${eventId}/` });
  } catch (err) {
    console.error(`[panel] ${eventId} görselleri silinemedi:`, err);
  }
}
