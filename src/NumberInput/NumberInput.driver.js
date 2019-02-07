import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

import { tickerDriverFactory } from '../Input/Ticker/Ticker.driver';

export const numberInputDriverFactory = base => {
  const getTickerDriver = () =>
    tickerDriverFactory(base.$('[data-hook="number-input-ticker"]'));

  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    clickOnIncrement: () => getTickerDriver().clickUp(),
    clickOnDecrement: () => getTickerDriver().clickDown(),
  };
};
