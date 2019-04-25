import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  makeSelectUserActivity,
  makeSelectUserActivityError,
  makeSelectUserActivityLoading,
  makeSelectUnreadNotifications
} from '../selectors';

import Activity from './Activity';
import { setUnreadNotifications } from '../actions';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setUnreadNotifications
      },
      dispatch
    )
  };
}

const mapStateToProps = createStructuredSelector({
  userActivity: makeSelectUserActivity(),
  userActivityError: makeSelectUserActivityError(),
  userActivityLoading: makeSelectUserActivityLoading(),
  unreadNotifications: makeSelectUnreadNotifications()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Activity);
