import { Box } from '@mui/material';
import { styled, type Theme } from '@mui/material/styles';

export const StyledPaginationControls = styled(Box)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));
