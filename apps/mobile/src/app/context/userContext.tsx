import { WithId } from '@univ-project/client-sdk';
import { Student } from '@univ-project/typedefs';
import React, { useEffect, useState } from 'react';

export const UserContext = React.createContext<{
  token?: string | null;
  setToken?: (token: string) => void;
  user?: WithId<Student> | null;
  setUser?: (user: WithId<Student> | null) => void;
  isLoggedIn?: boolean;
}>({});

export const UserProvider: React.FC = ({ children }) => {
  const [token, setUserToken] = useState(() => {
    return localStorage.getItem('Token');
  });

  const [user, setUserObject] = useState<WithId<Student> | null>(() => {
    const userStringified = localStorage.getItem('user');
    if (userStringified) {
      try {
        return JSON.parse(userStringified);
      } catch (e) {
        return null;
      }
    }

    return null;
  });

  const isLoggedIn = !!user;

  const setUser = (user: WithId<Student> | null) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUserObject(user);
  };

  const setToken = (token: string) => {
    localStorage.setItem('Token', token);
    setUserToken(token);
  };

  return (
    <UserContext.Provider
      value={{ token, setToken, user, setUser, isLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
};
