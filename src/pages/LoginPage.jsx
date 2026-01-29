import { signInWithEmailAndPassword } from 'firebase/auth';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useAuthFormFields from '@/entities/auth/hooks/useAuthFormFields';
import AuthForm from '@/features/auth/ui/AuthForm';
import { auth } from '@/shared/firebase/config';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Destination after successful login
  const redirectTo = new URLSearchParams(location.search).get('redirectTo') || '/';
  const { enqueueSnackbar } = useSnackbar();
  const { email, password, setEmail, setPassword, reset } = useAuthFormFields();

  // Submit login credentials
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password); // login user
      enqueueSnackbar('You have signed in successfully.', { variant: 'success' });
      navigate(redirectTo, { replace: true }); // return after login
      reset();
    } catch {
      enqueueSnackbar('Failed to sign in. Please check your credentials and try again.', {
        variant: 'error',
      });
    }
  };

  return (
    <React.Fragment>
      <AuthForm
        title="Login"
        submitLabel="Sign in"
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleLogin}
      />
    </React.Fragment>
  );
};

export default LoginPage;
