import { createMockRepositories } from '../mock';
import { parseSourceUrl } from '../sourceUrl';

/**
 * `parseSourceUrl` — ve onun yerini aldığı `new URL()` varsayımı.
 *
 * Bu dosyanın ilk bölümü ayrıştırıcıyı doğrudan sınıyor. İkinci bölüm aynı
 * girdileri **depo sınırından** geçiriyor, çünkü kullanıcının gördüğü şey
 * ayrıştırıcının dönüşü değil, deponun hata kodu.
 */

describe('parseSourceUrl — the cases React Native’s URL got wrong', () => {
  /**
   * En önemlisi. RN'in `URL`'i geçersiz girdide fırlatmıyor; eski koddaki
   * `catch` bu yüzden erişilemezdi ve `protocol` getter'ı `''` döndüğü için
   * cevap "yalnızca https" oluyordu. Kullanıcıya yanlış sebep söylemek,
   * yanlış cevap vermenin sessiz hâli.
   */
  it('calls a non-URL invalid_input, not "only https"', () => {
    const result = parseSourceUrl('bu bir adres değil');
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error('unreachable');
    expect(result.problem).toBe('invalid_input');
    expect(result.message).not.toContain('https');
  });

  /**
   * `password` getter'ı `/https?:\/\/.*:(.*)@/` idi — açgözlü `.*` yetki
   * bölümünün dışına taşıyor. Bu adres tamamen normal; eski kod onu kimlik
   * bilgisi taşıyor sanıp reddediyordu.
   */
  it('does not see credentials in a path or query string', () => {
    const result = parseSourceUrl('https://ornek.com/rss?redirect=https://a:b@c.com');
    expect(result.ok).toBe(true);
  });

  it('still refuses credentials in the authority', () => {
    const result = parseSourceUrl('https://kullanici:parola@ornek.com/rss');
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error('unreachable');
    expect(result.problem).toBe('unsupported_source');
  });

  /**
   * `new URL('a#b')` RN'de yapıcının içinde çöküyor: `'a#b'.split('://')[1]`
   * `undefined` ve üzerinde `.includes` çağrılıyor. Tek başına yakalanıyordu,
   * ama bir doğrulayıcının doğru cevabı bir çökme olamaz.
   */
  it('answers instead of crashing on a fragment with no scheme', () => {
    expect(() => parseSourceUrl('a#b')).not.toThrow();
    expect(parseSourceUrl('a#b').ok).toBe(false);
  });

  it('refuses a non-https scheme as unsupported, not as malformed', () => {
    const result = parseSourceUrl('http://ornek.com/rss');
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error('unreachable');
    expect(result.problem).toBe('unsupported_source');
  });

  it('refuses ftp the same way', () => {
    const result = parseSourceUrl('ftp://ornek.com/rss');
    if (result.ok) throw new Error('unreachable');
    expect(result.problem).toBe('unsupported_source');
  });

  it('requires a URL at all, before it can be unsupported', () => {
    // Şemasız girdi önce "adres değil". `unsupported_source` demek, bir şema
    // gördüğünü ve beğenmediğini iddia etmek olurdu.
    const result = parseSourceUrl('ornek.com/rss');
    if (result.ok) throw new Error('unreachable');
    expect(result.problem).toBe('invalid_input');
  });

  it('rejects an empty string with the "address required" message', () => {
    const result = parseSourceUrl('   ');
    if (result.ok) throw new Error('unreachable');
    expect(result.problem).toBe('invalid_input');
    expect(result.message).toContain('gerekli');
  });
});

