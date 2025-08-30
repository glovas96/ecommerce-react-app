// Select all cart items
export const selectCartItems = (state) => state.cart.items;

// Select total price
export const selectCartTotal = (state) =>
    state.cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

// Select total quantity
export const selectCartCount = (state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);