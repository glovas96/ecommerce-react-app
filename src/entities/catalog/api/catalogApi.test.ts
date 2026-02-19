import { afterEach, describe, expect, it, vi, type Mock } from 'vitest';

import { fetchCategories, type CategoryList } from '@/entities/catalog/api/categoriesApi';
import { fetchProducts, type ProductsResponse } from '@/entities/catalog/api/productsApi';

vi.stubGlobal('fetch', vi.fn());

const fetchMock = fetch as Mock;
const mockJsonResponse = <T>(payload: T) => ({
  json: vi.fn(async () => payload),
});

describe('catalog API', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  const baseProduct = {
    id: 1,
    title: 'Sample',
    price: 100,
    rating: 4.5,
    discountPercentage: 5,
    category: 'electronics',
    thumbnail: 'thumb.jpg',
    images: ['img.jpg'],
  };

  it('fetches all products when no category', async () => {
    const response = mockJsonResponse<ProductsResponse>({
      products: [baseProduct],
      total: 1,
      limit: 1,
      skip: 0,
    });
    fetchMock.mockResolvedValueOnce(response);

    const result = await fetchProducts();

    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products?limit=200');
    expect(result).toEqual([baseProduct]);
    expect(response.json).toHaveBeenCalled();
  });

  it('fetches category-specific products', async () => {
    const response = mockJsonResponse<ProductsResponse>({
      products: [{ ...baseProduct, id: 2 }],
      total: 1,
      limit: 1,
      skip: 0,
    });
    fetchMock.mockResolvedValueOnce(response);

    const result = await fetchProducts('electronics');

    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products/category/electronics');
    expect(result).toEqual([{ ...baseProduct, id: 2 }]);
  });

  it('returns empty array when response is not list', async () => {
    fetchMock.mockResolvedValueOnce(
      mockJsonResponse({
        products: 'not-an-array',
        total: 0,
        limit: 0,
        skip: 0,
      } as unknown as ProductsResponse),
    );

    const result = await fetchProducts();

    expect(result).toEqual([]);
  });

  it('fetches categories list', async () => {
    const response = mockJsonResponse<CategoryList>(['a', 'b']);
    fetchMock.mockResolvedValueOnce(response);

    const result = await fetchCategories();

    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products/categories');
    expect(result).toEqual(['a', 'b']);
  });
});
