import { createContext, useContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { faker } from "@faker-js/faker";
import { useGetCustomerObjectQuery } from "../../features/api/qbApi.js";

const BalanceContext = createContext();

export function BalanceProvider({ id, children }) {
  const authUser = useSelector((state) => state.auth.user);
  // Use the passed ID (from Admin view) or fall back to the logged-in user's ID
  const userId = id || authUser?.id;

  const [balance, setBalance] = useState(null);

  // Memoized fake balance logic to keep data "sticky" across refreshes
  const [fakeBalance] = useState(() => {
    try {
      if (!userId) return 0;

      const cacheKey = `opsg_fake_balance_${userId}`;
      const saved = localStorage.getItem(cacheKey);

      if (saved) {
        return Number(saved);
      }

      // Generate once and save to localStorage
      const generated = Number(faker.finance.amount({ min: 150, max: 5450, dec: 2 }));
      localStorage.setItem(cacheKey, generated.toString());
      return generated;
    } catch (e) {
      console.error("Balance calculation failed", e);
      return 1250; // Safety fallback
    }
  });

  // Fetch real data from QuickBooks API if an ID exists
  const { data, isLoading, error } = useGetCustomerObjectQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    // If real data exists in the QB response, use it
    if (data?.QueryResponse?.Customer?.[0]) {
      setBalance(data.QueryResponse.Customer[0].Balance);
    } else if (!isLoading) {
      // If not loading and no data found, set balance to null
      // This triggers the fallback to fakeBalance
      setBalance(null);
    }
  }, [data, isLoading]);

  // Determine the final value: Real data > Fake data
  const finalBalance = (balance !== null && balance !== undefined) ? balance : fakeBalance;

  return (
    <BalanceContext.Provider
      value={{ 
        balance: finalBalance, 
        loading: isLoading, 
        error 
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}

export const useBalance = () => useContext(BalanceContext);