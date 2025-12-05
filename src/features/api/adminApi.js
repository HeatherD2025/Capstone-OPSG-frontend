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


    searchUsers: build.query({
      query: (term) => ({
        url: `/admin/search`,
        method: "GET",
        params: { term },
      }),
    }),

    // updateUser: build.mutation({
    //   query: ({ id, ...rest }) => ({
    //     url: `/admin/updateUser/${id}`,
    //     method: "PUT",
    //     body: rest,
    //   }),
    //   invalidatesTags: ["User"],
    // }),

    deleteUserById: build.mutation({
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
  useSearchUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserByIdMutation,
} = adminApi;

export default adminApi;
