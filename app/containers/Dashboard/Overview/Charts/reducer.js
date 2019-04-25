import { fromJS } from 'immutable';

import { LOAD_CHART_DATA, LOAD_CHART_DATA_SUCCESS } from '../../../../config/constants';

const initialState = fromJS({
  loading: true,
  chartData: {
    balancesHistory: [],
    profitHistory: []
  }
});

function tradeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CHART_DATA:
      return state.set('loading', true);
    case LOAD_CHART_DATA_SUCCESS:
      console.log(action);
      return state.set('chartData', action.chartData).set('loading', false);
    default:
      return state;
  }
}

export default tradeReducer;
