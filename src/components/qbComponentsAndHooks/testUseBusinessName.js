// import { useGetCustomerObjectQuery } from "../../features/api/qbApi.js";
// import { useGetCurrentUserQuery } from "../../features/api/userApi.js";
// // import fakeCompany from "./fakeCompany.jsx";
// import fakeCompanyInfo from "./fakeCompany.js";

// export default function useBusinessName() {
//   const { fakeCompanyName } = fakeCompanyInfo()

//   // fetching logged in user
//   const {
//     data: userData,
//     isLoading: userLoading,
//     error: userError,
//   } = useGetCurrentUserQuery();

//   const qbId = userData?.qbId || null;

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
//     const comp = user?.company || user?.companyData || null;
//     if (!comp) return null;

//     return {
//       name: comp?.name || comp?.companyName || null,
//       email: comp?.email || null,
//       source: "seeded db",
//     };
//   }

//   // priority order of company source
//   const company =
//     // normalizeQB(qbData) || normalizeUserCompany(userData) || fakeCompany;
//         normalizeQB(qbData) || normalizeUserCompany(userData) || fakeCompanyName;
//     const isLoading = userLoading || qbLoading;
//     const error = userError || qbError;

//   return { company, isLoading, error };
// }
