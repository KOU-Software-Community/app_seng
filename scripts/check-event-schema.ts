/**
 * `npm run check:schema`
 *
 * src/eventSchema.ts hem admin panelinin hem de Firestore'a yazılan her
 * etkinliğin geçtiği yer. Türettiği metinler yanlış olursa hiçbir şey hata
 * vermez — sadece uygulamada yanlış tarih görünür. Bu yüzden çıktısı, elle
 * yazılmış gerçek bir etkinliğe (1.0.x'teki `ev1`) karşı alan alan
 * karşılaştırılıyor.
 */
import {
  buildEvent,
  isFull,
  isPast,
  joinLocal,
  monthGrids,
  monthOrder,
  seatsLabel,
  seatsLeft,
  splitByDate,
  splitLocal,
  toInput,
  todayLocal,
  type EventInput,
} from '../src/eventSchema';
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
  capacity: 60,
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
  capacity: '60',
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

// 7. Panel tarih ve saati ayrı seçicilerden alıyor; ISO'yu joinLocal kuruyor ve
//    düzenlemede splitLocal geri ayırıyor. Bu ikisi birbirinin tersi olmazsa
//    bir etkinliği açıp hiçbir şey değiştirmeden kaydetmek onu oynatır.
assert(
  'seçicilerden ISO',
  joinLocal('2026-03-12', '18:00') === '2026-03-12T18:00:00+03:00',
  joinLocal('2026-03-12', '18:00'),
);
assert('tarih yoksa boş', joinLocal('', '18:00') === '');
assert('saat yoksa boş', joinLocal('2026-03-12', '') === '');
// Tarayıcı seçici bunları üretmez; elle atılan bir POST üretir.
assert('bozuk tarih reddediliyor', joinLocal('12.03.2026', '18:00') === '');
assert('bozuk saat reddediliyor', joinLocal('2026-03-12', '18.00') === '');
assert('25:00 reddediliyor', joinLocal('2026-03-12', '25:00') === '');

const split = splitLocal('2026-03-12T18:00:00+03:00');
assert('geri ayırma tarihi', split.date === '2026-03-12', split.date);
assert('geri ayırma saati', split.time === '18:00', split.time);
assert(
  'gidiş-dönüş',
  joinLocal(split.date, split.time) === EV1.startsAt,
  joinLocal(split.date, split.time),
);

// Farklı offset'le kaydedilmiş bir etkinlik: duvar saati olduğu gibi okunuyor.
// Uygulamanın gösterdiği her metin bu alanlardan türüyor, dolayısıyla formun
// çevrilmiş bir saat göstermesi tıklanan satırla çelişmek olurdu.
const utc = splitLocal('2026-03-12T15:00:00Z');
assert('duvar saati olduğu gibi', utc.date === '2026-03-12' && utc.time === '15:00',
  `${utc.date} ${utc.time}`);
const west = splitLocal('2026-03-12T08:00:00-05:00');
assert('negatif offset de olduğu gibi', west.time === '08:00', west.time);

// Asıl güvence bu: bir etkinliği açıp hiçbir şeye dokunmadan kaydetmek takvimde
// görünen hiçbir şeyi değiştirmemeli. Kaydedilen offset +03:00'a dönüyor —
// değişen tek şey hatırlatmanın artık ekrandaki saatte çalması.
const visible = (e: ClubEvent) =>
  JSON.stringify([e.day, e.mon, e.wd, e.monthKey, e.time, e.short, e.facts]);

for (const iso of [
  '2026-03-12T18:00:00+03:00',
  '2026-03-12T15:00:00Z',
  '2026-03-12T08:00:00-05:00',
]) {
  const first = buildEvent({ ...EV1_INPUT, startsAt: iso });
  if (!first.ok) {
    assert(`kurulabiliyor: ${iso}`, false);
    continue;
  }
  const shown = splitLocal(toInput(first.event).startsAt);
  const again = buildEvent({ ...toInput(first.event), startsAt: joinLocal(shown.date, shown.time) });
  assert(
    `değiştirmeden kaydet oynatmıyor: ${iso}`,
    again.ok && visible(again.event) === visible(first.event),
    again.ok ? visible(again.event) : 'kurulamadı',
  );
  assert(
    `kaydedilen offset +03:00: ${iso}`,
    again.ok && again.event.startsAt.endsWith('+03:00'),
    again.ok ? again.event.startsAt : 'kurulamadı',
  );
}

