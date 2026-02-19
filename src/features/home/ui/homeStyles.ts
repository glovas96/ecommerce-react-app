import { Box, Typography, Button } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import type { LinkProps } from 'react-router-dom';

import { StyledProductGrid } from '@/shared/styles/StyledProductGrid';

type MarginProp = {
  withMargin?: boolean;
};

export const StyledHeroSection = styled(Box)(({ theme }: { theme: Theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8),
  borderRadius: Number(theme.shape.borderRadius) * 2,
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  color: theme.palette.common.white,
  marginBottom: theme.spacing(6),
}));

type HeroButtonProps = ButtonProps & LinkProps;

export const StyledHeroButton = styled(Button)<HeroButtonProps>(({ theme }: { theme: Theme }) => ({
  background: theme.palette.common.white,
  color: theme.palette.primary.main,
  fontWeight: theme.typography.fontWeightBold,
  '&:hover': {
    background: theme.palette.grey[100],
  },
}));

export const StyledHeroSubtitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const StyledErrorText = styled(Typography)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledSectionGrid = styled(StyledProductGrid)<MarginProp>(
  ({ theme }: { theme: Theme }) => ({
    marginBottom: theme.spacing(6),
  }),
);

export const StyledSectionTitle = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'withMargin',
})<{ withMargin?: boolean }>(({ theme, withMargin }: { theme: Theme; withMargin?: boolean }) => ({
  ...(withMargin ? { marginTop: theme.spacing(4) } : {}),
}));
