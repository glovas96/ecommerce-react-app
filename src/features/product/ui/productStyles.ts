import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';

export const StyledProductLayout = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  alignItems: 'flex-start',
  flexWrap: 'wrap',
}));

export const StyledThumbnailColumn = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const StyledThumbnailPreview = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }: { theme: Theme; selected?: boolean }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  cursor: 'pointer',
  boxShadow: selected
    ? `0 0 0 ${theme.spacing(0.375)} ${theme.palette.primary.main}`
    : theme.shadows[2],
  transition: theme.transitions.create('box-shadow', {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
}));

export const StyledThumbnailImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

export const StyledImageWrapper = styled(Box)(() => ({
  position: 'relative',
  display: 'inline-block',
  overflow: 'hidden',
}));

export const StyledMainImage = styled('img')(({ theme }: { theme: Theme }) => ({
  width: '100%',
  maxWidth: 500,
  height: 'auto',
  borderRadius: Number(theme.shape.borderRadius) * 1.25,
  boxShadow: theme.shadows[4],
  transition: theme.transitions.create('box-shadow', {
    duration: theme.transitions.duration.short,
  }),
}));

export const StyledInfoColumn = styled(Box)(() => ({
  maxWidth: 500,
}));

export const StyledRatingRow = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

export const StyledRatingValue = styled(Typography)(({ theme }: { theme: Theme }) => ({
  marginLeft: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const StyledPriceSection = styled(Box)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledCurrentPrice = styled(Typography)(({ theme }: { theme: Theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
}));

export const StyledOldPrice = styled(Typography)(({ theme }: { theme: Theme }) => ({
  textDecoration: 'line-through',
  color: theme.palette.text.secondary,
}));

export const StyledDescriptionText = styled(Typography)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const StyledSpecSection = styled(Box)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(3),
}));

export const StyledSpecTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const StyledSpecItem = styled(Typography)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const StyledActionGroup = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

export const StyledQuantityGroup = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const StyledQuantityValue = styled(Typography)(({ theme }: { theme: Theme }) => ({
  minWidth: theme.spacing(4),
  textAlign: 'center',
  fontWeight: theme.typography.fontWeightRegular,
}));

export const StyledPrimaryAction = styled(Button)(({ theme }: { theme: Theme }) => ({
  marginRight: theme.spacing(2),
}));

export const StyledBackToCatalogButton = styled(Button)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(2),
}));

export const StyledRelatedSection = styled(Box)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(6),
}));

export const StyledRelatedTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(2),
}));
