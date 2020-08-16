import React from 'react';
import {
  Route as RouterDOM,
  RouteProps as RouterDOMProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/AuthContext';

// import { Container } from './styles';

interface RouteProps extends RouterDOMProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  console.log(user);

  return (
    <RouterDOM
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/login' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
