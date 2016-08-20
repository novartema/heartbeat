import React from 'react';
import { Route, IndexRedirect } from 'react-router';

// Containers.
import Application from '_containers/Application/Application.jsx';
import Login from '_containers/Login/Login.jsx';
import Logout from '_containers/Logout/Logout.jsx';
import Heartbeats from '_containers/Heartbeats/Heartbeats.jsx';

// Components.
import NotFound from '_components/NotFound/NotFound.jsx';

const createRoutes = (store) => {
  const requireLogin = (nextState, replace, cb) => {
    const { user: { isAuthenticated } } = store.getState();
    if (!isAuthenticated) {
      // oops, not logged in, so can't be here!
      replace({
        pathname: '/user/login',
        state: { nextPathname: nextState.location.pathname },
      });
    }
    cb();
  };

  const redirectAuth = (nextState, replace, cb) => {
    const { user: { isAuthenticated } } = store.getState();
    if (isAuthenticated) {
      replace({
        pathname: '/heartbeat',
        state: { nextPathname: nextState.location.pathname },
      });
    }
    cb();
  };

  return (
    <Route path="/" component={Application}>
      { /* Index Route */ }
      <IndexRedirect to="heartbeat" />
      <Route path="user">
        <Route path="login" component={Login} onEnter={redirectAuth} />
        <Route path="logout" component={Logout} onEnter={requireLogin} />
      </Route>
      { /* Routes requiring login */ }
      <Route path="heartbeat" component={Heartbeats} onEnter={requireLogin} />
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};

export default createRoutes;
