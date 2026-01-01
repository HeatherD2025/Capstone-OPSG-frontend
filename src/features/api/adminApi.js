import api from "./mainApi";

const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: () => ({
        url: `/admin/users`,
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["User"],
    }),

    getUserById: build.query({
      query: (userId) => ({
       url: `admin/users/${userId}`,
       method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["User"],
    }),

    searchUsers: build.query({
      query: (term) => ({
        url: `/admin/search`,
        method: "GET",
        params: { term },
      }),
      transformResponse: (response) => response.data,
    }),


    deleteUserById: build.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useSearchUsersQuery,
  useDeleteUserByIdMutation,
} = adminApi;
