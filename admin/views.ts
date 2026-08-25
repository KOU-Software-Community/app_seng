/**
 * HTML üretimi. Şablon motoru yok — sayfa sayısı bir avuç ve tek bağımlılık
 * eklemek, her çıktının nereden geldiğini görmekten daha değerli değil.
 *
 * Buradaki tek kritik kural: **kullanıcıdan gelen hiçbir metin `esc` olmadan
 * HTML'e girmez.** Etkinlik başlıkları ve öğrenci adları serbest metin; kaçış
 * atlanırsa panel kendi kendine XSS taşır.
 */

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/** Her enterpolasyon buradan geçer. */
export function esc(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ESCAPES[c]);
}

const STYLE = `
:root {
  --navy: #001B4A; --navy700: #014576; --blue: #0389BC; --blue200: #93CBDC;
  --blue100: #D2E7EC; --bg: #F4F7F9; --surface: #fff; --text: #12263F;
  --muted: #5A6B82; --danger: #B3261E; --border: #DCE5EC;
}
* { box-sizing: border-box; }
body {
  margin: 0; background: var(--bg); color: var(--text);
  font: 15px/1.55 -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
header {
  background: linear-gradient(120deg, var(--navy), var(--navy700));
  color: #fff; padding: 18px 24px; display: flex; align-items: center; gap: 18px;
}
header h1 { font-size: 17px; margin: 0; font-weight: 800; }
header nav { display: flex; gap: 16px; margin-left: auto; align-items: center; }
header a { color: var(--blue200); text-decoration: none; font-weight: 600; font-size: 14px; }
header a:hover { color: #fff; }
main { max-width: 920px; margin: 28px auto; padding: 0 20px; }
.card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 12px; padding: 20px; margin-bottom: 16px;
}
h2 { font-size: 19px; margin: 0 0 16px; }
label { display: block; margin-bottom: 14px; font-weight: 600; font-size: 13.5px; }
input[type=text], input[type=password], textarea, select {
  width: 100%; margin-top: 6px; padding: 10px 12px; font: inherit;
  border: 1.5px solid var(--border); border-radius: 8px; background: #fff;
}
textarea { min-height: 96px; resize: vertical; }
input:focus, textarea:focus, select:focus { outline: none; border-color: var(--blue); }
.hint { font-weight: 400; color: var(--muted); font-size: 12.5px; }
.err { color: var(--danger); font-size: 12.5px; font-weight: 600; margin-top: 5px; }
.banner {
  background: #FDECEA; border: 1px solid #F5C6C2; color: var(--danger);
  padding: 12px 14px; border-radius: 8px; margin-bottom: 16px; font-size: 14px;
}
.ok { background: #E8F5EC; border-color: #BFE3CB; color: #1E6B36; }
button, .btn {
  font: inherit; font-weight: 700; cursor: pointer; border-radius: 8px;
  padding: 10px 16px; border: none; background: var(--blue); color: #fff;
  text-decoration: none; display: inline-block;
}
button:hover, .btn:hover { filter: brightness(1.07); }
.btn-ghost { background: transparent; color: var(--blue); border: 1.5px solid var(--blue); }
.btn-danger { background: transparent; color: var(--danger); border: 1.5px solid var(--danger); }
table { width: 100%; border-collapse: collapse; font-size: 14px; }
th, td { text-align: left; padding: 10px 8px; border-bottom: 1px solid var(--border); }
th { font-size: 12px; text-transform: uppercase; letter-spacing: .04em; color: var(--muted); }
tr:last-child td { border-bottom: none; }
.row { display: flex; gap: 14px; flex-wrap: wrap; align-items: flex-end; }
.row > * { flex: 1; min-width: 190px; }
.actions { display: flex; gap: 10px; margin-top: 8px; }
.empty { color: var(--muted); padding: 20px 0; }
`;

export function page(title: string, body: string, opts: { nav?: boolean } = {}): string {
  const nav = opts.nav === false
    ? ''
    : `<nav>
         <a href="/">Etkinlikler</a>
         <a href="/registrations">Kayıtlar</a>
         <form method="post" action="/logout" style="margin:0">
           <button class="btn-ghost" style="padding:6px 12px;font-size:13px">Çıkış</button>
         </form>
       </nav>`;

  return `<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(title)} · KOÜ Yazılım Kulübü</title>
<style>${STYLE}</style>
</head>
<body>
<header><h1>KOÜ Yazılım Kulübü — Yönetim</h1>${nav}</header>
<main>${body}</main>
</body>
</html>`;
}

