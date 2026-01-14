import { AuthContext } from '@/shared/context/authContextValue';
import { useAuthListener } from '@/shared/hooks/useAuthListener';

export const AuthProvider = ({ children }) => {
  // Subscribe to Firebase auth updates
  const auth = useAuthListener();
  return (
    <AuthContext.Provider value={{ cartSyncing: false, cartReady: true, ...auth }}>
      {children}
    </AuthContext.Provider>
  );
};
