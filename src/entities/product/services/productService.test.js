import { describe, expect, it, vi } from 'vitest';

import { fetchProduct, fetchRelatedProducts } from '@/entities/product/api/productApi';
import { calculateOldPrice, loadProduct, loadRelated } from '@/entities/product/services/productService';

vi.mock('@/entities/product/api/productApi', () => ({
  fetchProduct: vi.fn(),
  fetchRelatedProducts: vi.fn(),
}));

describe('productService', () => {
  it('attaches oldPrice when discount applies', async () => {
    const product = { id: 'item-1', price: 100, discountPercentage: 20 };
    fetchProduct.mockResolvedValue(product);

    const result = await loadProduct('item-1');

    expect(fetchProduct).toHaveBeenCalledWith('item-1');
    expect(result).toEqual({
      ...product,
      oldPrice: '125.00',
    });
  });

  // ensure helper returns formatted old price for discounts
  it('calculates legacy price strings', () => {
    expect(calculateOldPrice({ price: 80, discountPercentage: 20 })).toBe('100.00');
    expect(calculateOldPrice({ price: 60 })).toBeNull();
  });

  it('leaves oldPrice null when no discount', async () => {
    const product = { id: 'item-2', price: 50 };
    fetchProduct.mockResolvedValue(product);

    const result = await loadProduct('item-2');

    expect(result.oldPrice).toBeNull();
  });

  it('filters current product and limits to four related items', async () => {
    const related = [
      { id: 'current', price: 10, discountPercentage: 10 },
      { id: 'r-1', price: 5, discountPercentage: 0 },
      { id: 'r-2', price: 6 },
      { id: 'r-3', price: 7 },
      { id: 'r-4', price: 8 },
      { id: 'r-5', price: 9 },
    ];
    fetchRelatedProducts.mockResolvedValue(related);

    const result = await loadRelated('electronics', 'current');

    expect(fetchRelatedProducts).toHaveBeenCalledWith('electronics');
    expect(result.map((item) => item.id)).toEqual(['r-1', 'r-2', 'r-3', 'r-4']);
    expect(result[0]).toMatchObject({
      id: 'r-1',
      oldPrice: null,
    });
  });
});
