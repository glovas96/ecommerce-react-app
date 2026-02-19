import { Typography, FormControlLabel, Radio } from '@mui/material';

import type { DeliveryOptionsProps } from '@/features/checkout/types';
import { StyledRadioGroupMargin } from '@/features/checkout/ui/checkoutStyles';

// Allows user to pick a delivery level.
const DeliveryOptions = ({ delivery, onChange }: DeliveryOptionsProps) => (
  <>
    <Typography variant="h5" gutterBottom>
      3. Delivery options
    </Typography>

    <StyledRadioGroupMargin value={delivery} onChange={onChange}>
      <FormControlLabel value="standard" control={<Radio />} label="Standard delivery (Free)" />
      <FormControlLabel value="express" control={<Radio />} label="Express delivery (+$5)" />
    </StyledRadioGroupMargin>
  </>
);

export default DeliveryOptions;
