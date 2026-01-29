import { Button, Typography } from '@mui/material';
import React from 'react';

import { StyledPaginationControls } from '@/shared/styles/StyledPaginationControls';

// Handles page navigation controls.
const CatalogPagination = ({ page, totalPages, onPrev, onNext }) => (
  <React.Fragment>
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
  </React.Fragment>
);

export default CatalogPagination;
