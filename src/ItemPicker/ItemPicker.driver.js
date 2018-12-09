import React from 'react';
import { tooltipTestkitFactory } from '../../testkit';

const itemPickerDriverFactory = ({ element, wrapper }) => {
  const tooltipDriver = tooltipTestkitFactory({
    wrapper: element,
    dataHook: 'item-picker',
  });

  return {
    tooltipShown: () => tooltipDriver.isShown(),
    clickTooltip: () => tooltipDriver.click(),
  };
};

export default itemPickerDriverFactory;
