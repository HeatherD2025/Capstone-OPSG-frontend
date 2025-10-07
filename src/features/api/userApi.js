import api from "./mainApi";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["User"]
    }),
    
    updateUserProfile: build.mutation({
      query: (body) => ({
        url: "/users/me",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"]
    }),

    updateUserPassword: build.mutation({
      query: ({ currentPassword, newPassword, confirmPassword }) => ({
        url: "/users/me/password",
        method: "PATCH",
        body: { currentPassword, newPassword, confirmPassword  },
      }),
    }),
  }),
});

export const { 
  useGetCurrentUserQuery, 
  useUpdateUserProfileMutation, 
  useUpdateUserPasswordMutation } =
  userApi;

  export default userApi;
