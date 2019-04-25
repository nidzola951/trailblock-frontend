import React from 'react';
import PropTypes from 'prop-types';

import ButterToast from 'butter-toast';

import { Row, Col } from '@zendeskgarden/react-grid';
import { Button } from '@zendeskgarden/react-buttons';
import { Toggle, Label as ToggleLabel } from '@zendeskgarden/react-toggles';
import { Message } from '@zendeskgarden/react-textfields';

import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/pro-solid-svg-icons';

import request from '../../../../utils/request';
import config from '../../../../config/config';
import Toast from '../../../../components/Toast/Toast';

import LayerBuyTable from './BuySections/LayerTable/LayerBuyTable';
import LayerSellTable from './BuySections/LayerTable/LayerSellTable';
import BuyTools from './BuySections/BuyTools/BuyTools';
import SellTools from './BuySections/SellTools/SellTools';
import StopLossTools from './BuySections/StopLossTools/StopLossTools';
import {
  subtract,
  getBalance,
  divide,
  getPercentageOfAmount,
  multiply,
  getInfo,
  getMinNotional
} from '../../../../utils/helpers';
import { AreaDisabler } from './BuySections/Styles';

import {
  setInitialState,
  syncBuyTotal,
  syncBuyAmount,
  syncSellFormPercentagesWithNumbers,
  syncSellFormNumbersWithPercentages,
  syncTotals,
  syncHighestBuy,
  syncStopLossNumbersWithPercentages,
  syncStopLossPercentagesWithNumbers
} from './BuySections/SyncFunctions/SyncFunctions';

export default class BuyToolsSection extends React.Component {
  static propTypes = {
    symbolID: PropTypes.string.isRequired,
    prices: PropTypes.object.isRequired,
    tickerInfo: PropTypes.object.isRequired,
    userInfo: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.setBuyFormData = this.setBuyFormData.bind(this);
    this.setInitialState = setInitialState.bind(this);
    this.syncBuyTotal = syncBuyTotal.bind(this);
    this.syncBuyAmount = syncBuyAmount.bind(this);
    this.syncSellFormPercentagesWithNumbers = syncSellFormPercentagesWithNumbers.bind(this);
    this.syncSellFormNumbersWithPercentages = syncSellFormNumbersWithPercentages.bind(this);
    this.syncTotals = syncTotals.bind(this);
    this.syncHighestBuy = syncHighestBuy.bind(this);
    this.syncStopLossNumbersWithPercentages = syncStopLossNumbersWithPercentages.bind(this);
    this.syncStopLossPercentagesWithNumbers = syncStopLossPercentagesWithNumbers.bind(this);
  }

  state = {
    symbolID: this.props.symbolID,
    buyLayers: [],
    sellLayers: [],
    buyForm: {
      buyPrice: this.props.prices.bid,
      isMarketPrice: false,
      buyAmount: '',
      total: ''
    },
    sellForm: {
      amountPercent: '100',
      profitMarginPercent: '0',
      trailingMarginPercent: '0',
      sellPrice: this.props.prices.ask,
      isTrailingEnabled: false
    },
    stopLoss: {
      stopLossType: 'fixed',
      stopLossFixedPrice: '',
      stopLossPercentage: '0',
      stopLossPriceEstimate: '0'
    },
    error: {
      buyNoPrice: false,
      buyNoAmount: false,
      buyAmountTooSmall: false,
      buyAmountTooBig: false,
      buyNotFilledOut: false,
      sellPriceSmallerThanBuyPrice: false,
      sellNoAmountSpecified: false,
      sellAmountTooSmall: false,
      totalSellBiggerThanBuy: false,
      noEmptyBuyLayers: false,
      noEmptySellLayers: false,
      sellAmountTooSmallLayers: false
    },
    highestBuyLayer: [],
    highestBuy: this.props.prices.bid,
    totalSellPercentAmount: '0',
    showBuyTable: false,
    showSellTable: false,
    isSellEnabled: false,
    isStoplossEnabled: false,
    isSubmissionLoading: false
  };

