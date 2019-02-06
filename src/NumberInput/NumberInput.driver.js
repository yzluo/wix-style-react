import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import {
  tickerDriverFactory,
  componentFactory,
} from '../Input/Ticker/testkit/Ticker';

export const numberInputDriverFactory = base => {
  const createDriver = props => tickerDriverFactory(componentFactory(props));
  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    clickOnIncrement: async () =>
      base.$('[data-hook="number-input-increment"]').click(),
  };
};
