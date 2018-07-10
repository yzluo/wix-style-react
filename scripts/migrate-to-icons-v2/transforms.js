/* eslint-disable operator-linebreak */
const {renameIdentifier, getNewIconData} = require('./utils/helperUtils');
const {importTransformMap} = require('./utils/importUtils');

const updateImports = ({root, j, file, onError, onTick}) => {
  const oldIconsNames = [];
  /* all import declarations that match our icons regex */
  root
    .find(j.ImportDeclaration, {
      source: {
        type: 'Literal',
        value: value => value.match('/Icons')
      }
    })
    .forEach(({node}) => {
      const currentImportPath = node.source.value;
      /*
        we need to take first specifier, because it is enough to detect type,
        for named import, first specifier will always have same type as all others,
        for other type of imports, we always have just 1 specifier
      */
      const importType = node.specifiers[0].type;
      const transformFunc = importTransformMap[importType];
      if (transformFunc) {
        // we run transformation for current type of import
        const transformedIcons = transformFunc({
          node,
          currentImportPath,
          onError, onTick,
          file, root, j
        });
        // we save touched icons, because we need them for identifiers transformation
        oldIconsNames.push(...transformedIcons);
      }
    });
  return oldIconsNames;
};

const updateUsageOfOldIconToNewIcons = ({root, j, iconNames}) => {
  iconNames.forEach(name => {
    root
      .find(j.Identifier, {name})
      .paths()
      .forEach(path => {
        const newIconData = getNewIconData(name);
        if (newIconData && newIconData.type !== 'removed') {
          renameIdentifier(path, newIconData.value, j);
        }
      });
  });

  return root;
};

module.exports.transformFile = ({file, api, onError, onTick}) => {
  const j = api.jscodeshift;
  const root = j(file.source);
  // we update import paths
  const iconNames = updateImports({root, j, file, onTick, onError});
  // we update all icons usage, like <ArrowDown />, etc.
  return updateUsageOfOldIconToNewIcons({root, j, iconNames});
};
