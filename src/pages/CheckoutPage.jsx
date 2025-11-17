import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, selectCartTotal } from "../features/cart/selectors";
import { clearCart } from "../features/cart/cartSlice";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

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
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../validation/checkoutSchema";

const CheckoutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useAuth();
    const location = useLocation();

    // Read Buy Now item (if exists)
    const singleItem = location.state?.singleItem || null;

    // Select items depending on checkout mode
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    // Final items for checkout
    const items = singleItem ? [singleItem] : cartItems;

    // Final total for checkout
    const total = singleItem
        ? singleItem.price * singleItem.quantity
        : cartTotal;

    const [loading, setLoading] = useState(false);
    const [payment, setPayment] = useState("card");
    const [delivery, setDelivery] = useState("standard");

    // React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(checkoutSchema),
        mode: "onChange",
    });

    // Submit handler
    const onSubmit = async (data) => {
        if (!user) {
            navigate("/login?redirectTo=/checkout");
            return;
        }

        setLoading(true);

        // Save order to Firestore
        await addDoc(collection(db, "orders"), {
            userId: user.uid,
            email: user.email,
            items, // final items list
            total, // final total
            paymentMethod: payment,
            deliveryOption: delivery,
            status: "processing",
            createdAt: serverTimestamp(),
            ...data,
            address: {
                city: data.city,
                street: data.street,
                zip: data.zip,
            },
        });

        // Clear cart only if this is NOT Buy Now
        if (!singleItem) {
            dispatch(clearCart());
        }

        navigate("/orders");
    };

    // Empty cart state (only if not Buy Now)
    if (!singleItem && !cartItems.length)
        return (
            <Typography sx={{ p: 3 }} variant="h6">
                Your cart is empty
            </Typography>
        );

    return (
        <Box sx={{ p: 3, maxWidth: 700, mx: "auto", display: "flex", flexDirection: "column", gap: 4 }}>

            {/* Page title */}
            <Typography variant="h4" gutterBottom>
                Place your order
            </Typography>

            {/* 1. Delivery address */}
            <Box>
                <Typography variant="h5" gutterBottom>
                    1. Delivery address
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
                >
                    <TextField
                        label="Full name"
                        {...register("name")}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />

                    <TextField
                        label="Phone"
                        {...register("phone")}
                        error={!!errors.phone}
                        helperText={errors.phone?.message}
                    />

                    <TextField
                        label="City"
                        {...register("city")}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                    />

                    <TextField
                        label="Street"
                        {...register("street")}
                        error={!!errors.street}
                        helperText={errors.street?.message}
                    />

                    <TextField
                        label="ZIP code"
                        {...register("zip")}
                        error={!!errors.zip}
                        helperText={errors.zip?.message}
                        inputMode="numeric"
                    />
                </Box>
            </Box>

            <Divider />

            {/* 2. Payment method */}
            <Box>
                <Typography variant="h5" gutterBottom>
                    2. Payment method
                </Typography>

                <RadioGroup
                    value={payment}
                    onChange={(e) => setPayment(e.target.value)}
                    sx={{ mt: 1 }}
                >
                    <FormControlLabel value="card" control={<Radio />} label="Credit / Debit card" />
                    <FormControlLabel value="cash" control={<Radio />} label="Cash on delivery" />
                </RadioGroup>
            </Box>

            <Divider />

            {/* 3. Delivery options */}
            <Box>
                <Typography variant="h5" gutterBottom>
                    3. Delivery options
                </Typography>

                <RadioGroup
                    value={delivery}
                    onChange={(e) => setDelivery(e.target.value)}
                    sx={{ mt: 1 }}
                >
                    <FormControlLabel value="standard" control={<Radio />} label="Standard delivery (Free)" />
                    <FormControlLabel value="express" control={<Radio />} label="Express delivery (+$5)" />
                </RadioGroup>
            </Box>

            <Divider />

            {/* 4. Review items */}
            <Box>
                <Typography variant="h5" gutterBottom>
                    4. Review items
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {items.map((item) => (
                        <Box
                            key={item.id}
                            sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                                borderBottom: "1px solid #eee",
                                pb: 1,
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={item.thumbnail}
                                alt={item.title}
                                sx={{
                                    width: 60,
                                    height: 60,
                                    objectFit: "contain",
                                    borderRadius: 1,
                                    backgroundColor: "#f5f5f5",
                                }}
                            />

                            <Box sx={{ flex: 1 }}>
                                <Typography variant="subtitle2">{item.title}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.quantity} × ${item.price}
                                </Typography>
                            </Box>

                            <Typography>
                                ${(item.price * item.quantity).toFixed(2)}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            <Divider />

            {/* 5. Order summary */}
            <Box>
                <Typography variant="h5" gutterBottom>
                    5. Order summary
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>Items:</Typography>
                        <Typography>${total}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography>Shipping:</Typography>
                        <Typography>{delivery === "express" ? "$5" : "Free"}</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6">Order total:</Typography>
                        <Typography variant="h6">
                            ${delivery === "express" ? total + 5 : total}
                        </Typography>
                    </Box>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleSubmit(onSubmit)}
                    disabled={loading}
                >
                    {loading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        "Place your order"
                    )}
                </Button>
            </Box>
        </Box>
    );
};

export default CheckoutPage;