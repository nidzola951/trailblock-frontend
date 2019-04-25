import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Grid, Row, Col } from '@zendeskgarden/react-grid';
import { Tabs, TabPanel } from '@zendeskgarden/react-tabs';
import { Dots } from '@zendeskgarden/react-loaders';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faUserChart, faBalanceScaleLeft } from '@fortawesome/pro-regular-svg-icons';
import { faBitcoin } from '@fortawesome/free-brands-svg-icons';
import '../../../../assets/global-styles/tab.scss';

import BalancesHistory from './BalancesHistory';
import ProfitHistory from './ProfitHistory';

import { percentageDifference } from '../../../../utils/helpers';
import TitleBox from '../../../../components/TitleBox';

const BalanceChange = styled.div`
  padding-top: 15px;
  padding-bottom: 30px;
`;

const BalancePercent = styled.span`
  color: ${props => props.color};
  font-weight: 600;
  padding-left: 7px;
`;

export default class Charts extends React.Component {
  state = {
    selectedKey: 'tab-1'
  };
  componentDidMount() {
    this.props.actions.loadBalancesHistory();
  }
  getPercentageGrowth = () => {
    if (this.props.chartData.balancesHistory.data.length) {
      const first = this.props.chartData.balancesHistory.data[0].balance;
      const last = this.props.chartData.balancesHistory.data[
        this.props.chartData.balancesHistory.data.length - 1
      ].balance;
      if (Number(first) > Number(last)) {
        return (
          <BalancePercent color="#EF5350">{percentageDifference(first, last)}%</BalancePercent>
        );
      }
      return <BalancePercent color="#3CBB98">+{percentageDifference(first, last)}%</BalancePercent>;
    }
    return <BalancePercent color="#3CBB98" />;
  };
  render() {
    return (
      <Grid>
        <Row>
          <Col md={6}>
            <TitleBox
              title="Total Balance"
              icon={faBalanceScaleLeft}
              paddingTop={10}
              paddingBottom={20}
            >
              {this.props.loading ? (
                <Dots />
              ) : (
                <React.Fragment>
                  <BalanceChange>
                    <p style={{ color: '#707A84' }}>
                      <FontAwesomeIcon
                        icon={faBitcoin}
                        style={{
                          marginRight: 7,
                          color: 'rgb(126,154,168)'
                        }}
                      />
                      Change over 7 days: {this.getPercentageGrowth()}
                    </p>
                  </BalanceChange>
                  <BalancesHistory
                    data={this.props.chartData.balancesHistory.data}
                    min={this.props.chartData.balancesHistory.min}
                    max={this.props.chartData.balancesHistory.max}
                  />
                </React.Fragment>
              )}
            </TitleBox>
          </Col>
          <Col md={6}>
            <TitleBox
              title="Trading Performance"
              icon={faUserChart}
              paddingTop={10}
              paddingBottom={20}
            >
              {this.props.loading ? (
                <Dots />
              ) : (
                <Tabs
                  selectedKey={this.state.selectedKey}
                  onChange={selectedKey => this.setState({ selectedKey })}
                >
                  <TabPanel label="BTC" key="tab-1">
                    <ProfitHistory
                      data={this.props.chartData.profitHistory.btc.data}
                      min={this.props.chartData.profitHistory.btc.min}
                      max={this.props.chartData.profitHistory.btc.max}
                      symbol="BTC"
                    />
                  </TabPanel>
                  <TabPanel label="ETH" key="tab-2">
                    <ProfitHistory
                      data={this.props.chartData.profitHistory.eth.data}
                      min={this.props.chartData.profitHistory.eth.min}
                      max={this.props.chartData.profitHistory.eth.max}
                      symbol="ETH"
                    />
                  </TabPanel>
                  <TabPanel label="BNB" key="tab-4">
                    <ProfitHistory
                      data={this.props.chartData.profitHistory.bnb.data}
                      min={this.props.chartData.profitHistory.bnb.min}
                      max={this.props.chartData.profitHistory.bnb.max}
                      symbol="BNB"
                    />
                  </TabPanel>
                  <TabPanel label="USD" key="tab-3">
                    <ProfitHistory
                      data={this.props.chartData.profitHistory.usd.data}
                      min={this.props.chartData.profitHistory.usd.min}
                      max={this.props.chartData.profitHistory.usd.max}
                      symbol="USD"
                    />
                  </TabPanel>
                </Tabs>
              )}
            </TitleBox>

            <p style={{ fontSize: 10, marginBottom: 40, opacity: 0.5, marginTop: -40 }}>
              *Only trades made trough Trailblock are taken into account
            </p>
          </Col>
        </Row>
      </Grid>
    );
  }
}

Charts.propTypes = {
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  chartData: PropTypes.object.isRequired
};
