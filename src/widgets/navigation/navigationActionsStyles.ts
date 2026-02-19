import { Box, Button } from '@mui/material';
import type { ButtonProps } from '@mui/material/Button';
import { styled, type Theme } from '@mui/material/styles';

export const StyledLoaderBox = styled(Box)(({ theme }: { theme: Theme }) => ({
  minWidth: theme.spacing(10),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledActionsContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
}));

export const StyledNavButton = styled(Button)<ButtonProps>(() => ({
  color: 'inherit',
  textTransform: 'none',
}));
