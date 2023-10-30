import { createSlice } from '@reduxjs/toolkit';
import bankAccountApi from '../../api/bankApi';

const initialState = { data: [], isDataLoaded: false };

export const banksSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    setBanks: (state, action) => {
      state.data = action.payload;
      state.isDataLoaded = true;
    },
  },
});

export const fetchBanksDataAsync = () => async (dispatch) => {
  try {
    const banks = await bankAccountApi.get();
    dispatch(setBanks(banks));
  } catch (error) {
    console.log(error);
  }
};

// Actions
export const { setBanks } = banksSlice.actions;

export default banksSlice.reducer;
