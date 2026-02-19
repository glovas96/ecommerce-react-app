import { Card, Typography } from '@mui/material';
import type { CardProps } from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

import type { SeeMoreCardProps } from '@/shared/ui/seeMoreCard.types';

const StyledCard = styled(Card)<CardProps>(({ theme }) => ({
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
const SeeMoreCard = ({ to }: SeeMoreCardProps) => (
  <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
    <StyledCard>
      <StyledTitle variant="h6">See more</StyledTitle>
    </StyledCard>
  </Link>
);

export default SeeMoreCard;