  componentDidMount() {
    this.setInitialState();
  }

  componentDidUpdate() {
    const { symbolID, prices } = { ...this.props };
    if (symbolID === prices.symbolID) {
      if (this.state.symbolID !== symbolID || this.state.buyForm.buyPrice === undefined) {
        this.setInitialState();
      }
    }
    if (
      this.state.buyForm.buyPrice === '' &&
      this.state.sellForm.sellPrice === '' &&
      this.state.stopLoss.stopLossFixedPrice === '' &&
      this.props.prices.symbolID
    ) {
      this.setInitialState();
    }
  }

  onSubmitDataValidation = () => {
    let isDataValid = true;

    if (!this.state.showBuyTable && isDataValid) {
      isDataValid = this.validateBuyFormData(true);
    }
    if (isDataValid && this.state.showBuyTable && this.state.buyLayers.length === 0) {
      this.setErrorData('noEmptyBuyLayers', true);
      isDataValid = false;
    }

    if (!this.state.showSellTable && isDataValid && this.state.isSellEnabled) {
      isDataValid = this.validateSellFormData(true);
    }

    if (this.state.showSellTable) {
      this.state.sellLayers.forEach(layer => {
        const sellAmount = getPercentageOfAmount(
          this.state.highestBuyLayer.buyAmount,
          layer.amountPercent
        );
        if (
          Number(multiply(layer.sellPrice, sellAmount)) <
          getMinNotional(this.props.tickerInfo, this.props.symbolID)
        ) {
          this.setErrorData('sellAmountTooSmallLayers', true);
          isDataValid = false;
        }
      });
    }

    if (
      isDataValid &&
      this.state.showSellTable &&
      this.state.sellLayers.length === 0 &&
      this.state.isSellEnabled
    ) {
      this.setErrorData('noEmptySellLayers', true);
      isDataValid = false;
    }

    if (isDataValid) {
      this.setErrorData('noEmptyBuyLayers', false);
      this.setErrorData('sellAmountTooSmallLayers', false);
      this.setErrorData('noEmptySellLayers', false);
    }

    return isDataValid;
  };

  setErrorData = (errorName, errorValue, callBackFunction) => {
    const { error } = { ...this.state };
    error[errorName] = errorValue;
    this.setState(
      {
        error
      },
      callBackFunction
    );
  };

  setBuyFormData = (targetName, targetValue) => {
    const { buyForm } = { ...this.state };
    buyForm[targetName] = targetValue;
    this.setState(
      {
        buyForm
      },
      this.realtimeDataValidationAndSync(targetName)
    );
  };

  setSellFormData = (targetName, targetValue) => {
    const { sellForm } = { ...this.state };
    sellForm[targetName] = targetValue;
    this.setState(
      {
        sellForm
      },
      this.realtimeDataValidationAndSync(targetName)
    );
  };

  getUserBalance = () => {
    let balance = getBalance(this.props.symbolID, 'buy', this.props.userInfo.balances);
    this.state.buyLayers.forEach(layer => {
      balance = subtract(balance, layer.total);
    });
    return balance;
  };

  getSellForm = () => {
    const { sellForm } = { ...this.state };
    return {
      amountPercent: '0',
      profitMarginPercent: '0',
      trailingMarginPercent: sellForm.trailingMarginPercent,
      sellPrice: this.state.highestBuy,
      isTrailingEnabled: sellForm.isTrailingEnabled
    };
  };

  setStoplossData = (targetName, targetValue) => {
    const { stopLoss } = { ...this.state };
    stopLoss[targetName] = targetValue;
    this.setState(
      {
        stopLoss
      },
      this.realtimeDataValidationAndSync(targetName)
    );
  };

