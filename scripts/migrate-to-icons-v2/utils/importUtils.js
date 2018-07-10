const {getNewImportPath} = require('./pathUtils');
const {getNewIconData} = require('./helperUtils');

const importTransformMap = {
  ImportDefaultSpecifier: ({node, currentImportPath, onTick, onError, file}) => {
    if (currentImportPath.match('/components/')) {
      const oldIconName = currentImportPath.split('/components/')[1];
      const newIconData = getNewIconData(oldIconName);

      if (newIconData && newIconData.type !== 'removed') {
        onTick({
          newIconName: newIconData.value,
          oldIconName,
          where: file.path,
          fullValue: node.source.value
        });
      } else {
        onError({
          oldIconName,
          where: file.path,
          fullValue: node.source.value
        });
      }

      node.source.value = getNewImportPath(currentImportPath, {oldIconName, newIconData});
      return newIconData && newIconData.type !== 'removed' ? [oldIconName] : [];
    }
  },
  ImportSpecifier: ({node, currentImportPath, onTick, onError, file}) => {
    const oldIconsNames = [];
    node.specifiers.forEach(specifier => {
      const oldIconName = specifier.imported.name;
      const newIconData = getNewIconData(oldIconName);

      if (newIconData && newIconData.type !== 'removed') {
        oldIconsNames.push(oldIconName);
        onTick({
          newIconName: newIconData.value,
          oldIconName,
          where: file.path,
          fullValue: node.source.value
        });
      } else {
        onError({
          oldIconName,
          where: file.path,
          fullValue: node.source.value
        });
      }

    });
    node.source.value = getNewImportPath(currentImportPath);
    return oldIconsNames;
  },
  ImportNamespaceSpecifier: ({node, currentImportPath, root, j, onTick, onError, file}) => {
    const oldIconsNames = [];
    // name of namespace variable import * as Icons from '...', variableName === Icons
    const variableName = node.specifiers[0].local ? node.specifiers[0].local.name : '';
    // we looking for all Icons.* usages
    root
      .find(j.Identifier, {name: variableName})
      .forEach(({parentPath}) => {
        // if we have parentPath with node and property, then it name === oldIconName
        if (parentPath && parentPath.node && parentPath.node.property && parentPath.node.property.name) {
          const oldIconName = parentPath.node.property.name;
          const newIconData = getNewIconData(oldIconName);

          // as previously, we add icon to list of old icons and save info for logs
          if (newIconData && newIconData.type !== 'removed') {
            oldIconsNames.push(oldIconName);
            onTick({
              newIconName: newIconData.value,
              oldIconName,
              where: file.path,
              fullValue: node.source.value
            });
          } else {
            onError({
              oldIconName,
              where: file.path,
              fullValue: node.source.value
            });
          }

        }
      });

    node.source.value = getNewImportPath(currentImportPath);
    return oldIconsNames;
  }
};

module.exports.importTransformMap = importTransformMap;
