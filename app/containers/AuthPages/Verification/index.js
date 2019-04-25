import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuth } from '../AWSReduxSaga/selectors';
import { init, verifyAccount } from '../AWSReduxSaga/actions';
import Verification from './Verification';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        init,
        verifyAccount
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

export default compose(withConnect)(Verification);
export { mapDispatchToProps };
