import api from "./mainApi";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["User"],
    }),

    updateUserProfile: build.mutation({
      query: (body) => ({
        url: "/users/me",
        method: "PUT",
        data: body,
      }),
      invalidatesTags: ["User"],
    }),

    changePassword: build.mutation({
      query: ({ currentPassword, newPassword, confirmPassword }) => ({
        url: "/users/me/password",
        method: "PATCH",
        data: { currentPassword, newPassword, confirmPassword },
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
} = userApi;
