import { fromJS } from 'immutable';

import {
  SET_SYMBOL_ID,
  LOAD_USERINFO,
  LOAD_USERINFO_SUCCESS,
  LOAD_USERINFO_ERROR,
  LOAD_USER_ACTIVITY,
  LOAD_USER_ACTIVITY_SUCCESS,
  LOAD_USER_ACTIVITY_ERROR,
  LOAD_TICKERS_AND_INFO_SUCCESS,
  SET_UNREAD_NOTIFICATIONS,
  SET_SOMETHING_WENT_WRONG
} from '../../config/constants';
import { localStorageSet, localStorageGet } from '../../utils/helpers';

const initialState = fromJS({
  symbolID:
    localStorageGet('symbolID') === null || localStorageGet('symbolID') === 'null'
      ? 'BTCUSDT'
      : localStorageGet('symbolID'),
  userInfoLoading: false,
  userInfoError: '',
  userInfo: null,
  userActivityLoading: false,
  userActivityError: '',
  userActivity: null,
  unreadNotifications: 0,
  tickers: [],
  tickerInfo: {},
  somethingWentWrong: false
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERINFO:
      return state.set('userInfoLoading', true).set('userInfoError', '');
    case LOAD_USERINFO_SUCCESS:
      return state.set('userInfo', action.userInfo).set('userInfoLoading', false);
    case LOAD_USERINFO_ERROR:
      return state
        .set('userActivity', {})
        .set('userInfoError', action.error)
        .set('userInfoLoading', false);

    case LOAD_USER_ACTIVITY:
      return state.set('userActivityLoading', true).set('userActivityError', '');
    case LOAD_USER_ACTIVITY_SUCCESS:
      return state.set('userActivity', action.userActivity).set('userActivityLoading', false);
    case LOAD_USER_ACTIVITY_ERROR:
      return state
        .set('userActivity', {})
        .set('userActivityError', action.error)
        .set('userActivityLoading', false);
    case LOAD_TICKERS_AND_INFO_SUCCESS:
      return state
        .set('tickerInfo', action.tickersAndInfo.tickerInfo)
        .set('tickers', action.tickersAndInfo.tickers);

    case SET_SYMBOL_ID:
      localStorageSet('symbolID', action.symbolID);
      return state.set('symbolID', action.symbolID);
    case SET_UNREAD_NOTIFICATIONS:
      return state.set('unreadNotifications', action.unreadNotifications);
    case SET_SOMETHING_WENT_WRONG:
      return state.set('somethingWentWrong', true);
    default:
      return state;
  }
}

export default dashboardReducer;
