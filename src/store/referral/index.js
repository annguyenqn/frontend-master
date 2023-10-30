import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import referralApi from 'api/referralApi';

const initialState = {
  invitees: [],
  isInviteesDataLoaded: false,
  inviter: {},
  isInviterDataLoaded: false,
};

export const getInviterData = async () => {
  try {
    return await referralApi.getInviter();
  } catch (error) {
    console.log(error);
  }
};

export const fetchInviteeDataAsync = createAsyncThunk('userReferral/fetchInviteeDataAsync', async () => {
  try {
    return await referralApi.getInvitee();
  } catch (error) {
    console.log(error);
  }
});

export const fetchUserInviterDataAsync = createAsyncThunk('userReferral/fetchUserInviterDataAsync', async () => {
  try {
    return await referralApi.getInviter();
  } catch (error) {
    console.log(error);
  }
});

export const userReferralSlice = createSlice({
  name: 'userReferral',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchInviteeDataAsync.pending, (state) => {
        state.isInviteesDataLoaded = false;
      })
      .addCase(fetchInviteeDataAsync.fulfilled, (state, action) => {
        state.invitees = action.payload;
        state.isInviteesDataLoaded = true;
      })
      .addCase(fetchInviteeDataAsync.rejected, (state, { error }) => {
        state.isInviteesDataLoaded = false;
        console.log(error);
      })
      //---------
      // INVITER
      .addCase(fetchUserInviterDataAsync.pending, (state) => {
        state.isInviterDataLoaded = false;
      })
      .addCase(fetchUserInviterDataAsync.fulfilled, (state, action) => {
        state.inviter = action.payload;
        state.isInviterDataLoaded = true;
      })
      .addCase(fetchUserInviterDataAsync.rejected, (state, { error }) => {
        state.isInviterDataLoaded = false;
        console.log(error);
      });
  },
});

// Actions
export const { setData } = userReferralSlice.actions;

export default userReferralSlice.reducer;
