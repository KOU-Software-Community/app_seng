import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

import { PixelRefresh } from '../components/Pixel';

/**
 * Aşağı çekip yenilerken RN'in göstergesi yerine ilk açılıştaki `PixelLoader`:
 * yenilenirken ekranın üstünde, bitince yok. Arşiv, altı ekranın temsilcisi.
 */

jest.mock('expo-router', () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock('../content', () => ({
  useContent: () => ({ events: [], archive: [], error: null, loading: true, refresh: jest.fn() }),
}));

const METRICS: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

it('yenilenirken üstte PixelLoader, bitince hiçbir şey', async () => {
  const { rerender } = await render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <PixelRefresh visible />
    </SafeAreaProvider>,
  );
  expect(screen.getByLabelText('Yenileniyor')).toBeTruthy();
  await rerender(
    <SafeAreaProvider initialMetrics={METRICS}>
      <PixelRefresh visible={false} />
    </SafeAreaProvider>,
  );
  expect(screen.queryByLabelText('Yenileniyor')).toBeNull();
});

it('Arşiv yüklenirken göstergeyi gösteriyor', async () => {
  const Arsiv = (require('../../app/(tabs)/arsiv') as typeof import('../../app/(tabs)/arsiv')).default;
  await render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <Arsiv />
    </SafeAreaProvider>,
  );
  expect(screen.getByLabelText('Yenileniyor')).toBeTruthy();
}, 30000);
