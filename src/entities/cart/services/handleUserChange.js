import { setCart, hydrateCart, resetHydration } from '@/entities/cart/slices/cartSlice';

import { getDeps } from './cartSyncDependencies';
import {
  markAuthReady,
  setHasUser,
  setSyncingCart,
  hadGuestCartSessionFlag,
  setHadGuestCartSession,
  setPrevItems,
  clearSkipSaveOnLogout,
} from './cartSyncState';

export const handleUserChange = async (user, dispatch) => {
  markAuthReady();
  setHasUser(Boolean(user));

  if (user) {
    clearSkipSaveOnLogout();
  }

  if (!user) {
    setHadGuestCartSession(true);
    dispatch(hydrateCart());
    setSyncingCart(false);
    return;
  }

  setSyncingCart(true);

  try {
    const shouldMergeGuestCart = hadGuestCartSessionFlag();
    setHadGuestCartSession(false);
    dispatch(resetHydration());

    const { storage, delay, loadUserCart, saveUserCart, mergeCarts } = getDeps();

    await delay(300);

    const guestCart = shouldMergeGuestCart ? JSON.parse(storage.getItem('cart')) || [] : [];
    const userCart = await loadUserCart(user.uid);
    const merged = mergeCarts(guestCart, userCart);

    await saveUserCart(user.uid, merged);
    dispatch(setCart(merged));
    dispatch(hydrateCart());
    storage.removeItem('cart');
    setPrevItems(merged);
  } catch {
    // ignore sync errors
  } finally {
    setSyncingCart(false);
  }
};
