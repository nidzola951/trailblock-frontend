import {
  AUTH_INIT,
  AUTH_GET_USER,
  AUTH_SIGN_UP,
  AUTH_SIGN_IN,
  AUTH_SIGN_OUT,
  AUTH_FORGOT_PASSWORD,
  AUTH_CHANGE_PASSWORD,
  AUTH_COMPLETE_NEW_PASSWORD,
  AUTH_CHANGE_PASSWORD_AUTHENTICATED
} from './constants';

export const init = () => ({
  type: AUTH_INIT,
  payload: {}
});

export const getUser = () => ({
  type: AUTH_GET_USER
});

export const signUp = (username, password) => ({
  type: AUTH_SIGN_UP,
  payload: {
    username,
    password
  }
});

export const signIn = (username, password, code) => ({
  type: AUTH_SIGN_IN,
  payload: {
    username,
    password,
    code
  }
});

export const verifyAccount = (username, code) => ({
  type: AUTH_SIGN_IN,
  payload: {
    username,
    code
  }
});

export const signOut = () => ({
  type: AUTH_SIGN_OUT
});

export const forgotPassword = username => ({
  type: AUTH_FORGOT_PASSWORD,
  payload: {
    username
  }
});

export const changePassword = (username, code, password) => ({
  type: AUTH_CHANGE_PASSWORD,
  payload: {
    username,
    code,
    password
  }
});

export const completeNewPassword = (username, password) => ({
  type: AUTH_COMPLETE_NEW_PASSWORD,
  payload: {
    username,
    password
  }
});

export const changePasswordAuthenticated = (username, oldPassword, newPassword) => ({
  type: AUTH_CHANGE_PASSWORD_AUTHENTICATED,
  payload: {
    username,
    oldPassword,
    newPassword
  }
});
