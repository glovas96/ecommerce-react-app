import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledCard = styled(Card)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  borderRadius: theme.shape.borderRadius,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: '0.2s',
  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
  },
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
}));

// Compact card reused for catalog call-to-action links
const SeeMoreCard = ({ to }) => (
  <StyledCard component={Link} to={to}>
    <StyledTitle variant="h6">See more</StyledTitle>
  </StyledCard>
);

export default SeeMoreCard;
