import { useMemo } from "react";
import { useGetCustomerObjectQuery } from "../../features/api/qbApi";
import { useSelector } from "react-redux";
import { faker } from "@faker-js/faker";

export default function useCompanyName() {
  const user = useSelector((state) => state.auth.user);

  console.log("HOOK DATA CHECK - User Object:", user);
  console.log("HOOK DATA CHECK - Company Object:", user?.company);

  const qbId = user?.qbId;

  const {
    data: qbData,
    isLoading: qbLoading,
    error: qbError,
  } = useGetCustomerObjectQuery(qbId, {
    skip: !qbId,
  });

  // normalizer functions for qb and user data
  function normalizeQB(data) {
    const customerArray = data?.QueryResponse?.Customer;
    if (!customerArray?.length) return null;

    const c = customerArray[0];
    return {
      name: c?.FullyQualifiedName || null,
      email: c?.PrimaryEmailAddr?.Address || null,
      source: "quickbooks",
    };
  }

  const normalizeUserCompany = (user) => {
    // If the user hasn't loaded into Redux yet, return null
    if (!user || !user.company)  {
      console.log("Normalizer: No user found");
      return null;
    }

    if (!user.company) {
      console.log("Normalizer: User found, but no company object attached", user);
        return null;
    }
    return {
      name: user.company.name,
      streetAddress: user.company.streetAddress,
      city: user.company.city,
      state: user.company.state,
      zip: user.company.zip,
      source: "seeded db",
    };
  };

  // stable faker fallback if no qb or db data
  // const fakeCompany = useMemo(() => {
  //   const rawName = faker.company.name();
  //   return {
  //     name: rawName
  //       .split(" ")
  //       .map(
  //         (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  //       )
  //       .join(" "),
  //     email: faker.internet.email(undefined, undefined, "example.com"),
  //     source: "faker-demo",
  //   };
  // }, []);



    const fakeCompany = useMemo(() => {
      return {
        name: "DEBUGGING_IS_ACTIVE", // Change this temporarily
        source: "faker-demo",
      };
    }, []);


  // choose final company source
  const company = useMemo(() => {
    const qb = normalizeQB(qbData);
    if (qb) return qb;

    const db = normalizeUserCompany(user);
    if (db) return db;

    if (!user) return null;

    return fakeCompany;
  }, [qbData, user, fakeCompany]);

  return {
    company,
    isLoading: qbLoading,
    error: qbError,
  };
}
