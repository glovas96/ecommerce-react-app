import type { CategoryList } from '@/entities/catalog/api/categoriesApi';

export const normalizeCategoryList = (items: CategoryList): string[] =>
  items
    .map((item) => {
      if (!item) return '';
      if (typeof item === 'string') return item;
      return item.slug ?? item.name ?? '';
    })
    .filter((value): value is string => Boolean(value));
