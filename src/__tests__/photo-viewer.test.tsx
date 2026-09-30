import { act, fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { Dimensions } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { fireGestureHandler, getByGestureTestId } from 'react-native-gesture-handler/jest-utils';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

import { PhotoViewer } from '../components/PhotoViewer';

const METRICS: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const PHOTOS = ['https://ornek.com/1.jpg', 'https://ornek.com/2.jpg', 'https://ornek.com/3.jpg'];
const { width } = Dimensions.get('window');
const viewer = (index: number | null, onClose = jest.fn()) => (
  <SafeAreaProvider initialMetrics={METRICS}>
    <PhotoViewer photos={PHOTOS} index={index} onClose={onClose} />
  </SafeAreaProvider>
);

it('dokunulan fotoğrafta açılıyor, tuş yok, kaydırınca sayaç ilerliyor, kapanıyor', async () => {
  const onClose = jest.fn();
  await render(viewer(1, onClose));
  expect(screen.getByText('2 / 3')).toBeTruthy();
  expect(screen.queryByLabelText('Önceki')).toBeNull();
  expect(screen.queryByLabelText('Sonraki')).toBeNull();
  await fireEvent(screen.getByTestId('foto-liste'), 'momentumScrollEnd', {
    nativeEvent: { contentOffset: { x: 2 * width, y: 0 } },
  });
  expect(screen.getByText('3 / 3')).toBeTruthy();
  await fireEvent.press(screen.getByLabelText('Kapat'));
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('yakınken liste kaymıyor', async () => {
  await render(viewer(0));
  expect(screen.getByTestId('foto-liste').props.scrollEnabled).not.toBe(false);
  fireGestureHandler(getByGestureTestId('foto-0-pinch'), [
    { state: State.BEGAN, scale: 1 },
    { state: State.ACTIVE, scale: 2 },
    { state: State.END, scale: 2 },
  ]);
  await act(async () => {});
  expect(screen.getByTestId('foto-liste').props.scrollEnabled).toBe(false);
});

it('başka bir fotoğrafla yeniden açılınca sayaç oradan başlıyor', async () => {
  const { rerender } = await render(viewer(0));
  await rerender(viewer(null));
  await rerender(viewer(2));
  expect(screen.getByText('3 / 3')).toBeTruthy();
});
