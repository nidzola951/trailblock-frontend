import { fromJS } from 'immutable';

import { LOAD_PRICES_SUCCESS } from '../../../config/constants';

const initialState = fromJS({
  prices: {
    symbolID: 'Trailblock',
    dayChange: '',
    dayChangePercent: '',
    bid: '',
    ask: '',
    lastPrice: ''
  }
});

function tradeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_PRICES_SUCCESS:
      return state.set('prices', action.prices);
    default:
      return state;
  }
}

export default tradeReducer;