  realtimeDataValidationAndSync = targetName => {
    const { sellForm, error, highestBuy } = { ...this.state };
    if (targetName === 'buyPrice' || targetName === 'buyAmount') {
      this.syncBuyTotal();
    }
    if (targetName === 'total') {
      this.syncBuyAmount();
    }
    if (targetName === 'sellPrice') {
      if (Number(highestBuy) > Number(sellForm.sellPrice)) {
        this.setErrorData('sellPriceSmallerThanBuyPrice', true);
      } else {
        if (error.sellPriceSmallerThanBuyPrice) {
          this.setErrorData('sellPriceSmallerThanBuyPrice', false);
        }
        this.syncSellFormPercentagesWithNumbers();
      }
    }

    if (
      targetName === 'profitMarginPercent' ||
      targetName === 'amountPercent' ||
      targetName === 'trailingMarginPercent'
    ) {
      this.syncSellFormNumbersWithPercentages();
    }
    if (targetName === 'stopLossPercentage') {
      this.syncStopLossNumbersWithPercentages();
    }
    if (targetName === 'stopLossPriceEstimate') {
      this.syncStopLossPercentagesWithNumbers();
    }
    this.syncTotals();
    this.syncHighestBuy();
  };

  refreshSellForm = () => {
    const sellForm = this.getSellForm();
    this.setState({
      sellForm
    });
  };

  enableSellForm = event => {
    const { buyForm, showBuyTable, buyLayers } = { ...this.state };
    const sellForm = this.getSellForm();
    if (event.target.checked) {
      if (
        (showBuyTable && buyLayers.length === 0) ||
        (!showBuyTable &&
          (buyForm.buyPrice === '' || buyForm.buyAmount === '' || buyForm.total === ''))
      ) {
        this.setErrorData('buyNotFilledOut', true);
      } else {
        this.setErrorData('buyNotFilledOut', false);
        this.setState({
          isSellEnabled: event.target.checked,
          sellForm
        });
      }
    } else {
      this.setErrorData('buyNotFilledOut', false);
      this.setState({
        isSellEnabled: event.target.checked,
        sellForm,
        showSellTable: false
      });
    }
  };

  enableBuyLayers = () => {
    this.setState(
      {
        showBuyTable: true
      },
      () => {
        this.realtimeDataValidationAndSync();
      }
    );
  };

  enableSellLayers = () => {
    this.setState(
      {
        showSellTable: true
      },
      () => {
        this.realtimeDataValidationAndSync();
      }
    );
  };

  validateBuyFormData = (isSubmitCheck = false) => {
    let isDataValid = true;
    const { error } = { ...this.state };
    if (this.state.buyForm.buyPrice === '') {
      error.buyNoPrice = true;
      this.setState({
        error
      });
      isDataValid = false;
    }
    if (this.state.buyForm.buyAmount === '' && (isSubmitCheck || this.state.showBuyTable)) {
      error.buyNoAmount = true;
      this.setState({
        error
      });
      isDataValid = false;
    }
    const balance = this.getUserBalance();

    if (
      Number(this.state.buyForm.total) > Number(balance) &&
      (isSubmitCheck || this.state.showBuyTable)
    ) {
      error.buyAmountTooBig = true;
      this.setState({
        error
      });
      isDataValid = false;
    }

    if (
      Number(this.state.buyForm.total) <
        getMinNotional(this.props.tickerInfo, this.props.symbolID) &&
      (isSubmitCheck || this.state.showBuyTable)
    ) {
      error.buyAmountTooSmall = true;
      this.setState({
        error
      });
      isDataValid = false;
    }

    return isDataValid;
  };

