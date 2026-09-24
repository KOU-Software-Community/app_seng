/**
 * `npm run check:security`
 *
 * Panelin güvenlik sınırlarını SALDIRGANIN ŞEKLİYLE sınar: sahte başlık, dönen
 * adres, çöp çerez, kullanıcı verisiyle gelen HTML. `check:panel` aynı
 * modülleri "doğru girdi doğru cevabı veriyor mu" diye sınıyor; burası
 * "yanlış girdi yanlış cevabı ALABİLİYOR mu" diye soruyor. İkisi aynı
 * fonksiyona bakıp farklı şeyler görebiliyor — `clientIp` tam olarak böyle
 * bir kez yanlış yeşil verdi: doğru başlığın okunduğu ölçülmüştü, sahte
 * başlığın okunMAdığı hiç ölçülmemişti.
 *
 * Sunucu ayağa kalkmıyor: `admin/server.ts` içe aktarılınca `app.listen`
 * çalışıyor, o yüzden buradaki her şey saf modüller ve sahte bir Express
 * üzerinden. `server.ts`'in kendi rotaları (/login, /hesap-sil, /logout)
 * burada ölçülemiyor — onların dayandığı fonksiyonlar ölçülüyor.
 */
import { randomBytes } from 'node:crypto';

import { registerAccountApi, type AuthLike } from '../admin/accountApi';
import { sertifikaMaili } from '../admin/certificateMail';
import { sertifikaPage, sertifikaYokPage } from '../admin/certificateView';
import { deleteAccountPage } from '../admin/legal';
import { notificationsPage } from '../admin/notificationsView';
import { qrPage } from '../admin/qrView';
import { clientIp, issueToken, revokeToken, sameOrigin, verifyToken } from '../admin/session';
import { CEVIRI_IP_LIMITI, registerTranslateApi } from '../admin/translateApi';
import { loginPage } from '../admin/views';

let failed = 0;
function assert(name: string, condition: boolean, detail = '') {
  console.log(`${condition ? '✓' : '✗'} ${name}${condition ? '' : `\n    ${detail}`}`);
  if (!condition) failed += 1;
}

type Rota = (req: unknown, res: unknown) => unknown | Promise<unknown>;

/** Yalnızca `post` yakalayan sahte Express. */
function sahteApp() {
  const rotalar = new Map<string, Rota>();
  return { app: { post: (yol: string, h: Rota) => rotalar.set(yol, h) } as never, rotalar };
}

/** Sahte istek: eş adresi (`req.ip`), başlıklar ve gövde. */
function istek(opts: { ip?: string; headers?: Record<string, string>; body?: unknown }) {
  const h = Object.fromEntries(Object.entries(opts.headers ?? {}).map(([k, v]) => [k.toLowerCase(), v]));
  return {
    ip: opts.ip,
    body: opts.body ?? {},
    get: (n: string) => h[n.toLowerCase()],
    header: (n: string) => h[n.toLowerCase()],
  };
}

async function cagir(h: Rota, req: unknown): Promise<{ kod: number; govde: Record<string, unknown> }> {
  let kod = 200;
  let govde: Record<string, unknown> = {};
  const res = {
    status(c: number) {
      kod = c;
      return res;
    },
    json(v: Record<string, unknown>) {
      govde = v;
      return res;
    },
  };
  await h(req, res);
  return { kod, govde };
}

/** 104.16.0.0/13 — Cloudflare'in yayımladığı aralıklardan biri. */
const CF_ES = '104.16.1.2';
const CF_ES6 = '2606:4700::1234';
/** TEST-NET-2: herkese açık, kimseye ait olmayan bir adres. */
const HALK = '198.51.100.4';
const SAHTE = '203.0.113.9';

