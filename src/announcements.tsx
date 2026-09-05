import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { fetchAnnouncement, fetchAnnouncements, type Announcement } from './announcementApi';
import { MONTHS_LONG } from './eventSchema';

// Çekme ve ayrıştırma `announcementApi.ts`'te: panel de aynı listeyi okuyor ve
// bir React sağlayıcısını sunucuya içe aktarmak istemiyoruz. Ekranlar bu
// modülden içe aktarmaya devam edebilsin diye buradan geçiriliyor.
export { fetchAnnouncement, fetchAnnouncements };
export type { Announcement };

/**
 * Kulüp duyuruları — kulübün kendi web sitesinin API'sinden.
 *
 * Etkinliklerden farklı olarak bu veri Firestore'da değil: duyurular zaten
 * sitede yazılıyor ve orada yayınlanıyor, ikinci bir yerde tekrar girilmeleri
 * ikisinin sapması demek olurdu. Uygulama okuyucu taraf, yazan taraf değil.
 *
 * Dış bir servis olduğu için buradaki her şey savunmacı: yanıtın şekli
 * doğrulanıyor, bozuk kayıtlar tüm listeyi düşürmek yerine atlanıyor, ve istek
 * zaman aşımına uğruyor. Kulüp sitesinin bakıma girmesi uygulamanın ana
 * sayfasını kilitlememeli.
 */

/** Bilinmeyen bir gövdeden güvenle metin çeker. */
/**
 * "20 Eylül 2025".
 *
 * `createdAt` UTC geliyor. Türkiye 2016'dan beri kalıcı olarak UTC+3 ve yaz
 * saati uygulamıyor, dolayısıyla sabit üç saat eklemek doğru sonucu veriyor —
 * ve `Intl` zaman dilimi desteğine bel bağlamıyor, ki Hermes'te garanti değil.
 */
export function formatAnnouncementDate(iso: string): string {
  const parsed = new Date(iso);
  if (Number.isNaN(parsed.getTime())) return '';
  const istanbul = new Date(parsed.getTime() + 3 * 60 * 60 * 1000);
  return `${istanbul.getUTCDate()} ${MONTHS_LONG[istanbul.getUTCMonth()]} ${istanbul.getUTCFullYear()}`;
}

type AnnouncementsValue = {
  announcements: Announcement[];
  loading: boolean;
  /** Sadece istek başarısız olduğunda dolu. Boş liste hata değil. */
  error: string | null;
  refresh: () => void;
  get: (id?: string | string[]) => Announcement | undefined;
};

const Ctx = createContext<AnnouncementsValue | null>(null);

export function AnnouncementsProvider({ children }: { children: React.ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchAnnouncements()
      .then((list) => {
        if (cancelled) return;
        setAnnouncements(list);
        setError(null);
        console.log(`[duyuru] ${list.length} duyuru alındı.`);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        console.log(`[duyuru] alınamadı: ${message}`);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [nonce]);

  const value = useMemo<AnnouncementsValue>(
    () => ({
      announcements,
      loading,
      error,
      refresh: () => setNonce((n) => n + 1),
      get: (id) => {
        const key = Array.isArray(id) ? id[0] : id;
        return announcements.find((a) => a.id === key);
      },
    }),
    [announcements, loading, error],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAnnouncements() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAnnouncements must be used inside <AnnouncementsProvider>');
  return ctx;
}
