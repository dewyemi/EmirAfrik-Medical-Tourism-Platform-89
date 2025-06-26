import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null); // 'patient' or 'employee'
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('emirafrik_user');
    const storedUserType = localStorage.getItem('emirafrik_user_type');
    
    if (storedUser && storedUserType) {
      setUser(JSON.parse(storedUser));
      setUserType(storedUserType);
    }
    setIsLoading(false);
  }, []);

  const login = (userData, type) => {
    setUser(userData);
    setUserType(type);
    localStorage.setItem('emirafrik_user', JSON.stringify(userData));
    localStorage.setItem('emirafrik_user_type', type);
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
    localStorage.removeItem('emirafrik_user');
    localStorage.removeItem('emirafrik_user_type');
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('emirafrik_user', JSON.stringify(userData));
  };

  const value = {
    user,
    userType,
    isLoading,
    login,
    logout,
    updateUser,
    isPatient: userType === 'patient',
    isEmployee: userType === 'employee'
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};