import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledPaginationControls = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
}));
