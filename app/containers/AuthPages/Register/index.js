import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuth } from '../AWSReduxSaga/selectors';
import { init, signUp } from '../AWSReduxSaga/actions';
import Register from './Register';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        init,
        signUp
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

export default compose(withConnect)(Register);
export { mapDispatchToProps };
