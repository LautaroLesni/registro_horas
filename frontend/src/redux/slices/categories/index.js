import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";
import { setNotification } from "../notifications";

const initialState = {
  categories: [],
  categoriesSelect: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload.sort((a,b) => a.id - b.id);

    },
    setCategoriesSelect: (state, action) => {
      state.categoriesSelect = action.payload;
    },
    addCategories: (state, action) => {
      state.categories.push(action.payload);
      state.categoriesSelect.push(action.payload);

    },
    removeCategories: (state, action) => {
      const updatedCC = state.categories.filter((cat) => cat.id !== action.payload.id);
      state.categories = updatedCC;

    },
    setUpdate: (state, action) => {
      const updatedCC = state.categories.filter((cat) => cat.id !== action.payload.id);
      state.categories = [...updatedCC, action.payload].sort((a,b) => a.id - b.id);

    },
  },
});
export const fetchCategories = (id) => async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/categories/user/${id}`);
      dispatch(setCategories(response.data));
    } catch (error) {
      console.log(error);
    }
  };
export const fetchCategoriesSelect = () => async (dispatch) => {
    try {
      const response = await axiosInstance.get("/categories/select");
      dispatch(setCategoriesSelect(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteCategories = (id) => async (dispatch) => {
    try {
      const response = await axiosInstance.delete(`/categories/${id}`);
      dispatch(removeCategories(response.data));
      dispatch(
        setNotification({
          status: "success",
          message: "Categoría eliminada con exito",
          open: true,
        })
      );

    } catch (error) {
      console.log(error);
      dispatch(setNotification({
        status: "error",
        message: "Error al eliminar la categoría ",
        open: true,
      }))
      return error.response.data.error;
    }
  };

  export const createCategory = (values) => async (dispatch) => {
    try {
      const response = await axiosInstance.post("/categories", values);
      console.log(response.data)
      dispatch(addCategories(response.data));
      dispatch(
        setNotification({
          status: "success",
          message: "Categoría creada con exito",
          open: true,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(setNotification({
        status: "error",
        message: "Error al crear la categoría ",
        open: true,
      }))
    }
  };

  export const updateCategory = (id, values) => async (dispatch) => {
    try {
      const response = await axiosInstance.patch(`/categories/${id}`, values);
      dispatch(setUpdate(response.data));
      dispatch(
        setNotification({
          status: "success",
          message: "Categoría editada con exito",
          open: true,
        })
      );

    } catch (error) {
      console.log(error);
      dispatch(setNotification({
        status: "error",
        message: "Error al editar la categoría ",
        open: true,
      }))
      return error.response.data.error;
    }
  };
export const { setCategories, setCategoriesSelect, addCategories, removeCategories, setUpdate } = categoriesSlice.actions;

export default categoriesSlice.reducer;