import { useSelector, useDispatch } from "react-redux";
import {
    selectCartItems,
    selectCartTotal,
} from "../features/cart/selectors";
import {
    removeFromCart,
    updateQuantity,
    clearCart,
} from "../features/cart/cartSlice";

import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Button,
    Divider,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const CartPage = () => {
    // Get cart items from Redux
    const items = useSelector(selectCartItems);

    // Get total price
    const total = useSelector(selectCartTotal);

    // Redux dispatch
    const dispatch = useDispatch();

    // Increase quantity
    const increase = (id, qty) =>
        dispatch(updateQuantity({ id, quantity: qty + 1 }));

    // Decrease quantity (min 1)
    const decrease = (id, qty) =>
        dispatch(updateQuantity({ id, quantity: qty > 1 ? qty - 1 : 1 }));

    // Empty cart state
    if (!items.length)
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Your cart is empty
                </Typography>

                <Typography color="text.secondary">
                    Add products to your cart to see them here
                </Typography>
            </Box>
        );

    return (
        <Box sx={{ p: 3 }}>
            {/* Page title */}
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>

            {/* Cart items list */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {items.map((item) => (
                    <Card
                        key={item.id}
                        sx={{
                            display: "flex",
                            p: 2,
                            borderRadius: 2,
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        }}
                    >
                        {/* Product image */}
                        <CardMedia
                            component="img"
                            image={item.thumbnail}
                            alt={item.title}
                            sx={{
                                width: 120,
                                height: 120,
                                objectFit: "contain",
                                backgroundColor: "#f5f5f5",
                                borderRadius: 1,
                            }}
                        />

                        {/* Product info */}
                        <CardContent sx={{ flex: 1 }}>
                            {/* Title */}
                            <Typography variant="h6">{item.title}</Typography>

                            {/* Price per item */}
                            <Typography color="text.secondary" sx={{ mb: 1 }}>
                                ${item.price} each
                            </Typography>

                            {/* Quantity selector */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                }}
                            >
                                <IconButton onClick={() => decrease(item.id, item.quantity)}>
                                    <RemoveIcon />
                                </IconButton>

                                <Typography variant="h6">{item.quantity}</Typography>

                                <IconButton onClick={() => increase(item.id, item.quantity)}>
                                    <AddIcon />
                                </IconButton>
                            </Box>

                            {/* Subtotal */}
                            <Typography sx={{ mt: 1 }}>
                                Subtotal:{" "}
                                <strong>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </strong>
                            </Typography>
                        </CardContent>

                        {/* Delete item */}
                        <IconButton
                            onClick={() => dispatch(removeFromCart(item.id))}
                            sx={{ alignSelf: "center" }}
                        >
                            <DeleteIcon color="error" />
                        </IconButton>
                    </Card>
                ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Total price */}
            <Typography variant="h5" sx={{ mb: 2 }}>
                Total: <strong>${total.toFixed(2)}</strong>
            </Typography>

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" size="large" href="/checkout">
                    Proceed to checkout
                </Button>

                <Button
                    variant="outlined"
                    size="large"
                    color="error"
                    onClick={() => dispatch(clearCart())}
                >
                    Clear cart
                </Button>
            </Box>
        </Box>
    );
};

export default CartPage;

