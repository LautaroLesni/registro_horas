import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/axiosInstance";
import { setNotification } from "../notifications";

const initialState = {
  notes: [],
  notesReferencia: [],
  notesSelect: [],
  archivedNotes: []
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = action.payload.sort((a,b) => a.id - b.id);
      state.notesReferencia = action.payload.sort((a,b) => a.id - b.id);
    },
    setArchivedNotes: (state, action) => {
      state.archivedNotes = action.payload.sort((a,b) => a.id - b.id);
    },
    setNotesSelect: (state, action) => {
      state.notes = action.payload;
    },
    filterByCategory: (state, action) =>{
      if(action.payload === 0){
        state.notes = state.notesReferencia
      }
      else{ 
        const filtrado = state.notesReferencia.filter((note) => note.categories.some((cat) => cat.category.id === action.payload.id))
        state.notes = filtrado
      }
    },
    addNotes: (state, action) => {
      state.notes.unshift(action.payload);
      state.notesReferencia.unshift(action.payload);
      state.notesSelect.push(action.payload);
    },
    removeNotes: (state, action) => {
      const updatedCC = state.notesReferencia.filter((note) => note.id !== action.payload.id);
      state.notes = updatedCC;
      state.notesReferencia = updatedCC;
    },
    removeArchivedNotes: (state, action) => {
      const updatedCC = state.notesReferencia.filter((note) => note.id !== action.payload.id);
      state.notes = updatedCC;
      state.notesReferencia = updatedCC;
    },
    setUpdate: (state, action) => {
      const updatedCC = state.notesReferencia.filter((note) => note.id !== action.payload.id);
      state.notes = [...updatedCC, action.payload].sort((a,b) => a.id - b.id)
      state.notesReferencia = [...updatedCC, action.payload].sort((a,b) => a.id - b.id)
    },
  },
});
export const fetchNotes = (id) => async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/notes/user/${id}`);
      console.log(response.data)
      dispatch(setNotes(response.data));
    } catch (error) {
      console.log(error);
    }
  };
export const fetchArchivedNotes = (id) => async (dispatch) => {
    try {
      const response = await axiosInstance.get(`/notes/archived/user/${id}`);
      dispatch(setNotes(response.data));
    } catch (error) {
      console.log(error);
    }
  };
export const fetchNotesSelect = () => async (dispatch) => {
    try {
      const response = await axiosInstance.get("/notes/select");
      dispatch(setNotesSelect(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteNotes = (id) => async (dispatch) => {
    try {
      const response = await axiosInstance.delete(`/notes/${id}`);
      dispatch(removeNotes(response.data));
      dispatch(
        setNotification({
          status: "success",
          message: "Nota eliminada con exito",
          open: true,
        })
      );

    } catch (error) {
      console.log(error);
      dispatch(setNotification({
        status: "error",
        message: "Error al eliminar la nota",
        open: true,
      }))
      return error.response.data.error;
    }
  };

  export const createNote = (values) => async (dispatch) => {
    try {
      const response = await axiosInstance.post("/notes", values);
      console.log(response.data)
      dispatch(addNotes(response.data));
      dispatch(
        setNotification({
          status: "success",
          message: "Nota creada con exito",
          open: true,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(setNotification({
        status: "error",
        message: "Error al crear la nota",
        open: true,
      }))
    }
  };

  export const updateNote = (id, values) => async (dispatch) => {
    try {
      const response = await axiosInstance.patch(`/notes/${id}`, values);
      dispatch(setUpdate(response.data));
      dispatch(
        setNotification({
          status: "success",
          message: "Nota editada con exito",
          open: true,
        })
      );

    } catch (error) {
      console.log(error);
      dispatch(setNotification({
        status: "error",
        message: "Error al editar la nota",
        open: true,
      }))
      return error.response.data.error;
    }
  };

  export const archiveNote = (id, value) => async (dispatch) => {
    try {
      const response = await axiosInstance.patch(`/notes/archive/${id}`, value);
      dispatch(removeNotes(response.data));
      dispatch(
        setNotification({
          status: "success",
          message: "Nota archivada/desarchivada con exito",
          open: true,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(setNotification({
        status: "error",
        message: "Error al archivar/desarchivar la nota",
        open: true,
      }))
      return error.response.data.error;
    }
  };
export const { setNotes, setNotesSelect, addNotes, removeNotes, setUpdate, setArchivedNotes, removeArchivedNotes, filterByCategory } = notesSlice.actions;

export default notesSlice.reducer;