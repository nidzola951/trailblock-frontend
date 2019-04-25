import { LOAD_CLOSED_TRADES, LOAD_CLOSED_TRADES_SUCCESS } from '../../../../config/constants';

export function loadClosedTrades() {
  return {
    type: LOAD_CLOSED_TRADES
  };
}

export function closedTradesLoaded(closedTrades) {
  return {
    type: LOAD_CLOSED_TRADES_SUCCESS,
    closedTrades
  };
}
