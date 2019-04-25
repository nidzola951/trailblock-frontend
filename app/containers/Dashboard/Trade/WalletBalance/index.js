import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectSymbolID, makeSelectUserInfo } from '../../selectors';

import WalletBalance from './WalletBalance';

const mapStateToProps = createStructuredSelector({
  symbolID: makeSelectSymbolID(),
  userInfo: makeSelectUserInfo()
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(WalletBalance);
