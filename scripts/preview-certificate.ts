/**
 * `npm run sertifika:onizle`
 *
 * Sınır adlarını hem HTML hem PNG hem PDF olarak basar.
 *
 * Var olma sebebi bu deponun kendi dersi: **bir tasarımı kaynağını okuyarak
 * değerlendirmek burada iki kez yanlış çıktı** (bildirim ikonu, hesap ikonu).
 * Sertifika aynı sınıf, üstelik daha pahalı: taşan bir belge geri alınamıyor,
 * dışarıda, birinin elinde. `adSinifi`'nin eşikleri de bu çıktıya bakılarak
 * belirlendi — `check:panel` eşiklerin KAYMADIĞINI tutuyor, DOĞRU YERDE
 * olduğunu yalnızca buradan basılan sayfa söylüyor.
 *
 * PNG ve PDF için tarayıcı gerekiyor; yoksa yalnızca HTML yazılıyor ve sebep
 * satıra yazılıyor (sessizce atlamak, "onizle koştu, her şey yolunda" demek
 * olurdu). Konteynerde tarayıcı başka bir yoldaysa `CHROMIUM_PATH` verin.
 *
 * Adlar rastgele değil, ÖLÇÜLECEK sınırlar — `adSinifi` ile birebir:
 *   20 karakter — son tam punto (52pt)
 *   21 karakter — bir kademe inik (38pt)
 *   31 karakter — son bir kademe inik
 *   32 karakter — iki kademe inik (29pt)
 *   44 karakter — en kötü hâl, iki satır
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import QRCode from 'qrcode';

import { certificateHtml } from '../admin/certificate';
import { FONT_DIR, FONT_DOSYALARI } from '../admin/pdf';

const CIKTI = process.env.SERT_OUT ?? join(process.cwd(), 'sertifika-onizleme');

const ADLAR: { dosya: string; ad: string }[] = [
  { dosya: '20-son-tam-punto', ad: 'Ayşegül Nur Şahinoğl' },
  { dosya: '21-bir-kademe', ad: 'Ayşegül Nur Şahinoğlu' },
  { dosya: '31-son-bir-kademe', ad: 'Muhammed Emin Küçükçelebi Oğulu' },
  { dosya: '32-iki-kademe', ad: 'Muhammed Emin Küçükçelebi Oğullu' },
  { dosya: '44-en-kotu', ad: 'Muhammed Şemsettin Abdurrahmanoğlu Karahanlı' },
];

/** Fontları data-URI olarak gömer — `admin/pdf.ts` ile aynı yol. */
function fontlariGom(html: string, taban: string): string {
  let out = html;
  for (const ad of FONT_DOSYALARI) {
    const b64 = readFileSync(join(FONT_DIR, ad)).toString('base64');
    out = out.split(`${taban}/${ad}`).join(`data:font/ttf;base64,${b64}`);
  }
  return out;
}

void (async () => {
  mkdirSync(CIKTI, { recursive: true });

  const sayfalar: { dosya: string; html: string }[] = [];
  for (const [i, v] of ADLAR.entries()) {
    const no = `ONIZLEME${i}`.slice(0, 8);
    const url = `https://mobil.kouseng.com/sertifika/${no}`;
    const html = certificateHtml({
      adSoyad: v.ad,
      etkinlik: 'İleri Seviye TypeScript Atölyesi',
      tarih: '12 Mart 2026',
      belgeNo: no,
      dogrulamaUrl: url,
      qrSvg: await QRCode.toString(url, { type: 'svg', margin: 0, errorCorrectionLevel: 'M' }),
      fontBase: 'data:font-base',
    });
    const gomulu = fontlariGom(html, 'data:font-base');
    writeFileSync(join(CIKTI, `${v.dosya}.html`), gomulu);
    sayfalar.push({ dosya: v.dosya, html: gomulu });
  }
  console.log(`${sayfalar.length} HTML yazıldı → ${CIKTI}`);

  try {
    const { chromium } = await import('playwright-core');
    const browser = await chromium.launch({
      args: ['--no-sandbox', '--disable-dev-shm-usage'],
      ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
    });
    for (const s of sayfalar) {
      // Görüntü alanı sayfanın ta kendisi: 297mm × 210mm, 96 dpi'de 1123×794.
      // Daha geniş bir görüntü alanı sayfayı köşeye sıkışmış gösteriyor ve
      // "tasarım bitmemiş" diye okunuyor — ölçüldü, bir tur kaybettirdi.
      const page = await browser.newPage({
        viewport: { width: 1123, height: 794 },
        deviceScaleFactor: 1.35,
      });
      await page.setContent(s.html, { waitUntil: 'load' });
      writeFileSync(join(CIKTI, `${s.dosya}.png`), await page.screenshot());
      writeFileSync(
        join(CIKTI, `${s.dosya}.pdf`),
        await page.pdf({
          width: '297mm',
          height: '210mm',
          printBackground: true,
          margin: { top: '0', right: '0', bottom: '0', left: '0' },
        }),
      );
      await page.close();
    }
    await browser.close();
    console.log(`${sayfalar.length} PNG + PDF yazıldı.`);
  } catch (err) {
    console.warn(
      `PNG/PDF üretilemedi (tarayıcı yok ya da açılamadı): ${(err as Error).message}\n` +
        'HTML dosyaları yazıldı; tarayıcıda açıp Cmd/Ctrl+P ile bakabilirsiniz.',
    );
  }
})();
