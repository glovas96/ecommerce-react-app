import { useEffect, useState } from 'react';

import { loadUser, logout } from '@/entities/auth/services/authService';

// Provide auth state and actions
export const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    loadUser()
      .then((result) => {
        if (active) setUser(result.user);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return { user, loading, logout: handleLogout };
};
