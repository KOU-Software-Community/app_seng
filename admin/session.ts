/**
 * Oturum çerezinin başlığını üretir.
 *
 * Ayrı bir dosyada çünkü `server.ts` içe aktarılınca `app.listen` çalışıyor —
 * yani sunucuyu ayağa kaldırmadan sınanamıyor. Buradaki fonksiyon saf: bir
 * nesne alıyor, bir metin döndürüyor, `check:panel` doğrudan çağırabiliyor.
 *
 * `Secure` neden koşullu: panel yerelde düz HTTP üzerinden çalışıyor ve
 * `Secure` çerezi tarayıcı orada hiç saklamıyor — sabit koymak yerel girişi
 * tamamen kırardı. Sunucuda ise HTTPS'i Coolify'ın önündeki proxy sonlandırıyor,
 * uygulamaya istek düz HTTP olarak geliyor; bu yüzden karar `req.secure`'a
 * bakılarak veriliyor (Express `trust proxy` açıkken `X-Forwarded-Proto`
 * başlığını okuyor).
 *
 * `Secure`siz bir oturum çerezi, panele bir kez düz HTTP ile ulaşılabildiği anda
 * ağdaki herkese açık demek — panel öğrenci kayıtlarını görüyor, isim ve
 * numaraları da.
 */
export function cookieHeader(opts: {
  name: string;
  value: string;
  secure: boolean;
  /** Saniye. 0 çerezi siler. */
  maxAge: number;
}): string {
  const parts = [
    `${opts.name}=${opts.value}`,
    'HttpOnly',
    // SameSite=Strict siteler arası POST'ların çerezi taşımasını engelliyor;
    // bu ölçekte CSRF için yeterli koruma.
    'SameSite=Strict',
    'Path=/',
    `Max-Age=${opts.maxAge}`,
  ];
  if (opts.secure) parts.push('Secure');
  return parts.join('; ');
}
