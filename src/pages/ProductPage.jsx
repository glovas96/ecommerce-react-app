import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductPage = () => {
    // Get product ID from URL
    const { id } = useParams();

    // Local state for a single product
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch product by ID
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then(setProduct);
    }, [id]);

    // Show loading state
    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>{product.title}</h1>
            <p>Price: {product.price} $</p>
            <img src={product.thumbnail} width={200} />
        </div>
    );
};

export default ProductPage;