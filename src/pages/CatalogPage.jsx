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
    Card,
    CardContent,
    CardMedia,
    CardActions,
} from "@mui/material";

const CatalogPage = () => {
    // URL params
    const [searchParams, setSearchParams] = useSearchParams();

    // Init state from URL
    const initialCategory = searchParams.get("category") || "";
    const initialSort = searchParams.get("sort") || "";
    const initialSearch = searchParams.get("search") || "";
    const initialPage = Number(searchParams.get("page")) || 1;

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(initialCategory);
    const [sort, setSort] = useState(initialSort);
    const [search, setSearch] = useState(initialSearch);
    const [page, setPage] = useState(initialPage);

    const ITEMS_PER_PAGE = 20;

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
        setPage(1);

        const params = new URLSearchParams(searchParams);
        if (value) params.set("category", value);
        else params.delete("category");

        params.set("page", 1);
        setSearchParams(params);
    };

    // --- Update URL when sort changes (sync UI → URL)
    const handleSortChange = (value) => {
        setSort(value);
        setPage(1);

        const params = new URLSearchParams(searchParams);
        if (value) params.set("sort", value);
        else params.delete("sort");

        params.set("page", 1);
        setSearchParams(params);
    };

    // --- Update URL when search changes (sync UI → URL)
    const handleSearchChange = (value) => {
        setSearch(value);
        setPage(1);

        const params = new URLSearchParams(searchParams);
        if (value) params.set("search", value);
        else params.delete("search");

        params.set("page", 1);
        setSearchParams(params);
    };

    // --- Update URL when page changes (sync UI → URL)
    const handlePageChange = (newPage) => {
        setPage(newPage);

        const params = new URLSearchParams(searchParams);
        params.set("page", newPage);
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

    // --- Pagination logic (client-side)
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedProducts = sortedProducts.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);

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
                        variant="rectangular"
                        width="100%"
                        height={200}
                        sx={{ my: 2 }}
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

            {/* Product cards grid (CSS Grid for equal width) */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: 3,
                }}
            >
                {paginatedProducts.map((p) => (
                    <Card
                        key={p.id}
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                        }}
                    >
                        {/* Product image */}
                        <CardMedia
                            component="img"
                            image={p.thumbnail}
                            alt={p.title}
                            sx={{
                                height: 180,
                                width: "100%",
                                objectFit: "contain",      // show full image
                                backgroundColor: "#f5f5f5", // neutral bg
                            }}
                        />

                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    lineHeight: 1.2,       // compact spacing
                                    minHeight: "2.4em",    // exact height for 2 lines
                                    mb: 1,                 // spacing under title
                                }}
                            >
                                {p.title}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                ${p.price}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Rating: {p.rating}
                            </Typography>
                        </CardContent>

                        <CardActions>
                            <Button component={Link} to={`/product/${p.id}`} size="small">
                                View
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>

            {/* Pagination controls */}
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button
                    variant="outlined"
                    disabled={page === 1}
                    onClick={() => handlePageChange(page - 1)}
                >
                    Prev
                </Button>

                <Typography sx={{ alignSelf: "center" }}>
                    Page {page} / {totalPages}
                </Typography>

                <Button
                    variant="outlined"
                    disabled={page === totalPages}
                    onClick={() => handlePageChange(page + 1)}
                >
                    Next
                </Button>
            </Box>
        </Box>
    );
};

export default CatalogPage;

