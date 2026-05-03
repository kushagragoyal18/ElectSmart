import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

let analyticsPromise;

/**
 * Lazily resolves Firebase Analytics when browser support and env config exist.
 * @returns {Promise<import('firebase/analytics').Analytics|null>}
 */
export async function getFirebaseAnalytics() {
  analyticsPromise ??= isSupported().then((supported) => (supported ? getAnalytics(app) : null));
  return analyticsPromise;
}

/**
 * Tracks a Firebase Analytics event without blocking the UI.
 * @param {string} eventName
 * @param {Record<string, unknown>} [params]
 * @returns {Promise<void>}
 */
export async function trackEvent(eventName, params = {}) {
  const analytics = await getFirebaseAnalytics();
  if (analytics) {
    logEvent(analytics, eventName, params);
  }
}

export { app, auth, db, storage };

