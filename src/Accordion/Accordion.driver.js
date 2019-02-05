import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const accordionDriverFactory = base => {

  const getRowAtIndex = (idx) =>  base.$$('[data-hook="accordion-row"]').get(idx);

  return {
    ...baseUniDriverFactory(base),

    getTitleOfRow: async (idx) => getRowAtIndex(idx).$('[data-hook="title"]').text(),
    getIconAt: async (idx) => getRowAtIndex(idx).$('[data-hook="icon"]').exists(),
    isContentOpen: async (idx) => getRowAtIndex(idx).$('[data-hook="content"]').exists(),
    clickAtRow: async (idx) => getRowAtIndex(idx).$('[data-hook="toggle-accordion-wrapper"]').click(),
    isRowOpenAt: async (idx) => getRowAtIndex(idx).$('[data-hook="toggle-accordion-wrapper"]').hasClass('open'),
    getToggleButtonLabelAt: async (idx) => getRowAtIndex(idx).$('[data-hook="toggle-accordion-wrapper"]').$( '[data-hook="toggle-accordion-button"]').text(),
    getRows: async () => base.$$('[data-hook="accordion-row"]').count()

    // /** Get the current count */
    // getCountText: async () => base.$('[data-hook="accordion-count"]').text(),
    //
    // /** Click the button */
    // clickButton: async () => base.$('[data-hook="accordion-button"]').click(),
    //
    // /** Get the button's text */
    // getButtonText: async () => base.$('[data-hook="accordion-button"]').text(),
  };
};
