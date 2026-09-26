import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

import HesapRoute from '../../app/(tabs)/hesap';

/**
 * Hesabım satırları ve KULÜP grubu.
 *
 * `SatirLink`'e `accessibilityLabel` verilince React Native çocuk metinleri
 * birleştirip okumayı bırakıyor: satırın ipucu ("Kulübü destekleyen kurumlar")
 * ayrıca `accessibilityHint` olarak verilmezse ekran okuyucu için sessizce
 * kayboluyor — ve bu, mevcut satırları da (bildirim ayarları, yasal metinler)
 * etkiliyordu. Son incelemede bulundu.
 *
 * KULÜP grubu oturum yokken de görünmeli: sponsorlar hesaba bağlı değil
 * (Guideline 5.1.1(v)).
 */

const mockPush = jest.fn();
jest.mock('expo-router', () => ({ useRouter: () => ({ push: mockPush, navigate: jest.fn() }) }));
jest.mock('../auth', () => ({ signOut: jest.fn(), currentUser: () => null }));
jest.mock('../authStore', () => ({
  useAuth: () => ({ user: null, profile: null, loading: false, emailVerified: false, reloadProfile: jest.fn() }),
}));
jest.mock('../store', () => ({ useAppStore: () => ({ registrations: [] }) }));
jest.mock('../content', () => ({ useContent: () => ({ events: [], archive: [] }) }));

const METRICS: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const mount = () =>
  render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <HesapRoute />
    </SafeAreaProvider>,
  );

beforeEach(() => mockPush.mockClear());

it('oturum yokken KULÜP → Sponsorlarımız görünüyor ve sponsorlar ekranını açıyor', async () => {
  await mount();
  expect(screen.getByText('KULÜP')).toBeTruthy();
  fireEvent.press(screen.getByRole('button', { name: 'Sponsorlarımız' }));
  expect(mockPush).toHaveBeenCalledWith('/sponsorlar');
});

it('satır etiketi ipucunu yutmuyor — ekran okuyucu ipucunu da okuyor', async () => {
  await mount();
  expect(screen.getByRole('button', { name: 'Sponsorlarımız' }).props.accessibilityHint).toBe(
    'Kulübü destekleyen kurumlar',
  );
  expect(screen.getByRole('button', { name: 'Bildirim ayarları' }).props.accessibilityHint).toBe(
    'Neyin bildirimini alacağını seç',
  );
});
