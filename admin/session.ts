import { createHmac, timingSafeEqual } from 'node:crypto';
import { BlockList, isIP } from 'node:net';

/**
 * Oturum çerezinin başlığını üretir.
 *
 * Ayrı bir dosyada çünkü `server.ts` içe aktarılınca `app.listen` çalışıyor —
 * yani sunucuyu ayağa kaldırmadan sınanamıyor. Buradaki fonksiyon saf: bir
 * nesne alıyor, bir metin döndürüyor, `check:panel` doğrudan çağırabiliyor.
 *
 * `Secure` neden koşullu: panel yerelde düz HTTP üzerinden çalışıyor ve
 * `Secure` çerezi tarayıcı orada hiç saklamıyor — sabit koymak yerel girişi
 * tamamen kırardı. Sunucuda ise HTTPS'i Coolify'ın önündeki proxy sonlandırıyor,
 * uygulamaya istek düz HTTP olarak geliyor; bu yüzden karar `req.secure`'a
 * bakılarak veriliyor (Express `trust proxy` açıkken `X-Forwarded-Proto`
 * başlığını okuyor).
 *
 * `Secure`siz bir oturum çerezi, panele bir kez düz HTTP ile ulaşılabildiği anda
 * ağdaki herkese açık demek — panel öğrenci kayıtlarını görüyor, isim ve
 * numaraları da.
 */
export function cookieHeader(opts: {
  name: string;
  value: string;
  secure: boolean;
  /** Saniye. 0 çerezi siler. */
  maxAge: number;
}): string {
  const parts = [
    `${opts.name}=${opts.value}`,
    'HttpOnly',
    // SameSite=Strict siteler arası POST'ların çerezi taşımasını engelliyor;
    // bu ölçekte CSRF için yeterli koruma.
    'SameSite=Strict',
    'Path=/',
    `Max-Age=${opts.maxAge}`,
  ];
  if (opts.secure) parts.push('Secure');
  return parts.join('; ');
}

/** Oturum ömrü, saniye. Çerezin Max-Age'i ile jetonun süresi aynı sayıdan geliyor. */
export const SESSION_SECONDS = 43200;

function sign(secret: Buffer, value: string): string {
  return createHmac('sha256', secret).update(value).digest('hex');
}

/**
 * Oturum jetonu: `<verilişZamanıMs>.<imza>`.
 *
 * Eskiden jeton sabit bir metnin imzasıydı — süreç ömrü boyunca herkese aynı
 * değer. Çerezin Max-Age'i tarayıcının verdiği söz; sunucu tarafında hiçbir
 * şey eskimiyordu, yani bir kez sızan çerez yeniden başlatmaya kadar
 * geçerliydi. Veriliş zamanı imzanın içinde: jeton kişiye özgü ve süreli,
 * sunucu yine hiçbir şey saklamıyor.
 */
export function issueToken(secret: Buffer, now = Date.now()): string {
  const issued = String(now);
  return `${issued}.${sign(secret, issued)}`;
}

/**
 * Çıkış yapılmış jetonlar — süreç içi, sınırlı.
 *
 * `/logout` yalnızca çerezi siliyordu; jeton 12 saat daha geçerli kalıyordu.
 * Ortak bir bilgisayarda "çıkış yaptım" diyen yönetici, geri düğmesiyle ya da
 * kopyalanmış bir çerezle geri dönülebilen bir oturum bırakıyordu.
 *
 * Sunucu hâlâ oturum SAKLAMIYOR — yalnızca iptal edilenleri hatırlıyor, ve
 * onlar zaten 12 saatte kendiliğinden geçersiz oluyor. Yeniden başlatma
 * listeyi siliyor: o an hâlâ geçerli olan bir iptal edilmiş jeton geri
 * gelebilir. Bunu kapatmanın tek yolu kalıcı bir depo ve o, bu panelin
 * taşımadığı bir şey — bedeli burada yazılı olsun.
 */
const iptalEdilen = new Map<string, number>();

