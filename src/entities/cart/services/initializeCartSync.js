import { getDeps } from './cartSyncDependencies';
import {
  getPrevItems,
  setPrevItems,
  isAuthReady,
  getUnsubscribe,
  setUnsubscribe,
  isSkipSaveOnLogout,
  isSyncingCart,
  hasAuthenticatedUser,
} from './cartSyncState';

const persistLocalCart = (items, storage) => {
  storage.setItem('cart', JSON.stringify(items));
};

export const initialize = (store) => {
  if (getUnsubscribe()) return;
  setPrevItems(store.getState().cart.items);

  const unsubscribeHandle = store.subscribe(async () => {
    if (!isAuthReady()) {
      return;
    }

    const { auth, storage, saveUserCart } = getDeps();
    const cartState = store.getState().cart;
    const state = cartState.items;
    const user = auth.currentUser;

    if (!hasAuthenticatedUser()) {
      persistLocalCart(state, storage);
    }

    if (!user || isSkipSaveOnLogout()) {
      return;
    }

    if (!cartState.hydrated) {
      return;
    }

    if (isSyncingCart()) {
      return;
    }

    if (state === getPrevItems()) {
      return;
    }

    setPrevItems(state);
    await saveUserCart(user.uid, state);
  });

  setUnsubscribe(unsubscribeHandle);
};
