import React, { createContext, useState, useContext } from 'react';
import { login as apiLogin, register as apiRegister } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('neurowrite_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = async (credentials) => {
    const res = await apiLogin(credentials);

    if (res.success && res.user) {
      setUser(res.user);
      localStorage.setItem('neurowrite_user', JSON.stringify(res.user));
    }

    return res;
  };

  const register = async (userData) => {
    const res = await apiRegister(userData);

    if (res.success && res.user) {
      setUser(res.user);
      localStorage.setItem('neurowrite_user', JSON.stringify(res.user));
    }

    return res;
  };

  const logout = () => {
    localStorage.removeItem('neurowrite_user');
    localStorage.removeItem('neurowrite_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);