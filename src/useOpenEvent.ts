import { useRouter } from 'expo-router';
import { useCallback } from 'react';

/**
 * Etkinlik detayını açar.
 *
 * Eskiden 460 ms'lik bir yükleme perdesinin arkasından açılıyordu; yorumda
 * "gerçek bir fetch buraya gelecek" yazıyordu. Gelmedi ve gelmeyecek —
 * `useEvent(id)` zaten bellekteki listeden okuyor, ortada beklenecek bir şey
 * yok. Perde her dokunuşa yarım saniye ekliyordu.
 */
export function useOpenEvent() {
  const router = useRouter();
  return useCallback((id: string) => router.push(`/etkinlik/${id}`), [router]);
}
