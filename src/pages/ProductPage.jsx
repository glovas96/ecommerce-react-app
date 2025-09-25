import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

import {
    Box,
    Typography,
    Button,
    Skeleton,
    Rating,
    IconButton,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductPage = () => {
    // Get product ID from URL
    const { id } = useParams();

    // Local state for a single product
    const [product, setProduct] = useState(null);

    // Selected image for gallery
    const [selectedImage, setSelectedImage] = useState(null);

    // Quantity selector
    const [quantity, setQuantity] = useState(1);

    // Redux dispatch function
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch product by ID
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setSelectedImage(data.thumbnail);
            });
    }, [id]);

    // Add product to cart
    const handleAdd = () => {
        dispatch(
            addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity,
            })
        );
    };

    const increase = () => setQuantity((q) => q + 1);
    const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    // Show loading state
    if (!product)
        return (
            <Box sx={{ p: 3 }}>
                <Skeleton variant="text" width={300} height={40} />
                <Skeleton variant="rectangular" width={350} height={350} sx={{ my: 2 }} />
                <Skeleton variant="text" width={150} height={32} />
                <Skeleton variant="rounded" width={180} height={48} sx={{ mt: 2 }} />
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
                {/* LEFT COLUMN — Thumbnails */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}
                >
                    {product.images?.map((img, index) => (
                        <Box
                            key={index}
                            onClick={() => setSelectedImage(img)}
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 2,
                                overflow: "hidden",
                                cursor: "pointer",
                                boxShadow:
                                    selectedImage === img
                                        ? "0 0 0 3px #1976d2"
                                        : "0 2px 6px rgba(0,0,0,0.15)",
                                transition: "0.2s",
                                "&:hover": {
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                                },
                            }}
                        >
                            <img
                                src={img}
                                alt="thumbnail"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                    ))}
                </Box>

                {/* MAIN IMAGE */}
                <Box>
                    <img
                        src={selectedImage}
                        width={400}
                        style={{
                            borderRadius: 10,
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            transition: "0.3s",
                        }}
                    />
                </Box>

                {/* RIGHT COLUMN — title, price, description, button */}
                <Box sx={{ maxWidth: 500 }}>
                    <Typography variant="h4" gutterBottom>
                        {product.title}
                    </Typography>

                    {/* Rating */}
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <Rating value={product.rating} precision={0.1} readOnly />
                        <Typography sx={{ ml: 1 }} color="text.secondary">
                            {product.rating.toFixed(1)}
                        </Typography>
                    </Box>

                    <Typography variant="h6" color="primary" gutterBottom>
                        Price: {product.price} $
                    </Typography>

                    {/* Product description */}
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        {product.description}
                    </Typography>

                    {/* Quantity selector */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mb: 3,
                        }}
                    >
                        <IconButton onClick={decrease}>
                            <RemoveIcon />
                        </IconButton>

                        <Typography variant="h6">{quantity}</Typography>

                        <IconButton onClick={increase}>
                            <AddIcon />
                        </IconButton>
                    </Box>

                    {/* Add to cart button */}
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleAdd}
                        sx={{ mr: 2 }}
                    >
                        Add to cart
                    </Button>

                    {/* Buy now */}
                    <Button variant="outlined" size="large" href="/checkout">
                        Buy now
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductPage;