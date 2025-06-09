import api from "../App/api";

const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: ({ email, firstName, lastName, password }) => ({
        url: "/auth/register",
        method: "POST",
        body: { email, firstName, lastName, password },
      }),
      providesTags: ["User"],
    }),

    login: build.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
      providesTags: ["User"],
    }),

    getAllUsers: build.query({
      query: () => ({
        url: "/auth/getAllUsers/",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),

    getUser: build.query({
      query: (id) => ({
        url: `/auth/getUser/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),

    updateUserProfile: build.mutation({
      query: ({ id, firstName, lastName, email }) => ({
        url: `/auth/updateUserProfile/${id}`,
        method: "PUT",
        body: { firstName, lastName, email },
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `auth/deleteUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserProfileMutation,
} = usersApi;
