/* eslint no-console: 0 */

const execa = require('execa');

const options = { stdio: 'inherit' };

const testkit = execa.shell(
  'babel testkit --out-dir dist/testkit --copy-files --plugins=babel-plugin-transform-es2015-modules-commonjs',
  {
    ...options,
  },
);

const stories = execa.shell(
  'babel stories --out-dir dist/stories --copy-files --plugins=babel-plugin-transform-es2015-modules-commonjs',
  {
    ...options,
  },
);

const sources = (async () => {
  await execa.shell(
    'babel src --out-dir dist/es/src --copy-files --ignore "src/**/*.spec.js","src/**/*.driver.js"',
    {
      ...options,
    },
  );
  await execa.shell(
    'babel dist/es/src --out-dir dist/src --copy-files --plugins=babel-plugin-transform-es2015-modules-commonjs --no-babelrc',
    {
      ...options,
    },
  );
})();

Promise.all([testkit, stories, sources])
  .then(() => {
    console.log('Done!');
  })
  .catch(error => {
    console.warn(error);
  });
