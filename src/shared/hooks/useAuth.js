import { useContext } from 'react';

import { AuthContext } from '@/shared/context/authContextValue';

// Shortcut hook to read auth context
export const useAuth = () => useContext(AuthContext);
