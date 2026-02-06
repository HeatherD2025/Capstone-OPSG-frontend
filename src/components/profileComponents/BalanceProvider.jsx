import React, {createContext, useContext, useState, useEffect} from "react";
import { faker } from "@faker-js/faker";
import { useGetCustomerObjectQuery } from "../../features/api/qbApi.js";

const BalanceContext = createContext();

export function BalanceProvider({ id, children }) {
    const [balance, setBalance] = useState(null)

    const [fakeBalance] = useState(() => 
      Number(faker.finance.amount({ min: 150, max: 5450, dec: 2 }))
    );

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

    const finalBalance = balance !== null ? balance : fakeBalance;

    return (
        <BalanceContext.Provider
          value={{ balance: finalBalance, loading: isLoading, error }}
        >
            {children}

        </BalanceContext.Provider>
    );
}

export const useBalance = () => useContext(BalanceContext);