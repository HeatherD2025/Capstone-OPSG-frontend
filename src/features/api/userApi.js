import api from "./mainApi";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUserProfile: build.mutation({
      query: (body) => ({
        url: "/users/me",
        method: "PUT",
        data,
      }),
      invalidatesTags: ["User"],
    }),

    // TEST CODE
    // updateUserProfile: build.mutation({
    //   query: ({ id, firstName, lastName, email }) => ({
    //     url: `/users/updateUserProfile/${id}`,
    //     method: "PUT",
    //     body: { firstName, lastName, email },
    //   }),
    //   invalidatesTags: ["User"],
    // }),
    //

    changePassword: build.mutation({
      query: ({ currentPassword, newPassword, confirmPassword }) => ({
        url: "/users/me/password",
        method: "PATCH",
        body: { currentPassword, newPassword, confirmPassword },
      }),
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation,
} = userApi;

export default userApi;
