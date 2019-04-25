import { put, call, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import config from '../../config/config';

import {
  userInfoLoaded,
  userInfoLoadingError,
  userActivityLoaded,
  tickersAndInfoLoaded,
  setUnreadNotifications,
  setSomethingWentWrong
} from './actions';
import { LOAD_USERINFO, LOAD_USER_ACTIVITY, LOAD_TICKERS_AND_INFO } from '../../config/constants';

import { localStorageGet, localStorageSet } from '../../utils/helpers';

export function* getUserInfo() {
  const requestURL = `${config.binanceApi}/user/account-info`;
  const options = {
    method: 'get'
  };
  try {
    const userInfo = yield call(request, requestURL, options);
    console.log(userInfo);
    if (userInfo.balances) {
      yield put(userInfoLoaded(userInfo));
    } else {
      yield put(userInfoLoadingError(userInfo));
    }
  } catch (err) {
    yield put(setSomethingWentWrong());
  }
}

export function* getUserActivity() {
  const requestURL = `${config.api}/user/notifications`;
  const options = {
    method: 'get'
  };

  try {
    const userActivity = yield call(request, requestURL, options);
    let unread = 0;
    const lastSeenId = localStorageGet('lastSeenId');
    userActivity.sort((a, b) => Number(b.time) - Number(a.time));
    if (lastSeenId === null) {
      unread = userActivity.length;
      userActivity.forEach(activity => {
        // eslint-disable-next-line
        activity.time = Number(activity.time);
      });
    } else {
      let flag = false;
      userActivity.forEach(activity => {
        // eslint-disable-next-line
        activity.time = Number(activity.time);
        if (!flag) {
          if (activity.id === lastSeenId) {
            flag = true;
          } else {
            unread += 1;
          }
        }
      });
    }
    yield put(userActivityLoaded(userActivity));
    yield put(setUnreadNotifications(unread));
  } catch (err) {
    yield put(setSomethingWentWrong());
  }
}

export function* getTickersAndInfo() {
  const requestURL = `${config.binanceApi}/exchange-info`;
  const options = {
    method: 'get'
  };

  try {
    const tickerInfoRaw = yield call(request, requestURL, options);
    const tickerInfo = {};
    const tickers = [];

    tickerInfoRaw.symbols.forEach(ticker => {
      tickerInfo[ticker.symbol] = {};
      tickers.push(ticker.symbol);
      ticker.filters.forEach(filter => {
        if (filter.filterType === 'PRICE_FILTER') {
          tickerInfo[ticker.symbol].minPrice = filter.minPrice;
          tickerInfo[ticker.symbol].maxPrice = filter.maxPrice;
          tickerInfo[ticker.symbol].tickSize = filter.tickSize;
        }
        if (filter.filterType === 'LOT_SIZE') {
          tickerInfo[ticker.symbol].minQty = filter.minQty;
          tickerInfo[ticker.symbol].stepSize = filter.stepSize;
        }
        if (filter.filterType === 'MIN_NOTIONAL') {
          tickerInfo[ticker.symbol].minNotional = filter.minNotional;
        }
      });
    });
    const tickersAndInfo = {
      tickers,
      tickerInfo
    };
    localStorageSet('tickerInfo', JSON.stringify(tickerInfo));
    yield put(tickersAndInfoLoaded(tickersAndInfo));
  } catch (err) {
    yield put(setSomethingWentWrong());
  }
}

export default function* dashboardActions() {
  yield takeLatest(LOAD_USERINFO, getUserInfo);
  yield takeLatest(LOAD_USER_ACTIVITY, getUserActivity);
  yield takeLatest(LOAD_TICKERS_AND_INFO, getTickersAndInfo);
}
