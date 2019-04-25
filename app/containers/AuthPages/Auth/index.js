import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { init } from '../AWSReduxSaga/actions';
import reducer from '../AWSReduxSaga/reducer';
import saga from '../AWSReduxSaga/sagas';
import Auth from './Auth';

import injectReducer from '../../../utils/injectReducer';
import injectSaga from '../../../utils/injectSaga';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        init
      },
      dispatch
    )
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Auth);
export { mapDispatchToProps };
