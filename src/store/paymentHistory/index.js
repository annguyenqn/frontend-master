import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import paymentHistoryApi from '../../api/paymentHistoryApi';

const initialState = { data: [], isDataLoaded: false };

export const fetchUserPaymentHistoryDataAsync = createAsyncThunk(
  'paymentHistory/fetchUserPaymentHistoryDataAsync',
  async ({ page = 1 }) => {
    try {
      return await paymentHistoryApi.get({ page, rowPerPage: 20 });
    } catch (error) {
      console.log(error);
    }
  },
);

export const paymentHistorySlice = createSlice({
  name: 'paymentHistory',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserPaymentHistoryDataAsync.pending, (state, action) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchUserPaymentHistoryDataAsync.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isDataLoaded = true;
      })
      .addCase(fetchUserPaymentHistoryDataAsync.rejected, (state, { error }) => {
        state.isDataLoaded = false;
        console.log(error);
      });
  },
});

// Actions
export const { setData } = paymentHistorySlice.actions;

export default paymentHistorySlice.reducer;
