/**
 * AI Gündem bölümünün ortam yapılandırması — `process.env`'i okuyan tek yer.
 *
 * Değişkenler `EXPO_PUBLIC_AIGUNDEM_` önekli: bu depoda `SUPABASE_URL` ve
 * `SUPABASE_SERVICE_ROLE_KEY` **zaten var** ve panelin görsel deposuna ait,
 * tamamen başka bir Supabase projesi. Önek olmasaydı iki proje aynı isme
 * bakardı ve yanlış olan sessizce kazanırdı.
 *
 * Üç okuma da harfi harfine yazılmak zorunda: Expo'nun babel eklentisi
 * `process.env.EXPO_PUBLIC_*` ifadesini ancak statik üye erişimi olarak
 * *görürse* değeri paketin içine gömüyor. `process.env`'i bir nesne gibi
 * dolaştırmak üretim paketinde `undefined` üretir — ve bu, "yapılandırma yok"
 * gibi görünen ama aslında "kod yanlış" olan hatadır. `check:release` bu üç
 * okumanın yerinde durduğunu doğruluyor.
 */

/** Nereden veri okunacağı. */
export type DataMode = 'mock' | 'supabase';

/**
 * Çözülmüş mod. `unconfigured` üçüncü bir durum ve **kasıtlı**.
 *
 * Kaynak uygulama, eksik yapılandırmada sessizce `mock`'a düşüyordu. Bu depoda
 * o davranış kabul edilemez: `mock` verisi uydurma haber başlıkları demek ve
 * mağaza sürümünde kullanıcıya gerçek haber gibi görünürdü. Bu deponun
 * why-log'unda iki ayrı madde tam olarak bunu anlatıyor — "bir sürüm
 * derlemesinde konsol yoktur" ve "arayüzü olan kurgu, değişkendeki kurgudan çok
 * daha zor fark edilir".
 *
 * Bu yüzden reddedilen yapılandırma `mock` değil `unconfigured` dönüyor: tip,
 * çağıranı bu durumu ayrıca ele almaya zorluyor. Fixture'lar yalnızca biri
 * açıkça `mock` istediğinde görünür.
 */
export type ResolvedMode = DataMode | 'unconfigured';

export const DATA_MODES: readonly DataMode[] = ['mock', 'supabase'];

/**
 * Ayarlanmamış bir `EXPO_PUBLIC_AIGUNDEM_DATA_MODE` ne demek — derleme türüne
 * göre değişiyor: geliştirmede fixture'lar (kimse kimlik bilgisi olmadan
 * uygulamayı çalıştırabilsin), sürümde gerçek backend.
 */
export function defaultDataModeFor(isDev: boolean): DataMode {
  return isDev ? 'mock' : 'supabase';
}

declare const __DEV__: boolean | undefined;

/** `__DEV__` yoksa geliştirme varsay: ikisinden güvenli olanı. */
export const IS_DEV: boolean = typeof __DEV__ === 'boolean' ? __DEV__ : true;

export type RawEnv = {
  dataMode: string | undefined;
  supabaseUrl: string | undefined;
  supabaseAnonKey: string | undefined;
};

export type AppEnv = Readonly<{
  mode: ResolvedMode;
  /** Yalnızca `mode === 'supabase'` iken dolu. */
  supabaseUrl: string | null;
  /** Yalnızca `mode === 'supabase'` iken dolu. Tasarımı gereği herkese açık. */
  supabaseAnonKey: string | null;
  /**
   * Yapılandırma reddedildiyse sebebi, yoksa `null`.
   *
   * Sadece `console.warn` yetmiyor: sürüm derlemesinde konsol yok ve ekran
   * sessizce boş kalıyor. Bu metin ekranda gösterilmek için var — uygulamanın
   * `ContentNotice`'ı bu deponun aynı sorunu için zaten böyle çalışıyor.
   */
  problem: string | null;
}>;

const trim = (value: string | undefined): string | undefined => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

const isDataMode = (value: string): value is DataMode =>
  (DATA_MODES as readonly string[]).includes(value);

function unconfigured(problem: string): AppEnv {
  return Object.freeze({
    mode: 'unconfigured' as const,
    supabaseUrl: null,
    supabaseAnonKey: null,
    problem,
  });
}

/**
 * Ham metinleri doğrulanmış yapılandırmaya çevirir. Saf: test doğrudan
 * çağırabiliyor, `process.env`'e dokunmadan.
 */
export function resolveEnv(
  raw: RawEnv,
  defaults: { defaultMode: DataMode } = { defaultMode: defaultDataModeFor(IS_DEV) },
): AppEnv {
  const requested = trim(raw.dataMode);
  const url = trim(raw.supabaseUrl);
  const anonKey = trim(raw.supabaseAnonKey);

  if (requested !== undefined && !isDataMode(requested)) {
    return unconfigured(
      `EXPO_PUBLIC_AIGUNDEM_DATA_MODE="${requested}" geçersiz; ` +
        `beklenen: ${DATA_MODES.join(' | ')}.`,
    );
  }

  const mode: DataMode = requested ?? defaults.defaultMode;

  // Fixture'lar yalnızca açıkça istendiğinde. Reddedilen bir yapılandırma
  // buraya düşmüyor — `unconfigured` dönüyor.
  if (mode === 'mock') {
    return Object.freeze({
      mode: 'mock' as const,
      supabaseUrl: null,
      supabaseAnonKey: null,
      problem: null,
    });
  }

  const missing: string[] = [];
  if (!url) missing.push('EXPO_PUBLIC_AIGUNDEM_SUPABASE_URL');
  if (!anonKey) missing.push('EXPO_PUBLIC_AIGUNDEM_SUPABASE_ANON_KEY');
  if (missing.length > 0) {
    return unconfigured(
      `AI Gündem yapılandırılmamış: ${missing.join(' ve ')} eksik. ` +
        'EAS ortam değişkenlerine ekleyin; bunlar derleme sırasında pakete gömülür.',
    );
  }

  return Object.freeze({
    mode: 'supabase' as const,
    supabaseUrl: url as string,
    supabaseAnonKey: anonKey as string,
    problem: null,
  });
}

/**
 * Modül yüklenirken bir kez okunur. Üç okuma harfi harfine burada — babel'in
 * gömdüğü şey tam olarak bu ifadeler.
 */
export const env: AppEnv = resolveEnv({
  dataMode: process.env.EXPO_PUBLIC_AIGUNDEM_DATA_MODE,
  supabaseUrl: process.env.EXPO_PUBLIC_AIGUNDEM_SUPABASE_URL,
  supabaseAnonKey: process.env.EXPO_PUBLIC_AIGUNDEM_SUPABASE_ANON_KEY,
});
