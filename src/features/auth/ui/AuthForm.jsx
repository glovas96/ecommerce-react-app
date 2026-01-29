import { TextField, Button } from '@mui/material';
import React from 'react';

import { StyledFormContainer, StyledFormTitle } from '@/features/auth/ui/authFormStyles';

// Shared layout for login/register forms.
const AuthForm = ({
  title,
  submitLabel,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  disabled = false,
  children,
}) => (
  <React.Fragment>
    <StyledFormContainer component="form" onSubmit={onSubmit}>
      <StyledFormTitle variant="h4">{title}</StyledFormTitle>

      <TextField
        type="email"
        label="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        fullWidth
      />

      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        fullWidth
      />

      {children}

      <Button type="submit" variant="contained" size="large" disabled={disabled}>
        {submitLabel}
      </Button>
    </StyledFormContainer>
  </React.Fragment>
);

export default AuthForm;
