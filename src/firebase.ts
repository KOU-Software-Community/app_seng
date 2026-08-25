import { FirebaseApp, FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

import type { ClubEvent } from './data';
import type { Raffle } from './raffleSchema';

import { FIREBASE_SETUP_HINT, firebaseConfig, isFirebaseConfigured } from './firebaseConfig';

/**
 * Firebase client.
 *
 * Nothing initialises at import time — the app still reads its content from
 * `src/data.ts`, so Firebase only spins up when something calls `getDb()`.
 *
 * Analytics is intentionally absent: `firebase/analytics` has no React Native
 * implementation, so `measurementId` is only useful to the web build.
 */

let app: FirebaseApp | undefined;
let db: Firestore | undefined;

export function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured) throw new Error(FIREBASE_SETUP_HINT);
  if (!app) {
    // Fast Refresh re-runs this module, so reuse an existing instance.
    app = getApps().length ? getApp() : initializeApp(firebaseConfig as FirebaseOptions);
  }
  return app;
}

export function getDb(): Firestore {
  if (!db) db = getFirestore(getFirebaseApp());
  return db;
}

/** Firestore collection names, kept in one place so app code and rules agree. */
export const COLLECTIONS = {
  events: 'events',
  registrations: 'registrations',
  devices: 'devices',
  raffles: 'raffles',
  raffleEntries: 'raffleEntries',
} as const;

/** Firestore retries an unreachable backend forever, so reads get a deadline. */
const TIMEOUT_MS = 8000;

function withTimeout<T>(p: Promise<T>, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`${label}: ${TIMEOUT_MS}ms içinde yanıt yok`)), TIMEOUT_MS),
    ),
  ]);
}

/**
 * Reads the club's content. Callers reach this through a dynamic import so the
 * Firestore SDK stays out of the startup bundle.
 */
export async function fetchContent(): Promise<{
  events: ClubEvent[];
  raffles: Raffle[];
}> {
  const db = getDb();

  // Arşiv ayrı bir koleksiyon değil: geçmiş etkinliklerin kendisi. Tek okuma,
  // tek sıralama; bölmeyi `splitByDate` yapıyor.
  const [eventsSnap, rafflesSnap] = await Promise.all([
    withTimeout(getDocs(query(collection(db, COLLECTIONS.events), orderBy('startsAt'))), 'events'),
    withTimeout(getDocs(collection(db, COLLECTIONS.raffles)), 'raffles'),
  ]);

  return {
    events: eventsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as ClubEvent),
    raffles: rafflesSnap.docs.map((d) => ({ eventId: d.id, ...d.data() }) as Raffle),
  };
}

/**
 * Bir çekiliş katılımını yazar.
 *
 * Doküman kimliği `entryId` — kayıtlardaki `addDoc` yerine `setDoc`, çünkü aynı
 * katılım iki kez gönderilirse (yazma başarılı olup bayrak diske yazılmadan
 * uygulama ölürse) ikinci yazma kopya üretmek yerine aynı dokümanın üzerine
 * gelir. Kayıtlarda bilinen açık olarak duran şey burada baştan kapalı.
 */
export async function pushRaffleEntry(entry: {
  entryId: string;
  eventId: string;
  values: Record<string, string>;
}): Promise<void> {
  const db = getDb();
  await withTimeout(
    setDoc(doc(db, COLLECTIONS.raffleEntries, entry.entryId), {
      ...entry,
      createdAt: serverTimestamp(),
    }),
    'raffleEntry',
  );
}

export type RegistrationPayload = {
  eventId: string;
  code: string;
  name: string;
  studentNo: string;
  department: string;
  year: string;
};

/** Writes one registration. Throws on failure so the caller can mark it unsynced. */
export async function pushRegistration(payload: RegistrationPayload): Promise<string> {
  const db = getDb();
  const ref = await withTimeout(
    addDoc(collection(db, COLLECTIONS.registrations), { ...payload, createdAt: serverTimestamp() }),
    'registration',
  );
  return ref.id;
}

export type DeviceRecord = {
  /** Expo push token. Also the document id — see the note below. */
  token: string;
  platform: string;
  master: boolean;
  categories: Record<string, boolean>;
  reminder: string;
  quietHours: boolean;
};

/**
 * Stores this device's push token and notification preferences so `npm run push`
 * knows who wants what.
 *
 * The token doubles as the document id, which is deliberate: there is no login,
 * so a rule cannot check "is this your document". An unguessable id is the
 * protection available — a device can only overwrite a token it already holds.
 * Reads stay closed to clients; the sender script uses the Admin SDK.
 */
export async function upsertDevice(record: DeviceRecord): Promise<void> {
  const db = getDb();
  await withTimeout(
    setDoc(doc(db, COLLECTIONS.devices, record.token), {
      ...record,
      updatedAt: serverTimestamp(),
    }),
    'device',
  );
}

export { isFirebaseConfigured };
