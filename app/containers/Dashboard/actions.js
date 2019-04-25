import {
  LOAD_USERINFO,
  LOAD_USERINFO_ERROR,
  LOAD_USERINFO_SUCCESS,
  LOAD_USER_ACTIVITY,
  LOAD_USER_ACTIVITY_SUCCESS,
  LOAD_TICKERS_AND_INFO,
  LOAD_TICKERS_AND_INFO_SUCCESS,
  SET_UNREAD_NOTIFICATIONS,
  SET_SYMBOL_ID,
  SET_SOMETHING_WENT_WRONG
} from '../../config/constants';

export function loadUserInfo() {
  return {
    type: LOAD_USERINFO
  };
}

export function userInfoLoaded(userInfo) {
  return {
    type: LOAD_USERINFO_SUCCESS,
    userInfo
  };
}

export function userInfoLoadingError(error) {
  return {
    type: LOAD_USERINFO_ERROR,
    error
  };
}

export function setSymbolID(symbolID) {
  return {
    type: SET_SYMBOL_ID,
    symbolID
  };
}

export function loadUserActivity() {
  return {
    type: LOAD_USER_ACTIVITY
  };
}

export function userActivityLoaded(userActivity) {
  return {
    type: LOAD_USER_ACTIVITY_SUCCESS,
    userActivity
  };
}

export function loadTickersAndInfo() {
  return {
    type: LOAD_TICKERS_AND_INFO
  };
}

export function tickersAndInfoLoaded(tickersAndInfo) {
  return {
    type: LOAD_TICKERS_AND_INFO_SUCCESS,
    tickersAndInfo
  };
}

export function setUnreadNotifications(unreadNotifications) {
  return {
    type: SET_UNREAD_NOTIFICATIONS,
    unreadNotifications
  };
}

export function setSomethingWentWrong() {
  return {
    type: SET_SOMETHING_WENT_WRONG
  };
}
