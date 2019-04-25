import { LOAD_PRICES_SUCCESS } from '../../../config/constants';

export function pricesLoaded(prices) {
  return {
    type: LOAD_PRICES_SUCCESS,
    prices
  };
}
