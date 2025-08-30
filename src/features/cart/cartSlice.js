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
            const item = action.payload;
            const existing = state.items.find((i) => i.id === item.id);

            if (existing) {
                existing.quantity += 1;
            } else {
                state.items.push({ ...item, quantity: 1 });
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