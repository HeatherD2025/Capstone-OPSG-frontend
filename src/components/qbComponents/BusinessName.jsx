import { useGetCustomerObjectQuery } from "../../features/api/qbApi.js";
import { useGetCurrentUserQuery } from "../../features/api/userApi.js";
import InfoCard from "../servicesCards/InfoCard.jsx";
import fakeCompany from "./fakeCompany.jsx";

function BusinessName({ id, bg }) {
  // fetching logged in user
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetCurrentUserQuery();

  // const qbId = user?.company?.quickbooksId;

  // fetching qb if user has qbId
  const {
    data: qbData,
    isLoading: qbLoading,
    error: qbError,
  } = useGetCustomerObjectQuery(id, { skip: !id });

  //normalizer functions for qb and user data
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

  function normalizeUserCompany(user) {
    const comp = user?.company || user?.companyData || null;
    if (!comp) return null;

    return {
      name: comp?.name || comp?.companyName || null,
      email: comp?.email || null,
      souce: "seeded db",
    };
  }

  // priority order of company source
  const company =
    normalizeQB(qbData) || normalizeUserCompany(userData) || fakeCompany;

  if (qbLoading || userLoading) return <InfoCard bg={bg} title="Loading..." />;
  if (qbError || userError)
    return <InfoCard bg="danger" title="Failed to fetch company" />;

  return <p>{company.name}</p>;
}

export default BusinessName;