export function loginPage(error?: string): string {
  return page(
    'Giriş',
    `<div class="card" style="max-width:400px;margin:60px auto">
       <h2>Giriş</h2>
       ${error ? `<div class="banner">${esc(error)}</div>` : ''}
       <form method="post" action="/login">
         <label>Parola
           <input type="password" name="password" autofocus required autocomplete="current-password">
         </label>
         <button type="submit">Gir</button>
       </form>
     </div>`,
    { nav: false },
  );
}

export type FieldError = Record<string, string>;

/** Etkinlik formu. `values` düzenlemede dolu, yeni kayıtta boş gelir. */
export function eventForm(
  values: Record<string, unknown>,
  errors: FieldError,
  opts: { editing: boolean },
): string {
  const v = (k: string) => esc(values[k] ?? '');
  const e = (k: string) => (errors[k] ? `<div class="err">${esc(errors[k])}</div>` : '');

  return page(
    opts.editing ? 'Etkinliği düzenle' : 'Yeni etkinlik',
    `<div class="card">
      <h2>${opts.editing ? 'Etkinliği düzenle' : 'Yeni etkinlik'}</h2>
      ${Object.keys(errors).length ? '<div class="banner">Form kaydedilmedi — aşağıdaki alanları düzeltin.</div>' : ''}

      <form method="post">
        <div class="row">
          <label>Kimlik <span class="hint">(URL'de görünür, sonradan değiştirilemez)</span>
            <input type="text" name="id" value="${v('id')}" ${opts.editing ? 'readonly' : ''} placeholder="git-atolyesi" required>
            ${e('id')}
          </label>
          <label>Kategori
            <input type="text" name="tag" value="${v('tag')}" placeholder="Atölye" required>
            ${e('tag')}
          </label>
        </div>

        <label>Başlık
          <input type="text" name="title" value="${v('title')}" placeholder="Git &amp; GitHub Atölyesi" required>
          ${e('title')}
        </label>

        <div class="row">
          <label>Başlangıç <span class="hint">(saat dilimiyle birlikte)</span>
            <input type="text" name="startsAt" value="${v('startsAt')}" placeholder="2026-03-12T18:00:00+03:00" required>
            ${e('startsAt')}
          </label>
          <label>Bitiş saati
            <input type="text" name="endsAt" value="${v('endsAt')}" placeholder="20:30" required>
            ${e('endsAt')}
          </label>
        </div>

        <div class="row">
          <label>Yer <span class="hint">(künyede tam hâli)</span>
            <input type="text" name="venue" value="${v('venue')}" placeholder="Müh. Fak. B Blok 204" required>
            ${e('venue')}
          </label>
          <label>Yer — kısa <span class="hint">(liste satırlarında; boşsa tam hâli)</span>
            <input type="text" name="venueShort" value="${v('venueShort')}" placeholder="B Blok 204">
          </label>
        </div>

        <label>Açıklama
          <textarea name="desc" required>${v('desc')}</textarea>
          ${e('desc')}
        </label>

        <div class="row">
          <label>Konuşmacı
            <input type="text" name="speaker" value="${v('speaker')}">
          </label>
          <label>Konuşmacı rolü
            <input type="text" name="speakerRole" value="${v('speakerRole')}" placeholder="3. sınıf · Kulüp teknik ekip">
          </label>
        </div>

        <div class="row">
          <label>Kontenjan metni
            <input type="text" name="spots" value="${v('spots')}" placeholder="12 / 60 yer kaldı">
          </label>
          <label>Etiketler <span class="hint">(virgülle)</span>
            <input type="text" name="tags" value="${v('tags')}" placeholder="Başlangıç seviye, Laptop getir">
          </label>
        </div>

        <div class="row">
          <label>Rozet metni <span class="hint">(boşsa rozet çıkmaz)</span>
            <input type="text" name="badge" value="${v('badge')}" placeholder="SON GUN">
          </label>
          <label style="flex:0 0 auto">
            <input type="checkbox" name="soon" value="1" ${values.soon ? 'checked' : ''}
                   style="width:auto;margin-right:8px">
            Son gün rozetini göster
          </label>
        </div>

        <div class="actions">
          <button type="submit">${opts.editing ? 'Kaydet' : 'Oluştur'}</button>
          <a class="btn btn-ghost" href="/">Vazgeç</a>
        </div>
      </form>
    </div>

    <div class="card">
      <h2 style="font-size:15px">Türetilen alanlar</h2>
      <p class="hint" style="margin:0">
        Tarih tilesi, hafta günü, ay başlığı, saat–yer satırı ve künye satırları
        yukarıdaki tarihten ve yerden otomatik üretilir. Elle girilmez, dolayısıyla
        birbirinden sapamaz.
      </p>
    </div>`,
  );
}
