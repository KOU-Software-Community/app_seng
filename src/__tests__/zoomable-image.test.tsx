import { act, fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { State } from 'react-native-gesture-handler';
import { fireGestureHandler, getByGestureTestId } from 'react-native-gesture-handler/jest-utils';

import { clampOffset, isBackdropTap, ZoomableImage } from '../components/ZoomableImage';

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

// Kadraj 390×844; yatay fotoğraf kadrajda 390×260 → y 292…552, üstte ve altta soluk alan.
it.each([
  [195, 100, true],
  [195, 280, false], // fotoğrafın 24 pt yakınında: ıskalama kapatmıyor
  [195, 400, false], // fotoğrafın üstünde
  [195, 600, true],
])('yatay fotoğrafta isBackdropTap(%p, %p) → %p', (x, y, want) => {
  expect(isBackdropTap(x, y, 390, 844, 390, 260)).toBe(want);
});

// Dikey fotoğraf kadrajda 300×844 → yanlarda 45'er pt soluk alan.
it.each([
  [10, 400, true],
  [30, 400, false], // pay içinde
  [380, 400, true],
])('dikey fotoğrafta isBackdropTap(%p, %p) → %p', (x, y, want) => {
  expect(isBackdropTap(x, y, 390, 844, 300, 844)).toBe(want);
});

describe('soluk alana dokunuş', () => {
  const tap = (x: number, y: number) =>
    fireGestureHandler(getByGestureTestId('foto-0-tap'), [
      { state: State.BEGAN, x, y },
      { state: State.ACTIVE, x, y },
      { state: State.END, x, y },
    ]);

  // Yatay fotoğraf (1200×800): görsel yüklenince kadrajdaki boyu belli oluyor.
  async function landscape(onBackdropPress: () => void) {
    const { root } = await render(
      <ZoomableImage
        uri="https://ornek.com/a.jpg"
        width={390}
        height={844}
        onZoomChange={jest.fn()}
        onBackdropPress={onBackdropPress}
        accessibilityLabel="Fotoğraf 1 / 1"
        testID="foto-0"
      />,
    );
    const [image] = root!.queryAll((node) => node.type === 'ViewManagerAdapter_ExpoImage');
    await fireEvent(image, 'load', { nativeEvent: { source: { width: 1200, height: 800 } } });
  }

  it('fotoğrafın dışına tek dokunuş kapatıyor', async () => {
    const onBackdropPress = jest.fn();
    await landscape(onBackdropPress);
    tap(195, 100);
    await act(async () => {});
    expect(onBackdropPress).toHaveBeenCalledTimes(1);
  });

  it('fotoğrafa ya da payın içine dokunuş kapatmıyor', async () => {
    const onBackdropPress = jest.fn();
    await landscape(onBackdropPress);
    tap(195, 400);
    tap(195, 280);
    await act(async () => {});
    expect(onBackdropPress).not.toHaveBeenCalled();
  });

  // Yakınken kapatmamanın iki koruması var, ikisi de ayrı sınanıyor: yakınlık React'e
  // ulaşınca hareket kapanıyor (`enabled(!zoomed)`; `fireGestureHandler` kapalı hareketi
  // atlıyor) ve ondan önce gelen dokunuşu `saved.value <= 1` durduruyor.
  it('yakınken dokunuş kapatmıyor, dokunma hareketi kapalı', async () => {
    const onBackdropPress = jest.fn();
    await landscape(onBackdropPress);
    fireGestureHandler(getByGestureTestId('foto-0-pinch'), [
      { state: State.BEGAN, scale: 1 },
      { state: State.ACTIVE, scale: 2 },
      { state: State.END, scale: 2 },
    ]);
    await act(async () => {});
    expect(getByGestureTestId('foto-0-tap').config.enabled).toBe(false);
    tap(195, 100);
    await act(async () => {});
    expect(onBackdropPress).not.toHaveBeenCalled();
  });

  it('yakınlaşma ekrana yansımadan gelen dokunuş da kapatmıyor', async () => {
    // Cihazdaki yarış: dokunuş UI iş parçacığında, React yeniden çizmeden önce geliyor.
    const onBackdropPress = jest.fn();
    await landscape(onBackdropPress);
    fireGestureHandler(getByGestureTestId('foto-0-pinch'), [
      { state: State.BEGAN, scale: 1 },
      { state: State.ACTIVE, scale: 2 },
      { state: State.END, scale: 2 },
    ]);
    tap(195, 100);
    await act(async () => {});
    expect(onBackdropPress).not.toHaveBeenCalled();
  });
});
