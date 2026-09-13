/**
 * "Sertifikan hazır" postası.
 *
 * Aynı kısıtlar `mailTemplate.ts`'teki gibi: tablo düzeni, satır içi stil,
 * düz metin karşılığı, görsel yok. **Bir fark var ve bilinçli:** bu postada
 * bağlantı VAR. Kod postasında bağlantı olmamasının sebebi kullanıcıya "bu tür
 * postalardaki bağlantılara basma" diyebilmekti; burada belgenin kendisi zaten
 * ekte ve doğrulama adresi belgenin üstünde basılı — bağlantıyı saklamak
 * kullanıcıyı adresi elle yazmaya zorlamaktan başka bir şey yapmazdı.
 */
const RENK = {
  zemin: '#F4F9FB',
  kart: '#FFFFFF',
  kenar: '#E4EEF3',
  lacivert: '#001B4A',
  mavi: '#0389BC',
  acikMavi: '#D2E7EC',
  metin: '#0B1F3A',
  soluk: '#5B7185',
} as const;

const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export type SertifikaPostasi = {
  adSoyad: string;
  etkinlik: string;
  tarih: string;
  belgeNo: string;
  dogrulamaUrl: string;
};

/** Postaya girmeden önce HTML kaçışı. Ad ve etkinlik adı dışarıdan geliyor. */
function esc(v: string): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function sertifikaMaili(v: SertifikaPostasi): {
  subject: string;
  html: string;
  text: string;
} {
  const subject = `${v.etkinlik} katılım belgen hazır`;

  const text = [
    'KOÜ YAZILIM KULÜBÜ',
    '',
    `Merhaba ${v.adSoyad},`,
    '',
    `${v.etkinlik} etkinliğine ${v.tarih} tarihinde katıldığın için`,
    'katılım belgen hazırlandı. Belge bu postanın ekinde PDF olarak duruyor.',
    '',
    `Belge no: ${v.belgeNo}`,
    `Doğrulama adresi: ${v.dogrulamaUrl}`,
    '',
    'Belgeyi kaybedersen doğrulama adresinden her zaman ulaşabilirsin;',
    'uygulamadaki Hesabım → Sertifikalarım ekranında da duruyor.',
    '',
    'Bu posta otomatik gönderildi, yanıtlanmıyor.',
  ].join('\n');

  const html = `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(subject)}</title>
</head>
<body style="margin:0; padding:0; background:${RENK.zemin}; font-family:${FONT};">

<div style="display:none; max-height:0; overflow:hidden; opacity:0;">Katılım belgen ekte — belge no ${esc(v.belgeNo)}.</div>

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${RENK.zemin};">
<tr><td align="center" style="padding:32px 16px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;">

    <tr><td style="padding:0 0 20px 0; text-align:center;">
      <span style="font-family:${FONT}; font-size:12px; font-weight:700; letter-spacing:2.5px; color:${RENK.soluk}; text-transform:uppercase;">KOÜ Yazılım Kulübü</span>
    </td></tr>

    <tr><td style="background:${RENK.kart}; border:1px solid ${RENK.kenar}; border-radius:16px; overflow:hidden;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

        <tr><td style="background:${RENK.lacivert}; padding:26px 32px;">
          <div style="font-family:${FONT}; font-size:19px; font-weight:700; color:#ffffff; line-height:1.35;">Katılım belgen hazır</div>
          <div style="font-family:${FONT}; font-size:13px; color:${RENK.acikMavi}; line-height:1.5; padding-top:6px;">${esc(v.etkinlik)}</div>
        </td></tr>

        <tr><td style="padding:28px 32px 0 32px;">
          <div style="font-family:${FONT}; font-size:14px; line-height:1.7; color:${RENK.metin};">
            Merhaba <strong>${esc(v.adSoyad)}</strong>,<br>
            <span style="color:${RENK.soluk};">${esc(v.etkinlik)} etkinliğine ${esc(v.tarih)} tarihinde katıldığın için katılım belgen hazırlandı. Belge bu postanın <strong style="color:${RENK.metin};">ekinde PDF olarak</strong> duruyor.</span>
          </div>
        </td></tr>

        <tr><td style="padding:20px 32px 0 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr><td style="background:${RENK.acikMavi}; border-radius:12px; padding:16px 18px;">
              <div style="font-family:${FONT}; font-size:11px; font-weight:700; letter-spacing:1.6px; color:${RENK.soluk}; text-transform:uppercase;">Belge no</div>
              <div style="font-family:${FONT}; font-size:20px; font-weight:700; letter-spacing:2px; color:${RENK.lacivert}; padding-top:4px;">${esc(v.belgeNo)}</div>
            </td></tr>
          </table>
        </td></tr>

        <tr><td style="padding:18px 32px 28px 32px;">
          <div style="font-family:${FONT}; font-size:13px; line-height:1.7; color:${RENK.soluk};">
            Belgeyi her zaman <a href="${esc(v.dogrulamaUrl)}" style="color:${RENK.mavi}; text-decoration:none; font-weight:600;">doğrulama adresinden</a> açabilirsin; uygulamadaki <strong style="color:${RENK.metin};">Hesabım → Sertifikalarım</strong> ekranında da duruyor.
          </div>
        </td></tr>

      </table>
    </td></tr>

    <tr><td style="padding:18px 8px 0 8px; text-align:center;">
      <div style="font-family:${FONT}; font-size:11.5px; line-height:1.6; color:${RENK.soluk};">Bu posta otomatik gönderildi, yanıtlanmıyor.<br>Kocaeli Üniversitesi Yazılım Kulübü</div>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>`;

  return { subject, html, text };
}
