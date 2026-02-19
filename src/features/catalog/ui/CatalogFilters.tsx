import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import type { ChangeEvent, KeyboardEvent } from 'react';

import type { CatalogFiltersProps } from '@/features/catalog/types';
import { StyledFiltersSection } from '@/features/catalog/ui/catalogStyles';

const CatalogFilters = ({
  searchInput,
  onSearchChange,
  onSearchSubmit,
  categories,
  safeCategory,
  onCategoryChange,
  sort,
  onSortChange,
  getCategoryLabel,
}: CatalogFiltersProps) => (
  <StyledFiltersSection>
    <TextField
      fullWidth
      label="Search"
      value={searchInput}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSearchSubmit();
        }
      }}
    />

    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select
        value={safeCategory}
        label="Category"
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <MenuItem value="">All categories</MenuItem>
        {categories.map((c) => {
          const label = getCategoryLabel(c);
          const value = typeof c === 'string' ? c : (c?.slug ?? label);
          return (
            <MenuItem key={value || label} value={value}>
              {label}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>

    <FormControl fullWidth>
      <InputLabel>Sort by</InputLabel>
      <Select value={sort} label="Sort by" onChange={(e) => onSortChange(e.target.value)}>
        <MenuItem value="">Default</MenuItem>
        <MenuItem value="rating_desc">Rating</MenuItem>
        <MenuItem value="discount_desc">Discount</MenuItem>
        <MenuItem value="id_desc">Latest products</MenuItem>
        <MenuItem value="price_asc">Price: Low → High</MenuItem>
        <MenuItem value="price_desc">Price: High → Low</MenuItem>
        <MenuItem value="alpha_asc">A → Z</MenuItem>
        <MenuItem value="alpha_desc">Z → A</MenuItem>
      </Select>
    </FormControl>
  </StyledFiltersSection>
);

export default CatalogFilters;
