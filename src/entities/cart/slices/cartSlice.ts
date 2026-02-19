import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { CartItem, CartState } from '@/entities/cart/types';

const savedCart: CartItem[] = JSON.parse(localStorage.getItem('cart') ?? '[]');

const initialState: CartState = {
  items: savedCart,
  hydrated: false,
};

const persistCart = (items: CartItem[]) => {
  localStorage.setItem('cart', JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.hydrated = true;
      persistCart(state.items);
    },
    addToCart(state, action: PayloadAction<CartItem>) {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push({ ...item, quantity: item.quantity });
      }
      persistCart(state.items);
    },
    removeFromCart(state, action: PayloadAction<string | number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      persistCart(state.items);
    },
    updateQuantity(state, action: PayloadAction<{ id: string | number; quantity: number }>) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
      }
      persistCart(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.hydrated = true;
      persistCart(state.items);
    },
    hydrateCart(state) {
      state.hydrated = true;
    },
    resetHydration(state) {
      state.hydrated = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setCart,
  hydrateCart,
  resetHydration,
} = cartSlice.actions;

export default cartSlice.reducer;
