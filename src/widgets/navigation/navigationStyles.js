import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledAppBar = styled(AppBar)(() => ({}));

export const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const StyledBrandText = styled(Typography)(() => ({
  color: 'inherit',
  textDecoration: 'none',
}));
