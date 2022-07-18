import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import styles from './public-route.module.css';

/* eslint-disable-next-line */
export interface PublicRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

export function PublicRoute({
  component: Component,
  ...rest
}: PublicRouteProps) {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Redirect to="/tab1" /> : <Component {...props} />
      }
    />
  );
}

export default PublicRoute;
