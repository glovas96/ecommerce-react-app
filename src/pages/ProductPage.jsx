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
                    width={250}
                    height={250}
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

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                {product.title}
            </Typography>

            <Typography variant="h6" color="primary" gutterBottom>
                Price: {product.price} $
            </Typography>

            <Box sx={{ my: 2 }}>
                <img src={product.thumbnail} width={200} />
            </Box>

            {/* Add to cart button */}
            <Button variant="contained" size="large" onClick={handleAdd}>
                Add to cart
            </Button>
        </Box>
    );
};

export default ProductPage;
