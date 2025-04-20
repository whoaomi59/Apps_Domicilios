import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    return (window.location.href = "/");
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
