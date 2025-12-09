import api from "./mainApi";

const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: `/admin/users`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getUserById: build.query({
      query: (term) => ({
       url: `admin/users/${userId}`,
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
  useGetUserByIdQuery,
  useSearchUsersQuery,
  useDeleteUserByIdMutation,
} = adminApi;

// export default adminApi;
