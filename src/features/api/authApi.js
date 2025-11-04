import api from "./mainApi";
import { axiosBaseQuery } from "../axiosBaseQuery";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: ({ email, firstName, lastName, password }) => ({
        url: "/auth/register",
        method: "POST",
        data: { email, firstName, lastName, password },
      }),
    }),

    login: build.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        data: { email, password },
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;

export default authApi;
