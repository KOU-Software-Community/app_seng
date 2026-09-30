import AsyncStorage from '@react-native-async-storage/async-storage';
import { act, renderHook } from '@testing-library/react-native';

/**
 * Açılış okuması ilk render'a yetişmeyince listeleri mount effect'i dolduruyor.
 * Yavaş bir depoda olağan: `SponsorsProvider` kökte, fontlar yüklenir yüklenmez
 * mount oluyor.
 *
 * Ayrı dosya, çünkü okuma `vitrinCache` yüklenirken başlıyor: askıda tutan
 * `getItem` taklidi modül yüklenmeden kurulmalı. `vitrin-cache.test.tsx`'te olsaydı
 * onun ana sayfa testinin kopyasını da askıda bırakırdı.
 */

const SLIDES_KEY = 'kyk.vitrin.slides.v1';
const SPONSORS_KEY = 'kyk.vitrin.sponsors.v1';

let release!: (stored: Record<string, string>) => void;
const reading = new Promise<Record<string, string>>((resolve) => {
  release = resolve;
});
jest.mocked(AsyncStorage.getItem).mockImplementation(async (key: string) => (await reading)[key] ?? null);

const { useSlides } = require('../slides') as typeof import('../slides');
const { SponsorsProvider, useSponsors } = require('../sponsors') as typeof import('../sponsors');

it("okuma ilk render'a yetişmeyince mount effect'i listeleri dolduruyor", async () => {
  const { result } = await renderHook(
    () => ({ slides: useSlides().slides, sponsors: useSponsors().sponsors }),
    { wrapper: SponsorsProvider },
  );
  expect(result.current.slides).toEqual([]);
  expect(result.current.sponsors).toEqual([]);

  await act(async () => {
    release({
      [SLIDES_KEY]: JSON.stringify([
        { id: 's1', title: 'Hackathon', target: { type: 'url', url: 'https://ornek.com/' }, order: 1 },
      ]),
      [SPONSORS_KEY]: JSON.stringify([{ id: 'p1', name: 'Acme Yazılım', order: 1 }]),
    });
  });

  expect(result.current.slides.map((s) => s.title)).toEqual(['Hackathon']);
  expect(result.current.sponsors.map((s) => s.name)).toEqual(['Acme Yazılım']);
});
