import { saveUserCart, loadUserCart } from '@/entities/cart/api/cartApi';
import { mergeCarts } from '@/entities/cart/services/mergeCarts';
import { setCart, hydrateCart, resetHydration } from '@/entities/cart/slices/cartSlice';
import { auth } from '@/shared/firebase/config';

// Firestore subscription handle
let unsubscribe = null;
// Last saved cart snapshot
let prevItems = [];
// Flag used during manual logout
let skipSaveOnLogout = false;
// Indicates active sync operation
let isSyncing = false;
// Auth readiness tracker
let authReady = false;
// whether a user is logged in
let hasUser = false;
// Guest cart persisted before login
let hadGuestCartSession = false;

// Sync cart to Firestore when user is logged in
// Start monitoring cart store for changes to sync when signed in
export const initialize = (store) => {
  if (unsubscribe) return;
  prevItems = store.getState().cart.items;

  unsubscribe = store.subscribe(async () => {
    if (!authReady) {
      return;
    }

    const cartState = store.getState().cart;
    const state = cartState.items;
    const user = auth.currentUser;

    if (!hasUser) {
      persistLocalCart(state);
    }

    // Skip if no user
    if (!user || skipSaveOnLogout) {
      return;
    }

    // skip writes until cart is hydrated
    if (!cartState.hydrated) {
      return;
    }

    // skip writes while we're explicitly syncing
    if (isSyncing) {
      return;
    }

    // Skip if no changes
    if (state === prevItems) return;
    prevItems = state;

    // Save updated cart
    if (!isSyncing) {
      await saveUserCart(user.uid, state);
    }
  });
};

// Respond to auth changes by hydrating or syncing carts
export const handleUserChange = async (user, dispatch) => {
  authReady = true;
  hasUser = Boolean(user);

  if (hasUser) {
    clearSkipSaveOnLogout();
  }

  if (!user) {
    hadGuestCartSession = true;
    dispatch(hydrateCart());
    isSyncing = false;
    return;
  }

  isSyncing = true;

  try {
    const shouldMergeGuestCart = hadGuestCartSession;
    hadGuestCartSession = false;
    dispatch(resetHydration());

    // Delay to ensure Firestore returns fresh data
    await new Promise((res) => setTimeout(res, 300));

    // Load guest cart from localStorage
    const guestCart = shouldMergeGuestCart ? JSON.parse(localStorage.getItem('cart')) || [] : [];

    // Load user cart from Firestore
    const userCart = await loadUserCart(user.uid);

    // Merge guest + user carts
    const merged = mergeCarts(guestCart, userCart);

    // Save merged cart to Firestore
    await saveUserCart(user.uid, merged);

    // Update Redux store
    dispatch(setCart(merged));
    dispatch(hydrateCart());

    // Clear guest cart after sync
    localStorage.removeItem('cart');
    prevItems = merged;
  } catch {
    // ignore
  } finally {
    isSyncing = false;
  }
};

// Persist guest cart between sessions
const persistLocalCart = (items) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

// Prevent syncing when user explicitly logs out
export const markSkipSaveOnLogout = () => {
  skipSaveOnLogout = true;
};

// Allow syncing again after login reset
export const clearSkipSaveOnLogout = () => {
  skipSaveOnLogout = false;
};
