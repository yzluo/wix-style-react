#!/usr/bin/env node
const {exec} = require('child_process');

/* {path: src/, type: 'external'} */
const getUserArgs = () => {
  const [,, ...args] = process.argv;

  /* take path and type values from user input, or use default fallback(src/ folder and external projects) */
  const pathArg = args.find(arg => arg.startsWith('--path')) || '--path=src/';
  const typeArg = args.find(arg => arg.startsWith('--type')) || '--type=external';
  const path = pathArg.split('=')[1];
  const type = typeArg.split('=')[1];

  return {path, type};
};

/* absolute path to wix-style-react folder, we need it to get migration script */
const getPathToWSRFolder = () => {
  const moduleName = 'wix-style-react';
  const pathToModuleRoot = require.resolve(moduleName);
  return pathToModuleRoot.substr(0, pathToModuleRoot.indexOf(moduleName) + moduleName.length);
};

/* here we run jscodeshift on each file inside `path`, and transform this file with migrate-to-icons-v2 script */
const run = () => {
  const pathToModuleFolder = getPathToWSRFolder();
  const {type, path} = getUserArgs();
  const execProc = exec(`MIGRATION=${type} jscodeshift -t ${pathToModuleFolder}/scripts/migrate-to-icons-v2 ${path}`);
  execProc.stdout.on('data', data => console.log(data.toString()));
  execProc.stderr.on('data', data => console.log(data.toString()));
  execProc.on('exit', code => console.log('Done with code:', code.toString()));
};

run();
