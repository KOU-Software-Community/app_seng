import { act, render, screen } from '@testing-library/react-native';
import React from 'react';
import { AccessibilityInfo } from 'react-native';

import { HomeSlider, SLIDE_INTERVAL_MS } from '../components/HomeSlider';
import type { Slide } from '../vitrinSchema';

/**
 * Slider'ın zamanlayıcısı: 4,5 saniyede bir ilerliyor, sonda başa dönüyor,
 * tek slaytta ve "hareketi azalt" açıkken hiç çalışmıyor. Noktaların seçili
 * durumu hangi slaytta olunduğunu söylüyor — kaydırmanın kendisi Jest'te
 * çizilmiyor, `ScrollView.scrollTo` bir taklit.
 */

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    useRouter: () => ({ push: jest.fn(), navigate: jest.fn() }),
    // Ekran odakta: geri çağrıyı bir kez çalıştır, temizliği sökülünce çağır.
    useFocusEffect: (cb: () => void | (() => void)) => useEffect(cb, [cb]),
  };
});

const slide = (id: string): Slide => ({
  id,
  title: `Slayt ${id}`,
  meta: '',
  order: 1,
  target: { type: 'url', url: 'https://ornek.com/' },
});

const dot = (n: number, selected: boolean) =>
  screen.queryByRole('button', { name: `${n}. slayta git`, selected });

/** Erişilebilirlik ayarları bir promise; ilk render'dan sonra çözülmesini bekle. */
const settle = () => act(async () => {});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

it('tek slaytta nokta yok', async () => {
  await render(<HomeSlider slides={[slide('a')]} />);
  await settle();
  expect(screen.queryAllByRole('button', { name: /slayta git/ })).toHaveLength(0);
  expect(screen.getByText('Slayt a')).toBeTruthy();
});

it('4,5 saniyede bir ilerliyor ve sonda başa dönüyor', async () => {
  await render(<HomeSlider slides={[slide('a'), slide('b')]} />);
  await settle();
  expect(dot(1, true)).toBeTruthy();

  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS);
  });
  expect(dot(2, true)).toBeTruthy();

  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS);
  });
  expect(dot(1, true)).toBeTruthy();
});

it('"hareketi azalt" açıkken ilerlemiyor', async () => {
  jest.mocked(AccessibilityInfo.isReduceMotionEnabled).mockResolvedValueOnce(true);
  await render(<HomeSlider slides={[slide('a'), slide('b')]} />);
  await settle();

  await act(async () => {
    jest.advanceTimersByTime(SLIDE_INTERVAL_MS * 2);
  });
  expect(dot(1, true)).toBeTruthy();
});

it('slayt sayısı azalınca dizin taşmıyor', async () => {
  const { rerender } = await render(<HomeSlider slides={[slide('a'), slide('b'), slide('c')]} />);
  await settle();
  // Adım adım: her geçiş bir sonraki zamanlayıcıyı render'dan sonra kuruyor,
  // tek bir `act` içinde iki aralık ilerletmek ikincisini hiç kurmazdı.
  for (let i = 0; i < 2; i += 1) {
    await act(async () => {
      jest.advanceTimersByTime(SLIDE_INTERVAL_MS);
    });
  }
  expect(dot(3, true)).toBeTruthy();

  await rerender(<HomeSlider slides={[slide('a'), slide('b')]} />);
  expect(dot(1, true) ?? dot(2, true)).toBeTruthy();
  expect(dot(3, true)).toBeNull();
});

it('ekran okuyucu etiketi okunur Türkçe', async () => {
  await render(<HomeSlider slides={[{ ...slide('a'), kicker: 'BUGUN', meta: '18.00 · B Blok' }]} />);
  await settle();
  expect(screen.getByRole('link', { name: 'Bugün: Slayt a. 18.00 · B Blok' })).toBeTruthy();
});
