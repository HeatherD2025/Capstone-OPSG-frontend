import React, { useState, useEffect } from "react";
import { useBalance } from "../profileComponents/BalanceProvider.jsx";
import { useGetCustomerObjectQuery } from "../../features/api/qbApi.js";

export default function Balance({ text }) {
  const { balance, loading, error } = useBalance();

  // Determine display values
  let displayText = loading
  ? "Loading..."
  : error? "Demo Balance"
  :`$${Number(balance).toFixed(2)}`;

  return (
    <>
      <h4>Current Balance</h4>
      <p>{displayText}</p>
      {text}
    </>
  );
}

