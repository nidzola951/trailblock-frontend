import { AUTH_SET_STATE } from './constants';
import * as states from './states';

const initialState = {
  info: {},
  error: {},
  isSignedIn: states.AUTH_UNKNOWN,
  isConfirmed: states.AUTH_UNKNOWN,
  hasSignedUp: states.AUTH_UNKNOWN,
  hasSentCode: states.AUTH_UNKNOWN,
  hasChangedPassword: states.AUTH_UNKNOWN,
  passwordResetRequired: states.AUTH_UNKNOWN
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SET_STATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

export default authReducer;
