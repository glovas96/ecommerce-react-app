import { Box, Card, CardMedia, CardContent, Divider, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const StyledLoaderWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  minHeight: '40vh',
}));

export const StyledCartList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const StyledCartCard = styled(Card)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

export const StyledCartItemLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  textDecoration: 'none',
  color: 'inherit',
  gap: theme.spacing(2),
}));

export const StyledCartItemImage = styled(CardMedia)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  objectFit: 'contain',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius / 2,
}));

export const StyledCartInfo = styled(CardContent)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: 0,
  '&:last-child': {
    paddingBottom: 0,
  },
}));

export const StyledQuantityColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const StyledQuantityControls = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const StyledQuantityValue = styled(Typography)(({ theme }) => ({
  minWidth: theme.spacing(4),
  textAlign: 'center',
  fontWeight: theme.typography.fontWeightRegular,
}));

export const StyledSummaryBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '60%',
  },
}));

export const StyledSummaryRow = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const StyledMessageSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const StyledActionGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  flexWrap: 'wrap',
}));

export const StyledSectionDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

export const StyledSummaryDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export const StyledItemPrice = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const StyledItemOldPrice = styled(Typography)(({ theme }) => ({
  textDecoration: 'line-through',
  color: theme.palette.text.secondary,
}));

export const StyledItemSubtotal = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const StyledRemoveButton = styled(IconButton)(() => ({
  alignSelf: 'center',
}));
