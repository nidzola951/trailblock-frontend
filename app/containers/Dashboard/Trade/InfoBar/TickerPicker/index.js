import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectSymbolID, makeSelectTickers } from '../../../selectors';
import { setSymbolID } from '../../../actions';
import TickerPicker from './TickerPicker';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setSymbolID
      },
      dispatch
    )
  };
}

const mapStateToProps = createStructuredSelector({
  symbolID: makeSelectSymbolID(),
  tickers: makeSelectTickers()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(TickerPicker);
export { mapDispatchToProps };
