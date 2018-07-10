const {readArrayOfFilesInFolderOnDisk} = require('./diskUtils.js');

const byJsExtension = filename => filename.endsWith('.js');

const createIconProxyFileContent = iconName => `module.exports = require('wix-ui-icons-common/${iconName}');\n`;

const getPathToWixUiIconsCommonFolder = moduleName => {
  const pathToModuleRoot = require.resolve(moduleName);
  return pathToModuleRoot.substr(0, pathToModuleRoot.indexOf('wix-ui-icons-common') + moduleName.length);
};

const getArrayOfGeneralIcons = moduleName => readArrayOfFilesInFolderOnDisk(
  getPathToWixUiIconsCommonFolder(moduleName)
).filter(byJsExtension);

const getArrayOfSystemIcons = moduleName => readArrayOfFilesInFolderOnDisk(
  `${getPathToWixUiIconsCommonFolder(moduleName)}/system`
).filter(byJsExtension);

/* {[systemIconName]: `module.exports = require('wix-ui-icons-common/${systemIconName}');`} */
const prepareSystemIconsContentMap = moduleName => {
  const listOfSystemIcons = getArrayOfSystemIcons(moduleName);
  return listOfSystemIcons.reduce((res, iconName) => {
    res[iconName] = createIconProxyFileContent(`system/${iconName}`);
    return res;
  }, {});
};

/* {[generalIconName]: `module.exports = require('wix-ui-icons-common/${generalIconName}');`} */
const prepareGeneralIconsContentMap = moduleName => {
  const listOfCommonIcons = getArrayOfGeneralIcons(moduleName);
  return listOfCommonIcons.reduce((res, iconName) => {
    res[iconName] = createIconProxyFileContent(iconName);
    return res;
  }, {});
};

/* named exports for all available icons */
const prepareIndexFileContentForNamedExport = icons => {
  const indexFileContent = Object
    .keys(icons)
    .reduce((res, iconName) => {
      const name = iconName.replace('.js', '');
      const exportFunc = `Object.defineProperty(exports, '${name}', {enumerable: true, get: function get() { return _interopRequireDefault(_${name}).default;}});\n`;
      return res + `var _${name} = require('./${iconName}');\n` + exportFunc;
    }, '');
  return `/*eslint-disable*/Object.defineProperty(exports, '__esModule', {value: true});\n${indexFileContent}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : {default: obj};}`;
};

module.exports = {
  prepareIndexFileContentForNamedExport,
  prepareGeneralIconsContentMap,
  prepareSystemIconsContentMap
};
