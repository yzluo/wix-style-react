import React from 'react';
import { emptyStateTestkitFactory, searchTestkitFactory } from "../../testkit";

const itemPickerContentDriverFactory = ({ element }) => {
  const emptyStateDriver = emptyStateTestkitFactory({ wrapper: element, dataHook: 'empty-message' });
  const searchDriver = searchTestkitFactory({ wrapper: element, dataHook: 'search' });
  // console.log(searchDriver);

  return {
    emptyMessageExists: () => emptyStateDriver.exists(),
    searchFor: key => searchDriver.pressKey(key)
  };
};

export default itemPickerContentDriverFactory;
