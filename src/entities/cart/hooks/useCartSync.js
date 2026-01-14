import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { handleUserChange } from '@/entities/cart/services/cartSyncService';
import { useAuth } from '@/shared/hooks/useAuth';

// Sync cart whenever auth changes
export const useCartSync = () => {
  const { user, loading } = useAuth();
  const dispatch = useDispatch();

  // Watch auth state and sync cart once auth settles
  useEffect(() => {
    if (loading) return;
    handleUserChange(user, dispatch);
  }, [user, loading, dispatch]);
};
