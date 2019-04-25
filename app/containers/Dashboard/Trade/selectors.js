import { createSelector } from 'reselect';

const selectTrade = state => state.get('trade');

const makeSelectPrices = () =>
  createSelector(
    selectTrade,
    tradeRoute => tradeRoute.get('prices')
  );

export { makeSelectPrices };
