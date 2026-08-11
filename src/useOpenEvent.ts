import { useRouter } from 'expo-router';
import { useCallback } from 'react';

import { useLoading } from './store';

/**
 * Opens an event detail behind the pixel loading scrim.
 *
 * The design deliberately holds a short beat before the detail appears — it is
 * where a real fetch of the event would go, so the timing is kept as-is.
 */
export function useOpenEvent() {
  const router = useRouter();
  const { runWithLoader } = useLoading();

  return useCallback(
    (id: string) => {
      runWithLoader(() => router.push(`/etkinlik/${id}`));
    },
    [router, runWithLoader],
  );
}
