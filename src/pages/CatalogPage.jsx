import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
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
    TextField,
} from "@mui/material";

const CatalogPage = () => {
    // URL params
    const [searchParams, setSearchParams] = useSearchParams();

    // Init state from URL
    const initialCategory = searchParams.get("category") || "";
    const initialSort = searchParams.get("sort") || "";
    const initialSearch = searchParams.get("search") || "";

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(initialCategory);
    const [sort, setSort] = useState(initialSort);
    const [search, setSearch] = useState(initialSearch);

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

    // --- Update URL when category changes (sync UI → URL)
    const handleCategoryChange = (value) => {
        setCategory(value);

        const params = new URLSearchParams(searchParams);
        if (value) params.set("category", value);
        else params.delete("category");

        setSearchParams(params);
    };

    // --- Update URL when sort changes (sync UI → URL)
    const handleSortChange = (value) => {
        setSort(value);

        const params = new URLSearchParams(searchParams);
        if (value) params.set("sort", value);
        else params.delete("sort");

        setSearchParams(params);
    };

    // --- Update URL when search changes (sync UI → URL)
    const handleSearchChange = (value) => {
        setSearch(value);

        const params = new URLSearchParams(searchParams);
        if (value) params.set("search", value);
        else params.delete("search");

        setSearchParams(params);
    };

    // --- Apply search filter (client-side)
    const filteredProducts = products
        ? products.filter((p) =>
            p.title.toLowerCase().includes(search.toLowerCase())
        )
        : [];

    // --- Sorting logic (client-side sorting)
    const sortedProducts = [...filteredProducts];

    if (sort === "price_asc") sortedProducts.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") sortedProducts.sort((a, b) => b.price - a.price);
    if (sort === "rating_desc") sortedProducts.sort((a, b) => b.rating - a.rating);
    if (sort === "discount_desc")
        sortedProducts.sort((a, b) => b.discountPercentage - a.discountPercentage);
    if (sort === "alpha_asc")
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    if (sort === "alpha_desc")
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title));

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

            {/* Search input */}
            <TextField
                fullWidth
                label="Search"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                sx={{ mb: 3 }}
            />

            {/* Category selector */}
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Category</InputLabel>
                <Select
                    value={category}
                    label="Category"
                    onChange={(e) => handleCategoryChange(e.target.value)}
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

            {/* Sort selector */}
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Sort by</InputLabel>
                <Select
                    value={sort}
                    label="Sort by"
                    onChange={(e) => handleSortChange(e.target.value)}
                >
                    <MenuItem value="">Default</MenuItem>
                    <MenuItem value="price_asc">Price: Low → High</MenuItem>
                    <MenuItem value="price_desc">Price: High → Low</MenuItem>
                    <MenuItem value="rating_desc">Rating</MenuItem>
                    <MenuItem value="discount_desc">Discount</MenuItem>
                    <MenuItem value="alpha_asc">Alphabetical A → Z</MenuItem>
                    <MenuItem value="alpha_desc">Alphabetical Z → A</MenuItem>
                </Select>
            </FormControl>

            {/* Product list */}
            <Box component="ul" sx={{ pl: 2 }}>
                {sortedProducts.map((p) => (
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
