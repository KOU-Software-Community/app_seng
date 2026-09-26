/**
 * Vitrin sayfaları — slider ve sponsor listeleri, formları.
 *
 * Kural `views.ts` ile aynı: kullanıcıdan gelen hiçbir metin `esc` olmadan
 * HTML'e girmez. Liste sayfasında panelin tek betiği var — sürükle-bırak. Onsuz
 * da her şey çalışıyor: ↑/↓ düğmeleri betiksiz küçük formlar (iPhone'da
 * tarayıcının sürükle-bırakı güvenilir değil).
 */
import { MONTHS_LONG } from '../src/eventSchema';
import { KICKERS } from '../src/vitrinSchema';
import { esc, page } from './views';

export type VitrinKind = 'slider' | 'sponsorlar';
export type VitrinRow = { id: string; title: string; sub: string; image: string; active: boolean };
export type ChoiceRow = { id: string; label: string; raffle?: boolean };

const COPY: Record<VitrinKind, { title: string; add: string; hint: string; empty: string; logo: boolean }> = {
  slider: {
    title: 'Slider',
    add: 'Yeni slayt',
    hint:
      'Uygulamada ana sayfanın en üstünde bu sırayla döner. Sürükleyip bırakarak ya da ' +
      '↑ ↓ ile sıralayın. Bitiş tarihi olan slayt o gün bitince silinir; olmayan kalıcıdır.',
    empty: 'Henüz slayt yok. Uygulamada slider, slayt eklenene kadar görünmez.',
    logo: false,
  },
  sponsorlar: {
    title: 'Sponsorlar',
    add: 'Yeni sponsor',
    hint:
      'Uygulamada ana sayfada ve Sponsorlarımız ekranında bu sırayla görünür. ' +
      'Büyük sponsorları üste alın.',
    empty: 'Henüz sponsor yok. Uygulamada Sponsorlarımız bölümü, sponsor eklenene kadar görünmez.',
    logo: true,
  },
};

/** `2026-10-12` → `12 Ekim 2026`. */
export function formatDay(day: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day);
  return m ? `${Number(m[3])} ${MONTHS_LONG[Number(m[2]) - 1]} ${m[1]}` : day;
}

/**
 * Sürükle-bırak. Bırakınca sıra değiştiyse gizli formu gönderiyor; sunucu
 * gönderilen kümeyi mevcut listeyle karşılaştırıp 1…n yazıyor.
 * Şablon dizesinin içinde: ters tırnak ve dolar-süslü parantez kullanılmıyor.
 */
const DRAG_SCRIPT = `
(function () {
  var list = document.querySelector('.vlist');
  var form = document.getElementById('sirala');
  if (!list || !form) return;
  var dragged = null;
  var before = '';
  function order() {
    return Array.prototype.map.call(list.querySelectorAll('.vitem'), function (li) {
      return li.getAttribute('data-id');
    }).join(',');
  }
  list.addEventListener('dragstart', function (e) {
    dragged = e.target.closest('.vitem');
    if (!dragged) return;
    before = order();
    dragged.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', dragged.getAttribute('data-id'));
  });
  list.addEventListener('dragover', function (e) {
    var over = e.target.closest('.vitem');
    if (!dragged || !over || over === dragged) return;
    e.preventDefault();
    var box = over.getBoundingClientRect();
    list.insertBefore(dragged, e.clientY > box.top + box.height / 2 ? over.nextSibling : over);
  });
  list.addEventListener('dragend', function () {
    if (!dragged) return;
    dragged.classList.remove('dragging');
    dragged = null;
    var now = order();
    if (now === before) return;
    form.elements.ids.value = now;
    form.submit();
  });
})();
`;

function moveForm(base: string, id: string, yon: 'yukari' | 'asagi', disabled: boolean): string {
  return `<form method="post" action="${base}/${encodeURIComponent(id)}/tasi">
      <input type="hidden" name="yon" value="${yon}">
      <button class="icon-btn" type="submit" aria-label="${yon === 'yukari' ? 'Yukarı taşı' : 'Aşağı taşı'}"${disabled ? ' disabled' : ''}>${yon === 'yukari' ? '↑' : '↓'}</button>
    </form>`;
}

