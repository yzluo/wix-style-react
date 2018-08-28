import popoverMenuDriverFactory from '../PopoverMenu/PopoverMenu.driver';
import dataTableDriverFactory from '../DataTable/DataTable.driver';
import checkboxDriverFactory from '../Checkbox/Checkbox.driver';
import tooltipDriverFactory from '../Tooltip/Tooltip.driver';
import buttonDriverFactory from '../Backoffice/Button/Button.driver.js';

const tableDriverFactory = ({element, wrapper, component, eventTrigger}) => {
  const dataTableDriver = dataTableDriverFactory({element, wrapper, component});
  const getTitlebar = () => element.querySelector('[data-hook="table-title-bar"]');
  const getRowCheckboxDriver = index => checkboxDriverFactory({
    element: dataTableDriver.getCell(index, 0).querySelector('[data-hook="row-select"]'),
    eventTrigger
  });
  const getBulkSelectionCheckboxDriver = () => checkboxDriverFactory({
    element: dataTableDriver.getHeaderCell(0).querySelector('[data-hook="table-select"]'),
    eventTrigger
  });

  const isBulkSelectionChecked = () => {
    const checkboxDriver = getBulkSelectionCheckboxDriver();
    return checkboxDriver.isChecked() && !checkboxDriver.isIndeterminate();
  };
  const isBulkSelectionIndeterminate = () => {
    const checkboxDriver = getBulkSelectionCheckboxDriver();
    return !checkboxDriver.isChecked() && checkboxDriver.isIndeterminate();
  };
  const isBulkSelectionUnchecked = () => {
    const checkboxDriver = getBulkSelectionCheckboxDriver();
    return !checkboxDriver.isChecked() && !checkboxDriver.isIndeterminate();
  };

  const getRowActionCell = index => dataTableDriver.getRow(index).querySelector('td [data-hook="table-action-cell"]');
  const getPrimaryActionPlaceholder = index => getRowActionCell(index).querySelector('[data-hook="table-action-cell-placeholder"]');
  const getVisibleActionsWrapper = index => getRowActionCell(index).querySelector('[data-hook="table-action-cell-visible-actions"]');

  const getPrimaryActionButtonDriver = index => buttonDriverFactory({
    element: getRowActionCell(index).querySelector('[data-hook="table-action-cell-primary-action"] button'),
    eventTrigger
  });

  const getVisibleActionTooltipDriver = (rowIndex, actionIndex) => tooltipDriverFactory({
    element: getVisibleActionsWrapper(rowIndex)
      .querySelectorAll('[data-hook="table-action-cell-visible-action-tooltip"]')[actionIndex]
  });

  const getVisibleActionButtonDriver = (rowIndex, actionIndex) => buttonDriverFactory({
    eventTrigger,
    element: getVisibleActionsWrapper(rowIndex)
      .querySelectorAll('button')[actionIndex]
  });

  const getHiddenActionsPopoverMenuDriver = index => popoverMenuDriverFactory({
    eventTrigger,
    element: getRowActionCell(index)
      .querySelector('[data-hook="table-action-cell-popover-menu"]')
  }).init.menuItemDataHook('table-action-cell-popover-menu-item')
    .init.parentElement(getRowActionCell(index));

  return {
    ...dataTableDriver,
    element,
    /** Get driver of row selection checbox by row index */
    getRowCheckboxDriver,
    /** Get driver of row bulk-selection checbox */
    getBulkSelectionCheckboxDriver,
    /** Click the row selection checkbox */
    clickRowChecbox: index => getRowCheckboxDriver(index).click(),
    /** Click the bulk-selection checkbox */
    clickBulkSelectionCheckbox: () => getBulkSelectionCheckboxDriver().click(),
    /** Is row selected by index */
    isRowSelected: index => getRowCheckboxDriver(index).isChecked(),
    /** Get bulk seleciton state. Possible value 'ALL', 'SOME', 'NONE. */
    getBulkSelectionState: () => {
      if (isBulkSelectionChecked()) {
        return 'ALL';
      }
      if (isBulkSelectionIndeterminate()) {
        return 'SOME';
      }
      if (isBulkSelectionUnchecked()) {
        return 'NONE';
      }
    },
    /** Get title-bar (column titles) */
    getTitlebar,
    /** Get the action-column element */
    getRowActionCell,
    /** Get the primary action placeholder element */
    getPrimaryActionPlaceholder,
    /** Get the driver of the primary action <Button/> from the action column */
    getPrimaryActionButtonDriver,
    /** Click the primary action button from the action column */
    clickPrimaryActionButton: index => getPrimaryActionButtonDriver(index).click(),
    /** Get the number of the visible secondary actions */
    getVisibleActionsCount: index => getVisibleActionsWrapper(index).childElementCount,
    /** Get the number of hidden secondary actions (in the <PopoverMenu/>) */
    getHiddenActionsCount: index => getHiddenActionsPopoverMenuDriver(index).menu.itemsLength(),
    /** Get the driver of a specific visible secondary action <Tooltip/> */
    getVisibleActionTooltipDriver,
    /** Get the driver of a specific visible secondary action <Button/> */
    getVisibleActionButtonDriver,
    /** Get the driver of the hidden secondary action <PopoverMenu/> */
    getHiddenActionsPopoverMenuDriver,
    /** Click an a visible secondary action */
    clickVisibleAction: (rowIndex, actionIndex) => getVisibleActionButtonDriver(rowIndex, actionIndex).click(),
    /** Click on the hidden secondary actions <PopoverMenu/> */
    clickPopoverMenu: rowIndex => getHiddenActionsPopoverMenuDriver(rowIndex).click(),
    /** Click on a hidden secondary action (requires the <PopoverMenu/> to be open) */
    clickHiddenAction: (rowIndex, actionIndex) => getHiddenActionsPopoverMenuDriver(rowIndex).menu.clickItemAt(actionIndex)
  };
};

export default tableDriverFactory;

