import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal } from "../features/cart/selectors";
import { clearCart } from "../features/cart/cartSlice";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

import {
    Box,
    TextField,
    Button,
    Typography,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Divider,
} from "@mui/material";

// Zod schema
import { z } from "zod";

// Strict validation similar to Ozon/WB
const checkoutSchema = z.object({
    name: z
        .string()
        .min(2, "Name is too short")
        .regex(/^[A-Za-z\s-]+$/, "Name must contain only letters"),

    phone: z
        .string()
        .regex(/^\+?\d{10,15}$/, "Invalid phone number"),

    city: z
        .string()
        .min(2, "City is too short")
        .regex(/^[A-Za-z\s-]+$/, "City must contain only letters"),

    street: z
        .string()
        .min(3, "Street is too short"),

    zip: z
        .string()
        .regex(/^\d{4,10}$/, "ZIP must contain only digits"),
});

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

    // Validation errors
    const [errors, setErrors] = useState({});

    // Loading state for submit button
    const [loading, setLoading] = useState(false);

    // Clear field-specific error when user types
    const clearFieldError = (field) => {
        setErrors((prev) => {
            if (!prev[field]) return prev;
            const updated = { ...prev };
            delete updated[field];
            return updated;
        });
    };

    // Submit order handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("SUBMIT CLICKED");

        // Validate form with Zod
        const result = checkoutSchema.safeParse({
            name,
            phone,
            city,
            street,
            zip,
        });

        if (!result.success) {
            const formatted = {};
            result.error.issues.forEach((err) => {
                formatted[err.path[0]] = err.message;
            });
            setErrors(formatted);
            return;
        }

        // Clear errors if validation passed
        setErrors({});

        // Redirect if user is not logged in
        if (!user) {
            navigate("/login?redirectTo=/checkout");
            return;
        }

        setLoading(true);

        // Create order in Firestore
        await addDoc(collection(db, "orders"), {
            userId: user.uid,
            email: user.email,
            items,
            total,
            status: "processing",
            createdAt: serverTimestamp(),
            name,
            phone,
            address: { city, street, zip },
        });

        // Clear cart and redirect to orders page
        dispatch(clearCart());
        navigate("/orders");
    };

    // If cart is empty
    if (!items.length)
        return (
            <Typography sx={{ p: 3 }} variant="h6">
                Your cart is empty
            </Typography>
        );

    return (
        <Box sx={{ p: 3, display: "flex", gap: 4 }}>
            {/* LEFT COLUMN — Delivery form */}
            <Box sx={{ flex: 1 }}>
                <Typography variant="h4" gutterBottom>
                    Checkout
                </Typography>

                {/* Checkout form */}
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mt: 2,
                        maxWidth: 400,
                    }}
                >
                    <TextField
                        label="Full name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            clearFieldError("name");
                        }}
                        error={!!errors.name}
                        helperText={errors.name}
                        type="text"
                    />

                    <TextField
                        label="Phone"
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            clearFieldError("phone");
                        }}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        type="text"
                    />

                    <TextField
                        label="City"
                        value={city}
                        onChange={(e) => {
                            setCity(e.target.value);
                            clearFieldError("city");
                        }}
                        error={!!errors.city}
                        helperText={errors.city}
                        type="text"
                    />

                    <TextField
                        label="Street"
                        value={street}
                        onChange={(e) => {
                            setStreet(e.target.value);
                            clearFieldError("street");
                        }}
                        error={!!errors.street}
                        helperText={errors.street}
                        type="text"
                    />

                    <TextField
                        label="ZIP code"
                        value={zip}
                        onChange={(e) => {
                            setZip(e.target.value);
                            clearFieldError("zip");
                        }}
                        error={!!errors.zip}
                        helperText={errors.zip}
                        type="text"
                        inputMode="numeric"
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        sx={{ mt: 1 }}
                    >
                        {loading ? (
                            <CircularProgress size={24} color="inherit" />
                        ) : (
                            "Place order"
                        )}
                    </Button>
                </Box>
            </Box>

            {/* RIGHT COLUMN — Order summary */}
            <Box sx={{ width: 380 }}>
                <Typography variant="h5" gutterBottom>
                    Your order
                </Typography>

                {/* List of items */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {items.map((item) => (
                        <Card key={item.id} sx={{ display: "flex", p: 1, gap: 2 }}>
                            <CardMedia
                                component="img"
                                image={item.thumbnail}
                                alt={item.title}
                                sx={{
                                    width: 80,
                                    height: 80,
                                    objectFit: "cover",
                                    borderRadius: 1,
                                }}
                            />

                            <CardContent sx={{ p: 1 }}>
                                <Typography variant="subtitle1">
                                    {item.title}
                                </Typography>

                                <Typography variant="body2" color="text.secondary">
                                    {item.quantity} × ${item.price}
                                </Typography>

                                <Typography sx={{ mt: 1 }}>
                                    Subtotal:{" "}
                                    <strong>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </strong>
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Total */}
                <Card sx={{ p: 2 }}>
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h4" sx={{ mt: 1 }}>
                        ${total}
                    </Typography>
                </Card>
            </Box>
        </Box>
    );
};

export default CheckoutPage;