import { Button, Typography } from '@mui/material';

import type { CatalogPaginationProps } from '@/features/catalog/types';
import { StyledPaginationControls } from '@/shared/styles/StyledPaginationControls';

const CatalogPagination = ({ page, totalPages, onPrev, onNext }: CatalogPaginationProps) => (
  <StyledPaginationControls>
    <Button variant="outlined" disabled={page === 1} onClick={onPrev}>
      Prev
    </Button>
    <Typography>
      Page {page} / {totalPages}
    </Typography>
    <Button variant="outlined" disabled={page === totalPages} onClick={onNext}>
      Next
    </Button>
  </StyledPaginationControls>
);

export default CatalogPagination;
