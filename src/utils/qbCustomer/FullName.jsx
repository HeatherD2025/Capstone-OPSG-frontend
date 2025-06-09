import { useGetCustomerObjectQuery } from "../../Slices/qbSlice";
import InfoCard from "../InfoCard";

function BusinessName({ id, bg }) {
  const {
    data: arrCustomer,
    status,
    isLoading,
  } = useGetCustomerObjectQuery(id);

  return (
    <>
      {arrCustomer === null && status === "fulfilled" ? (
        <InfoCard bg={bg} title="Not yet billed in quickbooks" />
      ) : !isLoading ? (
        <InfoCard
          bg={bg}
          title={arrCustomer[0]?.FullyQualifiedName}
          subtitle={`Billed to ${arrCustomer[0]?.PrimaryEmailAddr.Address}`}
        />
      ) : (
        <InfoCard bg={bg} title="Loading..." />
      )}
    </>
  );
}

export default BusinessName;
