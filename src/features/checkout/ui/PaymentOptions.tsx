import { Typography, FormControlLabel, Radio } from '@mui/material';

import type { PaymentOptionsProps } from '@/features/checkout/types';
import { StyledRadioGroupMargin } from '@/features/checkout/ui/checkoutStyles';

// Toggles payment method selection.
const PaymentOptions = ({ payment, onChange }: PaymentOptionsProps) => (
  <>
    <Typography variant="h5" gutterBottom>
      2. Payment method
    </Typography>

    <StyledRadioGroupMargin value={payment} onChange={onChange}>
      <FormControlLabel value="card" control={<Radio />} label="Credit / Debit card" />
      <FormControlLabel value="cash" control={<Radio />} label="Cash on delivery" />
    </StyledRadioGroupMargin>
  </>
);

export default PaymentOptions;
