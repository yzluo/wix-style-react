module.exports.config = {
  specs: ['test/**/*.e2e.js', 'src/**/*.e2e.js'],
  baseUrl: `http://localhost:6006/`,
  jasmineNodeOpts: {defaultTimeoutInterval: 60000},
  capabilities: {
    browserName: 'chrome',
    shardTestFiles: true,
    maxInstances: 8,
    chromeOptions: {
      args: ['--headless']
    }
  },
  onPrepare() {
    require('./test/protractor-register');
    browser.ignoreSynchronization = true;
  }
};
