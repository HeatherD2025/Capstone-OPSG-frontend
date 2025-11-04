import api from "./mainApi";

const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: "/admin/users",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getUser: build.query({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    updateUser: build.mutation({
      query: ({ id, ...rest }) => ({
        url: `/admin/users/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = adminApi;

export default adminApi;
