import { render, waitFor } from '@testing-library/react-native';
import React from 'react';

/**
 * Cihaz kaydının gerçekten yazıldığı.
 *
 * Bu testin varlık sebebi tek bir satır: token `useRef` ile tutulduğunda cihaz
 * dokümanı **hiç** yazılmıyordu. Ref yazmak render tetiklemiyor, dolayısıyla
 * onu okuyan efekt bir daha koşmuyor; token her zaman efektten *sonra*
 * geliyor. Hata vermiyor, log bırakmıyor — tek belirtisi hiç gelmeyen push.
 *
 * Testin kurduğu sıra tam olarak bu: token gecikmeli geliyor.
 */

const mockUpsertDevice = jest.fn(async () => {});
jest.mock('../firebaseConfig', () => ({
  isFirebaseConfigured: true,
  FIREBASE_SETUP_HINT: '',
}));

jest.mock('expo-router', () => ({ useRouter: () => ({ push: jest.fn() }) }));

jest.mock('expo-device', () => ({ isDevice: true }));

/** Token **bilerek gecikmeli**: efektler koştuktan sonra çözülüyor. */
const mockGetExpoPushToken = jest.fn(
  () => new Promise((resolve) => setTimeout(() => resolve({ data: 'ExponentPushToken[abc]' }), 20)),
);
jest.mock('expo-notifications', () => ({
  setNotificationHandler: jest.fn(),
  setNotificationChannelAsync: jest.fn(async () => {}),
  getPermissionsAsync: jest.fn(async () => ({ granted: true, canAskAgain: false })),
  requestPermissionsAsync: jest.fn(async () => ({ granted: true })),
  getExpoPushTokenAsync: () => mockGetExpoPushToken(),
  cancelAllScheduledNotificationsAsync: jest.fn(async () => {}),
  scheduleNotificationAsync: jest.fn(async () => 'id'),
  addNotificationResponseReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
  AndroidImportance: { DEFAULT: 3 },
  SchedulableTriggerInputTypes: { DAILY: 'daily', DATE: 'date' },
}));

jest.mock('../content', () => ({ useContent: () => ({ events: [] }) }));

const prefs = {
  master: true,
  categories: { Hatırlatma: true, 'AI Gündem': false },
  reminder: '1 gün önce',
  quietHours: true,
  digestHour: 8,
};
jest.mock('../store', () => ({
  useAppStore: () => ({
    registrations: [],
    notifications: prefs,
    onboardingSeen: true,
    hydrated: true,
  }),
}));

// Mock'lardan sonra: modül yüklenirken `setNotificationHandler` çağrılıyor.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { NotificationSync } = require('../notifications') as typeof import('../notifications');

afterEach(() => mockUpsertDevice.mockClear());

describe('NotificationSync — cihaz kaydı', () => {
  it('token efektlerden sonra gelse de cihaz dokümanı yazılıyor', async () => {
    await render(<NotificationSync upsertDevice={mockUpsertDevice} />);

    await waitFor(() => expect(mockUpsertDevice).toHaveBeenCalledTimes(1));
    expect(mockUpsertDevice).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'ExponentPushToken[abc]',
        master: true,
        quietHours: true,
        reminder: '1 gün önce',
      }),
    );
  });

  /** İzin reddedilirse token yok; olmayan bir token'la kayıt yazmak anlamsız. */
  it('token gelmezse hiçbir şey yazmıyor', async () => {
    mockGetExpoPushToken.mockImplementationOnce(
      () => new Promise((_r, reject) => setTimeout(() => reject(new Error('no aps-environment')), 5)),
    );

    await render(<NotificationSync upsertDevice={mockUpsertDevice} />);

    await new Promise((resolve) => setTimeout(resolve, 60));
    expect(mockUpsertDevice).not.toHaveBeenCalled();
  });
});
