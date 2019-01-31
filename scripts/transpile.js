/* eslint no-console: 0 */

const execa = require('execa');
const ProgressBar = require('progress');

const STEP_WIDTH = 9;
const STEPS = 4;
const options = { stdio: 'pipe', env: { FORCE_COLOR: true } };

const progress = new ProgressBar(
  'Transpiling `src` -> `dist` :bar :percent :dir',
  {
    total: STEP_WIDTH * STEPS,
  },
);

const testkit = execa
  .shell(
    'babel testkit --out-dir dist/testkit --copy-files --plugins=@babel/plugin-transform-modules-commonjs',
    {
      ...options,
    },
  )
  .then(() => {
    progress.tick(STEP_WIDTH, {
      dir: 'testkit',
    });
  });

const stories = execa
  .shell(
    'babel stories --out-dir dist/stories --copy-files --plugins=@babel/plugin-transform-modules-commonjs',
    {
      ...options,
    },
  )
  .then(() => {
    progress.tick(STEP_WIDTH, {
      dir: 'stories',
    });
  });

const sources = (async () => {
  await execa.shell(
    'babel src --out-dir dist/es/src --copy-files --ignore "*.spec.js","*.driver.js"',
    {
      ...options,
    },
  );
  progress.tick(STEP_WIDTH, {
    dir: 'es6',
  });
  await execa.shell(
    'babel dist/es/src --out-dir dist/src --copy-files --plugins=@babel/plugin-transform-modules-commonjs --no-babelrc --ignore "*.spec.js","*.driver.js"',
    {
      ...options,
    },
  );
  progress.tick(STEP_WIDTH, {
    dir: 'es5',
  });
})();

Promise.all([testkit, stories, sources]).catch(error => {
  progress.interrupt('Error');
  return Promise.reject(error);
});
