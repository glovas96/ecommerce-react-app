import { describe, expect, it, vi, beforeEach } from 'vitest';

import { fetchCategories, type CategoryList } from '@/entities/catalog/api/categoriesApi';
import { fetchProducts, type Product } from '@/entities/catalog/api/productsApi';
import { getCatalogData, ITEMS_PER_PAGE } from '@/entities/catalog/services/catalogService';

vi.mock('@/entities/catalog/api/productsApi', () => ({
  fetchProducts: vi.fn<() => Promise<Product[]>>(),
}));
vi.mock('@/entities/catalog/api/categoriesApi', () => ({
  fetchCategories: vi.fn<() => Promise<CategoryList>>(),
}));

const catalogProduct = (overrides?: Partial<Product>): Product => ({
  id: 0,
  title: 'Sample',
  price: 0,
  rating: 0,
  discountPercentage: 0,
  category: 'electronics',
  thumbnail: 'thumb.jpg',
  images: ['img.jpg'],
  ...overrides,
});

const mockedFetchProducts = vi.mocked(fetchProducts);
const mockedFetchCategories = vi.mocked(fetchCategories);

describe('catalogService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('applies search and sorting before pagination', async () => {
    mockedFetchProducts.mockResolvedValue([
      catalogProduct({ id: 1, title: 'Alpha deal', price: 5, rating: 1 }),
      catalogProduct({
        id: 2,
        title: 'Beta product',
        price: 10,
        rating: 5,
        discountPercentage: 10,
      }),
      catalogProduct({ id: 3, title: 'Alpha kit', price: 20, rating: 3, discountPercentage: 5 }),
    ]);
    mockedFetchCategories.mockResolvedValue(['electronics']);

    const result = await getCatalogData({
      category: 'electronics',
      search: 'alpha',
      sort: 'price_desc',
      page: 1,
    });

    expect(fetchProducts).toHaveBeenCalledWith('electronics');
    expect(fetchCategories).toHaveBeenCalled();
    expect(result.total).toBe(2);
    expect(result.items.map((item) => item.id)).toEqual([3, 1]);
    expect(result.categories).toEqual(['electronics']);
  });

  it('paginates data according to ITEMS_PER_PAGE', async () => {
    const products = Array.from({ length: ITEMS_PER_PAGE + 3 }, (_, index) =>
      catalogProduct({ id: index + 1, title: `Product ${index + 1}`, price: index }),
    );
    mockedFetchProducts.mockResolvedValue(products);
    mockedFetchCategories.mockResolvedValue([] as CategoryList);

    const pageTwo = await getCatalogData({ category: '', search: '', sort: undefined, page: 2 });

    expect(pageTwo.items.length).toBe(3);
    expect(pageTwo.total).toBe(products.length);
  });
});
