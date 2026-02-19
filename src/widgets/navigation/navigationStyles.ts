import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { TypographyProps } from '@mui/material/Typography';

export const StyledAppBar = styled(AppBar)(() => ({}));

export const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const StyledBrandText = styled(Typography)<TypographyProps>(() => ({
  color: 'inherit',
  textDecoration: 'none',
}));
