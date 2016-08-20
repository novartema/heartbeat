// Constant
import * as HeartbeatConstants from '_constants/HeartbeatConstants';

const initialState = {
  isLoading: false,
  heartbeat: null,
  sort: HeartbeatConstants.ASC,
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case HeartbeatConstants.HEARTBEAT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case HeartbeatConstants.HEARTBEAT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        heartbeat: action.heartbeat,
      };
    case HeartbeatConstants.HEARTBEAT_CHANGE_SORT:
      return {
        ...state,
        sort: state.sort === HeartbeatConstants.ASC ? HeartbeatConstants.DESC : HeartbeatConstants.ASC,
      };
    default:
      return state;
  }
}
