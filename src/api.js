// Fetch all products or products filtered by category
export const getProducts = async (category = "") => {
    let url = "https://dummyjson.com/products?limit=200";

    if (category) {
        url = `https://dummyjson.com/products/category/${category}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    // Always return an array to avoid rendering errors
    return Array.isArray(data.products) ? data.products : [];
};

// Fetch category list (DummyJSON v2 returns objects)
export const getCategories = async () => {
    const res = await fetch("https://dummyjson.com/products/categories");
    const data = await res.json();

    // Ensure we always return an array
    return Array.isArray(data) ? data : [];
};
