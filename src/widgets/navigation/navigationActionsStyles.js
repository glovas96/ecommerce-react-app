import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledLoaderBox = styled(Box)(({ theme }) => ({
  minWidth: theme.spacing(10),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
}));

export const StyledNavButton = styled(Button)(() => ({
  color: 'inherit',
  textTransform: 'none',
}));
