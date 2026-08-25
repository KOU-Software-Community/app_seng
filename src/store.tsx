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
   * the student sees their code; `syncPending()` retries these.
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
  isRegistered: (eventId: string) => boolean;
  registrationFor: (eventId: string) => Registration | undefined;
  register: (input: Omit<Registration, 'code'>) => Registration;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  setMaster: (on: boolean) => void;
  toggleCategory: (key: string) => void;
  setReminder: (value: string) => void;
  setQuietHours: (on: boolean) => void;
};

const Ctx = createContext<AppStore | null>(null);

/** Mirrors the KYK-#### format shown on the confirmation screen. */
const makeCode = () => `KYK-${Math.floor(1000 + Math.random() * 9000)}`;

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
            registrations: saved.registrations ?? defaultState.registrations,
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

  const value = useMemo<AppStore>(() => {
    const registrationFor = (eventId: string) =>
      state.registrations.find((r) => r.eventId === eventId);

    return {
      ...state,
      hydrated,
      registrationFor,
      isRegistered: (eventId: string) => !!registrationFor(eventId),

      register: (input) => {
        const existing = registrationFor(input.eventId);
        if (existing) return existing;

        // Save locally first so the confirmation screen is instant and works
        // offline; the Firestore write follows and flips `synced`.
        const entry: Registration = { ...input, code: makeCode(), synced: false };
        setState((s) => ({ ...s, registrations: [...s.registrations, entry] }));

        if (isFirebaseConfigured) {
          import('./firebase')
            .then(({ pushRegistration }) =>
              pushRegistration({
                eventId: entry.eventId,
                code: entry.code,
                name: entry.name,
                studentNo: entry.studentNo,
                department: entry.department,
                year: entry.year,
              }),
            )
            .then(() => {
              setState((s) => ({
                ...s,
                registrations: s.registrations.map((r) =>
                  r.code === entry.code ? { ...r, synced: true } : r,
                ),
              }));
              console.log(`[kayit] ${entry.code} Firestore'a yazıldı.`);
            })
            .catch((err: unknown) => {
              const message = err instanceof Error ? err.message : String(err);
              console.log(`[kayit] ${entry.code} yerelde tutuldu, Firestore'a yazılamadı: ${message}`);
            });
        }

        return entry;
      },

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
  }, [state, hydrated]);

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
