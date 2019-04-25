import { createSelector } from 'reselect';

const selectTrades = state => state.get('closedTrades');

const makeSelectClosedTrades = () =>
  createSelector(
    selectTrades,
    openTradesRoute => openTradesRoute.get('closedTrades')
  );

const makeSelectClosedTradesLoading = () =>
  createSelector(
    selectTrades,
    openTradesRoute => openTradesRoute.get('closedTradesInitialLoad')
  );

export { makeSelectClosedTrades, makeSelectClosedTradesLoading };
