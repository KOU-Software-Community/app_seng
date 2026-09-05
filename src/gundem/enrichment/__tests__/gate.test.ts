import { heldLineTr, holdUnenriched, HOLD_WINDOW_MINUTES } from '../gate';

/**
 * Akışa girme kuralı: özeti olmayan **taze** haber bekletiliyor.
 *
 * Buradaki asıl iddia tavan. Tavansız bir kural, gövdesi olmadığı için özeti
 * hiç üretilemeyecek bir haberi ebediyen saklardı — ve bunu kimse hata diye
 * bildirmez, çünkü görünmeyen bir haberin eksik olduğu belli olmaz.
 */

const NOW = new Date('2026-09-05T12:00:00Z');
const minutesAgo = (n: number) => new Date(NOW.getTime() - n * 60_000).toISOString();

const article = (over: Partial<{ publishedAt: string; summaryReady: boolean; id: string }> = {}) => ({
  id: over.id ?? 'a',
  publishedAt: over.publishedAt ?? minutesAgo(1),
  summaryReady: over.summaryReady ?? false,
});

describe('holdUnenriched', () => {
  it('özeti olan haberi her zaman gösteriyor', () => {
    const rows = [article({ id: 'x', summaryReady: true, publishedAt: minutesAgo(0) })];
    expect(holdUnenriched(rows, NOW).visible.map((r) => r.id)).toEqual(['x']);
  });

  it('özeti olmayan taze haberi bekletiyor', () => {
    const rows = [article({ id: 'yeni', publishedAt: minutesAgo(3) })];
    const result = holdUnenriched(rows, NOW);
    expect(result.visible).toEqual([]);
    expect(result.heldCount).toBe(1);
  });

  /**
   * Tavan olmasaydı `unavailable` bir haber (gövdesi yok, özeti hiç
   * üretilemeyecek) hiç görünmezdi. Başlık ve kaynak bağlantısı hâlâ değerli.
   */
  it('tavanı geçen özetsiz haberi yine de gösteriyor', () => {
    const rows = [article({ id: 'eski', publishedAt: minutesAgo(HOLD_WINDOW_MINUTES + 1) })];
    const result = holdUnenriched(rows, NOW);
    expect(result.visible.map((r) => r.id)).toEqual(['eski']);
    expect(result.heldCount).toBe(0);
  });

  it('tam sınırdaki haber gösteriliyor — bekletme kapalı aralık değil', () => {
    const rows = [article({ id: 'sinir', publishedAt: minutesAgo(HOLD_WINDOW_MINUTES) })];
    expect(holdUnenriched(rows, NOW).visible.map((r) => r.id)).toEqual(['sinir']);
  });

  /**
   * Bozuk bir tarih yüzünden içerik saklamak, iki hatanın kötü olanı: biri geç
   * gelen bir özet, öteki hiç görünmeyen bir haber.
   */
  it('okunamayan tarihte haberi saklamıyor', () => {
    const rows = [article({ id: 'bozuk', publishedAt: 'dün falan' })];
    const result = holdUnenriched(rows, NOW);
    expect(result.visible.map((r) => r.id)).toEqual(['bozuk']);
    expect(result.heldCount).toBe(0);
  });

  it('sırayı bozmuyor ve yalnızca bekletilenleri sayıyor', () => {
    const rows = [
      article({ id: '1', summaryReady: true }),
      article({ id: '2' }),
      article({ id: '3', summaryReady: true }),
      article({ id: '4' }),
      article({ id: '5', publishedAt: minutesAgo(120) }),
    ];
    const result = holdUnenriched(rows, NOW);
    expect(result.visible.map((r) => r.id)).toEqual(['1', '3', '5']);
    expect(result.heldCount).toBe(2);
  });

  it('pencere dışarıdan verilebiliyor', () => {
    const rows = [article({ id: 'x', publishedAt: minutesAgo(10) })];
    expect(holdUnenriched(rows, NOW, 5).visible.map((r) => r.id)).toEqual(['x']);
    expect(holdUnenriched(rows, NOW, 20).visible).toEqual([]);
  });

  it('boş listede boş sonuç', () => {
    expect(holdUnenriched([], NOW)).toEqual({ visible: [], heldCount: 0 });
  });
});

describe('heldLineTr', () => {
  it('bekleyen yoksa hiçbir şey söylemiyor', () => {
    expect(heldLineTr(0)).toBeNull();
    expect(heldLineTr(-1)).toBeNull();
  });

  it('sayıyı söylüyor', () => {
    expect(heldLineTr(3)).toContain('3 yeni haber');
  });
});
