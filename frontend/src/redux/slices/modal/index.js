import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";

const initialState = {
  status: false,
  form: [],
  data: [],
  deleteFunction: [],
  style: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
  },
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setDataModal: (state, action) => {
      state.data = action.payload;
    },
    setFormModal: (state, action) => {
      state.form = action.payload;
    },
    setStyleModal: (state, action) => {
      state.style = action.payload;
    },
    setStatusModal: (state, action) => {
      state.status = action.payload;
    },
    setDeleteModal: (state, action) => {
      state.deleteFunction = action.payload;
    },
    setResetStyle: () => {
      state.style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 500,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 2,
      };
    },
  },
});

export const { setDataModal, setFormModal, setStyleModal, setStatusModal, setDeleteModal, setResetStyle } =
  modalSlice.actions;

export default modalSlice.reducer;
