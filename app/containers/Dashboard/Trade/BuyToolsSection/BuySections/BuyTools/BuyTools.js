import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from '@zendeskgarden/react-grid';
import { Input, Label, TextField, Message } from '@zendeskgarden/react-textfields';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown, faInfo } from '@fortawesome/pro-regular-svg-icons';
import { faPlusCircle } from '@fortawesome/pro-solid-svg-icons';

import Checkbox from '../../../../../../components/Checkbox';
import {
  ButtonLink,
  InputDecoratorIndeted,
  ControlButtonUp,
  ControlButtonDown,
  InputDecorator,
  ButtonMini,
  HelpLink
} from '../Styles';

import * as f from './functions';
import {
  splitSymbol,
  formatNumberToTickSize,
  add,
  subtract,
  divide,
  multiply
} from '../../../../../../utils/helpers';

export default class BuyTools extends React.Component {
  setPriceToBid = () => {
    this.props.setBuyFormData(
      'buyPrice',
      formatNumberToTickSize(this.props.prices.bid, this.props.info.tickSize)
    );
  };

  setPriceToAsk = () => {
    this.props.setBuyFormData(
      'buyPrice',
      formatNumberToTickSize(this.props.prices.ask, this.props.info.tickSize)
    );
  };

  setPercent = percent => {
    if (this.props.buyPrice === '') return;
    const { buyPrice } = { ...this.props };

    let total = multiply(this.props.balance, percent);
    const buyAmount = formatNumberToTickSize(divide(total, buyPrice), this.props.info.minQty);

    total = multiply(buyAmount, buyPrice);
    this.props.setBuyFormData('total', total);
    this.props.setBuyFormData('buyAmount', buyAmount);
  };

  incPrice = () => {
    if (this.props.buyPrice === '') return;
    const priceInc = add(this.props.buyPrice, this.props.info.tickSize);
    this.props.setBuyFormData(
      'buyPrice',
      formatNumberToTickSize(priceInc, this.props.info.tickSize)
    );
  };

  decPrice = () => {
    if (this.props.buyPrice === '') return;
    const priceDec = subtract(this.props.buyPrice, this.props.info.tickSize);
    this.props.setBuyFormData(
      'buyPrice',
      formatNumberToTickSize(priceDec, this.props.info.tickSize)
    );
  };

  invalidateErrors = event => {
    const targetName = event.target.name;
    if (targetName === 'buyPrice' && this.props.errorBuyNoPrice) {
      this.props.setErrorData('buyNoPrice', false);
    }
    if (targetName === 'buyAmount' && this.props.errorBuyNoAmount) {
      this.props.setErrorData('buyNoAmount', false);
    }
    if (targetName === 'buyAmount' && this.props.errorBuyAmountTooBig) {
      this.props.setErrorData('buyAmountTooBig', false);
    }
    if (
      (targetName === 'buyAmount' || targetName === 'total') &&
      this.props.errorBuyAmountTooSmall
    ) {
      this.props.setErrorData('buyAmountTooSmall', false);
    }
    this.props.setErrorData('buyNotFilledOut', false);
  };

  handleDataInput = event => {
    const regex = RegExp(/^[0-9.]+$/);

    const targetName = event.target.name;
    let targetValue = event.target.value;

    if (targetValue === '.') {
      targetValue = '0.';
    }

    if (regex.test(targetValue) || targetValue === '') {
      if (targetName === 'buyPrice') {
        this.props.setBuyFormData(
          targetName,
          formatNumberToTickSize(targetValue, this.props.info.tickSize)
        );
      }
      if (targetName === 'buyAmount') {
        this.props.setBuyFormData(
          targetName,
          formatNumberToTickSize(targetValue, this.props.info.minQty)
        );
      }
      if (targetName === 'total') {
        this.props.setBuyFormData(targetName, formatNumberToTickSize(targetValue, '0.00000001'));
      }
    }
  };

  handleCheckboxClick = event => {
    const targetName = event.target.name;
    const targetValue = event.currentTarget.checked;
    this.props.setBuyFormData(targetName, targetValue);
  };

