import { put, call, takeLatest } from 'redux-saga/effects';
import request from '../../../../utils/request';
import config from '../../../../config/config';

import { LOAD_OPEN_TRADES, LOAD_LAST_PRICES } from '../../../../config/constants';
import { openTradesLoaded, lastPricesLoaded } from './actions';
import { setSomethingWentWrong } from '../../actions';

// const mockOpen = [
//   {
//     id: '3347662314340866',
//     version: '3224782531592209',
//     userId: '2',
//     symbol: 'WTCBTC',
//     buyLayers: {
//       trades: [
//         {
//           amount: '5',
//           amountFilled: '4.99',
//           binanceId: 'Ykqt3CAt5dudQddcIz9ndT',
//           id: '3347662314078485',
//           isSell: false,
//           orderType: 'Limit',
//           price: '0.0002669',
//           symbol: 'WTCBTC',
//           tradeState: 'Pending',
//           userId: '2',
//           version: '3347679977865510'
//         },
//         {
//           amount: '5',
//           amountFilled: '0',
//           binanceId: 'uxQeMZjz1jnFe72SfDX7fP',
//           id: '3347662312767763',
//           isSell: false,
//           orderType: 'Limit',
//           price: '0.0002659',
//           symbol: 'WTCBTC',
//           tradeState: 'Pending',
//           userId: '2',
//           version: '3347662312767764'
//         }
//       ]
//     },
//     sellLayers: [
//       {
//         amountPercent: '1',
//         id: '3347662314209793',
//         profitMarginPercent: '0.02',
//         sellLayerType: 'TrailingSellLayer',
//         trailingMarginPercent: '0.01',
//         trailingStarted: false
//       }
//     ],
//     stopLoss: {
//       soldToStopLoss: false,
//       stopLossPrice: '0.000261',
//       stopLossType: 'FixedStopLoss'
//     },
//     sellPhaseStarted: false,
//     tbTradeState: 'WaitingForTarget'
//   }
// ];
//
// const mockHighest = [
//   { id: '3347662314340866', value: '0' },
//   { id: '3347678773445208', value: '0.036227' }
// ];

export function* getOpenTrades() {
  const requestURL = `${config.api}/trades/open`;
  const options = {
    method: 'get'
  };

  try {
    const openTrades = yield call(request, requestURL, options);
    /* eslint-disable */
    openTrades.open = openTrades.open.reverse();
    openTrades.highest = openTrades.highest.reduce((map, obj) => {
      const key = Object.keys(obj)[0];
      map[key] = obj[key];
      return map;
    }, {});
    // mockOpen.forEach(mock => {
    //   openTrades.open.push(mock);
    // });
    // mockHighest.forEach(mock => {
    //   openTrades.highest[mock.id] = mock.value;
    // });
    /* eslint-enable */
    yield put(openTradesLoaded(openTrades));
  } catch (err) {
    yield put(setSomethingWentWrong());
  }
}

export function* getLastPrices() {
  const requestURL = `${config.binanceApi}/prices`;
  const options = {
    method: 'get'
  };

  try {
    const lastPricesRaws = yield call(request, requestURL, options);
    const lastPrices = {};

    lastPricesRaws.forEach(ticker => {
      // eslint-disable-next-line
      lastPrices[ticker[0]] = ticker[1];
    });

    yield put(lastPricesLoaded(lastPrices));
  } catch (err) {
    console.log(err);
    yield put(setSomethingWentWrong());
  }
}

export default function* tradeActions() {
  yield takeLatest(LOAD_OPEN_TRADES, getOpenTrades);
  yield takeLatest(LOAD_LAST_PRICES, getLastPrices);
}
