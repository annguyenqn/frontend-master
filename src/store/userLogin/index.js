import { createSlice } from '@reduxjs/toolkit';

const initialState = { user: {} };

export const userLogin = createSlice({
  name: 'UserWallet',
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Actions
export const { setUserLogin } = userLogin.actions;

export default userLogin.reducer;
