import { browser } from '$app/environment';
import { getApps, getApp, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth } from 'firebase/auth';
import { getFirestore, type Firestore } from 'firebase/firestore';
import { getStorage, type FirebaseStorage } from 'firebase/storage';
import { getAnalytics, isSupported, logEvent, type Analytics } from 'firebase/analytics';
import {
  PUBLIC_FIREBASE_API_KEY,
  PUBLIC_FIREBASE_AUTH_DOMAIN,
  PUBLIC_FIREBASE_PROJECT_ID,
  PUBLIC_FIREBASE_STORAGE_BUCKET,
  PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  PUBLIC_FIREBASE_APP_ID,
  PUBLIC_FIREBASE_MEASUREMENT_ID
} from '$env/static/public';

const firebaseConfig = {
  apiKey: PUBLIC_FIREBASE_API_KEY,
  authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: PUBLIC_FIREBASE_APP_ID,
  measurementId: PUBLIC_FIREBASE_MEASUREMENT_ID
};

export const app: FirebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const storage: FirebaseStorage = getStorage(app);

let analytics: Analytics | null = null;

// Initialize Firebase Analytics. Browser-only and guarded by `isSupported()`
// (Analytics relies on APIs absent during SSR and in some environments).
// Requires PUBLIC_FIREBASE_MEASUREMENT_ID. Safe to call repeatedly — returns
// the existing instance after the first successful call.
export async function initAnalytics(): Promise<Analytics | null> {
  if (!browser || !firebaseConfig.measurementId) return null;
  if (analytics) return analytics;
  if (!(await isSupported())) return null;
  analytics = getAnalytics(app);
  return analytics;
}

// Log an analytics event if Analytics is available. No-op during SSR.
export async function trackEvent(
  name: string,
  params?: Record<string, unknown>
): Promise<void> {
  const instance = await initAnalytics();
  if (instance) logEvent(instance, name, params);
}
