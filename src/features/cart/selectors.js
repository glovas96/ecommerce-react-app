// Select all cart items
export const selectCartItems = (state) => state.cart.items;

// Select total price of all items
export const selectCartTotal = (state) =>
    state.cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

// Select total quantity of all items
export const selectCartCount = (state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
