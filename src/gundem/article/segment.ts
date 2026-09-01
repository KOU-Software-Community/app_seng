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

export function segmentState(
  article: Article | undefined,
  summary: ArticleSummary | undefined,
): { visible: boolean; enabled: boolean } {
  const state = summary?.translationState ?? article?.summary?.translationState;
  if (!article || article.language === 'tr' || state === 'not_required') {
    return { visible: false, enabled: false };
  }
  return { visible: true, enabled: state === 'ready' };
}

/** Seçilen segmentin gövdesi ve etiketi. */
export function bodyFor(
  article: Article,
  summary: ArticleSummary | undefined,
  segment: Segment,
): { text: string; label: string } {
  const translation = summary?.translationTr ?? article.summary?.translationTr ?? null;
  return segment === 'tr' && translation
    ? { text: translation, label: 'Çeviri · Türkçe' }
    : { text: article.bodyOriginal, label: 'Orijinal · English' };
}
