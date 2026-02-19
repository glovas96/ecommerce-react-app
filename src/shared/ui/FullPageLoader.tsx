import { CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { FullPageLoaderProps } from '@/shared/ui/fullPageLoader.types';

const StyledLoaderWrapper = styled('div')(({ theme }) => ({
  minHeight: theme.spacing(25),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
}));

// Full-screen loader with message
const FullPageLoader = ({ message = 'Loading...' }: FullPageLoaderProps) => (
  <StyledLoaderWrapper>
    <CircularProgress />
    <Typography variant="body1" color="text.secondary">
      {message}
    </Typography>
  </StyledLoaderWrapper>
);

export default FullPageLoader;
