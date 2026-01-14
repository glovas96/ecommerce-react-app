import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';

import { auth } from '@/shared/firebase/config';

// Normalize Firebase user payload
const normalizeUser = (firebaseUser) =>
  firebaseUser
    ? {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || '',
        roles: [],
      }
    : null;

export const useAuthListener = () => {
  const [user, setUser] = useState(null);
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
