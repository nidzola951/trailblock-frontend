import React from 'react';
import PropTypes from 'prop-types';
import {
  faCog,
  faSignOut,
  faThLarge,
  faChartArea,
  faHistory,
  faLifeRing
} from '@fortawesome/pro-regular-svg-icons';

import { faSlack, faTwitter, faTelegramPlane } from '@fortawesome/free-brands-svg-icons';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { localStorageRemove } from '../../../utils/helpers';
import config from '../../../config/config';
import {
  Container,
  InnerContainer,
  Logo,
  Beta,
  Ul,
  Li,
  Icon,
  StyledLink,
  StyledLinkButton,
  SocialContainer,
  SocialButton,
  NotificationBadge
} from './SidebarStyles';

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

const Sidebar = props => {
  const activeClassName = 'MC4wNjI5NTgyMzMyODI1MDk4Mg';
  return (
    <Container>
      <InnerContainer>
        <Logo>
          <Beta>Alpha</Beta>
        </Logo>
        <Ul>
          <Li>
            <StyledLink to="/dashboard" activeClassName={activeClassName} exact>
              <Icon icon={faThLarge} />
              Overview
            </StyledLink>
            <StyledLink
              to={`/dashboard/trade/symbol/${props.symbolID}`}
              activeClassName={activeClassName}
              exact
            >
              <Icon icon={faChartArea} />
              Trade
            </StyledLink>
            <StyledLink to="/dashboard/activity" activeClassName={activeClassName} exact>
              <Icon icon={faHistory} />
              Activity Log
              {props.unreadNotifications !== 0 && (
                <NotificationBadge>{props.unreadNotifications}</NotificationBadge>
              )}
            </StyledLink>
            <StyledLink to="/dashboard/settings" activeClassName={activeClassName}>
              <Icon icon={faCog} />
              Settings
            </StyledLink>
            <StyledLink to="/dashboard/hc" activeClassName={activeClassName}>
              <Icon icon={faLifeRing} />
              Help Center
            </StyledLink>
            <StyledLinkButton activeClassName={activeClassName} onClick={() => logout()}>
              <Icon icon={faSignOut} />
              Log out
            </StyledLinkButton>
          </Li>
        </Ul>
      </InnerContainer>
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
    </Container>
  );
};

Sidebar.propTypes = {
  symbolID: PropTypes.string.isRequired,
  unreadNotifications: PropTypes.number.isRequired
};

export default Sidebar;
