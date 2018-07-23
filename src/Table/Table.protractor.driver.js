import dataTableDriverFactory from '../DataTable/DataTable.protractor.driver';

const rowByIndex = (component, index) => component.$$('tbody tr').get(index);

const tableDriverFactory = component => ({
  ...dataTableDriverFactory(component),
  element: component,

  getRow: index => rowByIndex(component, index),
  getPrimaryActionPlaceholder: index => rowByIndex(component, index).$('[data-hook="table-action-column-primary-placeholder"]'),
  getPrimaryActionButton: index => rowByIndex(component, index).$('[data-hook="table-action-column-primary-action"]'),

  hoverRow: index => browser.actions().mouseMove(rowByIndex(component, index)).perform()
});

export default tableDriverFactory;

