import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import {
  StyledHeroButton,
  StyledHeroSection,
  StyledHeroSubtitle,
} from '@/features/home/ui/homeStyles';

// Renders main hero block with CTA.
const HomeHero = () => (
  <StyledHeroSection>
    <Typography variant="h3" fontWeight="bold" gutterBottom>
      Welcome to our store
    </Typography>
    <StyledHeroSubtitle variant="h6">Discover top products at the best prices</StyledHeroSubtitle>
    <StyledHeroButton variant="contained" size="large" component={Link} to="/catalog">
      Go to catalog
    </StyledHeroButton>
  </StyledHeroSection>
);

export default HomeHero;
