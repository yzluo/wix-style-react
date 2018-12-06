console.log('hooks');
// module.exports = () => {
  require('yoshi/src/require-hooks');
  require('yoshi-runtime').wixCssModulesRequireHook('./src');
  require('@stylable/node').attachHook();
// };
