import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { markSkipSaveOnLogout } from '@/entities/cart/services/cartSyncService';
import { setCart, resetHydration } from '@/entities/cart/slices/cartSlice';

// Hook that clears cart state and calls an optional logout callback
export const useLogout = (onLogout) => {
  const dispatch = useDispatch();

  // Keep logout logic stable across renders
  return useCallback(async () => {
    if (onLogout) {
      await onLogout();
    }
    // Skip cart sync while resetting state
    markSkipSaveOnLogout();
    // Empty stored cart data
    dispatch(setCart([]));
    dispatch(resetHydration());
    localStorage.removeItem('cart');
  }, [dispatch, onLogout]);
};
