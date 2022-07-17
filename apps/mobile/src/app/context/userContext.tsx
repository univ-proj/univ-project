import React, { useEffect, useState } from 'react';

export const UserContext = React.createContext<{
  token?: string | null;
  setToken?: React.Dispatch<React.SetStateAction<string | null>>;
  isLoggedIn?: boolean;
}>({});

export const UserProvider: React.FC = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem('Token');
  });

  const isLoggedIn = !!token;

  return (
    <UserContext.Provider value={{ token, setToken, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
