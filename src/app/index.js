import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

// Store.
import configureStore from '_store/configureStore';

// Routes.
import createRoutes from '_routes/Routes';

const initialState = window.__initialState__ || undefined;
const store = configureStore(initialState, browserHistory);

const history = syncHistoryWithStore(browserHistory, store);

const routes = createRoutes(store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