// Ayrıştırılamayan değer tahmin edilmiyor; form boş geliyor ve buildEvent zaten
// reddediyor.
assert('bozuk startsAt boş dönüyor', splitLocal('bozuk').date === '' && splitLocal('bozuk').time === '');

// 8. Katılımcı sayısı: etkinlikten sonra girilen, isteğe bağlı alan.
assert('katılımcı sayısı boş kabul', buildEvent({ ...EV1_INPUT, attendance: '' }).ok);
const withCount = buildEvent({ ...EV1_INPUT, attendance: '42' });
assert('katılımcı sayısı yazılıyor', withCount.ok && withCount.event.attendance === 42);
// Boşken alan hiç yazılmamalı: Firestore `undefined` kabul etmez ve `0` da
// "kimse gelmedi" demek olurdu.
const noCount = buildEvent(EV1_INPUT);
assert(
  'boşken alan hiç yok',
  noCount.ok && !('attendance' in noCount.event),
  noCount.ok ? JSON.stringify(noCount.event.attendance) : 'kurulamadı',
);
assert('ondalık ret', !buildEvent({ ...EV1_INPUT, attendance: '4.5' }).ok);
assert('negatif ret', !buildEvent({ ...EV1_INPUT, attendance: '-3' }).ok);
assert('harf ret', !buildEvent({ ...EV1_INPUT, attendance: 'çok' }).ok);
assert('gidiş-dönüş katılımcı', withCount.ok && toInput(withCount.event).attendance === '42');

// 9. todayLocal cihazın saat diliminden değil, +03:00'tan okuyor. Yurt dışındaki
//    bir telefon, kulübün takviminde hâlâ bugün olan etkinliği arşivde
//    göstermemeli.
assert(
  'gece yarısını geçen an ertesi gün',
  todayLocal(new Date('2026-03-12T21:30:00Z')) === '2026-03-13',
  todayLocal(new Date('2026-03-12T21:30:00Z')),
);
assert(
  'gece yarısından önce aynı gün',
  todayLocal(new Date('2026-03-12T20:30:00Z')) === '2026-03-12',
  todayLocal(new Date('2026-03-12T20:30:00Z')),
);

// 10. Takvim/arşiv bölmesi. Sınır gün bazında: etkinliğin kendi günü boyunca
//     takvimde kalıyor, ertesi gün arşive geçiyor. Başlangıç anına göre bölmek
//     üç saatlik bir etkinliği daha başlarken arşive atardı.
const onDay = buildEvent({ ...EV1_INPUT, id: 'bugun', startsAt: '2026-03-12T18:00:00+03:00' });
const dayBefore = buildEvent({ ...EV1_INPUT, id: 'dun', startsAt: '2026-03-11T18:00:00+03:00' });
const later = buildEvent({ ...EV1_INPUT, id: 'sonra', startsAt: '2026-04-20T10:00:00+03:00' });

if (onDay.ok && dayBefore.ok && later.ok) {
  assert('kendi günü boyunca takvimde', !isPast(onDay.event, '2026-03-12'));
  assert('ertesi gün arşivde', isPast(onDay.event, '2026-03-13'));
  assert('dünkü arşivde', isPast(dayBefore.event, '2026-03-12'));

  const split = splitByDate([later.event, dayBefore.event, onDay.event], '2026-03-12');
  assert(
    'yaklaşanlar en yakından',
    JSON.stringify(split.upcoming.map((e) => e.id)) === JSON.stringify(['bugun', 'sonra']),
    split.upcoming.map((e) => e.id).join(','),
  );
  assert(
    'arşiv en yeniden',
    JSON.stringify(split.past.map((e) => e.id)) === JSON.stringify(['dun']),
    split.past.map((e) => e.id).join(','),
  );
}

