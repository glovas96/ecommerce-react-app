import { useState, useCallback } from 'react';

// Manages shared auth form inputs.
const useAuthFormFields = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const reset = useCallback(() => {
    setEmail('');
    setPassword('');
  }, []);

  return {
    email,
    password,
    setEmail,
    setPassword,
    reset,
  };
};

export default useAuthFormFields;
