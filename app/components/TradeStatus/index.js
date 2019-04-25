import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { faHourglassHalf } from '@fortawesome/pro-regular-svg-icons';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import Marker from './Marker';
import TradePercentade from '../TradePercentage';

import {
  add,
  subtract,
  multiply,
  divide,
  increaseByPercent,
  decreaseByPercent,
  formatNumberToTickSizeLength
} from '../../utils/helpers';

const Tag = styled.span`
  background: #525252;
  color: white;
  padding: 2px 20px;
  padding-left: 10px;
  font-size: 10px;
  font-weight: 600;
  border-radius: 2px;
`;

const TradeBar = styled.div`
  width: 100%;
  height: 6px;
  display: inline-block;
  position: relative;
  top: -7px;
  background-color: #d6d6d6;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.04);
`;

const Filler = styled.div`
  position: absolute;
  width: ${props => `${props.width}%`};
  height: 6px;
  left: ${props => `${props.position}%`};
  background: ${props => (props.isNegative ? '#EF5350' : '#3cbc98')};
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  transition: 0.2s all;
`;

const StatusContainer = styled.div`
  position: absolute;
  width: 200px;
  top: 0;
  padding: 13px 4px 0 4px;
  font-size: 10px;
  line-height: 9px;
  ${props =>
    !props.isFillerNegative
      ? 'right: 0px; border-right: 1px solid #8686869e; text-align: right;'
      : 'left: 0px; border-left: 1px solid #8686869e;'};

  ${props =>
    !props.isFillerNegative &&
    props.fillerPosition < 10 &&
    'right: -200px; border-right: none; border-left: 1px solid #8686869e; text-align: left;'};
`;

export default class TradeStatus extends React.Component {
  getAverage = () => {
    const { buyLayers, info } = { ...this.props };
    let amount = '0';
    let total = '0';
    buyLayers.forEach(layer => {
      amount = add(amount, layer.amountFilled);
      total = add(total, multiply(layer.amountFilled, layer.averagePrice));
    });
    return formatNumberToTickSizeLength(divide(total, amount), info.tickSize);
  };

  isPending = () => {
    const { buyLayers } = { ...this.props };
    let amount = '0';
    buyLayers.forEach(layer => {
      amount = add(amount, layer.amountFilled);
    });
    return amount === '0';
  };

