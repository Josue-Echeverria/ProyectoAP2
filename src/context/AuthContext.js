import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const login = (data) => {
    setUserData(data);
  };

  return (
    <AuthContext.Provider value={{ userData, login}}>
      {children}
    </AuthContext.Provider>
  );
};
