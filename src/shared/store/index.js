import { configureStore } from '@reduxjs/toolkit';

import { initialize as initializeCartSync } from '@/entities/cart/services/cartSyncService';
import cartReducer from '@/entities/cart/slices/cartSlice';

// Central Redux store for shared state
export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

// Start the cart synchronization service
initializeCartSync(store);
