import { createSelector } from 'reselect';

const selectTrades = state => state.get('openTrades');

const makeSelectOpenTrades = () =>
  createSelector(
    selectTrades,
    openTradesRoute => openTradesRoute.get('openTrades')
  );

const makeSelectOpenTradesLoading = () =>
  createSelector(
    selectTrades,
    openTradesRoute => openTradesRoute.get('openTradesInitialLoad')
  );

const makeSelectLastPrices = () =>
  createSelector(
    selectTrades,
    openTradesRoute => openTradesRoute.get('lastPrices')
  );

const makeSelectLastPricesLoading = () =>
  createSelector(
    selectTrades,
    openTradesRoute => openTradesRoute.get('lastPricesInitialLoad')
  );

export {
  makeSelectOpenTrades,
  makeSelectOpenTradesLoading,
  makeSelectLastPrices,
  makeSelectLastPricesLoading
};
