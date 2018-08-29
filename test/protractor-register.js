require('regenerator-runtime/runtime');
const sass = require('node-sass');
const {wixCssModulesRequireHook} = require('yoshi-runtime');
const {tryRequire} = require('yoshi/src/utils');

tryRequire('../private/node_modules/wix-eyes-env');

// Private Wix environment config for screenshot reporter
// Read how to set your own params (if needed) here: https://github.com/wix/screenshot-reporter#usage
tryRequire('../private/node_modules/screenshot-reporter-env');

require('yoshi/src/require-hooks');

const rootDir = './src';

wixCssModulesRequireHook(rootDir, {
  preprocessCss: (data, file) =>
    sass.renderSync({
      data,
      file,
      includePaths: ['node_modules', 'node_modules/compass-mixins/lib']
    }).css
});
