import { useState, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';

export interface AuthFormFields {
  email: string;
  password: string;
  setEmail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  reset: () => void;
}

const useAuthFormFields = (): AuthFormFields => {
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
