import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@zendeskgarden/react-grid';

import TickerPicker from './TickerPicker';
import InfoBlock from './InfoBlock/InfoBlock';

import { formatNumberToTickSizeLength, getTickSize } from '../../../../utils/helpers';

const InfoBar = props => (
  <Row>
    <Col md={8}>
      <Row>
        <Col md={6}>
          <TickerPicker />
        </Col>
        <Col md={2}>
          <InfoBlock
            firstLine="Lowest ask"
            secondLine={
              props.symbolID === props.prices.symbolID
                ? formatNumberToTickSizeLength(
                    props.prices.ask,
                    getTickSize(props.tickerInfo, props.symbolID)
                  )
                : ''
            }
          />
        </Col>
        <Col md={2}>
          <InfoBlock
            firstLine="Highest bid"
            secondLine={
              props.symbolID === props.prices.symbolID
                ? formatNumberToTickSizeLength(
                    props.prices.bid,
                    getTickSize(props.tickerInfo, props.symbolID)
                  )
                : ''
            }
          />
        </Col>
      </Row>
    </Col>
  </Row>
);

InfoBar.propTypes = {
  symbolID: PropTypes.string.isRequired,
  prices: PropTypes.object.isRequired,
  tickerInfo: PropTypes.object.isRequired
};

export default InfoBar;
