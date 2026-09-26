import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { isFirebaseConfigured } from './firebaseConfig';
import type { Sponsor } from './vitrinSchema';

/**
 * Sponsorlar — dört ekran okuyor (ana sayfa, liste, detay, etkinlik detayındaki
 * "Ödülü sağlayan"), o yüzden kökte bir sağlayıcı.
 *
 * Durum makinesi `AnnouncementsProvider` ile aynı: iptal bayrağı, `nonce` ile
 * yenileme, hata olunca eldeki liste korunuyor. Okuma `fetchContent`'ten ayrı:
 * `sponsors` kuralı henüz yayınlanmadıysa etkinlikler bundan etkilenmiyor.
 */
type SponsorsValue = {
  sponsors: Sponsor[];
  loading: boolean;
  /** Yalnız okuma başarısız olduğunda dolu. Boş liste hata değil. */
  error: string | null;
  refresh: () => void;
  get: (id?: string | string[]) => Sponsor | undefined;
};

const Ctx = createContext<SponsorsValue | null>(null);

export function SponsorsProvider({ children }: { children: React.ReactNode }) {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
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

    // Dinamik: Firestore SDK başlangıç paketine girmesin.
    import('./firebase')
      .then(({ fetchSponsors }) => fetchSponsors())
      .then((list) => {
        if (cancelled) return;
        setSponsors(list);
        setError(null);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        console.log(`[sponsor] alınamadı: ${message}`);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [nonce]);

  const value = useMemo<SponsorsValue>(
    () => ({
      sponsors,
      loading,
      error,
      refresh: () => setNonce((n) => n + 1),
      get: (id) => {
        const key = Array.isArray(id) ? id[0] : id;
        return sponsors.find((s) => s.id === key);
      },
    }),
    [sponsors, loading, error],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSponsors() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useSponsors must be used inside <SponsorsProvider>');
  return ctx;
}