describe('parseSourceUrl — hosts', () => {
  it('keeps a hyphen: ai-haber.ornek.com is a real name', () => {
    expect(parseSourceUrl('https://ai-haber.ornek.com/feed').ok).toBe(true);
  });

  it('keeps a port', () => {
    const result = parseSourceUrl('https://ornek.com:8443/feed');
    if (!result.ok) throw new Error(result.message);
    expect(result.url).toBe('https://ornek.com:8443/feed');
  });

  it('refuses a dotless host — that can only be something on the server’s own network', () => {
    expect(parseSourceUrl('https://localhost/feed').ok).toBe(false);
    expect(parseSourceUrl('https://internal-service/feed').ok).toBe(false);
  });

  it('refuses whitespace inside the host', () => {
    expect(parseSourceUrl('https://ornek .com/feed').ok).toBe(false);
  });

  /**
   * Şema ve ana makine adı ASCII küçültülüyor. `toLowerCase()` `İ`yi
   * `i` + birleşen noktaya çeviriyor, `toLocaleLowerCase('tr')` ise `I`yı `ı`
   * yapıyor; ikisi de hiçbir DNS kaydının karşılığı olmayan bir ad üretir.
   */
  it('lowercases ASCII only, so a Turkish capital cannot become a new hostname', () => {
    const plain = parseSourceUrl('HTTPS://ORNEK.COM/Feed');
    if (!plain.ok) throw new Error(plain.message);
    expect(plain.url).toBe('https://ornek.com/Feed');

    const turkish = parseSourceUrl('https://İSTANBUL.com/feed');
    if (!turkish.ok) throw new Error(turkish.message);
    // `İ` olduğu gibi kalıyor: ASCII değil, dokunulmuyor.
    expect(turkish.host).toBe('İstanbul.com');
    expect(turkish.host).not.toBe('İSTANBUL.com'.toLowerCase());
    expect(turkish.host).not.toBe('İSTANBUL.com'.toLocaleLowerCase('tr'));
  });

  it('gives a path-less URL a "/" so two spellings of one feed are one string', () => {
    const bare = parseSourceUrl('https://ornek.com');
    const slash = parseSourceUrl('https://ornek.com/');
    if (!bare.ok || !slash.ok) throw new Error('both should parse');
    expect(bare.url).toBe(slash.url);
  });

  it('leaves the path alone otherwise — a feed path can be case sensitive', () => {
    const result = parseSourceUrl('https://ornek.com/RSS/Feed.xml?x=A#B');
    if (!result.ok) throw new Error(result.message);
    expect(result.url).toBe('https://ornek.com/RSS/Feed.xml?x=A#B');
  });
});

/**
 * Depo sınırı. `addSourceByUrl` bugün hiçbir ekrandan çağrılmıyor (kullanıcı
 * kendi RSS'ini ekleyemiyor), ama sözleşmede duruyor ve ilk çağıran onu bu
 * hâliyle bulacak. Ayrıştırıcı doğru olup depo yanlış kodu döndürseydi bu
 * dosyanın ilk yarısı yine yeşil olurdu.
 */
describe('the mock repository reports the parser’s reason', () => {
  const repos = createMockRepositories();

  it('invalid_input for something that is not a URL', async () => {
    const result = await repos.sources.addSourceByUrl('bu bir adres değil');
    expect(result.ok).toBe(false);
    if (result.ok) throw new Error('unreachable');
    expect(result.error.code).toBe('invalid_input');
  });

  it('unsupported_source for http', async () => {
    const result = await repos.sources.addSourceByUrl('http://ornek.com/rss');
    if (result.ok) throw new Error('unreachable');
    expect(result.error.code).toBe('unsupported_source');
  });

  it('unsupported_source for credentials', async () => {
    const result = await repos.sources.addSourceByUrl('https://a:b@ornek.com/rss');
    if (result.ok) throw new Error('unreachable');
    expect(result.error.code).toBe('unsupported_source');
  });

  it('invalid_input for an empty string', async () => {
    const result = await repos.sources.addSourceByUrl('');
    if (result.ok) throw new Error('unreachable');
    expect(result.error.code).toBe('invalid_input');
  });

  /**
   * Mock burada `not_implemented` değil `duplicate_source`/`unsupported_source`
   * demeli: doğrulama gerçekten çalıştıysa geçerli bir adres doğrulamayı
   * **geçip** mock'un "besleme çekemem" cevabına ulaşır.
   */
  it('lets a well-formed https URL past validation', async () => {
    const result = await repos.sources.addSourceByUrl('https://yeni-kaynak.ornek.com/rss.xml');
    if (result.ok) throw new Error('the mock cannot actually add a source');
    expect(['not_implemented', 'duplicate_source']).toContain(result.error.code);
  });
});
