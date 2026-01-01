import api from "./mainApi";

const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: ({ email, firstName, lastName, password, company }) => ({
        url: "/auth/register",
        method: "POST",
        data: { email, firstName, lastName, password, company },
      }),
      transformResponse: (response) => response.data,
    }),

    login: build.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        data: { email, password },
      }),
      transformResponse: (response) => response.data,
    }),

    refreshTokenHandler: build.mutation({
      query: ({ refreshToken }) => ({
        url: "/auth/refresh",
        method: "POST",
        data: { refreshToken },
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenHandlerMutation,
} = authApi;
