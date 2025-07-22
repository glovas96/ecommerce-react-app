import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

import { Box, Typography, Button, Skeleton } from "@mui/material";

const ProductPage = () => {
    // Get product ID from URL
    const { id } = useParams();

    // Local state for a single product
    const [product, setProduct] = useState(null);

    // Redux dispatch function
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch product by ID
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then(setProduct);
    }, [id]);

    // Add product to cart
    const handleAdd = () => {
        dispatch(
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
            })
        );
    };

    // Show loading state
    if (!product)
        return (
            <Box sx={{ p: 3 }}>
                {/* Skeleton title */}
                <Skeleton variant="text" width={300} height={40} />

                {/* Skeleton image */}
                <Skeleton
                    variant="rectangular"
                    width={350}
                    height={350}
                    sx={{ my: 2 }}
                />

                {/* Skeleton price */}
                <Skeleton variant="text" width={150} height={32} />

                {/* Skeleton button */}
                <Skeleton
                    variant="rounded"
                    width={180}
                    height={48}
                    sx={{ mt: 2 }}
                />
            </Box>
        );

    // Empty state: product not found
    if (product && product.message === "Product not found")
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    Product not found
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    The product you are looking for does not exist
                </Typography>

                <Button variant="contained" sx={{ mt: 2 }} href="/catalog">
                    Back to catalog
                </Button>
            </Box>
        );

    return (
        <Box sx={{ p: 3 }}>
            {/* Two-column layout */}
            <Box
                sx={{
                    display: "flex",
                    gap: 4,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                {/* Left side — big product image */}
                <Box>
                    <img
                        src={product.thumbnail}
                        width={350}
                        style={{ borderRadius: 8 }}
                    />
                </Box>

                {/* Right side — title, price, description, button */}
                <Box sx={{ maxWidth: 500 }}>
                    <Typography variant="h4" gutterBottom>
                        {product.title}
                    </Typography>

                    <Typography variant="h6" color="primary" gutterBottom>
                        Price: {product.price} $
                    </Typography>

                    {/* Product description */}
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        {product.description}
                    </Typography>

                    {/* Add to cart button */}
                    <Button variant="contained" size="large" onClick={handleAdd}>
                        Add to cart
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductPage;
