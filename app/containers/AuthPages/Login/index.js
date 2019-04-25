import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuth } from '../AWSReduxSaga/selectors';
import { init, signIn } from '../AWSReduxSaga/actions';
import Login from './Login';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        init,
        signIn
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

export default compose(withConnect)(Login);
export { mapDispatchToProps };
