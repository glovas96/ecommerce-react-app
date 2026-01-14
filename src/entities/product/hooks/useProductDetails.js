import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { loadProduct, loadRelated } from '../services/productService';

// Hook that loads product and related items
export const useProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Fetch product + related items when id changes
    const fetchDetails = async () => {
      const data = await loadProduct(id);
      setProduct(data);
      setSelectedImage(data?.images?.[0] ?? data?.thumbnail ?? null);
      const relatedItems = await loadRelated(data.category, data.id);
      setRelated(relatedItems);
    };

    fetchDetails();
  }, [id]);

  // Quantity helpers for counter UI
  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return {
    product,
    related,
    selectedImage,
    setSelectedImage,
    quantity,
    increase,
    decrease,
  };
};
