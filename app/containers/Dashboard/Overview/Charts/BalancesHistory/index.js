import React from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

import CustomTooltip from '../CustomTooltip';

const BalancesHistory = props => (
  <ResponsiveContainer width="100%" height={300}>
    <AreaChart data={props.data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
      <defs>
        <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#0C344B" stopOpacity={0.2} />
          <stop offset="95%" stopColor="#0C344B" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="date" style={{ fontSize: 10, marginRight: 10, opacity: 0.7 }} />
      <YAxis
        type="number"
        domain={[props.min, props.max]}
        style={{ fontSize: 10, marginRight: 10, opacity: 0.7 }}
      />
      <CartesianGrid stroke="#f3f2f2" strokeDasharray="0 0" />
      <Tooltip
        cursor={{ stroke: '#0C344B', strokeWidth: 1 }}
        content={<CustomTooltip title="Balance" symbol="BTC" />}
      />
      <Area
        type="linear"
        dataKey="balance"
        stroke="#0C344B"
        strokeWidth={2.5}
        fillOpacity={1}
        dot={{ fill: '#0C344B', strokeWidth: 1 }}
        fill="url(#colorBalance)"
      />
    </AreaChart>
  </ResponsiveContainer>
);

BalancesHistory.propTypes = {
  data: PropTypes.array.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired
};

export default BalancesHistory;
