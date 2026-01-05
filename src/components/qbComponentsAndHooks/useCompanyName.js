import { useMemo } from "react";
import { useGetCustomerObjectQuery } from "../../features/api/qbApi";
import { faker } from "@faker-js/faker";

export default function useCompanyName(userResponse) {
  const user = userResponse?.data || userResponse;
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
    const comp = user?.company;
    if (!comp) return null;

    return {
      name: comp?.name || null,
      email: comp?.email || null,
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
