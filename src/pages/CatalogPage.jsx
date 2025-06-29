import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../api";

import { Box, Typography, Button } from "@mui/material";

const CatalogPage = () => {
    // Local state for storing loaded products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products on component mount
        getProducts().then(setProducts);
    }, []);

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Catalog
            </Typography>

            {/* Render product list */}
            <Box component="ul" sx={{ pl: 2 }}>
                {products.map((p) => (
                    <Box component="li" key={p.id} sx={{ mb: 1 }}>
                        {/* Link to product details page */}
                        <Button
                            component={Link}
                            to={`/product/${p.id}`}
                            variant="text"
                            sx={{ p: 0, minWidth: "auto" }}
                        >
                            {p.title}
                        </Button>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default CatalogPage;
