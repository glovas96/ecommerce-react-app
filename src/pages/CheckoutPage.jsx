import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal } from "../features/cart/selectors";
import { clearCart } from "../features/cart/cartSlice";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

const CheckoutPage = () => {
    // Redux state
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);

    // Auth + navigation
    const { user } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Form fields
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    const [zip, setZip] = useState("");

    // Submit order
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Redirect if not logged in
        if (!user) {
            navigate("/login?redirectTo=/checkout");
            return;
        }

        // Create order in Firestore
        await addDoc(collection(db, "orders"), {
            userId: user.uid,
            items,
            total,
            status: "pending",
            createdAt: serverTimestamp(),
            name,
            phone,
            address: { city, street, zip },
        });

        // Clear cart and redirect
        dispatch(clearCart());
        navigate("/orders");
    };

    // Empty cart state
    if (!items.length) return <div>Your cart is empty</div>;

    return (
        <div>
            <h1>Checkout</h1>

            {/* Checkout form */}
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <input
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />

                <input
                    placeholder="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />

                <input
                    placeholder="ZIP code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                />

                <button type="submit">Place order</button>
            </form>

            {/* Order total */}
            <h2>Total: {total} $</h2>
        </div>
    );
};

export default CheckoutPage;
