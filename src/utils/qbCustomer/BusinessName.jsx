import { useGetCustomerObjectQuery } from "../../features/api/qbApi.js";
import { useGetCurrentUserQuery } from "../../features/api/userApi.js";
import InfoCard from "../InfoCard.jsx";

function BusinessName({ id, bg }) {
  // const demoCompany = faker.company.name().toUpperCase();
  // const demoEmail = faker.internet.email();

  // if (!id) {
  //   return (
  //     <InfoCard
  //       bg={bg}
  //       title="No user found"
  //     />
  //   );
  // }

  const { 
    data: qbData, 
    isLoading: qbLoading, 
    error: qbError 
  } = useGetCustomerObjectQuery(id, {skip: !id,});

  const { 
    data: userData, 
    isLoading: userLoading, 
    error: userError 
  } = useGetCurrentUserQuery(id, {skip: !id,});


  //normalizer function
  function normalizeQB(data) {
    const customerArray = data?.QueryResponse?.Customer || [];
    if (!customerArray.length) return null;

    const c = customerArray[0];
    return {
      name: c?.FullyQualifiedName || null,
      email: c?.PrimaryEmailAddr?.Address || null,
      source: "quickbooks"
    };
  }

  function normalizeUserCompany(user) {
    const comp = user?.company || user?.companyData || null;
    if (!comp) return null;

    return {
      name: comp?.name || comp?.companyName || null,
      email: comp?.email || comp?.email || null,
      souce: "seeded db"
    };
  }

  const qbCompany = normalizeQB(qbData);
  const localCompany = normalizeUserCompany(userData);

  if (qbLoading || userLoading)
    return <InfoCard bg={bg} title="Loading..." />;

  if (qbError || userError)
    return <InfoCard bg="danger" title="Failed to fetch company" />;

  const company = qbCompany || localCompany;

  if (!company) {
    return <InfoCard bg={bg} title="No company found"
    />
  }

  // if (customerArray.length === 0) return;
  // <InfoCard
  //   bg={bg}
  //   title={`${demoCompany}`}
  // subtitle={`Billed to ${demoEmail}`}
  // />;

  return (
    <>
      <InfoCard
        bg={bg}
        title={company.name}
        subtitle={`Billed to ${company.email || "No email available"}`}
      />
      {/* {status === "fulfilled" && customerArray.length === 0 ? (
        <InfoCard bg={bg} title="Not yet billed in quickbooks" />
      ) : !isLoading && customerArray.length > 0 ? (
        <InfoCard
          bg={bg}
          title={customerArray[0]?.FullyQualifiedName}
          subtitle={`Billed to ${customerArray[0]?.PrimaryEmailAddr.Address}`}
        />
      ) : (
        <InfoCard bg={bg} title="Loading..." />
      )} */}
    </>
  );
}

export default BusinessName;
