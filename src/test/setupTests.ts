import { afterEach, beforeEach, vi } from 'vitest';

import { firebaseMocks, resetFirebaseMocks } from '@/test/mocks/firebase';
import { createMockStorage } from '@/test/mocks/storage';

// Apply shared mocks for Firebase + storage
vi.mock('@/shared/firebase/config', () => firebaseMocks);

const mockStorage = createMockStorage();
vi.stubGlobal('localStorage', mockStorage);
vi.stubGlobal('fetch', vi.fn());

beforeEach(() => {
  mockStorage.clear();
  resetFirebaseMocks();
});

afterEach(() => {
  vi.clearAllMocks();
});
