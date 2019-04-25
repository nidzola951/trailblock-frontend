import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuth } from '../AWSReduxSaga/selectors';
import { init, changePassword } from '../AWSReduxSaga/actions';
import PasswordChange from './PasswordChange';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        init,
        changePassword
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

export default compose(withConnect)(PasswordChange);
export { mapDispatchToProps };
