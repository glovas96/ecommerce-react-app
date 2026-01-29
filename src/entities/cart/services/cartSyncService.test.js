import { describe, expect, it, beforeEach, vi } from 'vitest';

import {
  handleUserChange,
  initialize,
  markSkipSaveOnLogout,
  overrideCartSyncDependencies,
  resetCartSyncDependencies,
  resetCartSyncState,
} from '@/entities/cart/services/cartSyncService';
import { hydrateCart, setCart } from '@/entities/cart/slices/cartSlice';
import { createMockStorage } from '@/test/mocks/storage';

const createDependencies = (params = {}) => {
  const storage = createMockStorage();
  storage.setItem('cart', JSON.stringify([{ id: 'guest', quantity: 1 }]));
  const originalRemove = storage.removeItem;
  storage.removeItem = vi.fn((key) => originalRemove(key));

  return {
    storage,
    delay: () => Promise.resolve(),
    loadUserCart: vi.fn(async () => [{ id: 'user', quantity: 2 }]),
    saveUserCart: vi.fn(async () => null),
    mergeCarts: vi.fn(() => [
      { id: 'guest', quantity: 1 },
      { id: 'user', quantity: 2 },
    ]),
    auth: { currentUser: null },
    ...params,
  };
};

describe('cartSyncService', () => {
  beforeEach(() => {
    resetCartSyncDependencies();
    resetCartSyncState();
    vi.clearAllMocks();
  });

  it('marks guest session and hydrates cart when user signs out', async () => {
    const dependencies = createDependencies({
      auth: { currentUser: { uid: 'user-1' } },
    });
    overrideCartSyncDependencies(dependencies);

    const dispatch = vi.fn();
    await handleUserChange(null, dispatch);

    expect(dispatch).toHaveBeenCalledWith(hydrateCart());
  });

  it('merges guest and user carts during login', async () => {
    const mergedCart = [
      { id: 'guest', quantity: 1 },
      { id: 'user', quantity: 2 },
    ];
    const dependencies = createDependencies({ mergeCarts: vi.fn(() => mergedCart) });
    overrideCartSyncDependencies(dependencies);

    const dispatch = vi.fn(() => {
      // noop
    });

    await handleUserChange(null, dispatch);
    dispatch.mockClear();

    await handleUserChange({ uid: 'user-1' }, dispatch);

    expect(dependencies.loadUserCart).toHaveBeenCalledWith('user-1');
    expect(dependencies.saveUserCart).toHaveBeenCalledWith('user-1', mergedCart);
    expect(dependencies.storage.removeItem).toHaveBeenCalledWith('cart');
    expect(dispatch).toHaveBeenCalledWith(setCart(mergedCart));
    expect(dispatch).toHaveBeenCalledWith(hydrateCart());
  });

  it('does not persist cart changes until user is authenticated and hydrated', async () => {
    const dependencies = createDependencies({
      auth: { currentUser: null },
      saveUserCart: vi.fn(async () => null),
    });
    overrideCartSyncDependencies(dependencies);
    await handleUserChange(null, vi.fn());

    const cartState = {
      cart: {
        items: [{ id: 'a' }],
        hydrated: false,
      },
    };
    let listener;
    const store = {
      getState: () => cartState,
      subscribe: (cb) => {
        listener = cb;
        return () => {};
      },
    };

    initialize(store);
    cartState.cart.items = [...cartState.cart.items, { id: 'b' }];
    await listener();

    expect(dependencies.saveUserCart).not.toHaveBeenCalled();
  });

  it('skips saving while skipSaveOnLogout flag is set', async () => {
    const dependencies = createDependencies({
      auth: { currentUser: { uid: 'user-2' } },
      saveUserCart: vi.fn(async () => null),
    });
    overrideCartSyncDependencies(dependencies);
    await handleUserChange(null, vi.fn());
    markSkipSaveOnLogout();

    const cartState = {
      cart: {
        items: [],
        hydrated: true,
      },
    };
    let listener;
    const store = {
      getState: () => cartState,
      subscribe: (cb) => {
        listener = cb;
        return () => {};
      },
    };

    initialize(store);
    cartState.cart.items = [{ id: 'x' }];
    await listener();

    expect(dependencies.saveUserCart).not.toHaveBeenCalled();
  });
});
