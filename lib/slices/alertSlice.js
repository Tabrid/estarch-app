import { createSlice } from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',
  initialState: { visible: false, message: '' },
  reducers: {
    showAlert: (state, action) => {
      state.visible = true;
      state.message = action.payload;
    },
    hideAlert: (state) => {
      state.visible = false;
      state.message = '';
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;
export default alertSlice.reducer;