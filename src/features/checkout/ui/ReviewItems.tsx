import { Typography } from '@mui/material';

import type { ReviewItemsProps } from '@/features/checkout/types';
import {
  StyledReviewList,
  StyledReviewItem,
  StyledReviewImage,
  StyledReviewDetails,
} from '@/features/checkout/ui/checkoutStyles';

// Renders cart items for review.
const ReviewItems = ({ items }: ReviewItemsProps) => (
  <>
    <Typography variant="h5" gutterBottom>
      4. Review items
    </Typography>

    <StyledReviewList>
      {items.map((item) => (
        <StyledReviewItem key={item.id}>
          <StyledReviewImage src={item.thumbnail} alt={item.title} />

          <StyledReviewDetails>
            <Typography variant="subtitle2">{item.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {item.quantity} × ${item.price}
            </Typography>
          </StyledReviewDetails>

          <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>
        </StyledReviewItem>
      ))}
    </StyledReviewList>
  </>
);

export default ReviewItems;
