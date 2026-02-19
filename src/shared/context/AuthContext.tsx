import { Fragment, type ReactNode } from 'react';

import { AuthContext } from '@/shared/context/authContextValue';
import { useAuthListener } from '@/shared/hooks/useAuthListener';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // Subscribe to Firebase auth updates
  const auth = useAuthListener();
  return (
    <Fragment>
      <AuthContext.Provider value={{ cartSyncing: false, cartReady: true, ...auth }}>
        {children}
      </AuthContext.Provider>
    </Fragment>
  );
};
