import dataTableDriverFactory from '../DataTable/DataTable.protractor.driver';

const rowByIndex = (component, index) => component.$$('tbody tr').get(index);

const tableDriverFactory = component => ({
  ...dataTableDriverFactory(component),
  element: component,

  /** Get a row element */
  getRow: index => rowByIndex(component, index),
  /** Get the primary action placeholder element */
  getPrimaryActionPlaceholder: index => rowByIndex(component, index).$('[data-hook="table-action-column-primary-placeholder"]'),
  /** Get the primary action button element */
  getPrimaryActionButton: index => rowByIndex(component, index).$('[data-hook="table-action-column-primary-action"]'),
  /** Get the visible secondary actions wrapper element */
  getVisibleSecondaryActionsWrapper: index => rowByIndex(component, index).$('[data-hook="table-action-column-visible-secondary-actions"]'),
  /** Get the secondary actions popover menu element */
  getSecondaryActionsPopoverMenu: index => rowByIndex(component, index).$('[data-hook="table-action-column-popover-menu"]'),
  /** Hover a specific row with the mouse */
  hoverRow: index => browser.actions().mouseMove(rowByIndex(component, index)).perform()
});

export default tableDriverFactory;

