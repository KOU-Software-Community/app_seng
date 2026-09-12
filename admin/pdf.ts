/**
 * Sertifika PDF'i — headless Chromium ile, `certificateHtml`'in kendisinden.
 *
 * **Neden bir tarayıcı:** sertifikanın tanımı `admin/certificate.ts`'te tek bir
 * HTML dizesi ve o dize hem herkese açık doğrulama sayfasını hem PDF'i
 * besliyor. pdfkit ya da @react-pdf ile PDF'i ayrıca çizmek, aynı belgeyi iki
 * kez tanımlamak olurdu — bu defterin "aynı kararı iki yerde uygulamak,
 * ikisinin ayrışmasının tek sebebidir" maddesi. Burada ayrışma **yapısal
 * olarak** imkânsız: PDF, sayfanın kendisinin basılmış hâli.
 *
 * **Neden `playwright-core`, `puppeteer` değil.** Nixpacks'in Node sağlayıcısı
 * lockfile'da `puppeteer` **alt dizesini** görünce (yani `puppeteer-core` de
 * tetikliyor) apt listesine `chromium` ekliyor; Ubuntu noble'da gerçek bir
 * chromium deb'i yok, snap saplamasına çözülüyor, konteynerde snapd yok.
 * Derleme yeşil geçiyor ve panel **ilk sertifikada** ölüyor — bu deponun
 * defterindeki "build green, container dies" sınıfının aynısı, ve tetikleyicisi
 * bir paketin adı. `playwright-core` o dizeyi taşımıyor; apt listesi
 * `nixpacks.toml`'da yazdığımız ve tamamı görünen liste oluyor.
 *
 * Bedeli sürüm kilidi: tarayıcı derlemesi `playwright-core` sürümüne bağlı, o
 * yüzden `package.json`'da TAM pinli (`^` ya da `~` değil). `npm update`
 * kütüphaneyi oynatırsa kurulu tarayıcı eşleşmez ve hata çalışma anında çıkar.
 * `check:release` pini doğruluyor.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { certificateHtml, type SertifikaVerisi } from './certificate';

/** Panelin kendi font klasörü. */
export const FONT_DIR = join(__dirname, 'fonts');

/**
 * Fontlar `node_modules/@expo-google-fonts/...` yerine BURADAN okunuyor.
 *
 * O paket mobil tarafın bağımlılığı; oradan okumak, panelin sertifika üretimini
 * mobil ağacın bir paketine gizlice bağlar. Biri o paketi mobilden kaldırdığı
 * gün deploy yeşil geçer ve sertifika üretimi ölür — hata da ancak ay sonunda,
 * ilk sertifika basılırken çıkar. Dört dosya, 400 KB; panel kendi varlığına
 * sahip olsun.
 */
export const FONT_DOSYALARI = [
  'PlusJakartaSans_400Regular.ttf',
  'PlusJakartaSans_600SemiBold.ttf',
  'PlusJakartaSans_800ExtraBold.ttf',
  'PressStart2P_400Regular.ttf',
] as const;

/**
 * `@font-face`'lerin okuyacağı taban.
 *
 * `file://` **yetmiyor**: `setContent` ile yüklenen sayfanın kaynağı
 * `about:blank`, dolayısıyla yerel dosya isteği aynı-kaynak politikasına
 * takılıyor ve font sessizce yüklenmiyor — PDF üretiliyor, metin çıkarımı bile
 * geçiyor, ekranda yanlış font duruyor. Fontlar bu yüzden data-URI olarak
 * gömülüyor: hiçbir ağ ya da dosya isteği kalmıyor.
 */
function fontTabani(): string {
  return 'data:font-base';
}

/** Dört fontu data-URI'ye çevirip HTML'deki yolları değiştirir. */
function fontlariGom(html: string): string {
  let out = html;
  for (const ad of FONT_DOSYALARI) {
    const b64 = readFileSync(join(FONT_DIR, ad)).toString('base64');
    out = out.split(`${fontTabani()}/${ad}`).join(`data:font/ttf;base64,${b64}`);
  }
  return out;
}

type Tarayici = {
  newPage(): Promise<{
    setContent(html: string, opts: { waitUntil: 'load' }): Promise<void>;
    pdf(opts: Record<string, unknown>): Promise<Buffer>;
    close(): Promise<void>;
  }>;
  close(): Promise<void>;
};

/**
 * Tarayıcıyı açar.
 *
 * **Tembel ve iş bitince kapanıyor.** Chromium ayakta 100–200 MB RSS tutuyor;
 * küçük bir Coolify kutusunda onu sürekli canlı tutmak, seyrek bir iş için
 * çalışan bir paneli OOM'a götürür. Açılış maliyeti ~400 ms ve sertifika
 * yayınlama toplu bir iş, yani bu maliyet parti başına bir kez ödeniyor.
 */
