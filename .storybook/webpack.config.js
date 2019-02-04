const merge = require('lodash/merge');
const path = require('path');
const wixStorybookConfig = require('yoshi/config/webpack.config.storybook');

module.exports = (config, env, defaultConfig) => {
  defaultConfig.module.rules[0].use[0].loader = require.resolve('babel-loader');

  const newConfig = wixStorybookConfig(defaultConfig);

  return merge(newConfig, {
    context: path.resolve(__dirname, '..', 'src'),
    resolve: {
      alias: {
        'wix-style-react': path.resolve(__dirname, '..', 'src'),
      },
    },
    module: {
      rules: newConfig.module.rules.concat({
        test: /\.story\.js$/,
        loader: 'wix-storybook-utils/loader',
        options: {
          storyConfig: {
            moduleName: 'wix-style-react',
            repoBaseURL:
              'https://github.com/wix/wix-style-react/tree/master/src/',
          },
        },
      }),
    },
  });
};
