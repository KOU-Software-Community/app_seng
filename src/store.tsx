import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AppState } from 'react-native';

import { NOTIFICATION_CATEGORIES, REMINDER_OPTIONS } from './data';
import { isFirebaseConfigured } from './firebaseConfig';

const STORAGE_KEY = 'kyk.state.v1';

export type Registration = {
  eventId: string;
  code: string;
  name: string;
  studentNo: string;
  department: string;
  year: string;
  /**
   * False when the Firestore write has not landed — offline, rules rejected it,
   * or the database does not exist yet. The registration still counts locally so
   * the student sees their code; `syncPending()` retries these on launch, when
   * the app returns to the foreground, and when the student submits again.
   *
   * Undefined counts as pending: an unknown state is worth one extra write far
   * more than it is worth a silently dropped registration.
   */
  synced?: boolean;
};

export type NotificationPrefs = {
  master: boolean;
  categories: Record<string, boolean>;
  reminder: string;
  quietHours: boolean;
};

type PersistedState = {
  onboardingSeen: boolean;
  registrations: Registration[];
  notifications: NotificationPrefs;
};

const defaultNotifications: NotificationPrefs = {
  master: true,
  categories: NOTIFICATION_CATEGORIES.reduce<Record<string, boolean>>((acc, c) => {
    // Everything on out of the box except general announcements, which are noisy.
    acc[c.key] = c.key !== 'Duyuru';
    return acc;
  }, {}),
  reminder: REMINDER_OPTIONS[1],
  quietHours: true,
};

const defaultState: PersistedState = {
  onboardingSeen: false,
  // Empty on purpose. This used to hold a demo registration ("Elif Yılmaz"),
  // which shipped to every install and showed a brand-new user someone else's
  // registration on the badge and the counter. The app collects real
  // applications, so a fresh install starts with none.
  registrations: [],
  notifications: defaultNotifications,
};

type AppStore = PersistedState & {
  /** False until the persisted state has been read back from disk. */
  hydrated: boolean;
  registrationFor: (eventId: string) => Registration | undefined;
  register: (input: Omit<Registration, 'code'>) => Registration;
  /**
   * Retries every registration that has not reached Firestore. Safe to call at
   * any time: it is a no-op when nothing is pending and it will not overlap
   * with a run already in flight.
   */
  syncPending: () => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  setMaster: (on: boolean) => void;
  toggleCategory: (key: string) => void;
  setReminder: (value: string) => void;
  setQuietHours: (on: boolean) => void;
};

const Ctx = createContext<AppStore | null>(null);

/**
 * Registration code — shown to the student and read back at check-in.
 *
 * This was four digits: 9000 possibilities, drawn at random, with no uniqueness
 * check anywhere. Measured over 400 simulated runs, that collides 11% of the
 * time at 50 registrations and 100% of the time at 500. Nothing would have
 * caught it either — the club would simply find two people holding the same
 * code at a door.
 *
 * Six symbols from a 32-character alphabet is 1.07e9 combinations. Same
 * simulation: no collision at 500 registrations, 0.25% at 2000. A uniqueness
 * check is still impossible without reading the collection, which clients are
 * not allowed to do, so the size of the space is the whole defence.
 *
 * The alphabet drops 0/O and 1/I so a code read aloud or copied off a screen
 * cannot be mistyped into somebody else's.
 */
const CODE_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
const CODE_LENGTH = 6;

const makeCode = () => {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i += 1) {
    code += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return `KYK-${code}`;
};

/**
 * 1.0.x shipped a demo registration inside the default state, so every device
 * that opened one of those builds has it sitting in AsyncStorage. Taking it out
 * of the defaults does not take it off their device — this does.
 *
 * Matched on both fields so a real registration that happens to draw the same
 * four digits is never dropped.
 */
