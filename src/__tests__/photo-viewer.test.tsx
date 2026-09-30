import { act, fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { DeviceEventEmitter, Dimensions } from 'react-native';
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

// RNGH `TouchEventType.TOUCHES_DOWN`; paket bu sabiti dışa aktarmıyor.
const TOUCHES_DOWN = 1;

it('ikinci parmak iner inmez liste duruyor, yakınlaşmadan biterse yine kayıyor', async () => {
  // Android'de yatay liste, iki parmak yakınlaşma sayılacak kadar açılmadan ilk
  // parmağın kaymasıyla dokunmayı alıp hareketi iptal ediyor: kilit beklenemez.
  await render(viewer(0));
  const { handlerTag } = getByGestureTestId('foto-0-pinch');
  const scrollEnabled = () => screen.getByTestId('foto-liste').props.scrollEnabled;

  await act(async () => {
    DeviceEventEmitter.emit('onGestureHandlerEvent', {
      handlerTag,
      eventType: TOUCHES_DOWN,
      numberOfTouches: 2,
      allTouches: [],
      changedTouches: [],
    });
  });
  expect(scrollEnabled()).toBe(false);

  await act(async () => {
    DeviceEventEmitter.emit('onGestureHandlerEvent', { handlerTag, oldState: State.BEGAN, state: State.FAILED });
  });
  expect(scrollEnabled()).not.toBe(false);
});

it('üst çubuk yalnız kendi düğmesini tutuyor, altındaki görsele dokunma geçiyor', async () => {
  await render(viewer(0));
  expect(screen.getByLabelText('Kapat').parent?.props.pointerEvents).toBe('box-none');
});

it('başka bir fotoğrafla yeniden açılınca sayaç oradan başlıyor', async () => {
  const { rerender } = await render(viewer(0));
  await rerender(viewer(null));
  await rerender(viewer(2));
  expect(screen.getByText('3 / 3')).toBeTruthy();
});

it('soluk alana dokunuş görüntüleyiciyi kapatıyor', async () => {
  const onClose = jest.fn();
  const { root } = await render(viewer(0, onClose));
  // Pencere 750×1334; yatay fotoğraf kadrajda 750×500 → üstte 417 pt soluk alan.
  const [image] = root!.queryAll((node) => node.type === 'ViewManagerAdapter_ExpoImage');
  await fireEvent(image, 'load', { nativeEvent: { source: { width: 1200, height: 800 } } });
  fireGestureHandler(getByGestureTestId('foto-0-tap'), [
    { state: State.BEGAN, x: 375, y: 100 },
    { state: State.ACTIVE, x: 375, y: 100 },
    { state: State.END, x: 375, y: 100 },
  ]);
  await act(async () => {});
  expect(onClose).toHaveBeenCalledTimes(1);
});
