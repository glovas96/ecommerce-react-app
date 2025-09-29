import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
    // Local state for popular products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch limited list of products for homepage
        fetch("https://dummyjson.com/products?limit=4")
            .then((res) => res.json())
            .then((data) => setProducts(data.products));
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            {/* Hero section */}
            <Box
                sx={{
                    textAlign: "center",
                    py: 8,
                    borderRadius: 4,
                    background: "linear-gradient(135deg, #1976d2, #42a5f5)",
                    color: "white",
                    mb: 6,
                }}
            >
                <Typography variant="h3" fontWeight="bold" gutterBottom>
                    Welcome to our store
                </Typography>

                <Typography variant="h6" sx={{ mb: 3 }}>
                    Discover top products at the best prices
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/catalog"
                    sx={{
                        background: "white",
                        color: "#1976d2",
                        fontWeight: "bold",
                    }}
                >
                    Go to catalog
                </Button>
            </Box>

            {/* Popular products */}
            <Typography variant="h4" gutterBottom>
                Popular products
            </Typography>

            {/* Product grid */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: 3,
                    mt: 2,
                }}
            >
                {products.map((p) => (
                    <Card
                        key={p.id}
                        component={Link}
                        to={`/product/${p.id}`}
                        sx={{
                            textDecoration: "none",
                            color: "inherit",
                            borderRadius: 3,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            transition: "0.2s",
                            "&:hover": { transform: "translateY(-4px)" },
                        }}
                    >
                        {/* Image container (prevents stretching/cropping) */}
                        <Box
                            sx={{
                                width: "100%",
                                height: 180,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#f5f5f5",
                                borderRadius: 2,
                                overflow: "hidden",
                                p: 1,
                            }}
                        >
                            <img
                                src={p.thumbnail}
                                alt={p.title}
                                style={{
                                    maxWidth: "100%",
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </Box>

                        {/* Product info */}
                        <CardContent>
                            <Typography variant="h6" noWrap>
                                {p.title}
                            </Typography>

                            <Typography variant="body1" color="primary">
                                ${p.price}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default HomePage;