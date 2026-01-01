import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../axiosBaseQuery";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const qbApi = createApi({
  reducerPath: "qbApi",
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (build) => ({
    getCustomerObject: build.query({
      query: (id) => ({
          url: `/qbauth/customer/${id}`,
          method: "GET",
        }),
      }),

    disconnect: build.mutation({
      query: () => ({
        url: "/qbauth/disconnect",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { 
  useGetCustomerObjectQuery, 
  useDisconnectMutation 
} = qbApi;

export default qbApi;
