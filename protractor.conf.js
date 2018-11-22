const {retry} = require('protractor-retry');

module.exports.config = {
  specs: ['test/**/*.e2e.js', 'src/**/*.e2e.js'],
  baseUrl: `http://localhost:6006/`,
  jasmineNodeOpts: {defaultTimeoutInterval: 60000},
  onCleanUp(results) {
    retry.onCleanUp(results);
  },
  onPrepare() {
    retry.onPrepare();
    browser.ignoreSynchronization = true;
  },
  afterLaunch() {
    return retry.afterLaunch(2); // number of retries ( default is 2 )
  }
};
