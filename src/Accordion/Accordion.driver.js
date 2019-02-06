import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const accordionDriverFactory = base => {

  const getRowAtIndex = (idx) =>  base.$$('[data-hook="accordion-row"]').get(idx);

  return {
    ...baseUniDriverFactory(base),

    getTitleOfRowAt: async (idx) => getRowAtIndex(idx).$('[data-hook="title"]').text(),
    isIconExistsAt: async (idx) => getRowAtIndex(idx).$('[data-hook="icon"]').exists(),
    isRowExpandedAt: async (idx) => getRowAtIndex(idx).$('[data-hook="content"]').exists(),
    clickToggleButtonAt: async (idx) => getRowAtIndex(idx).$('[data-hook="toggle-accordion-wrapper"]').click(),
    isRowOpenAt: async (idx) => getRowAtIndex(idx).$('[data-hook="toggle-accordion-wrapper"]').hasClass('open'),
    getToggleButtonLabelAt: async (idx) => getRowAtIndex(idx).$('[data-hook="toggle-accordion-wrapper"]').$( '[data-hook="toggle-accordion-button"]').text()
  };
};
