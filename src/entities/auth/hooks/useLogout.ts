import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { markSkipSaveOnLogout } from '@/entities/cart/services/cartSyncService';
import { setCart, resetHydration } from '@/entities/cart/slices/cartSlice';

export const useLogout = (onLogout?: () => Promise<void>) => {
  const dispatch = useDispatch();
  return useCallback(async () => {
    if (onLogout) {
      await onLogout();
    }
    markSkipSaveOnLogout();
    dispatch(setCart([]));
    dispatch(resetHydration());
    localStorage.removeItem('cart');
  }, [dispatch, onLogout]);
};
