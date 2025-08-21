import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage on app start
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const initialState = {
    items: savedCart, // {id, title, price, quantity, thumbnail}
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

            // Persist cart to localStorage
            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        // Remove product by ID
        removeFromCart(state, action) {
            state.items = state.items.filter((i) => i.id !== action.payload);

            // Persist cart to localStorage
            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        // Update quantity
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find((i) => i.id === id);

            if (item && quantity > 0) {
                item.quantity = quantity;
            }

            // Persist cart to localStorage
            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        // Clear entire cart
        clearCart(state) {
            state.items = [];

            // Persist cart to localStorage
            localStorage.setItem("cart", JSON.stringify(state.items));
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
    cartSlice.actions;

export default cartSlice.reducer;
