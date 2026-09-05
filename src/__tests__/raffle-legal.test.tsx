import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import { SafeAreaProvider, type Metrics } from 'react-native-safe-area-context';

import RaffleRulesRoute from '../../app/cekilis-kurallari';
import { RaffleNotice } from '../components/RaffleNotice';
import {
  APPLE_DISCLAIMER,
  OFFICIAL_RULES,
  ORGANIZER_LINE,
  RAFFLE_CLUB,
  RAFFLE_CONTACT_EMAIL,
  RAFFLE_ORGANIZER,
  SCOPE_LINE,
} from '../raffleLegal';

/**
 * Guideline 5.3.1 / 5.3.2 beyanı.
 *
 * Uygulama bir kez çekiliş yüzünden reddedildi ve sebebi bir kod hatası
 * değildi — beyan yoktu. Bu yüzden buradaki iddialar "fonksiyon doğru
 * hesaplıyor mu" değil, **"cümle gerçekten ekranda mı"**: reddi geri getirecek
 * tek şey bir yeniden düzenlemede bu bloğun kaybolması.
 */

const METRICS: Metrics = {
  frame: { x: 0, y: 0, width: 390, height: 844 },
  insets: { top: 47, left: 0, right: 0, bottom: 34 },
};

// `jest.mock` yukarı taşınıyor, o yüzden fabrikanın kapsam dışından
// okuyabileceği tek isim `mock` ile başlayanlar.
const mockPush = jest.fn();
jest.mock('expo-router', () => ({
  useRouter: () => ({ push: mockPush, back: jest.fn() }),
}));

/**
 * Elle `unmount()` **çağrılmıyor**, ve bu bilerek.
 *
 * Ölçüldü: her testin sonunda `await unmount()` varken bu dosyadaki ilk render
 * geçiyor, sonrakiler boş ağaç buluyordu — kurallar sayfası testi tek başına
 * (`-t`) yeşil, dosyayla birlikte kırmızı. RNTL 14 kendi `afterEach`
 * temizliğini zaten bekletiyor; üstüne bir de elle sökmek çakışan act()
 * kapsamları üretiyor. Depodaki eski kayıt "unmount'u beklemeyi unutma" diyor;
 * doğrusu bu dosyada **hiç çağırmamak**.
 */
const mount = (node: React.ReactElement) =>
  render(<SafeAreaProvider initialMetrics={METRICS}>{node}</SafeAreaProvider>);

beforeEach(() => mockPush.mockClear());

describe('çekiliş beyanı — metin', () => {
  /**
   * Apple'ın cümlesi kelimesi kelimesine isteniyor. Yeniden yazılırsa ("Apple
   * ile ilgisi yoktur" gibi) beyan hâlâ doğru olur ama incelemecinin aradığı
   * kalıp olmaz.
   */
  it('Apple feragati birebir taşınıyor', () => {
    expect(APPLE_DISCLAIMER).toBe(
      'Apple bu çekilişin sponsoru değildir ve çekilişle hiçbir şekilde bağlantılı değildir.',
    );
  });

  /**
   * Düzenleyen adı App Store Connect'teki takım adıyla aynı olmalı. Türkçe
   * aksanlı hâline "düzeltmek" beyanı mağazadaki isimden ayırır — ve bu,
   * düzeltiyorum sanarak yapılacak bir hata.
   */
  it('düzenleyen App Store Connect takım adı, kişisel hesap adı değil', () => {
    expect(RAFFLE_ORGANIZER).toBe('Abdulkadir IVENC');
    expect(ORGANIZER_LINE).toContain('Abdulkadir IVENC');
    expect(ORGANIZER_LINE).not.toContain('Abdülkadir');
    expect(ORGANIZER_LINE).not.toContain('İvenç');
  });

  it('kart gövdesi kapsamı, ücretsizliği ve rastgeleliği birden söylüyor', () => {
    expect(SCOPE_LINE).toContain(RAFFLE_CLUB);
    expect(SCOPE_LINE).toContain('ücretsiz');
    expect(SCOPE_LINE).toContain('rastgele');
  });

  it('kulüp düzenleyen olarak değil, kapsam olarak geçiyor', () => {
    expect(ORGANIZER_LINE).not.toContain(RAFFLE_CLUB);
  });

  /**
   * 5.3.2: çekiliş uygulamanın içinde çalışmıyor. Kurallar sayfası bunu açıkça
   * söylemek zorunda, çünkü söylemezse incelemeci uygulamanın çektiğini varsayar.
   */
  it('kurallar, çekilişin uygulama dışında yapıldığını söylüyor', () => {
    const draw = OFFICIAL_RULES.find((s) => s.heading === 'Kazananlar nasıl belirlenir');
    const text = draw?.paragraphs.join(' ') ?? '';
    expect(text).toContain('uygulamanın içinde yapılmaz');
    expect(text).toContain('uygulama dışında');
  });

  /**
   * Ödülü sağlayan üçüncü taraflar bu kulüpte kural, istisna değil. Apple'ın
   * ayrımı net: sağlayan taraf sponsor değildir.
   */
  it('ödül sağlayıcı, düzenleyenden ayrı tutuluyor', () => {
    const prizes = OFFICIAL_RULES.find((s) => s.heading.startsWith('Ödüller'));
    const text = prizes?.paragraphs.join(' ') ?? '';
    expect(text).toContain('üçüncü taraf');
    expect(text).toContain('sponsoru, düzenleyicisi veya yürütücüsü değildir');
  });

  it('iletişim kanalı var', () => {
    const contact = OFFICIAL_RULES.find((s) => s.heading === 'İletişim');
    expect(contact?.paragraphs.join(' ')).toContain(RAFFLE_CONTACT_EMAIL);
  });
});

describe('RaffleNotice — kartta görünen blok', () => {
  it('dört zorunlu beyanı da çiziyor', async () => {
    await mount(<RaffleNotice />);

    expect(screen.getByText(ORGANIZER_LINE)).toBeTruthy();
    expect(screen.getByText(SCOPE_LINE)).toBeTruthy();
    expect(screen.getByText(APPLE_DISCLAIMER)).toBeTruthy();
    expect(screen.getByText('Resmî Çekiliş Kuralları →')).toBeTruthy();
  });

  it('bağlantı kurallar sayfasına gidiyor', async () => {
    await mount(<RaffleNotice />);

    fireEvent.press(screen.getByText('Resmî Çekiliş Kuralları →'));
    expect(mockPush).toHaveBeenCalledWith('/cekilis-kurallari');
  });
});

describe('Resmî Çekiliş Kuralları sayfası', () => {
  it('her bölümü çiziyor', async () => {
    await mount(<RaffleRulesRoute />);

    for (const section of OFFICIAL_RULES) {
      expect(screen.getByText(section.heading.toLocaleUpperCase('tr'))).toBeTruthy();
    }
  });

  it('Apple feragatini sayfada da taşıyor', async () => {
    await mount(<RaffleRulesRoute />);
    expect(screen.getByText(APPLE_DISCLAIMER)).toBeTruthy();
  });
});
