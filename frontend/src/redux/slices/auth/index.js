import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";
import jwtDecode from "jwt-decode";
import { setNotification } from "../notifications";

const initialState = {
  accessToken: "",
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccesToken: (state, action) => {
      state.accessToken = action.payload;
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${action.payload}`;
    },
    clearAccessToken: (state, action) => {
      state.accessToken = initialState.accessToken;
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer `;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state, action) => {
      state.currentUser = initialState.currentUser;
    },
  },
});

export const logInUser = (values) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/auth/login`, values);
    dispatch(setAccesToken(response.data.access_token));
    const decoded = jwtDecode(response.data.access_token);
    dispatch(setCurrentUser(decoded));
    dispatch(
      setNotification({
        status: "success",
        message: "Te has logeado correctamente",
        open: true,
      })
    );
  } catch (error) {
    console.log(error);
    if (error.request.status === 403) {
      dispatch(
        setNotification({
          status: "error",
          message: "Usuario y/o contraseña incorrectos ",
          open: true,
        })
      );
    } else {
      dispatch(
        setNotification({
          status: "error",
          message: "Error al iniciar sesión",
          open: true,
        })
      );
    }
  }
};
export const registerUser = (values, success) => async (dispatch) => {
  try {
    const response = await axiosInstance.post(`/auth/register`, values);
    success();
  } catch (error) {
    console.log(error);
  }
};

export const { setAccesToken, clearAccessToken, setCurrentUser, clearCurrentUser } = authSlice.actions;

export default authSlice.reducer;
