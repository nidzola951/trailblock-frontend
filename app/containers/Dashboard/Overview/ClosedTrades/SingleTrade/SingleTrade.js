import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faCheck,
  faTimes,
  faQuestionCircle,
  faShieldAlt
} from '@fortawesome/pro-regular-svg-icons';
import { Tooltip } from '@zendeskgarden/react-tooltips';

import { Table, Head, Body, Row, HeaderCell, Cell } from '@zendeskgarden/react-tables';
import { InfoLink } from '../../../../../assets/global-styles/GlobalComponents';
import {
  TableRowContainer,
  TransparentTR,
  MoreInfoButton,
  MoreInfoContainer,
  TableContainer,
  TableContainerTitle,
  Description
} from './SingleTradeStyles';

import {
  formatDate,
  add,
  formatSymbol,
  multiply,
  divide,
  formatNumberToTickSizeLength,
  splitSymbol
} from '../../../../../utils/helpers';
import { formatStatus } from './FormatingFunctions';

export default class SingleTrade extends React.Component {
  state = {
    showMoreInfo: false
  };
  getTotalBought = () => {
    let total = '0';
    this.props.trade.buyLayers.trades.forEach(trade => {
      total = add(total, multiply(trade.averagePrice, trade.amountFilled));
    });
    return total;
  };
  getTotalSold = () => {
    let total = '0';
    this.props.trade.sellLayers.forEach(trade => {
      if (trade.trade) {
        total = add(total, multiply(trade.trade.averagePrice, trade.trade.amountFilled));
      }
    });
    if (this.props.trade.extraSellTrade) {
      total = add(
        total,
        multiply(
          this.props.trade.extraSellTrade.averagePrice,
          this.props.trade.extraSellTrade.amountFilled
        )
      );
    }
    return total;
  };

  getTotalAmountBought = () => {
    console.log('amount bought');
    let amount = '0';
    this.props.trade.buyLayers.trades.forEach(layer => {
      amount = add(amount, layer.amountFilled);
    });

    return amount;
  };
  getTotalAmountSold = () => {
    let amount = '0';
    this.props.trade.sellLayers.forEach(trade => {
      if (trade.trade) {
        amount = add(amount, trade.trade.amountFilled);
      }
    });
    if (this.props.trade.extraSellTrade) {
      amount = add(amount, this.props.trade.extraSellTrade.amountFilled);
    }
    return amount;
  };
  toggleMoreInfo = () => {
    const { showMoreInfo } = { ...this.state };
    this.setState({
      showMoreInfo: !showMoreInfo
    });
  };

