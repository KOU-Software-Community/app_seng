import { FirebaseApp, FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';

import type { ArchiveEntry, ClubEvent } from './data';

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
  archive: 'archive',
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
export async function fetchContent(): Promise<{ events: ClubEvent[]; archive: ArchiveEntry[] }> {
  const db = getDb();

  const [eventsSnap, archiveSnap] = await Promise.all([
    withTimeout(getDocs(query(collection(db, COLLECTIONS.events), orderBy('startsAt'))), 'events'),
    withTimeout(getDocs(collection(db, COLLECTIONS.archive)), 'archive'),
  ]);

  return {
    events: eventsSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as ClubEvent),
    archive: archiveSnap.docs.map((d) => d.data() as ArchiveEntry),
  };
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

export { isFirebaseConfigured };
