import { CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledLoaderWrapper = styled('div')(({ theme }) => ({
  minHeight: theme.spacing(25),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
}));

// Full-screen loader with message
const FullPageLoader = ({ message = 'Loading...' }) => (
  <StyledLoaderWrapper>
    <CircularProgress />
    <Typography variant="body1" color="text.secondary">
      {message}
    </Typography>
  </StyledLoaderWrapper>
);

export default FullPageLoader;
