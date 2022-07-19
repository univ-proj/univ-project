import { WithId } from '@univ-project/client-sdk';
import { Staff, Student } from '@univ-project/typedefs';
import React, { useEffect, useState } from 'react';

export const UserContext = React.createContext<{
  token?: string | null;
  setToken?: (token: string) => void;
  user?: WithId<Student> | WithId<Staff> | null;
  setUser?: (user: WithId<Student> | WithId<Staff> | null) => void;
  isLoggedIn?: boolean;
  role?: 'student' | 'staff';
  setRole?: React.Dispatch<
    React.SetStateAction<'student' | 'staff' | undefined>
  >;
}>({});

export const UserProvider: React.FC = ({ children }) => {
  const [role, setRole] = useState<'student' | 'staff'>();
  const [token, setUserToken] = useState(() => {
    return localStorage.getItem('Token');
  });

  const [user, setUserObject] = useState<
    WithId<Student> | WithId<Staff> | null
  >(() => {
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

  const setUser = (user: WithId<Student> | WithId<Staff> | null) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUserObject(user);
  };

  const setToken = (token: string) => {
    localStorage.setItem('Token', token);
    setUserToken(token);
  };

  return (
    <UserContext.Provider
      value={{ token, setToken, user, setUser, isLoggedIn, role, setRole }}
    >
      {children}
    </UserContext.Provider>
  );
};
