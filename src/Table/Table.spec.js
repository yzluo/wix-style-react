import TableDriverFactory from './Table.driver';
import React from 'react';
import {Table} from './Table';
import DataTable from '../DataTable';
import ReactTestUtils from 'react-dom/test-utils';
import {createDriverFactory} from '../test-common';
import {tableTestkitFactory} from '../../testkit';
import {tableTestkitFactory as enzymeTableTestkitFactory} from '../../testkit/enzyme';
import {mount} from 'enzyme';

describe('Table', () => {
  const createDriver = createDriverFactory(TableDriverFactory);
  const createEnzymeDriver = component => {
    const dataHook = 'someDataHook';
    const wrapper = mount(React.cloneElement(component, {dataHook}));
    const driver = enzymeTableTestkitFactory({wrapper, dataHook});
    return {driver, wrapper};
  };

  const ID_1 = 'aaa', ID_2 = 'bbb';
  const defaultProps = {
    id: 'id',
    data: [{id: ID_1, a: 'value 1', b: 'value 2'}, {id: ID_2, a: 'value 3', b: 'value 4'}],
    columns: [
      {title: 'Row Num', render: (row, rowNum) => rowNum},
      {title: 'A', render: row => row.a},
      {title: 'B', render: row => row.b}
    ],
    rowClass: 'class-name',
    showSelection: true,
    children: <Table.Content/>
  };
  const noneSelected = () => [];
  const firstSelected = () => [ID_1];
  const secondSelected = () => [ID_2];
  const allSelected = () => [ID_1, ID_2];

  it('should pass id prop to child', () => {
    const driver = createDriver(<Table {...defaultProps}/>);
    expect(driver.hasChildWithId(defaultProps.id)).toBeTruthy();
  });

  describe('showSelection prop', () => {
    it('should display selection column', () => {
      const driver = createDriver(<Table {...defaultProps} selectedIds={firstSelected()}/>);
      expect(driver.getRowCheckboxDriver(1).exists()).toBeTruthy();
      expect(driver.getBulkSelectionCheckboxDriver().exists()).toBeTruthy();
    });

    it('should not display selection column', () => {
      const driver = createDriver(<Table {...defaultProps} showSelection={false}/>);
      expect(driver.getRowCheckboxDriver(1).exists()).toBeFalsy();
      expect(driver.getBulkSelectionCheckboxDriver().exists()).toBeFalsy();
    });
  });

  describe('selectedIds prop', () => {
    it('should select rows according to selectedIds prop given string ids', () => {
      const driver = createDriver(<Table {...defaultProps} selectedIds={firstSelected()}/>);
      expect(driver.isRowSelected(0)).toBeTruthy();
      expect(driver.isRowSelected(1)).toBeFalsy();
    });

    it('should select rows according to selectedIds prop given numeric ids', () => {
      const ID_1 = 1234, ID_2 = 1235;
      const driver = createDriver(
        <Table
          {...defaultProps}
          data={[{id: ID_1, a: 'value 1', b: 'value 2'}, {id: ID_2, a: 'value 3', b: 'value 4'}]}
          selectedIds={[ID_1]}
          />);
      expect(driver.isRowSelected(0)).toBeTruthy();
      expect(driver.isRowSelected(1)).toBeFalsy();
    });

    it('should select rows according to selectedIds prop given row index as ids', () => {
      const driver = createDriver(
        <Table
          {...defaultProps}
          data={[{a: 'value 1', b: 'value 2'}, {a: 'value 3', b: 'value 4'}]}
          selectedIds={[0]}
          />);
      expect(driver.isRowSelected(0)).toBeTruthy();
      expect(driver.isRowSelected(1)).toBeFalsy();
    });

    it('should update selection if selection prop has change', async () => {
      const selectedIds = [];
      const {driver, wrapper} = createEnzymeDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
      expect(driver.isRowSelected(0)).toBeFalsy();
      wrapper.setProps({selectedIds: firstSelected()});
      expect(driver.isRowSelected(0)).toBeTruthy();
    });

    //TODO: It seems that DataTable.render is not called (verified with console.log). But this test shows it does.
    xit('should NOT re-render DataTable when new props are set but selection has NOT changed', async () => {
      const {wrapper} = createEnzymeDriver(<Table {...defaultProps} selectedIds={firstSelected()}/>);
      const renderMock = jest.fn();
      wrapper.find(DataTable).instance().render = renderMock;
      wrapper.setProps({selectedIds: firstSelected()});
      expect(renderMock.mock.calls.length).toBe(0);
    });
  });

  describe('setSelectedIds', () => {
    it('should select rows when setSelectedIds is called', () => {
      const {driver, wrapper} = createEnzymeDriver(<Table {...defaultProps} selectedIds={noneSelected()}/>);
      expect(driver.isRowSelected(0)).toBeFalsy();
      expect(driver.isRowSelected(1)).toBeFalsy();
      wrapper.instance().setSelectedIds(allSelected());
      expect(driver.isRowSelected(0)).toBeTruthy();
      expect(driver.isRowSelected(1)).toBeTruthy();
    });
  });

  describe('row selection', () => {
    it('should select row when checkbox clicked given row not selected', () => {
      const driver = createDriver(<Table {...defaultProps} selectedIds={firstSelected()}/>);
      driver.clickRowChecbox(1);
      expect(driver.isRowSelected(1)).toBeTruthy();
    });

    it('should unselect row when checkbox clicked given row selected', () => {
      const driver = createDriver(<Table {...defaultProps} selectedIds={allSelected()}/>);
      driver.clickRowChecbox(1);
      expect(driver.isRowSelected(1)).toBeFalsy();
    });
  });

  describe('re-render', () => {
    it('should re-render on data update', () => {
      const props = {
        id: 'id',
        columns: [
          {title: 'Row Num', render: (row, rowNum) => rowNum},
          {title: 'A', render: row => row.a},
          {title: 'B', render: row => row.b}
        ],
        rowClass: 'class-name'
      };
      const data = [{a: 'value 1', b: 'value 2'}, {a: 'value 3', b: 'value 4'}];
      const {driver, wrapper} = createEnzymeDriver(<Table {...props} data={data}/>);
      const newValue = 'value 1 changed';
      const COLUMN_A_INDEX = 1;
      const ROW_INDEX = 0;
      data[ROW_INDEX].a = newValue;
      wrapper.setProps({data});
      expect(driver.getCell(ROW_INDEX, COLUMN_A_INDEX).textContent).toBe(newValue);
    });

    it('should keep selection when re-rendered given selectedIds not provided (Uncontrolled)', () => {
      const {driver, wrapper} = createEnzymeDriver(<Table {...defaultProps}/>);
      expect(driver.isRowSelected(1)).toBeFalsy();
      driver.clickRowChecbox(1);
      expect(driver.isRowSelected(1)).toBeTruthy();
      wrapper.setProps({...defaultProps});
      expect(driver.isRowSelected(1)).toBeTruthy();
    });
  });

  describe('BulkSelection', () => {
    describe('initial render', () => {
      it('should display bulk-selection as checked when all rows are selected', () => {
        const selectedIds = allSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        expect(driver.getBulkSelectionState() === 'ALL').toBeTruthy();
        expect(driver.getBulkSelectionState() === 'NONE').toBeFalsy();
        expect(driver.getBulkSelectionState() === 'SOME').toBeFalsy();
      });

      it('should display bulk-selection as unchecked when no rows are selected', () => {
        const selectedIds = noneSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        expect(driver.getBulkSelectionState() === 'NONE').toBeTruthy();
        expect(driver.getBulkSelectionState() === 'ALL').toBeFalsy();
      });

      it('should display bulk-selection as partial when some rows are selected', () => {
        const selectedIds = secondSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        expect(driver.getBulkSelectionState() === 'SOME').toBeTruthy();
      });
    });

    describe('Update row selection', () => {
      it('should select all rows when bulk-selection checkbox clicked given no checkboxes are checked', () => {
        const selectedIds = noneSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        driver.clickBulkSelectionCheckbox();
        expect(driver.isRowSelected(0)).toBeTruthy();
        expect(driver.isRowSelected(1)).toBeTruthy();
      });

      it('should select all rows when bulk-selection checkbox clicked given some checkboxes are checked', () => {
        const selectedIds = secondSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        driver.clickBulkSelectionCheckbox();
        expect(driver.isRowSelected(0)).toBeTruthy();
        expect(driver.isRowSelected(1)).toBeTruthy();
      });

      it('should unselect all rows when bulk-selection checkbox clicked given all checkboxes are checked', () => {
        const selectedIds = allSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        driver.clickBulkSelectionCheckbox();
        expect(driver.isRowSelected(0)).toBeFalsy();
        expect(driver.isRowSelected(1)).toBeFalsy();
      });
    });

    describe('onSelectionChanged', () => {
      it('should call onSelectionChanged when bulk-selection checkbox clicked given non selected', () => {
        const onSelectionChanged = jest.fn();
        const selectedIds = noneSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds} onSelectionChanged={onSelectionChanged}/>);
        driver.clickBulkSelectionCheckbox();
        expect(onSelectionChanged).toHaveBeenCalledWith(allSelected(), {type: 'ALL'});
      });

      it('should call onSelectionChanged when bulk-selection checkbox clicked given all selected', () => {
        const onSelectionChanged = jest.fn();
        const selectedIds = allSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds} onSelectionChanged={onSelectionChanged}/>);
        driver.clickBulkSelectionCheckbox();
        expect(onSelectionChanged).toHaveBeenCalledWith(noneSelected(), {type: 'NONE'});
      });

      it('should call onSelectionChanged when row selected given no checkboxes are checked', () => {
        const onSelectionChanged = jest.fn();
        const selectedIds = firstSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds} onSelectionChanged={onSelectionChanged}/>);
        driver.clickRowChecbox(1);
        expect(onSelectionChanged.mock.calls.length).toBe(1);
        expect(onSelectionChanged).toHaveBeenCalledWith(allSelected(), {type: 'SINGLE_TOGGLE', id: ID_2, value: true});
      });
    });

    describe('Update BulkSelection', () => {
      it('should check bulk-selection checkbox when all rows change to check', () => {
        const selectedIds = secondSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        driver.clickRowChecbox(0);
        expect(driver.getBulkSelectionState() === 'ALL').toBeTruthy();
      });

      it('should uncheck bulk-selection checkbox when all rows change to not-selected', () => {
        const selectedIds = secondSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        driver.clickRowChecbox(1);
        expect(driver.getBulkSelectionState() === 'NONE').toBeTruthy();
      });

      it('should show partial in bulk-selection checkbox when row unselected given all rows selected', () => {
        const selectedIds = allSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        driver.clickRowChecbox(1);
        expect(driver.getBulkSelectionState() === 'SOME').toBeTruthy();
      });

      it('should show partial in bulk-selection checkbox when row selected given all rows not selected', () => {
        const selectedIds = noneSelected();
        const driver = createDriver(<Table {...defaultProps} selectedIds={selectedIds}/>);
        driver.clickRowChecbox(1);
        expect(driver.getBulkSelectionState() === 'SOME').toBeTruthy();
      });
    });
  });

  describe('Compound components', () => {
    it('should NOT have any compound components', () => {
      const driver = createDriver(
        <Table
          {...defaultProps}
          showSelection
          selectedIds={noneSelected()}
          />
        );
      expect(!!driver.getTitlebar()).toBeFalsy();
    });

    it('should have Table.ToolbarContainer with SelectionContext', () => {
      let toggle;
      const driver = createDriver(
        <Table
          {...defaultProps}
          showSelection
          selectedIds={allSelected()}
          >
          <Table.ToolbarContainer>
            {
              ({selectedCount, toggleSelectionById}) => {
                toggle = toggleSelectionById;
                return (
                  <div>{`${selectedCount} Selected`}</div>
                );
              }
            }
          </Table.ToolbarContainer>
          <Table.Content/>
        </Table>
        );
      expect(driver.element.innerHTML).toMatch('2 Selected');
      toggle(ID_1);
      expect(driver.element.innerHTML).toMatch('1 Selected');
    });

    it('should have Table.Titlebar', () => {
      const driver = createDriver(
        <Table
          {...defaultProps}
          showSelection
          selectedIds={allSelected()}
          >
          <div>
            <Table.Titlebar/>
          </div>
          <div>
            <Table.Content titleBarVisible={false}/>
          </div>
        </Table>
        );
      expect(!!driver.getTitlebar()).toBeTruthy();
    });
  });

  describe('Action column', () => {
    const primaryActionProps = (actionTrigger = () => {}) => ({
      primaryRowAction: {
        name: 'primary action',
        theme: 'whiteblue',
        onActionTrigger: actionTrigger
      }
    });

    const secondaryActionsProps = (actionTriggers = []) => {
      const createAction = n => ({
        name: `Action ${n}`,
        icon: <span>{`Icon ${n}`}</span>, // simulate the icon as <span> elements
        onActionTrigger: actionTriggers[n] || (() => {})
      });

      return {
        secondaryRowActions: Array(4).fill().map((val, idx) => createAction(idx)),
        visibleSecondaryActions: 2
      };
    };

    beforeEach(() => {
      // The action column uses <Tooltip/> and <PopoverMenu/> under the hood,
      // which renders straight into document.body, this we need to clear it.
      document.body.innerHTML = '';
    });

    it('should display the action column for primary action', () => {
      const driver = createDriver(<Table {...defaultProps} {...primaryActionProps()}/>);
      expect(driver.getRowActionColumn(1)).toBeTruthy();
    });

    it('should have a placeholder when there\'s only a primary action', () => {
      const driver = createDriver(<Table {...defaultProps} {...primaryActionProps()}/>);
      expect(driver.getPrimaryActionPlaceholder(1)).toBeTruthy();
    });

    it('should display the primary action button', () => {
      const onPrimaryActionTrigger = jest.fn();

      const driver = createDriver(
        <Table
          {...defaultProps}
          {...primaryActionProps(onPrimaryActionTrigger)}
          />
      );

      expect(driver.getPrimaryActionButtonDriver(0).exists()).toBeTruthy();
      expect(driver.getPrimaryActionButtonDriver(0).getButtonTextContent()).toEqual('primary action');
    });

    it('should trigger the primary action on primary button click', () => {
      const onPrimaryActionTrigger = jest.fn();

      const driver = createDriver(
        <Table
          {...defaultProps}
          {...primaryActionProps(onPrimaryActionTrigger)}
          />
      );

      driver.clickPrimaryActionButton(0);
      expect(onPrimaryActionTrigger).toHaveBeenCalledTimes(1);
      expect(onPrimaryActionTrigger).toHaveBeenCalledWith({id: ID_1, a: 'value 1', b: 'value 2'}, 0);
    });

    it('should trigger the primary action on row click and ignore onRowClick', () => {
      const onPrimaryActionTrigger = jest.fn();
      const onRowClick = jest.fn();

      const driver = createDriver(
        <Table
          {...defaultProps}
          {...primaryActionProps(onPrimaryActionTrigger)}
          onRowClick={onRowClick}
          />
      );

      driver.clickRow(1);
      expect(onPrimaryActionTrigger).toHaveBeenCalledWith({id: ID_2, a: 'value 3', b: 'value 4'}, 1);
      expect(onRowClick).not.toHaveBeenCalled();
    });

    it('should display the action column for secondary actions', () => {
      const driver = createDriver(<Table {...defaultProps} {...secondaryActionsProps()}/>);
      expect(driver.getRowActionColumn(1)).toBeTruthy();
    });

    it('should not have a primary action placeholder when there are also secondary actions', () => {
      const driver = createDriver(
        <Table
          {...defaultProps}
          {...primaryActionProps()}
          {...secondaryActionsProps()}
          />
      );

      expect(driver.getPrimaryActionPlaceholder(1)).toBeFalsy();
    });

    it('should put visible secondary actions in the cell', async () => {
      const driver = createDriver(
        <Table
          {...defaultProps}
          {...primaryActionProps()}
          {...secondaryActionsProps()}
          />
      );

      expect(driver.getVisibleSecondaryActionsCount(0)).toEqual(2);

      expect(driver.getVisibleSecondaryActionButtonDriver(0, 0).getButtonTextContent()).toEqual('Icon 0');
      expect(driver.getVisibleSecondaryActionButtonDriver(0, 1).getButtonTextContent()).toEqual('Icon 1');

      const tooltipDriver1 = driver.getVisibleSecondaryActionTooltipDriver(0, 0);
      const tooltipDriver2 = driver.getVisibleSecondaryActionTooltipDriver(0, 1);

      tooltipDriver1.mouseEnter();
      await resolveIn(300);
      expect(tooltipDriver1.getContent()).toEqual('Action 0');
      tooltipDriver1.mouseLeave();

      tooltipDriver2.mouseEnter();
      await resolveIn(300);
      expect(tooltipDriver2.getContent()).toEqual('Action 1');
      tooltipDriver2.mouseLeave();
    });

    it('should put hidden secondary action in a PopoverMenu', async () => {
      const driver = createDriver(
        <Table
          {...defaultProps}
          {...primaryActionProps()}
          {...secondaryActionsProps()}
          />
      );

      const popoverMenuDriver = driver.getSecondaryActionsPopoverMenuDriver(0);

      expect(popoverMenuDriver.exists()).toEqual(true);

      popoverMenuDriver.click();
      await resolveIn(30);

      expect(popoverMenuDriver.menu.itemsLength()).toEqual(2);
      expect(popoverMenuDriver.menu.itemContentAt(0)).toEqual('Action 2');
      expect(popoverMenuDriver.menu.itemContentAt(1)).toEqual('Action 3');
    });

    it('should trigger secondary action on click', async () => {
      const actionTriggers = Array(4).fill().map(() => jest.fn());

      const driver = createDriver(
        <Table
          {...defaultProps}
          {...primaryActionProps()}
          {...secondaryActionsProps(actionTriggers)}
          />
      );

      driver.clickVisibleSecondaryAction(0, 0);
      driver.clickVisibleSecondaryAction(0, 1);

      driver.clickPopoverMenu(0);
      await resolveIn(30);
      driver.clickHiddenSecondaryAction(0, 0);

      driver.clickPopoverMenu(0);
      await resolveIn(30);
      driver.clickHiddenSecondaryAction(0, 1);

      actionTriggers.forEach(actionTrigger => {
        expect(actionTrigger).toHaveBeenCalledTimes(1);
        expect(actionTrigger).toHaveBeenCalledWith({id: ID_1, a: 'value 1', b: 'value 2'}, 0);
      });
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div>
        <Table
          dataHook={dataHook}
          {...defaultProps}
          />
      </div>));
      const dataTableTestkit = tableTestkitFactory({wrapper, dataHook});
      expect(dataTableTestkit.hasChildWithId(defaultProps.id)).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const wrapper = mount(<Table {...defaultProps} dataHook={dataHook}/>);
      const dataTableTestkit = enzymeTableTestkitFactory({wrapper, dataHook});
      expect(dataTableTestkit.hasChildWithId(defaultProps.id)).toBeTruthy();
    });
  });
});

function resolveIn(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({});
    }, timeout);
  });
}
