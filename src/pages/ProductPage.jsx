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
    Card,
    CardContent,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductPage = () => {
    // Get product ID from URL
    const { id } = useParams();

    // Product data
    const [product, setProduct] = useState(null);

    // Selected image for gallery
    const [selectedImage, setSelectedImage] = useState(null);

    // Quantity selector
    const [quantity, setQuantity] = useState(1);

    // Related products
    const [related, setRelated] = useState([]);

    // Redux dispatch
    const dispatch = useDispatch();

    useEffect(() => {
        // Load product by ID
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setSelectedImage(data.thumbnail);

                // Load related products from same category
                fetch(`https://dummyjson.com/products/category/${data.category}`)
                    .then((res) => res.json())
                    .then((catData) => {
                        const filtered = catData.products
                            .filter((p) => p.id !== data.id)
                            .slice(0, 4);

                        setRelated(filtered);
                    });
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

    // Quantity handlers
    const increase = () => setQuantity((q) => q + 1);
    const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

    // Loading skeleton
    if (!product)
        return (
            <Box sx={{ p: 3 }}>
                <Skeleton variant="text" width={300} height={40} />
                <Skeleton variant="rectangular" width={350} height={350} sx={{ my: 2 }} />
                <Skeleton variant="text" width={150} height={32} />
                <Skeleton variant="rounded" width={180} height={48} sx={{ mt: 2 }} />
            </Box>
        );

    // Product not found
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

    // Calculate old price (before discount)
    const oldPrice =
        product.discountPercentage > 0
            ? (product.price / (1 - product.discountPercentage / 100)).toFixed(2)
            : null;

    return (
        <Box sx={{ p: 3 }}>
            {/* Main layout */}
            <Box
                sx={{
                    display: "flex",
                    gap: 4,
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                }}
            >
                {/* Thumbnails column */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
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

                {/* Main image */}
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

                {/* Product info */}
                <Box sx={{ maxWidth: 500 }}>
                    {/* Title */}
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

                    {/* Price block with discount */}
                    <Box sx={{ mb: 2 }}>
                        {oldPrice && (
                            <Typography
                                variant="body1"
                                sx={{
                                    textDecoration: "line-through",
                                    color: "text.secondary",
                                }}
                            >
                                ${oldPrice}
                            </Typography>
                        )}

                        <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
                            ${product.price}
                        </Typography>

                        {product.discountPercentage > 0 && (
                            <Typography variant="body2" color="error">
                                -{product.discountPercentage}% discount
                            </Typography>
                        )}
                    </Box>

                    {/* Description */}
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        {product.description}
                    </Typography>

                    {/* Specifications block */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Specifications
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Brand:</strong> {product.brand}
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>Category:</strong> {product.category}
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 1 }}>
                            <strong>In stock:</strong> {product.stock} pcs
                        </Typography>

                        <Typography variant="body2">
                            <strong>Warranty:</strong> 12‑month official warranty
                        </Typography>
                    </Box>

                    {/* Quantity selector */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                        <IconButton onClick={decrease}>
                            <RemoveIcon />
                        </IconButton>

                        <Typography variant="h6">{quantity}</Typography>

                        <IconButton onClick={increase}>
                            <AddIcon />
                        </IconButton>
                    </Box>

                    {/* Buttons */}
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleAdd}
                        sx={{ mr: 2 }}
                    >
                        Add to cart
                    </Button>

                    <Button variant="outlined" size="large" href="/checkout">
                        Buy now
                    </Button>
                </Box>
            </Box>

            {/* Related products */}
            {related.length > 0 && (
                <Box sx={{ mt: 6 }}>
                    <Typography variant="h5" gutterBottom>
                        Related products
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                            gap: 3,
                            mt: 2,
                        }}
                    >
                        {related.map((p) => (
                            <Card
                                key={p.id}
                                component="a"
                                href={`/product/${p.id}`}
                                sx={{
                                    textDecoration: "none",
                                    color: "inherit",
                                    borderRadius: 3,
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    transition: "0.2s",
                                    "&:hover": { transform: "translateY(-4px)" },
                                }}
                            >
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
            )}
        </Box>
    );
};

export default ProductPage;
