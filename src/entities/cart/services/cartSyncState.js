let unsubscribe = null;
let prevItems = [];
let skipSaveOnLogout = false;
let isSyncing = false;
let authReady = false;
let hasUser = false;
let hadGuestCartSession = false;

export const resetCartSyncState = () => {
  unsubscribe = null;
  prevItems = [];
  skipSaveOnLogout = false;
  isSyncing = false;
  authReady = false;
  hasUser = false;
  hadGuestCartSession = false;
};

export const getUnsubscribe = () => unsubscribe;
export const setUnsubscribe = (value) => {
  unsubscribe = value;
};

export const getPrevItems = () => prevItems;
export const setPrevItems = (value) => {
  prevItems = value;
};

export const markSkipSaveOnLogout = () => {
  skipSaveOnLogout = true;
};
export const clearSkipSaveOnLogout = () => {
  skipSaveOnLogout = false;
};
export const isSkipSaveOnLogout = () => skipSaveOnLogout;

export const setSyncingCart = (value) => {
  isSyncing = value;
};
export const isSyncingCart = () => isSyncing;

export const markAuthReady = () => {
  authReady = true;
};
export const isAuthReady = () => authReady;

export const setHasUser = (value) => {
  hasUser = value;
};
export const hasAuthenticatedUser = () => hasUser;

export const setHadGuestCartSession = (value) => {
  hadGuestCartSession = value;
};
export const hadGuestCartSessionFlag = () => hadGuestCartSession;
