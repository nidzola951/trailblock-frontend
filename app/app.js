import 'babel-polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import createHistory from 'history/createBrowserHistory';
import { ThemeProvider } from '@zendeskgarden/react-theming';

import App from './containers/App';
// eslint-disable-next-line
import '!file-loader?name=[name].[ext]!./images/favicon.ico';

// Import CSS reset and Global Styles
import GlobalStyles from './assets/global-styles/GlobalStyles';

import configureStore from './configureStore';

const fontObserver = new FontFaceObserver('IBM Plex Sans', {});
fontObserver.load().then(
  () => {
    document.body.classList.add('fontLoaded');
  },
  () => {
    document.body.classList.remove('fontLoaded');
  }
);

const initialState = {};
const history = createHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

GlobalStyles();

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      {/* <LanguageProvider messages={messages}> */}
      <ConnectedRouter history={history}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ConnectedRouter>
      {/* </LanguageProvider> */}
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  module.hot.accept(['containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();
