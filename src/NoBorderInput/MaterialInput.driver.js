import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const materialInputDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    getCountText: async () => base.$('[data-hook="materialInput-count"]').text(),

    /** Click the button */
    clickButton: async () => base.$('[data-hook="materialInput-button"]').click(),

    /** Get the button's text */
    getButtonText: async () => base.$('[data-hook="materialInput-button"]').text(),
  };
};
