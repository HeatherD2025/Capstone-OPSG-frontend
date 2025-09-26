import api from "./mainApi";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    updateUserProfile: build.mutation({
      query: ({ firstName, lastName, email }) => ({
        url: "/users/me",
        method: "PUT",
        body: { firstName, lastName, email },
      }),
    }),

    updateUserPassword: build.mutation({
      query: ({ currentPassword, newPassword }) => ({
        url: "/users/me/password",
        method: "PUT",
        body: { currentPassword, newPassword },
      }),
    }),
  }),
});

export const { useUpdateUserProfileMutation, useUpdateUserPasswordMutation } =
  userApi;
