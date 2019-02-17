import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const noBorderInputDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    getCountText: async () => base.$('[data-hook="NoBorderInput-count"]').text(),

    /** Click the button */
    clickButton: async () => base.$('[data-hook="NoBorderInput-button"]').click(),

    /** Get the button's text */
    getButtonText: async () => base.$('[data-hook="NoBorderInput-button"]').text(),
  };
};
