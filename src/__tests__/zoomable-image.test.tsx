import { act, render } from '@testing-library/react-native';
import React from 'react';
import { State } from 'react-native-gesture-handler';
import { fireGestureHandler, getByGestureTestId } from 'react-native-gesture-handler/jest-utils';

import { clampOffset, ZoomableImage } from '../components/ZoomableImage';

it.each([
  [200, 2, 300, 150],
  [-200, 2, 300, -150],
  [50, 2, 300, 50],
  [80, 1, 300, 0],
])('clampOffset(%p, %p, %p) → %p', (offset, scale, size, want) => {
  expect(clampOffset(offset, scale, size)).toBe(want);
});

// Yatay fotoğraf dikey kadrajda: sınır görselin kendi boyundan, kadrajdan değil.
it.each([
  [100, 2.5, 225, 700, 0],
  [200, 2.5, 400, 700, 150],
])('clampOffset(%p, %p, içerik %p, kadraj %p) → %p', (offset, scale, content, frame, want) => {
  expect(clampOffset(offset, scale, content, frame)).toBe(want);
});

it('iki parmakla yakınlaşınca ve çift dokunmayla geri dönünce haber veriyor', async () => {
  const onZoomChange = jest.fn();
  await render(
    <ZoomableImage
      uri="https://ornek.com/a.jpg"
      width={300}
      height={400}
      onZoomChange={onZoomChange}
      accessibilityLabel="Fotoğraf 1 / 1"
      testID="foto-0"
    />,
  );
  fireGestureHandler(getByGestureTestId('foto-0-pinch'), [
    { state: State.BEGAN, scale: 1 },
    { state: State.ACTIVE, scale: 2 },
    { state: State.END, scale: 2 },
  ]);
  await act(async () => {});
  expect(onZoomChange).toHaveBeenLastCalledWith(true);
  fireGestureHandler(getByGestureTestId('foto-0-doubleTap'), [
    { state: State.BEGAN },
    { state: State.ACTIVE },
    { state: State.END },
  ]);
  await act(async () => {});
  expect(onZoomChange).toHaveBeenLastCalledWith(false);
});
