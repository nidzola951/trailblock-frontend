import {
  LOAD_OPEN_TRADES,
  LOAD_OPEN_TRADES_SUCCESS,
  LOAD_LAST_PRICES,
  LOAD_LAST_PRICES_SUCCESS
} from '../../../../config/constants';

export function loadOpenTrades() {
  return {
    type: LOAD_OPEN_TRADES
  };
}

export function loadLastPrices() {
  return {
    type: LOAD_LAST_PRICES
  };
}

export function openTradesLoaded(openTrades) {
  return {
    type: LOAD_OPEN_TRADES_SUCCESS,
    openTrades
  };
}

export function lastPricesLoaded(lastPrices) {
  return {
    type: LOAD_LAST_PRICES_SUCCESS,
    lastPrices
  };
}
