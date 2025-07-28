import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getCategories } from "../api";

import {
    Box,
    Typography,
    Button,
    Skeleton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";

const CatalogPage = () => {
    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");

    // Load categories on initial mount
    useEffect(() => {
        getCategories().then((cats) => {
            setCategories(cats);
        });
    }, []);

    // Load products (all or filtered by category)
    useEffect(() => {
        setProducts(null); // Show skeleton while loading
        getProducts(category).then((prods) => {
            setProducts(prods);
        });
    }, [category]);

    // Show skeleton while products are loading
    if (!products)
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Catalog
                </Typography>

                {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton
                        key={i}
                        variant="text"
                        width={300}
                        height={32}
                        sx={{ my: 1 }}
                    />
                ))}
            </Box>
        );

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Catalog
            </Typography>

            {/* Category selector */}
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Category</InputLabel>
                <Select
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <MenuItem value="">All categories</MenuItem>

                    {/* Render category list */}
                    {categories.map((c) => (
                        <MenuItem key={c.slug} value={c.slug}>
                            {c.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {/* Product list */}
            <Box component="ul" sx={{ pl: 2 }}>
                {products.map((p) => (
                    <Box component="li" key={p.id} sx={{ mb: 1 }}>
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