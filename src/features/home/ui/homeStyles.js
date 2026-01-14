import { Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import { StyledProductGrid } from '@/shared/styles/StyledProductGrid';

export const StyledHeroSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8),
  borderRadius: theme.shape.borderRadius * 2,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  color: theme.palette.common.white,
  marginBottom: theme.spacing(6),
}));

export const StyledHeroButton = styled(Button)(({ theme }) => ({
  background: theme.palette.common.white,
  color: theme.palette.primary.main,
  fontWeight: theme.typography.fontWeightBold,
  '&:hover': {
    background: theme.palette.grey[100],
  },
}));

export const StyledHeroSubtitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const StyledErrorText = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledSectionGrid = styled(StyledProductGrid)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

export const StyledSectionTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'withMargin',
})(({ theme, withMargin }) => ({
  ...(withMargin ? { marginTop: theme.spacing(4) } : {}),
}));
