import React from 'react';

import { AuthContext } from '@/shared/context/authContextValue';
import { useAuthListener } from '@/shared/hooks/useAuthListener';

export const AuthProvider = ({ children }) => {
  // Subscribe to Firebase auth updates
  const auth = useAuthListener();
  return (
    <React.Fragment>
      <AuthContext.Provider value={{ cartSyncing: false, cartReady: true, ...auth }}>
        {children}
      </AuthContext.Provider>
    </React.Fragment>
  );
};
