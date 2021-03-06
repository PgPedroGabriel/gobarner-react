import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';

// import { Container } from './styles';

import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';
import RecoveryPassword from '../pages/RecoveryPassword';
import ResetPassword from '../pages/ResetPassword';

import Route from './Route';

import Dashboard from '../pages/Dashboard';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/recovery-password" component={RecoveryPassword} />
        <Route path="/reset-password/:token" exact component={ResetPassword} />
        <Route path="/" exact component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