const isDemoRegistration = (r: Registration) =>
  r.code === 'KYK-2431' && r.studentNo === '210101045';

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<PersistedState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  // Guards against the initial default state overwriting what we just loaded.
  const canPersist = useRef(false);

  useEffect(() => {
    let cancelled = false;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((raw) => {
        if (cancelled) return;
        if (raw) {
          const saved = JSON.parse(raw) as Partial<PersistedState>;
          setState({
            onboardingSeen: saved.onboardingSeen ?? defaultState.onboardingSeen,
            registrations: (saved.registrations ?? defaultState.registrations).filter(
              (r) => !isDemoRegistration(r),
            ),
            notifications: {
              ...defaultNotifications,
              ...saved.notifications,
              categories: {
                ...defaultNotifications.categories,
                ...saved.notifications?.categories,
              },
            },
          });
        }
      })
      .catch(() => {
        // A corrupt or unreadable payload just means we start from defaults.
      })
      .finally(() => {
        if (cancelled) return;
        canPersist.current = true;
        setHydrated(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!canPersist.current) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state]);

  // Latest registrations, readable from callbacks that must not be re-created on
  // every state change (the AppState listener below registers once). Declared
  // before the effects that read it so it is already current when they run.
  const registrationsRef = useRef(state.registrations);
  useEffect(() => {
    registrationsRef.current = state.registrations;
  }, [state.registrations]);

  // One run at a time. Two overlapping runs would push the same registration
  // twice and leave the club with duplicate documents.
  const syncing = useRef(false);
  // Set when a sync is asked for while one is already running — a registration
  // submitted mid-run is not in the batch being worked through, and silently
  // dropping that request would strand it until the next launch or foreground.
  const resyncQueued = useRef(false);
  // Lets the run below re-enter itself once it has finished.
  const syncPendingRef = useRef<(() => void) | null>(null);

  const syncPending = useCallback(() => {
    if (!isFirebaseConfigured) return;
    if (syncing.current) {
      resyncQueued.current = true;
      return;
    }
    const pending = registrationsRef.current.filter((r) => !r.synced);
    if (!pending.length) return;

    syncing.current = true;
    void (async () => {
      try {
        const { pushRegistration } = await import('./firebase');
        for (const entry of pending) {
          try {
            await pushRegistration({
              eventId: entry.eventId,
              code: entry.code,
              name: entry.name,
              studentNo: entry.studentNo,
              department: entry.department,
              year: entry.year,
            });
            setState((s) => ({
              ...s,
              registrations: s.registrations.map((r) =>
                r.code === entry.code ? { ...r, synced: true } : r,
              ),
            }));
            console.log(`[kayit] ${entry.code} Firestore'a yazıldı.`);
          } catch (err: unknown) {
            // Stop at the first failure rather than working through the rest.
            // One rejected write almost always means the backend is unreachable,
            // and each further attempt costs a full 8s timeout. They stay
            // pending and the next trigger picks them up.
            const message = err instanceof Error ? err.message : String(err);
            console.log(`[kayit] ${entry.code} gönderilemedi, beklemede: ${message}`);
            break;
          }
        }
      } catch (err: unknown) {
        // The dynamic import itself failed — nothing to retry right now.
        console.log(`[kayit] senkronizasyon başlatılamadı: ${String(err)}`);
      } finally {
        syncing.current = false;
        // Someone asked mid-run. Clearing the flag before re-entering keeps this
        // bounded: only a fresh outside call can queue another pass.
        if (resyncQueued.current) {
          resyncQueued.current = false;
          syncPendingRef.current?.();
        }
      }
    })();
  }, []);

  useEffect(() => {
    syncPendingRef.current = syncPending;
  }, [syncPending]);

  // Anything still pending gets sent as soon as the app has state to work with,
  // and again whenever a registration is added.
  useEffect(() => {
    if (!hydrated) return;
    if (!state.registrations.some((r) => !r.synced)) return;
    syncPending();
  }, [hydrated, state.registrations, syncPending]);

  // Returning to the foreground is the cheapest reliable retry point: the phone
  // was just unlocked, so a connection that was missing at submit time is
  // usually back.
  useEffect(() => {
    const sub = AppState.addEventListener('change', (next) => {
      if (next === 'active') syncPending();
    });
    return () => sub.remove();
  }, [syncPending]);

  const value = useMemo<AppStore>(() => {
    const registrationFor = (eventId: string) =>
      state.registrations.find((r) => r.eventId === eventId);

    return {
      ...state,
      hydrated,
      registrationFor,

      register: (input) => {
        const existing = registrationFor(input.eventId);
        if (existing) {
          // Submitting again on a registration that never reached Firestore is
          // the student asking us to try once more. Keep their code — it is
          // already on screen and possibly written down — and retry the write.
          // Returning early without this is what used to strand a registration
          // on the device forever.
          if (!existing.synced) syncPending();
          return existing;
        }

        // Saved locally first so the confirmation screen is instant and works
        // offline. The pending-sync effect sends it as soon as the state lands
        // and keeps retrying until it does.
        const entry: Registration = { ...input, code: makeCode(), synced: false };
        setState((s) => ({ ...s, registrations: [...s.registrations, entry] }));
        return entry;
      },

      syncPending,

      completeOnboarding: () => setState((s) => ({ ...s, onboardingSeen: true })),
      resetOnboarding: () => setState((s) => ({ ...s, onboardingSeen: false })),

      setMaster: (on) =>
        setState((s) => ({ ...s, notifications: { ...s.notifications, master: on } })),

      toggleCategory: (key) =>
        setState((s) => ({
          ...s,
          notifications: {
            ...s.notifications,
            // Flipping any category on implies the master switch is on, matching
            // the prototype's behaviour.
            master: true,
            categories: {
              ...s.notifications.categories,
              [key]: !s.notifications.categories[key],
            },
          },
        })),

      setReminder: (reminder) =>
        setState((s) => ({ ...s, notifications: { ...s.notifications, reminder } })),

      setQuietHours: (quietHours) =>
        setState((s) => ({ ...s, notifications: { ...s.notifications, quietHours } })),
    };
  }, [state, hydrated, syncPending]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAppStore must be used inside <AppStoreProvider>');
  return ctx;
}

/**
 * Drives the pixel loading overlay the design shows while an event detail opens.
 * Kept separate from the persisted store since it is pure UI state.
 */
const LoadingCtx = createContext<{
  loading: boolean;
  runWithLoader: (fn: () => void, ms?: number) => void;
} | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const runWithLoader = useCallback((fn: () => void, ms = 460) => {
    if (timer.current) clearTimeout(timer.current);
    setLoading(true);
    timer.current = setTimeout(() => {
      setLoading(false);
      fn();
    }, ms);
  }, []);

  const value = useMemo(() => ({ loading, runWithLoader }), [loading, runWithLoader]);
  return <LoadingCtx.Provider value={value}>{children}</LoadingCtx.Provider>;
}

export function useLoading() {
  const ctx = useContext(LoadingCtx);
  if (!ctx) throw new Error('useLoading must be used inside <LoadingProvider>');
  return ctx;
}
