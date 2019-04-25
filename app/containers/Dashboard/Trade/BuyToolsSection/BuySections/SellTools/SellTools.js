import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from '@zendeskgarden/react-grid';
import { Input, Label, TextField } from '@zendeskgarden/react-textfields';
import { Range, Message } from '@zendeskgarden/react-ranges';
import { Tooltip } from '@zendeskgarden/react-tooltips';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faInfo } from '@fortawesome/pro-regular-svg-icons';
import { faPlusCircle, faInfoCircle } from '@fortawesome/pro-solid-svg-icons';

import { InputDecorator, HelpLink, ButtonMini } from '../Styles';
import { InfoLink } from '../../../../../../assets/global-styles/GlobalComponents';
import Checkbox from '../../../../../../components/Checkbox';
import {
  formatNumberToTickSize,
  splitSymbol,
  decreaseByPercent,
  subtract,
  divide,
  multiply
} from '../../../../../../utils/helpers';

export default class SellTools extends React.Component {
  getProperPercentage = percentage => {
    if (percentage.indexOf('.') > 0 && percentage.indexOf('.') + 1 === percentage.length) {
      return percentage.substring(0, percentage.length - 1);
    }
    return percentage === '' ? '0' : percentage;
  };
  getProperPercentageBackground = (percentage, maxPercent) => {
    if (maxPercent === '0') return '0';
    if (percentage.indexOf('.') > 0 && percentage.indexOf('.') + 1 === percentage.length) {
      return divide(multiply(percentage.substring(0, percentage.length - 1), '100'), maxPercent);
    }
    return percentage === '' ? '0' : divide(multiply(percentage, '100'), maxPercent);
  };
  invalidatePriceErrors = () => {
    this.props.setErrorData('sellPriceSmallerThanBuyPrice', false);
  };
  invalidateAmountErrors = () => {
    this.props.setErrorData('sellAmountTooSmall', false);
  };
  handleDataInput = event => {
    const regex = RegExp(/^[0-9.]+$/);
    const targetName = event.target.name;
    let targetValue = event.target.value;

    if (targetValue === '.') {
      targetValue = '0.';
    }

    if (regex.test(targetValue) || targetValue === '') {
      if (targetName === 'sellPrice') {
        this.props.setSellFormData(
          targetName,
          formatNumberToTickSize(targetValue, this.props.info.tickSize)
        );
      }
      if (targetName === 'profitMarginPercent' || targetName === 'trailingMarginPercent') {
        if (Number(targetValue) > 100) {
          this.props.setSellFormData(targetName, '100');
        } else {
          const afterDec = targetValue.substring(targetValue.indexOf('.') + 1, targetValue.length);
          if (afterDec.length > 2) {
            this.props.setSellFormData(targetName, String(Number(targetValue).toFixed(2)));
          } else {
            this.props.setSellFormData(targetName, targetValue);
          }
        }
      }
      if (targetName === 'amountPercent') {
        const availableSellAmount = subtract('100', this.props.totalSellPercentAmount);
        if (Number(targetValue) > Number(availableSellAmount)) {
          this.props.setSellFormData(targetName, availableSellAmount);
        } else {
          const afterDec = targetValue.substring(targetValue.indexOf('.') + 1, targetValue.length);
          if (afterDec.length > 2) {
            this.props.setSellFormData(targetName, String(Number(targetValue).toFixed(2)));
          } else {
            this.props.setSellFormData(targetName, targetValue);
          }
        }
      }
    }
  };

