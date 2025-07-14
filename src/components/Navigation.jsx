import { AppBar, Toolbar, Typography, Button, Box, Badge } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import { selectCartItems } from "../features/cart/selectors";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Navigation = () => {
    const { user } = useAuth();
    const items = useSelector(selectCartItems);

    const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

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
                    <Button color="inherit" component={Link} to="/catalog">
                        Catalog
                    </Button>

                    <Button color="inherit" component={Link} to="/cart">
                        <Badge badgeContent={cartCount} color="error">
                            Cart
                        </Badge>
                    </Button>

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

                    {user && (
                        <>
                            {/* Email aligned perfectly with buttons */}
                            <Box
                                sx={{
                                    mx: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    color: "white",
                                }}
                            >
                                {user.email}
                            </Box>

                            <Button color="inherit" onClick={() => signOut(auth)}>
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