export function revokeToken(secret: Buffer, token: string | null, now = Date.now()): boolean {
  // YALNIZCA İMZASI DOĞRULANAN JETON SAKLANIYOR. `/logout` kimliksiz ve
  // gövdesiz: gelen çerez değeri ne olursa olsun listeye giriyordu, ve liste
  // her yazmada baştan sona taranıyor. On altı KB'lık uydurma çerezlerle bir
  // döngü, tek bir Map'te gigabaytlar ve her istekte uzayan bir tarama
  // demekti — kimliksiz, sınırsız. İmzasız bir değerin iptali zaten anlamsız:
  // `verifyToken` onu hiçbir zaman geçirmiyor.
  if (!token || !verifyToken(secret, token, now)) return false;
  // Süresi dolmuşları temizle: liste bir sekmeye basılan çıkış sayısı kadar
  // büyüyor, yani küçük — ama sınırsız değil.
  for (const [t, s] of iptalEdilen) if (s <= now) iptalEdilen.delete(t);
  iptalEdilen.set(token, now + SESSION_SECONDS * 1000);
  return true;
}

export function verifyToken(secret: Buffer, token: string | null, now = Date.now()): boolean {
  const bitis = token ? iptalEdilen.get(token) : undefined;
  if (bitis !== undefined && bitis > now) return false;
  if (!token) return false;
  const dot = token.indexOf('.');
  if (dot < 0) return false;
  const issued = token.slice(0, dot);
  const given = Buffer.from(token.slice(dot + 1));
  const expected = Buffer.from(sign(secret, issued));
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return false;
  const age = now - Number(issued);
  return Number.isFinite(age) && age >= 0 && age < SESSION_SECONDS * 1000;
}

/**
 * Bu POST isteği panelin kendi sayfasından mı geliyor?
 *
 * **`SameSite=Strict` tek başına yetmiyor, ve sebebi alan adı.** SameSite
 * "site" diyor, "origin" demiyor: site eTLD+1, yani `kouseng.com`. Kulübün
 * kendi sitesindeki bir XSS ya da ele geçmiş bir alt alan adı, panele
 * çerezi TAŞIYAN bir POST yollayabiliyor — panel etkinlik siliyor, kayıt
 * dışa aktarıyor, sertifika iptal ediyor.
 *
 * `Origin` başlığını **tarayıcı** yazıyor ve sayfa JavaScript'i onu
 * değiştiremiyor; siteler arası bir formun POST'u kendi kaynağını taşıyor.
 * Bu yüzden gizli bir jeton ve onu her forma eklemek gerekmiyor: karşılaştırma
 * tek satır ve her form bedava korunuyor.
 *
 * `Origin` yoksa `Referer`e düşülüyor (eski tarayıcılar ve bazı proxy'ler onu
 * kırpıyor); ikisi de yoksa **kabul ediliyor**. Reddetmek daha güvenli
 * görünüyor ama değil: uygulamanın `fetch`i hiç `Origin` göndermiyor, ve
 * "hiç başlık yok" durumunu reddetmek CSRF'i değil, başlık göndermeyen
 * istemcileri kesiyor. Buradaki koruma çerezli tarayıcı isteklerine ait ve
 * onların hepsi `Origin` taşıyor.
 */
