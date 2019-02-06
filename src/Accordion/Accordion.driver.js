import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const accordionDriverFactory = base => {
  const getItemAt = idx => base.$$('[data-hook="accordion-item"]').get(idx);

  return {
    ...baseUniDriverFactory(base),

    getItemTitleAt: async idx =>
      getItemAt(idx)
        .$('[data-hook="title"]')
        .text(),
    isIconExistsAt: async idx =>
      getItemAt(idx)
        .$('[data-hook="icon"]')
        .exists(),
    isItemExpandedAt: async idx =>
      getItemAt(idx)
        .$('[data-hook="content"]')
        .exists(),
    clickToggleButtonAt: async idx =>
      getItemAt(idx)
        .$('[data-hook="toggle-accordion-wrapper"]')
        .click(),
    getToggleButtonLabelAt: async idx =>
      getItemAt(idx)
        .$('[data-hook="toggle-accordion-wrapper"]')
        .$('[data-hook="toggle-accordion-button"]')
        .text(),
  };
};
