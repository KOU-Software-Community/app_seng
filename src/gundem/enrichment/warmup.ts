/**
 * Zenginleştirmeyi kullanıcıdan **önce** başlatan katman.
 *
 * Sunucu tarafındaki akış talep güdümlü: `sync-feeds` haberleri her 15 dakikada
 * bir çekiyor ama **özet işi kuyruğa koymuyor**; iş ancak bir istemci
 * `request-enrichment` çağırınca yaratılıyor, ve onu çeviren worker iki
 * dakikada bir koşuyor (pg_cron: her iki dakikada bir). Sonuç: bir haberi **ilk açan kişi her
 * zaman bekliyor** — ekranda "Özet hazırlanıyor" görüp bir dakika sonra
 * gelmesinin sebebi bu. Hız sınırı değil; hız sınırı 429 ve `rate_limited`
 * dönerdi, `queued` değil.
 *
 * Buradaki karşılık: akış ekrana gelir gelmez, özeti olmayan en yeni birkaç
 * haber için isteği arka planda yollamak. Kullanıcı listeyi kaydırırken worker
 * çalışıyor; habere dokunduğunda cevap çoktan önbellekte. Özet sunucuda
 * `content_hash`'e göre paylaşıldığı için bir cihazın ısıttığı haber **herkes
 * için** hazır oluyor.
 *
 * Bütçe uydurma değil, sunucudan okundu (`_shared/enrichment.ts`):
 *
 * - `request_enrichment_miss` → **30 / cihaz / gün** (yeni Claude çağrısı)
 * - `request_enrichment_check` → **120 / cihaz / saat** (önbellek isabeti)
 *
 * Isıtma yalnızca özeti olmayan satırlar için yapılıyor, yani her ısıtma bir
 * *miss*. Günlük tavan bu yüzden 30'un epey altında: kalanı kullanıcının kendi
 * açtığı haberlere kalmalı — kendi okumasını engelleyen bir ön yükleme,
 * düzeltmeye çalıştığı şeyi bozar.
 */

/** Bir akış yüklenişinde en fazla kaç haber ısıtılır. */
export const WARM_BATCH = 4;

/**
 * Gün başına en fazla kaç **farklı** haber ısıtılır. Sunucunun tavanı 30.
 *
 * 20, ısıtma akışa girmenin **mekanizması** olduğu için: ısıtılmayan haber
 * `gate.ts`'in penceresi dolana kadar bekliyor. Kullanıcının kendi açtıkları
 * bu bütçeden neredeyse hiç yemiyor — ısıtılmış bir haberin ikinci isteği
 * önbellek isabeti, yani saatlik 120'lik *check* sayacına yazılıyor, günlük
 * *miss* sayacına değil. Kalan 10 ısıtılmamış hâliyle açılanlara.
 */
export const WARM_DAILY_CAP = 20;

/**
 * İstekler arası boşluk. Dördünü aynı anda yollamak Edge tarafında dört eşzamanlı
 * çağrı demek ve kazandırdığı şey yok — worker zaten iki dakikada bir koşuyor.
 */
export const WARM_SPACING_MS = 1500;

/**
 * Isıtma turu bittikten ne kadar sonra akış bir kez tazelenir.
 *
 * Worker iki dakikada bir koşuyor; 150 saniye bir turu artı biraz payı
 * kapsıyor. Daha kısası worker'dan önce sorar ve hiçbir şey değişmemiş bir
 * cevapla döner.
 */
export const WARM_REFRESH_AFTER_MS = 150_000;

/** Isıtılabilir olarak akıştan alınan izdüşüm. Tam `Article` gerekmiyor. */
export type WarmCandidate = {
  id: string;
  /** Satır zaten özet taşıyorsa ısıtmanın anlamı yok — ve bir *miss* değil. */
  summaryReady: boolean;
};

/**
 * Gün başına harcanan bütçe, diskte tutulan hâliyle.
 *
 * Kimlikler sayaçla birlikte tutuluyor, ayrı değil: tekilleştirme ve sayma aynı
 * şeyin iki yüzü — aynı haberi iki kez ısıtmak bütçeden iki düşmemeli.
 */
export type WarmBudget = {
  /** UTC gün anahtarı. Sunucunun penceresi de epoch hizalı UTC. */
  day: string;
  ids: string[];
};

export const emptyBudget = (day: string): WarmBudget => ({ day, ids: [] });

/**
 * UTC gün anahtarı — sunucunun `windowFor(now, DAY_SECONDS)` hesabıyla aynı
 * sınır. Cihazın yerel günü kullanılsaydı +03:00'ta gece yarısı bütçe sunucudan
 * üç saat önce sıfırlanır ve son üç saatteki istekler reddedilirdi.
 */
export function warmDayKey(now: Date): string {
  return now.toISOString().slice(0, 10);
}

export type WarmPlan = {
  /** Bu yüklenişte istenecek kimlikler, akıştaki sıralarıyla (en yeni önce). */
  ids: string[];
  /** Diske yazılacak yeni bütçe. Plan boşsa nesne aynen geri veriliyor. */
  budget: WarmBudget;
};

/**
 * Ne ısıtılacağına karar verir. Saf: girdi liste + bütçe, çıktı liste + bütçe.
 */
export function planWarmup(input: {
  articles: readonly WarmCandidate[];
  budget: WarmBudget;
  now: Date;
  batch?: number;
  dailyCap?: number;
}): WarmPlan {
  const batch = input.batch ?? WARM_BATCH;
  const dailyCap = input.dailyCap ?? WARM_DAILY_CAP;

  const day = warmDayKey(input.now);
  // Gün döndüyse bütçe sıfırlanıyor — sunucudaki pencere de döndü.
  const budget = input.budget.day === day ? input.budget : emptyBudget(day);

  const remaining = Math.max(0, dailyCap - budget.ids.length);
  if (remaining === 0) return { ids: [], budget };

  const already = new Set(budget.ids);
  const ids: string[] = [];

  for (const article of input.articles) {
    if (ids.length >= Math.min(batch, remaining)) break;
    if (article.summaryReady) continue;
    if (already.has(article.id)) continue;
    already.add(article.id);
    ids.push(article.id);
  }

  if (ids.length === 0) return { ids: [], budget };
  return { ids, budget: { day, ids: [...budget.ids, ...ids] } };
}
