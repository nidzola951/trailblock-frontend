import React from 'react';
import PropTypes from 'prop-types';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine
} from 'recharts';

import CustomTooltip from '../CustomTooltip';

export default class ProfitHistory extends React.Component {
  gradientOffset = () => {
    const dataMax = Math.max(...this.props.data.map(i => i.balance));
    const dataMin = Math.min(...this.props.data.map(i => i.balance));

    if (dataMax <= 0) {
      return 0;
    } else if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };
  render() {
    const off = this.gradientOffset();
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={this.props.data} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
          <CartesianGrid stroke="#f3f2f2" strokeDasharray="0 0" />
          <XAxis dataKey="date" style={{ fontSize: 10, marginRight: 10, opacity: 0.7 }} />
          <YAxis
            style={{ fontSize: 10, marginRight: 10, opacity: 0.7 }}
            domain={[this.props.min, this.props.max]}
          />
          <Tooltip
            cursor={{ stroke: '#0C344B', strokeWidth: 1 }}
            content={<CustomTooltip title="Profit/Loss" symbol={this.props.symbol} />}
          />
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="#3CBB98" stopOpacity={0.3} />
              <stop offset={off} stopColor="#EF5350" stopOpacity={0.3} />
            </linearGradient>
          </defs>
          <ReferenceLine y={0} stroke="#0C344B" strokeDasharray="3 2" />
          <Area
            type="linear"
            dataKey="balance"
            stroke="#0C344B"
            strokeWidth={2.5}
            dot={{ fill: '#0C344B', strokeWidth: 1 }}
            fill="url(#splitColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}

ProfitHistory.propTypes = {
  data: PropTypes.array.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  symbol: PropTypes.string.isRequired
};
