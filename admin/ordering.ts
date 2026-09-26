/**
 * Vitrin sırası — panelin Slider ve Sponsorlar listeleri.
 *
 * Kural tek: sıra 1…n ve boşluksuz. Bir öğe k. sıraya konunca oradaki ve
 * sonrakiler bir kayıyor; bu yüzden her değişiklik listenin tamamını yeniden
 * numaralıyor. Liste onlarca öğe — bütün listeyi yazmak ucuz, "yalnız değişeni
 * yaz" hesabı ise hata üretmeye değmez.
 */

/** `id`'yi listeden çıkarıp 1 tabanlı `position`'a yerleştirir. Aralık dışı konum uca sıkışır. */
export function placeAt(ids: string[], id: string, position: number): string[] {
  const rest = ids.filter((x) => x !== id);
  const at = Math.min(Math.max(Math.trunc(position) - 1, 0), rest.length);
  return [...rest.slice(0, at), id, ...rest.slice(at)];
}

/** Bir adım yukarı (-1) ya da aşağı (+1). Uçtaki ve bilinmeyen öğe listeyi değiştirmez. */
export function moveBy(ids: string[], id: string, delta: -1 | 1): string[] {
  const i = ids.indexOf(id);
  if (i < 0) return ids;
  return placeAt(ids, id, i + 1 + delta);
}

/**
 * Sürükle-bırakın gönderdiği sıra mevcut listeyle aynı kümede mi?
 *
 * Değilse liste bu arada başka bir sekmede değişmiş demektir: eksik kimlik bir
 * öğeyi sırasız bırakır, yabancı kimlik olmayan bir dokümana yazmaya kalkar.
 */
export function sameMembers(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const set = new Set(a);
  return set.size === a.length && new Set(b).size === b.length && b.every((x) => set.has(x));
}
