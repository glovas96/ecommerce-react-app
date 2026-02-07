import { AppBar, Toolbar, Typography, Button, Box, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../features/cart/selectors";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { setCart } from "../features/cart/cartSlice";

const Navigation = () => {
    const { user } = useAuth();
    const items = useSelector(selectCartItems);
    const dispatch = useDispatch();

    // Count total items in cart
    const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

    // Handle logout: clear Redux + localStorage + Firebase session
    const handleLogout = async () => {
        dispatch(setCart([])); // Reset Redux cart
        localStorage.removeItem("cart"); // Clear guest cart
        await signOut(auth); // Firebase logout
    };

    return (
        <AppBar position="static">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

                {/* Logo */}
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ color: "inherit", textDecoration: "none" }}
                >
                    E‑Shop
                </Typography>

                {/* Navigation buttons */}
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>

                    {/* Catalog */}
                    <Button color="inherit" component={Link} to="/catalog">
                        Catalog
                    </Button>

                    {/* Cart with badge */}
                    <Button color="inherit" component={Link} to="/cart">
                        <Badge badgeContent={cartCount} color="error">
                            Cart
                        </Badge>
                    </Button>

                    {/* If user is NOT logged in */}
                    {!user && (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                        </>
                    )}

                    {/* If user IS logged in */}
                    {user && (
                        <>
                            {/* Clickable user email → goes to orders */}
                            <Button
                                component={Link}
                                to="/orders"
                                color="inherit"
                                sx={{ textTransform: "none" }}
                            >
                                {user.email}
                            </Button>

                            {/* Logout */}
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navigation;