void (async () => {
  // ------------------------------------------------------------ istemci adresi
  //
  // `CF-Connecting-IP` başlığını İSTEMCİ de yazabiliyor. Cloudflare arkasındayken
  // Cloudflare onu eziyor; ama panelin kaynak adresine doğrudan ulaşan biri
  // (alan adı Cloudflare'de değilse, ya da Coolify'ın adresi biliniyorsa)
  // her isteğe başka bir değer yazıp IP'ye bağlı BÜTÜN sayaçları — yönetici
  // parolası denemesi dâhil — sıfırlar. Başlığa ancak eş adresi Cloudflare'in
  // yayımladığı aralıklardaysa ya da yerel/özel bir adresse (tünel) güvenilir.
  {
    const bas = { 'cf-connecting-ip': SAHTE };
    assert(
      'herkese açık bir eşten gelen CF-Connecting-IP YOK SAYILIYOR',
      clientIp(istek({ ip: HALK, headers: bas })) === HALK,
      `sahte başlık sayaç anahtarı oldu: ${clientIp(istek({ ip: HALK, headers: bas }))}`,
    );
    assert('Cloudflare kenarından gelen başlık okunuyor', clientIp(istek({ ip: CF_ES, headers: bas })) === SAHTE);
    assert('IPv4-mapped IPv6 eş de Cloudflare sayılıyor', clientIp(istek({ ip: `::ffff:${CF_ES}`, headers: bas })) === SAHTE);
    assert('Cloudflare IPv6 kenarından gelen başlık okunuyor', clientIp(istek({ ip: CF_ES6, headers: bas })) === SAHTE);
    assert('yerel eş (Cloudflare Tunnel) güveniliyor', clientIp(istek({ ip: '172.18.0.5', headers: bas })) === SAHTE);
    assert('loopback eş güveniliyor', clientIp(istek({ ip: '127.0.0.1', headers: bas })) === SAHTE);
    assert('eş adresi yokken başlığa güvenilmiyor', clientIp(istek({ headers: bas })) === 'bilinmiyor');
    assert(
      'IP olmayan başlık değeri anahtar olmuyor',
      clientIp(istek({ ip: CF_ES, headers: { 'cf-connecting-ip': '<script>' } })) === CF_ES,
    );
    assert('başlık yokken eş adresi kullanılıyor', clientIp(istek({ ip: HALK })) === HALK);
  }

  // ------------------------------------------------- sayaç aşımı, uçtan uca
  //
  // Yukarıdaki birim iddiası yetmez: sayacın gerçekten o anahtarla dolduğunu
  // saldırganın döngüsü gösteriyor. Aynı eşten, her istekte başka bir sahte
  // başlıkla, sınırın üstünde istek atılıyor.
  {
    const { app, rotalar } = sahteApp();
    const azure = (async () =>
      ({
        ok: true,
        status: 200,
        statusText: 'OK',
        async json() {
          return [{ translations: [{ text: 'çeviri', to: 'tr' }] }];
        },
      }) as unknown as Response) as unknown as typeof fetch;
    registerTranslateApi(app, {
      env: { AZURE_TRANSLATOR_KEY: 'sahte' } as unknown as NodeJS.ProcessEnv,
      fetchImpl: azure,
      now: () => 0,
    });
    const h = rotalar.get('/api/gundem/ceviri')!;
    const N = CEVIRI_IP_LIMITI + 10;

    const dongu = async (req: (i: number) => unknown) => {
      let red = 0;
      for (let i = 0; i < N; i++) if ((await cagir(h, req(i))).kod === 429) red += 1;
      return red;
    };

    const sahteyle = await dongu((i) =>
      istek({ ip: HALK, headers: { 'cf-connecting-ip': `203.0.113.${i % 250}` }, body: { metin: 'Hello' } }),
    );
    assert(
      `tek eşten dönen sahte başlık çeviri sınırını aşamıyor (${N} istek, en az 10 red)`,
      sahteyle >= 10,
      `${sahteyle} red — ${N - sahteyle} istek Azure'a gitti`,
    );
    // Karşı kontrol: gerçekten farklı eşler ve Cloudflare arkasındaki gerçek
    // istemciler sınıra takılmıyor — yoksa düzeltme "herkes tek kovada" olurdu.
    const farkliEsler = await dongu((i) => istek({ ip: `192.0.2.${i % 250}`, body: { metin: 'Hello' } }));
    assert('farklı eşler birbirinin sınırını doldurmuyor', farkliEsler === 0, `${farkliEsler} red`);
    const cfArkasi = await dongu((i) =>
      istek({ ip: CF_ES, headers: { 'cf-connecting-ip': `198.18.0.${i % 250}` }, body: { metin: 'Hello' } }),
    );
    assert('Cloudflare arkasındaki farklı istemciler tek kovaya düşmüyor', cfArkasi === 0, `${cfArkasi} red`);
  }

  // Aynı döngü kimliksiz parola sıfırlama ucunda. SMTP bu süreçte
  // yapılandırılmamış, yani izin verilen istek 503 dönüyor; sayılan şey 429.
  // Firestore'a hiç ulaşılmıyor — kilit ve posta kontrolü ondan önce.
  {
    const { app, rotalar } = sahteApp();
    const db = {
      collection: () => {
        throw new Error('Firestore’a ulaşılmamalıydı');
      },
      doc: () => {
        throw new Error('Firestore’a ulaşılmamalıydı');
      },
    };
    registerAccountApi(app, db as never, () => ({}) as AuthLike);
    const h = rotalar.get('/api/hesap/sifre-kod')!;
    let red = 0;
    for (let i = 0; i < 30; i++) {
      const r = await cagir(
        h,
        istek({ ip: HALK, headers: { 'cf-connecting-ip': `203.0.113.${i}` }, body: { email: 'kurban@example.com' } }),
      );
      if (r.kod === 429) red += 1;
    }
    assert('sahte başlıkla parola sıfırlama sayacı aşılamıyor (30 istek, en az 10 red)', red >= 10, `${red} red`);
  }

  // ------------------------------------------------------- çıkış ve bellek
  //
  // `/logout` kimliksiz ve gövdesiz: gelen çerez değeri ne olursa olsun iptal
  // listesine yazılıyordu. On altı KB'lık çerezlerle milyon istek, tek bir
  // Map'te gigabaytlar — ve her yazma listeyi baştan sona tarıyor. Yalnızca
  // imzası doğrulanan jeton saklanmalı: imzasız bir değerin iptali gereksiz,
  // saklanması tehlikeli.
  {
    const gizli = randomBytes(32);
    const gecerli = issueToken(gizli, 1_000);
    assert('imzasız çöp jeton iptal listesine girmiyor', revokeToken(gizli, 'cop.cop', 2_000) === false);
    assert('boş çerez iptal listesine girmiyor', revokeToken(gizli, '', 2_000) === false);
    let saklanan = 0;
    for (let i = 0; i < 10_000; i++) {
      if (revokeToken(gizli, `${1_000 + i}.${'f'.repeat(64)}`, 2_000)) saklanan += 1;
    }
    assert('on bin sahte çerez hiçbirini saklamıyor', saklanan === 0, `${saklanan} saklandı`);
    assert('geçerli jeton hâlâ geçerli (çöp onu etkilemedi)', verifyToken(gizli, gecerli, 3_000));
    assert(
      'geçerli jeton iptal ediliyor',
      revokeToken(gizli, gecerli, 3_000) === true && !verifyToken(gizli, gecerli, 4_000),
    );
    assert('iptal edilmiş jetonu yeniden iptal etmek bir şey saklamıyor', revokeToken(gizli, gecerli, 5_000) === false);
    assert('süresi dolmuş jeton iptal listesine girmiyor', revokeToken(gizli, issueToken(gizli, 0), 10 ** 12) === false);
  }

  // ---------------------------------------------------------------- CSRF
  {
    const H = 'mobil.kouseng.com';
    // `Referrer-Policy: no-referrer` altında tarayıcı Origin'i "null" yazıyor.
    assert('Origin: null reddediliyor', !sameOrigin('null', undefined, H));
    assert('alan adı önekiyle aldatma reddediliyor', !sameOrigin(`https://${H}.evil.example`, undefined, H));
    assert('kullanıcı bilgisiyle aldatma reddediliyor', !sameOrigin(`https://${H}@evil.example`, undefined, H));
    assert('Referer yalnızca yol taşıyorsa reddediliyor', !sameOrigin(undefined, '/events/x', H));
  }

  // -------------------------------------------- kullanıcı verisiyle gelen HTML
  //
  // Bu alanların HEPSİNİ kullanıcı yazıyor (profil adı, öğrenci numarası,
  // kayıt adı) ya da adres çubuğundan geliyor (`?sonuc=`, belge numarası).
  // `check:panel` etkinlik başlığını sınıyor; burada kullanıcının kendi
  // yazabildiği her alan tek tek aynı yükle deneniyor.
  {
    const kotu = '"><img src=x onerror=alert(1)><script>alert(2)</script>';
    const zararsiz = (html: string) => !/<img src=x|<script>alert/.test(html);
    const satir = {
      uid: kotu,
      adSoyad: kotu,
      ogrenciNo: kotu,
      email: kotu,
      kaynak: 'qr' as const,
      checkedInAt: kotu,
      sertifikaNo: kotu,
      postaHatasi: kotu,
    };
    const qr = qrPage({
      eventId: kotu,
      baslik: kotu,
      tanim: { eventId: kotu, token: kotu, opensAt: kotu, closesAt: kotu },
      payload: kotu,
      svg: '',
      yoklama: [satir],
      gelmeyenler: [{ adSoyad: kotu, studentNo: kotu, hesapVar: false }],
      notice: kotu,
    });
    assert('QR sayfası kullanıcı verisini kaçırıyor', zararsiz(qr));
    assert(
      'sertifika sayfası kullanıcı verisini kaçırıyor',
      zararsiz(
        sertifikaPage({ eventId: kotu, baslik: kotu, tarih: kotu, yoklama: [satir], pdfHazir: false, pdfHata: kotu, notice: kotu }),
      ),
    );
    assert(
      'bildirim sayfası kullanıcı verisini kaçırıyor',
      zararsiz(
        notificationsPage({
          autoPush: true,
          mail: { ready: false, from: kotu, eksik: [kotu] },
          pdf: { hazir: false, sure: 0, hata: kotu },
          ceviri: { durum: 'hata', zaman: kotu, sebep: kotu, basarili: 0, basarisiz: 1 },
          devices: { total: 1, byPlatform: { [kotu]: 1 }, masterOn: 1, byCategory: {} },
          log: [{ id: kotu, title: kotu, category: kotu }],
          pending: [{ title: kotu, notBefore: kotu, tokens: 1 }],
          categories: [kotu],
          notice: kotu,
        }),
      ),
    );
    assert('hesap silme sayfası hata metnini kaçırıyor', zararsiz(deleteAccountPage({ error: kotu })));
    assert('giriş sayfası hata metnini kaçırıyor', zararsiz(loginPage(kotu)));
    assert('belge-yok sayfası adresteki numarayı kaçırıyor', zararsiz(sertifikaYokPage(kotu)));
    const posta = sertifikaMaili({ adSoyad: kotu, etkinlik: kotu, tarih: kotu, belgeNo: kotu, dogrulamaUrl: kotu });
    assert('sertifika postası ad ve etkinliği kaçırıyor', zararsiz(posta.html));
  }
})().then(() => {
  console.log(failed ? `\n${failed} kontrol başarısız.` : '\nTüm kontroller geçti.');
  process.exit(failed ? 1 : 0);
});
