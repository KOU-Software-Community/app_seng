/**
 * Firebase client config, read from `.env` (gitignored — see `.env.example`).
 *
 * Expo inlines `EXPO_PUBLIC_*` at build time, so each value must be a full
 * literal property access; `process.env[name]` is not substituted.
 *
 * This module deliberately imports nothing from the Firebase SDK, so callers can
 * check whether config exists without pulling Firestore into the startup bundle.
 */
export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

/**
 * False when `.env` is missing or incomplete — a fresh clone, or an EAS build
 * whose environment variables were never set. Because `.env` is gitignored,
 * that is the most likely way this breaks, so check it before calling `getDb()`.
 */
export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (v) => typeof v === 'string' && v.length > 0,
);

export const FIREBASE_SETUP_HINT =
  'Firebase is not configured. Copy .env.example to .env and fill in the EXPO_PUBLIC_FIREBASE_* values (for EAS builds, set them with `eas env:create`).';
