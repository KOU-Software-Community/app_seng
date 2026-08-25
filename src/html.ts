/**
 * Duyuru gövdelerindeki HTML'i React Native'in çizebileceği bloklara çevirir.
 *
 * `api.kouseng.com` duyuru `content`'ini bir web editöründen geldiği hâliyle
 * veriyor: `<b>`, `<br>`, `<ul><li>`. React Native HTML çizmez, dolayısıyla
 * metni doğrudan basmak kullanıcıya `<b>Yazılım Kulübü </b>` gösterir.
 *
 * Bir HTML kütüphanesi eklemek yerine bu var: gelen etiket kümesi küçük, ve
 * bilinmeyen her etiket sessizce atılıyor — CMS yarın `<table>` göndermeye
 * başlarsa metin sadeleşir, ekran bozulmaz.
 *
 * Güvenlik açısından rahat olan taraf: React Native hiçbir şeyi çalıştırmıyor,
 * yani `<script>` gelse bile burada sadece atılacak bir etiket. Yine de metin
 * olarak da sızmaması için içeriği tamamen düşürülüyor.
 */

export type InlineRun = { text: string; bold?: boolean; italic?: boolean };

export type Block =
  | { kind: 'paragraph'; runs: InlineRun[] }
  | { kind: 'listItem'; runs: InlineRun[] };

const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  hellip: '…',
  mdash: '—',
  ndash: '–',
  rsquo: '’',
  lsquo: '‘',
  ldquo: '“',
  rdquo: '”',
  middot: '·',
};

export function decodeEntities(text: string): string {
  return text.replace(/&(#[xX]?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, body: string) => {
    if (body[0] === '#') {
      const hex = body[1] === 'x' || body[1] === 'X';
      const code = parseInt(hex ? body.slice(2) : body.slice(1), hex ? 16 : 10);
      if (!Number.isFinite(code) || code <= 0 || code > 0x10ffff) return match;
      try {
        return String.fromCodePoint(code);
      } catch {
        return match;
      }
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? match;
  });
}

/** İçeriği tamamen atılan etiketler — metinleri de görünmemeli. */
const DROPPED = new Set(['script', 'style', 'head', 'title', 'noscript', 'iframe']);
/** Kendinden sonra blok bitiren etiketler. */
const BLOCK_ENDING = new Set(['p', 'div', 'ul', 'ol', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']);

type Tag = { name: string; closing: boolean };

function readTag(raw: string): Tag {
  const closing = raw[1] === '/';
  const name = raw
    .slice(closing ? 2 : 1)
    .replace(/[/>].*$/s, '')
    .trim()
    .split(/[\s\n]/)[0]
    .toLowerCase();
  return { name, closing };
}

/**
 * Blok listesi. Boş bloklar atılıyor, çünkü web editörleri `<br><br>` ve
 * kapanıştan hemen sonra gelen `<br>` üretmeyi seviyor ve her biri ekranda bir
 * boş satır olurdu.
 */
export function parseHtml(html: string): Block[] {
  const blocks: Block[] = [];
  let runs: InlineRun[] = [];
  let kind: Block['kind'] = 'paragraph';
  let bold = 0;
  let italic = 0;
  let dropDepth = 0;

  const flush = () => {
    const text = runs.map((r) => r.text).join('').trim();
    if (text) blocks.push({ kind, runs: trimRuns(runs) });
    runs = [];
    kind = 'paragraph';
  };

  const pattern = /<[^>]*>/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  const pushText = (raw: string) => {
    if (dropDepth > 0 || !raw) return;
    // Kaynak HTML'deki satır sonları ve girintiler biçim değil, kaynak
    // formatlaması — tek boşluğa indiriliyor.
    const text = decodeEntities(raw).replace(/\s+/g, ' ');
    if (!text) return;
    runs.push({ text, bold: bold > 0 || undefined, italic: italic > 0 || undefined });
  };

  while ((match = pattern.exec(html)) !== null) {
    pushText(html.slice(cursor, match.index));
    cursor = pattern.lastIndex;

    const { name, closing } = readTag(match[0]);

    if (DROPPED.has(name)) {
      dropDepth = closing ? Math.max(0, dropDepth - 1) : dropDepth + 1;
      continue;
    }
    if (dropDepth > 0) continue;

    if (name === 'br') {
      flush();
    } else if (name === 'li') {
      flush();
      if (!closing) kind = 'listItem';
    } else if (BLOCK_ENDING.has(name)) {
      flush();
    } else if (name === 'b' || name === 'strong') {
      bold = closing ? Math.max(0, bold - 1) : bold + 1;
    } else if (name === 'i' || name === 'em') {
      italic = closing ? Math.max(0, italic - 1) : italic + 1;
    }
    // Geri kalan her etiket sessizce atılıyor, metni korunuyor.
  }

  pushText(html.slice(cursor));
  flush();
  return blocks;
}

/** Baştaki ve sondaki boşlukları blok sınırlarında kırpar. */
function trimRuns(runs: InlineRun[]): InlineRun[] {
  const out = runs.map((r) => ({ ...r }));
  if (out.length) out[0].text = out[0].text.replace(/^\s+/, '');
  if (out.length) out[out.length - 1].text = out[out.length - 1].text.replace(/\s+$/, '');
  return out.filter((r) => r.text);
}

/** Tek satırlık düz metin — bildirim gövdesi ve önizleme için. */
export function htmlToPlainText(html: string): string {
  return parseHtml(html)
    .map((b) => b.runs.map((r) => r.text).join(''))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
