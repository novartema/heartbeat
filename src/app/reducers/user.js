import cookie from 'react-cookie';

// Constants.
import * as UserConstants from '_constants/UserConstants';

const initialState = {
  isLoading: false,
  isAuthenticated: !!cookie.load('csrftoken'),
  profile: null,
  errorMessage: '',
};

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case UserConstants.LOAD_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case UserConstants.LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        profile: action.profile,
      };
    case UserConstants.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        errorMessage: '',
      };
    case UserConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        errorMessage: '',
      };
    case UserConstants.LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        errorMessage: action.message,
      };
    case UserConstants.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: true,
      };
    case UserConstants.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        profile: null,
      };
    default:
      return state;
  }
}
