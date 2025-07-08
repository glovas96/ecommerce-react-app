import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal } from "../features/cart/selectors";
import { clearCart } from "../features/cart/cartSlice";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

import { Box, TextField, Button, Typography } from "@mui/material";

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
    if (!items.length)
        return (
            <Typography sx={{ p: 3 }} variant="h6">
                Your cart is empty
            </Typography>
        );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Checkout
            </Typography>

            {/* Checkout form */}
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: 350,
                    mt: 2,
                }}
            >
                <TextField
                    label="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="ZIP code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    fullWidth
                />

                <Button type="submit" variant="contained" size="large">
                    Place order
                </Button>
            </Box>

            {/* Order total */}
            <Typography variant="h5" sx={{ mt: 3 }}>
                Total: {total} $
            </Typography>
        </Box>
    );
};

export default CheckoutPage;
