import { useMemo } from "react";
import { useGetCustomerObjectQuery } from "../../features/api/qbApi";
import { useSelector } from "react-redux";
import { faker } from "@faker-js/faker";

export default function useCompanyName() {
  const user = useSelector((state) => state.auth.user);
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
    if (!user || !user.company) return null;

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
  const fakeCompany = useMemo(() => {
    const rawName = faker.company.name();
    return {
      name: rawName
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" "),
      email: faker.internet.email(undefined, undefined, "example.com"),
      source: "faker-demo",
    };
  }, []);

  // choose final company source
  const company = useMemo(() => {
    return normalizeQB(qbData) || normalizeUserCompany(user) || fakeCompany;
  }, [qbData, user, fakeCompany]);

  return {
    company,
    isLoading: qbLoading,
    error: qbError,
  };
}
