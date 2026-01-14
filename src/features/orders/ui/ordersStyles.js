import { Box, Card, Chip, FormControl, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PageContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const FiltersRow = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
}));

export const StatusControl = styled(FormControl)(({ theme }) => ({
  minWidth: 140,
  marginBottom: theme.spacing(2),
}));

export const HeaderTitle = styled(Typography)(() => ({}));

export const ListWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const OrderCard = styled(Card)(() => ({
  justifyContent: 'space-between',
}));

export const MetadataText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
}));

export const ChipWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const StatusChip = styled(Chip)(() => ({
  textTransform: 'capitalize',
}));

export const DetailText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
}));

export const ActionsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));
