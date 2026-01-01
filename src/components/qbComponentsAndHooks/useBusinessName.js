// import { useGetCustomerObjectQuery } from "../../features/api/qbApi.js";
// import { faker } from "@faker-js/faker";

// export default function useBusinessName(userResponse) {
//   const user = userResponse?.data;
//   const qbId = user?.qbId || null;
//   const fakeCompany = {
//     name: faker.company.name().toUpperCase(),
//     email: faker.internet.email(undefined, undefined, "example.com"),
//     source: "faker-demo",
//   };

//   // fetching qb if user has qbId
//   const {
//     data: qbData,
//     isLoading: qbLoading,
//     error: qbError,
//   } = useGetCustomerObjectQuery(qbId, { skip: !qbId });

//   // normalizer functions for qb and user data
//   function normalizeQB(data) {
//     const customerArray = data?.QueryResponse?.Customer;
//     if (!customerArray?.length) return null;

//     const c = customerArray[0];
//     return {
//       name: c?.FullyQualifiedName || null,
//       email: c?.PrimaryEmailAddr?.Address || null,
//       source: "quickbooks",
//     };
//   }

//   function normalizeUserCompany(user) {
//     const comp = user?.company;
//     if (!comp) return null;

//     return {
//       name: comp?.name || { fakeCompany },
//       email: comp?.email || null,
//       source: "seeded db",
//     };
//   }

//   // priority order of company source
//   const company = normalizeQB(qbData) || normalizeUserCompany(user);

//   return {
//     company,
//     isLoading: qbLoading,
//     error: qbError,
//   };
// }
