import React from 'react';
import { textTestkitFactory } from '../../testkit';
import { dataHooks } from './utils';

const itemPickerOptionDriverFactory = ({ element }) => {
  const titleDriver = textTestkitFactory({
    wrapper: element,
    dataHook: dataHooks.pickerOptionTitle,
  });

  const subtitleDriver = textTestkitFactory({
    wrapper: element,
    dataHook: dataHooks.pickerOptionSubtitle,
  });

  return {
    exists: () => !!element,
    getTitle: () => titleDriver.getText(),
    getSubtitle: () => subtitleDriver.getText(),
  };
};

export default itemPickerOptionDriverFactory;
