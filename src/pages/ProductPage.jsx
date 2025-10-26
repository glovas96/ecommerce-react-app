import { useParams, useNavigate } from "react-router-dom";
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
    CardMedia,
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

    // Related products (4 items)
    const [related, setRelated] = useState([]);

    // Redux dispatch
    const dispatch = useDispatch();

    // Navigation (needed for Buy Now)
    const navigate = useNavigate();

    useEffect(() => {
        // Load product by ID
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setSelectedImage(data.thumbnail);

                // Load related products (API returns 4 items by default)
                fetch(`https://dummyjson.com/products/category/${data.category}`)
                    .then((res) => res.json())
                    .then((catData) => {
                        const filtered = catData.products.filter((p) => p.id !== data.id);
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

    // Discount logic for main product
    const hasDiscount = product.discountPercentage >= 10;
    const oldPrice = hasDiscount
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

                {/* Main image with SALE / HOT DEAL badges */}
                <Box sx={{ position: "relative", display: "inline-block" }}>
                    {/* BADGES */}
                    {product.discountPercentage > 15 ? (
                        <Box
                            sx={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                                backgroundColor: "orange",
                                color: "#fff",
                                px: 1.4,
                                py: 0.4,
                                borderRadius: 1,
                                fontSize: "0.9rem",
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
                                top: 12,
                                left: 12,
                                backgroundColor: "error.main",
                                color: "#fff",
                                px: 1.4,
                                py: 0.4,
                                borderRadius: 1,
                                fontSize: "0.9rem",
                                fontWeight: "bold",
                                zIndex: 2,
                            }}
                        >
                            SALE
                        </Box>
                    ) : null}

                    {/* MAIN IMAGE */}
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

                    {/* Price block */}
                    <Box sx={{ mb: 2 }}>
                        {hasDiscount ? (
                            <>
                                <Typography
                                    variant="h5"
                                    color="primary"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    ${product.price}
                                </Typography>

                                <Typography
                                    variant="body1"
                                    sx={{
                                        textDecoration: "line-through",
                                        color: "text.secondary",
                                    }}
                                >
                                    ${oldPrice}
                                </Typography>

                                <Typography variant="body2" color="error">
                                    -{product.discountPercentage}% discount
                                </Typography>
                            </>
                        ) : (
                            <Typography
                                variant="h5"
                                color="primary"
                                sx={{ fontWeight: "bold" }}
                            >
                                ${product.price}
                            </Typography>
                        )}
                    </Box>

                    {/* Description */}
                    <Typography variant="body1" sx={{ mb: 3 }}>
                        {product.description}
                    </Typography>

                    {/* Specifications */}
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

                    {/* BUY NOW — send only this product to checkout */}
                    <Button
                        variant="outlined"
                        size="large"
                        onClick={() =>
                            navigate("/checkout", {
                                state: {
                                    singleItem: {
                                        id: product.id,
                                        title: product.title,
                                        price: product.price,
                                        thumbnail: product.thumbnail,
                                        quantity,
                                    },
                                },
                            })
                        }
                    >
                        Buy now
                    </Button>
                </Box>
            </Box>

            {/* Related products (4 items, styled like CatalogPage, no Add to cart) */}
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
                        {related.map((p) => {
                            const hasDiscount = p.discountPercentage >= 10;
                            const oldPrice = hasDiscount
                                ? (p.price / (1 - p.discountPercentage / 100)).toFixed(2)
                                : null;

                            return (
                                <Card
                                    key={p.id}
                                    component="a"
                                    href={`/product/${p.id}`}
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
                                        {/* Title */}
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

                                        {/* Price block */}
                                        <Box sx={{ mb: 1 }}>
                                            {hasDiscount ? (
                                                <>
                                                    {/* New + old price in one line */}
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

                                                    {/* Discount percent on next line */}
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
                                                <>
                                                    {/* Only regular price */}
                                                    <Typography
                                                        variant="h6"
                                                        color="primary"
                                                        sx={{ fontWeight: "bold" }}
                                                    >
                                                        ${p.price}
                                                    </Typography>
                                                </>
                                            )}
                                        </Box>

                                        {/* Rating */}
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
                        })}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ProductPage;
