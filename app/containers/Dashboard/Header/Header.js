import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  faCog,
  faSignOutAlt,
  faThLarge,
  faChartArea,
  faBell,
  faLifeRing
} from '@fortawesome/pro-regular-svg-icons';

import { faSlack, faTwitter, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { localStorageRemove } from '../../../utils/helpers';
import config from '../../../config/config';
import {
  Container,
  LeftContainer,
  SocialContainer,
  SocialButton,
  CenterContainer,
  RightContainer,
  Logo,
  Beta,
  Icon,
  StyledLink,
  SimpleStyledLink,
  StyledLinkButton,
  NotificationBadge
} from './HeaderStyles';

function logout() {
  localStorageRemove('access_token');
  localStorageRemove('accessToken');
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (
      key.indexOf('CognitoIdentityServiceProvider') > -1 ||
      key === 'accessToken' ||
      key === 'access_token'
    ) {
      localStorageRemove(key);
    }
  }
  window.location.replace(config.host);
}

export default class Header extends React.Component {
  state = {
    toDashboard: false
  };
  componentDidUpdate() {
    if (this.state.toDashboard && window.location.pathname === '/dashboard') {
      // eslint-disable-next-line
      this.setState({
        toDashboard: false
      });
    }
  }
  backToHomepage = () => {
    this.setState({
      toDashboard: true
    });
  };

  render() {
    if (this.state.toDashboard === true && window.location.pathname !== '/dashboard') {
      return <Redirect to="/dashboard" />;
    }
    const activeClassName = 'MC4wNjI5NTgyMzMyODI1MDk4Mg';
    return (
      <Container>
        <LeftContainer>
          <Logo onClick={this.backToHomepage}>
            <Beta>Alpha</Beta>
          </Logo>
        </LeftContainer>
        <SocialContainer>
          <SocialButton
            href="https://join.slack.com/t/trailblock/shared_invite/enQtNTQ0NjE4NjE4Nzg2LTQ5YmI0MTkwYmRjMzU3MDk4NDg2NmIxODUyNDhhMWI4YTVlOWE1YzYwY2Q2NmYzMjFhNTk1NTJjZjg5NzdjM2Q"
            target="_blank"
          >
            <FontAwesomeIcon icon={faSlack} />
          </SocialButton>
          <SocialButton href="https://twitter.com/trailblock" target="_blank">
            <FontAwesomeIcon icon={faTwitter} />
          </SocialButton>
          <SocialButton href="https://t.me/trailblock" target="_blank">
            <FontAwesomeIcon icon={faTelegramPlane} />
          </SocialButton>
        </SocialContainer>
        <CenterContainer>
          <StyledLink
            to="/dashboard"
            activeClassName={activeClassName}
            exact
            style={{ marginRight: 7 }}
          >
            <Icon icon={faThLarge} />
            Overview
          </StyledLink>
          <StyledLink
            to={`/dashboard/trade/symbol/${this.props.symbolID}`}
            activeClassName={activeClassName}
            exact
            style={{ marginLeft: 7 }}
          >
            <Icon icon={faChartArea} />
            Trade
          </StyledLink>
        </CenterContainer>
        <RightContainer>
          <SimpleStyledLink to="/dashboard/activity" activeClassName={activeClassName} exact>
            <Icon icon={faBell} />
            {this.props.unreadNotifications !== 0 && (
              <NotificationBadge>{this.props.unreadNotifications}</NotificationBadge>
            )}
          </SimpleStyledLink>
          <SimpleStyledLink to="/dashboard/settings" activeClassName={activeClassName}>
            <Icon icon={faCog} />
          </SimpleStyledLink>
          <SimpleStyledLink to="/dashboard/hc" activeClassName={activeClassName}>
            <Icon icon={faLifeRing} />
          </SimpleStyledLink>
          <StyledLinkButton activeClassName={activeClassName} onClick={() => logout()}>
            <Icon icon={faSignOutAlt} />
          </StyledLinkButton>
        </RightContainer>
      </Container>
    );
  }
}

Header.propTypes = {
  symbolID: PropTypes.string.isRequired,
  unreadNotifications: PropTypes.number.isRequired
};
