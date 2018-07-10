const ICONS_FOLDER = 'new-icons';

const getNewImportPath = (value, {oldIconName, newIconData} = {}) => {
  const pathes = {
    commonSrcPath: `/src/Icons/dist/components/${oldIconName}`,
    commonPath: `/Icons/dist/components/${oldIconName}`,
    indexSrcPath: `/src/Icons/dist/index`,
    indexPath: `/Icons/dist/index`,
    rootSrcPath: `/src/Icons`,
    rootPath: `/Icons`
  };
  const isWSRMigration = process.env.MIGRATION === 'wix-style-react';
  const newIconName = newIconData && newIconData.value;
  const prefix = newIconData && newIconData.type === 'system' ? 'system/' : '';
  const newIconPath = `${ICONS_FOLDER}/${prefix}${newIconName}`;

  if (value.endsWith(pathes.indexSrcPath)) {
    return isWSRMigration ?
      value.replace(pathes.indexSrcPath, `/${ICONS_FOLDER}`) :
      `wix-style-react/${ICONS_FOLDER}`;
  } else if (value.endsWith(pathes.indexPath)) {
    return isWSRMigration ?
      value.replace(pathes.indexPath, `/${ICONS_FOLDER}`) :
      `wix-style-react/${ICONS_FOLDER}`;
  } else if (value.endsWith(pathes.rootSrcPath)) {
    return isWSRMigration ?
      value.replace(pathes.rootSrcPath, `/${ICONS_FOLDER}`) :
      `wix-style-react/${ICONS_FOLDER}`;
  } else if (value.endsWith(pathes.rootPath)) {
    return isWSRMigration ?
      value.replace(pathes.rootPath, `/${ICONS_FOLDER}`) :
      `wix-style-react/${ICONS_FOLDER}`;
  } else if (value.endsWith(pathes.commonSrcPath)) {
    return isWSRMigration ?
      value.replace(pathes.commonSrcPath, `/${newIconPath}`) :
      `wix-style-react/${newIconPath}`;
  } else if (value.endsWith(pathes.commonPath)) {
    return isWSRMigration ?
      value.replace(pathes.commonPath, `/${newIconPath}`) :
      `wix-style-react/${newIconPath}`;
  }
};

module.exports.getNewImportPath = getNewImportPath;
