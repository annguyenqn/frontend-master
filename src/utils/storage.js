/**
 * Handle get/set user token
 * @type {{get: (function()), set: (function(*=))}}
 */
export const ADMIN_TOKEN = {
  get: () => localStorage?.getItem('adminToken'),
  set: (newValue) => {
    localStorage?.setItem('adminToken', newValue.includes('Bearer') ? newValue : `Bearer ${newValue}`);
  },
  delete: () => localStorage?.removeItem('adminToken'),
};

export const ADMIN_WALLET_ADDRESS = {
  get: () => localStorage?.getItem('adminWalletAddress'),
  set: (newValue) => {
    localStorage?.setItem('adminWalletAddress', newValue);
  },
  delete: () => localStorage?.removeItem('adminWalletAddress'),
};

export const CHAIN_ID = {
  get: () => localStorage?.getItem('chainId'),
  set: (newValue) => {
    localStorage?.setItem('chainId', newValue);
  },
  delete: () => localStorage?.removeItem('chainId'),
};

export const USER_LOGIN = {
  get: () => localStorage.getItem('userLogin'),
  set: (newValue) => localStorage.setItem('userLogin', newValue),
  delete: () => localStorage.removeItem('userLogin'),
};

export const VIEW_MODE = {
  get: () => localStorage.getItem('view-mode'),
  set: (newValue) => localStorage.setItem('view-mode', newValue),
  delete: () => localStorage.removeItem('view-mode'),
};
