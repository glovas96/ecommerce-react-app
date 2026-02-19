import { Chip } from '@mui/material';
import type { ChipProps } from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

import type { ProductBadgeProps, ProductBadgeVariant } from '@/shared/ui/productBadge.types';

const StyledProductBadge = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'badgevariant',
})<ChipProps & { badgevariant?: ProductBadgeVariant }>(({ theme, badgevariant }) => {
  const isHot = badgevariant === 'hot';
  const baseRadius = Number(theme.shape.borderRadius);
  return {
    position: 'absolute',
    top: theme.spacing(1.2),
    left: theme.spacing(1.2),
    backgroundColor: isHot ? theme.palette.secondary.main : theme.palette.error.main,
    color: isHot ? theme.palette.secondary.contrastText : '#fff',
    borderRadius: baseRadius * 1.25,
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.02em',
    zIndex: 1,
    boxShadow: theme.shadows[1],
    textTransform: 'uppercase',
    paddingInline: theme.spacing(0.9),
    paddingBlock: theme.spacing(0.35),
  };
});

const ProductBadge = ({ variant = 'sale', label }: ProductBadgeProps) => {
  const isHot = variant === 'hot';
  return (
    <StyledProductBadge
      badgevariant={variant}
      label={label ?? (isHot ? 'HOT DEAL' : 'SALE')}
      size="small"
      component="span"
      clickable={false}
    />
  );
};

export default ProductBadge;
