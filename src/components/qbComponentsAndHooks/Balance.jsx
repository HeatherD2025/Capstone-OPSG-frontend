import { useBalance } from "../profileComponents/BalanceProvider.jsx";

export default function Balance({ text }) {
  const { balance, loading, error } = useBalance();

  // Determine display values
  let displayText = loading
  ? "Loading..."
  :`$${Number(balance).toFixed(2)}`;

  return (
    <>
      <h4>Current Balance</h4>
      <p>{displayText}</p>
      {text}
    </>
  );
}

