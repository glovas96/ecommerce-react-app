// Cart slice: handles cart logic
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [], // {id, title, price, quantity, thumbnail}
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Add product to cart
        addToCart(state, action) {
            const item = action.payload;
            const existing = state.items.find((i) => i.id === item.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
            }
        },

        // Remove product by ID
        removeFromCart(state, action) {
            state.items = state.items.filter((i) => i.id !== action.payload);
        },

        // Update quantity
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => i.id === id);

            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },

        // Clear entire cart
        clearCart(state) {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;
