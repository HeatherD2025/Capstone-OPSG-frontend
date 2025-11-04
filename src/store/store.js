import { configureStore } from "@reduxjs/toolkit";
import qbApi from "../features/api/qbApi";
import authReducer from "../slices/authSlice";
import api from "../features/api/mainApi";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    [qbApi.reducerPath]: qbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(api.middleware)
    .concat(qbApi.middleware),
});

export default store;
