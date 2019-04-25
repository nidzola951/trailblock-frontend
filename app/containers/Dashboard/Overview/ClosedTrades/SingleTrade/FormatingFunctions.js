import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTimes,
  faLevelUp,
  faLevelDown,
  faExclamationCircle
} from '@fortawesome/pro-regular-svg-icons';
import { Tooltip } from '@zendeskgarden/react-tooltips';
import {
  multiply,
  splitSymbol,
  percentageDifference,
  subtract
} from '../../../../../utils/helpers';
import { SuccessStatusTag, BadStatusTag, SimpleTag } from './SingleTradeStyles';

export function formatStatus(
  totalBought,
  totalSold,
  totalAmountBought,
  totalSoldAmount,
  AVGBuyPrice,
  AVGSellPrice,
  trade
) {
  if (trade.tbTradeState === 'Canceled') {
    return (
      <SimpleTag>
        <FontAwesomeIcon icon={faTimes} style={{ color: '#EF534F', marginRight: 7 }} />
        Canceled
      </SimpleTag>
    );
  }
  if (trade.tbTradeState === 'Completed' || trade.tbTradeState === 'PanicSold') {
    if (!trade.sellLayers.length) {
      return (
        <SimpleTag>
          <FontAwesomeIcon icon={faCheck} style={{ color: '#27A59B', marginRight: 7 }} />
          Completed
        </SimpleTag>
      );
    }
    if (Number(totalAmountBought) > Number(totalSoldAmount)) {
      // eslint-disable-next-line
      totalAmountBought = totalSoldAmount;
    }

    const spent = multiply(AVGBuyPrice, totalAmountBought);
    const earned = multiply(AVGSellPrice, totalSoldAmount);

    if (Number(spent) <= Number(earned)) {
      return (
        <SuccessStatusTag>
          <FontAwesomeIcon icon={faLevelUp} style={{ marginRight: 7 }} />+
          {percentageDifference(spent, earned)}% ({subtract(earned, spent)}{' '}
          {splitSymbol(trade.symbol, 2)})
          {trade.tbTradeState === 'PanicSold' && (
            <Tooltip
              trigger={<FontAwesomeIcon icon={faExclamationCircle} style={{ marginLeft: 7 }} />}
              size="small"
            >
              <p>Panic sold</p>
            </Tooltip>
          )}
        </SuccessStatusTag>
      );
    }
    return (
      <BadStatusTag>
        <FontAwesomeIcon icon={faLevelDown} style={{ marginRight: 7 }} />
        {percentageDifference(spent, earned)}% ({subtract(earned, spent)}{' '}
        {splitSymbol(trade.symbol, 2)})
        {trade.tbTradeState === 'PanicSold' && (
          <Tooltip
            trigger={<FontAwesomeIcon icon={faExclamationCircle} style={{ marginLeft: 7 }} />}
            size="small"
          >
            <p>Panic sold</p>
          </Tooltip>
        )}
      </BadStatusTag>
    );
  }
  return <p>Case not handled, please contact @nmastilovic</p>;
}
