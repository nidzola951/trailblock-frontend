import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { makeSelectLocation } from '../App/selectors';
import {
  makeSelectSymbolID,
  makeSelectUserActivityLoading,
  makeSelectUserInfo,
  makeSelectUserInfoError,
  makeSelectUnreadNotifications,
  makeSelectSomethingWentWrong
} from './selectors';
import { setSymbolID, loadUserInfo, loadUserActivity, loadTickersAndInfo } from './actions';
import saga from './saga';
import reducer from './reducer';
import Dashboard from './Dashboard';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setSymbolID,
        loadUserInfo,
        loadUserActivity,
        loadTickersAndInfo
      },
      dispatch
    )
  };
}

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  symbolID: makeSelectSymbolID(),
  userInfoError: makeSelectUserInfoError(),
  userInfo: makeSelectUserInfo(),
  userActivityLoading: makeSelectUserActivityLoading(),
  unreadNotifications: makeSelectUnreadNotifications(),
  somethingWentWrong: makeSelectSomethingWentWrong()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Dashboard);
export { mapDispatchToProps };
