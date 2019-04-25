import React from 'react';
import PropTypes from 'prop-types';

import { faWallet } from '@fortawesome/pro-light-svg-icons/faWallet';

import { ButtonLink, Icon, Container } from './Styles';

import { splitSymbol, getBalance } from '../../../../utils/helpers';

class WalletBalance extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object.isRequired,
    symbolID: PropTypes.string.isRequired,
    tab: PropTypes.string.isRequired
  };
  getSymbol = () => {
    if (this.props.tab === 'buy') {
      return splitSymbol(this.props.symbolID, 2);
    }
    return splitSymbol(this.props.symbolID, 1);
  };
  render() {
    return (
      <Container>
        <Icon icon={faWallet} />
        Wallet Ballance:
        <ButtonLink>
          {getBalance(this.props.symbolID, this.props.tab, this.props.userInfo.balances)}
        </ButtonLink>
        {this.getSymbol()}
      </Container>
    );
  }
}

export default WalletBalance;
