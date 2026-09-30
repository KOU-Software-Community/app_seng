import { act, fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

import { SLIDE_INTERVAL_MS } from '../useAutoAdvance';

/**
 * Etkinlik ekranında hero, alttaki şerit ve tam ekran görüntüleyici birlikte:
 * ikisi de aynı görüntüleyiciyi açıyor, görüntüleyici açıkken hero kaymıyor.
 */

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    useLocalSearchParams: () => ({ id: 'e1' }),
    useRouter: () => ({ push: jest.fn(), back: jest.fn(), replace: jest.fn() }),
    useFocusEffect: (cb: () => void | (() => void)) => useEffect(cb, [cb]),
  };
});
jest.mock('../content', () => ({
  useEvent: () => mockEvent,
  useContent: () => ({ getRaffle: () => undefined, registeredCount: () => 0 }),
}));
jest.mock('../store', () => ({
  useAppStore: () => ({ registrationFor: () => undefined, raffleEntryFor: () => undefined, syncPending: jest.fn() }),
}));
jest.mock('../sponsors', () => ({ useSponsors: () => ({ sponsors: [] }) }));

const METRICS: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const mockEvent = {
  id: 'e1', startsAt: '2020-01-01T18:00:00+03:00', day: '01', mon: 'OCA', wd: 'Çar',
  monthKey: '2020-01', title: 'Hackathon', time: '18.00', short: '', tag: 'Atölye',
  soon: false, badge: 'ARSIV', desc: '', tags: [], speaker: '', speakerRole: '', facts: [],
  photos: ['https://ornek.com/1.jpg', 'https://ornek.com/2.jpg', 'https://ornek.com/3.jpg'],
};
const selectedDot = (n: number) => screen.getByRole('button', { name: `${n}. fotoğrafa git`, selected: true });

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

// 30 sn, öteki ağır render testleri gibi: soğuk dönüştürme önbelleğinde (CI) ekran ağacı yavaş.
it('ana fotoğrafa dokununca görüntüleyici o fotoğrafta açılıyor; açıkken hero durur, kapanınca devam eder; şerit de aynı görüntüleyiciyi açıyor', async () => {
  const Detail = (require('../../app/etkinlik/[id]') as typeof import('../../app/etkinlik/[id]')).default;
  await render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <Detail />
    </SafeAreaProvider>,
  );
  await act(async () => {});
  expect(screen.getByText('Fotoğraflar')).toBeTruthy();

  await fireEvent.press(screen.getByLabelText('Fotoğraf 2 / 3, büyüt'));
  expect(screen.getByText('2 / 3')).toBeTruthy();
  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS);
  });
  expect(selectedDot(1)).toBeTruthy();

  await fireEvent.press(screen.getByLabelText('Kapat'));
  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS);
  });
  expect(selectedDot(2)).toBeTruthy();

  await fireEvent.press(screen.getByLabelText('Fotoğraf 3'));
  expect(screen.getByText('3 / 3')).toBeTruthy();
}, 30000);
