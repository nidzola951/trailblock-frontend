import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@zendeskgarden/react-grid';
import { Table, Head, Body, Row, HeaderCell } from '@zendeskgarden/react-tables';
import { Pagination } from '@zendeskgarden/react-pagination';
import { Dots } from '@zendeskgarden/react-loaders';

import { faHistory } from '@fortawesome/pro-regular-svg-icons';

import SingleTrade from './SingleTrade/SingleTrade';
import EmptyPlaceholder from '../../../../components/EmptyPlaceholder';

import { getPagedData, getInfo } from '../../../../utils/helpers';
import TitleBox from '../../../../components/TitleBox';

export default class ClosedTrades extends React.Component {
  state = {
    currentPage: 1,
    pageSize: 10
  };
  componentDidMount() {
    const { loadClosedTrades } = { ...this.props.actions };
    loadClosedTrades();
  }

  render() {
    const totalPages = !this.props.closedTradesInitialLoad
      ? Math.ceil(this.props.closedTrades.closed.length / this.state.pageSize)
      : 0;
    return (
      <Grid>
        <TitleBox
          title="Closed Trades"
          icon={faHistory}
          paddingBottom={0}
          paddingLeft={0}
          paddingTop={0}
          paddingRight={0}
        >
          {this.props.closedTradesInitialLoad && (
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
          {!this.props.closedTradesInitialLoad && (
            <React.Fragment>
              {this.props.closedTrades.closed.length ? (
                <React.Fragment>
                  <Table size="small">
                    <Head>
                      <Row header style={{ height: 33 }}>
                        <HeaderCell style={{ padding: '10px 5px' }} width="30px" />
                        <HeaderCell scope="col" style={{ padding: '10px' }}>
                          Date started
                        </HeaderCell>
                        <HeaderCell scope="col" style={{ padding: '10px' }}>
                          Symbol
                        </HeaderCell>
                        <HeaderCell scope="col" style={{ padding: '10px' }}>
                          Amount
                        </HeaderCell>
                        <HeaderCell scope="col" style={{ padding: '10px' }}>
                          AVG Buy Price
                        </HeaderCell>
                        <HeaderCell scope="col" style={{ padding: '10px' }}>
                          AVG Sell Price
                        </HeaderCell>
                        <HeaderCell scope="col" style={{ padding: '10px' }}>
                          Total
                        </HeaderCell>
                        <HeaderCell colSpan={2} scope="col" style={{ padding: '10px' }}>
                          Status
                        </HeaderCell>
                      </Row>
                    </Head>
                    <Body>
                      {getPagedData(
                        this.props.closedTrades.closed,
                        this.state.currentPage,
                        this.state.pageSize
                      ).map(closedTrade => (
                        <SingleTrade
                          key={closedTrade.id}
                          trade={closedTrade}
                          info={getInfo(this.props.tickerInfo, closedTrade.symbol)}
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
                <EmptyPlaceholder title="No closed trades" />
              )}
            </React.Fragment>
          )}
        </TitleBox>
      </Grid>
    );
  }
}

ClosedTrades.propTypes = {
  actions: PropTypes.object.isRequired,
  closedTrades: PropTypes.object.isRequired,
  closedTradesInitialLoad: PropTypes.bool.isRequired,
  tickerInfo: PropTypes.object.isRequired
};
