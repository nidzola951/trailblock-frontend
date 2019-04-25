import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@zendeskgarden/react-grid';
import { Table, Head, Body, Row, HeaderCell } from '@zendeskgarden/react-tables';
import { Pagination } from '@zendeskgarden/react-pagination';
import { Dots } from '@zendeskgarden/react-loaders';

import { faClock } from '@fortawesome/pro-regular-svg-icons';

import TitleBox from '../../../../components/TitleBox';
import SingleTrade from './SingleTrade/SingleTrade';
import EmptyPlaceholder from '../../../../components/EmptyPlaceholder';

import { getPagedData, getInfo } from '../../../../utils/helpers';

export default class OpenTrades extends React.Component {
  state = {
    currentPage: 1,
    pageSize: 10
  };
  componentDidMount() {
    const { loadOpenTrades, loadLastPrices } = { ...this.props.actions };
    loadOpenTrades();

    this.intervalFunction = setInterval(() => {
      loadOpenTrades();
      loadLastPrices();
    }, 3000);
  }
  componentWillUnmount = () => {
    clearInterval(this.intervalFunction);
  };

  render() {
    const totalPages = !this.props.openTradesInitialLoad
      ? Math.ceil(this.props.openTrades.open.length / this.state.pageSize)
      : 0;
    return (
      <Grid>
        <TitleBox
          title="Open trades"
          icon={faClock}
          paddingBottom={0}
          paddingLeft={0}
          paddingTop={0}
          paddingRight={0}
        >
          {this.props.openTradesInitialLoad && (
            <div
              style={{
                padding: 20,
                paddingBottom: 15,
                textAlign: 'center',
                fontSize: 30,
                color: '#3CBB98'
              }}
            >
              <Dots />
            </div>
          )}
          {!this.props.openTradesInitialLoad && !this.props.lastPricesInitialLoad ? (
            <React.Fragment>
              {this.props.openTrades.open.length ? (
                <React.Fragment>
                  <Table>
                    <Head>
                      <Row header style={{ height: 33 }}>
                        <HeaderCell scope="col" width="100px" style={{ padding: '10px' }}>
                          Date
                        </HeaderCell>
                        <HeaderCell scope="col" width="90px" style={{ padding: '10px' }}>
                          Symbol
                        </HeaderCell>
                        <HeaderCell scope="col" width="120px" style={{ padding: '10px' }}>
                          Amount
                        </HeaderCell>
                        <HeaderCell scope="col" style={{ padding: '10px' }}>
                          Status
                        </HeaderCell>
                        <HeaderCell menu style={{ padding: '10px' }} width="100px" />
                      </Row>
                    </Head>
                    <Body>
                      {getPagedData(
                        this.props.openTrades.open,
                        this.state.currentPage,
                        this.state.pageSize
                      ).map(openTrade => (
                        <SingleTrade
                          key={openTrade.id}
                          openTrade={openTrade}
                          highestPrice={this.props.openTrades.highest[openTrade.id]}
                          info={getInfo(this.props.tickerInfo, [openTrade.symbol])}
                          price={this.props.lastPrices[openTrade.symbol]}
                        />
                      ))}
                    </Body>
                  </Table>
                  {totalPages !== 1 && (
                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                      <Pagination
                        totalPages={totalPages}
                        currentPage={this.state.currentPage}
                        onChange={currentPage => this.setState({ currentPage })}
                      />
                    </div>
                  )}
                </React.Fragment>
              ) : (
                <EmptyPlaceholder title="No open trades" />
              )}
            </React.Fragment>
          ) : (
            <div
              style={{
                padding: 20,
                paddingBottom: 15,
                textAlign: 'center',
                fontSize: 20
              }}
            >
              <Dots />
            </div>
          )}
        </TitleBox>
      </Grid>
    );
  }
}

OpenTrades.propTypes = {
  actions: PropTypes.object.isRequired,
  openTrades: PropTypes.object.isRequired,
  openTradesInitialLoad: PropTypes.bool.isRequired,
  lastPrices: PropTypes.object.isRequired,
  lastPricesInitialLoad: PropTypes.bool.isRequired,
  tickerInfo: PropTypes.object.isRequired
};