async function tarayiciAc(): Promise<Tarayici> {
  const { chromium } = (await import('playwright-core')) as unknown as {
    chromium: { launch(o: Record<string, unknown>): Promise<Tarayici> };
  };
  return chromium.launch({
    // Konteynerde kullanıcı root ve kum havuzu için gereken çekirdek
    // yetenekleri yok; `--no-sandbox` olmadan hiç açılmıyor.
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
    ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
  });
}

export type PdfIsi = Omit<SertifikaVerisi, 'fontBase'>;

/**
 * Bir veya daha çok sertifikayı PDF'e basar.
 *
 * Toplu çağrılıyor çünkü tarayıcı açılışı sabit maliyet: 200 katılımcı için
 * 200 kez açmak dakikalar, bir kez açmak saniyeler.
 */
export async function sertifikaPdf(isler: PdfIsi[]): Promise<Buffer[]> {
  if (!isler.length) return [];
  const browser = await tarayiciAc();
  try {
    const out: Buffer[] = [];
    for (const is of isler) {
      const page = await browser.newPage();
      try {
        await page.setContent(fontlariGom(certificateHtml({ ...is, fontBase: fontTabani() })), {
          waitUntil: 'load',
        });
        out.push(
          await page.pdf({
            // `@page { size: A4 landscape }` zaten HTML'de; ölçü burada da
            // yazılıyor çünkü `page.pdf` varsayılanı US Letter dikey ve
            // sessizce onu uygular.
            width: '297mm',
            height: '210mm',
            printBackground: true,
            margin: { top: '0', right: '0', bottom: '0', left: '0' },
          }),
        );
      } finally {
        await page.close();
      }
    }
    return out;
  } finally {
    await browser.close();
  }
}

/** Açılışta bir kez çalışan duman testi — sonucu panelin `/bildirimler` sayfasında. */
export type PdfDurumu = { hazir: boolean; sure: number; hata?: string; bayt?: number };

let durum: PdfDurumu | null = null;
export function pdfDurumu(): PdfDurumu | null {
  return durum;
}

/**
 * Açılışta bir sertifika basar ve sonucu saklar.
 *
 * **Sorunun tamamı bu fonksiyonun varlık sebebi:** Chromium'lu bir panel boot'ta
 * ölmüyor. `admin/server.ts` tarayıcıya hiç dokunmuyor, süreç açılıyor, sağlık
 * kontrolü geçiyor, Coolify yeşil. Ölüm ilk sertifika isteğinde geliyor —
 * etkinlikten haftalar sonra, bir öğrenci 500 alırken. `Cannot find module
 * 'express'` İYİ bir hatadır: crash-loop, deploy ekranında görünür. Chromium'un
 * hatası o sınıfın geciktirilmiş ve tekil versiyonu, ve operatör paneli çalışır
 * gördüğü için hiç aranmaz.
 *
 * **Paneli ÖLDÜRMÜYOR.** Panel kayıt, bildirim, OTP ve giriş de yapıyor;
 * sertifika üretimi bozuk diye onların hepsini düşürmek daha büyük bir zarar.
 * Yapılan şey teşhisi görünür kılmak — bu defterde "zincirin her halkası
 * sessizce koptuğunda teşhis bir özelliktir" maddesi zaten var.
 */
export async function pdfDumanTesti(): Promise<PdfDurumu> {
  const t0 = Date.now();
  try {
    const [pdf] = await sertifikaPdf([
      {
        adSoyad: 'Ayşe Gülşah Öztürk',
        etkinlik: 'Açılış Toplantısı',
        tarih: '12 Mart 2026',
        belgeNo: 'TEST0000',
        dogrulamaUrl: 'https://mobil.kouseng.com/sertifika/TEST0000',
      },
    ]);
    // Fontsuz bir konteynerde PDF ÜRETİLİYOR ama boş çıkıyor (ölçüldü:
    // ~1.1 KB). Bayt sayısı bu yüzden bir iddia, süs değil.
    if (!pdf || pdf.length < 20_000) {
      durum = {
        hazir: false,
        sure: Date.now() - t0,
        bayt: pdf?.length ?? 0,
        hata: 'PDF üretildi ama boş görünüyor — sistem fontları eksik olabilir.',
      };
    } else {
      durum = { hazir: true, sure: Date.now() - t0, bayt: pdf.length };
    }
  } catch (err) {
    durum = { hazir: false, sure: Date.now() - t0, hata: (err as Error).message };
  }
  console.log(
    durum.hazir
      ? `[sertifika] PDF üretimi hazır (${durum.sure} ms, ${durum.bayt} bayt).`
      : `[sertifika] PDF ÜRETİLEMİYOR: ${durum.hata}`,
  );
  return durum;
}
