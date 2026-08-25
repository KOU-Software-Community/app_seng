import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { ARCHIVE, ArchiveEntry, ClubEvent, EVENTS, sortArchive } from './data';
import { isFirebaseConfigured } from './firebaseConfig';
import type { Raffle } from './raffleSchema';

/**
 * Events and archive entries — from Firestore when it is reachable, and from the
 * bundled `src/data.ts` copy when it is not.
 *
 * The fallback is deliberate: a club app that shows a blank screen because the
 * network blipped is worse than one showing slightly stale content. `source`
 * says which one you are looking at.
 */
export type ContentSource = 'firestore' | 'local';

type ContentValue = {
  events: ClubEvent[];
  archive: ArchiveEntry[];
  /**
   * Çekiliş tanımları, etkinlik kimliğine göre. Bir etkinliğin çekiliş olup
   * olmadığı `tag`'inden değil buradan anlaşılıyor: kategori sadece bir etiket,
   * formu çizen şey tanımın kendisi.
   */
  raffles: Raffle[];
  getRaffle: (eventId?: string) => Raffle | undefined;
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
  const [events, setEvents] = useState<ClubEvent[]>(EVENTS);
  const [archive, setArchive] = useState<ArchiveEntry[]>(() => sortArchive(ARCHIVE));
  const [raffles, setRaffles] = useState<Raffle[]>([]);
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
      .then(({ events: remoteEvents, archive: remoteArchive, raffles: remoteRaffles }) => {
        if (cancelled) return;

        // Reaching Firestore and finding it empty is an answer, not a failure:
        // between terms the club genuinely has no upcoming events.
        //
        // This used to set an error and claim the bundled copy was in use, which
        // made sense while src/data.ts still shipped four events. It no longer
        // does, so there was nothing to fall back to and an ordinary empty
        // calendar was being reported to the user as a connection problem.
        setEvents(remoteEvents);
        if (remoteArchive.length) setArchive(sortArchive(remoteArchive));
        setRaffles(remoteRaffles);
        setSource('firestore');
        setError(null);
        console.log(
          `[content] Firestore bağlı — ${remoteEvents.length} etkinlik, ${remoteArchive.length} arşiv kaydı.`,
        );
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

  const value = useMemo<ContentValue>(
    () => ({
      events,
      archive,
      raffles,
      getRaffle: (eventId) => raffles.find((r) => r.eventId === eventId),
      source,
      loading,
      error,
      refresh: () => setNonce((n) => n + 1),
      getEvent: (id) => {
        const key = Array.isArray(id) ? id[0] : id;
        // No falling back to the first event. That turned "this id does not
        // exist" into "here is some other event", which is a harder bug to spot
        // than a missing-event screen.
        return events.find((e) => e.id === key);
      },
    }),
    [events, archive, raffles, source, loading, error],
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
