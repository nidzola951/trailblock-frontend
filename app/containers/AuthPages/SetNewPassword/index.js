import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAuth } from '../AWSReduxSaga/selectors';
import { completeNewPassword } from '../AWSReduxSaga/actions';
import SetNewPassword from './SetNewPassword';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        completeNewPassword
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

export default compose(withConnect)(SetNewPassword);
export { mapDispatchToProps };
