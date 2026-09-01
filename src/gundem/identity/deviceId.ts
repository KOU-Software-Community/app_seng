import * as Crypto from 'expo-crypto';

import { KV_KEYS, kv, type KvStore } from '../storage/kv';

/**
 * Device identity. v1 creates no Supabase users (addendum §A), so "who is this"
 * is a uuid v4 generated once per install and kept in the kv store.
 *
 * It is sent as `X-Device-Id` on Edge calls only — it is a rate-limit and
 * attribution key, never an authorization claim, and PostgREST reads never carry
 * it. Nothing about the user is derivable from it and it is not linked to any
 * personal data.
 */

const UUID_V4 =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const isDeviceId = (value: unknown): value is string =>
  typeof value === 'string' && UUID_V4.test(value);

/**
 * On altı rastgele bayt — ve sonucun gerçekten rastgele olduğunun kontrolü.
 *
 * Sıfır dolu bir dizi teoride geçerli bir çıktı (2^128'de bir) ama pratikte tek
 * bir anlama geliyor: rastgelelik kaynağı çalışmıyor. Sessizce kabul edilirse
 * ortaya çıkan uuid `00000000-0000-4000-8000-000000000000` oluyor — biçim olarak
 * kusursuz bir v4, yani `isDeviceId` onu onaylıyor — ve **her kurulum aynı
 * kimliği** alıyor: tek bir hız-sınırı kovası, tek bir cihaz gibi görünen bütün
 * kullanıcılar. Ölçüldü: Jest ortamında `expo-crypto` tam olarak bunu döndürüyor.
 */
function randomBytes16(): Uint8Array {
  const bytes = Crypto.getRandomValues(new Uint8Array(16));
  if (bytes.some((byte) => byte !== 0)) return bytes;

  console.warn(
    '[identity] rastgelelik kaynağı sıfır döndürdü; Math.random ile devam ediliyor. ' +
      'Kimliğin gizli olması gerekmiyor ama benzersiz olması gerekiyor.',
  );
  const fallback = new Uint8Array(16);
  for (let i = 0; i < fallback.length; i += 1) fallback[i] = Math.floor(Math.random() * 256);
  return fallback;
}

/**
 * uuid v4, rastgeleliği `expo-crypto`'dan.
 *
 * Kaynak uygulamanın yorumu "React Native, Hermes ve her tarayıcı sağlar" diyerek
 * `globalThis.crypto.getRandomValues`'a güveniyordu. **Cihazda ölçüldü: yok.**
 * Uygulama açıldığında log şunu basıyordu:
 *
 *     [identity] crypto.getRandomValues unavailable; falling back to Math.random.
 *
 * Yani cihaz kimliği ve Edge çağrılarının idempotency anahtarı `Math.random()`
 * ile üretiliyordu. Kimliğin gizli olması gerekmiyor ama **çakışması** gerekmiyor:
 * çakışan iki cihaz aynı hız-sınırı kovasını paylaşır ve tekrarlanan bir istek
 * yanlış işi idempotent sayabilir.
 *
 * `expo-crypto` bu projede zaten SDK'nın listelediği sürümde ve native modül
 * gerektirmeden `getRandomValues` sağlıyor.
 *
 * Adı ürettiği şeye göre, ilk çağıranına göre değil: Edge idempotency anahtarı da
 * aynı uuid v4'ü istiyor ve sunucudaki her işleyici biçimi doğruluyor.
 */
export function randomUuidV4(): string {
  const bytes = randomBytes16();
  bytes[6] = (bytes[6] & 0x0f) | 0x40; // sürüm 4
  bytes[8] = (bytes[8] & 0x3f) | 0x80; // varyant 10xx

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

/** The device-identity spelling of the same generator. */
export const generateDeviceId = randomUuidV4;

/** In-flight promise, so concurrent callers on first run cannot mint two ids. */
let pending: Promise<string> | null = null;
let cached: string | null = null;

/**
 * Read the device id, generating and persisting one on first run. Subsequent
 * calls return the same value from memory.
 */
export async function getDeviceId(storage: KvStore = kv): Promise<string> {
  if (cached) return cached;
  if (pending) return pending;

  pending = (async () => {
    const stored = await storage.getItem(KV_KEYS.deviceId);
    if (isDeviceId(stored)) {
      cached = stored;
      return stored;
    }
    if (stored !== null) {
      // Something wrote a non-uuid here; replacing it resets this device's
      // rate-limit bucket, which is worth a line in the log.
      console.warn(`[identity] stored device id "${stored}" is not a uuid v4; regenerating.`);
    }
    const fresh = generateDeviceId();
    await storage.setItem(KV_KEYS.deviceId, fresh);
    cached = fresh;
    return fresh;
  })();

  try {
    return await pending;
  } finally {
    pending = null;
  }
}

/** Test seam: drops the memoised id so the next call re-reads storage. */
export function resetDeviceIdCache(): void {
  cached = null;
  pending = null;
}
