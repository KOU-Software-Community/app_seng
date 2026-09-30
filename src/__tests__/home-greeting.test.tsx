import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

import Home from '../../app/(tabs)/index';

/**
 * Giriş yapmış kişiye adıyla hoş geldin; oturum yoksa (ya da profil henüz
 * yüklenmediyse) bugünkü karşılama. Ana sayfanın öteki kaynakları boş ve hatasız.
 */

jest.mock('expo-router', () => {
  const { useEffect } = require('react');
  return {
    useRouter: () => ({ push: jest.fn(), navigate: jest.fn() }),
    useFocusEffect: (cb: () => void | (() => void)) => useEffect(cb, [cb]),
  };
});
jest.mock('../content', () => ({
  useContent: () => ({ events: [], archive: [], error: null, loading: false, refresh: jest.fn() }),
}));
jest.mock('../announcements', () => ({
  useAnnouncements: () => ({ announcements: [], error: null, loading: false, refresh: jest.fn() }),
  formatAnnouncementDate: () => '',
}));
jest.mock('../store', () => ({ useAppStore: () => ({ registrations: [] }) }));
jest.mock('../slides', () => ({ useSlides: () => ({ slides: [], refresh: jest.fn() }) }));
jest.mock('../sponsors', () => ({ useSponsors: () => ({ sponsors: [], refresh: jest.fn() }) }));
const mockAuth: { user: unknown; profile: { adSoyad: string } | null; loading: boolean } = {
  user: null,
  profile: null,
  loading: false,
};
jest.mock('../authStore', () => ({ useAuth: () => mockAuth }));

const METRICS: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const show = () =>
  render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <Home />
    </SafeAreaProvider>,
  );

it('giriş yapmış kişiye adıyla hoş geldin diyor', async () => {
  mockAuth.profile = { adSoyad: 'ahmet yılmaz' };
  await show();
  expect(screen.getByText('Ahmet, hoş geldin 👋')).toBeTruthy();
}, 30000);

it('oturum yoksa bugünkü karşılama', async () => {
  mockAuth.profile = null;
  await show();
  expect(screen.getByText('Hoş geldin 👋')).toBeTruthy();
}, 30000);
