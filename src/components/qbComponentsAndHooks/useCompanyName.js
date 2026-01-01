import { useState, useEffect } from "react";
import { useGetCustomerObjectQuery } from "../../features/api/qbApi";
import { faker } from "@faker-js/faker";

export default function useCompanyName(userResponse) {
  const user = userResponse?.data || userResponse;
  const qbId = user?.qbId || null;

  const rawName = faker.company.name();
  const fakeCompany = {
    name: rawName
      .split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" "),
    email: faker.internet.email(undefined, undefined, "example.com"),
    source: "faker-demo",
  };

  const [ company, setCompany ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(!!qbId);
  const [ error, setError] = useState(null);

  const { data: qbData, isLoading: qbLoading, error: qbError } = 
    useGetCustomerObjectQuery(qbId, {skip: !qbId});
    
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

  useEffect(() => {
    setIsLoading(qbLoading);

  const qbCompany = normalizeQB(qbData);
  const dbCompany =  normalizeUserCompany(user);
  
  if (qbCompany) {
    setCompany(qbCompany);
    setError(null);
  } else if (dbCompany) {
    setCompany(dbCompany);
    setError(null);
  } else {
    setCompany(fakeCompany);
    setError(qbError || null);
  }

  setIsLoading(false);
}, [qbData, qbLoading, qbError, user]);

  return {
    company,
    isLoading,
    error
  };
}