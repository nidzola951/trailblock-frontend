/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./util//logger');

const argv = require('./util/argv');
const port = require('./util//port');
const setup = require('./middlewares/frontendMiddleware');

const fs = require('fs');
const https = require('https');

const { resolve } = require('path');

const app = express();

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/'
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
let isGatewayIdEnabled = false;

process.argv.forEach(arg => {
  if (arg.indexOf('GATEWAY_AUTH_ID=') > -1) {
    isGatewayIdEnabled = true;
  }
});

if (!isGatewayIdEnabled) {
  https
    .createServer(
      {
        key: fs.readFileSync('server/server.key'),
        cert: fs.readFileSync('server/server.cert')
      },
      app
    )
    .listen(8080, host, err => {
      if (err) {
        return logger.error(err.message);
      }
      logger.appStartedHttps(port, prettyHost);
    });
} else {
  app.listen(port, host, err => {
    if (err) {
      return logger.error(err.message);
    }
    logger.appStartedHttp(port, prettyHost);
  });
}
