import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectSymbolID, makeSelectUserInfo, makeSelectTickerInfo } from '../../selectors';
import { makeSelectPrices } from '../selectors';

import BuyTools from './BuyToolsSection';
import { loadUserInfo } from '../../actions';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        loadUserInfo
      },
      dispatch
    )
  };
}

const mapStateToProps = createStructuredSelector({
  symbolID: makeSelectSymbolID(),
  prices: makeSelectPrices(),
  tickerInfo: makeSelectTickerInfo(),
  userInfo: makeSelectUserInfo()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(BuyTools);
export { mapDispatchToProps };
