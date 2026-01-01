// import { useGetCustomerObjectQuery } from "../../features/api/qbApi.js";
// // import { faker } from "@faker-js/faker";
// import fakeCompanyInfo from "./fakeCompany.js";

// // function Balance({ id, bg }) {
// export default function useBalance() {
//   const { fakeCompanyBalance } = fakeCompanyInfo();
//   // const fakeBalance = faker.finance.amount({
//   //   min: 150,
//   //   max: 5450,
//   //   dec: 2,
//   //   symbol: "$",
//   // });

//   // const qbId = userData?.qbId || null;

//   const { data, qbIsLoading, qbError } = useGetCustomerObjectQuery();

//   // if (!data) {
//   //   return <p>Current balance due: {fakeBalance}</p>;
//   // }

//   // if (isLoading) return <p>Loading..." </p>;

//   // if (error || data?.error) {
//   //   return <p>Failed to fetch balance, Quickbooks data unavailable</p>;
//   // }

//   // const customer = data?.QueryResponse?.Customer?.[0];
//   // const balanceValue = customer?.Balance || 0;
//   function findCustomerData(data) {
//     const customer = data?.QueryResponse?.Customer?.[0];
//     if (!customer?.length) return null;

//     const qbCustomerBalance = customer[0];
//     return {
//       balance: qbCustomerBalance?.CurrentBalanceWithSubAccounts || null,
//       source: "quickbooks",
//     };
//   }

//   // const balanceValue = customer?.Balance || 0;
//   // if (!balanceValue) return null;
//   const balance = findCustomerData(data) || fakeCompanyBalance;
//   const isLoading = qbIsLoading;
//   const error = qbError;

//   return { balance, isLoading, error };
// }
// // (
// // <p
// //   bg={balanceValue === 0 ? "success" : bg}
// //   title={
// //     balanceValue === 0 ? "No outstanding balance 🎉" : "Outstanding Balance"
// //   }
// //   text={balanceValue === 0 ? "Demo account" : `$${balanceValue}`}
// // ></p>
// // );
// // }

// // export default Balance;
