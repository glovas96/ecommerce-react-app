import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { ProductDetail, RelatedProduct } from '@/entities/product/types';

import { loadProduct, loadRelated } from '../services/productService';

export const useProductDetails = () => {
  const { id } = useParams<{ id?: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [related, setRelated] = useState<RelatedProduct[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      const data = await loadProduct(id);
      setProduct(data);
      setSelectedImage(data?.images?.[0] ?? data?.thumbnail ?? null);
      const relatedItems = await loadRelated(data.category ?? '', data.id);
      setRelated(relatedItems);
    };
    fetchDetails();
  }, [id]);

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
