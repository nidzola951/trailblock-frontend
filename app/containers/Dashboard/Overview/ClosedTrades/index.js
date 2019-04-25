import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import { makeSelectClosedTrades, makeSelectClosedTradesLoading } from './selectors';
import { makeSelectTickerInfo } from '../../selectors';
import { loadClosedTrades } from './actions';
import saga from './saga';
import reducer from './reducer';
import ClosedTrades from './ClosedTrades';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        loadClosedTrades
      },
      dispatch
    )
  };
}

const mapStateToProps = createStructuredSelector({
  closedTrades: makeSelectClosedTrades(),
  closedTradesInitialLoad: makeSelectClosedTradesLoading(),
  tickerInfo: makeSelectTickerInfo()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'closedTrades', reducer });
const withSaga = injectSaga({ key: 'closedTrades', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ClosedTrades);
export { mapDispatchToProps };
