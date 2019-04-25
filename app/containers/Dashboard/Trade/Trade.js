import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import TradingViewWidget from 'react-tradingview-widget';

import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChartLine, faChartLineDown } from '@fortawesome/pro-regular-svg-icons';

import WalletBalance from './WalletBalance';
import InfoBar from './InfoBar/';
import BuyTools from './BuyToolsSection/';
import OpenTrades from '../Overview/OpenTrades';

import { Box, TabButton, DisabledTabButton } from '../../../assets/global-styles/GlobalComponents';
import { formatNumberToTickSizeLength, getTickSize, formatSymbol } from '../../../utils/helpers';
import config from '../../../config/config';
import request from '../../../utils/request';

const TradeToolsContainer = styled(Col)`
  @media screen and (max-width: 1000px) {
    border-top: 1px solid #d8dcde;
    padding-top: 30px;
  }
  @media screen and (min-width: 1200px) {
    border-left: 1px solid #d8dcde;
    padding-left: 30px !important;
  }
`;

export default class Trade extends React.Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    symbolID: PropTypes.string.isRequired,
    prices: PropTypes.object.isRequired,
    tickerInfo: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.streams = ['@ticker', '@depth20', '@trade'];
  }

  componentWillMount() {
    this.checkSymbol();
  }
  componentDidUpdate = prevProps => {
    if (prevProps.symbolID !== this.props.symbolID) {
      let streams = this.streams.map(i => `${prevProps.symbolID.toLowerCase()}${i}`);
      streams = streams.join('/');
      const connection = btoa(streams);
      if (this[connection]) {
        this.disconnectSocketStreams(
          this.streams.map(i => `${prevProps.symbolID.toLowerCase()}${i}`)
        );
      }
      this.fetchPrice(this.props.symbolID);
      this.connectSocketStreams(this.streams.map(i => `${this.props.symbolID.toLowerCase()}${i}`));
    }
  };
  componentWillUnmount = () => {
    this.disconnectSocketStreams(this.streams.map(i => `${this.props.symbolID.toLowerCase()}${i}`));
  };
  connectSocketStreams(streams) {
    // eslint-disable-next-line
    streams = streams.join('/');
    const connection = btoa(streams);
    this[connection] = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
    this[connection].onmessage = evt => {
      const eventData = JSON.parse(evt.data);
      if (
        eventData.stream.endsWith('@ticker') &&
        eventData.stream.startsWith(this.props.symbolID.toLowerCase())
      ) {
        const prices = {
          symbolID: eventData.data.s,
          dayChange: eventData.data.p,
          dayChangePercent: eventData.data.P,
          bid: eventData.data.b,
          ask: eventData.data.a,
          lastPrice: eventData.data.c
        };
        this.props.actions.pricesLoaded(prices);
      }
    };
    this[connection].onerror = evt => {
      console.error(evt);
    };
  }
  disconnectSocketStreams(streams) {
    // eslint-disable-next-line
    streams = streams.join('/');
    const connection = btoa(streams);
    if (this[connection].readyState === WebSocket.OPEN) {
      this[connection].close();
    }
  }
  fetchPrice = symbolID => {
    const requestURL = `${config.binanceApi}/info/${symbolID}`;
    const options = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log('odje');

    request(requestURL, options).then(data => {
      console.log(data);
      const prices = {
        symbolID: data[0].s,
        dayChange: data[0].p,
        dayChangePercent: data[0].P,
        bid: data[0].b,
        ask: data[0].a,
        lastPrice: data[0].c
      };
      console.log(prices);
      this.props.actions.pricesLoaded(prices);
    });
  };
  initData(symbolID) {
    this.connectSocketStreams(this.streams.map(i => `${symbolID.toLowerCase()}${i}`));
  }
  checkSymbol() {
    const { symbolID } = { ...this.props.match.params };
    if (symbolID !== this.props.symbolID) {
      this.props.actions.setSymbolID(symbolID);
    }
    this.initData(symbolID);
    this.fetchPrice(symbolID);
  }

  render() {
    return (
      <React.Fragment>
        <Helmet
          titleTemplate="%s - Tools for trading cryptocurrencies"
          defaultTitle={`${formatNumberToTickSizeLength(
            this.props.prices.lastPrice,
            getTickSize(this.props.tickerInfo, this.props.symbolID)
          )} ${formatSymbol(this.props.symbolID)}`}
        />
        <Grid>
          <Box style={{ padding: 20 }}>
            <InfoBar />
            <Row style={{ marginTop: 20 }}>
              <Col md={12}>
                <div style={{ height: 400, marginBottom: 30 }}>
                  <TradingViewWidget symbol={`BINANCE:${this.props.symbolID}`} autosize />
                </div>
              </Col>
            </Row>
            <Row>
              <Col xl={2} style={{ marginBottom: 10 }}>
                <Row>
                  <Col md={6} xl={12}>
                    <TabButton active noBackground>
                      <FontAwesomeIcon icon={faChartLine} className="icon" />
                      Buy tools
                    </TabButton>
                  </Col>
                  <Col md={6} xl={12}>
                    <DisabledTabButton>
                      <FontAwesomeIcon icon={faChartLineDown} className="icon" />
                      Sell tools
                    </DisabledTabButton>
                  </Col>
                </Row>
              </Col>
              <TradeToolsContainer xl={10}>
                <Row>
                  <Col md={12}>
                    <WalletBalance tab="buy" />
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <BuyTools />
                  </Col>
                </Row>
              </TradeToolsContainer>
            </Row>
          </Box>
        </Grid>
        <OpenTrades />
      </React.Fragment>
    );
  }
}
