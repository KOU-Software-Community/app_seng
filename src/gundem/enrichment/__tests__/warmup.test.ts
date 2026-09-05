import {
  emptyBudget,
  planWarmup,
  warmDayKey,
  WARM_BATCH,
  WARM_DAILY_CAP,
  type WarmCandidate,
} from '../warmup';

/**
 * Ne ısıtılacağı kararı.
 *
 * Sayılar keyfi değil, sunucudan okundu: `request_enrichment_miss` cihaz başına
 * günde 30. Isıtma yalnızca özeti olmayan satırlar için yapıldığı için her
 * ısıtma bir *miss*, yani buradaki tavan doğrudan o bütçeden yiyor.
 */

const NOW = new Date('2026-09-05T09:00:00Z');
const TODAY = warmDayKey(NOW);

const rows = (count: number, summaryReady = false): WarmCandidate[] =>
  Array.from({ length: count }, (_, i) => ({ id: `a${i}`, summaryReady }));

describe('planWarmup', () => {
  it('akış sırasını koruyor — en yeni haber önce ısınır', () => {
    const plan = planWarmup({ articles: rows(10), budget: emptyBudget(TODAY), now: NOW });
    expect(plan.ids).toEqual(['a0', 'a1', 'a2', 'a3']);
    expect(plan.ids).toHaveLength(WARM_BATCH);
  });

  /**
   * Özeti olan satır için istek atmak boşa bir *check* harcar ve hiçbir şey
   * kazandırmaz — cevap zaten satırda.
   */
  it('özeti hazır olan haberi hiç istemiyor', () => {
    const articles: WarmCandidate[] = [
      { id: 'hazir', summaryReady: true },
      { id: 'bos', summaryReady: false },
    ];
    expect(planWarmup({ articles, budget: emptyBudget(TODAY), now: NOW }).ids).toEqual(['bos']);
  });

  it('aynı haberi iki kez ısıtmıyor', () => {
    const budget = { day: TODAY, ids: ['a0', 'a1'] };
    expect(planWarmup({ articles: rows(6), budget, now: NOW }).ids).toEqual(['a2', 'a3', 'a4', 'a5']);
  });

  /**
   * Tavanın sebebi: sunucudaki 30'un tamamını ön yüklemeye harcamak,
   * kullanıcının kendi açtığı haberi reddettirir — yani düzeltmeye çalıştığımız
   * şeyi bozar.
   */
  it('günlük tavana ulaşınca duruyor', () => {
    const budget = { day: TODAY, ids: rows(WARM_DAILY_CAP).map((r) => r.id) };
    const plan = planWarmup({ articles: rows(40), budget, now: NOW });
    expect(plan.ids).toEqual([]);
    expect(plan.budget).toBe(budget);
  });

  it('tavana yaklaşırken taşmıyor', () => {
    const used = rows(WARM_DAILY_CAP - 2).map((r) => r.id);
    const plan = planWarmup({
      articles: Array.from({ length: 9 }, (_, i) => ({ id: `yeni${i}`, summaryReady: false })),
      budget: { day: TODAY, ids: used },
      now: NOW,
    });
    expect(plan.ids).toHaveLength(2);
    expect(plan.budget.ids).toHaveLength(WARM_DAILY_CAP);
  });

  /**
   * Gün anahtarı UTC: sunucunun penceresi de epoch hizalı UTC. Cihazın yerel
   * günü kullanılsaydı +03:00'ta gece yarısı bütçe sunucudan üç saat önce
   * sıfırlanır ve o üç saatteki istekler 429 yerdi.
   */
  it('gün dönünce bütçe sıfırlanıyor, ve gün UTC', () => {
    const dolu = { day: '2026-09-04', ids: rows(WARM_DAILY_CAP).map((r) => r.id) };
    const plan = planWarmup({ articles: rows(3), budget: dolu, now: NOW });
    expect(plan.budget.day).toBe('2026-09-05');
    expect(plan.ids).toEqual(['a0', 'a1', 'a2']);

    // 05 Eylül 01:00 +03:00 = 04 Eylül 22:00 UTC — sunucu için hâlâ dün.
    expect(warmDayKey(new Date('2026-09-04T22:00:00Z'))).toBe('2026-09-04');
  });

  it('ısıtacak bir şey yoksa bütçeyi olduğu gibi bırakıyor', () => {
    const budget = emptyBudget(TODAY);
    const plan = planWarmup({ articles: rows(4, true), budget, now: NOW });
    expect(plan.ids).toEqual([]);
    expect(plan.budget).toBe(budget);
  });

  it('boş akışta çalışmıyor', () => {
    expect(planWarmup({ articles: [], budget: emptyBudget(TODAY), now: NOW }).ids).toEqual([]);
  });
});