// Tarihi okunamayan etkinlik yaklaşan sayılıyor: arşive atmak onu olmuş gibi
// gösterir ve kayıt düğmesini de kaldırır.
const unreadable = { ...EV1, id: 'bozuk', startsAt: 'bozuk' } as ClubEvent;
assert('bozuk tarih geçmiş sayılmıyor', !isPast(unreadable, '2026-03-12'));
assert(
  'bozuk tarih takvimde kalıyor',
  splitByDate([unreadable], '2026-03-12').upcoming.length === 1,
);

// 11. Kontenjan. Elle yazılan "12 / 60 yer kaldı" cümlesi gitti; kalan yer
//     gerçek kayıt sayısından çıkıyor ve yönetici kontenjanı yükselttiğinde
//     kendiliğinden artıyor.
const capped = buildEvent({ ...EV1_INPUT, capacity: '60' });
if (!capped.ok) assert('kontenjanlı etkinlik kurulabiliyor', false);
else {
  assert('kontenjan sayıya dönüyor', capped.event.capacity === 60, String(capped.event.capacity));
  assert('boşken kalan 60', seatsLeft(capped.event, 0) === 60);
  assert('12 kayıtta kalan 48', seatsLeft(capped.event, 12) === 48);
  assert('kontenjan kadar kayıtta 0', seatsLeft(capped.event, 60) === 0);
  // Sayaç bir şekilde şişerse kalan negatife düşmemeli.
  assert('fazla kayıtta 0, negatif değil', seatsLeft(capped.event, 75) === 0);
  assert('dolu', isFull(capped.event, 60) && isFull(capped.event, 75));
  assert('dolu değil', !isFull(capped.event, 59));
  assert('etiket', seatsLabel(capped.event, 12) === '48 / 60 yer kaldı', seatsLabel(capped.event, 12));
  assert('dolu etiketi', seatsLabel(capped.event, 60) === 'Kontenjan doldu');

  // Yönetici kontenjanı yükseltti: aynı kayıt sayısıyla kalan yer artmalı.
  const raised = buildEvent({ ...EV1_INPUT, capacity: '90' });
  assert(
    'kontenjan yükselince kalan artıyor',
    raised.ok && seatsLeft(raised.event, 60) === 30,
    raised.ok ? String(seatsLeft(raised.event, 60)) : 'kurulamadı',
  );
  assert('yükseltince dolu değil', raised.ok && !isFull(raised.event, 60));
}

// Sınırsız etkinlik: kontenjan yok. `null` dönüyor, 0 değil — 0 dönseydi
// "sıfır yer kaldı" ile aynı değer olur ve kayıt düğmesi kapanırdı.
const open = buildEvent({ ...EV1_INPUT, capacity: '' });
if (!open.ok) assert('kontenjansız etkinlik kurulabiliyor', false);
else {
  assert('kontenjan alanı hiç yok', !('capacity' in open.event));
  assert('sınırsızda kalan null', seatsLeft(open.event, 500) === null);
  assert('sınırsız hiç dolmuyor', !isFull(open.event, 5000));
  assert('sınırsız etiketi', seatsLabel(open.event, 500) === 'Sınırsız');
}

// 0 yazmak da sınırsız demek: "kontenjan 0" diye bir şey yok, ya sınır var ya
// yok. Alan yazılmıyor ki uygulama onu dolu sanmasın.
const zero = buildEvent({ ...EV1_INPUT, capacity: '0' });
assert('0 sınırsız sayılıyor', zero.ok && !('capacity' in zero.event));

assert('ondalık kontenjan ret', !buildEvent({ ...EV1_INPUT, capacity: '4.5' }).ok);
assert('negatif kontenjan ret', !buildEvent({ ...EV1_INPUT, capacity: '-3' }).ok);
assert('harfli kontenjan ret', !buildEvent({ ...EV1_INPUT, capacity: 'çok' }).ok);
assert('gidiş-dönüş kontenjan', capped.ok && toInput(capped.event).capacity === '60');

console.log(failed ? `\n${failed} kontrol başarısız.` : '\nTüm kontroller geçti.');
process.exit(failed ? 1 : 0);
