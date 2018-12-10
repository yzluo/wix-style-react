import React from 'react';
import {
  emptyStateTestkitFactory,
  searchTestkitFactory,
  dropdownLayoutTestkitFactory,
} from '../../testkit';
import { dataHooks } from './utils';
import { resolveIn } from '../../test/utils';

const itemPickerContentDriverFactory = ({ element, wrapper }) => {
  const emptyStateTestkit = emptyStateTestkitFactory({
    wrapper: element,
    dataHook: dataHooks.emptyMessage,
  });

  const searchTestkit = searchTestkitFactory({
    wrapper: element,
    dataHook: dataHooks.search,
  });

  let dropdownTestkit;
  resolveIn(1000).then(() => {
    dropdownTestkit = dropdownLayoutTestkitFactory({
      wrapper: element,
      dataHook: dataHooks.itemsDropdown,
    });
  });

  return {
    searchExists: () => searchTestkit.exists(),
    emptyMessageExists: () => emptyStateTestkit.exists(),
    dropdownExists: () => dropdownTestkit.exists(),
    searchFor: query => {
      searchTestkit.inputDriver.focus();
      searchTestkit.inputDriver.enterText(query);
    },
    waitForDebounce: async () =>
      resolveIn(10000).then(() => {}),
  };
};

export default itemPickerContentDriverFactory;
