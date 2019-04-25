import { put, call, takeLatest } from 'redux-saga/effects';
import request from '../../../../utils/request';
import config from '../../../../config/config';

import { LOAD_CLOSED_TRADES } from '../../../../config/constants';
import { closedTradesLoaded } from './actions';
import { setSomethingWentWrong } from '../../actions';

export function* getClosedTrades() {
  const requestURL = `${config.api}/trades/closed`;
  const options = {
    method: 'get'
  };

  try {
    const closedTrades = yield call(request, requestURL, options);
    /* eslint-disable */
    closedTrades.closed = closedTrades.closed.reverse();
    /* eslint-enable */
    yield put(closedTradesLoaded(closedTrades));
  } catch (err) {
    yield put(setSomethingWentWrong());
  }
}

export default function* tradeActions() {
  yield takeLatest(LOAD_CLOSED_TRADES, getClosedTrades);
}
