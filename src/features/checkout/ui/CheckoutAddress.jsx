import { TextField, Typography } from '@mui/material';

import { StyledFormSection, StyledErrorText } from '@/features/checkout/ui/checkoutStyles';

// Renders address inputs grouped in a form.
const CheckoutAddress = ({ register, errors, serverError, onSubmit }) => (
  <>
    <Typography variant="h5" gutterBottom>
      1. Delivery address
    </Typography>

    <StyledFormSection component="form" onSubmit={onSubmit} noValidate>
      <TextField
        label="Full name"
        {...register('name')}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Phone"
        {...register('phone')}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <TextField
        label="City"
        {...register('city')}
        error={!!errors.city}
        helperText={errors.city?.message}
      />
      <TextField
        label="Street"
        {...register('street')}
        error={!!errors.street}
        helperText={errors.street?.message}
      />
      <TextField
        label="ZIP code"
        {...register('zip')}
        error={!!errors.zip}
        helperText={errors.zip?.message}
        inputMode="numeric"
      />
    </StyledFormSection>

    {serverError && (
      <StyledErrorText color="error" role="alert">
        {serverError}
      </StyledErrorText>
    )}
  </>
);

export default CheckoutAddress;
