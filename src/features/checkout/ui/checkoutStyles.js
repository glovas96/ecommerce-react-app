import { Box, CardMedia, Divider, RadioGroup, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledCheckoutContent = styled(Box)(({ theme }) => ({
  maxWidth: 700,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  marginInline: 'auto',
}));

export const StyledFormSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const StyledReviewList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const StyledReviewItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: theme.spacing(1),
}));

export const StyledReviewImage = styled(CardMedia)(({ theme }) => ({
  width: 60,
  height: 60,
  objectFit: 'contain',
  borderRadius: theme.shape.borderRadius / 2,
  backgroundColor: theme.palette.background.paper,
}));

export const StyledSectionDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const StyledRadioGroupMargin = styled(RadioGroup)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const StyledSummaryBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const StyledSummaryRow = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

export const StyledSummaryDivider = styled(Divider)(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

export const StyledReviewDetails = styled(Box)(() => ({
  flex: 1,
}));

export const StyledErrorText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
