import { useSelector, useDispatch } from "react-redux";
import {
    selectCartItems,
    selectCartTotal,
} from "../features/cart/selectors";
import {
    updateQuantity,
    removeFromCart,
} from "../features/cart/cartSlice";

import {
    Box,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link } from "react-router-dom";

const CartPage = () => {
    // Read cart data from Redux
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const dispatch = useDispatch();

    // If cart is empty — show empty state
    if (!items.length)
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Your cart is empty
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    Add some products to see them here
                </Typography>

                {/* Button to go back to catalog */}
                <Button
                    component={Link}
                    to="/catalog"
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    Go to catalog
                </Button>
            </Box>
        );

    return (
        <Box sx={{ p: 3 }}>
            {/* Page title */}
            <Typography variant="h4" gutterBottom>
                Cart
            </Typography>

            {/* Cart items rendered as product cards */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {items.map((item) => (
                    <Card
                        key={item.id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            p: 1,
                            gap: 2,
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
                                objectFit: "cover",
                                borderRadius: 1,
                            }}
                        />

                        {/* Product info */}
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6">{item.title}</Typography>

                            <Typography variant="body2" color="text.secondary">
                                Price: ${item.price}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Subtotal: ${(item.price * item.quantity).toFixed(2)}
                            </Typography>
                        </CardContent>

                        {/* Quantity controls */}
                        <CardActions sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {/* Decrease quantity */}
                            <IconButton
                                onClick={() =>
                                    dispatch(
                                        updateQuantity({
                                            id: item.id,
                                            quantity: Math.max(1, item.quantity - 1),
                                        })
                                    )
                                }
                            >
                                <RemoveIcon />
                            </IconButton>

                            {/* Quantity display */}
                            <Typography>{item.quantity}</Typography>

                            {/* Increase quantity */}
                            <IconButton
                                onClick={() =>
                                    dispatch(
                                        updateQuantity({
                                            id: item.id,
                                            quantity: item.quantity + 1,
                                        })
                                    )
                                }
                            >
                                <AddIcon />
                            </IconButton>

                            {/* Remove item */}
                            <IconButton
                                color="error"
                                onClick={() => dispatch(removeFromCart(item.id))}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </Box>

            {/* Total price */}
            <Typography variant="h5" sx={{ mt: 3 }}>
                Total: {total} $
            </Typography>

            {/* Checkout button */}
            <Button
                component={Link}
                to="/checkout"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
            >
                Proceed to checkout
            </Button>
        </Box>
    );
};

export default CartPage;

