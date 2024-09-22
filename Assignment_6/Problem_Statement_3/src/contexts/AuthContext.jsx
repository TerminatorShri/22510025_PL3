import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === "TerminatorShri" && password === "Shriyash") {
      setIsAuthenticated(true);
      setUser({ name: "Admin" });
      return true;
    } else {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, setIsAuthenticated, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
