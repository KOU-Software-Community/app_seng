/**
 * Çekilişin hukuki künyesi — App Store Review Guideline 5.3.1 / 5.3.2.
 *
 * Uygulama bir kez **çekiliş yüzünden reddedildi**. Reddin sebebi mekanik
 * değildi: `raffleSchema.ts`'in söylediği gibi uygulamada zaten rastgele seçim
 * yok, yalnızca ücretsiz bir form toplanıyor. Eksik olan **beyandı** — Apple
 * çekilişin kim tarafından düzenlendiğinin, katılımın ücretsiz olduğunun,
 * kazananın nasıl belirlendiğinin ve Apple'ın bu işle ilgisi olmadığının
 * kullanıcıya açıkça gösterilmesini istiyor.
 *
 * Metinler burada duruyor, ekranlarda değil, çünkü **iki ayrı ekranda** aynı
 * beyan görünüyor (etkinlik detayındaki çekiliş kartı ve katılım formu) ve bir
 * de kurallar sayfası var. Aynı cümleyi üç yere ayrı yazmak, birinin değişip
 * ötekilerin kalması demek — bu depoda tam olarak bu hata birkaç kez oldu
 * (bkz. AGENTS.md: "Bir kopyalanan değer, ayrışacak bir değerdir").
 */

/**
 * Çekilişi düzenleyen taraf. **App Store Connect'teki takım adıyla birebir
 * aynı olmak zorunda** — Apple 5.3.1'i bu dizeyle karşılaştırıyor, çünkü
 * mağazada uygulamanın geliştiricisi olarak görünen isim bu.
 *
 * Hesabın kişisel Apple Account adı "Abdülkadir İvenç" olarak görünüyor; o
 * **değil**. Team ID'nin üstündeki takım adı, yani mağazadaki satıcı adı,
 * `Abdulkadir IVENC`. Türkçe aksanlı hâline "düzeltmek" tam da beyanı listeden
 * ayırır ve reddin sebebini geri getirir.
 */
export const RAFFLE_ORGANIZER = 'Abdulkadir IVENC';

/** Çekilişin yürütüldüğü topluluk. Düzenleyen değil — kapsam. */
export const RAFFLE_CLUB = 'Kocaeli Üniversitesi Yazılım Kulübü';

/** 5.3.1 düzenleyen için ulaşılabilir bir kanal istiyor. */
export const RAFFLE_CONTACT_EMAIL = 'akadirr41@gmail.com';

/**
 * Apple'ın istediği feragat. Kelimesi kelimesine bu cümle hem kartta hem
 * kurallar sayfasında geçiyor; `check:release` kartta gerçekten render
 * edildiğini doğruluyor.
 */
export const APPLE_DISCLAIMER =
  'Apple bu çekilişin sponsoru değildir ve çekilişle hiçbir şekilde bağlantılı değildir.';

/** "Bu çekiliş X tarafından düzenlenmektedir." */
export const ORGANIZER_LINE = `Bu çekiliş ${RAFFLE_ORGANIZER} tarafından düzenlenmektedir.`;

/**
 * Kartta görünen kısa gövde. Kapsam + ücretsizlik + rastgelelik tek paragrafta:
 * dört ayrı satır kartı bir sözleşmeye çevirirdi, tek paragraf hem okunuyor hem
 * dördünü de söylüyor.
 */
export const SCOPE_LINE =
  `${RAFFLE_CLUB} kapsamında gerçekleştirilir. Katılım ücretsizdir; ` +
  'kazananlar katılımcılar arasından rastgele belirlenir.';

export type RuleSection = {
  heading: string;
  paragraphs: string[];
};

/**
 * Resmî kurallar sayfasının içeriği.
 *
 * Bir cümlenin buraya girmesinin şartı, **kodun onu gerçekten yapıyor
 * olması**. Örneğin "her öğrenci numarası yalnızca bir kez katılabilir"
 * yazılmadı: kayıtlarda o kural doküman kimliğiyle (`eventId__studentNo`)
 * zorlanıyor ama çekiliş katılımının kimliği rastgele (`makeEntryId`), yani
 * uygulama bunu engellemiyor — engellemediğimiz bir şeyi kural diye yazmak
 * kurallar sayfasını kurgu yapardı.
 */
