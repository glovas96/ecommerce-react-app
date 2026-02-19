import { createContext } from 'react';

import type { AuthContextValue } from './authContext.types';

// Shared auth context object
export const AuthContext = createContext<AuthContextValue | null>(null);
