import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { loadUserInfo, setSomethingWentWrong } from '../../actions';
import Api from './Api';

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        loadUserInfo,
        setSomethingWentWrong
      },
      dispatch
    )
  };
}

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Api);
export { mapDispatchToProps };