  validateSellFormData = (isSubmitCheck = false) => {
    let isDataValid = true;
    const { error } = { ...this.state };
    const { showSellTable, sellForm, highestBuy } = { ...this.state };
    if (showSellTable && sellForm.amountPercent === '') {
      error.sellNoAmountSpecified = true;
      this.setState({
        error
      });
      isDataValid = false;
    }
    if (
      Number(highestBuy) > Number(sellForm.sellPrice) &&
      (isSubmitCheck && !this.state.showBuyTable)
    ) {
      error.sellPriceSmallerThanBuyPrice = true;
      this.setState({
        error
      });
      isDataValid = false;
    }

    const sellAmount = getPercentageOfAmount(
      this.state.highestBuyLayer.buyAmount,
      this.state.sellForm.amountPercent
    );

    if (
      showSellTable &&
      Number(multiply(sellForm.sellPrice, sellAmount)) <
        getMinNotional(this.props.tickerInfo, this.props.symbolID)
    ) {
      error.sellAmountTooSmall = true;
      this.setState({
        error
      });
      isDataValid = false;
    }

    return isDataValid;
  };

  deleteBuyLayerData = index => {
    const { buyLayers } = { ...this.state };
    buyLayers.splice(index, 1);
    const showBuyTable = !!buyLayers.length;

    this.setState(
      {
        buyLayers,
        showBuyTable
      },
      () => {
        this.realtimeDataValidationAndSync();
      }
    );
  };

  deleteSellLayerData = index => {
    const { sellLayers } = { ...this.state };
    sellLayers.splice(index, 1);
    const showSellTable = !!sellLayers.length;

    this.setState(
      {
        sellLayers,
        showSellTable
      },
      () => {
        this.realtimeDataValidationAndSync();
      }
    );
  };

  addBuyLayer = () => {
    const { buyLayers, buyForm } = { ...this.state };
    const isDataValid = this.validateBuyFormData();
    if (isDataValid) {
      buyLayers.push({
        buyPrice: buyForm.buyPrice,
        isMarketPrice: buyForm.isMarketPrice,
        buyAmount: buyForm.buyAmount,
        total: buyForm.total
      });
      this.setState(
        {
          buyLayers,
          buyForm: {
            buyPrice: this.props.prices.bid,
            isMarketPrice: false,
            buyAmount: '',
            total: ''
          }
        },
        () => {
          this.realtimeDataValidationAndSync();
        }
      );
    }
  };

  addSellLayer = () => {
    const { sellLayers, sellForm } = { ...this.state };
    const isDataValid = this.validateSellFormData();
    if (isDataValid) {
      sellLayers.push({
        amountPercent: sellForm.amountPercent,
        profitMarginPercent: sellForm.profitMarginPercent,
        trailingMarginPercent: sellForm.trailingMarginPercent,
        sellPrice: sellForm.sellPrice,
        isTrailingEnabled: sellForm.isTrailingEnabled
      });
      this.setState(
        {
          sellLayers,
          sellForm: {
            amountPercent: '0',
            profitMarginPercent: '0',
            trailingMarginPercent: '0',
            sellPrice: this.props.prices.ask,
            isTrailingEnabled: false
          }
        },
        () => {
          this.realtimeDataValidationAndSync();
        }
      );
    }
  };

