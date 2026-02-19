import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import type { AuthUser } from '@/entities/auth/types';
import { handleUserChange } from '@/entities/cart/services/cartSyncService';
import { useAuth } from '@/shared/hooks/useAuth';

export const useCartSync = () => {
  const auth = useAuth() as { user: AuthUser | null; loading: boolean } | null;
  const user = auth?.user ?? null;
  const loading = auth?.loading ?? true;
  const dispatch = useDispatch();

  useEffect(() => {
    if (loading) return;
    handleUserChange(user, dispatch);
  }, [user, loading, dispatch]);
};
