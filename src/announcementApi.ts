/**
 * Kulüp duyurularının API katmanı — React'siz.
 *
 * `announcements.tsx`'ten ayrıldı çünkü **panel de bu veriyi çekiyor**: yeni bir
 * duyuru yayımlandığında otomatik bildirim gönderen iş, listeyi buradan
 * okuyor. Bir React sağlayıcısını sunucuya içe aktarmak çalışırdı ama
 * `eventSchema` / `raffleSchema` / `pushPolicy` ile aynı ayrımı bozardı: saf
 * olan taraf ekrandan bağımsız durur.
 *
 * Dış bir servis olduğu için buradaki her şey savunmacı: yanıtın şekli
 * doğrulanıyor, bozuk kayıtlar tüm listeyi düşürmek yerine atlanıyor, ve istek
 * zaman aşımına uğruyor.
 */

const BASE_URL = 'https://api.kouseng.com';
/** Sunucu yanıt vermezse çağıran bu kadar bekler. */
const TIMEOUT_MS = 10_000;

export type Announcement = {
  id: string;
  title: string;
  /** Düz metin özet — listelerde bunu gösteriyoruz. */
  summary: string;
  /** HTML gövde. src/html.ts ile çizilebilir bloklara çevriliyor. */
  content: string;
  category: string;
  author: string;
  /** ISO 8601, UTC. */
  createdAt: string;
};

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

/**
 * Tek bir kaydı doğrular. `_id` ve `title` olmadan kayıt işe yaramaz — listede
 * neye dokunulacağı ve ne yazılacağı belirsiz kalır — o yüzden bunlar zorunlu,
 * gerisi eksikse boş geçiliyor.
 */
function toAnnouncement(raw: unknown): Announcement | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const id = str(r._id) || str(r.id);
  const title = str(r.title);
  if (!id || !title) return null;

  return {
    id,
    title,
    summary: str(r.summary),
    content: str(r.content),
    category: str(r.category) || 'Duyuru',
    author: str(r.author),
    createdAt: str(r.createdAt),
  };
}

async function getJson(path: string): Promise<unknown> {
  // AbortController olmadan sunucu yanıt vermediğinde istek belirsiz süre asılı
  // kalıyor ve "yükleniyor" hiç bitmiyor.
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      headers: { accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

/** Zarfı açar: `{ success, message, data, count, pagination }`. */
function unwrapList(payload: unknown): Announcement[] {
  const body = (payload ?? {}) as Record<string, unknown>;
  if (body.success === false) throw new Error(str(body.message) || 'İstek reddedildi');
  const data = Array.isArray(body.data) ? body.data : [];
  return data.map(toAnnouncement).filter((a): a is Announcement => a !== null);
}

export async function fetchAnnouncements(): Promise<Announcement[]> {
  // İlk sayfa. Yanıt sayfalama taşıyor ama kulüp duyurularında en yeni on tane
  // ana sayfa için fazlasıyla yeterli; gerekirse `?page=` eklenir.
  return unwrapList(await getJson('/announcements'));
}

/**
 * Tek duyuru. Listede olmayan bir kimliğe derin bağlantı geldiğinde (eski bir
 * bildirim, paylaşılan bir link) kullanılıyor.
 */
export async function fetchAnnouncement(id: string): Promise<Announcement | null> {
  const body = (await getJson(`/announcements/${encodeURIComponent(id)}`)) as Record<string, unknown>;
  if (body?.success === false) return null;
  return toAnnouncement(body?.data);
}
