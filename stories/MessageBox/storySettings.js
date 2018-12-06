import { Category } from '../storiesHierarchy';

export const storySettings = {
  category: Category.MODALS,
  storyName: '9.4 Announcement',
  tests: {
    illustration: {
      testName: '1. Illustration',
      dataHooks: {
        standard: 'standard',
        purple: 'purple',
        highestImage: 'highestImage',
      },
    },
    imageComponent: {
      testName: '2. ImageComponent',
      dataHooks: {
        standard: 'standard',
      },
    },
  },
};
