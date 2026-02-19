import type { FormEventHandler, ReactNode } from 'react';

export interface AuthFormProps {
  title: string;
  submitLabel: string;
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
  disabled?: boolean;
  children?: ReactNode;
}
