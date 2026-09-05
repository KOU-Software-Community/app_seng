/**
 * "Yayına girmeden çevirisi hazırlansın" kuralının uygulamadaki karşılığı.
 *
 * Sunucu tarafı bunu yapamıyor: haber çekimi özet işini kuyruğa koymuyor, işi
 * yaratan tek şey istemcinin isteği. Uygulamanın elindeki tek kaldıraç **ne
 * göstereceği**. Yani "yayın" burada akışa girmek demek: özeti olmayan haber
 * bekletiliyor, arka planda ısıtılıyor, hazır olunca görünüyor.
 *
 * Bekletmenin bir tavanı olmak **zorunda**, yoksa kural kendi kendini yer:
 *
 * - Gövdesi olmayan bir haberin özeti hiç üretilemiyor — sunucu `unavailable`
 *   diyor ve `summary_ready` sonsuza kadar false kalıyor. Tavansız kural o
 *   haberi ebediyen saklardı.
 *   Başlık ve kaynak bağlantısı hâlâ değerli; saklamak onu çöpe atmak olurdu.
 * - Sağlayıcı anahtarı reddedilirse ya da günlük tavan dolarsa akış tamamen
 *   boşalırdı. Geç gelen bir özet, hiç gelmeyen bir haberden iyidir.
 *
 * Bu yüzden kural yaşa bağlı: **taze** ve özetsiz haber bekletiliyor, eskiyen
 * gösteriliyor.
 */

/**
 * Bir haberin özetsiz hâliyle bekletilebileceği en uzun süre.
 *
 * 30 dakika keyfi değil: haber çekimi 15 dakikada bir, özet worker'ı iki
 * dakikada bir koşuyor. Yani normal koşulda bir haberin özeti yayımlanmasından
 * sonraki ilk çekim + bir worker turu içinde hazır oluyor — en kötü ihtimalle
 * ~17 dakika. 30 dakika bunun iki katına yakın: normal gecikmeyi rahatça
 * kapsıyor, bozuk bir sunucuda ise haberi yarım saatten fazla saklamıyor.
 */
export const HOLD_WINDOW_MINUTES = 30;

export type GateCandidate = {
  publishedAt: string;
  summaryReady: boolean;
};

export type GateResult<T> = {
  /** Akışta çizilecekler. */
  visible: T[];
  /** Özeti hazırlanırken bekletilenlerin sayısı — ekranda söylenmek için. */
  heldCount: number;
};

const MINUTE_MS = 60_000;

/**
 * Özeti olmayan **taze** haberleri akıştan geri tutar.
 *
 * `publishedAt` okunamıyorsa haber gösteriliyor. Bozuk bir tarih yüzünden
 * içerik saklamak, iki hatadan kötü olanı: biri geç görünen bir özet, öteki
 * hiç görünmeyen bir haber.
 */
export function holdUnenriched<T extends GateCandidate>(
  articles: readonly T[],
  now: Date,
  windowMinutes: number = HOLD_WINDOW_MINUTES,
): GateResult<T> {
  const cutoff = now.getTime() - windowMinutes * MINUTE_MS;
  const visible: T[] = [];
  let heldCount = 0;

  for (const article of articles) {
    if (article.summaryReady) {
      visible.push(article);
      continue;
    }
    const published = Date.parse(article.publishedAt);
    if (Number.isNaN(published) || published <= cutoff) {
      visible.push(article);
      continue;
    }
    heldCount += 1;
  }

  return { visible, heldCount };
}

/** "2 haber hazırlanıyor" — hiç bekleyen yoksa `null`. */
export function heldLineTr(heldCount: number): string | null {
  if (heldCount <= 0) return null;
  return `${heldCount} yeni haber hazırlanıyor — çevirisi biter bitmez listeye girecek.`;
}
