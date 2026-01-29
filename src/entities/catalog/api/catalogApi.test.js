import { afterEach, describe, expect, it, vi } from 'vitest';

import { fetchCategories } from '@/entities/catalog/api/categoriesApi';
import { fetchProducts } from '@/entities/catalog/api/productsApi';

vi.stubGlobal('fetch', vi.fn());

const mockJsonResponse = (payload) => ({
  json: vi.fn(async () => payload),
});

describe('catalog API', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it('fetches all products when no category', async () => {
    const response = mockJsonResponse({ products: [{ id: 'p1' }] });
    fetch.mockResolvedValueOnce(response);

    const result = await fetchProducts();

    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products?limit=200');
    expect(result).toEqual([{ id: 'p1' }]);
    expect(response.json).toHaveBeenCalled();
  });

  it('fetches category-specific products', async () => {
    const response = mockJsonResponse({ products: [{ id: 'c-1' }] });
    fetch.mockResolvedValueOnce(response);

    const result = await fetchProducts('electronics');

    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products/category/electronics');
    expect(result).toEqual([{ id: 'c-1' }]);
  });

  it('returns empty array when response is not list', async () => {
    fetch.mockResolvedValueOnce(mockJsonResponse({ products: 'not-an-array' }));

    const result = await fetchProducts();

    expect(result).toEqual([]);
  });

  it('fetches categories list', async () => {
    const response = mockJsonResponse(['a', 'b']);
    fetch.mockResolvedValueOnce(response);

    const result = await fetchCategories();

    expect(fetch).toHaveBeenCalledWith('https://dummyjson.com/products/categories');
    expect(result).toEqual(['a', 'b']);
  });
});
