import React, { createContext, useState, useContext } from 'react';
import { login as apiLogin, register as apiRegister, mockUser } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('proto_user');
      return saved ? JSON.parse(saved) : mockUser;
    } catch {
      return mockUser;
    }
  });

  const login = async (credentials) => {
    const res = await apiLogin(credentials);
    if (res.success && res.user) {
      setUser(res.user);
    }
    return res;
  };

  const register = async (userData) => {
    const res = await apiRegister(userData);
    if (res.success && res.user) {
      setUser(res.user);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('proto_user');
    localStorage.removeItem('proto_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
