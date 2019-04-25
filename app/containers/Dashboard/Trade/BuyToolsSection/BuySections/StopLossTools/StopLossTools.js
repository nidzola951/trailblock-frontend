import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from '@zendeskgarden/react-grid';
import { Radio, Label as RadioLabel } from '@zendeskgarden/react-radios';
import { Input, Label, TextField } from '@zendeskgarden/react-textfields';
import { Range } from '@zendeskgarden/react-ranges';
import { Tooltip } from '@zendeskgarden/react-tooltips';

import { faInfoCircle } from '@fortawesome/pro-solid-svg-icons';

import { InfoLink } from '../../../../../../assets/global-styles/GlobalComponents';
import { InputDecorator } from '../Styles';

import { formatNumberToTickSize, splitSymbol } from '../../../../../../utils/helpers';

export default class StopLossTools extends React.Component {
  getProperPercentage = percentage => {
    if (percentage.indexOf('.') > 0 && percentage.indexOf('.') + 1 === percentage.length) {
      return percentage.substring(0, percentage.length - 1);
    }
    return percentage === '' ? '0' : percentage;
  };
  handleRadioChange = event => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    this.props.setStoplossData(targetName, targetValue);
  };
  handleDataInput = event => {
    const regex = RegExp(/^[0-9.]+$/);

    const targetName = event.target.name;
    let targetValue = event.target.value;

    if (targetValue === '.') {
      targetValue = '0.';
    }

    if (regex.test(targetValue) || targetValue === '') {
      if (
        targetName === 'stopLossPrice' ||
        targetName === 'stopLossPriceEstimate' ||
        targetName === 'stopLossFixedPrice'
      ) {
        this.props.setStoplossData(
          targetName,
          formatNumberToTickSize(targetValue, this.props.info.tickSize)
        );
      }
      if (targetName === 'stopLossPercentage') {
        if (Number(targetValue) > 100) {
          this.props.setStoplossData(targetName, '100');
        } else {
          const afterDec = targetValue.substring(targetValue.indexOf('.') + 1, targetValue.length);
          if (afterDec.length > 2) {
            this.props.setStoplossData(targetName, String(Number(targetValue).toFixed(2)));
          } else {
            this.props.setStoplossData(targetName, targetValue);
          }
        }
      }
    }
  };
  handleRangeChange = event => {
    const targetName = event.target.name;
    const targetValue = event.target.value;
    this.props.setStoplossData(targetName, targetValue);
  };
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col md={12}>
            <Label>
              <span style={{ marginRight: 7 }}>Stop loss type</span>
              <Tooltip
                trigger={<InfoLink icon={faInfoCircle} style={{ verticalAlign: 'middle' }} />}
                delayMilliseconds={200}
              >
                <a href="https://google.com" style={{ fontWeight: 600 }}>
                  Click here to learn more
                </a>
              </Tooltip>
            </Label>
          </Col>
          <Col md={12}>
            <div style={{ display: 'inline-block', marginRight: 10 }}>
              <Radio
                name="stopLossType"
                value="fixed"
                checked={this.props.stopLossType === 'fixed'}
                onChange={this.handleRadioChange}
              >
                <RadioLabel style={{ lineHeight: '1.62', fontWeight: '400' }}>Fixed</RadioLabel>
              </Radio>
            </div>
            <div style={{ display: 'inline-block' }}>
              <Radio
                name="stopLossType"
                value="trailing"
                checked={this.props.stopLossType === 'trailing'}
                onChange={this.handleRadioChange}
              >
                <RadioLabel style={{ lineHeight: '1.62', fontWeight: '400' }}>Trailing</RadioLabel>
              </Radio>
            </div>
          </Col>
          {this.props.stopLossType === 'fixed' ? (
            <Col md={12}>
              <TextField>
                <Row>
                  <Col md={12}>
                    <Label>
                      <span style={{ marginRight: 7 }}>Sell if price reaches</span>
                    </Label>
                    <Input
                      placeholder="Sell price"
                      name="stopLossFixedPrice"
                      type="text"
                      value={this.props.stopLossFixedPrice}
                      onChange={this.handleDataInput}
                      small
                    />
                    <InputDecorator style={{ top: '39px' }}>
                      {splitSymbol(this.props.symbolID, 2)}
                    </InputDecorator>
                  </Col>
                </Row>
              </TextField>
            </Col>
          ) : (
            <Col md={12}>
              <TextField style={{ marginTop: 5 }}>
                <Row>
                  <Col md={12}>
                    <Label>
                      <span style={{ marginRight: 7 }}>Trail behind highest price (%)</span>
                    </Label>
                  </Col>
                </Row>
                <Row style={{ marginTop: 7 }}>
                  <Col md={8}>
                    <Range
                      name="stopLossPercentage"
                      backgroundSize={`${this.getProperPercentage(this.props.stopLossPercentage)}%`}
                      value={this.getProperPercentage(this.props.stopLossPercentage)}
                      step={0.1}
                      min={0}
                      max={100}
                      onChange={this.handleRangeChange}
                    />
                  </Col>
                  <Col md={4}>
                    <Input
                      type="text"
                      name="stopLossPercentage"
                      placeholder="Percent"
                      value={this.props.stopLossPercentage}
                      onChange={this.handleDataInput}
                      style={{ marginTop: -5 }}
                      small
                    />
                    <InputDecorator style={{ top: 6 }}>%</InputDecorator>
                  </Col>
                </Row>
                <Row>
                  <Col md={12}>
                    <Label>
                      <span style={{ marginRight: 7 }}>Minimal price estimate</span>
                    </Label>
                    <Input
                      type="text"
                      name="stopLossPriceEstimate"
                      placeholder="Sell price"
                      value={this.props.stopLossPriceEstimate}
                      onChange={this.handleDataInput}
                      small
                    />
                    <InputDecorator style={{ top: '39px' }}>
                      {splitSymbol(this.props.symbolID, 2)}
                    </InputDecorator>
                  </Col>
                </Row>
              </TextField>
            </Col>
          )}
        </Row>
      </React.Fragment>
    );
  }
}

StopLossTools.propTypes = {
  symbolID: PropTypes.string.isRequired,
  info: PropTypes.object.isRequired,
  stopLossType: PropTypes.string.isRequired,
  stopLossFixedPrice: PropTypes.string.isRequired,
  stopLossPercentage: PropTypes.string.isRequired,
  stopLossPriceEstimate: PropTypes.string.isRequired,
  setStoplossData: PropTypes.func.isRequired
};
