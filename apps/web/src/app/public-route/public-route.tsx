import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import styles from './public-route.module.css';

/* eslint-disable-next-line */
export interface PublicRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

export function PublicRoute({
  component: Component,
  ...rest
}: PublicRouteProps) {
  const { role, isLoggedIn } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn && role === 'student' ? (
          <Redirect to="/studentView" />
        ) : isLoggedIn && role === 'staff' ? (
          <Redirect to="staffView" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default PublicRoute;
