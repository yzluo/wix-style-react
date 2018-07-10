/*
 it was created with such script
  JSON.stringify(
    $$('tr').reduce(
      (res, node) => {
        res[node.childNodes[0].textContent] = {
          value: node.childNodes[1].textContent === '💀'
            ? ''
            :node.childNodes[1].textContent.replace('system/', ''),
          type: node.childNodes[1].textContent === '💀'
            ? 'removed'
            : node.childNodes[1].textContent.includes('system/') ? 'system' : 'general'
        };
        return res;
      }, {}
    ), null, 4
  )

  ran on http://electric-process.surge.sh/
*/
const oldToNewIconsNamesMap = require('./../assets/oldToNewIconsNamesMap.json');

// it will return {value: IconName, type: system | general | removed}
module.exports.getNewIconData = oldIconName => oldToNewIconsNamesMap[oldIconName];
module.exports.renameIdentifier = (path, newName, j) => j(path).replaceWith(() => j.identifier(newName));
