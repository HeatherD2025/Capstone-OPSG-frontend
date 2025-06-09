import api from "../App/api";

const qbApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCustomerObject: build.query({
      query: (id) => ({
        url: `/qbauth/customer/${id}`,
        method: "GET",
      }),
    }),

    disconnect: build.query({
      query: () => ({
        url: "/qbauth/disconnect",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetCustomerObjectQuery, useDisconnectQuery } = qbApi;
