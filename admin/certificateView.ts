/**
 * Sertifika ekranları — paneldeki yayınlama sayfası ve herkese açık doğrulama.
 *
 * Doğrulama sayfası `requireAuth`'tan **önce** kayıt edilmek zorunda: belgeyi
 * açan kişi öğrenci ya da bir işveren, yönetici parolası yok. Sonra kayıt
 * edilseydi sayfa açılıyor görünür ve giriş ekranına yönlendirirdi — belgenin
 * üstünde basılı adres çalışmazdı ve bunu kimse fark etmezdi.
 * `check:release` sırayı doğruluyor.
 */
import type { YoklamaSatiri } from './qr';
import { esc, page } from './views';

/** Teslim durumunun tek cümlelik hâli. Operatörün bakacağı sütun bu. */
function durum(y: YoklamaSatiri): string {
  if (!y.sertifikaNo) return '<span class="hint">yayınlanmadı</span>';
  if (y.postaHatasi) return `<b style="color:#B3261E">gönderilemedi</b><br><span class="hint">${esc(y.postaHatasi)}</span>`;
  if (y.postaGitti) return '<span style="color:#1B7F4B">gönderildi</span>';
  return '<span class="hint">yayınlandı, gönderilmedi</span>';
}

export function sertifikaPage(input: {
  eventId: string;
  baslik: string;
  tarih: string;
  yoklama: YoklamaSatiri[];
  pdfHazir: boolean;
  pdfHata?: string;
  notice?: string;
}): string {
  const { yoklama } = input;
  const yayinlanmis = yoklama.filter((y) => y.sertifikaNo);
  const bekleyen = yoklama.filter((y) => !y.sertifikaNo);

  const bekleyenSatirlar = bekleyen.length
    ? bekleyen
        .map(
          (y) => `<tr>
            <td><input type="checkbox" name="sec" value="${esc(y.uid)}" checked></td>
            <td>
              <input type="text" name="ad__${esc(y.uid)}" value="${esc(y.adSoyad)}"
                maxlength="80" style="min-width:240px">
            </td>
            <td><code>${esc(y.ogrenciNo || '—')}</code></td>
            <td>${y.email ? esc(y.email) : '<b style="color:#B3261E">e-posta yok</b>'}</td>
          </tr>`,
        )
        .join('')
    : '<tr><td colspan="4"><span class="hint">Yayınlanacak kimse kalmadı.</span></td></tr>';

  const yayinSatirlar = yayinlanmis.length
    ? yayinlanmis
        .map(
          (y) => `<tr>
            <td>${esc(y.adSoyad)}</td>
            <td><code>${esc(y.sertifikaNo ?? '')}</code></td>
            <td>${durum(y)}</td>
            <td style="white-space:nowrap">
              <a class="btn-ghost" style="padding:4px 10px;font-size:12px"
                 href="/sertifika/${esc(y.sertifikaNo ?? '')}" target="_blank" rel="noopener">Aç</a>
              <form method="post" action="/events/${esc(input.eventId)}/sertifika/gonder" style="display:inline;margin:0">
                <input type="hidden" name="uid" value="${esc(y.uid)}">
                <button class="btn-ghost" style="padding:4px 10px;font-size:12px">Tekrar gönder</button>
              </form>
              <form method="post" action="/events/${esc(input.eventId)}/sertifika/iptal" style="display:inline;margin:0">
                <input type="hidden" name="uid" value="${esc(y.uid)}">
                <button class="btn-ghost" style="padding:4px 10px;font-size:12px">İptal</button>
              </form>
            </td>
          </tr>`,
        )
        .join('')
    : '<tr><td colspan="4"><span class="hint">Henüz sertifika yayınlanmadı.</span></td></tr>';

  // PDF üretimi bozuksa bunu sayfanın EN ÜSTÜNDE söylemek gerekiyor: aksi
  // hâlde operatör "yayınla ve gönder"e basıyor, belgeler yayınlanıyor ama
  // hiçbir posta gitmiyor ve sebebi yalnızca sunucu logunda kalıyor.
  const pdfSerit = input.pdfHazir
    ? ''
    : `<div class="card" style="border-color:#B3261E">
         <h2 style="margin-top:0;color:#B3261E">PDF üretimi çalışmıyor</h2>
         <p>Sertifikalar yayınlanabilir ama <b>postayla gönderilemez</b>. Panelin
            açılışında yapılan deneme başarısız oldu:</p>
         <p><code>${esc(input.pdfHata ?? 'sebep bilinmiyor')}</code></p>
         <p class="hint">
           Çoğu zaman sebebi eksik sistem paketleridir; <code>nixpacks.toml</code>
           içindeki <code>aptPkgs</code> listesi ve tarayıcı kurulumu kontrol
           edilmeli. Deploy sonrası panel açılış satırı da aynı sonucu yazıyor.
         </p>
       </div>`;

  return page(
    `Sertifikalar · ${input.baslik}`,
    `
    ${input.notice ? `<div class="card"><b>${esc(input.notice)}</b></div>` : ''}
    ${pdfSerit}

    <div class="card">
      <h1 style="margin-top:0">${esc(input.baslik)}</h1>
      <p class="hint">
        ${esc(input.tarih || 'Tarih okunamadı')} · yoklamada ${yoklama.length} kişi
        · ${yayinlanmis.length} sertifika yayınlanmış
      </p>
      <p>
        <a class="btn-ghost" href="/events/${esc(input.eventId)}/qr">QR ve yoklama sayfası</a>
      </p>
    </div>

    <div class="card">
      <h2>Yayınlanacaklar</h2>
      <p class="hint">
        Ad belgeye <b>olduğu gibi</b> basılıyor ve yayın anında donuyor: kişi
        sonradan profilini değiştirse bile belge değişmiyor. Yanlış yazılmış bir
        adı burada düzeltin — yayınlandıktan sonra düzeltmenin tek yolu iptal
        edip yeniden yayınlamak, ve o yeni bir belge numarası demek.
      </p>
      <form method="post" action="/events/${esc(input.eventId)}/sertifika">
        <table>
          <thead><tr><th></th><th>Belgeye basılacak ad</th><th>Öğrenci no</th><th>E-posta</th></tr></thead>
          <tbody>${bekleyenSatirlar}</tbody>
        </table>
        <div class="actions">
          <button type="submit" ${bekleyen.length ? '' : 'disabled'}>Yayınla ve postayla gönder</button>
        </div>
      </form>
    </div>

    <div class="card">
      <h2>Yayınlanmış belgeler · ${yayinlanmis.length}</h2>
      <table>
        <thead><tr><th>Ad Soyad</th><th>Belge no</th><th>Teslim</th><th></th></tr></thead>
        <tbody>${yayinSatirlar}</tbody>
      </table>
    </div>
    `,
  );
}

/** Belge bulunamadı. Sayfa "geçersiz" DEMİYOR — bkz. `revokeCertificate`. */
export function sertifikaYokPage(no: string): string {
  return page(
    'Belge bulunamadı',
    `
    <div class="card" style="max-width:560px;margin:40px auto;text-align:center">
      <h1 style="margin-top:0">Böyle bir belge yok</h1>
      <p>
        <code>${esc(no)}</code> numarasıyla kayıtlı bir katılım belgesi
        bulunamadı. Numarayı belgenin sağ üst köşesinden birebir kopyaladığından
        emin ol.
      </p>
      <p class="hint">
        Belgesi olduğunu düşündüğün biri için doğrulama yapıyorsan
        info@kouseng.com adresinden bize yazabilirsin.
      </p>
    </div>
    `,
    { nav: false },
  );
}
