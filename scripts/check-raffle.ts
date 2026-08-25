/**
 * `npm run check:raffle`
 *
 * src/raffleSchema.ts hem uygulamadaki dinamik formun hem panelin hem de
 * CSV çıktısının dayandığı yer. Alanlar veri olduğu için burada bir hata
 * derleme zamanında yakalanmıyor — yanlış doğrulama, kulübün eksik veriyle
 * çekiliş yapması demek.
 */
import {
  csvColumns,
  DEFAULT_FIELDS,
  entriesOpen,
  maskName,
  pickDefinedValues,
  validateEntry,
  validateFields,
  type Raffle,
  type RaffleField,
} from '../src/raffleSchema';

let failed = 0;
function assert(name: string, condition: boolean, detail = '') {
  console.log(`${condition ? '✓' : '✗'} ${name}${condition ? '' : `\n    ${detail}`}`);
  if (!condition) failed += 1;
}
const ok = (e: Record<string, string>) => Object.keys(e).length === 0;

// --- Alan tanımı -------------------------------------------------------------
assert('varsayılan alanlar geçerli', ok(validateFields(DEFAULT_FIELDS)), JSON.stringify(validateFields(DEFAULT_FIELDS)));
assert('boş tanım reddediliyor', !ok(validateFields([])));
assert(
  'çok fazla alan reddediliyor',
  !ok(validateFields(Array.from({ length: 13 }, (_, i) => ({
    key: `f${i}`, label: `A${i}`, type: 'text' as const, required: false,
  })))),
);

const bad: [string, RaffleField][] = [
  ['büyük harfli anahtar', { key: 'FullName', label: 'A', type: 'text', required: false }],
  ['boşluklu anahtar', { key: 'full name', label: 'A', type: 'text', required: false }],
  ['rakamla başlayan anahtar', { key: '1name', label: 'A', type: 'text', required: false }],
  ['boş etiket', { key: 'ok_key', label: '  ', type: 'text', required: false }],
  ['seçeneksiz select', { key: 'sec', label: 'Seç', type: 'select', required: false, options: [] }],
];
for (const [name, field] of bad) {
  assert(`reddediliyor: ${name}`, !ok(validateFields([field])));
}
assert(
  'yinelenen anahtar reddediliyor',
  !ok(validateFields([
    { key: 'ad', label: 'A', type: 'text', required: false },
    { key: 'ad', label: 'B', type: 'text', required: false },
  ])),
);

// --- Katılım doğrulama -------------------------------------------------------
const FIELDS: RaffleField[] = [
  ...DEFAULT_FIELDS,
  { key: 'phone', label: 'Telefon', type: 'phone', required: false },
  { key: 'email', label: 'E-posta', type: 'email', required: true },
];

const VALID = {
  full_name: 'Elif Yılmaz',
  student_number: '210101045',
  department: 'Yazılım Müh.',
  class: '3',
  email: 'elif@example.com',
};

assert('geçerli katılım kabul', ok(validateEntry(FIELDS, VALID)), JSON.stringify(validateEntry(FIELDS, VALID)));
assert(
  'zorunlu alan eksik reddediliyor',
  !ok(validateEntry(FIELDS, { ...VALID, email: '' })),
);
assert(
  'isteğe bağlı alan boş kabul',
  ok(validateEntry(FIELDS, { ...VALID, phone: '' })),
);
assert('8 haneli öğrenci no ret', !ok(validateEntry(FIELDS, { ...VALID, student_number: '21010104' })));
assert('harfli öğrenci no ret', !ok(validateEntry(FIELDS, { ...VALID, student_number: '21010104a' })));
assert('bozuk e-posta ret', !ok(validateEntry(FIELDS, { ...VALID, email: 'elif@' })));
assert('listede olmayan bölüm ret', !ok(validateEntry(FIELDS, { ...VALID, department: 'Tarih' })));
assert('tanımda olmayan alan ret', !ok(validateEntry(FIELDS, { ...VALID, gizli: 'x' })));
assert(
  'çok uzun metin ret',
  !ok(validateEntry(FIELDS, { ...VALID, full_name: 'a'.repeat(121) })),
);

for (const phone of ['05321234567', '+905321234567', '0532 123 45 67', '0532-123-45-67']) {
  assert(`telefon kabul: ${phone}`, ok(validateEntry(FIELDS, { ...VALID, phone })));
}
for (const phone of ['5321234', '021312345678', 'telefon']) {
  assert(`telefon ret: ${phone}`, !ok(validateEntry(FIELDS, { ...VALID, phone })));
}

// --- Değer ayıklama ve CSV ---------------------------------------------------
const picked = pickDefinedValues(FIELDS, { ...VALID, gizli: 'atılmalı', phone: '  ' });
assert('tanımsız anahtar ayıklanıyor', !('gizli' in picked));
assert('boş değer ayıklanıyor', !('phone' in picked));
assert('tanımlı değer korunuyor', picked.full_name === 'Elif Yılmaz');

assert(
  'CSV sütunları sabit üçlü + tanım',
  JSON.stringify(csvColumns(FIELDS)) ===
    JSON.stringify([
      'entry_id', 'event_id',
      'full_name', 'student_number', 'department', 'class', 'phone', 'email',
      'created_at',
    ]),
  JSON.stringify(csvColumns(FIELDS)),
);

// --- Kazanan maskesi ---------------------------------------------------------
assert('maske: iki kelime', maskName('Elif Yılmaz') === 'Elif Y.', maskName('Elif Yılmaz'));
assert('maske: üç kelime', maskName('Ayşe Nur Demir') === 'Ayşe Nur D.', maskName('Ayşe Nur Demir'));
assert('maske: tek kelime olduğu gibi', maskName('Elif') === 'Elif');
assert('maske: fazla boşluk', maskName('  Elif   Yılmaz  ') === 'Elif Y.', maskName('  Elif   Yılmaz  '));
assert('maske: boş girdi', maskName('   ') === '');
// Türkçe: 'ı' büyük harfi 'I', 'i' ise 'İ'. Locale'siz toUpperCase 'ı'yı 'I' yapar
// ki bu doğru; asıl tuzak 'i' → 'I' olurdu.
assert('maske: türkçe baş harf', maskName('Ali İnan') === 'Ali İ.', maskName('Ali İnan'));

// --- Katılım penceresi -------------------------------------------------------
const base: Raffle = {
  eventId: 'ev1', fields: FIELDS, winnerCount: 3,
  entriesCloseAt: '2030-01-01T18:00:00+03:00', winners: [], drawnAt: '',
};
const NOW = new Date('2026-08-25T12:00:00+03:00');
assert('gelecek tarih: açık', entriesOpen(base, NOW));
assert('geçmiş tarih: kapalı', !entriesOpen({ ...base, entriesCloseAt: '2020-01-01T18:00:00+03:00' }, NOW));
assert('çekiliş yapılmış: kapalı', !entriesOpen({ ...base, drawnAt: '2026-08-01T10:00:00+03:00' }, NOW));
// Bozuk tarih yüzünden herkesin katılımını engellemek, tarihi görmezden
// gelmekten daha kötü bir hata.
assert('bozuk tarih: açık sayılıyor', entriesOpen({ ...base, entriesCloseAt: 'bozuk' }, NOW));

console.log(failed ? `\n${failed} kontrol başarısız.` : '\nTüm kontroller geçti.');
process.exit(failed ? 1 : 0);