  render() {
    const totalBought = this.getTotalBought();
    const totalSold = this.getTotalSold();
    const totalAmountBought = this.getTotalAmountBought();
    const totalSoldAmount = this.getTotalAmountSold();
    const AVGBuyPrice = divide(totalBought, totalAmountBought);
    const AVGSellPrice = divide(totalSold, totalSoldAmount);
    return (
      <TableRowContainer>
        <Cell colSpan={9} style={{ padding: 0, border: 'none' }}>
          <Table>
            <Body>
              <TransparentTR>
                <Cell width="30px" style={{ padding: '10px 5px' }}>
                  <MoreInfoButton onClick={this.toggleMoreInfo}>
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      style={{ verticalAlign: 'middle', marginTop: -2, transition: '0.2s all' }}
                      rotation={this.state.showMoreInfo ? 180 : null}
                    />
                  </MoreInfoButton>
                </Cell>
                <Cell>
                  {moment(new Date(formatDate(this.props.trade.id))).format('DD/MM/YYYY')}
                </Cell>
                <Cell>{formatSymbol(this.props.trade.symbol)}</Cell>
                <Cell>{totalAmountBought !== '0' ? totalAmountBought : ''}</Cell>
                <Cell>
                  {AVGBuyPrice !== '0'
                    ? `${formatNumberToTickSizeLength(
                        AVGBuyPrice,
                        this.props.info.tickSize
                      )} ${splitSymbol(this.props.trade.symbol, 2)}`
                    : ''}
                </Cell>

                <Cell>
                  {AVGSellPrice !== '0'
                    ? `${formatNumberToTickSizeLength(
                        AVGSellPrice,
                        this.props.info.tickSize
                      )} ${splitSymbol(this.props.trade.symbol, 2)}`
                    : ''}
                </Cell>
                <Cell>
                  {totalBought !== '0'
                    ? `${totalBought} ${splitSymbol(this.props.trade.symbol, 2)}`
                    : ''}
                </Cell>
                <Cell colSpan={2}>
                  {formatStatus(
                    totalBought,
                    totalSold,
                    totalAmountBought,
                    totalSoldAmount,
                    AVGBuyPrice,
                    AVGSellPrice,
                    this.props.trade
                  )}
                </Cell>
              </TransparentTR>
            </Body>
          </Table>

          <MoreInfoContainer show={this.state.showMoreInfo}>
            <TableContainer>
              <TableContainerTitle>Buy Layers</TableContainerTitle>
              {this.props.trade.buyLayers.trades.length === 0 ? (
                <Description>Trade had no buy layers set</Description>
              ) : (
                <Table>
                  <Head>
                    <Row header style={{ height: 33 }}>
                      <HeaderCell colSpan={2} scope="col" style={{ padding: '10px' }}>
                        Time completed
                      </HeaderCell>
                      <HeaderCell scope="col" style={{ padding: '10px' }}>
                        Amount
                      </HeaderCell>
                      <HeaderCell scope="col" style={{ padding: '10px' }}>
                        Filled
                      </HeaderCell>
                      <HeaderCell scope="col" style={{ padding: '10px' }}>
                        Average price
                      </HeaderCell>
                      <HeaderCell scope="col" style={{ padding: '10px' }}>
                        Order type
                      </HeaderCell>
                      <HeaderCell colSpan={2} scope="col" style={{ padding: '10px' }}>
                        Status
                      </HeaderCell>
                    </Row>
                  </Head>
                  <Body>
                    {this.props.trade.buyLayers.trades.map(item => (
                      <Row key={item.id}>
                        <Cell colSpan={2}>
                          {moment(new Date(formatDate(item.timeCompleted))).format(
                            'DD/MM/YYYY HH:MM'
                          )}
                        </Cell>
                        <Cell>{item.amount}</Cell>
                        <Cell>{item.amountFilled}</Cell>
                        <Cell>
                          {formatNumberToTickSizeLength(
                            item.averagePrice,
                            this.props.info.tickSize
                          )}{' '}
                          {splitSymbol(item.symbol, 2)}
                        </Cell>
                        <Cell>{item.orderType}</Cell>
                        <Cell colSpan={2}>
                          {item.tradeState === 'Filled' && (
                            <FontAwesomeIcon
                              icon={faCheck}
                              style={{ color: '#27A59B', marginRight: 6 }}
                            />
                          )}
                          {item.tradeState === 'Canceled' && (
                            <FontAwesomeIcon
                              icon={faTimes}
                              style={{ color: '#EF534F', marginRight: 6 }}
                            />
                          )}
                          {item.tradeState === 'Canceled' && item.amountFilled !== '0' ? (
                            <React.Fragment>Partially filled and canceled</React.Fragment>
                          ) : (
                            <React.Fragment>{item.tradeState}</React.Fragment>
                          )}
                        </Cell>
                      </Row>
                    ))}
                    {this.props.trade.buyLayers.trades.length === 0 && (
                      <Row>
                        <Cell style={{ padding: '10px 5px' }} width="30px" />
                        <Cell colSpan={6}>Trade had no buy layers set</Cell>
                      </Row>
                    )}
                  </Body>
                </Table>
              )}
            </TableContainer>
            <TableContainer>
              <TableContainerTitle>Sell Layers</TableContainerTitle>
              {this.props.trade.sellLayers.length === 0 ? (
                <Description>Trade had no sell layers set</Description>
              ) : (
                <Table>
                  <Head>
                    <Row header style={{ height: 33 }}>
                      <HeaderCell colSpan={2} scope="col" style={{ padding: '10px' }}>
                        Order type
                      </HeaderCell>
                      <HeaderCell scope="col" style={{ padding: '10px' }}>
                        Percent to sell
                      </HeaderCell>
                      <HeaderCell scope="col" style={{ padding: '10px' }}>
                        Profit target
                      </HeaderCell>
                      <HeaderCell scope="col" style={{ padding: '10px' }}>
                        Filled/Amount
                      </HeaderCell>
                      <HeaderCell scope="col" style={{ padding: '10px' }}>
                        Price
                      </HeaderCell>
                      <HeaderCell colSpan={2} scope="col" style={{ padding: '10px' }}>
                        Status
                      </HeaderCell>
                    </Row>
                  </Head>
                  <Body>
                    {this.props.trade.sellLayers.map(item => (
                      <Row key={item.id}>
                        <Cell colSpan={2}>
                          {item.sellLayerType === 'LimitSellLayer' && 'Limit'}{' '}
                          {item.sellLayerType === 'TrailingSellLayer' &&
                            `Trailing - ${multiply(
                              item.trailingMarginPercent,
                              '100'
                            )}% trailing margin`}
                        </Cell>
                        <Cell>{multiply(item.amountPercent, '100')}%</Cell>
                        <Cell>{multiply(item.profitMarginPercent, '100')}%</Cell>
                        {item.trade ? (
                          <React.Fragment>
                            <Cell>
                              {item.trade.amountFilled}/{item.trade.amount}
                            </Cell>
                            <Cell>
                              {item.trade.averagePrice
                                ? formatNumberToTickSizeLength(
                                    item.trade.averagePrice,
                                    this.props.info.tickSize
                                  )
                                : formatNumberToTickSizeLength(
                                    item.trade.price,
                                    this.props.info.tickSize
                                  )}{' '}
                              {splitSymbol(item.trade.symbol, 2)}
                            </Cell>
                            <Cell colSpan={2}>
                              {item.trade.tradeState === 'Filled' && (
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  style={{ color: '#27A59B', marginRight: 6 }}
                                />
                              )}
                              {item.trade.tradeState === 'Canceled' && (
                                <FontAwesomeIcon
                                  icon={faTimes}
                                  style={{ color: '#EF534F', marginRight: 6 }}
                                />
                              )}
                              {item.trade.tradeState === 'Canceled' &&
                              item.trade.amountFilled !== '0' ? (
                                <React.Fragment>Partially filled and canceled</React.Fragment>
                              ) : (
                                <React.Fragment>{item.trade.tradeState}</React.Fragment>
                              )}
                            </Cell>
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <Cell />
                            <Cell />
                            <Cell colSpan={2}>
                              <span style={{ marginRight: 7 }}>Not executed</span>
                              <Tooltip trigger={<InfoLink icon={faQuestionCircle} />} size="small">
                                Click here to find out why this could have happened
                              </Tooltip>
                            </Cell>
                          </React.Fragment>
                        )}
                      </Row>
                    ))}
                    {this.props.trade.extraSellTrade && (
                      <Row>
                        <Cell colSpan={2}>Extra sell - Market</Cell>
                        <Cell />
                        <Cell />
                        <Cell>
                          {this.props.trade.extraSellTrade.amountFilled}/
                          {this.props.trade.extraSellTrade.amount}
                        </Cell>
                        <Cell>
                          {this.props.trade.extraSellTrade.averagePrice
                            ? formatNumberToTickSizeLength(
                                this.props.trade.extraSellTrade.averagePrice,
                                this.props.info.tickSize
                              )
                            : formatNumberToTickSizeLength(
                                this.props.trade.extraSellTrade.price,
                                this.props.info.tickSize
                              )}{' '}
                          {splitSymbol(this.props.trade.extraSellTrade.symbol, 2)}
                        </Cell>
                        <Cell colSpan={2}>
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ color: '#27A59B', marginRight: 6 }}
                          />
                          Filled
                        </Cell>
                      </Row>
                    )}
                  </Body>
                </Table>
              )}
            </TableContainer>
            <TableContainer>
              <TableContainerTitle>Stop-Loss</TableContainerTitle>
              {this.props.trade.stopLoss ? (
                <Table>
                  <Head>
                    <Row header style={{ height: 33 }}>
                      <HeaderCell colSpan={2} scope="col" style={{ padding: '10px' }}>
                        Stop-loss type
                      </HeaderCell>
                      <HeaderCell colSpan={3} scope="col" style={{ padding: '10px' }}>
                        Price
                      </HeaderCell>
                      <HeaderCell colSpan={3} scope="col" style={{ padding: '10px' }}>
                        Status
                      </HeaderCell>
                    </Row>
                  </Head>
                  <Body>
                    <Row>
                      {this.props.trade.stopLoss.stopLossType === 'FixedStopLoss' && (
                        <React.Fragment>
                          <Cell colSpan={2}>Fixed stop-loss</Cell>
                          <Cell colSpan={3}>
                            {this.props.trade.stopLoss.stopLossPrice}{' '}
                            {splitSymbol(this.props.trade.symbol, 2)}
                          </Cell>
                        </React.Fragment>
                      )}
                      {this.props.trade.stopLoss.stopLossType === 'TrailingStopLoss' && (
                        <React.Fragment>
                          <Cell colSpan={2}>Trailing stop-loss</Cell>
                          <Cell colSpan={3}>
                            {multiply(this.props.trade.stopLoss.percentMargin, '100')}% below
                            highest price
                          </Cell>
                        </React.Fragment>
                      )}
                      <Cell colSpan={3}>
                        {this.props.trade.stopLoss.soldToStopLoss ? (
                          <React.Fragment>
                            <FontAwesomeIcon
                              icon={faShieldAlt}
                              style={{
                                marginRight: 6,
                                opacity: 1
                              }}
                            />
                            Sold to stop-loss
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            <FontAwesomeIcon
                              icon={faShieldAlt}
                              style={{
                                marginRight: 6,
                                opacity: 0.5
                              }}
                            />
                            Stop-loss not triggered
                          </React.Fragment>
                        )}
                      </Cell>
                    </Row>
                  </Body>
                </Table>
              ) : (
                <Description>Trade had no stop-loss set</Description>
              )}
            </TableContainer>
          </MoreInfoContainer>
        </Cell>
      </TableRowContainer>
    );
  }
}

SingleTrade.propTypes = {
  trade: PropTypes.object.isRequired,
  info: PropTypes.object.isRequired
};
