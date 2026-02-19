import { describe, expect, it, vi } from 'vitest';

import { fetchProduct, fetchRelatedProducts } from '@/entities/product/api/productApi';
import {
  calculateOldPrice,
  loadProduct,
  loadRelated,
} from '@/entities/product/services/productService';
import type { ProductDetail } from '@/entities/product/types';

vi.mock('@/entities/product/api/productApi', () => ({
  fetchProduct: vi.fn(),
  fetchRelatedProducts: vi.fn(),
}));

describe('productService', () => {
  const fetchProductMock = vi.mocked(fetchProduct);
  const fetchRelatedProductsMock = vi.mocked(fetchRelatedProducts);

  const baseProduct: ProductDetail = {
    id: 1,
    title: 'Item',
    price: 100,
    discountPercentage: 20,
    rating: 4.5,
    category: 'test',
    thumbnail: 'thumb.jpg',
    images: ['thumb.jpg'],
  };

  it('attaches oldPrice when discount applies', async () => {
    fetchProductMock.mockResolvedValue(baseProduct);

    const result = await loadProduct(1);

    expect(fetchProductMock).toHaveBeenCalledWith(1);
    expect(result).toEqual({
      ...baseProduct,
      oldPrice: '125.00',
    });
  });

  // ensure helper returns formatted old price for discounts
  it('calculates legacy price strings', () => {
    expect(
      calculateOldPrice({
        id: 99,
        title: 'Test',
        price: 80,
        discountPercentage: 20,
        rating: 4,
        category: 'test',
        thumbnail: 'thumb.jpg',
        images: ['thumb.jpg'],
      }),
    ).toBe('100.00');
    expect(
      calculateOldPrice({
        id: 100,
        title: 'Test 2',
        price: 60,
        discountPercentage: 0,
        rating: 4,
        category: 'test',
        thumbnail: 'thumb.jpg',
        images: ['thumb.jpg'],
      }),
    ).toBeNull();
  });

  it('leaves oldPrice null when no discount', async () => {
    const product = {
      ...baseProduct,
      id: 2,
      title: 'Item 2',
      price: 50,
      discountPercentage: 0,
    };
    fetchProductMock.mockResolvedValue(product);

    const result = await loadProduct(2);

    expect(result.oldPrice).toBeNull();
  });

  it('filters current product and limits to four related items', async () => {
    const related = [
      {
        id: 1,
        title: 'current',
        price: 10,
        discountPercentage: 10,
        rating: 4,
        category: 'test',
        thumbnail: 'thumb.jpg',
        images: ['thumb.jpg'],
      },
      {
        id: 2,
        title: 'r-1',
        price: 5,
        discountPercentage: 0,
        rating: 4,
        category: 'test',
        thumbnail: 'thumb.jpg',
        images: ['thumb.jpg'],
      },
      {
        id: 3,
        title: 'r-2',
        price: 6,
        discountPercentage: 0,
        rating: 4,
        category: 'test',
        thumbnail: 'thumb.jpg',
        images: ['thumb.jpg'],
      },
      {
        id: 4,
        title: 'r-3',
        price: 7,
        discountPercentage: 0,
        rating: 4,
        category: 'test',
        thumbnail: 'thumb.jpg',
        images: ['thumb.jpg'],
      },
      {
        id: 5,
        title: 'r-4',
        price: 8,
        discountPercentage: 0,
        rating: 4,
        category: 'test',
        thumbnail: 'thumb.jpg',
        images: ['thumb.jpg'],
      },
      {
        id: 6,
        title: 'r-5',
        price: 9,
        discountPercentage: 0,
        rating: 4,
        category: 'test',
        thumbnail: 'thumb.jpg',
        images: ['thumb.jpg'],
      },
    ];
    fetchRelatedProductsMock.mockResolvedValue(related);

    const result = await loadRelated('electronics', 1);

    expect(fetchRelatedProductsMock).toHaveBeenCalledWith('electronics');
    expect(result.map((item) => item.id)).toEqual([2, 3, 4, 5]);
    expect(result[0]).toMatchObject({
      id: 2,
      oldPrice: null,
    });
  });
});
