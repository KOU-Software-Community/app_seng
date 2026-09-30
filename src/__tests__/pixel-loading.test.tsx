import { type QueryClient } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

import { PixelLoader } from '../components/Pixel';
import { createQueryClient, QueryProvider } from '../gundem/providers/QueryProvider';
import { DigestView } from '../gundem/screens/DigestView';
import { FeedView } from '../gundem/screens/FeedView';
import { SavedView } from '../gundem/screens/SavedView';
import { setSaved } from '../gundem/user-state/store';

/**
 * Yüklenirken yazı değil, açılıştaki kare animasyon; ekran okuyucu "Yükleniyor" okuyor.
 *
 * Her ekranın veri kaynağı hiç cevap vermeyen bir söz döndürüyor, yani ekran yükleme
 * durumunda kalıyor. Gündem'de depo kapısı (`getRepositories`) taklit; sorgular gerçek.
 */

jest.mock('expo-router', () => ({
  useRouter: () => ({ push: jest.fn(), back: jest.fn(), replace: jest.fn(), navigate: jest.fn() }),
  useLocalSearchParams: () => ({ id: 'x1' }),
}));
jest.mock('../gundem/data-access', () => {
  const never = () => new Promise(() => {});
  const repo = new Proxy({}, { get: () => never });
  return {
    ...jest.requireActual('../gundem/data-access'),
    getRepositories: () => new Proxy({}, { get: () => repo }),
  };
});
jest.mock('../sponsors', () => ({
  useSponsors: () => ({ sponsors: [], get: () => undefined, loading: true, error: null, refresh: jest.fn() }),
}));
jest.mock('../content', () => ({
  useContent: () => ({ events: [], archive: [], getEvent: () => undefined }),
}));
jest.mock('../useOpenEvent', () => ({ useOpenEvent: () => jest.fn() }));
jest.mock('../announcements', () => ({
  useAnnouncements: () => ({ get: () => undefined }),
  fetchAnnouncement: () => new Promise(() => {}),
  formatAnnouncementDate: () => '',
}));
jest.mock('../authStore', () => ({ useAuth: () => ({ user: { uid: 'u1' }, profile: null, loading: false }) }));
jest.mock('../certificates', () => ({
  sertifikalarimiGetir: () => new Promise(() => {}),
  sertifikaUrl: () => '',
  sertifikaPdfUrl: () => '',
}));

const METRICS: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

// Gerçek QueryClient'ın yedi günlük `gcTime`'ı Jest'i açık tutar. Önce iptal: hiç
// cevap vermeyen sorgu yalnız `clear()` ile bırakılınca Jest test bitince kapanmıyordu.
const clients: QueryClient[] = [];
afterEach(async () => {
  for (const client of clients.splice(0)) {
    await client.cancelQueries();
    client.clear();
  }
});

function screenWith(children: React.ReactNode) {
  const client = createQueryClient();
  clients.push(client);
  return (
    <SafeAreaProvider initialMetrics={METRICS}>
      <QueryProvider client={client}>{children}</QueryProvider>
    </SafeAreaProvider>
  );
}

it('etiket verilince yükleme çubuğu olarak okunuyor, verilmeyince süs', async () => {
  await render(<PixelLoader label="Yükleniyor" />);
  expect(screen.getByRole('progressbar', { name: 'Yükleniyor' })).toBeTruthy();
  await render(<PixelLoader />);
  expect(screen.queryByRole('progressbar')).toBeNull();
});

const route = <T,>(path: string) => (require(path) as { default: T }).default;

it.each([
  ['Bülten', () => <DigestView />],
  ['Akış', () => <FeedView />],
  ['Kaydedilenler', () => <SavedView />],
  ['Sponsorlar', () => React.createElement(route<React.ComponentType>('../../app/sponsorlar'))],
  ['Sponsor', () => React.createElement(route<React.ComponentType>('../../app/sponsor/[id]'))],
  ['Duyuru', () => React.createElement(route<React.ComponentType>('../../app/duyuru/[id]'))],
  ['Sertifikalarım', () => React.createElement(route<React.ComponentType>('../../app/sertifikalarim'))],
])('%s yüklenirken kare animasyon, yazı yok', async (_name, element) => {
  // Kaydedilenler yalnız kayıtlı bir haber varken getiriyor.
  await setSaved('a1', true);
  await render(screenWith(element()));
  expect(await screen.findByRole('progressbar', { name: 'Yükleniyor' })).toBeTruthy();
  expect(screen.queryByText(/YUKLENIYOR|YÜKLENİYOR|^Yükleniyor$/)).toBeNull();
}, 30000);
