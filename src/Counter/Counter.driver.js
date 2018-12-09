import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const counterDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    getCountText: async () => base.$('[data-hook="counter-count"]').text(),

    /** Click the increment button */
    clickButton: async () => base.$('[data-hook="counter-button"]').click(),

    /** Click the decrement button */
    getButtonText: async () => base.$('[data-hook="counter-button"]').text(),
  };
};