export const OFFICIAL_RULES: RuleSection[] = [
  {
    heading: 'Düzenleyen',
    paragraphs: [
      ORGANIZER_LINE,
      `Çekiliş ${RAFFLE_CLUB} kapsamında gerçekleştirilir. Düzenleyen, bu uygulamayı ` +
        'App Store ve Google Play üzerinde yayımlayan geliştiricidir ve çekilişin tek ' +
        'yürütücüsüdür.',
    ],
  },
  {
    heading: 'Katılım ücretsizdir',
    paragraphs: [
      'Katılım tamamen ücretsizdir. Herhangi bir satın alma, ödeme, abonelik veya ' +
        'uygulama içi harcama katılım şartı değildir ve kazanma ihtimalini artırmaz.',
    ],
  },
  {
    heading: 'Kimler katılabilir',
    paragraphs: [
      'Çekilişler Kocaeli Üniversitesi öğrencilerine yöneliktir. Katılmak için ilgili ' +
        'etkinliğin sayfasındaki formu doldurmak yeterlidir.',
      'Bir cihazdan aynı çekilişe yalnızca bir kez katılabilirsiniz. Aynı kişiye ait ' +
        'birden fazla katılım tespit edilirse, katılımların tamamı geçersiz sayılır.',
    ],
  },
  {
    heading: 'Katılım süresi',
    paragraphs: [
      'Her çekilişin son katılım tarihi ilgili etkinliğin sayfasında belirtilir. Bu ' +
        'tarihten sonra uygulama yeni katılım kabul etmez.',
    ],
  },
  {
    heading: 'Kazananlar nasıl belirlenir',
    paragraphs: [
      'Kazananlar, katılım süresi dolduktan sonra geçerli katılımcılar arasından ' +
        'rastgele belirlenir.',
      'Seçim uygulamanın içinde yapılmaz. Uygulama yalnızca ücretsiz katılım formunu ' +
        'toplar; içinde çekiliş çeken ya da kazanan belirleyen bir bölüm çalışmaz. ' +
        'Katılımcı listesi organizasyon ekibi tarafından dışa aktarılır ve kazananlar ' +
        'uygulama dışında rastgele belirlenir.',
    ],
  },
  {
    heading: 'Sonuçların duyurulması',
    paragraphs: [
      'Kazananlar ilgili etkinliğin sayfasında kısaltılmış isimle yayımlanır ' +
        '(örneğin "Elif Y."). Tam ad yayımlanmaz.',
      'Kendini listede gören katılımcı, ödül teslimi için düzenleyene ulaşır.',
    ],
  },
  {
    heading: 'Ödüller ve ödülü sağlayan taraflar',
    paragraphs: [
      'Ödüller çoğu çekilişte üçüncü taraf kurum veya firmalar tarafından sağlanır. ' +
        'Ödülü sağlayan taraf yalnızca ödülü temin eder; çekilişin sponsoru, ' +
        'düzenleyicisi veya yürütücüsü değildir. Böyle bir taraf varsa ilgili ' +
        'etkinliğin açıklamasında belirtilir.',
      'Ödüller devredilemez ve nakde çevrilemez. Ödülün teslim edilememesi hâlinde ' +
        'düzenleyen, eşdeğer bir ödülle değiştirme hakkını saklı tutar.',
    ],
  },
  {
    heading: 'Kişisel veriler',
    paragraphs: [
      'Formda verdiğiniz bilgiler yalnızca çekilişin yürütülmesi ve ödül teslimi için ' +
        'kullanılır, üçüncü taraflarla paylaşılmaz. Ayrıntılar için gizlilik politikası ' +
        've KVKK aydınlatma metnine bakabilirsiniz.',
    ],
  },
  {
    heading: 'Apple ile ilişki',
    paragraphs: [
      APPLE_DISCLAIMER,
      'Çekilişe dair her türlü soru, talep ve şikâyet düzenleyene iletilir; Apple bu ' +
        'konularda muhatap değildir.',
    ],
  },
  {
    heading: 'İletişim',
    paragraphs: [`${RAFFLE_ORGANIZER} — ${RAFFLE_CONTACT_EMAIL}`],
  },
];
