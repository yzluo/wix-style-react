const {wixCssModulesRequireHook} = require('yoshi-runtime');
const {attachHook} = require('@stylable/node');

module.exports = {
  setup() {

    // Setup require hook for babel
    require('yoshi/src/require-hooks');

    // Setup require hook for css modules
    wixCssModulesRequireHook('./src');

    // Setup stylable
    attachHook({});
  },

  initializeRequireHooks: false
};
