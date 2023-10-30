import { createSlice } from '@reduxjs/toolkit';

const initialState = { lands: [] };

export const landsSlice = createSlice({
  name: 'Lands',
  initialState,
  reducers: {
    setLands: (state, action) => {
      state.lands = action.payload;
    },
    deleteLands: (state) => {
      state.lands = initialState.lands;
    },
  },
});

// Actions
export const { setLands, deleteLands } = landsSlice.actions;

export default landsSlice.reducer;
