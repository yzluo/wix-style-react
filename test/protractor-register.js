require('regenerator-runtime/runtime');
const sass = require('node-sass');
const {wixCssModulesRequireHook} = require('yoshi-runtime');

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
