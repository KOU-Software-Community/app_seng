/**
 * Okunabilir metne giden saf katman.
 *
 * Bir RSS gövdesi ekrana tek bir `<Text>` olarak konduğunda okunmuyor — bir
 * duvar oluyor. Sorun yazı tipi değil, **paragrafın hiç olmaması**: çıkarıcı
 * kimi kaynakta boş satırla, kimi kaynakta tek satır sonuyla ayırıyor, kimi
 * kaynakta `\r\n` gönderiyor, ve ekran hepsini olduğu gibi basıyor.
 *
 * Burası o kararı veriyor ve ekrandan ayrı duruyor: girdi bir dize, çıktı
 * paragraf listesi. Render etmeden sınanabilecek tek yer burası.
 */

/**
 * Türkçe düzyazı için dakikada okunan kelime. Kaynaklar 180–240 arasında
 * veriyor; ortası alındı. Rakam ekranda "yaklaşık" olarak sunuluyor, çünkü öyle.
 */
export const WORDS_PER_MINUTE = 200;

export function wordCount(text: string): number {
  const trimmed = (text ?? '').trim();
  return trimmed ? trimmed.split(/\s+/).length : 0;
}

/**
 * Gövdeyi paragraflara ayırır.
 *
 * İki ayırıcı biçimi var ve hangisinin kullanıldığı metinden anlaşılıyor:
 *
 * - **Boş satır varsa** paragraf ayırıcısı odur, ve paragrafın içindeki tek
 *   satır sonları yumuşak sarmadır — boşluğa katlanıyorlar. Katlanmazsa metin
 *   sütun genişliğinden bağımsız, rastgele yerlerden kırılmış görünür.
 * - **Hiç boş satır yoksa** ama birden fazla satır varsa, yazarın elindeki tek
 *   ayırıcı tek satır sonudur; o zaman paragraf ayırıcısı odur. Bu dalı
 *   atlarsak böyle bir metin tek bir dev paragrafa iner — düzeltmeye
 *   çalıştığımız duvarın aynısı.
 */
export function toParagraphs(text: string): string[] {
  const normalised = (text ?? '').replace(/\r\n?/g, '\n').trim();
  if (!normalised) return [];

  const hasBlankLine = /\n[ \t]*\n/.test(normalised);
  const chunks = hasBlankLine ? normalised.split(/\n[ \t]*\n+/) : normalised.split('\n');

  return chunks.map((chunk) => chunk.replace(/\s+/g, ' ').trim()).filter((chunk) => chunk.length > 0);
}

/**
 * "≈ 4 dk okuma", ya da gösterilecek bir şey yoksa `null`.
 *
 * `null` dönmesi önemli: sıfır kelimelik bir gövde için "0 dk" yazmak, olmayan
 * bir metnin okunma süresini bildirmek olurdu.
 */
export function readingTimeTr(text: string): string | null {
  const words = wordCount(text);
  if (words === 0) return null;
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))} dk okuma`;
}
