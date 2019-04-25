import React from 'react';

import Charts from './Charts/';
import OpenTrades from './OpenTrades';
import ClosedTrades from './ClosedTrades';

const Overview = () => (
  <React.Fragment>
    <Charts />
    <OpenTrades />
    <ClosedTrades />
  </React.Fragment>
);

export default Overview;
