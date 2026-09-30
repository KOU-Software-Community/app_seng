import type { ClubEvent } from '../data';
import { addMonths, buildEvent, dayLabelOf, monthGrid, monthGrids, monthLabelOf } from '../eventSchema';

/**
 * Takvimin saf hesabı: tek ayın ızgarası (etkinliksiz de), ekran okuyucunun okuduğu
 * tam tarih, ay kaydırma. Haftanın günleri UTC'de hesaplanıyor; cihazın saat dilimi
 * sonucu değiştirmiyor.
 */

const event = (id: string, startsAt: string) => ({ id, startsAt, title: id }) as ClubEvent;

it.each([
  [2026, 2, 6, 28], // 1 Şubat 2026 Pazar
  [2028, 2, 1, 29], // artık yıl; 1 Şubat 2028 Salı
  [2026, 8, 5, 31], // 1 Ağustos 2026 Cumartesi — altı satırlık ay
])('monthGrid(%p, %p): başta %p boşluk, %p gün', (year, month, blanks, days) => {
  const grid = monthGrid(year, month, []);
  expect([grid.leadingBlanks, grid.days, grid.label]).toEqual([blanks, days, monthLabelOf(year, month)]);
  expect(grid.eventByDay).toEqual({});
});

it('iki etkinlikli günde ilki kalıyor, başka aydaki etkinlik işaretlenmiyor', () => {
  const grid = monthGrid(2026, 10, [
    event('e1', '2026-10-12T18:00:00+03:00'),
    event('e2', '2026-10-12T20:00:00+03:00'),
    event('e3', '2026-11-02T18:00:00+03:00'),
    event('bozuk', 'yarın'),
  ]);
  expect(grid.eventByDay).toEqual({ 12: 'e1' });
});

it('monthGrids etkinliği olan ayları eskiden yeniye veriyor, davranış aynı', () => {
  const grids = monthGrids([
    event('e3', '2026-11-02T18:00:00+03:00'),
    event('e1', '2026-10-12T18:00:00+03:00'),
  ]);
  expect(grids.map((g) => [g.label, g.eventByDay])).toEqual([
    ['Ekim 2026', { 12: 'e1' }],
    ['Kasım 2026', { 2: 'e3' }],
  ]);
});

it.each([
  [2026, 10, 12, '12 Ekim 2026, Pazartesi'],
  [2026, 9, 30, '30 Eylül 2026, Çarşamba'],
  [2028, 2, 29, '29 Şubat 2028, Salı'],
])('dayLabelOf(%p, %p, %p) → %p', (year, month, day, want) => {
  expect(dayLabelOf(year, month, day)).toBe(want);
});

it.each([
  [2026, 12, 1, { year: 2027, month: 1 }],
  [2026, 1, -1, { year: 2025, month: 12 }],
  [2026, 9, 12, { year: 2027, month: 9 }],
  [2026, 9, 0, { year: 2026, month: 9 }],
])('addMonths(%p, %p, %p) → %p', (year, month, delta, want) => {
  expect(addMonths(year, month, delta)).toEqual(want);
});

it('etkinlik detayındaki "Tarih", takvimin gün etiketiyle aynı metin', () => {
  const built = buildEvent({
    id: 'e1',
    startsAt: '2026-10-12T18:00:00+03:00',
    endsAt: '20:00',
    venue: 'Konferans Salonu',
    title: 'Hackathon',
    tag: 'Yarışma',
    desc: 'Yirmi dört saatlik takım yarışması.',
    speaker: 'Ada Yılmaz',
    speakerRole: 'Mühendis',
    tags: [],
    soon: false,
    badge: 'YENI',
  });
  if (!built.ok) throw new Error(JSON.stringify(built));
  expect(built.event.facts.find((f) => f.label === 'Tarih')?.value).toBe('12 Ekim 2026, Pazartesi');
});
