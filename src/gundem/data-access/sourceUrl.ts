/**
 * Kaynak URL doğrulaması — `URL` kullanmadan.
 *
 * Taşınan kod `new URL(raw)` çağırıp `catch` bloğunda "geçerli URL değil"
 * diyordu. Tarayıcıda ve Node'da doğru; **burada değil.** React Native'in
 * `URL`'i (`react-native/Libraries/Blob/URL.js`) bir ayrıştırıcı değil, bir
 * dize sarmalayıcısı: taban verilmediğinde girdiyi hiç denetlemeden saklıyor,
 * yani hiçbir zaman fırlatmıyor ve o `catch` erişilemez kod. Ölçülen sonuçlar:
 *
 * - `"bu bir url değil"` → `protocol` getter'ı `''` dönüyor, dolayısıyla kod
 *   `invalid_input` yerine `unsupported_source` ("yalnızca https") diyordu:
 *   kullanıcıya yanlış sebep.
 * - `password` getter'ı `/https?:\/\/.*:(.*)@/` — açgözlü `.*` tüm dizeyi
 *   tarıyor, yani `https://ornek.com/x?a=b:c@d` kimlik bilgisi taşıyor sanılıp
 *   reddediliyordu. Kimlik bilgisi yalnızca yetki (authority) bölümünde olur.
 * - `new URL('a#b')` **çöküyor**: yapıcı `'a#b'.split('://')[1]` → `undefined`
 *   üzerinde `.includes` çağırıyor. Bu tek durumda `catch` kazara doğru cevabı
 *   veriyordu.
 *
 * O yüzden ayrıştırma burada, elle. Girdi bir dize, çıktı bir karar; motor,
 * global ve platform bilgisi girmiyor.
 */

/** Reddin sebebi — çağıran bunu doğrudan `DataError` koduna çeviriyor. */
export type SourceUrlProblem = 'invalid_input' | 'unsupported_source';

export type ParsedSourceUrl =
  | { ok: true; url: string; host: string }
  | { ok: false; problem: SourceUrlProblem; message: string };

/**
 * Yalnızca ASCII A–Z küçültülüyor.
 *
 * `toLowerCase()` olsaydı `İSTANBUL.com` → `i̇stanbul.com` (i + birleşen nokta)
 * olurdu ve ortaya hiçbir sunucunun tanımadığı bir ana makine adı çıkardı;
 * `toLocaleLowerCase('tr')` ise `I` → `ı` yapardı. Şema ve ana makine adı
 * Türkçe metin değil, protokol dizesi — bu yüzden yerel ayar hiç girmiyor.
 */
const asciiLower = (value: string): string =>
  value.replace(/[A-Z]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) + 32));

/** `scheme://` — RFC 3986 §3.1. Şemasız girdi bir URL değil, bir metin. */
const SCHEME = /^([A-Za-z][A-Za-z0-9+.-]*):\/\//;

/**
 * Boşluk, kontrol karakteri ve DEL bir ana makine adında bulunamaz.
 *
 * Tire kasten yok: `ai-haber.ornek.com` geçerli bir ad ve onu elemek,
 * düzeltilmekte olan hatanın aynısını ters yönde kurardı.
 */
const hasForbiddenHostChar = (host: string): boolean => {
  for (let i = 0; i < host.length; i += 1) {
    const code = host.charCodeAt(i);
    if (code <= 0x20 || code === 0x7f) return true;
  }
  return false;
};

const invalid = (raw: string): ParsedSourceUrl => ({
  ok: false,
  problem: 'invalid_input',
  message: `"${raw}" geçerli bir adres değil.`,
});

export function parseSourceUrl(input: string): ParsedSourceUrl {
  const raw = input?.trim() ?? '';
  if (!raw) {
    return { ok: false, problem: 'invalid_input', message: 'Bir akış veya site adresi gerekli.' };
  }

  const schemeMatch = SCHEME.exec(raw);
  if (!schemeMatch) return invalid(raw);

  const scheme = asciiLower(schemeMatch[1]);
  const afterScheme = raw.slice(schemeMatch[0].length);

  // Yetki bölümü: ilk `/`, `?` ya da `#`e kadar. Kimlik bilgisi taraması
  // **yalnızca** burada yapılıyor; yol ve sorgu dizesindeki bir `@` kullanıcı
  // adı değildir.
  const authorityEnd = afterScheme.search(/[/?#]/);
  const authority = authorityEnd === -1 ? afterScheme : afterScheme.slice(0, authorityEnd);
  const rest = authorityEnd === -1 ? '' : afterScheme.slice(authorityEnd);

  if (authority.includes('@')) {
    return {
      ok: false,
      problem: 'unsupported_source',
      message: 'Kullanıcı adı/parola içeren adresler kabul edilmiyor.',
    };
  }
  if (!authority) return invalid(raw);

  // Port varsa ayrılıyor: `ornek.com:8443`. IPv6 (`[::1]`) bu uygulamada
  // geçmiyor — aşağıdaki nokta koşulu zaten eliyor — ama köşeli parantezi ana
  // makine adının parçası saymak yanlış bir hata mesajı üretirdi.
  const portSplit = /^(\[[^\]]*\]|[^:]*)(?::(\d*))?$/.exec(authority);
  if (!portSplit) return invalid(raw);
  const host = asciiLower(portSplit[1]);
  const port = portSplit[2];

  if (!host || hasForbiddenHostChar(host)) return invalid(raw);
  if (port !== undefined && !/^\d+$/.test(port)) return invalid(raw);
  // Bir RSS kaynağı her zaman kayıtlı bir alan adında. Noktasız bir ad
  // (`localhost`, bir konteyner adı) yalnızca sunucunun kendi ağında bir şeye
  // işaret edebilir; sunucudaki SSRF kuralı da onu reddediyor — istemci de
  // reddetsin ki bir tur atmadan söylensin.
  if (!host.includes('.') || host.startsWith('.') || host.endsWith('.')) return invalid(raw);

  if (scheme !== 'https') {
    return {
      ok: false,
      problem: 'unsupported_source',
      message: 'Yalnızca https:// ile başlayan kaynaklar eklenebilir.',
    };
  }

  const authorityOut = port ? `${host}:${port}` : host;
  return { ok: true, url: `https://${authorityOut}${rest || '/'}`, host };
}
