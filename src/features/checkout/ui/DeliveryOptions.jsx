import { Typography, FormControlLabel, Radio } from '@mui/material';

import { StyledRadioGroupMargin } from '@/features/checkout/ui/checkoutStyles';

// Allows user to pick a delivery level.
const DeliveryOptions = ({ delivery, onChange }) => (
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
