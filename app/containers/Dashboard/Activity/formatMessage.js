import React from 'react';
import {
  Base62,
  formatSymbol,
  percentageDifference,
  splitSymbol,
  multiply,
  formatNumberToTickSize
} from '../../../utils/helpers';

export default function formatMessage(activity) {
  const base62 = new Base62();
  if (activity.type === 'SomethingWentWrong') {
    return (
      <React.Fragment>
        <h3>Something went wrong</h3>
        <p>{activity.message}</p>
      </React.Fragment>
    );
  }
  if (activity.type === 'PanicSold') {
    return (
      <React.Fragment>
        <h3>Panic sold</h3>
        <p>
          Trade with ID: {base62.encode(Number(activity.tbTradeId))} for{' '}
          {formatSymbol(activity.symbol)} was panic sold. Profit from trade:{' '}
          {percentageDifference(activity.buysAveragePrice, activity.sellsAveragePrice)}%
        </p>
      </React.Fragment>
    );
  }
  if (activity.type === 'BuyFilled') {
    return (
      <React.Fragment>
        <h3>Buy filled</h3>
        <p>
          Bought {activity.amountFilled} {splitSymbol(activity.symbol, 1)} at price{' '}
          {activity.averagePrice} {splitSymbol(activity.symbol, 2)} (Total:{' '}
          {formatNumberToTickSize(
            multiply(activity.amountFilled, activity.averagePrice),
            '0.00000001'
          )}{' '}
          {splitSymbol(activity.symbol, 2)}) for trade with ID:{' '}
          {base62.encode(Number(activity.tbTradeId))}.
        </p>
      </React.Fragment>
    );
  }
  if (activity.type === 'SellFilled') {
    return (
      <React.Fragment>
        <h3>Sell filled</h3>
        <p>
          Sold {activity.amountFilled} {splitSymbol(activity.symbol, 1)} at price{' '}
          {activity.averagePrice} {splitSymbol(activity.symbol, 2)} (Total:{' '}
          {formatNumberToTickSize(
            multiply(activity.amountFilled, activity.averagePrice),
            '0.00000001'
          )}{' '}
          {splitSymbol(activity.symbol, 2)}) for trade with ID:{' '}
          {base62.encode(Number(activity.tbTradeId))}.
        </p>
      </React.Fragment>
    );
  }
  if (activity.type === 'TrailingStarted') {
    return (
      <React.Fragment>
        <h3>Trailing started</h3>
        <p>
          Trailing has started at {activity.price}, with trailing margin of{' '}
          {multiply(activity.trailingMarginPercent, '100')}% for trade with ID:{' '}
          {base62.encode(Number(activity.tbTradeId))}
        </p>
      </React.Fragment>
    );
  }
  if (activity.type === 'StopLoss') {
    return (
      <React.Fragment>
        <h3>Stop loss hit</h3>
        <p>
          Trade with ID: {base62.encode(Number(activity.tbTradeId))} for{' '}
          {formatSymbol(activity.symbol)} hit the stop loss. Loss from trade:{' '}
          {percentageDifference(activity.buysAveragePrice, activity.sellsAveragePrice)}%
        </p>
      </React.Fragment>
    );
  }
  if (activity.type === 'TradeCompleted') {
    return (
      <React.Fragment>
        <h3>Trade completed</h3>
        <p>
          Trade with ID: {base62.encode(Number(activity.tbTradeId))} completed at with profit of:{' '}
          {percentageDifference(activity.buysAveragePrice, activity.sellsAveragePrice)}%
        </p>
      </React.Fragment>
    );
  }
  return 'Unhandled notification type, please inform @nmastilovic';
}
