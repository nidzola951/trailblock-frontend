import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import ButterToast, { POS_BOTTOM, POS_CENTER } from 'butter-toast';

import styled from 'styled-components';
import { Col, Grid, Row } from '@zendeskgarden/react-grid';
import { Alert, Title, Notification } from '@zendeskgarden/react-notifications';

import '@zendeskgarden/react-notifications/dist/styles.css';

import '../../assets/global-styles/button.scss';
import '../../assets/global-styles/input.scss';
import '../../assets/global-styles/select.scss';
import '../../assets/global-styles/range.scss';
import '../../assets/global-styles/table.scss';
import '../../assets/global-styles/radio.scss';
import '../../assets/global-styles/toggle.scss';
import '../../assets/global-styles/tooltips.scss';
import '../../assets/global-styles/pagnation.scss';

import Header from './Header/Header';
import LoadingIndicator from '../../components/LoadingIndicator';

const Container = styled.div`
  padding: 65px 20px 10px 20px;
`;

export default class Dashboard extends React.Component {
  componentDidMount() {
    this.props.actions.loadUserInfo();
    this.props.actions.loadUserActivity();

    this.intervalFunction = setInterval(() => {
      if (this.props.userInfoError === '') {
        console.log('noti');
        this.props.actions.loadUserInfo();
        this.props.actions.loadTickersAndInfo();
      }
    }, 5000);
  }
  componentWillUnmount = () => {
    clearInterval(this.intervalFunction);
  };
  errorRenderCheck = () => {
    if (this.props.userInfoError.msg) {
      if (
        this.props.userInfoError.msg === 'Invalid API-key, IP, or permissions for action.' ||
        this.props.userInfoError.msg.indexOf('API key/secret invalid') !== -1
      ) {
        return (
          <Col md={12}>
            <Alert type="error" style={{ marginBottom: 10 }}>
              <Title>Please update your API keys</Title>
              In order for Trailblock to function, you need to update your API Keys. You can click
              here to find out why your API keys maybe became invalid. If you updated your keys, but
              you still see this message, please click here to contact support about the issue.
            </Alert>
          </Col>
        );
      }
      if (this.props.userInfoError.msg === 'API user missing.') {
        return (
          <Col md={12}>
            <Alert type="warning" style={{ marginBottom: 10 }}>
              <Title>Please set up API keys</Title>
              In order for Trailblock to function, you need to set up your API Keys. If you are
              interested in why we need them, you can read more about it by clicking here. If you
              are not sure where to find your API Keys, you can click here to find a guide on how to
              do it.
            </Alert>
          </Col>
        );
      }
    } else {
      if (
        this.props.userInfoError === 'Invalid API-key, IP, or permissions for action.' ||
        this.props.userInfoError.indexOf('API key/secret invalid') !== -1
      ) {
        return (
          <Col md={12}>
            <Alert type="error" style={{ marginBottom: 10 }}>
              <Title>Please update your API keys</Title>
              In order for Trailblock to function, you need to update your API Keys. You can click
              here to find out why your API keys maybe became invalid. If you updated your keys, but
              you still see this message, please click here to contact support about the issue.
            </Alert>
          </Col>
        );
      }
      if (this.props.userInfoError === 'API user missing.') {
        return (
          <Col md={12}>
            <Alert type="warning" style={{ marginBottom: 10 }}>
              <Title>Please set up API keys</Title>
              In order for Trailblock to function, you need to set up your API Keys. If you are
              interested in why we need them, you can read more about it by clicking here. If you
              are not sure where to find your API Keys, you can click here to find a guide on how to
              do it.
            </Alert>
          </Col>
        );
      }
    }
    return '';
  };
  render() {
    const position = {
      vertical: POS_BOTTOM,
      horizontal: POS_CENTER
    };
    if (this.props.somethingWentWrong) {
      return (
        <Container>
          <Row>
            <Col md={4} />
            <Col md={4}>
              <Notification type="error" style={{ marginBottom: 10 }}>
                <Title>Something went wrong</Title>
                Seems that something went wrong. Please, refresh the page and try again. If you
                continue seeing this message, please contact us on Slack or contact support.
              </Notification>
            </Col>
          </Row>
        </Container>
      );
    }

    if (window.location.pathname !== '/dashboard/settings/api') {
      if (this.props.userInfoError.msg) {
        if (
          this.props.userInfoError.msg === 'API user missing.' ||
          this.props.userInfoError.msg === 'API key/secret missing.' ||
          this.props.userInfoError.msg === 'Invalid API-key, IP, or permissions for action.' ||
          this.props.userInfoError.msg.indexOf('API key/secret invalid') !== -1
        ) {
          return <Redirect to="/dashboard/settings/api" />;
        }
      } else if (
        this.props.userInfoError === 'API user missing.' ||
        this.props.userInfoError === 'API key/secret missing.' ||
        this.props.userInfoError === 'Invalid API-key, IP, or permissions for action.' ||
        this.props.userInfoError.indexOf('API key/secret invalid') !== -1
      ) {
        return <Redirect to="/dashboard/settings/api" />;
      }
    }

    if (this.props.userInfo === null && window.location.pathname !== '/dashboard/settings/api') {
      return <LoadingIndicator />;
    }
    return (
      <Container>
        <Grid>
          <Header
            symbolID={this.props.symbolID}
            unreadNotifications={
              this.props.userActivityLoading ? 0 : this.props.unreadNotifications
            }
          />
          <Grid>
            <Row>
              <Col md={12}>
                {this.errorRenderCheck()}
                {this.props.children}
              </Col>
            </Row>
          </Grid>
          <ButterToast position={position} />
        </Grid>
      </Container>
    );
  }
}

Dashboard.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  symbolID: PropTypes.string.isRequired,
  userInfoError: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,
  // eslint-disable-next-line react/require-default-props
  userInfo: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  userActivityLoading: PropTypes.bool.isRequired,
  unreadNotifications: PropTypes.number,
  somethingWentWrong: PropTypes.bool.isRequired
};

Dashboard.defaultProps = {
  children: '',
  unreadNotifications: 0
};
