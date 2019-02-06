import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import { tickerPrivateDriverFactory } from '../Input/Ticker/testkit/Ticker.driver.private';

export const numberInputDriverFactory = base => {
  const createTickerDriver = createUniDriverFactory(tickerPrivateDriverFactory);
  const getTickerDriver = async () => {
    return createTickerDriver(
      (await base.$('[data-hook="number-input-ticker"]')).getNative(),
    );
  };
  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    clickOnIncrement: async () => (await getTickerDriver()).clickUp(),
  };
};
