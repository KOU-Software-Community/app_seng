/**
 * Etkinlik görselleri — küçültme ve Supabase Storage'a yazma.
 *
 * Neden Firebase değil: Cloud Storage, 2024 sonrası açılan projelerde Blaze
 * planı istiyor. Elli arşiv fotoğrafı için kart bağlamanın anlamı yok. Supabase
 * ücretsiz katmanında 1 GB veriyor ve kart istemiyor.
 *
 * Uygulama tarafında hiçbir şey değişmiyor: `PhotoSlot` bir adres alıyor ve
 * `<Image>` ile çekiyor — o adresin nerede barındığını bilmiyor. Firestore hâlâ
 * etkinliklerin, kayıtların ve çekilişlerin yeri; Supabase yalnızca dosyaları
 * tutuyor.
 */
import { randomBytes } from 'node:crypto';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
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

/** Varsayılan bucket adı. `.env` ile değiştirilebilir. */
const DEFAULT_BUCKET = 'event-photos';

/** Kuruluma bağlı, yöneticiye gösterilebilir yükleme hatası. */
export class PhotoUploadError extends Error {}

function bucketName(): string {
  return process.env.SUPABASE_STORAGE_BUCKET || DEFAULT_BUCKET;
}

/**
 * Anahtar yanlış türden mi?
 *
 * Publishable anahtar istemciye gömülmek için var ve yazma yetkisi yok: onunla
 * yüklemeye çalışmak RLS hatasına düşüyor ve hata "row-level security policy"
 * diyor — yani asıl sorunu (yanlış anahtar) hiç söylemiyor.
 *
 * Önek bakmak ağa çıkmadan, ilk istekten önce cevap veriyor. İki anahtar
 * sistemi de kapsanıyor: yeni `sb_publishable_` / `sb_secret_` öneki ve eski
 * JWT'ler (payload'da `role`).
 */
export function keyProblem(key: string): string | null {
  if (key.startsWith('sb_publishable_')) return 'publishable';

  const parts = key.split('.');
  if (parts.length === 3) {
    try {
      const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
      if (payload?.role === 'anon') return 'anon';
    } catch {
      // Çözülemeyen bir JWT: karar veremiyoruz, isteğe bırakıyoruz.
    }
  }
  return null;
}

let client: SupabaseClient | undefined;

/**
 * Servis anahtarıyla bağlanıyor: panel güvenilen bir sunucu ve RLS'i aşması
 * gerekiyor. Bu anahtar uygulamaya **girmiyor** — `EXPO_PUBLIC_` öneki yok,
 * `.env.local` gitignore'lu, ve uygulama yalnızca herkese açık adresi görüyor.
 */
function storage() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    throw new PhotoUploadError(
      'Supabase yapılandırılmamış — görsel yüklenemez.\n\n' +
        '.env.local dosyasına ekleyin:\n' +
        '  SUPABASE_URL=https://<proje-ref>.supabase.co\n' +
        '  SUPABASE_SERVICE_ROLE_KEY=...\n\n' +
        'İkisi de Supabase Dashboard → Project Settings → API altında.\n' +
        'service_role anahtarı gizlidir: EXPO_PUBLIC_ öneki almaz ve uygulamaya girmez.',
    );
  }

  if (keyProblem(key)) {
    throw new PhotoUploadError(
      'SUPABASE_SERVICE_ROLE_KEY bir **publishable** anahtar taşıyor.\n\n' +
        'Publishable anahtar istemciye gömülmek için: okuyabilir, yazamaz. ' +
        'Yükleme RLS’e takılır.\n\n' +
        'Gereken gizli anahtar: Dashboard → Project Settings → API Keys → ' +
        'Secret keys → Reveal.\n' +
        '  Yeni sistemde `sb_secret_…` ile başlar.\n' +
        '  Eski sistemde `service_role` JWT’si (`eyJ…`).\n\n' +
        'Bu anahtar gizlidir: .env.local içine yazın, EXPO_PUBLIC_ öneki almaz.',
    );
  }

  if (!client) client = createClient(url, key, { auth: { persistSession: false } });
  return client.storage.from(bucketName());
}

/** `events/{eventId}/` altındaki dosya yolu. Ad rastgele: aynı ada yazıp eskisini ezmiyoruz. */
function objectPath(eventId: string): string {
  return `events/${eventId}/${randomBytes(8).toString('hex')}.jpg`;
}

