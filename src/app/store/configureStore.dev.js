import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

// Reducers.
import rootReducer from '_reducers';

// Devtools.
import DevTools from '_store/DevTools';

export default function configureStore(initialState, history) {
  const logger = createLogger();
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunkMiddleware, routerMiddleware(history), logger),
    DevTools.instrument()
  ));

  return store;
}
