import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  
  const { user, setUser } = context;
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const isAdmin = user?.user?.role === "admin"; 

  return { user, login, logout, isAdmin };
};
