import { useGetCustomerObjectQuery } from "../../features/api/qbApi.js";
import InfoCard from "../InfoCard.jsx";

function BusinessName({ id, bg }) {
  if (!id) {
    return (
      <InfoCard
        bg={bg}
        title="No user found"
      />
    );
  }

  const { data, isLoading, error } = useGetCustomerObjectQuery(id, {
    skip: !id,
  });

  const customerArray = data?.QueryResponse?.Customer || [];

  if (isLoading) return <InfoCard bg={bg} title="Loading..." />;
  if (error) return <InfoCard bg="danger" title="Failed to fetch company" />;

  if (customerArray.length === 0)
    return <InfoCard bg={bg} title="Not yet billed in QuickBooks" />;

  return (
    <>
      <InfoCard
        bg={bg}
        title={customerArray[0]?.FullyQualifiedName}
        subtitle={`Billed to ${
          customerArray[0]?.PrimaryEmailAddr?.Address || "Unknown"
        }`}
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
