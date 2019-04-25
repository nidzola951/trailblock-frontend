import { fromJS } from 'immutable';

import { LOAD_OPEN_TRADES_SUCCESS, LOAD_LAST_PRICES_SUCCESS } from '../../../../config/constants';

const initialState = fromJS({
  openTrades: [],
  openTradesInitialLoad: true,
  lastPrices: {},
  lastPricesInitialLoad: true
});

function diaryReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_OPEN_TRADES_SUCCESS:
      return state.set('openTrades', action.openTrades).set('openTradesInitialLoad', false);
    case LOAD_LAST_PRICES_SUCCESS:
      return state.set('lastPrices', action.lastPrices).set('lastPricesInitialLoad', false);
    default:
      return state;
  }
}

export default diaryReducer;
