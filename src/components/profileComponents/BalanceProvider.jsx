import {createContext, useContext, useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { faker } from "@faker-js/faker";
import { useGetCustomerObjectQuery } from "../../features/api/qbApi.js";

const BalanceContext = createContext();

export function BalanceProvider({ id, children }) {
    const authUser = useSelector((state) => state.auth.user);
    const userId = id || authUser?.id; // fallback to Redux user ID

    const [balance, setBalance] = useState(null)

    const [fakeBalance] = useState(() => {
      if (!userId) return 0;

        const cacheKey = `opsgs_fake_balance_${userId}`;
        const savedBalance = localStorage.getItem(cacheKey);

        if (savedBalance) {
            return Number(savedBalance)
        }

      const generated = Number(faker.finance.amount({ min: 150, max: 5450, dec: 2 }));
        localStorage.setItem(cacheKey.generated.toString());
        return generated;
    });

      const { data, isLoading, error } = useGetCustomerObjectQuery(id, {
        skip: !id,
    });

    useEffect(() => {
        if (data?.QueryResponse?.Customer?.[0]) {
            setBalance(data.QueryResponse.Customer[0].Balance || 0);
        } else {
            setBalance(null) // fake fallback if null
        }
    }, [data]);

    return (
        <BalanceContext.Provider
          value={{ balance: finalBalance, loading: isLoading, error }}
        >
            {children}
        </BalanceContext.Provider>
    );
}

export const useBalance = () => useContext(BalanceContext);