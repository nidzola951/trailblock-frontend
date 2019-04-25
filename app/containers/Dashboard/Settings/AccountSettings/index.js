import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuth } from '../../../AuthPages/AWSReduxSaga/selectors';
import { changePasswordAuthenticated } from '../../../AuthPages/AWSReduxSaga/actions';
import AccountSettings from './AccountSettings';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        changePasswordAuthenticated
      },
      dispatch
    )
  };
}

const mapStateToProps = createStructuredSelector({
  auth: makeSelectAuth
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(AccountSettings);
export { mapDispatchToProps };
