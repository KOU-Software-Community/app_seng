/**
 * `npm run check:gundem`
 *
 * AI Gündem bölümünün yapılandırma kararını sınar. `resolveEnv` saf olduğu için
 * doğrudan çağrılabiliyor — `process.env`'e dokunmadan, uygulama açılmadan.
 *
 * Burada korunan şey tek bir davranış: **reddedilen bir yapılandırma
 * fixture'lara düşmüyor.** Kaynak uygulamada düşüyordu, ve o kabul edilebilirdi
 * çünkü mock verisi geliştirme içindi. Burada değil: mağaza sürümünde uydurma
 * haber başlıkları gerçek haber gibi görünür. Bu deponun why-log'unda "arayüzü
 * olan kurgu, değişkendeki kurgudan çok daha zor fark edilir" diye yazıyor —
 * bu kontrol o maddenin bekçisi.
 */
import { resolveEnv, defaultDataModeFor } from '../src/gundem/config/env';

let failed = 0;
function assert(name: string, condition: boolean, detail = '') {
  console.log(`${condition ? '✓' : '✗'} ${name}${condition ? '' : `\n    ${detail}`}`);
  if (!condition) failed += 1;
}

const KEYS = {
  url: 'https://eglxzbsrewbleqlstefd.supabase.co',
  anon: 'eyJhbGciOiJIUzI1NiJ9.ornek.imza',
};

const dev = { defaultMode: defaultDataModeFor(true) };
const prod = { defaultMode: defaultDataModeFor(false) };

// 1. Varsayılanlar derleme türüne göre değişiyor.
assert('geliştirmede varsayılan mock', defaultDataModeFor(true) === 'mock');
assert('sürümde varsayılan supabase', defaultDataModeFor(false) === 'supabase');

const devEmpty = resolveEnv({ dataMode: undefined, supabaseUrl: undefined, supabaseAnonKey: undefined }, dev);
assert('geliştirmede boş yapılandırma mock veriyor', devEmpty.mode === 'mock', devEmpty.mode);
assert('mock’ta sorun bildirilmiyor', devEmpty.problem === null, String(devEmpty.problem));

// 2. Asıl mesele: sürümde eksik yapılandırma **mock’a düşmüyor**.
//    Düşseydi mağaza derlemesi uydurma haberleri gerçek gibi gösterirdi.
const prodEmpty = resolveEnv({ dataMode: undefined, supabaseUrl: undefined, supabaseAnonKey: undefined }, prod);
assert('sürümde eksik yapılandırma unconfigured', prodEmpty.mode === 'unconfigured', prodEmpty.mode);
assert('sürümde eksik yapılandırma mock DEĞİL', prodEmpty.mode !== 'mock', prodEmpty.mode);
assert(
  'eksik değişkenlerin ikisi de adıyla anılıyor',
  /EXPO_PUBLIC_AIGUNDEM_SUPABASE_URL/.test(prodEmpty.problem ?? '') &&
    /EXPO_PUBLIC_AIGUNDEM_SUPABASE_ANON_KEY/.test(prodEmpty.problem ?? ''),
  String(prodEmpty.problem),
);
assert('unconfigured’da anahtar taşınmıyor', prodEmpty.supabaseUrl === null && prodEmpty.supabaseAnonKey === null);

// Tek eksik de yeter, ve hangisi olduğunu söylüyor.
const onlyUrl = resolveEnv({ dataMode: 'supabase', supabaseUrl: KEYS.url, supabaseAnonKey: undefined }, dev);
assert('anahtar eksikse unconfigured', onlyUrl.mode === 'unconfigured', onlyUrl.mode);
assert('eksik olanı adıyla söylüyor', /ANON_KEY/.test(onlyUrl.problem ?? ''), String(onlyUrl.problem));
assert('eksik olmayanı suçlamıyor', !/SUPABASE_URL/.test(onlyUrl.problem ?? ''), String(onlyUrl.problem));

// 3. Tam yapılandırma çalışıyor.
const ok = resolveEnv({ dataMode: 'supabase', supabaseUrl: KEYS.url, supabaseAnonKey: KEYS.anon }, dev);
assert('tam yapılandırma supabase', ok.mode === 'supabase', ok.mode);
assert('url taşınıyor', ok.supabaseUrl === KEYS.url);
assert('anahtar taşınıyor', ok.supabaseAnonKey === KEYS.anon);
assert('tam yapılandırmada sorun yok', ok.problem === null, String(ok.problem));

// 4. Açık istek varsayılanı yeniyor — geliştirici sürüm derlemesini mock’a,
//    geliştirme derlemesini canlıya çevirebilsin.
const forcedMock = resolveEnv({ dataMode: 'mock', supabaseUrl: KEYS.url, supabaseAnonKey: KEYS.anon }, prod);
assert('açıkça mock istenirse mock', forcedMock.mode === 'mock', forcedMock.mode);
assert('mock’ta anahtarlar taşınmıyor', forcedMock.supabaseUrl === null);

// 5. Geçersiz değer sessizce yutulmuyor.
const bogus = resolveEnv({ dataMode: 'supabse', supabaseUrl: KEYS.url, supabaseAnonKey: KEYS.anon }, dev);
assert('yazım hatası unconfigured', bogus.mode === 'unconfigured', bogus.mode);
assert('yanlış değeri geri okutuyor', /supabse/.test(bogus.problem ?? ''), String(bogus.problem));
assert('beklenen değerleri sayıyor', /mock \| supabase/.test(bogus.problem ?? ''), String(bogus.problem));

// 6. Boşluk dolu bir değer "verilmiş" sayılmıyor. Panel formlarında ve EAS
//    değişkenlerinde boşluk bırakmak, değeri silmekten daha kolay.
const blank = resolveEnv({ dataMode: '   ', supabaseUrl: '  ', supabaseAnonKey: '\t' }, prod);
assert('yalnızca boşluk olan mod yok sayılıyor', blank.mode === 'unconfigured', blank.mode);
const blankKeys = resolveEnv({ dataMode: 'supabase', supabaseUrl: '   ', supabaseAnonKey: KEYS.anon }, dev);
assert('boşluk dolu url eksik sayılıyor', blankKeys.mode === 'unconfigured', blankKeys.mode);
const padded = resolveEnv({ dataMode: ' supabase ', supabaseUrl: ` ${KEYS.url} `, supabaseAnonKey: ` ${KEYS.anon} ` }, dev);
assert('baştaki sondaki boşluk kırpılıyor', padded.mode === 'supabase' && padded.supabaseUrl === KEYS.url, padded.mode);

// 7. Sonuç dondurulmuş: çağıran yanlışlıkla yapılandırmayı değiştiremesin.
assert('sonuç dondurulmuş', Object.isFrozen(ok));

console.log(failed ? `\n${failed} kontrol başarısız.` : '\nTüm kontroller geçti.');
process.exit(failed ? 1 : 0);
