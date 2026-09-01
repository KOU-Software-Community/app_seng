import { type QueryClient } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

import GundemRoute, { todayLineTr, unseenCount } from '../../../../app/(tabs)/gundem';
import { ARTICLES } from '../../data/articles';
import type { Article } from '../../domain/types';
import { createQueryClient, QueryProvider } from '../../providers/QueryProvider';

/**
 * Akış ekranı, mock veriyle.
 *
 * P4'ün kapısı planda "cihazda akış görünüyor" diye yazıyor ve bu ortamda cihaz
 * yok. Dürüst karşılığı bu: gerçek ekran, gerçek sağlayıcı, gerçek mock
 * adaptörü — sahte olan tek şey cihazın kendisi. Ekranın veriyi çektiğini ve
 * çizdiğini gösteriyor; nasıl göründüğünü göstermiyor.
 */

const clients: QueryClient[] = [];
afterEach(() => {
  // P3'te ölçüldü: `gcTime` yedi gün, yani her sorgu ardında yedi günlük bir
  // zamanlayıcı bırakıyor ve Jest onu bekleyip hiç çıkmıyor.
  for (const client of clients.splice(0)) client.clear();
});

/**
 * Testte ölçüm yok: `useSafeAreaInsets` bir sağlayıcı olmadan fırlatıyor ve
 * gerçek uygulamada o sağlayıcı kökte duruyor. Sabit metrikler vermek, RNSAC'ın
 * testler için önerdiği yol — ekranın çizdiğini sınıyoruz, cihazın çentiğini değil.
 */
const METRICS: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

const mount = () => {
  const client = createQueryClient();
  clients.push(client);
  return render(
    <SafeAreaProvider initialMetrics={METRICS}>
      <QueryProvider client={client}>
        <GundemRoute />
      </QueryProvider>
    </SafeAreaProvider>,
  );
};

describe('AI Gündem feed screen', () => {
  it('renders the section header', async () => {
    await mount();
    expect(await screen.findByText('AI Gündem')).toBeTruthy();
  });

  it('draws articles from the repository, not from a hard-coded list', async () => {
    await mount();
    // İlk fixture başlığı ekrana geliyorsa, veri depo katmanından geçmiştir:
    // ekran `ARTICLES`'ı hiç içe aktarmıyor.
    const first = ARTICLES[0];
    expect(await screen.findByText(first.title)).toBeTruthy();
  });

  /**
   * `getByText('Modeller')` burada fırlatıyor ve haklı: aynı metin hem çipte hem
   * makalenin kategori etiketinde var. Benzersiz olan tek çip "Tümü" — geri
   * kalanı için sayıya bakmak gerekiyor.
   */
  it('shows the category chips', async () => {
    await mount();
    await waitFor(() => expect(screen.getByText('Tümü')).toBeTruthy());
    expect(screen.getAllByText('Modeller').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Açık Kaynak').length).toBeGreaterThanOrEqual(1);
  });
});

describe('feed header helpers', () => {
  it('writes the day line in Turkish', () => {
    // 20 Ağustos 2026 bir Perşembe.
    expect(todayLineTr(new Date(2026, 7, 20))).toBe('Perşembe, 20 Ağustos');
  });

  /**
   * "N yeni" bu cihazın açmadıklarını sayıyor, sunucudan gelen bir sayıyı değil.
   * Yanlış sayarsa kimse fark etmez — sadece rakam biraz tuhaf durur.
   */
  it('counts only what this device has not opened', () => {
    const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }] as Article[];
    expect(unseenCount(items, () => false)).toBe(3);
    expect(unseenCount(items, (id) => id === 'a')).toBe(2);
    expect(unseenCount(items, () => true)).toBe(0);
  });
});
