import { describe, expect, it, vi, beforeEach } from 'vitest';

import { fetchCategories } from '@/entities/catalog/api/categoriesApi';
import { fetchProducts } from '@/entities/catalog/api/productsApi';
import { getCatalogData, ITEMS_PER_PAGE } from '@/entities/catalog/services/catalogService';

vi.mock('@/entities/catalog/api/productsApi', () => ({
  fetchProducts: vi.fn(),
}));
vi.mock('@/entities/catalog/api/categoriesApi', () => ({
  fetchCategories: vi.fn(),
}));

describe('catalogService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('applies search and sorting before pagination', async () => {
    fetchProducts.mockResolvedValue([
      { id: 'p1', title: 'Alpha deal', price: 5, rating: 1, discountPercentage: 0 },
      { id: 'p2', title: 'Beta product', price: 10, rating: 5, discountPercentage: 10 },
      { id: 'p3', title: 'Alpha kit', price: 20, rating: 3, discountPercentage: 5 },
    ]);
    fetchCategories.mockResolvedValue(['electronics']);

    const result = await getCatalogData({
      category: 'electronics',
      search: 'alpha',
      sort: 'price_desc',
      page: 1,
    });

    expect(fetchProducts).toHaveBeenCalledWith('electronics');
    expect(fetchCategories).toHaveBeenCalled();
    expect(result.total).toBe(2);
    expect(result.items.map((item) => item.id)).toEqual(['p3', 'p1']);
    expect(result.categories).toEqual(['electronics']);
  });

  it('paginates data according to ITEMS_PER_PAGE', async () => {
    const products = Array.from({ length: ITEMS_PER_PAGE + 3 }, (_, index) => ({
      id: `item-${index + 1}`,
      title: `Product ${index + 1}`,
      price: index,
      rating: 0,
      discountPercentage: 0,
    }));
    fetchProducts.mockResolvedValue(products);
    fetchCategories.mockResolvedValue([]);

    const pageTwo = await getCatalogData({ category: '', search: '', sort: '', page: 2 });

    expect(pageTwo.items.length).toBe(3);
    expect(pageTwo.total).toBe(products.length);
  });
});
