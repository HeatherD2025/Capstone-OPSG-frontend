import { configureStore } from "@reduxjs/toolkit";
import { siteRegisterReducer, siteLoginReducer } from "../Slices/authSlice";
import api from "./api";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    register: siteRegisterReducer,
    login: siteLoginReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(api.middleware),
});

export default store;
