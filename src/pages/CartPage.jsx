import { useSelector, useDispatch } from "react-redux";
import {
    selectCartItems,
    selectCartTotal,
} from "../features/cart/selectors";
import {
    updateQuantity,
    removeFromCart,
} from "../features/cart/cartSlice";

// MUI components
import { Box, Typography, Button, TextField } from "@mui/material";

const CartPage = () => {
    // Read cart data from Redux
    const items = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    const dispatch = useDispatch();

    // Empty cart state
    if (!items.length)
        return (
            <Typography sx={{ p: 3 }} variant="h6">
                Cart is empty
            </Typography>
        );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Cart
            </Typography>

            {/* Cart items list */}
            <Box component="ul" sx={{ pl: 2 }}>
                {items.map((item) => (
                    <Box component="li" key={item.id} sx={{ mb: 2 }}>
                        {item.title} — {item.price} $ ×

                        {/* Quantity input (same height as small button) */}
                        <TextField
                            type="number"
                            size="small"
                            sx={{
                                width: 80,
                                mx: 1,
                                "& .MuiInputBase-root": {
                                    height: 32,
                                },
                                "& input": {
                                    padding: "0 8px",
                                },
                            }}
                            inputProps={{ min: 1 }}
                            value={item.quantity}
                            onChange={(e) =>
                                dispatch(
                                    updateQuantity({
                                        id: item.id,
                                        quantity: Number(e.target.value),
                                    })
                                )
                            }
                        />

                        {/* Remove button */}
                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            onClick={() => dispatch(removeFromCart(item.id))}
                        >
                            Remove
                        </Button>
                    </Box>
                ))}
            </Box>

            {/* Total price */}
            <Typography variant="h5" sx={{ mt: 3 }}>
                Total: {total} $
            </Typography>
        </Box>
    );
};

export default CartPage;
