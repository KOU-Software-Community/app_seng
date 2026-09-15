/**
 * Panelin çeviri kapısına giden istemci.
 *
 * Azure anahtarı uygulamaya konamıyor (yayımlanabilir anahtar değil,
 * `EXPO_PUBLIC_*` derleme anında pakete gömülüyor), o yüzden uygulama Azure'a
 * değil panele soruyor.
 *
 * **`src/otp.ts`'teki `cagir()` neden paylaşılmıyor:** o fonksiyon modül-özel
 * ve `OtpHata`'ya bağlı; varsayılan olarak Firebase kimlik jetonu istiyor.
 * Çeviri oturumsuz çalışmak zorunda (AI Gündem herkese açık), yani
 * paylaşabilmek için canlı OTP yolunu refaktör etmek gerekirdi. Onun yerine
 * **öğrenilen ders** kopyalanıyor, kod değil:
 *
 * > 200 tek başına başarı değil, ve `fetch` yönlendirmeyi sessizce takip
 * > ediyor. Uç noktayı tanımayan bir panel isteği `/login`'e yönlendirir ve
 * > elimize 200 + HTML gelir; gövdeye bakmayan istemci bunu "oldu" sayar.
 *
 * Bu yüzden cevabın JSON olduğu VE `durum` taşıdığı şart koşuluyor.
 */
import { PANEL_BASE_URL } from '../../data';

export type CeviriYok =
  /** Panel adresi derlemeye girmemiş. */
  | 'panel-yok'
  /** Operatör Azure anahtarını girmemiş — hata değil, durum. */
  | 'yapilandirilmamis'
  /** Azure'un ücretsiz kotası bu saat için doldu (403). */
  | 'kota'
  /** Hız sınırı — panelin kendi kovası ya da Azure'un 429'u. */
  | 'hiz'
  /** Metin panelin tavanının üstünde; kesilmiş çeviri yerine hiç çeviri. */
  | 'cok-uzun'
  /** Ağ hatası. */
  | 'ag'
  /** Panel beklenmedik bir şey döndürdü (eski sürüm, HTML, bozuk JSON). */
  | 'taninmayan';

export type PanelCeviri = { durum: 'ok'; metin: string } | { durum: 'yok'; sebep: CeviriYok };

export async function panelCevirisi(
  metin: string,
  opts: { kaynakDil?: string | null; fetchImpl?: typeof fetch } = {},
): Promise<PanelCeviri> {
  if (!PANEL_BASE_URL) return { durum: 'yok', sebep: 'panel-yok' };
  const fetchImpl = opts.fetchImpl ?? fetch;

  let res: Response;
  try {
    res = await fetchImpl(`${PANEL_BASE_URL}/api/gundem/ceviri`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ metin, kaynakDil: opts.kaynakDil ?? null }),
    });
  } catch {
    return { durum: 'yok', sebep: 'ag' };
  }

  // Gövde okunmadan hiçbir karar verilmiyor — 200 de, 4xx de.
  let gövde: unknown;
  try {
    gövde = await res.json();
  } catch {
    return { durum: 'yok', sebep: 'taninmayan' };
  }
  const durum = (gövde as { durum?: unknown } | null)?.durum;
  if (typeof durum !== 'string') return { durum: 'yok', sebep: 'taninmayan' };

  if (durum === 'ok') {
    const çeviri = (gövde as { metin?: unknown }).metin;
    // Şekle bakılıyor, duruma değil: `durum: 'ok'` diyen ama metni boş bir
    // cevap "çeviri hazır" sayılamaz, yoksa ekranda boş gövde açılır.
    if (typeof çeviri === 'string' && çeviri.trim().length > 0) {
      return { durum: 'ok', metin: çeviri };
    }
    return { durum: 'yok', sebep: 'taninmayan' };
  }

  const bilinen: CeviriYok[] = ['yapilandirilmamis', 'kota', 'hiz', 'cok-uzun'];
  const sebep = bilinen.find((b) => b === durum);
  return { durum: 'yok', sebep: sebep ?? 'taninmayan' };
}
