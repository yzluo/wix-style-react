module.exports.config = {
  specs: ['./src/Text/Text.e2e.js'],
  baseUrl: `http://localhost:6006/`,

  onPrepare() {
    browser.ignoreSynchronization = true;
  }
};
