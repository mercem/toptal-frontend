import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Login from '../containers/login/Login';
import Home from '../containers/home/Home';
import Profile from '../containers/profile/Profile';
import history from './history';
import AuthPage from './AuthPage';

const RouterWrapper = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/profile/:id">
          <AuthPage>
            <Profile />
          </AuthPage>
        </Route>
        <Route path="/">
          <AuthPage>
            <Home />
          </AuthPage>
        </Route>
      </Switch>
    </Router>
  );
};

export default RouterWrapper;
