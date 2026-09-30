import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

import type { ClubEvent } from '../data';

/**
 * Takvim sekmesi: ay takvimi her zaman görünüyor — boşken ve okuma düştüğünde de.
 * Altında liste ya da boş durumun kartı; Liste/Takvim düğmesi yok.
 */

let mockContent: { events: ClubEvent[]; error: string | null; loading: boolean; refresh: () => void } = {
  events: [],
  error: null,
  loading: false,
  refresh: () => {},
};
jest.mock('expo-router', () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock('../content', () => ({ useContent: () => mockContent }));
jest.mock('../store', () => ({ useAppStore: () => ({ registrationFor: () => undefined }) }));
jest.mock('../useOpenEvent', () => ({ useOpenEvent: () => jest.fn() }));

const METRICS: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const HACKATHON = {
  id: 'e1', startsAt: '2026-10-12T18:00:00+03:00', day: '12', mon: 'EKİ', wd: 'Pzt',
  monthKey: 'EKİM 2026', title: 'Hackathon', time: '18.00', short: '', tag: 'Yarışma',
  soon: false, badge: '', desc: '', tags: [], speaker: '', speakerRole: '', facts: [],
} as unknown as ClubEvent;

const Takvim = (require('../../app/(tabs)/takvim') as typeof import('../../app/(tabs)/takvim')).default;

async function show(content: Partial<typeof mockContent>) {
  mockContent = { events: [], error: null, loading: false, refresh: () => {}, ...content };
  await render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <Takvim />
    </SafeAreaProvider>,
  );
}

beforeEach(() => jest.useFakeTimers({ now: new Date('2026-09-30T09:00:00Z') }));
afterEach(() => jest.useRealTimers());

// 30 sn: ekranın tamamını çizen testler soğuk dönüştürme önbelleğinde (CI) yavaş.
it('boşken ay takvimi ve "Takvim henüz boş" birlikte; Liste/Takvim düğmesi yok', async () => {
  await show({});
  expect(screen.getByRole('header', { name: 'Eylül 2026' })).toBeTruthy();
  expect(screen.getByText('Takvim henüz boş')).toBeTruthy();
  expect(screen.queryByText('Liste')).toBeNull();
}, 30000);

it('okuma düşünce takvim ve "Etkinlikler yüklenemedi"', async () => {
  await show({ error: 'ağ yok' });
  expect(screen.getByRole('header', { name: 'Eylül 2026' })).toBeTruthy();
  expect(screen.getByText('Etkinlikler yüklenemedi')).toBeTruthy();
}, 30000);

it('etkinlik varken takvim ve altında listedeki satırı', async () => {
  await show({ events: [HACKATHON] });
  expect(screen.getByRole('header', { name: 'Eylül 2026' })).toBeTruthy();
  expect(screen.getByText('Hackathon')).toBeTruthy();
  expect(screen.queryByText('Liste')).toBeNull();
}, 30000);

it('iki etkinlikli günde ikisi de takvimin altındaki listede', async () => {
  const atolye = { ...HACKATHON, id: 'e2', title: 'Atölye', time: '20.00' } as ClubEvent;
  await show({ events: [HACKATHON, atolye] });
  expect(screen.getByText('Hackathon')).toBeTruthy();
  expect(screen.getByText('Atölye')).toBeTruthy();
}, 30000);
