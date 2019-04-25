import {
  add,
  divide,
  formatNumberToTickSize,
  increaseByPercent,
  multiply,
  percentageDifference,
  getTickSize,
  getMinQty,
  decreaseByPercent
} from '../../../../../../utils/helpers';

export function setInitialState() {
  this.setState({
    symbolID: this.props.symbolID,
    buyLayers: [],
    sellLayers: [],
    buyForm: {
      buyPrice: formatNumberToTickSize(
        this.props.prices.bid,
        getTickSize(this.props.tickerInfo, this.props.symbolID)
      ),
      isMarketPrice: false,
      buyAmount: '',
      total: ''
    },
    sellForm: {
      amountPercent: '100',
      profitMarginPercent: '0',
      trailingMarginPercent: '0',
      sellPrice: formatNumberToTickSize(
        this.props.prices.ask,
        getTickSize(this.props.tickerInfo, this.props.symbolID)
      ),
      isTrailingEnabled: false
    },
    stopLoss: {
      stopLossType: 'fixed',
      stopLossFixedPrice: formatNumberToTickSize(
        this.props.prices.bid,
        getTickSize(this.props.tickerInfo, this.props.symbolID)
      ),
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
      noEmptySellLayers: false
    },
    highestBuyLayer: [],
    highestBuy: this.props.prices.bid,
    totalSellPercentAmount: '0',
    showBuyTable: false,
    showSellTable: false,
    isSellEnabled: false,
    isStoplossEnabled: false,
    isSubmissionLoading: false
  });
}

function getSmallestBuy(buyLayers, buyForm) {
  let smallestBuy = 100;
  if (buyLayers.length > 0) {
    buyLayers.forEach(layer => {
      if (layer.buyPrice < smallestBuy) {
        smallestBuy = layer.buyPrice;
      }
    });
  } else {
    smallestBuy = buyForm.buyPrice;
  }

  if (smallestBuy === '') {
    smallestBuy = '0';
  }

  return smallestBuy;
}

export function syncBuyTotal() {
  const { buyForm } = { ...this.state };
  if (buyForm.buyAmount === '' || buyForm.buyPrice === '') {
    buyForm.total = '';
  } else {
    buyForm.total = multiply(buyForm.buyAmount, buyForm.buyPrice);
  }
  this.setState({
    buyForm
  });
}

export function syncBuyAmount() {
  const { buyForm } = { ...this.state };

  if (buyForm.total === '' || buyForm.buyPrice === '') {
    buyForm.buyAmount = '';
  } else {
    buyForm.buyAmount = formatNumberToTickSize(
      divide(buyForm.total, buyForm.buyPrice),
      getMinQty(this.props.tickerInfo, this.props.symbolID)
    );
  }

  this.setState({
    buyForm
  });
}

export function syncSellFormPercentagesWithNumbers() {
  const { sellForm } = { ...this.state };
  let { highestBuy } = { ...this.state };
  if (highestBuy === '' || highestBuy === '0') highestBuy = this.props.prices.bid;

  sellForm.profitMarginPercent = percentageDifference(highestBuy, this.state.sellForm.sellPrice);
  this.setState({
    sellForm
  });
}

export function syncSellFormNumbersWithPercentages() {
  const { sellForm } = { ...this.state };
  let { highestBuy } = { ...this.state };
  if (highestBuy === '' || highestBuy === '0') highestBuy = this.props.prices.bid;
  sellForm.sellPrice = formatNumberToTickSize(
    increaseByPercent(highestBuy, sellForm.profitMarginPercent),
    getTickSize(this.props.tickerInfo, this.props.symbolID)
  );

  this.setState({
    sellForm
  });
}

export function syncStopLossNumbersWithPercentages() {
  const { stopLoss, buyLayers, buyForm } = { ...this.state };

  const smallestSellPrice = getSmallestBuy(buyLayers, buyForm);

  stopLoss.stopLossPriceEstimate = formatNumberToTickSize(
    decreaseByPercent(smallestSellPrice, stopLoss.stopLossPercentage),
    getTickSize(this.props.tickerInfo, this.props.symbolID)
  );

  this.setState({
    stopLoss
  });
}

export function syncStopLossPercentagesWithNumbers() {
  const { stopLoss, buyLayers, buyForm } = { ...this.state };

  const smallestSellPrice = getSmallestBuy(buyLayers, buyForm);

  stopLoss.stopLossPercentage = percentageDifference(
    smallestSellPrice,
    this.state.stopLoss.stopLossPriceEstimate
  );
  if (Number(stopLoss.stopLossPercentage) < 0) {
    stopLoss.stopLossPercentage = stopLoss.stopLossPercentage.substr(
      1,
      stopLoss.stopLossPercentage.length
    );
  } else {
    stopLoss.stopLossPercentage = '0';
  }
  this.setState({
    stopLoss
  });
}

export function syncTotals() {
  let totalSellPercentAmount = 0;

  if (this.state.sellLayers.length > 0) {
    this.state.sellLayers.forEach(layer => {
      totalSellPercentAmount = add(totalSellPercentAmount, layer.amountPercent);
    });
  }

  totalSellPercentAmount = String(totalSellPercentAmount);

  if (totalSellPercentAmount === '') {
    totalSellPercentAmount = '0';
  }

  this.setState({
    totalSellPercentAmount
  });
}

export function syncHighestBuy() {
  const { buyLayers, buyForm } = { ...this.state };
  let highestBuyLayer;
  let highestBuy = 0;
  if (buyLayers.length > 0) {
    buyLayers.forEach(layer => {
      if (layer.buyPrice > highestBuy) {
        highestBuy = layer.buyPrice;
        highestBuyLayer = layer;
      }
      if (layer.isMarketPrice) {
        highestBuyLayer = layer;
        highestBuy = this.props.prices.ask;
      }
    });
  } else if (buyForm.isMarketPrice) {
    highestBuyLayer = buyForm;
    highestBuy = this.props.prices.ask;
  } else {
    highestBuyLayer = buyForm;
    highestBuy = buyForm.buyPrice;
  }

  this.setState({
    highestBuyLayer,
    highestBuy
  });
}
