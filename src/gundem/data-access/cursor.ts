import type { Cursor } from '../domain/types';

/**
 * Keyset cursors over `(publishedAt DESC, id DESC)` — the one place a `Cursor` is
 * minted, serialised or parsed.
 *
 * `Cursor`'s brand is required (rev-002 N2), so `{publishedAt, id}` does not
 * satisfy the type: the only ways to obtain one are `cursorOf` (from a row this
 * layer just read) and `decodeCursor` (validated). The single cast lives here,
 * which is what makes the opacity claim true rather than decorative.
 *
 * Serialising matters because a cursor can end up inside a persisted query cache,
 * where it has to survive a JSON round-trip without becoming a plain object a
 * caller could edit into an arbitrary offset.
 */

/** The only place a cursor is created. Both adapters call it. */
export const cursorOf = (publishedAt: string, id: string): Cursor =>
  ({ publishedAt, id }) as Cursor;

/**
 * base64, elde.
 *
 * Buradaki kod `btoa`/`atob` ya da Node'un `Buffer`'ı ile üç satırda yazılabilirdi
 * ve öyle yazılmıştı: `typeof btoa === 'function' ? btoa(...) : Buffer.from(...)`.
 * O ifade "ya tarayıcıdayız ya Node'dayız" varsayıyor. **Ölçüldü: Hermes ikisi de
 * değil** — React Native 0.86 ve Expo SDK 57 ağacında `btoa`, `atob` ve `Buffer`
 * globallerini kuran hiçbir şey yok. Yani ilk dal hiç seçilmiyor, ikinci dal
 * `ReferenceError: Property 'Buffer' doesn't exist` ile düşüyor.
 *
 * Bugün bu iki fonksiyonu çağıran yok (sayfalama `cursorOf` + `keysetFilter` ile
 * bellekte dönüyor), yani canlı bir hata değil — ilk çağıranı bekleyen bir mayın.
 * Bağımlılık eklemek yerine elde yazıldı: 40 satır, her motorda aynı.
 */
const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function utf8Bytes(text: string): number[] {
  const bytes: number[] = [];
  for (const ch of text) {
    const code = ch.codePointAt(0) as number;
    if (code < 0x80) bytes.push(code);
    else if (code < 0x800) bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f));
    else if (code < 0x10000)
      bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f));
    else
      bytes.push(
        0xf0 | (code >> 18),
        0x80 | ((code >> 12) & 0x3f),
        0x80 | ((code >> 6) & 0x3f),
        0x80 | (code & 0x3f),
      );
  }
  return bytes;
}

function utf8FromBytes(bytes: number[]): string {
  let out = '';
  let i = 0;
  while (i < bytes.length) {
    const b0 = bytes[i++];
    let code: number;
    if (b0 < 0x80) code = b0;
    else if (b0 < 0xe0) code = ((b0 & 0x1f) << 6) | (bytes[i++] & 0x3f);
    else if (b0 < 0xf0)
      code = ((b0 & 0x0f) << 12) | ((bytes[i++] & 0x3f) << 6) | (bytes[i++] & 0x3f);
    else
      code =
        ((b0 & 0x07) << 18) |
        ((bytes[i++] & 0x3f) << 12) |
        ((bytes[i++] & 0x3f) << 6) |
        (bytes[i++] & 0x3f);
    out += String.fromCodePoint(code);
  }
  return out;
}

function bytesToBase64(bytes: number[]): string {
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b0 = bytes[i];
    const b1: number | undefined = bytes[i + 1];
    const b2: number | undefined = bytes[i + 2];
    out += B64[b0 >> 2];
    out += B64[((b0 & 0x03) << 4) | ((b1 ?? 0) >> 4)];
    out += b1 === undefined ? '=' : B64[((b1 & 0x0f) << 2) | ((b2 ?? 0) >> 6)];
    out += b2 === undefined ? '=' : B64[b2 & 0x3f];
  }
  return out;
}

function base64ToBytes(base64: string): number[] {
  const bytes: number[] = [];
  let buffer = 0;
  let bits = 0;
  for (const ch of base64.replace(/=+$/, '')) {
    const value = B64.indexOf(ch);
    if (value === -1) throw new Error(`[cursor] base64 dışı karakter: ${ch}`);
    buffer = (buffer << 6) | value;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      bytes.push((buffer >> bits) & 0xff);
    }
  }
  return bytes;
}

/** URL-safe base64 of the JSON pair. Opaque to callers by construction. */
export function encodeCursor(cursor: Cursor): string {
  const json = JSON.stringify({ p: cursor.publishedAt, i: cursor.id });
  return bytesToBase64(utf8Bytes(json))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Parse an encoded cursor. Returns null (with a warning) for anything that is not
 * one of ours — a truncated string, a hand-written object, a value from an older
 * cache version. Callers treat null as "start from the top" rather than crashing.
 */
export function decodeCursor(encoded: string): Cursor | null {
  try {
    const base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const json = utf8FromBytes(base64ToBytes(base64));
    const parsed = JSON.parse(json) as { p?: unknown; i?: unknown };
    if (typeof parsed.p !== 'string' || typeof parsed.i !== 'string') {
      console.warn(`[cursor] decoded value is not a cursor: ${json}`);
      return null;
    }
    if (!parsed.p || !parsed.i) {
      console.warn('[cursor] decoded cursor has an empty publishedAt or id.');
      return null;
    }
    return cursorOf(parsed.p, parsed.i);
  } catch (error) {
    console.warn(`[cursor] could not decode "${encoded}":`, error);
    return null;
  }
}

/** True when `item` sorts strictly after `cursor` in `(publishedAt, id)` DESC. */
export const isAfterCursor = (
  item: { publishedAt: string; id: string },
  cursor: Cursor,
): boolean =>
  item.publishedAt < cursor.publishedAt ||
  (item.publishedAt === cursor.publishedAt && item.id < cursor.id);

/**
 * The PostgREST filter for "strictly after this cursor" in `(published_at, id)`
 * DESC order. Written as one `or(...)` so PostgREST keeps it in a single WHERE
 * clause the `(published_at desc, id desc)` index can serve.
 *
 * Timestamps come back from PostgREST already normalised, and both parts are
 * quoted, so a value containing a comma or paren cannot break out of the filter.
 */
export const keysetFilter = (cursor: Cursor): string =>
  `published_at.lt."${cursor.publishedAt}",and(published_at.eq."${cursor.publishedAt}",article_id.lt."${cursor.id}")`;
