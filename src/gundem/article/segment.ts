import type { Article, ArticleSummary } from '../domain/types';

/**
 * Makale ekranındaki Orijinal / Çeviri kararı.
 *
 * Saf ve ekrandan ayrı bir dosyada — kaynak uygulamada bu mantık rota
 * dosyasının içindeydi. Bu depoda karar saf bir fonksiyona çıkarılıyor
 * (`admin/eventMode.ts`, `admin/port.ts` aynı sebeple var): bir kontrol kendi
 * girdisini kurarak başka yerde çalışan bir şeyi sınayamaz.
 *
 * Kural iki cümle: Türkçe bir kaynağın geçilecek çevirisi yoktur, İngilizce bir
 * kaynak da çeviri üretilene kadar geçilemez.
 */
export type Segment = 'en' | 'tr';

/**
 * Elde gösterilebilir bir özet var mı?
 *
 * Cihazda ölçülen hata bu soruyu hiç sormamaktan çıktı. `toSummary` özeti
 * olmayan bir satır için de bir `ArticleSummary` üretiyor — üç boş dizeyle —
 * yani "özet nesnesi var" ile "özet var" aynı şey değil. Ekran ise
 * "hazırlanıyor" kararını **uç noktanın cevabına** bakarak veriyordu:
 * `request-enrichment` tanımadığı bir gövde döndürüp `queued`a düşünce, satırda
 * duran üç madde dönen bir göstergenin arkasında kayboluyordu.
 *
 * Doğru kaynak elde olan veri: maddelerden biri doluysa özet vardır, sunucu ne
 * derse desin.
 */
export const hasSummary = (summary: ArticleSummary | undefined): boolean =>
  !!summary && summary.bullets.some((bullet) => bullet.trim().length > 0);

/**
 * `yedekCeviri` — Azure'dan (panel üzerinden) gelen çeviri.
 *
 * AI'ın ürettiği çeviri ile bu ikisi AYNI ÜRÜN değil ama kullanıcı açısından
 * aynı: Türkçe metin. Sıra bilerek "önce bedava olan": sunucunun zaten
 * ürettiği çeviri varsa Azure'a hiç gidilmiyor, kota harcanmıyor. Azure
 * yalnızca AI işi ölmüşken devreye giriyor — ki ölçülen üretim verisinde 22
 * ölü işin 13'ü hız limitinden ölmüştü ve o haberlerde kullanıcı çeviriyi
 * HİÇ göremiyordu.
 */
export function segmentState(
  article: Article | undefined,
  summary: ArticleSummary | undefined,
  yedekCeviri: string | null = null,
): { visible: boolean; enabled: boolean } {
  const state = summary?.translationState ?? article?.summary?.translationState;
  if (!article || article.language === 'tr' || state === 'not_required') {
    return { visible: false, enabled: false };
  }
  // Düğme METNE bakarak açılıyor, bayrağa değil — bayrağa bakan hâli bu
  // depoda bir kez "basınca hiçbir şey olmuyor"a dönüşmüştü.
  return { visible: true, enabled: state === 'ready' || Boolean(yedekCeviri) };
}

/** Seçilen segmentin gövdesi ve etiketi. */
export function bodyFor(
  article: Article,
  summary: ArticleSummary | undefined,
  segment: Segment,
  yedekCeviri: string | null = null,
): { text: string; label: string } {
  const translation =
    summary?.translationTr ?? article.summary?.translationTr ?? yedekCeviri ?? null;
  return segment === 'tr' && translation
    ? { text: translation, label: 'Çeviri · Türkçe' }
    : { text: article.bodyOriginal, label: 'Orijinal · English' };
}
