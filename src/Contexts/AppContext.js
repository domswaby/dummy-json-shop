import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({ username: "Dominic123" });

  const value = {
    userInfo,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
