import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectPrices } from '../selectors';
import { makeSelectTickerInfo, makeSelectSymbolID } from '../../selectors';

import InfoBar from './InfoBar';

const mapStateToProps = createStructuredSelector({
  symbolID: makeSelectSymbolID(),
  prices: makeSelectPrices(),
  tickerInfo: makeSelectTickerInfo()
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(InfoBar);
