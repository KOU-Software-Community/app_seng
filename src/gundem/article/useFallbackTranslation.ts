/**
 * AI çevirisi gelmediğinde devreye giren yedek çeviri (Azure, panel üzerinden).
 *
 * **Sıra bilerek "önce bedava olan".** Sunucu zaten bir çeviri ürettiyse o
 * kullanılıyor ve buraya hiç gelinmiyor — kota harcanmıyor, gecikme yok.
 * Azure yalnızca AI işi ölmüşken çalışıyor.
 *
 * **Bu neyi çözer, neyi ÇÖZMEZ:**
 *
 * Çözer: ölçülen üretim verisinde 22 ölü zenginleştirme işinin 13'ü
 * `rate_limited` ile ölmüştü. Özet ve çeviri sunucuda TEK çağrı ve TEK şema
 * olduğu için o haberlerde kullanıcı ne özet ne çeviri görüyordu. Artık en
 * azından çeviriyi görüyor.
 *
 * ÇÖZMEZ: AI'ın kota tüketimini azaltmıyor. Özet işini kuyruğa koyan ve
 * şemasında çeviriyi de ZORUNLU tutan taraf sunucudaki Edge fonksiyonu, ve o
 * depo emekliye ayrıldı — yani model çeviriyi istemeye devam ediyor. "Azure'u
 * bağlayınca AI anahtarları yalnızca özete akar" cümlesi ancak sunucu
 * değiştirilebilseydi doğru olurdu. Buradaki kazanç kota değil, KAPSAMA.
 */
import { useQuery } from '@tanstack/react-query';
import { panelCevirisi, type CeviriYok } from '../data-access/translate';
import type { Article, ArticleSummary } from '../domain/types';

export type YedekCeviri = {
  metin: string | null;
  /** Denenmedi (gerek yoktu) ise null. */
  sebep: CeviriYok | null;
  yukleniyor: boolean;
};

/**
 * Yedek çevirinin istenip istenmeyeceği. Saf — testi ekran kurmadan yazılıyor.
 *
 * `bodyOriginal` boşken sormuyor: çevrilecek bir şey yok ve boş bir istek
 * kotadan yemese de panelin IP sayacından yiyor.
 */
export function yedekGerekli(
  article: Article | undefined,
  summary: ArticleSummary | undefined,
): boolean {
  if (!article) return false;
  if (article.language === 'tr') return false;
  const state = summary?.translationState ?? article.summary?.translationState;
  if (state === 'not_required') return false;
  const mevcut = summary?.translationTr ?? article.summary?.translationTr ?? null;
  if (mevcut && mevcut.trim().length > 0) return false;
  return article.bodyOriginal.trim().length > 0;
}

export function useFallbackTranslation(
  article: Article | undefined,
  summary: ArticleSummary | undefined,
): YedekCeviri {
  const enabled = yedekGerekli(article, summary);

  const query = useQuery({
    queryKey: ['v1', 'ceviri', article?.id ?? ''],
    enabled,
    queryFn: () =>
      panelCevirisi(article!.bodyOriginal, { kaynakDil: article!.language ?? null }),
    // Bir çeviri değişmiyor: bir kez alındıktan sonra yeniden sormak kotayı
    // boşa harcamak olurdu.
    staleTime: Infinity,
    // Kota ve hız cevapları yeniden denemeyle düzelmiyor; ağ hatası düzelir
    // ama onu da kullanıcı ekranı yeniden açarak tetikliyor.
    retry: false,
  });

  if (!enabled) return { metin: null, sebep: null, yukleniyor: false };
  const veri = query.data;
  if (!veri) return { metin: null, sebep: null, yukleniyor: query.isPending };
  return veri.durum === 'ok'
    ? { metin: veri.metin, sebep: null, yukleniyor: false }
    : { metin: null, sebep: veri.sebep, yukleniyor: false };
}
