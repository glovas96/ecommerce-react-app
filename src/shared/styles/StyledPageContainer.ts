import { Box } from '@mui/material';
import { styled, type Theme } from '@mui/material/styles';

// Shared page wrapper that normalizes padding and centering
export const StyledPageContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(3),
  maxWidth: '1400px',
  margin: '0 auto',
}));