  handleSubmit = () => {
    this.setState({
      isSubmissionLoading: true
    });
    const isDataValid = this.onSubmitDataValidation();
    if (isDataValid) {
      const data = {
        symbol: this.props.symbolID,
        buyLayers: [],
        sellLayers: []
      };
      const { buyLayers, sellLayers, buyForm, sellForm } = { ...this.state };

      if (buyLayers.length) {
        buyLayers.forEach(layer => {
          const temp = {
            price: layer.isMarketPrice ? '0' : layer.buyPrice,
            amount: layer.buyAmount,
            orderType: layer.isMarketPrice ? 'Market' : 'Limit'
          };
          data.buyLayers.push(temp);
        });
      } else {
        const temp = {
          price: buyForm.buyPrice,
          amount: buyForm.buyAmount,
          orderType: buyForm.isMarketPrice ? 'Market' : 'Limit'
        };
        data.buyLayers.push(temp);
      }

      if (sellLayers.length) {
        sellLayers.forEach(layer => {
          const temp = {
            amountPercent: divide(layer.amountPercent, '100'),
            profitMarginPercent: divide(layer.profitMarginPercent, '100')
          };
          if (layer.isTrailingEnabled) {
            temp.trailingMarginPercent = divide(layer.trailingMarginPercent, '100');
          }
          data.sellLayers.push(temp);
        });
      } else if (this.state.isSellEnabled) {
        const temp = {
          amountPercent: '1',
          profitMarginPercent: divide(sellForm.profitMarginPercent, '100')
        };
        if (sellForm.isTrailingEnabled) {
          temp.trailingMarginPercent = divide(sellForm.trailingMarginPercent, '100');
        }
        data.sellLayers.push(temp);
      }

      if (this.state.isStoplossEnabled) {
        if (this.state.stopLoss.stopLossType === 'fixed') {
          data.stopLoss = {
            stopLossType: 'FixedStopLoss',
            stopLossPrice: this.state.stopLoss.stopLossFixedPrice
          };
        } else {
          data.stopLoss = {
            stopLossType: 'TrailingStopLoss',
            percentMargin: divide(this.state.stopLoss.stopLossPercentage, '100')
          };
        }
      }

      console.log('SEND DATA');
      console.log(data);

      const requestURL = `${config.api}/trade/new`;
      const options = {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };

      request(requestURL, options)
        .then(() => {
          this.setInitialState();
          ButterToast.raise({
            content: ({ dismiss }) => (
              <Toast dismiss={dismiss} success>
                Success
              </Toast>
            ),
            toastTimeout: 4000 // default: 3000 ms
          });
          this.setState({
            isSubmissionLoading: false
          });
          this.props.actions.loadUserInfo();
        })
        .catch(() => {
          this.setInitialState();
          ButterToast.raise({
            content: ({ dismiss }) => (
              <Toast dismiss={dismiss} error>
                An error has occurred. If this message persists, please contact support.
              </Toast>
            ),
            toastTimeout: 4000 // default: 3000 ms
          });
        });
    } else {
      this.setState({
        isSubmissionLoading: false
      });
    }
  };

