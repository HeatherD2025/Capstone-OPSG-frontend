import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["User"],
  endpoints: () => ({}), // empty base points to be inbjected by my other APis
});

export default api;
