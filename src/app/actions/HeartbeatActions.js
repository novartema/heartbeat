import axios from 'axios';

// Constants.
import * as HeartbeatConstants from '_constants/HeartbeatConstants';

function requestHeartbeat() {
  return {
    type: HeartbeatConstants.HEARTBEAT_REQUEST,
  };
}

function receiveHeartbeat(heartbeat) {
  return {
    type: HeartbeatConstants.HEARTBEAT_SUCCESS,
    heartbeat,
  };
}

function changeSortHeartbeat() {
  return {
    type: HeartbeatConstants.HEARTBEAT_CHANGE_SORT,
  };
}

export function loadHeartbeat() {
  return (dispatch, getState) => {
    // Current sort state.
    const { heartbeat: { sort } } = getState();
    dispatch(requestHeartbeat());
    axios({
      method: 'GET',
      url: '/api2/data/rr/',
      params: {
        sort_by: sort,
      },
    })
    .then((response) => {
      if (response.data.success === true) {
        const heartbeat = response.data.result;
        dispatch(receiveHeartbeat(heartbeat));
      }
    });
  };
}

export function sortHeartbeat() {
  return (dispatch) => {
    dispatch(changeSortHeartbeat());
    dispatch(loadHeartbeat());
  };
}
