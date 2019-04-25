import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';
import { loadBalancesHistory } from './actions';
import { makeSelectChartData, makeSelectLoading } from './selectors';
import saga from './saga';
import reducer from './reducer';
import Charts from './Charts';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        loadBalancesHistory
      },
      dispatch
    )
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  chartData: makeSelectChartData()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'chartData', reducer });
const withSaga = injectSaga({ key: 'chartData', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Charts);
export { mapDispatchToProps };