export function sameOrigin(
  origin: string | undefined,
  referer: string | undefined,
  host: string | undefined,
): boolean {
  if (!host) return true;
  const kaynak = origin || referer;
  if (!kaynak) return true;
  // `https://mobil.kouseng.com/yol` → `mobil.kouseng.com`. Elle ayrıştırılıyor
  // çünkü `URL` bozuk girdide fırlatıyor ve bir başlık her zaman bozuk olabilir.
  const m = /^[a-z][a-z0-9+.-]*:\/\/([^/?#]+)/i.exec(kaynak.trim());
  if (!m) return false;
  return m[1].toLowerCase() === host.toLowerCase();
}

/**
 * Cloudflare'in yayımladığı kenar aralıkları — https://www.cloudflare.com/ips
 * (2026-09-24'te canlı listeyle karşılaştırıldı, birebir aynı). Liste yıllardır
 * değişmedi; değişirse buradaki kopya da güncellenmeli, yoksa yeni bir
 * kenardan gelen başlık yok sayılır ve o kenarın arkasındaki herkes `req.ip`
 * ile tek kovaya düşer — sahte başlığa güvenmekten yine de iyi.
 */
const CLOUDFLARE = [
  '173.245.48.0/20', '103.21.244.0/22', '103.22.200.0/22', '103.31.4.0/22',
  '141.101.64.0/18', '108.162.192.0/18', '190.93.240.0/20', '188.114.96.0/20',
  '197.234.240.0/22', '198.41.128.0/17', '162.158.0.0/15', '104.16.0.0/13',
  '104.24.0.0/14', '172.64.0.0/13', '131.0.72.0/22',
  '2400:cb00::/32', '2606:4700::/32', '2803:f800::/32', '2405:b500::/32',
  '2405:8100::/32', '2a06:98c0::/29', '2c0f:f248::/32',
];

/**
 * Özel ve yerel aralıklar. Cloudflare Tunnel (cloudflared) buradan bağlanıyor:
 * kaynak sunucu internete hiç açık değil, başlığı yazan yine Cloudflare.
 */
const OZEL = ['10.0.0.0/8', '172.16.0.0/12', '192.168.0.0/16', '127.0.0.0/8', '::1/128', 'fc00::/7', 'fe80::/10'];

const guvenilenEs = new BlockList();
for (const cidr of [...CLOUDFLARE, ...OZEL]) {
  const [adres, onek] = cidr.split('/');
  guvenilenEs.addSubnet(adres, Number(onek), adres.includes(':') ? 'ipv6' : 'ipv4');
}

/** Eş adresi Cloudflare kenarı ya da yerel bir proxy mi? IPv4-mapped IPv6 de tanınıyor. */
export function proxyGuvenilir(es: string): boolean {
  const surum = isIP(es);
  if (!surum) return false;
  return guvenilenEs.check(es, surum === 6 ? 'ipv6' : 'ipv4');
}

/**
 * İstek gerçekten kimden geliyor — hız sınırlarının ANAHTARI.
 *
 * **BAŞLIĞI İSTEMCİ DE YAZABİLİYOR.** `CF-Connecting-IP`'ye koşulsuz güvenen
 * ilk hâl, panelin kaynak adresine doğrudan ulaşan herkese (alan adı
 * Cloudflare'de değilse, ya da Coolify'ın adresi biliniyorsa) her istekte
 * başka bir değer yazıp IP'ye bağlı BÜTÜN sayaçları — yönetici parolası
 * denemesi dâhil — sıfırlama imkânı veriyordu. Ölçüldü: 50 istekte 0 red.
 * Ve `check:panel` bunu yeşil gösteriyordu, çünkü doğru başlığın okunduğunu
 * ölçüyor, sahte başlığın okunMAdığını hiç ölçmüyordu. Başlığa ancak eş
 * adresi (`req.ip`) Cloudflare'in kenar aralıklarındaysa ya da yerel/özel bir
 * adresse güveniliyor; `check:security` sahte başlıklı döngüyü koşturuyor.
 *
 * **`trust proxy 1` bir proxy sayıyor.** Panelin önünde Coolify/Traefik var;
 * alan adı Cloudflare'e bağlıysa **iki** proxy oluyor ve Express en yakın
 * proxy'den bir öncekini, yani Cloudflare kenar sunucusunun adresini,
 * "istemci" sanıyor. O adresi kaç kişinin paylaştığı belli değil ama az sayıda
 * olduğu kesin: bu dosyadaki bütün sayaçlar bir avuç kenar adresine
 * anahtarlanır ve **saatte 20 posta sınırı dünyanın tamamı için 20 olur.**
 * Belirti yine "kod gelmiyor", ve sebebi bir güvenlik önlemi.
 *
 * `CF-Connecting-IP` bu sorunun kendi cevabı: yalnızca Cloudflare arkasındayken
 * var ve Cloudflare onu **istemciden gelen değerin üzerine yazıyor**, yani
 * uydurulamıyor. Yoksa `req.ip`'ye düşülüyor. Hop sayısını elle ayarlamaya
 * gerek kalmıyor — yanlış ayarlanmış bir sayı da sessizce yanlış cevap
 * verirdi.
 *
 * Cloudflare yoksa başlık da yok: doğrudan Coolify'a gelen isteğe hiçbir şey
 * eklenmiyor ve `req.ip` zaten doğru.
 */
export function clientIp(req: {
  ip?: string;
  get?(name: string): string | undefined;
  header?(name: string): string | undefined;
}): string {
  const oku = (ad: string) => req.get?.(ad) ?? req.header?.(ad) ?? undefined;
  const es = (req.ip ?? '').trim();
  const cf = (oku('cf-connecting-ip') ?? '').trim();
  // Başlık ancak Cloudflare'in (ya da yerel bir tünelin) elinden geçmişse
  // gerçek; herkese açık bir eşten gelen başlık istemcinin kendi yazdığı şey.
  // Cloudflare tek bir adres yazıyor; IP olmayan bir değer (virgüllü liste,
  // metin) beklediğimiz şey değil ve güvenilmiyor.
  if (cf && isIP(cf) && proxyGuvenilir(es)) return cf;
  return es || 'bilinmiyor';
}

export const LOGIN_MAX_FAILURES = 10;
export const LOGIN_LOCK_MS = 15 * 60 * 1000;

/**
 * Giriş denemesi sınırı, IP başına.
 *
 * Parola karşılaştırması zaman-sabiti ama deneme sayısını hiçbir şey
 * sınırlamıyordu; panel internete açık ve arkasında isim + öğrenci numarası
 * var. Pencere kayan: son hatadan itibaren 15 dakika içinde 10 hata kilitler.
 * `req.ip`, `trust proxy 1` ile proxy'nin yazdığı adres — istemcinin
 * uydurduğu başlık değil.
 *
 * Tavan ve pencere parametre: aynı mekanizmayı `/api/hesap/kod`, `/hesap-sil`
 * ve parola sıfırlamanın iki uç noktası başka bütçelerle kullanıyor. Kampüs
 * NAT'ının arkasında yüzlerce öğrenci tek IP'den geliyor, o yüzden oradaki
 * sayılar buradakinden cömert — dar tutulursa belirti "yurtta kimse kod
 * alamıyor / parolasını sıfırlayamıyor" olur ve kimse bunu NAT'a bağlamaz.
 */
export function loginLimiter(
  now: () => number = Date.now,
  maxFailures: number = LOGIN_MAX_FAILURES,
  lockMs: number = LOGIN_LOCK_MS,
) {
  // ponytail: süreç içi Map, tek örnek; birden çok panel örneği olursa paylaşımlı depo.
  const failures = new Map<string, { count: number; until: number }>();
  return {
    /** Kilitliyse kalan milisaniye, değilse 0. */
    lockedFor(ip: string): number {
      const f = failures.get(ip);
      if (!f) return 0;
      const left = f.until - now();
      if (left <= 0) {
        failures.delete(ip);
        return 0;
      }
      return f.count >= maxFailures ? left : 0;
    },
    fail(ip: string): void {
      const t = now();
      // Süresi geçenler yalnızca okunurken siliniyor; bir tarama internetten
      // gelen IP sayısının Map'i büyütmesini önlüyor.
      if (failures.size > 10_000) {
        for (const [k, v] of failures) if (v.until <= t) failures.delete(k);
      }
      const f = failures.get(ip);
      const count = f && f.until > t ? f.count + 1 : 1;
      failures.set(ip, { count, until: t + lockMs });
    },
    succeed(ip: string): void {
      failures.delete(ip);
    },
  };
}