  render() {
    const { symbolID, buyPrice, isMarketPrice, buyAmount, total } = { ...this.props };

    return (
      <React.Fragment>
        <TextField style={{ marginBottom: 6 }}>
          <Row>
            <Col md={3} style={{ paddingTop: 3 }}>
              <Label htmlFor="buyPrice">Price:</Label>
            </Col>
            <Col md={9}>
              <Input
                placeholder={f.isMarketPlaceholder(isMarketPrice, 'Buy price')}
                on
                value={f.getValue(isMarketPrice, buyPrice)}
                onChange={this.handleDataInput}
                disabled={isMarketPrice}
                validation={this.props.errorBuyNoPrice ? 'error' : undefined}
                onClick={this.invalidateErrors}
                name="buyPrice"
                type="text"
                small
              />
              <InputDecoratorIndeted> {splitSymbol(symbolID, 2)} </InputDecoratorIndeted>
              <ControlButtonUp onClick={this.incPrice}>
                <FontAwesomeIcon icon={faAngleUp} />
              </ControlButtonUp>
              <ControlButtonDown onClick={this.decPrice}>
                <FontAwesomeIcon icon={faAngleDown} />
              </ControlButtonDown>
              {this.props.errorBuyNoPrice ? (
                <Message validation="error" style={{ marginBottom: 6, marginTop: 3 }}>
                  Price can&apos;t be empty
                </Message>
              ) : (
                <Row
                  style={{
                    fontSize: 12,
                    marginRight: -5,
                    marginTop: 6,
                    marginBottom: 2,
                    textAlign: 'right'
                  }}
                >
                  <Col md={12}>
                    <ButtonLink style={{ marginRight: 10 }} onClick={this.setPriceToAsk}>
                      Ask
                    </ButtonLink>
                    <ButtonLink style={{ marginRight: 10 }} onClick={this.setPriceToBid}>
                      Bid
                    </ButtonLink>
                    {!this.props.isMarketEnabled && (
                      <Checkbox
                        id="isMarketPrice"
                        name="isMarketPrice"
                        checked={isMarketPrice}
                        small
                        inline
                        onChange={this.handleCheckboxClick}
                      >
                        Market
                      </Checkbox>
                    )}
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </TextField>
        <TextField style={{ marginBottom: 6 }}>
          <Row>
            <Col md={3} style={{ paddingTop: 3 }}>
              <Label htmlFor="tes1t">Amount:</Label>
            </Col>
            <Col md={9}>
              <Input
                placeholder="Amount to buy"
                name="buyAmount"
                type="number"
                value={buyAmount}
                onClick={this.invalidateErrors}
                validation={
                  this.props.errorBuyNoAmount || this.props.errorBuyAmountTooBig
                    ? 'error'
                    : undefined
                }
                onChange={this.handleDataInput}
                small
              />
              <InputDecorator> {splitSymbol(symbolID, 1)} </InputDecorator>
              {this.props.errorBuyNoAmount && (
                <Message validation="error" style={{ marginBottom: 6, marginTop: 3 }}>
                  Amount can&apos;t be empty
                </Message>
              )}
              {this.props.errorBuyAmountTooBig && (
                <Message validation="error" style={{ marginBottom: 6, marginTop: 3 }}>
                  You don&apos;t have enough funds
                </Message>
              )}
              {!this.props.errorBuyNoAmount && !this.props.errorBuyAmountTooBig && (
                <Row
                  style={{
                    fontSize: 12,
                    marginRight: -5,
                    marginTop: 6,
                    marginBottom: 2,
                    textAlign: 'right'
                  }}
                >
                  <Col md={12}>
                    <ButtonLink style={{ width: '16%' }} onClick={() => this.setPercent('0.05')}>
                      5%
                    </ButtonLink>
                    <ButtonLink style={{ width: '16%' }} onClick={() => this.setPercent('0.1')}>
                      10%
                    </ButtonLink>
                    <ButtonLink style={{ width: '16%' }} onClick={() => this.setPercent('0.15')}>
                      15%
                    </ButtonLink>
                    <ButtonLink style={{ width: '16%' }} onClick={() => this.setPercent('0.25')}>
                      25%
                    </ButtonLink>
                    <ButtonLink style={{ width: '16%' }} onClick={() => this.setPercent('0.5')}>
                      50%
                    </ButtonLink>
                    <ButtonLink style={{ width: '16%' }} onClick={() => this.setPercent('1')}>
                      100%
                    </ButtonLink>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </TextField>
        <TextField style={{ marginBottom: 6 }}>
          <Row>
            <Col md={3} style={{ paddingTop: 3 }}>
              <Label htmlFor="tes3t">Total:</Label>
            </Col>
            <Col md={9}>
              <Input
                type="number"
                placeholder={f.isMarketPlaceholder(isMarketPrice, 'Total amount')}
                name="total"
                small
                disabled={isMarketPrice}
                value={f.getValue(isMarketPrice, total)}
                validation={this.props.errorBuyAmountTooSmall ? 'error' : undefined}
                onClick={this.invalidateErrors}
                onChange={this.handleDataInput}
              />
              {this.props.errorBuyAmountTooSmall && (
                <Message validation="error" style={{ marginBottom: 6, marginTop: 3 }}>
                  Order should be over {this.props.info.minNotional}
                </Message>
              )}
              <InputDecorator>{splitSymbol(symbolID, 2)}</InputDecorator>
            </Col>
          </Row>
        </TextField>
        {!this.props.showBuyTable ? (
          <Row>
            <Col md={12} style={{ textAlign: 'right' }}>
              <ButtonMini onClick={this.props.enableBuyLayers}>
                <FontAwesomeIcon icon={faPlusCircle} />
                Make layered buy order
              </ButtonMini>
              <HelpLink style={{ width: '100%', textAlign: 'right' }}>
                <FontAwesomeIcon icon={faInfo} style={{ marginRight: 6 }} />
                What is layered buy order?
              </HelpLink>
            </Col>
          </Row>
        ) : (
          <Row>
            <Col md={12} style={{ textAlign: 'right' }}>
              <ButtonMini onClick={this.props.addBuyLayer}>
                <FontAwesomeIcon icon={faPlusCircle} />
                Add buy layer
              </ButtonMini>
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }
}

BuyTools.propTypes = {
  setBuyFormData: PropTypes.func.isRequired,
  enableBuyLayers: PropTypes.func.isRequired,
  addBuyLayer: PropTypes.func.isRequired,
  setErrorData: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
  prices: PropTypes.object.isRequired,
  balance: PropTypes.string.isRequired,
  showBuyTable: PropTypes.bool.isRequired,
  /* eslint react/no-unused-prop-types: 0 */
  symbolID: PropTypes.string.isRequired,
  buyPrice: PropTypes.string,
  isMarketPrice: PropTypes.bool.isRequired,
  buyAmount: PropTypes.string.isRequired,
  total: PropTypes.string.isRequired,
  refreshSellForm: PropTypes.func.isRequired,
  isMarketEnabled: PropTypes.bool.isRequired,
  errorBuyNoPrice: PropTypes.bool.isRequired,
  errorBuyNoAmount: PropTypes.bool.isRequired,
  errorBuyAmountTooSmall: PropTypes.bool.isRequired,
  errorBuyAmountTooBig: PropTypes.bool.isRequired
};

BuyTools.defaultProps = {
  buyPrice: ''
};