export function vitrinList(kind: VitrinKind, rows: VitrinRow[]): string {
  const c = COPY[kind];
  const base = `/${kind}`;
  const thumb = c.logo ? 'vthumb logo' : 'vthumb';

  const items = rows
    .map(
      (r, i) => `<li class="vitem" draggable="true" data-id="${esc(r.id)}">
        <span class="handle" aria-hidden="true">⠿</span>
        <span class="vno">${i + 1}</span>
        ${r.image ? `<img class="${thumb}" src="${esc(r.image)}" alt="">` : `<span class="${thumb}"></span>`}
        <div class="vbody">
          <strong>${esc(r.title)}</strong>
          <span class="vmeta">${esc(r.sub)}</span>
        </div>
        <span class="pill ${r.active ? 'on' : 'off'}">${r.active ? 'Yayında' : 'Pasif'}</span>
        <div class="vact">
          ${moveForm(base, r.id, 'yukari', i === 0)}
          ${moveForm(base, r.id, 'asagi', i === rows.length - 1)}
          <a class="btn btn-ghost icon-btn" href="${base}/${encodeURIComponent(r.id)}">Düzenle</a>
        </div>
      </li>`,
    )
    .join('');

  return page(
    c.title,
    `<div class="card">
       <div style="display:flex;align-items:center;margin-bottom:12px">
         <h2 style="margin:0">${c.title}</h2>
         <a class="btn" style="margin-left:auto" href="${base}/yeni">+ ${c.add}</a>
       </div>
       <p class="hint" style="margin-top:0">${c.hint}</p>
       ${
         rows.length
           ? `<ul class="vlist">${items}</ul>
              <form id="sirala" method="post" action="${base}/sirala"><input type="hidden" name="ids" value=""></form>
              <script>${DRAG_SCRIPT}</script>`
           : `<p class="empty">${c.empty}</p>`
       }
     </div>`,
  );
}

function positionOptions(count: number, current: number): string {
  return Array.from({ length: count }, (_, i) => i + 1)
    .map((p) => `<option value="${p}"${p === current ? ' selected' : ''}>${p}</option>`)
    .join('');
}

function choiceOptions(list: ChoiceRow[], current: string): string {
  return [
    '<option value="">Seçin…</option>',
    ...list.map(
      (c) => `<option value="${esc(c.id)}"${c.id === current ? ' selected' : ''}>${esc(c.label)}</option>`,
    ),
  ].join('');
}

/** Onay metni sabit: `onsubmit` içinde enterpolasyon yok, `esc()` orada koruma sağlamıyor. */
function deleteForm(action: string): string {
  return `<form method="post" action="${action}" onsubmit="return confirm('Silinsin mi? Görseli de silinir, geri alınamaz.')" style="margin-top:14px">
      <button class="btn-danger" type="submit">Sil</button>
    </form>`;
}

/** Mevcut görselin önizlemesi ve kaldırma kutusu. Sunucu mevcut görseli dokümandan okuyor. */
function imageBlock(url: unknown, drop: 'dropImage' | 'dropLogo', label: string): string {
  if (!url) return '';
  return `<div class="photos"><div class="photo">
      <img src="${esc(url)}" alt="">
      <label class="photo-drop"><input type="checkbox" name="${drop}" value="1" style="width:auto"> ${label}</label>
    </div></div>`;
}

export function slideForm(
  values: Record<string, unknown>,
  errors: Record<string, string>,
  opts: { editing: boolean; id?: string; positions: number; events: ChoiceRow[]; announcements: ChoiceRow[] | null },
): string {
  const v = (k: string) => esc(values[k] ?? '');
  const e = (k: string) => (errors[k] ? `<div class="err">${esc(errors[k])}</div>` : '');
  const type = String(values.targetType || 'event');
  const title = opts.editing ? 'Slaytı düzenle' : 'Yeni slayt';
  const action = opts.editing ? `/slider/${encodeURIComponent(opts.id ?? '')}` : '/slider/yeni';
  const radio = (value: string, label: string) =>
    `<label><input type="radio" name="targetType" value="${value}"${type === value ? ' checked' : ''} style="width:auto"> ${label}</label>`;

  return page(
    title,
    `<div class="card">
      <h2>${title}</h2>
      ${Object.keys(errors).length ? '<div class="banner">Form kaydedilmedi — aşağıdaki alanları düzeltin.</div>' : ''}
      <form method="post" action="${action}" enctype="multipart/form-data">
        <label>Başlık
          <input type="text" name="title" value="${v('title')}" placeholder="Hackathon kayıtları açıldı" required>
          ${e('title')}
        </label>
        <div class="row">
          <label>Alt satır <span class="hint">(tarih, yer gibi kısa bilgi)</span>
            <input type="text" name="meta" value="${v('meta')}" placeholder="48 saat · 12 Ekim · B Blok">
          </label>
          <label>Rozet
            <select name="kicker">${['', ...KICKERS]
              .map((k) => `<option value="${k}"${k === String(values.kicker ?? '') ? ' selected' : ''}>${k || 'Rozet yok'}</option>`)
              .join('')}</select>
            ${e('kicker')}
          </label>
        </div>

        <label>Görsel <span class="hint">(1600 px'e küçültülüp JPEG'e çevrilir)</span>
          <input type="file" name="image" accept="image/*">
        </label>
        ${e('image')}
        ${imageBlock(values.image, 'dropImage', 'Görseli kaldır')}

        <fieldset>
          <legend>Dokununca açılacak yer</legend>
          <div class="radios">${radio('event', 'Etkinlik')}${radio('announcement', 'Duyuru')}${radio('url', 'Bağlantı')}</div>
          <label>Etkinlik
            <select name="eventId">${choiceOptions(opts.events, String(values.eventId ?? ''))}</select>
          </label>
          ${
            opts.announcements
              ? `<label>Duyuru
                   <select name="announcementId">${choiceOptions(opts.announcements, String(values.announcementId ?? ''))}</select>
                 </label>`
              : `<p class="hint">Duyurular kulüp sitesinden alınamadı; şu an duyuru seçilemiyor.</p>
                 <input type="hidden" name="announcementId" value="${v('announcementId')}">`
          }
          <label>Bağlantı
            <input type="url" name="targetUrl" value="${v('targetUrl')}" placeholder="https://">
          </label>
          ${e('target')}
        </fieldset>

        <div class="row">
          <label>Bitiş tarihi <span class="hint">(boş = kalıcı; doluysa o gün bitince silinir)</span>
            <input type="date" name="endsAt" value="${v('endsAt')}">
            ${e('endsAt')}
          </label>
          <label>Sıra <span class="hint">(seçilen yere yerleşir, diğerleri kayar)</span>
            <select name="position">${positionOptions(opts.positions, Number(values.position))}</select>
            ${e('order')}
          </label>
        </div>

        <label style="display:flex;gap:8px;align-items:center">
          <input type="checkbox" name="active" value="1"${values.active ? ' checked' : ''} style="width:auto"> Yayında
        </label>

        <div class="actions">
          <button type="submit">${opts.editing ? 'Kaydet' : 'Oluştur'}</button>
          <a class="btn btn-ghost" href="/slider">Vazgeç</a>
        </div>
      </form>
      ${opts.editing ? deleteForm(`/slider/${encodeURIComponent(opts.id ?? '')}/sil`) : ''}
    </div>`,
  );
}

