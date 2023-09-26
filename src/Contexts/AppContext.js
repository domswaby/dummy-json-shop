import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [newUserCount, setNewUserCount] = useState(0);
  const [newUsers, setNewUsers] = useState([]);

  const value = {
    userInfo,
    setUserInfo,
    newUsers,
    setNewUsers,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
