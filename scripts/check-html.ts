/**
 * `npm run check:html`
 *
 * src/html.ts, kulüp sitesinin duyuru gövdelerini React Native'in çizebileceği
 * bloklara çeviriyor. Yanlış çevirirse hiçbir yerde hata çıkmaz — duyuru
 * ekranında ya `<b>` etiketleri görünür ya da metin sessizce kaybolur.
 *
 * Referans olarak `api.kouseng.com/announcements` yanıtındaki **gerçek iki
 * duyurunun** `content` alanı kullanılıyor.
 */
import { decodeEntities, htmlToPlainText, parseHtml, type Block } from '../src/html';

/** api.kouseng.com yanıtından, olduğu gibi. */
const DUYURU_1 =
  "23-24-25 Eylül’de düzenlenecek <b>Kocaeli Üniversitesi Kulüp Tanıtım Günleri</b>'nde biz de oradayız! 🎉<br><br><b>Yazılım Kulübü </b>standımıza uğramayı unutma. Seni de aramızda görmekten mutluluk duyarız. Kulübümüz hakkında bilgi alabilir, etkinliklerimize katılabilirsin.<br>";

const DUYURU_2 =
  'Kulübümüzün resmi <b>web sitesi</b> artık yayında!<br>\nYeni web sitemiz üzerinden aşağıdaki imkanlara erişebilirsiniz: <br><ul><li>Etkinlik duyurularımızı takip edebilirsiniz.</li><li>Teknik ekiplerimiz hakkında detaylı bilgi alabilirsiniz.</li><li>Kulübümüze ve teknik ekiplere üye başvurusu yapabilirsiniz.</li><li>Bize mesaj gönderebilirsiniz.</li></ul>';

let failed = 0;
function assert(name: string, condition: boolean, detail = '') {
  console.log(`${condition ? '✓' : '✗'} ${name}${condition ? '' : `\n    ${detail}`}`);
  if (!condition) failed += 1;
}

const text = (b: Block) => b.runs.map((r) => r.text).join('');
const boldText = (b: Block) => b.runs.filter((r) => r.bold).map((r) => r.text).join('');

// --- Gerçek duyuru 1 ---------------------------------------------------------
const a = parseHtml(DUYURU_1);
assert('duyuru 1: iki blok', a.length === 2, `${a.length} blok`);
assert(
  'duyuru 1: kalın kısım korundu',
  boldText(a[0]) === 'Kocaeli Üniversitesi Kulüp Tanıtım Günleri',
  boldText(a[0]),
);
assert('duyuru 1: emoji hayatta', text(a[0]).includes('🎉'));
assert(
  'duyuru 1: kesme işareti kalının dışında',
  text(a[0]).includes("Günleri'nde"),
  text(a[0]).slice(-40),
);
assert('duyuru 1: ikinci blok kalınla başlıyor', a[1].runs[0]?.bold === true);
assert(
  'duyuru 1: kalın içindeki boşluk korundu',
  text(a[1]).startsWith('Yazılım Kulübü standımıza'),
  text(a[1]).slice(0, 40),
);
// `<br><br>` iki blok arası tek boşluk demek, üç blok değil; ve sondaki `<br>`
// boş bir blok üretmemeli.
assert('duyuru 1: boş blok üretilmedi', a.every((b) => text(b).trim().length > 0));

// --- Gerçek duyuru 2 ---------------------------------------------------------
const b = parseHtml(DUYURU_2);
assert('duyuru 2: iki paragraf + dört madde', b.length === 6, `${b.length} blok`);
assert('duyuru 2: ilk iki blok paragraf', b[0].kind === 'paragraph' && b[1].kind === 'paragraph');
assert(
  'duyuru 2: son dört blok liste maddesi',
  b.slice(2).every((x) => x.kind === 'listItem'),
  b.slice(2).map((x) => x.kind).join(','),
);
assert('duyuru 2: kalın korundu', boldText(b[0]) === 'web sitesi', boldText(b[0]));
assert(
  'duyuru 2: kaynak satır sonu boşluğa indi',
  text(b[1]) === 'Yeni web sitemiz üzerinden aşağıdaki imkanlara erişebilirsiniz:',
  JSON.stringify(text(b[1])),
);
assert('duyuru 2: madde metni tam', text(b[2]) === 'Etkinlik duyurularımızı takip edebilirsiniz.', text(b[2]));

// --- Savunmacılık ------------------------------------------------------------
assert(
  'script içeriği tamamen düşüyor',
  htmlToPlainText('Merhaba<script>alert(1)</script> dünya') === 'Merhaba dünya',
  htmlToPlainText('Merhaba<script>alert(1)</script> dünya'),
);
assert(
  'style içeriği tamamen düşüyor',
  htmlToPlainText('<style>.a{color:red}</style>Metin') === 'Metin',
);
assert(
  'bilinmeyen etiket atılıyor, metni kalıyor',
  htmlToPlainText('<table><tr><td>hücre</td></tr></table>') === 'hücre',
);
assert('kapanmamış etiket çökertmiyor', htmlToPlainText('<b>kalın ama kapanmamış') === 'kalın ama kapanmamış');
assert('boş girdi sıfır blok', parseHtml('').length === 0 && parseHtml('   ').length === 0);
assert('sadece <br> sıfır blok', parseHtml('<br><br><br>').length === 0);
assert(
  'niteliği olan etiket doğru okunuyor',
  htmlToPlainText('<a href="https://x.com" target="_blank">bağlantı</a>') === 'bağlantı',
);

// --- Varlıklar ---------------------------------------------------------------
assert('adlı varlıklar', decodeEntities('A&amp;B &lt;x&gt;') === 'A&B <x>', decodeEntities('A&amp;B &lt;x&gt;'));
assert('sayısal varlık', decodeEntities('&#39;tırnak&#39;') === "'tırnak'");
assert('onaltılık varlık', decodeEntities('&#x27;t&#x27;') === "'t'");
assert(
  'tanınmayan varlık olduğu gibi kalıyor',
  decodeEntities('&bogusentity; kaldı') === '&bogusentity; kaldı',
);
assert('yarım varlık çökertmiyor', decodeEntities('100% &amp bitti') === '100% &amp bitti');

console.log(failed ? `\n${failed} kontrol başarısız.` : '\nTüm kontroller geçti.');
process.exit(failed ? 1 : 0);
