import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

import styles from '../Ticker.scss';

export const tickerDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    getUp: () => base.$(`.${styles.up}`),
    getDown: () => base.$(`.${styles.down}`),
    clickUp: async () => base.$(`.${styles.up}`).click(),
    clickDown: async () => base.$(`.${styles.down}`).click(),
    isUpDisabled: () => base.$(`.${styles.up}`).hasClass(styles.disabled),
    isDownDisabled: () => base.$(`.${styles.down}`).hasClass(styles.disabled),
    exists: () => base.exists(),
  };
};
