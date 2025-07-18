import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  role: 'CUSTOMER' | 'SALES' | 'ADMIN' | null;
  login: (data: { token: string; role: 'CUSTOMER' | 'SALES' | 'ADMIN' }) => void;
  logout: () => void;
  user: any;
  setUser: (user: {}) => void;
}

const AuthContext = createContext<AuthContextType>({ token: null, setToken: () => {}, role: null, login: () => {}, logout: () => {}, user: {}, setUser: () => {} });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [role, setRole] = useState<'CUSTOMER' | 'SALES' | 'ADMIN' | null>(null);
  const [user, setUser] = useState<{}>(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {});
  const login = (data: { token: string; role: 'CUSTOMER' | 'SALES' | 'ADMIN' }) => {
    setToken(data.token);
    setRole(data.role);
  };

  const handleSetToken = (token: string | null) => {
    token ? localStorage.setItem('token', token) : localStorage.removeItem('token');
    setToken(token);
  };

  const handleSetUser = (user: any) => {
    user ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user');
    setUser(user);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    setUser({});

    localStorage.removeItem('token');
    localStorage.removeItem('user');

    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ token, setToken: handleSetToken, role, login, logout, user, setUser: handleSetUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
