import BigDecimal from 'js-big-decimal';

/* eslint-disable */
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}
/* eslint-enable */

export function getstr(x) {
  return x.round(8).multiply(new BigDecimal(1)).value;
}

export function add(x, y) {
  const xBigDec = new BigDecimal(x);
  const yBigDec = new BigDecimal(y);
  const added = xBigDec.add(yBigDec);
  return added.value;
}

export function subtract(x, y) {
  const xBigDec = new BigDecimal(x);
  const yBigDec = new BigDecimal(y);
  const subtracted = xBigDec.subtract(yBigDec);
  return subtracted.value;
}

export function divide(x, y) {
  if (Number(x) === 0 || Number(y) === 0) {
    return '0';
  }
  return BigDecimal.divide(BigDecimal.round(x, 8), BigDecimal.round(y, 8));
}

export function multiply(x, y) {
  const xBigDec = new BigDecimal(x);
  const yBigDec = new BigDecimal(y);

  const multiplied = yBigDec.multiply(xBigDec).value;

  if (multiplied.substring(multiplied.indexOf('.') + 1).length > 8) {
    return String(Number(multiplied).toFixed(8));
  }
  return multiplied;
}

export function percentageDifference(x, y) {
  return String(Number(multiply(divide(subtract(y, x), x), '100')).toFixed(2));
}

export function getPercentageOfAmount(number, percentage) {
  return multiply(divide(percentage, '100'), number);
}

export function calculatePercentageOfTotal(total, number) {
  return String(Number(divide(multiply(number, '100'), total)).toFixed(2));
}

export function increaseByPercent(price, percentage) {
  return add(multiply(divide(percentage, '100'), price), price);
}

export function decreaseByPercent(price, percentage) {
  return subtract(price, multiply(divide(percentage, '100'), price));
}

export function divideBigDec(x, y) {
  return BigDecimal.divide(BigDecimal.round(x, 8), BigDecimal.round(y, 8));
}

export function formatDate(id) {
  return Number(parseInt(id / 65536, 10) + 1500000000000);
}

export function formatNumberToTickSizeLength(number, tickSize) {
  if (number === undefined || tickSize === undefined || isEmpty(tickSize)) {
    return '';
  }
  const bigDecNum = new BigDecimal(number);
  const decimalPlace = tickSize.indexOf('1') - 1;

  let hundreds = '1';
  for (let i = 0; i < decimalPlace; i += 1) hundreds += '0';

  hundreds = new BigDecimal(hundreds);
  let returnNumber = bigDecNum.multiply(hundreds).floor();
  returnNumber = new BigDecimal(divideBigDec(returnNumber.value, hundreds.value));

  return returnNumber.round(decimalPlace, BigDecimal.RoundingModes.FLOOR).value;
}

export function formatNumberToTickSize(number, tickSize) {
  if (number === undefined || tickSize === undefined) return '';
  const decimalPlace = tickSize.indexOf('1') - 1;

  if (number.substring(number.indexOf('.') + 1).length <= decimalPlace || number.indexOf('.') < 0) {
    return number;
  }
  return formatNumberToTickSizeLength(number, tickSize);
}

export function getPagedData(data, currentPage, pageSize) {
  const output = [];
  for (
    let x = (currentPage - 1) * pageSize;
    x < data.length && x < currentPage * pageSize;
    x += 1
  ) {
    output.push(data[x]);
  }

  return output;
}

export function formatSymbol(key) {
  let position = key.indexOf('USDT');
  if (position > -1) {
    return [key.slice(0, position), '/', key.slice(position)].join('');
  }
  position = key.indexOf('BTC');
  if (position > -1) {
    return [key.slice(0, position), '/', key.slice(position)].join('');
  }
  position = key.indexOf('ETH');
  if (position > -1) {
    return [key.slice(0, position), '/', key.slice(position)].join('');
  }
  position = key.indexOf('BNB');
  if (position > -1) {
    return [key.slice(0, position), '/', key.slice(position)].join('');
  }
  return key;
}

export function splitSymbol(symbol, half) {
  const formatedKey = formatSymbol(symbol);
  const splitKeys = formatedKey.split('/');
  if (half === 1) {
    return splitKeys[0];
  }
  return splitKeys[1];
}

export function getBalance(symbol, tab, balances) {
  let asset = '';
  if (tab === 'buy') {
    asset = splitSymbol(symbol, 2);
  } else {
    asset = splitSymbol(symbol, 1);
  }
  let balanceAmount = 0;
  if (balances) {
    balances.forEach(balance => {
      if (balance.asset === asset) {
        balanceAmount = balance.free;
      }
    });
  }
  return balanceAmount;
}

export function localStorageGet(param) {
  if (typeof Storage !== 'undefined') {
    return localStorage.getItem(param);
  }
  return null;
}

export function localStorageSet(param, value) {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem(param, value);
  }
}

export function localStorageRemove(key) {
  localStorage.removeItem(key);
}

export function getInfo(tickerInfo, symbol) {
  if (tickerInfo[symbol]) {
    return tickerInfo[symbol];
  }
  // eslint-disable-next-line
  tickerInfo = localStorageGet('tickerInfo');
  if (tickerInfo[symbol]) {
    return tickerInfo[symbol];
  }
  return {
    minPrice: '0.00000000',
    maxPrice: '0.00000000',
    tickSize: '0.00000100',
    minQty: '0.00100000',
    stepSize: '0.00100000',
    minNotional: '0.00100000'
  };
}

export function getTickSize(tickerInfo, symbol) {
  let { tickSize } = { ...tickerInfo[symbol] };

  if (tickSize && !isEmpty(tickSize)) {
    return tickSize;
  }
  // eslint-disable-next-line
  tickerInfo = JSON.parse(localStorageGet('tickerInfo'));
  // eslint-disable-next-line
  tickSize = tickerInfo[symbol].tickSize;

  if (tickSize && !isEmpty(tickSize)) {
    return tickSize;
  }
  return '0.000000001';
}

export function getMinNotional(tickerInfo, symbol) {
  let { minNotional } = { ...tickerInfo[symbol] };
  if (minNotional) {
    return minNotional;
  }
  // eslint-disable-next-line
  tickerInfo = localStorageGet('tickerInfo');
  // eslint-disable-next-line
  minNotional = tickerInfo[symbol].minNotional;
  if (minNotional) {
    return minNotional;
  }
  return '0.001';
}

export function getMinQty(tickerInfo, symbol) {
  let { minQty } = { ...tickerInfo[symbol] };
  if (minQty) {
    return minQty;
  }
  // eslint-disable-next-line
  tickerInfo = localStorageGet('tickerInfo');
  // eslint-disable-next-line
  minQty = tickerInfo[symbol].minQty;
  if (minQty) {
    return minQty;
  }
  return '0.01';
}

/* eslint-disable */
export const Base62 = (function() {
  const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  const Base62 = function() {};
  const _encode = function(value) {
    if (typeof value !== 'number') {
      throw 'Value is not number!';
    }

    let result = '',
      mod;
    do {
      mod = value % 62;
      result = ALPHA.charAt(mod) + result;
      value = Math.floor(value / 62);
    } while (value > 0);

    return result;
  };

  const _decode = function(value) {
    let result = 0;
    for (let i = 0, len = value.length; i < len; i++) {
      result *= 62;
      result += ALPHA.indexOf(value[i]);
    }

    return result;
  };

  Base62.prototype = {
    constructor: Base62,
    encode: _encode,
    decode: _decode
  };

  return Base62;
})();

/* eslint-enable */
