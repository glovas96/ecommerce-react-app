import { Box } from '@mui/material';
import { styled, type Theme } from '@mui/material/styles';

interface StyledProductGridProps {
  /** Optional spacing between the grid and previous sections */
  withMargin?: boolean;
}

// Shared grid layout for catalog/product sections
export const StyledProductGrid = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'withMargin',
})<StyledProductGridProps>(({ theme, withMargin }: { theme: Theme } & StyledProductGridProps) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: theme.spacing(3),
  marginTop: withMargin ? theme.spacing(2) : undefined,
}));
