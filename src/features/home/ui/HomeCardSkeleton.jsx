import { Card, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';

import { StyledCardActions, StyledCardContent } from '@/widgets/product/productCardStyles';

const StyledSkeletonCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  minHeight: 380,
  height: '100%',
}));

const StyledSeeMoreSkeleton = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const HomeCardSkeleton = ({ rows = 4, withSeeMore = true }) => (
  <>
    {Array.from({ length: rows }).map((_, index) => (
      <StyledSkeletonCard key={`home-skeleton-${index}`} variant="product">
        <Skeleton variant="rectangular" height={160} animation="wave" />
        <StyledCardContent>
          <Skeleton width="50%" height={14} animation="wave" />
          <Skeleton width="80%" height={28} animation="wave" />
          <Skeleton width="65%" height={16} animation="wave" />
          <Skeleton width="40%" height={16} animation="wave" />
        </StyledCardContent>
        <StyledCardActions>
          <Skeleton width="100%" height={30} animation="wave" />
        </StyledCardActions>
      </StyledSkeletonCard>
    ))}
    {withSeeMore && (
      <StyledSeeMoreSkeleton>
        <Skeleton width={90} height={32} animation="wave" />
      </StyledSeeMoreSkeleton>
    )}
  </>
);

export default HomeCardSkeleton;
