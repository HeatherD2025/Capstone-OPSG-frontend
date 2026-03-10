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
      query: ({ id, ...userData }) => ({
        // if Id is passed, its an admin edit - if not, self edit
        url: id ? `admin/users/${id}` : "/users/me",
        method: "PATCH",
        data: userData,
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
