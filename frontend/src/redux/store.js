import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer from "./slices/auth";
import categoriesReducer from "./slices/categories";
import notesReducer from "./slices/notes";
import notificationReducer from "./slices/notifications";
import modalReducer from "./slices/modal";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistAuthConfig = {
  key: "auth",
  storage,
  whitelist: ["accessToken", "currentUser"],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistAuthConfig, authReducer),
    categories: categoriesReducer,
    notes: notesReducer,
    notification: notificationReducer,
    modal: modalReducer,
  },
  middleware: (defaultMiddleware) =>
    defaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
