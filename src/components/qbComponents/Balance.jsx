import { useGetCustomerObjectQuery } from "../../features/api/qbApi.js";
import { faker } from "@faker-js/faker";

function Balance({ id, bg }) {
  const fakeBalance = faker.finance.amount({
    min: 150,
    max: 5450,
    dec: 2,
    symbol: "$",
  });

  const { data, error, isLoading } = useGetCustomerObjectQuery(id, {
    skip: !id,
  });

  if (!data) {
    return <p>Current balance due: {fakeBalance}</p>;
  }

  if (isLoading) return <p>Loading..." </p>;

  if (error || data?.error) {
    return <p>Failed to fetch balance, Quickbooks data unavailable</p>;
  }

  const customer = data?.QueryResponse?.Customer?.[0];
  const balanceValue = customer?.Balance || 0;

  return (
    <p
      bg={balanceValue === 0 ? "success" : bg}
      title={
        balanceValue === 0 ? "No outstanding balance 🎉" : "Outstanding Balance"
      }
      text={balanceValue === 0 ? "Demo account" : `$${balanceValue}`}
    ></p>
  );
}

export default Balance;
