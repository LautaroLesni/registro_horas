import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  message: "",
  open: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.status = action.payload.status;
      state.message = action.payload.message;
      state.open = action.payload.open;
    },
    clearNotification: (state) => {
      state.status = initialState.status;
      state.message = initialState.message;
      state.open = initialState.open;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
