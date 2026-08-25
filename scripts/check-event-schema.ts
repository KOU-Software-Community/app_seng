/**
 * `npm run check:schema`
 *
 * src/eventSchema.ts hem admin panelinin hem de Firestore'a yazılan her
 * etkinliğin geçtiği yer. Türettiği metinler yanlış olursa hiçbir şey hata
 * vermez — sadece uygulamada yanlış tarih görünür. Bu yüzden çıktısı, elle
 * yazılmış gerçek bir etkinliğe (1.0.x'teki `ev1`) karşı alan alan
 * karşılaştırılıyor.
 */
import { buildEvent, monthGrids, monthOrder, toInput, type EventInput } from '../src/eventSchema';
import type { ClubEvent } from '../src/data';

/** 1.0.x'te elle yazılmış hâli — referans bu. */
const EV1: ClubEvent = {
  id: 'ev1',
  startsAt: '2026-03-12T18:00:00+03:00',
  day: '12',
  mon: 'MAR',
  wd: 'Per',
  monthKey: 'MART 2026',
  title: 'Git & GitHub Atölyesi',
  time: '18:00 – 20:30 · B Blok 204',
  short: '12 Mart · B Blok 204',
  tag: 'Atölye',
  soon: true,
  badge: 'SON GUN',
  spots: '12 / 60 yer kaldı',
  desc: 'Versiyon kontrolüne sıfırdan başlıyoruz.',
  tags: ['Başlangıç seviye', 'Laptop getir'],
  speaker: 'Mert Aydın',
  speakerRole: '3. sınıf · Kulüp teknik ekip',
  facts: [
    { icon: 'cal', label: 'Tarih', value: '12 Mart 2026, Perşembe' },
    { icon: 'clock', label: 'Saat', value: '18:00 – 20:30' },
    { icon: 'pin', label: 'Yer', value: 'Müh. Fak. B Blok 204' },
  ],
};

const EV1_INPUT: EventInput = {
  id: 'ev1',
  startsAt: '2026-03-12T18:00:00+03:00',
  endsAt: '20:30',
  venue: 'Müh. Fak. B Blok 204',
  venueShort: 'B Blok 204',
  title: 'Git & GitHub Atölyesi',
  tag: 'Atölye',
  desc: 'Versiyon kontrolüne sıfırdan başlıyoruz.',
  spots: '12 / 60 yer kaldı',
  speaker: 'Mert Aydın',
  speakerRole: '3. sınıf · Kulüp teknik ekip',
  tags: ['Başlangıç seviye', 'Laptop getir'],
  soon: true,
  badge: 'SON GUN',
};

let failed = 0;
function assert(name: string, condition: boolean, detail = '') {
  console.log(`${condition ? '✓' : '✗'} ${name}${condition ? '' : `\n    ${detail}`}`);
  if (!condition) failed += 1;
}

// 1. Türetim, elle yazılmış referansla birebir aynı mı?
const built = buildEvent(EV1_INPUT);
if (!built.ok) {
  assert('ev1 kurulabiliyor', false, JSON.stringify(built.errors));
} else {
  for (const key of Object.keys(EV1) as (keyof ClubEvent)[]) {
    const expected = JSON.stringify(EV1[key]);
    const actual = JSON.stringify(built.event[key]);
    assert(`ev1.${key}`, expected === actual, `beklenen ${expected}, gelen ${actual}`);
  }
}

// 2. Gidiş-dönüş: kaydedilen etkinlik forma geri döndüğünde aynı girdiyi vermeli.
if (built.ok) {
  const round = toInput(built.event);
  for (const key of ['startsAt', 'endsAt', 'venue', 'venueShort', 'title', 'tag'] as const) {
    assert(
      `gidiş-dönüş ${key}`,
      JSON.stringify(round[key]) === JSON.stringify(EV1_INPUT[key]),
      `beklenen ${JSON.stringify(EV1_INPUT[key])}, gelen ${JSON.stringify(round[key])}`,
    );
  }
}

// 3. Geçersiz girdiler reddedilmeli — asıl koruma bu.
const rejects: [string, Partial<EventInput>][] = [
  ['saat dilimi yok', { startsAt: '2026-03-12T18:00:00' }],
  ['tarih anlamsız', { startsAt: 'yarın saat 6' }],
  ['olmayan gün', { startsAt: '2026-02-30T18:00:00+03:00' }],
  ['13. ay', { startsAt: '2026-13-01T18:00:00+03:00' }],
  ['bitiş başlangıçtan önce', { endsAt: '17:00' }],
  ['bitiş biçimi bozuk', { endsAt: '20.30' }],
  ['başlık boş', { title: '   ' }],
  ['kimlikte boşluk', { id: 'yeni etkinlik' }],
];
for (const [name, patch] of rejects) {
  const result = buildEvent({ ...EV1_INPUT, ...patch });
  assert(`reddediliyor: ${name}`, !result.ok, 'kabul edildi ama edilmemeliydi');
}

// 4. Artık yıl — 29 Şubat 2028 geçerli, 2027'de değil.
assert('29 Şubat 2028 kabul', buildEvent({ ...EV1_INPUT, startsAt: '2028-02-29T18:00:00+03:00' }).ok);
assert(
  '29 Şubat 2027 ret',
  !buildEvent({ ...EV1_INPUT, startsAt: '2027-02-29T18:00:00+03:00' }).ok,
);

// 5. Takvim ızgarası tarihlerden türüyor mu?
const mart = buildEvent(EV1_INPUT);
const nisan = buildEvent({ ...EV1_INPUT, id: 'ev2', startsAt: '2026-04-01T10:00:00+03:00' });
if (mart.ok && nisan.ok) {
  const grids = monthGrids([nisan.event, mart.event]); // bilerek ters sırada
  assert('iki ay için ızgara', grids.length === 2, `${grids.length} ızgara`);
  assert('kronolojik sıra', grids[0]?.label === 'Mart 2026', grids[0]?.label ?? '(yok)');
  // 1 Mart 2026 pazar → pazartesi başlayan ızgarada 6 boş hücre.
  assert('Mart 2026 boşluk', grids[0]?.leadingBlanks === 6, String(grids[0]?.leadingBlanks));
  assert('Mart 31 gün', grids[0]?.days === 31, String(grids[0]?.days));
  assert('12 Mart işaretli', grids[0]?.eventByDay[12] === 'ev1');
  // 1 Nisan 2026 çarşamba → 2 boş hücre.
  assert('Nisan 2026 boşluk', grids[1]?.leadingBlanks === 2, String(grids[1]?.leadingBlanks));
  assert(
    'ay sırası',
    JSON.stringify(monthOrder([nisan.event, mart.event])) ===
      JSON.stringify(['MART 2026', 'NİSAN 2026']),
  );
}

// 6. Bozuk tarih taşıyan etkinlik ızgarayı çökertmemeli, sadece atlanmalı.
const broken = { ...EV1, startsAt: 'bozuk' } as ClubEvent;
assert('bozuk tarih atlanıyor', monthGrids([broken]).length === 0);

console.log(failed ? `\n${failed} kontrol başarısız.` : '\nTüm kontroller geçti.');
process.exit(failed ? 1 : 0);
