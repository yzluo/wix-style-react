import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const numberInputDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    getCountText: async () => base.$('[data-hook="numberInput-count"]').text(),

    /** Click the button */
    clickButton: async () => base.$('[data-hook="numberInput-button"]').click(),

    /** Get the button's text */
    getButtonText: async () => base.$('[data-hook="numberInput-button"]').text(),
  };
};
