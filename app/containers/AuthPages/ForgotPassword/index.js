import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuth } from '../AWSReduxSaga/selectors';
import { init, forgotPassword } from '../AWSReduxSaga/actions';
import ForgotPassword from './ForgotPassword';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        init,
        forgotPassword
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

export default compose(withConnect)(ForgotPassword);
export { mapDispatchToProps };
