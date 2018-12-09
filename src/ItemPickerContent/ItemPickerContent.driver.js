import React from 'react';
import { emptyStateTestkitFactory, searchTestkitFactory } from "../../testkit";
import { dataHooks } from "./utils";

const itemPickerContentDriverFactory = ({ element }) => {
  const emptyStateDriver = emptyStateTestkitFactory({ wrapper: element, dataHook: 'empty-message' });
  const searchTestKit = searchTestkitFactory({ wrapper: element, dataHook: dataHooks.search });

  return {
    searchExists: () => searchTestKit.exists(),
    emptyMessageExists: () => emptyStateDriver.exists(),
    searchFor: key => searchDriver.pressKey(key)
  };
};

export default itemPickerContentDriverFactory;
