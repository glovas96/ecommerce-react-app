import { createContext, useContext, useEffect, useState } from "react";
import { useAuthListener } from "../hooks/useAuthListener";
import { useDispatch } from "react-redux";
import { setCart } from "../features/cart/cartSlice";
import { loadUserCart, saveUserCart } from "../features/cart/cartApi";
import { mergeCarts } from "../features/cart/mergeCarts";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const value = useAuthListener();
    const dispatch = useDispatch();
    const [cartSyncing, setCartSyncing] = useState(false);
    const [cartReady, setCartReady] = useState(false);

    useEffect(() => {
        const syncCart = async () => {
            const { user } = value;

            if (!user) {
                setCartSyncing(false);
                setCartReady(true);
                return;
            }

            setCartSyncing(true);

            // Delay to ensure Firestore returns fresh data
            await new Promise((res) => setTimeout(res, 300));

            // Load guest cart from localStorage
            const guestCart = JSON.parse(localStorage.getItem("cart")) || [];

            // Load user cart from Firestore
            const userCart = await loadUserCart(user.uid);

            // Merge guest + user carts
            const merged = mergeCarts(guestCart, userCart);

            // Save merged cart to Firestore
            await saveUserCart(user.uid, merged);

            // Update Redux store
            dispatch(setCart(merged));

            // Clear guest cart after sync
            localStorage.removeItem("cart");

            setCartSyncing(false);
            setCartReady(true);
        };

        if (!value.loading) {
            syncCart();
        }
    }, [value.loading, value.user]);

    return (
        <AuthContext.Provider value={{ ...value, cartSyncing, cartReady }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
