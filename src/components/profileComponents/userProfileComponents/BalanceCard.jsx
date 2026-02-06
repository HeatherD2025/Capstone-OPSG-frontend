import React from "react";
import { useBalance } from "../BalanceProvider";

export default function BalanceCard() {
  // store balance for later use
  const { balance, loading, error } = useBalance();

  // Determine display values
  let title = "Current Balance";
  let displayText = `$${balance.toFixed(2)}`;


  if (loading) displayText = "Loading...";
  if (error ) title = "Demo Balance";
  if (balance === 0) title = "No outstanding balance 🎉";

  return (
    <>
      <h4>{title}</h4>
      <p>{displayText}</p>
    </>
  );
}

