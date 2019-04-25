import { createSelector } from 'reselect';

const selectDashboard = state => state.get('dashboard');

const makeSelectUserInfoError = () =>
  createSelector(
    selectDashboard,
    routeDashboard => routeDashboard.get('userInfoError')
  );

const makeSelectSymbolID = () =>
  createSelector(
    selectDashboard,
    routeDashboard => routeDashboard.get('symbolID')
  );

const makeSelectUserInfo = () =>
  createSelector(
    selectDashboard,
    routeDashboard => routeDashboard.get('userInfo')
  );

const makeSelectUserActivityError = () =>
  createSelector(
    selectDashboard,
    routeDashboard => routeDashboard.get('userActivityError')
  );

const makeSelectUserActivityLoading = () =>
  createSelector(
    selectDashboard,
    routeDashboard => routeDashboard.get('userActivityLoading')
  );

const makeSelectUserActivity = () =>
  createSelector(
    selectDashboard,
    routeDashboard => routeDashboard.get('userActivity')
  );

const makeSelectUnreadNotifications = () =>
  createSelector(
    selectDashboard,
    routeDashboard => routeDashboard.get('unreadNotifications')
  );

const makeSelectTickers = () =>
  createSelector(
    selectDashboard,
    routeDashboard => routeDashboard.get('tickers')
  );

const makeSelectTickerInfo = () =>
  createSelector(
    selectDashboard,
    routeDashboard => routeDashboard.get('tickerInfo')
  );

const makeSelectSomethingWentWrong = () =>
  createSelector(
    selectDashboard,
    routeDashboard => routeDashboard.get('somethingWentWrong')
  );

export {
  makeSelectUserInfoError,
  makeSelectSymbolID,
  makeSelectUserInfo,
  makeSelectUserActivityError,
  makeSelectUserActivityLoading,
  makeSelectUserActivity,
  makeSelectUnreadNotifications,
  makeSelectTickers,
  makeSelectTickerInfo,
  makeSelectSomethingWentWrong
};
