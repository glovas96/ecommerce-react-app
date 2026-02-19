import type { UseAuthListenerResult } from '@/shared/hooks/useAuthListener.types';

export interface AuthContextValue extends UseAuthListenerResult {
  cartSyncing: boolean;
  cartReady: boolean;
}
