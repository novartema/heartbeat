import axios from 'axios';
import { routerActions } from 'react-router-redux';
import cookie from 'react-cookie';

// Constants.
import * as UserConstants from '_constants/UserConstants';

function requestLogin() {
  return {
    type: UserConstants.LOGIN_REQUEST,
  };
}

function receiveLogin() {
  return {
    type: UserConstants.LOGIN_SUCCESS,
  };
}

function receiveLoginError(message) {
  return {
    type: UserConstants.LOGIN_FAILURE,
    message,
  };
}

export function loginUser(creds) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      dispatch(requestLogin());
      // Get csrftoken.
      await axios({
        method: 'GET',
        url: '/api2/api/version/',
        withCredentials: true,
      });
      // User creds.
      const email = creds.email;
      const password = creds.password;
      axios({
        method: 'POST',
        url: '/api2/auth/',
        data: {
          email,
          password,
        },
      })
      .then((response) => {
        if (response.data.success === true) {
          dispatch(receiveLogin());
          dispatch(routerActions.push('/heartbeat'));
        }
      })
      .catch((error) => {
        if (error.response) {
          cookie.remove('csrftoken', { path: '/' });
          dispatch(receiveLoginError(error.response.data.error));
        }
      });
    });
  };
}

function requestLogout() {
  return {
    type: UserConstants.LOGOUT_REQUEST,
  };
}

function receiveLogout() {
  return {
    type: UserConstants.LOGOUT_SUCCESS,
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    // Logout current user.
    axios({
      method: 'GET',
      url: '/api2/rebuilder/api/api-auth/logout/',
    })
    .then(() => {
      cookie.remove('csrftoken', { path: '/' });
      dispatch(receiveLogout());
      dispatch(routerActions.push('/user/login'));
    });
  };
}

function requestLoadUserProfile() {
  return {
    type: UserConstants.LOAD_PROFILE_REQUEST,
  };
}

function receiveLoadUserProfile(profile) {
  return {
    type: UserConstants.LOAD_PROFILE_SUCCESS,
    profile,
  };
}

export function loadUserProfile() {
  return dispatch => {
    dispatch(requestLoadUserProfile());
    axios({
      method: 'GET',
      url: '/api2/profile/',
    })
    .then((response) => {
      const profile = response.data;
      dispatch(receiveLoadUserProfile(profile));
    });
  };
}
