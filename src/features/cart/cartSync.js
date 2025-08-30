import { saveUserCart } from "./cartApi";
import { auth } from "../../firebase/config";

// Sync cart to Firestore when user is logged in
export const syncCartToFirestore = (store) => {
    let prevState = store.getState().cart.items;

    store.subscribe(async () => {
        const state = store.getState().cart.items;
        const user = auth.currentUser;

        // Skip if no user
        if (!user) return;

        // Skip if no changes
        if (state === prevState) return;
        prevState = state;

        // Skip saving empty cart (prevents overwriting Firestore)
        if (state.length === 0) return;

        // Save updated cart
        await saveUserCart(user.uid, state);
    });
};