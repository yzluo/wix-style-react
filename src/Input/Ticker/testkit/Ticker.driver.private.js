import { tickerDriverFactory as publicDriverFactory } from './Ticker.driver';

export const tickerPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
