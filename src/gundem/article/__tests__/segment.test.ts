import type { Article, ArticleSummary } from '../../domain/types';
import { bodyFor, segmentState } from '../segment';

const article = (over: Partial<Article> = {}): Article => ({
  id: 'a1',
  sourceId: 's1',
  sourceName: 'Kaynak',
  tile: 'KY',
  title: 'Başlık',
  url: 'https://example.com/a',
  publishedAt: '2026-08-20T06:41:00.000Z',
  category: 'Modeller',
  language: 'en',
  bodyOriginal: 'the original english body',
  ...over,
});

const summary = (over: Partial<ArticleSummary> = {}): ArticleSummary => ({
  bullets: ['bir', 'iki', 'üç'],
  translationTr: 'türkçe gövde',
  translationState: 'ready',
  ...over,
});

describe('segmentState', () => {
  it('hides the switch for a Turkish source — there is nothing to switch to', () => {
    expect(segmentState(article({ language: 'tr' }), summary())).toEqual({
      visible: false,
      enabled: false,
    });
  });

  it('hides it when the server says no translation is required', () => {
    expect(segmentState(article(), summary({ translationState: 'not_required' }))).toEqual({
      visible: false,
      enabled: false,
    });
  });

  /**
   * Visible but disabled is the state that matters: hiding the control while a
   * translation is being produced would read as "this article has none", and the
   * user would never come back to look.
   */
  it('shows it disabled while the translation is still pending', () => {
    expect(segmentState(article(), summary({ translationState: 'pending' }))).toEqual({
      visible: true,
      enabled: false,
    });
  });

  it('enables it once the translation is ready', () => {
    expect(segmentState(article(), summary())).toEqual({ visible: true, enabled: true });
  });

  it('falls back to the article’s own summary when enrichment has not answered', () => {
    const withSummary = article({ summary: summary({ translationState: 'ready' }) });
    expect(segmentState(withSummary, undefined)).toEqual({ visible: true, enabled: true });
  });

  it('is closed for an article that is not loaded yet', () => {
    expect(segmentState(undefined, undefined)).toEqual({ visible: false, enabled: false });
  });
});

describe('bodyFor', () => {
  it('returns the original when the original is selected', () => {
    expect(bodyFor(article(), summary(), 'en')).toEqual({
      text: 'the original english body',
      label: 'Orijinal · English',
    });
  });

  it('returns the translation when it exists and is selected', () => {
    expect(bodyFor(article(), summary(), 'tr')).toEqual({
      text: 'türkçe gövde',
      label: 'Çeviri · Türkçe',
    });
  });

  /**
   * The one that keeps the screen honest: asking for Turkish when there is no
   * Turkish must not label the English text as a translation.
   */
  it('falls back to the original — and says so — when no translation exists', () => {
    const noTranslation = summary({ translationTr: null, translationState: 'pending' });
    expect(bodyFor(article(), noTranslation, 'tr')).toEqual({
      text: 'the original english body',
      label: 'Orijinal · English',
    });
  });
});
