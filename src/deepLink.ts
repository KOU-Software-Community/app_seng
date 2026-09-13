/**
 * Derin bağlantıyla gelen hedef yolun denetimi.
 *
 * Giriş ekranı `kykapp://giris?next=…` ile açılabiliyor, yani `next` uygulamanın
 * dışından geliyor. Denetimsiz hâlde giriş sonrası varılan yeri **saldırgan
 * seçiyor**: kimlik avı için "kulübün uygulamasında giriş yaptım, sonra bu
 * sayfaya geldim" en ikna edici anlatı, ve kullanıcı adresi hiç görmüyor.
 *
 * Ekrandan ayrı bir dosyada olmasının sebebi bu depoda yazılı: ekranın içindeki
 * bir koşul yalnızca o ekranla sınanabiliyor ve o sınav genelde "render oldu
 * mu" sorusuna cevap veriyor. Burada girdi bir dize, çıktı bir karar.
 */

/**
 * Uygulama içi bir yol mu? Değilse `null` — çağıran kendi varsayılanına düşer.
 *
 * `//` AYRICA eleniyor: `//evil.example` protokol-göreli bir adres ve tek eğik
 * çizgi kontrolünden geçer. Aynı sebeple `/\` de eleniyor; bazı ayrıştırıcılar
 * ters bölüyü eğik çizgi gibi okuyor.
 */
export function safeNext(next: unknown): string | null {
  const yol = typeof next === 'string' ? next.trim() : '';
  if (!yol.startsWith('/')) return null;
  if (yol.startsWith('//') || yol.startsWith('/\\')) return null;
  return yol;
}
