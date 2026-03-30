import { useBalance } from "../BalanceProvider";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../../../features/api/userApi";

export default function BalanceCard() {
  // store balance for later use
  const { balance, loading, error } = useBalance();
  const navigate = useNavigate();
  const { data: user, isLoading, isError } = useGetCurrentUserQuery();

  // Determine display values
  let title = "Current Balance";
  // checks for balance value, converts to currency format, --- for null/unavailable balance
  let displayText = balance !== null ? `$${balance.toFixed(2)}` : "---";

  if (loading) displayText = "Loading...";
  if (error) title = "Demo Balance";
  if (balance === 0) title = "No outstanding balance 🎉";

  return (
    <>
      <button
        rel="noopener noreferrer"
        style={{
          opacity: 0,
          height: "10vw",
          width: "100%",
          zIndex: "100",
          marginTop: "-1rem",
          marginBottom: "-6rem"
        }}
        onClick={() => navigate(`/profile/invoices/${user.id}`)}
      />
      <h3>{title}</h3>
      <p>{displayText}</p>
    </>
  );
}