/**
 * Bucket bulunamadı hatası mı?
 *
 * Daha önce bu tam olarak kaçırıldı: Firebase yolunda `err.code === 404` diye
 * bakılıyordu, gaxios ise `status` yazıyordu — dal hiç çalışmadı ve yöneticiye
 * üç kez üst üste "Bir şeyler ters gitti" gösterildi. Bu yüzden burada tek bir
 * alana güvenilmiyor.
 *
 * Supabase'in kendi cümlesi "Bucket not found"; `statusCode` alanı **metin**
 * olarak `'404'` geliyor, sayı olarak değil. `Number()` ikisini de çeviriyor.
 */
export function isBucketMissing(err: unknown): boolean {
  const e = err as { statusCode?: unknown; status?: unknown; code?: unknown; message?: unknown };
  const status = Number(e?.statusCode ?? e?.status ?? e?.code);
  return status === 404 || /bucket not found|bucket does not exist/i.test(String(e?.message ?? ''));
}

function missingBucketMessage(): PhotoUploadError {
  return new PhotoUploadError(
    `Supabase'de "${bucketName()}" adlı bucket yok.\n\n` +
      'Supabase Dashboard → Storage → New bucket:\n' +
      `  Ad: ${bucketName()}\n` +
      '  Public bucket: AÇIK  (uygulama görselleri adresle çekiyor)\n\n' +
      'Başka bir ad kullanmak isterseniz .env.local içine ' +
      'SUPABASE_STORAGE_BUCKET yazın.',
  );
}

/**
 * Bir görseli küçültüp yükler ve herkese açık adresini döndürür.
 *
 * Bucket public olduğu için adres kalıcı ve imzasız:
 * `https://<ref>.supabase.co/storage/v1/object/public/<bucket>/<yol>`
 */
export async function uploadEventPhoto(eventId: string, input: Buffer): Promise<string> {
  const bucket = storage();
  const path = objectPath(eventId);

  const body = await sharp(input)
    .rotate() // EXIF yönü — telefon fotoğrafları yan yatmasın.
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
    .toBuffer();

  // supabase-js hata fırlatmıyor, `error` alanı döndürüyor. `throw` beklemek
  // sessizce başarılı sanmak olurdu.
  const { error } = await bucket.upload(path, body, {
    contentType: 'image/jpeg',
    // Bir yıl: görseller değişmiyor, değişirse yeni bir ad alıyorlar.
    cacheControl: '31536000',
    upsert: false,
  });

  if (error) {
    if (isBucketMissing(error)) throw missingBucketMessage();
    throw new PhotoUploadError(`Görsel yüklenemedi: ${error.message}`);
  }

  return bucket.getPublicUrl(path).data.publicUrl;
}

/**
 * Adresten dosya yolunu geri çıkarır. Bizim üretmediğimiz bir adres için null.
 *
 * Silme yalnızca bizim yüklediklerimize dokunsun diye: `events/` ile
 * başlamayan bir yol bu panelden çıkmamıştır.
 */
function pathFromUrl(url: string): string | null {
  const m = new RegExp(`/object/public/${bucketName()}/(.+)$`).exec(url);
  if (!m) return null;
  const path = decodeURIComponent(m[1].split('?')[0]);
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
  const paths = urls.map(pathFromUrl).filter((p): p is string => !!p);
  if (!paths.length) return;

  try {
    const { error } = await storage().remove(paths);
    if (error) console.error('[panel] görseller silinemedi:', error.message);
  } catch (err) {
    console.error('[panel] görseller silinemedi:', err);
  }
}

/** Etkinlik silinince altındaki her şey gider. */
export async function deleteEventPhotos(eventId: string): Promise<void> {
  try {
    const bucket = storage();
    const { data, error } = await bucket.list(`events/${eventId}`);
    if (error) {
      console.error(`[panel] ${eventId} görselleri listelenemedi:`, error.message);
      return;
    }
    if (!data?.length) return;

    const { error: removeError } = await bucket.remove(
      data.map((f) => `events/${eventId}/${f.name}`),
    );
    if (removeError) {
      console.error(`[panel] ${eventId} görselleri silinemedi:`, removeError.message);
    }
  } catch (err) {
    console.error(`[panel] ${eventId} görselleri silinemedi:`, err);
  }
}
