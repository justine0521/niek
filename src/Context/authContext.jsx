// authContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize isLoggedIn from local storage
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    // Update local storage whenever isLoggedIn changes
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
