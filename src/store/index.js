import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import { syncCartToFirestore } from "../features/cart/cartSync";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

// Sync Firestore cart for logged-in users
syncCartToFirestore(store);
