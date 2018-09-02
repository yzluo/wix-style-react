import dataTableDriverFactory from '../DataTable/DataTable.protractor.driver';

const rowByIndex = (component, index) => component.$$('tbody tr').get(index);

const tableDriverFactory = component => ({
  ...dataTableDriverFactory(component),
  element: component,

  /** Get a row element */
  getRow: index => rowByIndex(component, index),
  /** Hover a specific row with the mouse */
  hoverRow: index => browser.actions().mouseMove(rowByIndex(component, index)).perform()
});

export default tableDriverFactory;

