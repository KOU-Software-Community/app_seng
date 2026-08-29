/**
 * Panelin dinleyeceği portu ortam değişkenlerinden çözer.
 *
 * Ayrı ve saf bir dosyada, `session.ts` ile aynı sebepten: `server.ts` içe
 * aktarılınca `app.listen` çalışıyor, yani orada kalan bir karar sunucuyu ayağa
 * kaldırmadan sınanamıyor.
 *
 * Neden `Number(env.ADMIN_PORT ?? env.PORT ?? 4000)` yetmiyor: `??` yalnızca
 * `undefined` ve `null` için devreye giriyor, boş metin için değil. Coolify gibi
 * panellerde bir değişkeni oluşturup değerini boş bırakmak tek tık — ve bu
 * deponun kendi `.env.example`'ı da `ADMIN_PORT=` satırını boş gönderiyor.
 * `Number('')` sıfır: `listen(0)` hata vermiyor, çekirdek rastgele bir boş port
 * veriyor. Konteyner sağlıklı görünüyor, günlükte hata yok, ters proxy hiçbir
 * zaman ulaşamıyor. `Number('abc')` ise NaN ve o da aynı yere çıkıyor.
 */
const DEFAULT_PORT = 4000;

/** Geçerli bir port değilse `null` — çağıran bir sonrakine düşebilsin. */
function parsePort(raw: string | undefined): number | null {
  const text = raw?.trim();
  if (!text) return null;
  const n = Number(text);
  return Number.isInteger(n) && n > 0 && n <= 65535 ? n : null;
}

// İndeks imzası `process.env`'in tümünü kabul etmek için gerekli: yalnızca
// isteğe bağlı alanlardan oluşan bir tip "weak type" sayılıyor ve TypeScript
// `ProcessEnv`'i ortak alanı yok diye reddediyor.
export function resolvePort(env: {
  ADMIN_PORT?: string;
  PORT?: string;
  [key: string]: string | undefined;
}): number {
  // ADMIN_PORT bu projenin kendi adı ve geçerli bir değer taşıyorsa kazanır;
  // PORT ise konteyner platformlarının (Coolify, Render, Fly) enjekte ettiği isim.
  return parsePort(env.ADMIN_PORT) ?? parsePort(env.PORT) ?? DEFAULT_PORT;
}
