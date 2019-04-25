import { call, put, takeLatest } from 'redux-saga/effects';
import moment from 'moment';
import request from '../../../../utils/request';
import config from '../../../../config/config';

import { LOAD_CHART_DATA } from '../../../../config/constants';

import { balancesHistoryLoaded } from './actions';
import { setSomethingWentWrong } from '../../actions';
import { decreaseByPercent, increaseByPercent } from '../../../../utils/helpers';

function findBalancesHistoryMinMax(data) {
  const minMax = {
    min: 1000000,
    max: 0
  };
  data.forEach(item => {
    const balance = Number(item.btcBalanceApprox);
    if (balance < minMax.min) minMax.min = balance;
    if (balance > minMax.max) minMax.max = balance;
  });
  minMax.min = Number(Number(decreaseByPercent(String(minMax.min), 10)).toFixed(3));
  minMax.max = Number(Number(increaseByPercent(String(minMax.max), 10)).toFixed(3));
  return minMax;
}

function formatBalancesHistoryData(balancesHistory) {
  const data = [];
  const minMax = findBalancesHistoryMinMax(balancesHistory);
  balancesHistory.forEach(item => {
    const timeNumber = Number(item.time);
    const temp = {
      date: moment(new Date(timeNumber)).format('MM/DD/YY'),
      balance: Number(item.btcBalanceApprox).toFixed(3),
      sort: timeNumber
    };
    data.push(temp);
  });
  data.sort((a, b) => a.sort - b.sort);

  return {
    min: minMax.min,
    max: minMax.max,
    data
  };
}

function formatProfitHistory(profitHistory) {
  const data = {
    btc: {
      min: 100000,
      max: 0,
      data: []
    },
    eth: {
      min: 100000,
      max: 0,
      data: []
    },
    bnb: {
      min: 100000,
      max: 0,
      data: []
    },
    usd: {
      min: 100000,
      max: 0,
      data: []
    }
  };
  Object.keys(profitHistory).forEach(key => {
    const timeNumber = Number(key);
    const date = moment(new Date(timeNumber)).format('MM/DD/YY');
    data.btc.data.push({
      balance: profitHistory[key]['*/BTC'],
      date,
      sort: timeNumber
    });
    data.eth.data.push({
      balance: profitHistory[key]['*/ETH'],
      date,
      sort: timeNumber
    });
    data.bnb.data.push({
      balance: profitHistory[key]['*/BNB'],
      date,
      sort: timeNumber
    });
    data.usd.data.push({
      balance: profitHistory[key]['*/USD*'],
      date,
      sort: timeNumber
    });
  });
  for (let i = 0; i < data.btc.data.length; i += 1) {
    const btcBalance = Number(data.btc.data[i].balance);
    const ethBalance = Number(data.eth.data[i].balance);
    const bnbBalance = Number(data.bnb.data[i].balance);
    const usdBalance = Number(data.usd.data[i].balance);
    if (btcBalance < data.btc.min) data.btc.min = btcBalance;
    if (btcBalance > data.btc.max) data.btc.max = btcBalance;
    if (ethBalance < data.eth.min) data.eth.min = ethBalance;
    if (ethBalance > data.eth.max) data.eth.max = ethBalance;
    if (bnbBalance < data.bnb.min) data.bnb.min = bnbBalance;
    if (bnbBalance > data.bnb.max) data.bnb.max = bnbBalance;
    if (usdBalance < data.usd.min) data.usd.min = usdBalance;
    if (usdBalance > data.usd.max) data.usd.max = usdBalance;
  }

  data.btc.data.sort((a, b) => a.sort - b.sort);
  data.eth.data.sort((a, b) => a.sort - b.sort);
  data.bnb.data.sort((a, b) => a.sort - b.sort);
  data.usd.data.sort((a, b) => a.sort - b.sort);

  data.btc.max = Number(
    Number(increaseByPercent(String(data.btc.max), 60))
      .toFixed(3)
      .replace(/0+$/, '')
  );
  data.btc.min = Number(
    Number(increaseByPercent(String(data.btc.min), 60))
      .toFixed(3)
      .replace(/0+$/, '')
  );

  data.eth.min = Number(
    Number(increaseByPercent(String(data.eth.min), 60))
      .toFixed(3)
      .replace(/0+$/, '')
  );
  data.eth.max = Number(
    Number(increaseByPercent(String(data.eth.max), 60))
      .toFixed(3)
      .replace(/0+$/, '')
  );

  data.bnb.min = Number(
    Number(increaseByPercent(String(data.bnb.min), 60))
      .toFixed(3)
      .replace(/0+$/, '')
  );
  data.bnb.max = Number(
    Number(increaseByPercent(String(data.bnb.max), 60))
      .toFixed(3)
      .replace(/0+$/, '')
  );

  data.usd.min = Number(
    Number(increaseByPercent(String(data.usd.min), 60))
      .toFixed(3)
      .replace(/0+$/, '')
  );
  data.usd.max = Number(
    Number(increaseByPercent(String(data.usd.max), 60))
      .toFixed(3)
      .replace(/0+$/, '')
  );

  if (data.btc.min >= -0.01) data.btc.min = -0.01;
  if (data.btc.max <= 0.01) data.btc.max = 0.01;
  if (data.eth.min >= -0.01) data.eth.min = -0.01;
  if (data.eth.max <= 0.01) data.eth.max = 0.01;
  if (data.bnb.min >= -0.01) data.bnb.min = -0.01;
  if (data.bnb.max <= 0.01) data.bnb.max = 0.01;
  if (data.usd.min >= -0.01) data.usd.min = -0.01;
  if (data.usd.max <= 0.01) data.usd.max = 0.01;

  if (Math.abs(data.btc.min) > data.btc.max) data.btc.max = Math.abs(data.btc.min);
  if (data.btc.max * -1 < data.btc.min) data.btc.min = data.btc.max * -1;

  if (Math.abs(data.eth.min) > data.eth.max) data.eth.max = Math.abs(data.eth.min);
  if (data.eth.max * -1 < data.eth.min) data.eth.min = data.eth.max * -1;

  if (Math.abs(data.bnb.min) > data.bnb.max) data.bnb.max = Math.abs(data.bnb.min);
  if (data.bnb.max * -1 < data.bnb.min) data.bnb.min = data.bnb.max * -1;

  if (Math.abs(data.usd.min) > data.usd.max) data.usd.max = Math.abs(data.usd.min);
  if (data.usd.max * -1 < data.usd.min) data.usd.min = data.usd.max * -1;

  return data;
}

export function* getChartData() {
  const requestURLBalance = `${config.api}/user/balance-history`;
  const requestURLProfit = `${config.api}/user/profit-history/${new Date().setHours(0, 0, 0, 0)}`;
  const options = {
    method: 'get'
  };

  try {
    const balancesHistoryRaw = yield call(request, requestURLBalance, options);
    const balancesHistory = formatBalancesHistoryData(balancesHistoryRaw);
    const profitHistoryRaw = yield call(request, requestURLProfit, options);
    const profitHistory = formatProfitHistory(profitHistoryRaw);
    const chartData = {
      balancesHistory,
      profitHistory
    };
    yield put(balancesHistoryLoaded(chartData));
  } catch (err) {
    yield put(setSomethingWentWrong());
  }
}

export default function* tradeActions() {
  yield takeLatest(LOAD_CHART_DATA, getChartData);
}
