import React from 'react';
import PropTypes from 'prop-types';

import { formatNumberToTickSizeLength, percentageDifference } from '../../utils/helpers';

function getPercentageGrowth(price, avgprice) {
  console.log('ovde 1');
  const percDiff = percentageDifference(avgprice, price);
  console.log('ovde 2');
  if (Number(percDiff) > 0) {
    return <span style={{ fontWeight: 600, color: '#3cbc98' }}>+{percDiff}%</span>;
  }
  if (Number(percDiff) < 0) {
    return <span style={{ fontWeight: 600, color: '#EF5350' }}>{percDiff}%</span>;
  }
  return <span style={{ fontWeight: 600 }}>{percDiff}%</span>;
}

const TradePercentage = props => (
  <React.Fragment>
    {getPercentageGrowth(props.price, props.avgprice)}
    {' | '}
    <span>{formatNumberToTickSizeLength(props.price, props.info.tickSize)}</span>
  </React.Fragment>
);

TradePercentage.propTypes = {
  info: PropTypes.object.isRequired,
  avgprice: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired
};

export default TradePercentage;
