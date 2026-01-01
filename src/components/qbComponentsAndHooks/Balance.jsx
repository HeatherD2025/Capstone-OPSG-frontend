import React, { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import { useGetCustomerObjectQuery } from "../../features/api/qbApi.js";

function Balance({ id, bg }) {
  // store balance for later use
  const [balance, setBalance] = useState(null);

  // Fake balance for backup/demo accounts
  const fakeBalance = faker.finance.amount({
    min: 150,
    max: 5450,
    dec: 2,
    symbol: "$",
  });

  const { data, error, isLoading } = useGetCustomerObjectQuery(id, {
    skip: !id,
  });

  // Update state when qb data changes
  useEffect(() => {
    if (data?.QueryResponse?.Customer?.[0]) {
      setBalance(data.QueryResponse.Customer[0].Balance || 0);
    } else if (!data || data?.error) {
      setBalance(null);
    }
  }, [data]);

  // Determine display values
  let displayText =
    balance !== null ? `$${balance.toFixed(2)}` : `${fakeBalance}`;
  let displayBg = bg || "#79cbbb";
  let title = "Current Balance";

  if (isLoading) {
    displayText = "Loading...";
    displayBg = "#f0ad4e";
  } else if (error || data?.error) {
    displayText = "QuickBooks data unavailable";
    displayBg = "#d9534f";
  } else if (balance !== null) {
    displayBg = balance === 0 ? "#5cb85c" : bg || "#79cbbb";
    title = balance === 0 ? "No outstanding balance 🎉" : "Outstanding Balance";
  }

  return (
    <>
      <h4>{title}</h4>
      <p>{displayText}</p>
    </>
  );
}

export default Balance;
