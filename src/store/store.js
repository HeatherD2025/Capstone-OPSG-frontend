import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import api from "../features/api/mainApi";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
