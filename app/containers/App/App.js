import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';

import HomePage from '../../containers/HomePage/Loadable';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';

import Auth from '../AuthPages/Auth';
import Login from '../AuthPages/Login/Loadable';
import Register from '../AuthPages/Register/Loadable';
import Verification from '../AuthPages/Verification/Loadable';
import ForgotPassword from '../AuthPages/ForgotPassword/Loadable';
import PasswordChange from '../AuthPages/PasswordChange/Loadable';
import SetNewPassword from '../AuthPages/SetNewPassword/Loadable';

import DefaultLayout from '../Dashboard/Loadable';
import Overview from '../Dashboard/Overview/Loadable';
import Trade from '../Dashboard/Trade/Loadable';
import Activity from '../Dashboard/Activity/Loadable';
import Settings from '../Dashboard/Settings/Loadable';

import { localStorageGet } from '../../utils/helpers';

const DashboardRoute = ({ component: Component, ...rest }) => {
  const accessToken = localStorageGet('access_token');
  if (
    accessToken !== '' &&
    accessToken !== null &&
    accessToken !== undefined &&
    accessToken !== 'undefined'
  ) {
    return (
      <Route
        {...rest}
        render={matchProps => (
          <DefaultLayout>
            <Component {...matchProps} {...rest} />
          </DefaultLayout>
        )}
      />
    );
  }

  return <Redirect to="/login" />;
};

DashboardRoute.propTypes = {
  component: PropTypes.any
};

DashboardRoute.defaultProps = {
  component: ''
};

const App = () => (
  <React.Fragment>
    <Helmet titleTemplate="%s - Tools for trading cryptocurrencies" defaultTitle="Trailblock">
      <meta name="description" content="Tools for trading cryptocurrencies" />
    </Helmet>
    <Auth />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/password-reset" component={ForgotPassword} />
      <Route exact path="/password-change" component={PasswordChange} />
      <Route exact path="/verify-account" component={Verification} />
      <Route exact path="/set-new-password" component={SetNewPassword} />
      <DashboardRoute exact path="/dashboard" component={Overview} />
      <DashboardRoute exact path="/dashboard/trade/symbol/:symbolID" component={Trade} />
      <DashboardRoute exact path="/dashboard/settings/:tab?" component={Settings} />
      <DashboardRoute exact path="/dashboard/activity" component={Activity} />
      <Route path="" component={NotFoundPage} />
    </Switch>
    ç
  </React.Fragment>
);

export default withRouter(App);
