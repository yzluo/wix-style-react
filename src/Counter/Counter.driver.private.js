import { counterDriverFactory as publicDriverFactory } from './Counter.driver';

export const counterPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
