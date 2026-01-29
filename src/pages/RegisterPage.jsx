import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useAuthFormFields from '@/entities/auth/hooks/useAuthFormFields';
import AuthForm from '@/features/auth/ui/AuthForm';
import { auth } from '@/shared/firebase/config';

const RegisterPage = () => {
  const { email, password, setEmail, setPassword, reset } = useAuthFormFields();
  const navigate = useNavigate();
  const location = useLocation();
  // Redirect target after registration
  const redirectTo = new URLSearchParams(location.search).get('redirectTo') || '/';
  const { enqueueSnackbar } = useSnackbar();

  // Validate password strength
  const validatePassword = (value) => {
    if (value.length < 6) return 'Password must be at least 6 characters.';
    if (!/[A-Z]/.test(value)) return 'Include at least one uppercase letter.';
    if (!/[0-9]/.test(value)) return 'Include at least one digit.';
    return null;
  };

  // Submit registration form
  const handleRegister = async (e) => {
    e.preventDefault();
    const clientError = validatePassword(password);
    if (clientError) {
      enqueueSnackbar(clientError, { variant: 'error' });
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      enqueueSnackbar('Account created, you are signed in.', { variant: 'success' });
      navigate(redirectTo, { replace: true });
      reset();
    } catch (error) {
      let message = 'Failed to register. Please try again.';
      if (error?.code === 'auth/email-already-in-use') {
        message = 'This email is already registered.';
      }
      enqueueSnackbar(message, { variant: 'error' });
    }
  };

  return (
    <React.Fragment>
      <AuthForm
        title="Register"
        submitLabel="Create account"
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleRegister}
      />
    </React.Fragment>
  );
};

export default RegisterPage;
