import { createSlice } from "@reduxjs/toolkit";

// Load guest cart from localStorage
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
    items: savedCart,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Replace entire cart (after login merge)
        setCart(state, action) {
            state.items = action.payload;
            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        // Add product to cart
        addToCart(state, action) {
            const item = action.payload; // item contains id, title, price, thumbnail, quantity
            const existing = state.items.find((i) => i.id === item.id);

            if (existing) {
                // Increase by selected quantity (NOT +1)
                existing.quantity += item.quantity;
            } else {
                // Add new item with selected quantity (NOT 1)
                state.items.push({ ...item, quantity: item.quantity });
            }

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        // Remove product
        removeFromCart(state, action) {
            state.items = state.items.filter((i) => i.id !== action.payload);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        // Update quantity
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => i.id === id);

            if (item && quantity > 0) {
                item.quantity = quantity;
            }

            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        // Clear cart
        clearCart(state) {
            state.items = [];
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
