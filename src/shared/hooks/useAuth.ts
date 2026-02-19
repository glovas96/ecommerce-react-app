import { useContext } from 'react';

import type { AuthContextValue } from '@/shared/context/authContext.types';
import { AuthContext } from '@/shared/context/authContextValue';

// Shortcut hook to read auth context
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
