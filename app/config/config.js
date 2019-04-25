const config = {
  host: '',
  api: '',
  binanceApi: '',
  gatewayAuthId: null
};

if (process.env.NODE_ENV === 'development') {
  config.host = '';
} else if (process.env.NODE_ENV === 'production') {
  config.host = '';
} else {
  config.host = '';
}

process.argv.argv.forEach(argv => {
  if (argv.indexOf('GATEWAY_AUTH_ID=') > -1) {
    config.gatewayAuthId = argv.substr(16, argv.length);
    config.api = 'http://localhost:9001';
  }
});

export default config;
