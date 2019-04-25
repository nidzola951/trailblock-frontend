import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import { Row, Cell } from '@zendeskgarden/react-tables';

import Menu from './Components/Menu';
import { formatDate, add } from '../../../../../utils/helpers';
import TradeStatus from '../../../../../components/TradeStatus';

function getTotalAmount(trades) {
  let amount = '0';
  trades.forEach(layer => {
    amount = add(amount, layer.amountFilled);
  });
  return amount;
}

const SingleTrade = props => (
  <Row>
    <Cell>{moment(new Date(formatDate(props.openTrade.id))).format('DD/MM/YYYY')}</Cell>
    <Cell>{props.openTrade.symbol}</Cell>
    <Cell>{getTotalAmount(props.openTrade.buyLayers.trades)}</Cell>
    <Cell>
      <TradeStatus
        buyLayers={props.openTrade.buyLayers.trades}
        sellLayers={props.openTrade.sellLayers}
        stopLoss={props.openTrade.stopLoss}
        highestPrice={props.highestPrice}
        info={props.info}
        price={props.price}
      />
    </Cell>
    <Cell menu>
      <Menu id={props.openTrade.id} />
    </Cell>
  </Row>
);

SingleTrade.propTypes = {
  openTrade: PropTypes.object.isRequired,
  highestPrice: PropTypes.string.isRequired,
  info: PropTypes.object.isRequired,
  price: PropTypes.string.isRequired
};

export default SingleTrade;
