import { Box, Card, CardMedia, CardContent, Chip, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledSectionSpacing = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const StyledSectionDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

export const StyledItemList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const StyledItemCard = styled(Card)(({ theme }) => ({
  gap: theme.spacing(2),
  padding: theme.spacing(1),
  textDecoration: 'none',
  color: 'inherit',
}));

export const StyledItemImage = styled(CardMedia)(({ theme }) => ({
  width: 120,
  height: 120,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius / 2,
}));

export const StyledMetadataText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const StyledMessageSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const StyledItemDetails = styled(CardContent)(() => ({
  flex: 1,
}));

export const StyledStatusChip = styled(Chip)(() => ({
  textTransform: 'capitalize',
}));
