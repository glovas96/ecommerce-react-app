import { useEffect, useState } from "react";
import { getProducts } from "../api";

const CatalogPage = () => {
    // Local state for storing loaded products
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products on component mount
        getProducts().then(setProducts);
    }, []);

    return (
        <div>
            <h1>Catalog</h1>

            {/* Render product list */}
            <ul>
                {products.map((p) => (
                    <li key={p.id}>{p.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CatalogPage;

