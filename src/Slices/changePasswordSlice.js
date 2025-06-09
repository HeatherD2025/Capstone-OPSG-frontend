import api from "../App/api";

export const changePasswordApi = api.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation({
      query: ({ id, currentPassword, newPassword, confirmPassword }) => ({
        url: `/auth/user/${id}`,
        method: "PATCH",
        body: { currentPassword, newPassword, confirmPassword },
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const { useChangePasswordMutation } = changePasswordApi;
