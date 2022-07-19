import styles from './private-route.module.css';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/userContext';

/* eslint-disable-next-line */
export interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

export function PrivateRoute({
  component: Component,
  ...rest
}: PrivateRouteProps) {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/signIn" />
      }
    />
  );
}

export default PrivateRoute;
