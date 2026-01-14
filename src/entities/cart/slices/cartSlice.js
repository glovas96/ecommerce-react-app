import { createSlice } from '@reduxjs/toolkit';

// Load guest cart from localStorage
const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

const initialState = {
  items: savedCart,
  hydrated: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Replace entire cart (after login merge)
    setCart(state, action) {
      state.items = action.payload;
      state.hydrated = true;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    // Add product to cart
    addToCart(state, action) {
      const item = action.payload;
      const existing = state.items.find((i) => i.id === item.id);

      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.items.push({ ...item, quantity: item.quantity });
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    // Remove product
    removeFromCart(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    // Update quantity
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);

      if (item && quantity > 0) {
        item.quantity = quantity;
      }

      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    // Clear cart
    clearCart(state) {
      state.items = [];
      state.hydrated = true;
      localStorage.setItem('cart', JSON.stringify(state.items));
    },

    // Mark cart as synced after hydrate
    hydrateCart(state) {
      state.hydrated = true;
    },

    // Reset sync flag before merging carts
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
