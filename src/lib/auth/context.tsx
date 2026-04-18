'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  GoogleAuthProvider,
  OAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
import { ensureUserDoc } from '@/lib/data/users';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithApple: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) await ensureUserDoc(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      loading,
      loginWithEmail: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
      },
      registerWithEmail: async (email, password, displayName) => {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        if (displayName) await updateProfile(cred.user, { displayName });
      },
      loginWithGoogle: async () => {
        await signInWithPopup(auth, new GoogleAuthProvider());
      },
      loginWithApple: async () => {
        const provider = new OAuthProvider('apple.com');
        provider.addScope('email');
        provider.addScope('name');
        await signInWithPopup(auth, provider);
      },
      logout: async () => {
        await signOut(auth);
      },
      resetPassword: async (email) => {
        await sendPasswordResetEmail(auth, email);
      },
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
