import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../../utils/injectReducer';
import { makeSelectSymbolID, makeSelectTickerInfo } from '../selectors';
import { makeSelectPrices } from './selectors';
import { setSymbolID } from '../actions';
import { pricesLoaded } from './actions';
import reducer from './reducer';
import Trade from './Trade';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setSymbolID,
        pricesLoaded
      },
      dispatch
    )
  };
}

const mapStateToProps = createStructuredSelector({
  symbolID: makeSelectSymbolID(),
  prices: makeSelectPrices(),
  tickerInfo: makeSelectTickerInfo()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'trade', reducer });

export default compose(
  withReducer,
  withConnect
)(Trade);
export { mapDispatchToProps };