  handleRangeChange = event => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    console.log(targetName);
    console.log(targetValue);
    this.props.setSellFormData(targetName, targetValue);
  };

  handleCheckboxClick = event => {
    const targetName = event.target.name;
    const targetValue = event.currentTarget.checked;
    this.props.setSellFormData(targetName, targetValue);
  };

  render() {
    const {
      symbolID,
      sellPrice,
      profitMarginPercent,
      trailingMarginPercent,
      showSellTable,
      amountPercent
    } = {
      ...this.props
    };
    return (
      <React.Fragment>
        <TextField>
          <Row>
            <Col md={12}>
              <Label>
                <span style={{ marginRight: 7 }}>Sell price estimate</span>
                <Tooltip trigger={<InfoLink icon={faInfoCircle} />} size="small">
                  <span style={{ fontWeight: 600 }}>Note:</span> Profit percentage is calculated
                  based on the highest price in your buy layers. If one or more buy layers get
                  fulfilled, percentage will be based from average buy price.
                </Tooltip>
              </Label>
              <Input
                placeholder="Sell price"
                name="sellPrice"
                type="text"
                value={sellPrice}
                onChange={this.handleDataInput}
                onClick={this.invalidatePriceErrors}
                small
              />
              <InputDecorator style={{ top: '39px' }}>{splitSymbol(symbolID, 2)}</InputDecorator>
            </Col>
          </Row>
          <Row style={{ marginTop: 12 }}>
            <Col md={8}>
              <Range
                name="profitMarginPercent"
                backgroundSize={`${this.getProperPercentage(profitMarginPercent)}%`}
                value={this.getProperPercentage(profitMarginPercent)}
                step={0.1}
                min={0}
                max={100}
                onClick={this.invalidatePriceErrors}
                onChange={this.handleRangeChange}
              />
            </Col>
            <Col md={4}>
              <Input
                placeholder="Percent"
                value={profitMarginPercent}
                name="profitMarginPercent"
                onChange={this.handleDataInput}
                type="text"
                small
                onClick={this.invalidatePriceErrors}
                style={{ marginTop: -5 }}
              />
              <InputDecorator style={{ top: 6 }}>%</InputDecorator>
            </Col>
          </Row>
        </TextField>
        {this.props.errorSellPriceSmallerThanBuyPrice && (
          <Message validation="error" style={{ marginBottom: 6, marginTop: 3 }}>
            Sell price can&apos;t be smaller than buy price
          </Message>
        )}
        {showSellTable && (
          <React.Fragment>
            <TextField>
              <Row>
                <Col md={12}>
                  <Label style={{ lineHeight: 0 }}>
                    <span style={{ marginRight: 7 }}>Percentage of holdings to sell: </span>
                    <Tooltip trigger={<InfoLink icon={faInfoCircle} />} size="small">
                      <span>
                        Total available amount is sum of all buy layers if buy layers are enabled.
                      </span>
                    </Tooltip>
                  </Label>
                </Col>
              </Row>
              <Row style={{ marginTop: 12 }}>
                <Col md={8}>
                  <Range
                    name="amountPercent"
                    backgroundSize={`${this.getProperPercentageBackground(
                      amountPercent,
                      subtract('100', this.props.totalSellPercentAmount)
                    )}%`}
                    value={this.getProperPercentage(amountPercent)}
                    step={0.1}
                    min={0}
                    max={Number(subtract('100', this.props.totalSellPercentAmount))}
                    disabled={subtract('100', this.props.totalSellPercentAmount) === '0'}
                    onClick={this.invalidateAmountErrors}
                    onChange={this.handleRangeChange}
                  />
                </Col>
                <Col md={4}>
                  <Input
                    placeholder="Percentage"
                    name="amountPercent"
                    type="text"
                    value={amountPercent}
                    onChange={this.handleDataInput}
                    small
                    onClick={this.invalidateAmountErrors}
                    style={{ marginTop: -5 }}
                  />
                  <InputDecorator style={{ top: 6 }}>%</InputDecorator>
                </Col>
              </Row>
            </TextField>
            {this.props.errorSellNoAmountSpecified && (
              <Message validation="error" style={{ marginBottom: 6, marginTop: 3 }}>
                Amount can&apos;t be empty
              </Message>
            )}
            {this.props.errorSellAmountTooSmall && (
              <Message validation="error" style={{ marginBottom: 6, marginTop: 3 }}>
                Amount you are trying to sell is too small
              </Message>
            )}
          </React.Fragment>
        )}
        <Row>
          <Col md={12} style={{ marginTop: 13 }}>
            <Checkbox
              id="isTrailingEnabled"
              name="isTrailingEnabled"
              inline
              checked={this.props.isTrailingEnabled}
              onChange={this.handleCheckboxClick}
            >
              <span style={{ marginRight: 7 }}>Enable trailing</span>
              <Tooltip
                trigger={<InfoLink icon={faInfoCircle} style={{ verticalAlign: 'middle' }} />}
                delayMilliseconds={200}
              >
                <a href="https://google.com" style={{ fontWeight: 600 }}>
                  Click here to learn more
                </a>
              </Tooltip>
            </Checkbox>
          </Col>
        </Row>
        {this.props.isTrailingEnabled && (
          <TextField style={{ marginTop: 5 }}>
            <Row>
              <Col md={12}>
                <Label>
                  <span style={{ marginRight: 7 }}>Follow max price with deviation (%)</span>
                  <Tooltip trigger={<InfoLink icon={faInfoCircle} />} size="small">
                    Deviation percentage is calculated from sell price{' '}
                    <span style={{ fontWeight: 600 }}>
                      {sellPrice} {splitSymbol(symbolID, 2)}{' '}
                    </span>
                    . With current settings, sell will happen when price reaches{' '}
                    <span style={{ fontWeight: 600 }}>
                      {formatNumberToTickSize(
                        decreaseByPercent(sellPrice, trailingMarginPercent),
                        this.props.info.tickSize
                      )}
                      {splitSymbol(symbolID, 2)}
                    </span>
                    <br />
                    <a href="https://www.google.com">Click here to learn more</a>
                  </Tooltip>
                </Label>
              </Col>
            </Row>
            <Row style={{ marginTop: 5 }}>
              <Col md={7}>
                <Range
                  backgroundSize={`${this.getProperPercentage(trailingMarginPercent)}%`}
                  name="trailingMarginPercent"
                  step={0.1}
                  min={0}
                  max={100}
                  value={this.getProperPercentage(trailingMarginPercent)}
                  onChange={this.handleRangeChange}
                />
              </Col>
              <Col md={5}>
                <Input
                  placeholder="Percentage"
                  name="trailingMarginPercent"
                  value={trailingMarginPercent}
                  type="text"
                  onChange={this.handleDataInput}
                  small
                  style={{ marginTop: -5 }}
                />
                <InputDecorator style={{ top: 6 }}>%</InputDecorator>
              </Col>
            </Row>
          </TextField>
        )}
        {!showSellTable ? (
          <Row style={{ marginTop: 13 }}>
            <Col md={12} style={{ textAlign: 'right' }}>
              <ButtonMini onClick={this.props.enableSellLayers}>
                <FontAwesomeIcon icon={faPlusCircle} />
                Make layered sell order
              </ButtonMini>
              <HelpLink style={{ width: '100%', textAlign: 'right' }}>
                <FontAwesomeIcon icon={faInfo} style={{ marginRight: 6 }} />
                What is layered sell order?
              </HelpLink>
            </Col>
          </Row>
        ) : (
          <Row style={{ marginTop: 10 }}>
            <Col md={12} style={{ textAlign: 'right' }}>
              <ButtonMini onClick={this.props.addSellLayer}>
                <FontAwesomeIcon icon={faPlusCircle} />
                Add sell layer
              </ButtonMini>
            </Col>
          </Row>
        )}
      </React.Fragment>
    );
  }
}

SellTools.propTypes = {
  /* eslint react/no-unused-prop-types: 0 */
  setSellFormData: PropTypes.func.isRequired,
  setErrorData: PropTypes.func.isRequired,
  info: PropTypes.object.isRequired,
  enableSellLayers: PropTypes.func.isRequired,
  showSellTable: PropTypes.bool.isRequired,
  showBuyTable: PropTypes.bool.isRequired,
  symbolID: PropTypes.string.isRequired,
  sellPrice: PropTypes.string,
  amountPercent: PropTypes.string.isRequired,
  profitMarginPercent: PropTypes.string.isRequired,
  isTrailingEnabled: PropTypes.bool.isRequired,
  trailingMarginPercent: PropTypes.string.isRequired,
  totalSellPercentAmount: PropTypes.string.isRequired,
  addSellLayer: PropTypes.func.isRequired,
  errorSellNoAmountSpecified: PropTypes.bool.isRequired,
  errorSellPriceSmallerThanBuyPrice: PropTypes.bool.isRequired,
  errorSellAmountTooSmall: PropTypes.bool.isRequired
};

SellTools.defaultProps = {
  sellPrice: ''
};
