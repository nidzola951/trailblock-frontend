import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import {
  makeSelectOpenTrades,
  makeSelectOpenTradesLoading,
  makeSelectLastPrices,
  makeSelectLastPricesLoading
} from './selectors';
import { makeSelectTickerInfo } from '../../selectors';
import { loadOpenTrades, loadLastPrices } from './actions';
import saga from './saga';
import reducer from './reducer';
import OpenTrades from './OpenTrades';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        loadOpenTrades,
        loadLastPrices
      },
      dispatch
    )
  };
}

const mapStateToProps = createStructuredSelector({
  tickerInfo: makeSelectTickerInfo(),
  openTrades: makeSelectOpenTrades(),
  openTradesInitialLoad: makeSelectOpenTradesLoading(),
  lastPrices: makeSelectLastPrices(),
  lastPricesInitialLoad: makeSelectLastPricesLoading()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'openTrades', reducer });
const withSaga = injectSaga({ key: 'openTrades', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(OpenTrades);
export { mapDispatchToProps };
