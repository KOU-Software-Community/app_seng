import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { AccessibilityInfo } from 'react-native';

import { MonthCalendar } from '../components/MonthCalendar';
import type { ClubEvent } from '../data';

/**
 * Takvim sekmesinin her zaman görünen ay kartı. "Bugün" kulüp saatinden (+03:00):
 * saat sahte zamanlayıcıyla sabitleniyor.
 */

const event = (id: string, title: string, startsAt: string) => ({ id, title, startsAt }) as ClubEvent;
const at = (iso: string) => jest.useFakeTimers({ now: new Date(iso) });
afterEach(() => jest.useRealTimers());

const next = () => fireEvent.press(screen.getByRole('button', { name: 'Sonraki ay' }));
const prev = () => fireEvent.press(screen.getByRole('button', { name: 'Önceki ay' }));
const header = (name: string) => screen.getByRole('header', { name });

it('etkinlik yokken bu ay açılıyor, bugün işaretli, geriye gidilmiyor', async () => {
  at('2026-09-30T09:00:00Z');
  await render(<MonthCalendar events={[]} onOpen={jest.fn()} />);
  expect(header('Eylül 2026')).toBeTruthy();
  expect(screen.getByLabelText('30 Eylül 2026, Çarşamba, bugün')).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Önceki ay' })).toBeDisabled();
});

it('ileri geri geçiyor, ayı duyuruyor, 12 ay sonra duruyor', async () => {
  at('2026-09-30T09:00:00Z');
  // Kuyruğa: VoiceOver düğmenin kendi okumasıyla duyuruyu kesmesin.
  const announce = jest.spyOn(AccessibilityInfo, 'announceForAccessibilityWithOptions');
  await render(<MonthCalendar events={[]} onOpen={jest.fn()} />);
  await next();
  expect(header('Ekim 2026')).toBeTruthy();
  expect(announce).toHaveBeenLastCalledWith('Ekim 2026', { queue: true });
  await prev();
  expect(header('Eylül 2026')).toBeTruthy();
  for (let i = 0; i < 12; i += 1) await next();
  expect(header('Eylül 2027')).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Sonraki ay' })).toBeDisabled();
});

it('etkinlik günü düğme, dokununca etkinlik açılıyor', async () => {
  at('2026-09-30T09:00:00Z');
  const onOpen = jest.fn();
  await render(
    <MonthCalendar events={[event('e1', 'Hackathon', '2026-10-12T18:00:00+03:00')]} onOpen={onOpen} />,
  );
  await next();
  await fireEvent.press(
    screen.getByRole('button', { name: '12 Ekim 2026, Pazartesi, etkinlik: Hackathon' }),
  );
  expect(onOpen).toHaveBeenCalledWith('e1');
});

it('12 aydan sonraki etkinlik sınırı kendi ayına uzatıyor', async () => {
  at('2026-09-30T09:00:00Z');
  await render(
    <MonthCalendar events={[event('e2', 'Mezuniyet', '2027-11-20T14:00:00+03:00')]} onOpen={jest.fn()} />,
  );
  for (let i = 0; i < 14; i += 1) await next();
  expect(header('Kasım 2027')).toBeTruthy();
  expect(screen.getByRole('button', { name: '20 Kasım 2027, Cumartesi, etkinlik: Mezuniyet' })).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Sonraki ay' })).toBeDisabled();
});

it('geçmiş ve etkinliksiz gün tam tarihle okunuyor ama düğme değil', async () => {
  at('2026-09-30T09:00:00Z');
  await render(<MonthCalendar events={[]} onOpen={jest.fn()} />);
  expect(screen.getByLabelText('29 Eylül 2026, Salı')).toBeTruthy();
  expect(screen.queryByRole('button', { name: /Eylül 2026/ })).toBeNull();
});

it('gün dönümü kulüp saatinde: UTC 21:30 ertesi gün', async () => {
  at('2026-09-30T21:30:00Z');
  await render(<MonthCalendar events={[]} onOpen={jest.fn()} />);
  expect(header('Ekim 2026')).toBeTruthy();
  expect(screen.getByLabelText('1 Ekim 2026, Perşembe, bugün')).toBeTruthy();
});

it('en büyük yazı boyutunda başlık satırı taşmıyor', async () => {
  at('2026-09-30T09:00:00Z');
  await render(<MonthCalendar events={[]} onOpen={jest.fn()} />);
  const title = screen.getByRole('header', { name: 'Eylül 2026' });
  expect(title).toHaveProp('maxFontSizeMultiplier', 1.6);
  expect(title).toHaveStyle({ flexShrink: 1 });
  expect(screen.getByText('›')).toHaveProp('maxFontSizeMultiplier', 1.3);
  expect(screen.getByText('‹')).toHaveProp('maxFontSizeMultiplier', 1.3);
});

it('ay dönümünde ileri bakılan ay kaymıyor', async () => {
  at('2026-09-30T20:50:00Z'); // kulüp saatiyle 23.50
  const onOpen = jest.fn();
  const { rerender } = await render(<MonthCalendar events={[]} onOpen={onOpen} />);
  await next();
  expect(header('Ekim 2026')).toBeTruthy();
  jest.setSystemTime(new Date('2026-09-30T21:10:00Z')); // 1 Ekim 00.10
  await rerender(<MonthCalendar events={[]} onOpen={onOpen} />);
  expect(header('Ekim 2026')).toBeTruthy();
  expect(screen.getByLabelText('1 Ekim 2026, Perşembe, bugün')).toBeTruthy();
});

it('bu aya bakarken ay dönerse yeni ay görünüyor', async () => {
  at('2026-09-30T20:50:00Z');
  const onOpen = jest.fn();
  const { rerender } = await render(<MonthCalendar events={[]} onOpen={onOpen} />);
  jest.setSystemTime(new Date('2026-09-30T21:10:00Z'));
  await rerender(<MonthCalendar events={[]} onOpen={onOpen} />);
  expect(header('Ekim 2026')).toBeTruthy();
  expect(screen.getByRole('button', { name: 'Önceki ay' })).toBeDisabled();
});

it('iki etkinlikli günde hücre ilkini açıyor ve onu söylüyor', async () => {
  at('2026-09-30T09:00:00Z');
  const onOpen = jest.fn();
  await render(
    <MonthCalendar
      events={[
        event('e1', 'Hackathon', '2026-10-12T18:00:00+03:00'),
        event('e2', 'Atölye', '2026-10-12T20:00:00+03:00'),
      ]}
      onOpen={onOpen}
    />,
  );
  await next();
  await fireEvent.press(
    screen.getByRole('button', { name: '12 Ekim 2026, Pazartesi, etkinlik: Hackathon' }),
  );
  expect(onOpen).toHaveBeenCalledWith('e1');
  expect(screen.queryByRole('button', { name: /Atölye/ })).toBeNull();
});
