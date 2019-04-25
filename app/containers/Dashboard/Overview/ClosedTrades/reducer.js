import { fromJS } from 'immutable';

import { LOAD_CLOSED_TRADES_SUCCESS } from '../../../../config/constants';

const initialState = fromJS({
  closedTrades: [],
  closedTradesInitialLoad: true
});

function diaryReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CLOSED_TRADES_SUCCESS:
      return state.set('closedTrades', action.closedTrades).set('closedTradesInitialLoad', false);
    default:
      return state;
  }
}

export default diaryReducer;
