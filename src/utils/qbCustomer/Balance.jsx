import { useGetCustomerObjectQuery } from "../../features/api/qbApi.js";
import InfoCard from "../InfoCard";
import { faker } from "@faker-js/faker";

function Balance({ id, bg }) {
  const demoInvoice = faker.finance.amount({
    min: 150,
    max: 5450,
    dec: 5,
    symbol: "$",
  });

  const { data, error, isLoading } = useGetCustomerObjectQuery(id, {
    skip: !id,
  });

  if (!id) {
    return <InfoCard bg={bg} title={`${demoInvoice}`} />;
  }

  if (isLoading) return <InfoCard bg={bg} title="Loading..." />;

  if (error || data?.error) {
    return (
      <InfoCard
        bg="danger"
        title="Failed to fetch balance"
        text="Quickbooks data unavailable"
      />
    );
  }

  // if (!arrCustomer || arrCustomer.length === 0) {
  //   return <InfoCard bg="success" title="No outstanding balance 🎉" />
  // }

  // attempt to retrieve "balance" from qb's report format
  //   const balanceValue =
  //     arrCustomer[0]?.ColData?.find((c) => c.id === "balance" || c.value)?.value ||
  //     arrCustomer[0]?.Balance ||
  //     0;

  const customer = data?.QueryResponse?.Customer?.[0];
  const balanceValue = customer?.Balance || 0;

  return (
    <InfoCard
      bg={balanceValue === 0 ? "success" : bg}
      title={
        balanceValue === 0 ? "No outstanding balance 🎉" : "Outstanding Balance"
      }
      text={balanceValue === 0 ? "Demo account" : `$${balanceValue}`}
    />
  );
}

export default Balance;
