import { CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  objectFit: 'contain',
  padding: theme.spacing(2),
  height: 160,
  backgroundColor: theme.palette.background.paper,
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  gap: theme.spacing(1),
  minHeight: 0,
}));

export const StyledCategoryLabel = styled(Typography)(({ theme }) => ({
  textTransform: 'capitalize',
  marginBottom: theme.spacing(0.5),
}));

export const StyledMultiLineTitle = styled(Typography)(() => ({
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  lineHeight: 1.2,
  minHeight: '2.4em',
}));

export const StyledRatingRow = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  gap: theme.spacing(0.25),
  marginBottom: theme.spacing(0.25),
}));

export const StyledRatingValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const StyledDiscountText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.25),
}));

export const StyledPriceRow = styled(Stack)(({ theme }) => ({
  alignItems: 'baseline',
  gap: theme.spacing(1),
  marginTop: theme.spacing(0.5),
}));

export const StyledCardActions = styled(CardActions)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: 0,
}));
