import AsyncStorage from '@react-native-async-storage/async-storage';

import { toSlide, toSponsor, type Slide, type Sponsor } from './vitrinSchema';

/**
 * Slider ve sponsorların son başarılı okuması, cihazda.
 *
 * Ana sayfa bu kopyayla ilk karede çiziliyor; Firestore cevap verince liste
 * yenisiyle değişiyor, kopya da (`saveCache`). Okuma bu modül içe aktarılınca
 * başlıyor — `sponsors.tsx` kök düzende olduğu için açılışta. Ana sayfa 500 ms'lik
 * girişten sonra çizildiğinden (`app/index.tsx`) o ana kadar bitmiş oluyor.
 * Hook'un kendi effect'inde okumak slider'ı bir iki kare boş bırakıp sıçratıyordu.
 *
 * Kopya Firestore'la aynı kapıdan giriyor (`toSlide` / `toSponsor`): eski bir
 * sürümün ya da bozuk bir kaydın şekli uygulamayı düşürmüyor, kayıt atlanıyor.
 */
const KEYS = { slides: 'kyk.vitrin.slides.v1', sponsors: 'kyk.vitrin.sponsors.v1' } as const;
type Kind = keyof typeof KEYS;

const memory: Partial<Record<Kind, unknown>> = {};
let settled = false;

export const cacheReady: Promise<unknown> = Promise.all(
  (Object.keys(KEYS) as Kind[]).map(async (kind) => {
    try {
      const raw = await AsyncStorage.getItem(KEYS[kind]);
      // Açılış okuması geç biterse bu arada kaydedilmiş taze listeyi ezmesin.
      if (raw && !(kind in memory)) memory[kind] = JSON.parse(raw);
    } catch {
      // Okunamayan ya da yarım yazılmış kopya: boş başla, Firestore doldurur.
    }
  }),
).then(() => {
  settled = true;
});

/** Açılış okuması bitti mi — bittiyse ilk durum zaten kopya, bir daha kurulmuyor. */
export const cacheSettled = (): boolean => settled;

function parsed<T>(kind: Kind, to: (id: string, raw: unknown) => T | null): T[] {
  const list = memory[kind];
  if (!Array.isArray(list)) return [];
  return list.flatMap((item: unknown) => {
    const id = (item as { id?: unknown } | null)?.id;
    const value = typeof id === 'string' ? to(id, item) : null;
    return value ? [value] : [];
  });
}

export const cachedSlides = (): Slide[] => parsed('slides', toSlide);
export const cachedSponsors = (): Sponsor[] => parsed('sponsors', toSponsor);

type Lists = { slides: Slide[]; sponsors: Sponsor[] };

export function saveCache<K extends Kind>(kind: K, list: Lists[K]): void {
  memory[kind] = list;
  AsyncStorage.setItem(KEYS[kind], JSON.stringify(list)).catch(() => {});
}
