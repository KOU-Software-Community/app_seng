import { act, fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

import { PhotoHero } from '../components/PhotoHero';
import { Txt } from '../components/ui';
import { SLIDE_INTERVAL_MS } from '../useAutoAdvance';

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return { useFocusEffect: (cb: () => void | (() => void)) => useEffect(cb, [cb]) };
});

const METRICS: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const PHOTOS = ['https://ornek.com/1.jpg', 'https://ornek.com/2.jpg', 'https://ornek.com/3.jpg'];
const hero = (photos: string[], { onOpen = jest.fn(), paused = false } = {}) => (
  <SafeAreaProvider initialMetrics={METRICS}>
    <PhotoHero photos={photos} height={280} onOpen={onOpen} paused={paused}>
      <Txt>Başlık</Txt>
    </PhotoHero>
  </SafeAreaProvider>
);
const dot = (n: number, selected: boolean) =>
  screen.queryByRole('button', { name: `${n}. fotoğrafa git`, selected });
const settle = () => act(async () => {});

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

it('her fotoğraf bir sayfa, dokununca o fotoğraf açılıyor', async () => {
  const onOpen = jest.fn();
  await render(hero(PHOTOS, { onOpen }));
  await settle();
  expect(screen.getAllByRole('button', { name: /fotoğrafa git/ })).toHaveLength(3);
  await fireEvent.press(screen.getByLabelText('Fotoğraf 2 / 3, büyüt'));
  expect(onOpen).toHaveBeenCalledWith(1);
  expect(screen.getByText('Başlık')).toBeTruthy();
});

it('etkinlik ekranında kendiliğinden ilerliyor', async () => {
  await render(hero(PHOTOS));
  await settle();
  expect(dot(1, true)).toBeTruthy();
  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS);
  });
  expect(dot(2, true)).toBeTruthy();
});

it('görüntüleyici açıkken ilerlemiyor', async () => {
  await render(hero(PHOTOS, { paused: true }));
  await settle();
  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS * 2);
  });
  expect(dot(1, true)).toBeTruthy();
});

it('tek fotoğrafta nokta yok', async () => {
  await render(hero([PHOTOS[0]]));
  await settle();
  expect(screen.queryAllByRole('button', { name: /fotoğrafa git/ })).toHaveLength(0);
  expect(screen.getByLabelText('Fotoğraf 1 / 1, büyüt')).toBeTruthy();
});

it('fotoğraf yoksa yer tutucu; dokunulacak sayfa yok, başlık duruyor', async () => {
  await render(hero([]));
  await settle();
  expect(screen.queryByLabelText(/büyüt/)).toBeNull();
  expect(screen.getByText('Başlık')).toBeTruthy();
});
