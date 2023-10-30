import { createSlice } from '@reduxjs/toolkit';

const initialState = { balance: 0, chainId: 0 };

export const userWalletSlice = createSlice({
  name: 'UserWallet',
  initialState,
  reducers: {
    setUserWallet: (state, action) => {
      state.balance = action.payload;
    },
    setUserChainId: (state, action) => {
      state.chainId = action.payload;
    },
  },
});

// Actions
export const { setUserWallet, setUserChainId } = userWalletSlice.actions;

export default userWalletSlice.reducer;
