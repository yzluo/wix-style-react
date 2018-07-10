const {transformFile} = require('./transforms');

const RED = '\x1b[31m';
const CYAN = '\x1b[36m';
/*
  global arrays of errors and migratedIcons,
  which required to give ability to log all metadata after transformation
*/
const errors = [];
const migratedIcons = [];

const printDepricationMessage = error => {
  console.log(RED, error.text);
  console.log(CYAN, 'Problem happen in file', error.where);
  console.log(CYAN, 'On trying to migrate such value', error.fullValue);
  console.log('\n');
};

/*
  if error is happend, then we want to store info about the error,
  to be able to log it, after transformation will be done
*/
const onError = ({oldIconName, where, fullValue}) => {
  errors.push({
    where,
    fullValue,
    text: `Icon with name "${oldIconName}" is not supported anymore, please ask your UX person to provide alternative`
  });
};

/*
  if icon is migrated, then we want to store info about this icon,
  to be able to log it, after transformation will be done
*/
const onTick = ({oldIconName, newIconName, where, fullValue}) => {
  migratedIcons.push({
    where,
    fullValue,
    text: `Icon with name "${oldIconName}" was migrated, now it called "${newIconName}`
  });
};

module.exports = (file, api) => {
  /*
    here we operate just with 1 file, which is comming from jscodeshift,
    result of the transformation stored in `result` var
  */
  const result = transformFile({file, api, onError, onTick});

  /* we log how much icons was migrated succesfully */
  console.log(CYAN, '\n', migratedIcons.length, 'icons was migrated, in file', file.path, '\n');

  /* if we have errors, we log number of errors and all errors */
  if (errors.length) {
    console.log(RED, '\n', errors.length, ' icons was not migrated and require your attention: \n');
    errors.forEach(printDepricationMessage);
  }

  // we transform result to source and return it, all other disk stuff will be handled by jscodeshift
  return result.toSource({quote: 'single'});
};
