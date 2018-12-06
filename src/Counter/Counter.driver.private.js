import { counterDriverFactory as publicDriverFactory } from './Counter.driver';

export const counterPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    /** Get the increment button text */
    getIncrementText: async () =>
      base.$('[data-hook="counter-increment"]').text(),

    /** Get the increment button text */
    getDecrementText: async () =>
      base.$('[data-hook="counter-decrement"]').text(),
  };
};
