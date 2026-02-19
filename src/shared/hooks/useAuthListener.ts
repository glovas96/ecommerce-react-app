import { onAuthStateChanged, signOut, type User as FirebaseUser } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';

import { auth } from '@/shared/firebase/config';
import type { AuthUser, UseAuthListenerResult } from '@/shared/hooks/useAuthListener.types';

// Normalize Firebase user payload
const normalizeUser = (firebaseUser: FirebaseUser | null): AuthUser | null =>
  firebaseUser
    ? {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || '',
        roles: [],
      }
    : null;

export const useAuthListener = (): UseAuthListenerResult => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!active) return;
      setUser(normalizeUser(firebaseUser));
      setLoading(false);
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return { user, loading, logout };
};