export function sponsorForm(
  values: Record<string, unknown>,
  errors: Record<string, string>,
  opts: { editing: boolean; id?: string; positions: number; events: ChoiceRow[] },
): string {
  const v = (k: string) => esc(values[k] ?? '');
  const e = (k: string) => (errors[k] ? `<div class="err">${esc(errors[k])}</div>` : '');
  const title = opts.editing ? 'Sponsoru düzenle' : 'Yeni sponsor';
  const action = opts.editing ? `/sponsorlar/${encodeURIComponent(opts.id ?? '')}` : '/sponsorlar/yeni';
  const selected = new Set(Array.isArray(values.eventIds) ? values.eventIds.map(String) : []);

  return page(
    title,
    `<div class="card">
      <h2>${title}</h2>
      ${Object.keys(errors).length ? '<div class="banner">Form kaydedilmedi — aşağıdaki alanları düzeltin.</div>' : ''}
      <form method="post" action="${action}" enctype="multipart/form-data">
        <div class="row">
          <label>Ad
            <input type="text" name="name" value="${v('name')}" placeholder="Örnek Yazılım A.Ş." required>
            ${e('name')}
          </label>
          <label>Sektör
            <input type="text" name="sector" value="${v('sector')}" placeholder="Yazılım">
          </label>
        </div>
        <label>Tanıtım
          <textarea name="description">${v('description')}</textarea>
        </label>
        <label>Web sitesi
          <input type="url" name="url" value="${v('url')}" placeholder="https://">
          ${e('url')}
        </label>

        <label>Logo <span class="hint">(PNG önerilir — şeffaf zemin korunur, 512 px'e küçültülür)</span>
          <input type="file" name="logo" accept="image/*">
        </label>
        ${e('logo')}
        ${imageBlock(values.logo, 'dropLogo', 'Logoyu kaldır')}

        <fieldset>
          <legend>Desteklediği etkinlikler</legend>
          ${
            opts.events.length
              ? `<div class="checks">${opts.events
                  .map(
                    (c) => `<label><input type="checkbox" name="eventIds" value="${esc(c.id)}"${selected.has(c.id) ? ' checked' : ''} style="width:auto">
                      <span>${esc(c.label)}${c.raffle ? ' <span class="hint">— çekiliş: uygulamada “Ödülü sağlayan” olarak görünür</span>' : ''}</span></label>`,
                  )
                  .join('')}</div>`
              : '<p class="hint">Henüz etkinlik yok.</p>'
          }
        </fieldset>

        <div class="row">
          <label>Sıra <span class="hint">(seçilen yere yerleşir, diğerleri kayar)</span>
            <select name="position">${positionOptions(opts.positions, Number(values.position))}</select>
            ${e('order')}
          </label>
          <label style="display:flex;gap:8px;align-items:center;flex:0 0 auto">
            <input type="checkbox" name="active" value="1"${values.active ? ' checked' : ''} style="width:auto"> Yayında
          </label>
        </div>

        <div class="actions">
          <button type="submit">${opts.editing ? 'Kaydet' : 'Oluştur'}</button>
          <a class="btn btn-ghost" href="/sponsorlar">Vazgeç</a>
        </div>
      </form>
      ${opts.editing ? deleteForm(`/sponsorlar/${encodeURIComponent(opts.id ?? '')}/sil`) : ''}
    </div>`,
  );
}
