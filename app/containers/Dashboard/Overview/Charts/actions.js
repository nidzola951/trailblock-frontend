import { LOAD_CHART_DATA, LOAD_CHART_DATA_SUCCESS } from '../../../../config/constants';

export function loadBalancesHistory() {
  return {
    type: LOAD_CHART_DATA
  };
}

export function balancesHistoryLoaded(chartData) {
  console.log(chartData);
  return {
    type: LOAD_CHART_DATA_SUCCESS,
    chartData
  };
}
