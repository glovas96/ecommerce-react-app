import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

// Shared grid layout for catalog/product sections
export const StyledProductGrid = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'withMargin',
})(({ theme, withMargin }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
  gap: theme.spacing(3),
  marginTop: withMargin ? theme.spacing(2) : undefined,
}));
