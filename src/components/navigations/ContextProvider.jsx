import { createContext, useState, useEffect } from "react";
import React from "react";

export const userContext = createContext();

const ContextProvider = ({ children }) => {
  // const [isAdmin, setIsAdmin] = useState(false);
  // const [authenticated, setAuthenticated] = useState(true);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState(false);

  const handleLogout = () => {
    setIsAdmin(false);
    setAuthenticated(false);
    localStorage.removeItem("accessToken");
  };

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
