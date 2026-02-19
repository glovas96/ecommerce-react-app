import { CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import type { CardMediaProps } from '@mui/material/CardMedia';
import { styled, type Theme } from '@mui/material/styles';
import type { TypographyProps } from '@mui/material/Typography';

export const StyledCardMedia = styled(CardMedia)<CardMediaProps<'img'>>(
  ({ theme }: { theme: Theme }) => ({
    objectFit: 'contain',
    padding: theme.spacing(2),
    height: 160,
    backgroundColor: theme.palette.background.paper,
  }),
);

export const StyledCardContent = styled(CardContent)(({ theme }: { theme: Theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  gap: theme.spacing(1),
  minHeight: 0,
}));

export const StyledCategoryLabel = styled(Typography)(({ theme }: { theme: Theme }) => ({
  textTransform: 'capitalize',
  marginBottom: theme.spacing(0.5),
}));

export const StyledMultiLineTitle = styled(Typography)<TypographyProps>(() => ({
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  lineHeight: 1.2,
  minHeight: '2.4em',
}));

export const StyledRatingRow = styled(Stack)(({ theme }: { theme: Theme }) => ({
  alignItems: 'center',
  gap: theme.spacing(0.25),
  marginBottom: theme.spacing(0.25),
}));

export const StyledRatingValue = styled(Typography)(({ theme }: { theme: Theme }) => ({
  color: theme.palette.text.secondary,
}));

export const StyledDiscountText = styled(Typography)(({ theme }: { theme: Theme }) => ({
  marginTop: theme.spacing(0.25),
}));

export const StyledPriceRow = styled(Stack)(({ theme }: { theme: Theme }) => ({
  alignItems: 'baseline',
  gap: theme.spacing(1),
  marginTop: theme.spacing(0.5),
}));

export const StyledCardActions = styled(CardActions)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(2),
  paddingTop: 0,
}));
