import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';

import { PrizeProviders } from '../components/PrizeProviders';

/**
 * Apple 5.3.2: çekilişin sponsoru geliştiricinin kendisi. `raffleLegal.ts`
 * "ödülü sağlayan taraf çekilişin sponsoru değildir" diyor. Bu blok çekiliş
 * etkinliğinin ekranında duruyor; ekrana yazdığı hiçbir şey "sponsor"
 * kelimesini taşıyamaz — bir yeniden düzenlemede "Sponsor: X" olursa ret
 * sebebi geri gelir.
 */

const mockPush = jest.fn();
jest.mock('expo-router', () => ({ useRouter: () => ({ push: mockPush }) }));

beforeEach(() => mockPush.mockClear());

it('"Ödülü sağlayan" yazıyor, hiçbir yerde "sponsor" yazmıyor', async () => {
  await render(<PrizeProviders providers={[{ id: 's1', name: 'Örnek A.Ş.' }]} />);
  expect(screen.getByText('Ödülü sağlayan')).toBeTruthy();
  expect(screen.getByText('Örnek A.Ş.')).toBeTruthy();
  expect(JSON.stringify(screen.toJSON())).not.toMatch(/sponsor/i);
});

it('dokununca kurumun sayfası açılıyor', async () => {
  await render(<PrizeProviders providers={[{ id: 's1', name: 'Örnek A.Ş.' }]} />);
  fireEvent.press(screen.getByRole('button', { name: 'Ödülü sağlayan: Örnek A.Ş.' }));
  expect(mockPush).toHaveBeenCalledWith('/sponsor/s1');
});

it('kurum yoksa hiçbir şey çizmiyor', async () => {
  await render(<PrizeProviders providers={[]} />);
  expect(screen.toJSON()).toBeNull();
});
