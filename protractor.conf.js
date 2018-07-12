module.exports.config = {
  specs: [
    'test/**/*.e2e.js',
    'src/**/*.e2e.js',
    'test/**/*.e2e.ts',
    'src/**/*.e2e.ts'],
  baseUrl: `http://localhost:6006/`,

  onPrepare() {
    browser.ignoreSynchronization = true;
  }
};
