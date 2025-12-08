import api from "./mainApi";

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

    refreshTokenHandler: build.mutation({
      query: ({ refreshToken }) => ({
        url: "/auth/refresh",
        method: "POST",
        data: { refreshToken },
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useRefreshTokenHandlerMutation,
} = authApi;

// export default authApi;
