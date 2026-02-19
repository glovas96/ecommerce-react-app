import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

import { StyledProductGrid } from '@/shared/styles/StyledProductGrid';

export const StyledFiltersSection = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

export const StyledProductsGrid = styled(StyledProductGrid)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const StyledEmptyMessage = styled(Typography)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(2),
}));
