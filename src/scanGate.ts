/**
 * Okutulan QR ile gönderim arasındaki karar — saf hâli.
 *
 * Üç soru var ve üçü de ekranın içinde, üç ayrı `if` olarak duruyordu:
 * doğru etkinliğin kodu mu, bu kişi o etkinliğe kayıtlı mı, gönderilecek mi.
 * Ekrana gömülü bir kararın testi olmuyor — bu deponun defterinde aynı ders
 * doğum tarihi kutusunda yazılı: karar `src/accountSchema.ts`'e taşınana kadar
 * hatası görünmedi.
 *
 * Burada Firebase, ekran, tarih ya da rastgelelik yok: girdi üç değer, çıktı
 * bir karar.
 */
export type TaramaKarari =
  | { tur: 'gonder' }
  /** Etkinlik ekranından gelindi ama başka bir etkinliğin kodu okundu. */
  | { tur: 'yanlis-etkinlik' }
  /** Kod doğru, kişi o etkinliğe kayıtlı değil. */
  | { tur: 'kayit-gerek' };

export function taramaKarari(girdi: {
  okunanEtkinlik: string;
  /** Etkinlik ekranından gelindiyse beklenen etkinlik; ana sayfadan gelindiyse yok. */
  hedefEtkinlik?: string;
  kayitliMi: boolean;
}): TaramaKarari {
  /*
    Sıra önemli: yanlış etkinlik önce.

    Ters olsaydı, başka bir etkinliğin kodunu okutan kişi "önce kaydol"
    görürdü — ve kaydolacağı etkinlik, elindeki kodun ait olduğu etkinlik
    olurdu. Yani yanlış okutma, yanlış etkinliğe kayıtla sonuçlanırdı.
  */
  if (girdi.hedefEtkinlik && girdi.okunanEtkinlik !== girdi.hedefEtkinlik) {
    return { tur: 'yanlis-etkinlik' };
  }
  /*
    Kayıt şartı bir KULÜP kararı, bir güvenlik kontrolü değil — ve öyle
    davranmıyor. Firestore kuralı yoklamayı hâlâ kayıt olmadan kabul ediyor:
    mağazadaki hesapsız sürümle yapılmış kayıtlarda `uid` alanı yok, yani
    kural o kaydı bu kişiye bağlayamıyor ve şartı zorlamak o kullanıcıları
    kapıda bırakırdı. Zorlayan taraf panel: sertifika yayınlanırken kayıt
    aranıyor (`admin/certificates.ts`). Buradaki kapı, öğrenciyi salondayken
    uyaran taraf — sertifikası aylar sonra reddedilen değil.
  */
  if (!girdi.kayitliMi) return { tur: 'kayit-gerek' };
  return { tur: 'gonder' };
}