  render() {
    const { buyForm, sellForm, error } = { ...this.state };
    return (
      <React.Fragment>
        <Row>
          <Col md={4} style={{ paddingLeft: 12, paddingRight: 12 }}>
            {this.state.showBuyTable && (
              <LayerBuyTable
                title="Buy Layers"
                symbolID={this.props.symbolID}
                layers={this.state.buyLayers}
                deleteLayer={this.deleteBuyLayerData}
              />
            )}
            <BuyTools
              symbolID={this.props.symbolID}
              balance={this.getUserBalance()}
              info={getInfo(this.props.tickerInfo, this.props.symbolID)}
              prices={this.props.prices}
              userInfo={this.props.userInfo}
              buyPrice={buyForm.buyPrice}
              isMarketPrice={buyForm.isMarketPrice}
              buyAmount={buyForm.buyAmount}
              total={buyForm.total}
              setBuyFormData={this.setBuyFormData}
              addBuyLayer={this.addBuyLayer}
              showBuyTable={this.state.showBuyTable}
              enableBuyLayers={this.enableBuyLayers}
              isMarketEnabled={this.state.buyLayers.length > 0}
              refreshSellForm={this.refreshSellForm}
              setErrorData={this.setErrorData}
              errorBuyNoPrice={error.buyNoPrice}
              errorBuyNoAmount={error.buyNoAmount}
              errorBuyAmountTooSmall={error.buyAmountTooSmall}
              errorBuyAmountTooBig={error.buyAmountTooBig}
            />
          </Col>
          <Col md={4} style={{ paddingLeft: 12, paddingRight: 12 }}>
            <Row>
              <Col md={12}>
                <Toggle checked={this.state.isSellEnabled} onChange={this.enableSellForm}>
                  <ToggleLabel>Set sell targets</ToggleLabel>
                </Toggle>
              </Col>
            </Row>
            {error.buyNotFilledOut && (
              <Message validation="error" style={{ marginBottom: 6, marginTop: 3 }}>
                Please fill out the buy form
              </Message>
            )}
            {this.state.showSellTable && (
              <div style={{ marginTop: 10 }}>
                <LayerSellTable
                  title="Sell Layers"
                  layers={this.state.sellLayers}
                  deleteLayer={this.deleteSellLayerData}
                />
              </div>
            )}
            <AreaDisabler disabled={this.state.isSellEnabled}>
              <SellTools
                symbolID={this.props.symbolID}
                info={getInfo(this.props.tickerInfo, this.props.symbolID)}
                prices={this.props.prices}
                setSellFormData={this.setSellFormData}
                sellPrice={sellForm.sellPrice}
                profitMarginPercent={sellForm.profitMarginPercent}
                isTrailingEnabled={sellForm.isTrailingEnabled}
                trailingMarginPercent={sellForm.trailingMarginPercent}
                amountPercent={sellForm.amountPercent}
                showSellTable={this.state.showSellTable}
                showBuyTable={this.state.showBuyTable}
                enableSellLayers={this.enableSellLayers}
                highestBuy={this.state.highestBuy}
                totalSellPercentAmount={this.state.totalSellPercentAmount}
                addSellLayer={this.addSellLayer}
                setErrorData={this.setErrorData}
                errorSellPriceSmallerThanBuyPrice={error.sellPriceSmallerThanBuyPrice}
                errorSellAmountTooSmall={error.sellAmountTooSmall}
                errorSellNoAmountSpecified={error.sellNoAmountSpecified}
              />
            </AreaDisabler>
          </Col>
          <Col md={4} style={{ paddingLeft: 12, paddingRight: 12 }}>
            <Row>
              <Col md={12}>
                <Toggle
                  checked={this.state.isStoplossEnabled}
                  onChange={event => this.setState({ isStoplossEnabled: event.target.checked })}
                >
                  <ToggleLabel>Set stop loss</ToggleLabel>
                </Toggle>
              </Col>
            </Row>
            <AreaDisabler disabled={this.state.isStoplossEnabled}>
              <StopLossTools
                symbolID={this.props.symbolID}
                info={getInfo(this.props.tickerInfo, this.props.symbolID)}
                stopLossType={this.state.stopLoss.stopLossType}
                stopLossFixedPrice={this.state.stopLoss.stopLossFixedPrice}
                stopLossPercentage={this.state.stopLoss.stopLossPercentage}
                stopLossPriceEstimate={this.state.stopLoss.stopLossPriceEstimate}
                setStoplossData={this.setStoplossData}
              />
            </AreaDisabler>
          </Col>
        </Row>
        <Row>
          <Col md={8} />
          <Col md={4}>
            <div style={{ marginTop: 20 }}>
              {!this.state.isSubmissionLoading ? (
                <Button size="small" primary onClick={this.handleSubmit}>
                  Create trade
                </Button>
              ) : (
                <Button size="small" primary onClick={this.handleSubmit} disabled>
                  <FontAwesomeIcon icon={faSpinner} style={{ marginRight: 10 }} spin />
                  Create trade
                </Button>
              )}
              {error.totalSellBiggerThanBuy && (
                <Message validation="error" style={{ marginBottom: 6, marginTop: 3 }}>
                  Sell amount can&apos;t be larger than buy amount
                </Message>
              )}
              {error.noEmptyBuyLayers && (
                <Message validation="error" style={{ marginBottom: 6, marginTop: 3 }}>
                  Buy layers can&apos;t be empty
                </Message>
              )}
              {error.noEmptySellLayers && (
                <Message validation="error" style={{ marginBottom: 6, marginTop: 3 }}>
                  Sell layers can&apos;t be empty
                </Message>
              )}
              {error.sellAmountTooSmallLayers && (
                <Message validation="error" style={{ marginBottom: 6, marginTop: 3 }}>
                  Sell amount in one of the layers could be too small. Read more on why this can
                  happen
                </Message>
              )}
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
