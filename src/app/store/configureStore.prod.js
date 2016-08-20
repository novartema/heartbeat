import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';

// Reducers.
import rootReducer from '_reducers';

export default function configureStore(initialState, history) {
  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(thunkMiddleware, routerMiddleware(history)),
  ));

  return store;
}
