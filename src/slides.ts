import { useEffect, useMemo, useState } from 'react';

import { todayLocal } from './eventSchema';
import { isFirebaseConfigured } from './firebaseConfig';
import { visibleSlides, type Slide } from './vitrinSchema';

/**
 * Ana sayfanın slaytları. Tek tüketici ana sayfa, o yüzden sağlayıcı yok.
 *
 * Bitiş tarihi okuma ve yenileme anında değerlendiriliyor (`nonce` bağımlılık) —
 * takvimdeki `splitByDate` ile aynı: gece yarısını açık geçiren uygulama slaytı
 * bir sonraki yenilemeye kadar gösterir. Panel süresi dolanı zaten siliyor.
 */
export function useSlides() {
  const [all, setAll] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setError('Uygulama yapılandırması eksik.');
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    import('./firebase')
      .then(({ fetchSlides }) => fetchSlides())
      .then((list) => {
        if (cancelled) return;
        setAll(list);
        setError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        console.log(`[slider] alınamadı: ${message}`);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [nonce]);

  const slides = useMemo(() => visibleSlides(all, todayLocal(new Date())), [all, nonce]);

  return { slides, loading, error, refresh: () => setNonce((n) => n + 1) };
}
