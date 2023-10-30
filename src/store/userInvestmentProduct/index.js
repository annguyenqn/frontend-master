import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import assetsApi from '../../api/assetsApi';

const initialState = {
  products: [],
  isDataLoadedProducts: false,
  productsFinished: [],
  isDataLoadedProductsFinished: false,
};

export const fetchUserInvestmentProductsDataAsync = createAsyncThunk(
  'userInvestmentProducts/fetchUserPaymentHistoryDataAsync',
  async ({ page = 1 }) => {
    try {
      return await assetsApi.getUserInvestmentsProducts({ page, rowPerPage: 20 });
    } catch (error) {
      console.log(error);
    }
  },
);

export const fetchUserInvestmentProductsFinishedDataAsync = createAsyncThunk(
  'userInvestmentProducts/fetchUserInvestmentProductsFinishedDataAsync',
  async ({ page = 1 }) => {
    try {
      return await assetsApi.getUserInvestmentsProducts({ page, rowPerPage: 20, status: 'CLOSED,SUCCESS,FAIL' });
    } catch (error) {
      console.log(error);
    }
  },
);

export const userInvestmentProductsSlice = createSlice({
  name: 'userInvestmentProducts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInvestmentProductsDataAsync.pending, (state, action) => {
        state.isDataLoadedProducts = false;
      })
      .addCase(fetchUserInvestmentProductsDataAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isDataLoadedProducts = true;
      })
      .addCase(fetchUserInvestmentProductsDataAsync.rejected, (state, { error }) => {
        state.isDataLoadedProducts = false;
        console.log(error);
      })
      .addCase(fetchUserInvestmentProductsFinishedDataAsync.pending, (state, action) => {
        state.isDataLoadedProductsFinished = false;
      })
      .addCase(fetchUserInvestmentProductsFinishedDataAsync.fulfilled, (state, action) => {
        state.productsFinished = action.payload;
        state.isDataLoadedProductsFinished = true;
      })
      .addCase(fetchUserInvestmentProductsFinishedDataAsync.rejected, (state, { error }) => {
        state.isDataLoadedProductsFinished = false;
        console.log(error);
      });
  },
});

// Actions
export const { setData } = userInvestmentProductsSlice.actions;

export default userInvestmentProductsSlice.reducer;
