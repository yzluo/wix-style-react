import { materialInputDriverFactory as publicDriverFactory } from './MaterialInput.driver';

export const materialInputPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
