import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import { Link } from "react-router-dom";

const HomePage = () => {
    // Local state for popular products
    const [popular, setPopular] = useState([]);

    // Local state for latest products
    const [latest, setLatest] = useState([]);

    // Local state for discount products
    const [discounts, setDiscounts] = useState([]);

    useEffect(() => {
        // Fetch popular products
        fetch("https://dummyjson.com/products?limit=4")
            .then((res) => res.json())
            .then((data) => setPopular(data.products));

        // Fetch latest products
        fetch("https://dummyjson.com/products?skip=4&limit=4")
            .then((res) => res.json())
            .then((data) => setLatest(data.products));

        // Fetch discount products (sorted by discount)
        fetch("https://dummyjson.com/products?sortBy=discountPercentage&order=desc&limit=4")
            .then((res) => res.json())
            .then((data) => setDiscounts(data.products));
    }, []);

    // Reusable product card — SAME STYLE AS RELATED PRODUCTS
    const renderCard = (p) => {
        const hasDiscount = p.discountPercentage >= 10;
        const oldPrice = hasDiscount
            ? (p.price / (1 - p.discountPercentage / 100)).toFixed(2)
            : null;

        return (
            <Card
                key={p.id}
                component={Link}
                to={`/product/${p.id}`}
                sx={{
                    textDecoration: "none",
                    color: "inherit",
                    borderRadius: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    transition: "0.2s",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                    "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
                    },
                }}
            >
                {/* BADGES */}
                {p.discountPercentage > 15 ? (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            backgroundColor: "orange",
                            color: "#fff",
                            px: 1.2,
                            py: 0.3,
                            borderRadius: 1,
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            zIndex: 2,
                        }}
                    >
                        HOT DEAL
                    </Box>
                ) : hasDiscount ? (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            backgroundColor: "error.main",
                            color: "#fff",
                            px: 1.2,
                            py: 0.3,
                            borderRadius: 1,
                            fontSize: "0.75rem",
                            fontWeight: "bold",
                            zIndex: 2,
                        }}
                    >
                        SALE
                    </Box>
                ) : null}

                {/* IMAGE */}
                <CardMedia
                    component="img"
                    image={p.thumbnail}
                    alt={p.title}
                    sx={{
                        height: 180,
                        width: "100%",
                        objectFit: "contain",
                        backgroundColor: "#f5f5f5",
                    }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                    {/* Title — 2 lines like Related products */}
                    <Typography
                        variant="h6"
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            lineHeight: 1.2,
                            minHeight: "2.4em",
                            mb: 1,
                        }}
                    >
                        {p.title}
                    </Typography>

                    {/* PRICE BLOCK — EXACTLY LIKE RELATED PRODUCTS */}
                    <Box sx={{ mb: 1 }}>
                        {hasDiscount ? (
                            <>
                                {/* NEW + OLD PRICE IN ONE LINE */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "baseline",
                                        gap: 1,
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        color="primary"
                                        sx={{ fontWeight: "bold" }}
                                    >
                                        ${p.price}
                                    </Typography>

                                    <Typography
                                        variant="body2"
                                        sx={{
                                            textDecoration: "line-through",
                                            color: "text.secondary",
                                        }}
                                    >
                                        ${oldPrice}
                                    </Typography>
                                </Box>

                                {/* DISCOUNT PERCENT */}
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "error.main",
                                        fontWeight: "bold",
                                        mt: 0.5,
                                    }}
                                >
                                    -{p.discountPercentage}% OFF
                                </Typography>
                            </>
                        ) : (
                            <Typography
                                variant="h6"
                                color="primary"
                                sx={{ fontWeight: "bold" }}
                            >
                                ${p.price}
                            </Typography>
                        )}
                    </Box>

                    {/* ⭐ RATING — SAME AS RELATED PRODUCTS */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <span
                                key={i}
                                style={{
                                    color:
                                        i < Math.round(p.rating)
                                            ? "#FFD700"
                                            : "#ccc",
                                    fontSize: "1.1rem",
                                }}
                            >
                                ★
                            </span>
                        ))}
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ ml: 1 }}
                        >
                            {p.rating.toFixed(1)}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        );
    };

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

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: 3,
                    mt: 2,
                    mb: 6,
                }}
            >
                {popular.map(renderCard)}
            </Box>

            {/* Latest products */}
            <Typography variant="h4" gutterBottom>
                Latest products
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: 3,
                    mt: 2,
                    mb: 6,
                }}
            >
                {latest.map(renderCard)}
            </Box>

            {/* Discount deals */}
            <Typography variant="h4" gutterBottom>
                Discount deals
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: 3,
                    mt: 2,
                }}
            >
                {discounts.map(renderCard)}
            </Box>
        </Box>
    );
};

export default HomePage;