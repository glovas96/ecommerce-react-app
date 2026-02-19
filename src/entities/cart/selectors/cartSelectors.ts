import { createSelector } from '@reduxjs/toolkit';

import type { CartState } from '@/entities/cart/types';

const selectCartState = (state: { cart: CartState }) => state.cart;

const getOldPrice = (price: number, discount: number) =>
  discount ? price / (1 - discount / 100) : price;

// Returns an array of cart items
export const selectCartItems = createSelector(selectCartState, (cart) => cart.items);

// Adds the current prices (item.price) multiplied by the quantity
export const selectCartSubtotal = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0),
);

// Old price total before discounts
export const selectCartOriginalTotal = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => {
    const discount = item.discountPercentage ?? 0;
    const oldPrice = getOldPrice(item.price, discount);
    return sum + oldPrice * item.quantity;
  }, 0),
);

// Savings from discounts
export const selectCartDiscount = createSelector(
  [selectCartOriginalTotal, selectCartSubtotal],
  (originalTotal, subtotal) => originalTotal - subtotal,
);

// Amount payable after discounts
export const selectCartTotal = createSelector(
  [selectCartOriginalTotal, selectCartDiscount],
  (originalTotal, discount) => originalTotal - discount,
);

// Adds up the quantities of all positions
export const selectCartCount = createSelector(selectCartItems, (items) =>
  items.reduce((sum, item) => sum + item.quantity, 0),
);

// Indicates whether cart has merged data
export const selectCartHydrated = (state: { cart: CartState }) => state.cart.hydrated;
