import type { Article } from '../../domain/types';
import { orderBySaved } from '../SavedView';

const article = (id: string): Article => ({
  id,
  sourceId: 's1',
  sourceName: 'Kaynak',
  tile: 'KY',
  title: `Başlık ${id}`,
  url: `https://example.com/${id}`,
  publishedAt: '2026-08-20T06:41:00.000Z',
  category: 'Modeller',
  language: 'tr',
  bodyOriginal: 'gövde',
});

/**
 * Kayıtlı liste cihazda yalnızca kimlik tutuyor; gövdeler akış önbelleğinden
 * geliyor. Aradaki eşleme bu fonksiyon, ve iki şeyi birden yapması gerekiyor:
 * sırayı kaydetme sırasında tutmak, ve önbellekte olmayan bir kimliği düşürmek.
 */
describe('orderBySaved', () => {
  const articles = [article('a'), article('b'), article('c')];

  it('follows the save order, not the feed order', () => {
    expect(orderBySaved(articles, ['c', 'a']).map((a) => a.id)).toEqual(['c', 'a']);
  });

  /**
   * The one that matters. A saved id whose article has fallen out of the feed
   * cache must disappear from the list, not render as a hole: `undefined` here
   * would reach `ArticleCard` and take the screen down with it.
   */
  it('drops an id the feed no longer carries', () => {
    expect(orderBySaved(articles, ['a', 'silinmis', 'b']).map((a) => a.id)).toEqual(['a', 'b']);
  });

  it('returns nothing when nothing is saved', () => {
    expect(orderBySaved(articles, [])).toEqual([]);
  });

  it('returns nothing when the feed is empty, rather than failing', () => {
    expect(orderBySaved([], ['a', 'b'])).toEqual([]);
  });

  it('does not invent duplicates when an id repeats', () => {
    expect(orderBySaved(articles, ['a', 'a']).map((a) => a.id)).toEqual(['a', 'a']);
  });
});
