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

  const getRowActionColumn = index => dataTableDriver.getRow(index).querySelector('td [data-hook="table-action-column"]');
  const getPrimaryActionPlaceholder = index => getRowActionColumn(index).querySelector('[data-hook="table-action-column-primary-placeholder"]');
  const getVisibleSecondaryActionsWrapper = index => getRowActionColumn(index).querySelector('[data-hook="table-action-column-visible-secondary-actions"]');

  const getPrimaryActionButtonDriver = index => buttonDriverFactory({
    element: getRowActionColumn(index).querySelector('[data-hook="table-action-column-primary-action"] button'),
    eventTrigger
  });

  const getVisibleSecondaryActionTooltipDriver = (rowIndex, actionIndex) => tooltipDriverFactory({
    element: getVisibleSecondaryActionsWrapper(rowIndex).querySelectorAll('[data-hook="table-action-column-secondary-action-tooltip"]')[actionIndex]
  });

  const getVisibleSecondaryActionButtonDriver = (rowIndex, actionIndex) => buttonDriverFactory({
    element: getVisibleSecondaryActionsWrapper(rowIndex).querySelectorAll('button')[actionIndex],
    eventTrigger
  });

  const getSecondaryActionsPopoverMenuDriver = index => popoverMenuDriverFactory({
    element: getRowActionColumn(index).querySelector('[data-hook="table-action-column-popover-menu"]'),
    eventTrigger
  }).init.menuItemDataHook('table-action-column-popover-menu-item');

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
    /** Get the action-clumn element */
    getRowActionColumn,
    /** Get the primary action placeholder element */
    getPrimaryActionPlaceholder,
    /** Get the driver of the primary action <Button/> from the action column */
    getPrimaryActionButtonDriver,
    /** Click the primary action button from the action column */
    clickPrimaryActionButton: index => getPrimaryActionButtonDriver(index).click(),
    /** Get the number of the visible secondary action */
    getVisibleSecondaryActionsCount: index => getVisibleSecondaryActionsWrapper(index).childElementCount,
    /** Get the driver of a specific visible secondary action <Tooltip/> */
    getVisibleSecondaryActionTooltipDriver,
    /** Get the driver of a specific visible secondary action <Button/> */
    getVisibleSecondaryActionButtonDriver,
    /** Get the driver of the hidden secondary action <PopoverMenu/> */
    getSecondaryActionsPopoverMenuDriver,
    /** Click an a visible secondary action */
    clickVisibleSecondaryAction: (rowIndex, actionIndex) => getVisibleSecondaryActionButtonDriver(rowIndex, actionIndex).click(),
    /** Click on the hidden secondary actions <PopoverMenu/> */
    clickPopoverMenu: rowIndex => getSecondaryActionsPopoverMenuDriver(rowIndex).click(),
    /** Click on a hidden secondary action (requires the <PopoverMenu/> to be open) */
    clickHiddenSecondaryAction: (rowIndex, actionIndex) => getSecondaryActionsPopoverMenuDriver(rowIndex).menu.clickItemAt(actionIndex)
  };
};

export default tableDriverFactory;

