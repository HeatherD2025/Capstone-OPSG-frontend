import { createContext } from "react";
import React from "react";

export const userContext = createContext()

const ContextProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = React.useState(true);
  const [authenticated, setAuthenticated] = React.useState(true);
  

  const handleLogout = () => {
    setIsAdmin(false);
    setAuthenticated(false);
  };

  return (
    <userContext.Provider value = {{isAdmin, authenticated, handleLogout}}>
      {children}
    </userContext.Provider>
  )
}

export default ContextProvider