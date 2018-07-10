const fs = require('fs');
const shell = require('child_process').execSync;

const copyFolderWithIconsToSrcForStorybookOnDisk = iconsDir => {
  shell(`mkdir -p ./src/${iconsDir}`);
  shell(`cp -r ${iconsDir}/* ./src/${iconsDir}`);
};

const createFile = (name, content, pathToFile) => fs.writeFileSync(pathToFile + name, content);

const createFolderForIconsOnDisk = iconsDir => {
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
  }
  if (!fs.existsSync(`${iconsDir}/system`)) {
    fs.mkdirSync(`${iconsDir}/system`);
  }
};

const writeIconsFilesToFolderOnDisk = (iconsFilesContentMap, iconsDir, prefix = '') => {
  Object.keys(iconsFilesContentMap)
    .forEach(iconName => {
      createFile(iconName, iconsFilesContentMap[iconName], `${iconsDir}/${prefix}`);
      console.log('\x1b[36m', `"${prefix}${iconName}" was created`);
    });
};

const writeIndexFileToDisk = (indexFileContent, iconsDir) => {
  createFile('index.js', indexFileContent, iconsDir + '/');
  console.log('\x1b[36m', `"index.js was created`);
};

const readArrayOfFilesInFolderOnDisk = dirname => fs.readdirSync(dirname);

module.exports = {
  copyFolderWithIconsToSrcForStorybookOnDisk,
  createFolderForIconsOnDisk,
  writeIconsFilesToFolderOnDisk,
  writeIndexFileToDisk,
  readArrayOfFilesInFolderOnDisk
};
