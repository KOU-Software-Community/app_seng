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
  /**
   * Firestore doküman kimliği: `${eventId}__${studentNo}`.
   *
   * Rastgele değil, türetilmiş — aynı öğrenci numarasının aynı etkinliğe ikinci
   * kez yazılması bu yüzden imkânsız: ikinci yazma var olan dokümana denk gelir
   * ve kural onu reddeder. Sunucuda sayım yapmadan, hiçbir şey okumadan.
   *
   * `code` bu işi göremez: öğrenci telefonda okuyabilsin diye kısa tutuldu ve
   * iki öğrencinin aynı kodu çekmesi mümkün.
   */
  regId: string;
  /**
   * Sayım jetonu — `eventSeats` içindeki herkese açık listeye bu giriyor.
   *
   * `regId` oraya konamaz: içinde öğrenci numarası var ve o liste herkese
   * açık. Jeton rastgele, hiçbir şey söylemiyor, tek işi sayılmak.
   */
  seatId: string;
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
  /**
   * Firestore yazmayı reddetti ve yeniden denemek bunu değiştirmeyecek.
   *
   * En olası sebep: bu öğrenci numarasıyla bu etkinliğe zaten kayıt olunmuş.
   * Kurallar yayınlanmamış olması da aynı hatayı veriyor ve Firestore ikisini
   * ayırt etmiyor — o yüzden kayıt silinmiyor, arka planda denenmeyi bırakıyor
   * ve öğrenciye elle tekrar deneme imkânı kalıyor.
   */
  blocked?: boolean;
};

export type NotificationPrefs = {
  master: boolean;
  categories: Record<string, boolean>;
  reminder: string;
  quietHours: boolean;
};

/**
 * Çekiliş katılımı. Kayıtlardan farkı alanların sabit olmaması: hangi soruların
 * sorulacağı çekiliş tanımından geliyor, dolayısıyla cevaplar da anahtar-değer.
 */
export type RaffleEntry = {
  entryId: string;
  eventId: string;
  values: Record<string, string>;
  /** ISO — cihazda oluşturulduğu an. Firestore'daki `createdAt` sunucu saati. */
  createdAt: string;
  /** Kayıtlardaki `synced` ile aynı anlam ve aynı yeniden deneme yolu. */
  synced?: boolean;
};

type PersistedState = {
  onboardingSeen: boolean;
  registrations: Registration[];
  raffleEntries: RaffleEntry[];
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
  raffleEntries: [],
  notifications: defaultNotifications,
};

