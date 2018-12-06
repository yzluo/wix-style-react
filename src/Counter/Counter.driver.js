import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const counterDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    getCount: async () =>
      base
        .$('[data-hook="counter-count"]')
        .text()
        .then(parseInt),

    /** Click the increment button */
    clickIncrement: async () =>
      base.$('[data-hook="counter-increment"]').click(),

    /** Click the decrement button */
    clickDecrement: async () =>
      base.$('[data-hook="counter-decrement"]').click(),
  };
};