  /* eslint-disable */
  calculatePositions = markers => {
    const AVGMarker = markers.find(marker => marker.type === 'AVG');
    const { info, price } = { ...this.props };
    markers.sort((a, b) =>
      parseFloat(a.price).toFixed(8) > parseFloat(b.price).toFixed(8)
        ? 1
        : parseFloat(b.price).toFixed(8) > parseFloat(a.price).toFixed(8)
        ? -1
        : 0
    );

    const max =
      Number(price) > Number(markers[markers.length - 1].price)
        ? price
        : markers[markers.length - 1].price;
    const min = Number(price) < Number(markers[0].price) ? price : markers[0].price;

    const distance = subtract(max, min);

    for (let i = 0; i < markers.length; i += 1) {
      markers[i].position = Number(
        Number(
          add(divide(multiply(subtract(markers[i].price, min), '100'), distance)),
          '0'
        ).toFixed(2)
      );
    }
    for (let i = 0; i < markers.length; i += 1) {
      markers[i].key = i;
    }
    return markers;
  };
  formMarkers = () => {
    const markers = [];
    const average = this.getAverage();
    const { buyLayers, sellLayers, stopLoss, highestPrice, info } = { ...this.props };
    buyLayers.forEach(layer => {
      if (layer.tradeState !== 'Filled' && layer.tradeState !== 'Canceled') {
        markers.push({
          type: 'B',
          price: formatNumberToTickSizeLength(layer.price, info.tickSize),
          position: '',
          tradeState: layer.tradeState,
          amount: layer.amount,
          amountFilled: layer.amountFilled
        });
      }
    });

    sellLayers.forEach(layer => {
      const temp = {};
      if (layer.sellLayerType === 'LimitSellLayer') {
        temp.type = 'S';
      }
      if (layer.sellLayerType === 'TrailingSellLayer') {
        temp.type = 'TTP';
        temp.hasTrailingStarted = layer.trailingStarted;
        temp.trailingMarginPercent = multiply(layer.trailingMarginPercent, '100');
      }
      temp.price = formatNumberToTickSizeLength(
        increaseByPercent(average, multiply(layer.profitMarginPercent, '100')),
        info.tickSize
      );
      markers.push(temp);
    });

    if (stopLoss.stopLossType !== undefined) {
      const temp = {
        type: 'SL',
        stopLossType: stopLoss.stopLossType
      };
      if (stopLoss.stopLossType === 'FixedStopLoss') {
        temp.price = formatNumberToTickSizeLength(stopLoss.stopLossPrice, info.tickSize);
      }
      if (stopLoss.stopLossType === 'TrailingStopLoss') {
        temp.price = formatNumberToTickSizeLength(
          decreaseByPercent(highestPrice, multiply(stopLoss.percentMargin, '100')),
          info.tickSize
        );
      }
      markers.push(temp);
    }

    markers.push({
      type: 'AVG',
      price: average,
      position: ''
    });

    return this.calculatePositions(markers);
  };
  calculateFiller = markers => {
    const AVGMarker = markers.find(marker => marker.type === 'AVG');
    const { info, price } = { ...this.props };
    const max =
      Number(price) > Number(markers[markers.length - 1].price)
        ? price
        : markers[markers.length - 1].price;
    const min =
      Number(price) < Number(markers[0].price) ? decreaseByPercent(price, '0') : markers[0].price;

    const distance = subtract(max, min);

    const filler = {};

    let fillerLength = subtract(AVGMarker.price, price);
    if (fillerLength[0] === '-') {
      fillerLength = fillerLength.substr(1, fillerLength.length);
    }

    filler.isNegative = parseFloat(AVGMarker.price) > parseFloat(price);
    filler.width = Number(Number(divide(multiply(fillerLength, '100'), distance)).toFixed(2));
    if (parseFloat(AVGMarker.price) > parseFloat(price)) {
      filler.isNegative = true;
      filler.position = Number(subtract(String(AVGMarker.position), String(filler.width)));
    } else {
      filler.isNegative = false;
      if (AVGMarker.position === 0) {
        filler.position = 1;
        if (filler.width === 100) filler.width = 99;
      } else {
        filler.position = AVGMarker.position;
      }
    }

    markers.forEach(marker => {
      let fillerSettings = {
        isFilled: false,
        isNegative: false
      };
      if (marker.type === 'AVG') {
        if (parseFloat(AVGMarker.price) !== parseFloat(price)) {
          fillerSettings.isFilled = true;
          fillerSettings.isNegative = filler.isNegative;
        } else {
          fillerSettings.isFilled = false;
          fillerSettings.isNegative = filler.isNegative;
        }
      }
      if (marker.type === 'S') {
        if (parseFloat(marker.price) < parseFloat(price)) {
          fillerSettings.isFilled = true;
          fillerSettings.isNegative = false;
        }
      }
      if (marker.type === 'TTP') {
        if (parseFloat(marker.price) < parseFloat(price)) {
          fillerSettings.isFilled = true;
          fillerSettings.isNegative = false;
        }
      }
      marker.fillerSettings = fillerSettings;
    });
    return filler;
  };
  /* eslint-enable */
  render() {
    if (this.isPending()) {
      return (
        <Tag>
          <FontAwesomeIcon icon={faHourglassHalf} style={{ marginRight: 10 }} />
          Pending
          <span style={{ marginLeft: 5, marginRight: 5 }}>-</span>
          Buy: {this.props.buyLayers[0].price}
          <span style={{ marginLeft: 5, marginRight: 5 }}>-</span>
          Last price: {this.props.price}
        </Tag>
      );
    }
    const markers = this.formMarkers();
    console.log('markeri formirani');
    console.log(markers);
    const AVGMarker = markers.find(marker => marker.type === 'AVG');
    console.log('avg marker formiran');
    console.log(AVGMarker);
    const filler = this.calculateFiller(markers);
    console.log('filler formiran');
    console.log(filler);
    return (
      <TradeBar>
        <Filler isNegative={filler.isNegative} width={filler.width} position={filler.position}>
          <StatusContainer
            isFillerNegative={filler.isNegative}
            fillerPosition={filler.position + filler.width}
          >
            <TradePercentade
              info={this.props.info}
              price={this.props.price}
              avgprice={AVGMarker.price}
            />
          </StatusContainer>
        </Filler>
        {markers.map(marker => (
          <Marker
            key={marker.key}
            position={marker.position}
            type={marker.type}
            marker={marker}
            price={marker.price}
            fillerSettings={marker.fillerSettings}
          />
        ))}
      </TradeBar>
    );
  }
}

TradeStatus.propTypes = {
  /* eslint-disable */
  buyLayers: PropTypes.array,
  sellLayers: PropTypes.array,
  stopLoss: PropTypes.object,
  highestPrice: PropTypes.string,
  info: PropTypes.object,
  price: PropTypes.string
  /* eslint-enable */
};

TradeStatus.defaultProps = {
  buyLayers: [],
  sellLayers: [],
  stopLoss: {},
  highestPrice: '0',
  info: {},
  price: '0'
};
