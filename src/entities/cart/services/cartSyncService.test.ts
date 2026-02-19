import type { AnyAction, Dispatch } from 'redux';
import { describe, expect, it, beforeEach, vi } from 'vitest';

import type { AuthUser } from '@/entities/auth/types';
import {
  handleUserChange,
  initialize,
  markSkipSaveOnLogout,
  overrideCartSyncDependencies,
  resetCartSyncDependencies,
  resetCartSyncState,
} from '@/entities/cart/services/cartSyncService';
import { hydrateCart, setCart } from '@/entities/cart/slices/cartSlice';
import type { CartSyncDependencies, CartItem } from '@/entities/cart/types';
import { createMockStorage } from '@/test/mocks/storage';

const createCartItem = (overrides: Partial<CartItem> = {}): CartItem => ({
  id: 1,
  title: 'Item',
  price: 1,
  quantity: 1,
  rating: 4,
  discountPercentage: 0,
  category: 'test',
  thumbnail: 'item.jpg',
  images: ['item.jpg'],
  ...overrides,
});

const createDependencies = (params: Partial<CartSyncDependencies> = {}) => {
  const storage = createMockStorage();
  storage.setItem('cart', JSON.stringify([createCartItem({ id: 101 })]));
  const originalRemove = storage.removeItem;
  storage.removeItem = vi.fn((key: string) => originalRemove(key));

  const userCart = [createCartItem({ id: 102, price: 2, quantity: 2 })];

  return {
    storage: storage as CartSyncDependencies['storage'],
    delay: () => Promise.resolve(),
    loadUserCart: vi.fn(async () => userCart) as CartSyncDependencies['loadUserCart'],
    saveUserCart: vi.fn(async () => undefined) as CartSyncDependencies['saveUserCart'],
    mergeCarts: vi.fn((_guest: CartItem[]) => [
      ...userCart,
      ..._guest,
    ]) as CartSyncDependencies['mergeCarts'],
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

  const mockUser: AuthUser = {
    id: 'user-1',
    uid: 'user-1',
    email: 'user@example.com',
    name: 'User',
    roles: [],
  };

  it('marks guest session and hydrates cart when user signs out', async () => {
    const dependencies = createDependencies({ auth: { currentUser: null } });
    overrideCartSyncDependencies(dependencies);

    const dispatchMock = vi.fn<(action: AnyAction) => AnyAction>();
    const dispatch = dispatchMock as Dispatch<AnyAction>;
    await handleUserChange(null, dispatch);

    expect(dispatch).toHaveBeenCalledWith(hydrateCart());
  });

  it('merges guest and user carts during login', async () => {
    const mergedCart = [
      createCartItem({ id: 102, quantity: 2, price: 2 }),
      createCartItem({ id: 101, quantity: 1 }),
    ];
    const dependencies = createDependencies({
      mergeCarts: vi.fn(() => mergedCart) as CartSyncDependencies['mergeCarts'],
    });
    overrideCartSyncDependencies(dependencies);

    const dispatchMock = vi.fn<(action: AnyAction) => AnyAction>();
    const dispatch = dispatchMock as Dispatch<AnyAction>;

    await handleUserChange(null, dispatch);
    dispatchMock.mockClear();

    await handleUserChange(mockUser, dispatch);

    expect(dependencies.loadUserCart).toHaveBeenCalledWith('user-1');
    expect(dependencies.saveUserCart).toHaveBeenCalledWith('user-1', mergedCart);
    expect(dependencies.storage.removeItem).toHaveBeenCalledWith('cart');
    expect(dispatch).toHaveBeenCalledWith(setCart(mergedCart));
    expect(dispatch).toHaveBeenCalledWith(hydrateCart());
  });

  it('does not persist cart changes until user is authenticated and hydrated', async () => {
    const dependencies = createDependencies({
      auth: { currentUser: null },
      saveUserCart: vi.fn(async () => undefined) as CartSyncDependencies['saveUserCart'],
    });
    overrideCartSyncDependencies(dependencies);
    const dispatch = vi.fn<(action: AnyAction) => AnyAction>() as Dispatch<AnyAction>;
    await handleUserChange(null, dispatch);

    const cartState: { cart: { items: CartItem[]; hydrated: boolean } } = {
      cart: {
        items: [createCartItem({ id: 201 })],
        hydrated: false,
      },
    };
    let listener: (() => void) | undefined;
    const store = {
      getState: () => cartState,
      subscribe: (cb: () => void) => {
        listener = cb;
        return () => {};
      },
    };

    initialize(store);
    cartState.cart.items = [...cartState.cart.items, createCartItem({ id: 202 })];
    await listener?.();

    expect(dependencies.saveUserCart).not.toHaveBeenCalled();
  });

  it('skips saving while skipSaveOnLogout flag is set', async () => {
    const dependencies = createDependencies({
      auth: { currentUser: { uid: 'user-2' } },
      saveUserCart: vi.fn(async () => undefined) as CartSyncDependencies['saveUserCart'],
    });
    overrideCartSyncDependencies(dependencies);
    const dispatch = vi.fn<(action: AnyAction) => AnyAction>() as Dispatch<AnyAction>;
    await handleUserChange(null, dispatch);
    markSkipSaveOnLogout();

    const cartState: { cart: { items: CartItem[]; hydrated: boolean } } = {
      cart: {
        items: [],
        hydrated: true,
      },
    };
    let listener: (() => void) | undefined;
    const store = {
      getState: () => cartState,
      subscribe: (cb: () => void) => {
        listener = cb;
        return () => {};
      },
    };

    initialize(store);
    cartState.cart.items = [createCartItem({ id: 203 })];
    await listener?.();

    expect(dependencies.saveUserCart).not.toHaveBeenCalled();
  });
});
