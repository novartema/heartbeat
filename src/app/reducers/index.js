import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import user from '_reducers/user';
import heartbeat from '_reducers/heartbeat';

const rootReducer = combineReducers({
  routing,
  user,
  heartbeat,
});

export default rootReducer;
