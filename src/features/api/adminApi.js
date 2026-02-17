import api from "./mainApi";

const adminApi = api.injectEndpoints({
  endpoints: (build) => ({

    getUsers: build.query({
      query: ({ term } = {}) => ({
        url: `/admin/users`,
        method: "GET",
        params: term ? { term } : undefined,
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
  useGetUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserByIdMutation,
} = adminApi;
