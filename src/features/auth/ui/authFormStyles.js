import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledFormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  width: 'min(100%, 420px)',
  marginInline: 'auto',
  marginTop: theme.spacing(5),
}));

export const StyledFormTitle = styled(Typography)(() => ({
  textAlign: 'center',
}));
