import { createSelector } from 'reselect';

const selectChartData = state => state.get('chartData');

const makeSelectLoading = () =>
  createSelector(
    selectChartData,
    routeChartData => routeChartData.get('loading')
  );

const makeSelectChartData = () =>
  createSelector(
    selectChartData,
    routeChartData => routeChartData.get('chartData')
  );

export { makeSelectLoading, makeSelectChartData };
