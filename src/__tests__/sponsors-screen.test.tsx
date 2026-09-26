import { act, render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

import SponsorsRoute from '../../app/sponsorlar';
import { SponsorsProvider } from '../sponsors';

/**
 * Kurallar yayınlanmadan ya da yapılandırmasız çıkan bir sürümde sponsor
 * okuması düşer. Ekran bunu "Henüz sponsor yok" diye göstermemeli — bir
 * bağlantı sorunu boş bir kulüp gibi görünürdü — ve "Sponsor ol" kartı her
 * durumda durmalı.
 *
 * Jest'te sağlayıcı her durumda hata yolundan geçiyor: yapılandırma yoksa
 * "yapılandırma eksik", varsa dinamik `import('./firebase')` Jest'te
 * çalışmadığı için okuma reddediliyor. İkisi de cihazdaki "kural yayınlanmamış"
 * durumuyla aynı dalı sınıyor.
 */

jest.mock('expo-router', () => ({ useRouter: () => ({ push: jest.fn(), back: jest.fn() }) }));

const METRICS: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

it('okuma düşünce hata şeridi ve "Sponsor ol" kartı, "Henüz sponsor yok" değil', async () => {
  await render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <SponsorsProvider>
        <SponsorsRoute />
      </SponsorsProvider>
    </SafeAreaProvider>,
  );
  // Reddedilen okumanın sonucu bir sonraki mikro görevde geliyor.
  await act(async () => {});

  expect(screen.getByText('Güncel içeriğe ulaşılamadı')).toBeTruthy();
  expect(screen.getByRole('button', { name: /İletişime geç/ })).toBeTruthy();
  expect(screen.queryByText('Henüz sponsor yok')).toBeNull();
});
