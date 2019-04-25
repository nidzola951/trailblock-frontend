import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faArrowAltDown,
  faArrowAltUp,
  faTilde,
  faShieldAlt,
  faFlag,
  faHourglass
} from '@fortawesome/pro-solid-svg-icons';

import { Tooltip } from '@zendeskgarden/react-tooltips';

function calculateContainerPosition(position, marker) {
  if (position === 0) {
    return 5;
  }
  if (position === 100) {
    return -16;
  }
  if (marker.type === 'AVG') {
    if (marker.fillerSettings.isNegative) {
      return -10;
    }
    if (!marker.isFilled) {
      return -4;
    }
  }
  return 0;
}

const Container = styled.div`
  position: absolute;
  left: calc(
    ${props => `${props.position}%`} + 4px +
      ${props => calculateContainerPosition(props.position, props.marker)}px
  );
  top: -14px;
`;

const Span = styled.span`
  font-weight: 600;
`;

/* eslint-disable */
const Bar = styled.div`
  width: 12px;
  height: 12px;
  padding: 1px;
  position: absolute;
  text-align: center;
  display: block;
  transition: 0.5s all;
  color: ${props => (props.full ? 'white' : '#3e556b')};
  top: 11px;
  opacity: ${props => (props.full ? '1' : '1')};
  border-radius: 50%;
  background: ${props => (props.full ? (props.isNegative ? '#EF5350' : '#3CBB98') : '#d6d6d6')};
  font-size: 8px;
  left: -6px;
  cursor: pointer;
`;
/* eslint-enable */

const Marker = props => (
  <Container position={props.position} marker={props.marker}>
    <Tooltip
      delayMilliseconds={0}
      style={{ width: 200 }}
      trigger={
        <Bar full={props.fillerSettings.isFilled} isNegative={props.fillerSettings.isNegative}>
          {props.type === 'SL' && <FontAwesomeIcon icon={faShieldAlt} />}
          {props.type === 'S' && <FontAwesomeIcon icon={faArrowAltDown} />}
          {props.type === 'AVG' && <FontAwesomeIcon icon={faTilde} />}
          {props.type === 'B' && <FontAwesomeIcon icon={faArrowAltUp} />}
          {props.type === 'TTP' && (
            <FontAwesomeIcon icon={props.fillerSettings.isFilled ? faHourglass : faFlag} />
          )}
        </Bar>
      }
      size="small"
    >
      <p>
        <Span>
          {props.type === 'SL' && (
            <React.Fragment>
              {props.marker.stopLossType === 'FixedStopLoss'
                ? 'Fixed Stop Loss'
                : 'Trailing Stop Loss'}
            </React.Fragment>
          )}
          {props.type === 'S' && 'Sell layer'}
          {props.type === 'AVG' && 'Average buy price'}
          {props.type === 'B' && 'Buy layer'}
          {props.type === 'TTP' && 'Trailing take profit target'}
        </Span>
      </p>
      {props.type === 'TTP' && (
        <React.Fragment>
          <p>
            <Span>Trailing started:</Span>{' '}
            <span style={{ textTransform: 'capitalize' }}>
              {String(props.marker.hasTrailingStarted)}
            </span>
          </p>
          <p>
            <Span>Trailing Margin Percent:</Span> {props.marker.trailingMarginPercent}%
          </p>
        </React.Fragment>
      )}
      <p>
        <Span>Price:</Span> {props.marker.price}
      </p>
      {props.type === 'B' && (
        <p>
          <Span>Amount Filled/Amount:</Span> {props.marker.amountFilled}/{props.marker.amount}
        </p>
      )}
    </Tooltip>
  </Container>
);

Marker.propTypes = {
  position: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  marker: PropTypes.object.isRequired,
  fillerSettings: PropTypes.object.isRequired
};

export default Marker;