type AppStore = PersistedState & {
  /** False until the persisted state has been read back from disk. */
  hydrated: boolean;
  registrationFor: (eventId: string) => Registration | undefined;
  register: (input: Omit<Registration, 'code' | 'regId' | 'seatId'>) => Registration;
  /** Bu etkinliğin çekilişine katılım, varsa. */
  raffleEntryFor: (eventId: string) => RaffleEntry | undefined;
  /** Katılımı önce cihaza yazar, gönderimi `syncPending` üstlenir. */
  enterRaffle: (eventId: string, values: Record<string, string>) => RaffleEntry;
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
 * Çekiliş katılımının kimliği — Firestore doküman kimliği de bu.
 *
 * Kayıt kodundan uzun, çünkü bu kod kimseye gösterilmiyor: okunabilir olması
 * gerekmiyor, çakışmaması gerekiyor. 16 sembol, 32'lik alfabeden.
 */
/**
 * Firestore'un "kural reddetti" hatası mı?
 *
 * Ağ hatasından ayırmak gerekiyor çünkü yeniden denemek yalnızca ikincisini
 * düzeltir. Firestore reddin *sebebini* söylemiyor — aynı öğrenci numarası da,
 * yayınlanmamış kurallar da `permission-denied` veriyor. O yüzden kayıt
 * silinmiyor, sadece arka plan denemesi duruyor.
 */
function isRulesRejection(err: unknown): boolean {
  const code = (err as { code?: unknown })?.code;
  if (typeof code === 'string') return code === 'permission-denied';
  const message = err instanceof Error ? err.message : String(err);
  return /permission-denied|insufficient permissions/i.test(message);
}

const makeEntryId = () => {
  let id = '';
  for (let i = 0; i < 16; i += 1) {
    id += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return id;
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
            registrations: (saved.registrations ?? defaultState.registrations)
              .filter((r) => !isDemoRegistration(r))
              // `regId` ve `seatId` sonradan geldi; onlarsız kaydedilmiş bir
              // kayıt cihazda duruyor olabilir ve kimliksiz gönderilemez.
              // `regId` türetiliyor, jeton rastgele.
              .map((r) => ({
                ...r,
                regId: r.regId ?? `${r.eventId}__${r.studentNo}`,
                seatId: r.seatId ?? makeEntryId(),
              })),
            raffleEntries: saved.raffleEntries ?? defaultState.raffleEntries,
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

  const raffleEntriesRef = useRef(state.raffleEntries);
  useEffect(() => {
    raffleEntriesRef.current = state.raffleEntries;
  }, [state.raffleEntries]);

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
    const pending = registrationsRef.current.filter((r) => !r.synced && !r.blocked);
    const pendingEntries = raffleEntriesRef.current.filter((e) => !e.synced);
    if (!pending.length && !pendingEntries.length) return;

    syncing.current = true;
    void (async () => {
      try {
        const { pushRegistration } = await import('./firebase');
        for (const entry of pending) {
          try {
            await pushRegistration({
              regId: entry.regId,
              seatId: entry.seatId,
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
                r.regId === entry.regId ? { ...r, synced: true } : r,
              ),
            }));
            console.log(`[kayit] ${entry.code} Firestore'a yazıldı.`);
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);

            // Yeniden denemenin düzeltemeyeceği tek hata sınıfı bu: kural
            // reddetti. Sonsuza kadar denemek her açılışta bir yazma harcar ve
            // öğrenciye "Gönderiliyor…" yazan bir ekran bırakır. Duruyoruz ve
            // ekranda elle tekrar deneme kalıyor.
            if (isRulesRejection(err)) {
              setState((s) => ({
                ...s,
                registrations: s.registrations.map((r) =>
                  r.regId === entry.regId ? { ...r, blocked: true } : r,
                ),
              }));
              console.log(`[kayit] ${entry.code} kabul edilmedi: ${message}`);
              continue;
            }

            // Kalanı ağ ya da erişilebilirlik sorunu. İlk hatada duruyoruz:
            // her deneme 8 saniyelik zaman aşımına mal oluyor ve sebep hepsinde
            // aynı. Beklemede kalıyorlar, sonraki tetikleyici alıyor.
            console.log(`[kayit] ${entry.code} gönderilemedi, beklemede: ${message}`);
            break;
          }
        }
        // Çekiliş katılımları aynı çalışmada, aynı bekçilerin altında.
        // Ayrı bir senkron mekanizması ikinci bir "yeniden deneme unutuldu"
        // hatası için ikinci bir yer demek olurdu.
        const { pushRaffleEntry } = await import('./firebase');
        for (const entry of pendingEntries) {
          try {
            await pushRaffleEntry({
              entryId: entry.entryId,
              eventId: entry.eventId,
              values: entry.values,
            });
            setState((s) => ({
              ...s,
              raffleEntries: s.raffleEntries.map((e) =>
                e.entryId === entry.entryId ? { ...e, synced: true } : e,
              ),
            }));
            console.log(`[çekiliş] ${entry.entryId} Firestore'a yazıldı.`);
          } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            console.log(`[çekiliş] ${entry.entryId} gönderilemedi, beklemede: ${message}`);
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
    const pending =
      state.registrations.some((r) => !r.synced) || state.raffleEntries.some((e) => !e.synced);
    if (!pending) return;
    syncPending();
  }, [hydrated, state.registrations, state.raffleEntries, syncPending]);

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
        const entry: Registration = {
          ...input,
          regId: `${input.eventId}__${input.studentNo}`,
          seatId: makeEntryId(),
          code: makeCode(),
          synced: false,
        };
        setState((s) => ({ ...s, registrations: [...s.registrations, entry] }));
        return entry;
      },

      raffleEntryFor: (eventId: string) =>
        state.raffleEntries.find((e) => e.eventId === eventId),

      enterRaffle: (eventId, values) => {
        const existing = state.raffleEntries.find((e) => e.eventId === eventId);
        if (existing) {
          // Aynı çekilişe ikinci katılım yok. Gönderilememişse tekrar denenir —
          // kayıtlardaki mantığın aynısı.
          if (!existing.synced) syncPending();
          return existing;
        }

        const entry: RaffleEntry = {
          entryId: makeEntryId(),
          eventId,
          values,
          createdAt: new Date().toISOString(),
          synced: false,
        };
        setState((s) => ({ ...s, raffleEntries: [...s.raffleEntries, entry] }));
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

/*
 * LoadingProvider, useLoading ve runWithLoader buradaydı: etkinlik detayı
 * açılırken 460 ms perde gösteren makine. Perdenin arkasında hiçbir şey
 * yüklenmiyordu — `useEvent(id)` bellekteki listeden okuyor — ve tek çağıran
 * `useOpenEvent`'ti. Perde kalkınca makine de kimsesiz kaldı.
 *
 * `PixelLoader` duruyor (açılış ekranı ve kayıt onayı kullanıyor); gerçekten
 * beklenen bir şey çıkarsa perdeyi geri kurmak küçük iş.
 */

