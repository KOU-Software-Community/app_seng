import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { ClubEvent, EVENTS } from './data';
import { splitByDate, todayLocal } from './eventSchema';
import { isFirebaseConfigured } from './firebaseConfig';
import type { Raffle } from './raffleSchema';

/**
 * Events — from Firestore when it is reachable, and from the bundled
 * `src/data.ts` copy when it is not.
 *
 * Arşiv ayrı bir kaynak değil: aynı listenin tarihi geçmiş yarısı. Ayrı tutmak,
 * aynı gerçek etkinliği iki kez girmek ve ikisinin kayması demekti.
 *
 * The fallback is deliberate: a club app that shows a blank screen because the
 * network blipped is worse than one showing slightly stale content. `source`
 * says which one you are looking at.
 */
export type ContentSource = 'firestore' | 'local';

type ContentValue = {
  /** Bugün ve sonrası. Takvim bunu gösteriyor. */
  events: ClubEvent[];
  /** Dünü ve öncesi, en yeniden eskiye. */
  archive: ClubEvent[];
  /**
   * Çekiliş tanımları, etkinlik kimliğine göre. Bir etkinliğin çekiliş olup
   * olmadığı `tag`'inden değil buradan anlaşılıyor: kategori sadece bir etiket,
   * formu çizen şey tanımın kendisi.
   */
  raffles: Raffle[];
  getRaffle: (eventId?: string) => Raffle | undefined;
  /**
   * Bu etkinliğe kaç kişi kaydolmuş. `eventSeats` dokümanındaki kimlik
   * listesinin uzunluğu — elle girilen bir sayı değil, gerçek kayıtlar.
   */
  registeredCount: (eventId?: string) => number;
  source: ContentSource;
  loading: boolean;
  /**
   * Set only when Firestore could not be reached at all. An empty collection is
   * not an error — it is the club having nothing scheduled, and reporting that
   * as a failure sent users looking for a connection problem that did not exist.
   */
  error: string | null;
  refresh: () => void;
  /** Undefined when nothing matches — every caller has to handle that. */
  getEvent: (id?: string | string[]) => ClubEvent | undefined;
};

const Ctx = createContext<ContentValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [all, setAll] = useState<ClubEvent[]>(EVENTS);
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [registered, setRegistered] = useState<Record<string, number>>({});
  const [source, setSource] = useState<ContentSource>('local');
  const [loading, setLoading] = useState(isFirebaseConfigured);
  const [error, setError] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      console.log('[content] Firebase yapılandırılmamış — yerel içerik kullanılıyor.');
      return;
    }

    let cancelled = false;
    setLoading(true);

    // Dynamic import keeps the Firestore SDK out of the startup bundle.
    import('./firebase')
      .then(({ fetchContent }) => fetchContent())
      .then(({ events: remoteEvents, raffles: remoteRaffles, registered: counts }) => {
        if (cancelled) return;

        // Reaching Firestore and finding it empty is an answer, not a failure:
        // between terms the club genuinely has no upcoming events.
        //
        // This used to set an error and claim the bundled copy was in use, which
        // made sense while src/data.ts still shipped four events. It no longer
        // does, so there was nothing to fall back to and an ordinary empty
        // calendar was being reported to the user as a connection problem.
        setAll(remoteEvents);
        setRaffles(remoteRaffles);
        setRegistered(counts);
        setSource('firestore');
        setError(null);
        console.log(`[content] Firestore bağlı — ${remoteEvents.length} etkinlik.`);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        setSource('local');
        console.log(`[content] Firestore okunamadı, yerel içeriğe düşüldü: ${message}`);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [nonce]);

  // Bölme her render'da değil, liste değiştikçe. `nonce` de bağımlılık: elle
  // yenilemek gün dönmüşse bölmeyi de tazelemeli, yoksa dün açılıp açık kalan
  // uygulama dünkü etkinliği hâlâ takvimde gösterir.
  const { upcoming, past } = useMemo(() => splitByDate(all, todayLocal(new Date())), [all, nonce]);

  const value = useMemo<ContentValue>(
    () => ({
      events: upcoming,
      archive: past,
      raffles,
      getRaffle: (eventId) => raffles.find((r) => r.eventId === eventId),
      registeredCount: (eventId) => (eventId ? (registered[eventId] ?? 0) : 0),
      source,
      loading,
      error,
      refresh: () => setNonce((n) => n + 1),
      getEvent: (id) => {
        const key = Array.isArray(id) ? id[0] : id;
        // Tüm liste taranıyor, sadece yaklaşanlar değil: arşivden açılan bir
        // etkinliğin detay ekranı da çalışmalı.
        // No falling back to the first event. That turned "this id does not
        // exist" into "here is some other event", which is a harder bug to spot
        // than a missing-event screen.
        return all.find((e) => e.id === key);
      },
    }),
    [upcoming, past, all, raffles, registered, source, loading, error],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useContent() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useContent must be used inside <ContentProvider>');
  return ctx;
}

/** Convenience for screens that only need one event. */
export function useEvent(id?: string | string[]) {
  return useContent().getEvent(id);
}
