"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    role: "B2C",
    isLoggedIn: false,
  });

  const switchRole = (newRole) => {
    setUser((prev) => ({ ...prev, role: newRole }));
    localStorage.setItem("user-role", newRole);
  };

  useEffect(() => {
    const savedRole = localStorage.getItem("user-role");
    if (savedRole) {
      setUser((prev) => ({ ...prev, role: savedRole }));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);