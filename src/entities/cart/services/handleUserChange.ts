import type { AnyAction, Dispatch } from 'redux';

import type { AuthUser } from '@/entities/auth/types';
import { mergeCarts as defaultMergeCarts } from '@/entities/cart/services/mergeCarts';
import { setCart, hydrateCart, resetHydration } from '@/entities/cart/slices/cartSlice';
import type { CartItem } from '@/entities/cart/types';

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

export const handleUserChange = async (user: AuthUser | null, dispatch: Dispatch<AnyAction>) => {
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

    const { storage, delay, loadUserCart, saveUserCart } = getDeps();

    await delay(300);

    const guestCart: CartItem[] = shouldMergeGuestCart
      ? (JSON.parse(storage.getItem('cart') ?? '[]') as CartItem[])
      : [];
    const userCart = await loadUserCart(user.uid);
    const merged = defaultMergeCarts(guestCart, userCart);

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
