import { createContext, useEffect } from "react";
import React from "react";
import useIdleTimer from "../qbComponentsAndHooks/useIdleTimer";

export const userContext = createContext();

const ContextProvider = ({ children }) => {

  const [isAdmin, setIsAdmin] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState(false);

  const handleLogout = React.useCallback(() => {
    setIsAdmin(false);
    setAuthenticated(false);
    localStorage.removeItem("accessToken");
  }, []);

  useIdleTimer({
    enabled: authenticated,
    timeout: 10 * 60 * 1000,
    onIdle: handleLogout
  });

  useEffect(() => {
    console.log("Auth state changed:", { authenticated, isAdmin });
  }, [authenticated, isAdmin]);

  return (
    <userContext.Provider
      value={{
        isAdmin,
        authenticated,
        setIsAdmin,
        setAuthenticated,
        handleLogout,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default ContextProvider;
