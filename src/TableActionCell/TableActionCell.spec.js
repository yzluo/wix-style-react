import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import {mount} from 'enzyme';

import TableActionCell from './TableActionCell';
import tableActionCellDriverFactory from './TableActionCell.driver';
import {tableActionCellTestkitFactory} from '../../testkit';
import {tableActionCellTestkitFactory as enzymeTableActionCellTestkitFactory} from '../../testkit/enzyme';

const primaryActionProps = (actionTrigger = () => {}) => ({
  primaryAction: {
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
    secondaryActions: Array(4).fill().map((val, idx) => createAction(idx)),
    visibleSecondaryActions: 2
  };
};


describe('Table Action Cell', () => {
  const createDriver = createDriverFactory(tableActionCellDriverFactory);

  beforeEach(() => {
    // The action column uses <Tooltip/> and <PopoverMenu/> under the hood,
    // which renders straight into document.body, this we need to clear it.
    document.body.innerHTML = '';
  });

  it('should display the action column for primary action', () => {
    const driver = createDriver(<TableActionCell {...primaryActionProps()}/>);
    expect(driver.exists()).toBeTruthy();
  });

  it('should have a placeholder when there\'s only a primary action', () => {
    const driver = createDriver(<TableActionCell {...primaryActionProps()}/>);
    expect(driver.getPrimaryActionPlaceholder(1)).toBeTruthy();
  });

  it('should display the primary action button', () => {
    const onPrimaryActionTrigger = jest.fn();

    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps(onPrimaryActionTrigger)}
        />
    );

    expect(driver.getPrimaryActionButtonDriver(0).exists()).toBeTruthy();
    expect(driver.getPrimaryActionButtonDriver(0).getButtonTextContent()).toEqual('primary action');
  });

  it('should trigger the primary action on primary button click', () => {
    const onPrimaryActionTrigger = jest.fn();

    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps(onPrimaryActionTrigger)}
        />
    );

    driver.clickPrimaryActionButton(0);
    expect(onPrimaryActionTrigger).toHaveBeenCalledTimes(1);
  });

  it('should display the action column for secondary actions', () => {
    const driver = createDriver(<TableActionCell {...secondaryActionsProps()}/>);
    expect(driver.exists()).toBeTruthy();
  });

  it('should not have a primary action placeholder when there are also secondary actions', () => {
    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps()}
        />
    );

    expect(driver.getPrimaryActionPlaceholder(1)).toBeFalsy();
  });

  it('should put visible secondary actions in the cell', async () => {
    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps()}
        />
    );

    expect(driver.getVisibleActionsCount(0)).toEqual(2);

    expect(driver.getVisibleActionButtonDriver(0).getButtonTextContent()).toEqual('Icon 0');
    expect(driver.getVisibleActionButtonDriver(1).getButtonTextContent()).toEqual('Icon 1');

    const tooltipDriver1 = driver.getVisibleActionTooltipDriver(0);
    const tooltipDriver2 = driver.getVisibleActionTooltipDriver(1);

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
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps()}
        />
    );

    const popoverMenuDriver = driver.getHiddenActionsPopoverMenuDriver(0);

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
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps(actionTriggers)}
        />
    );

    driver.clickVisibleAction(0);
    driver.clickVisibleAction(1);

    driver.clickPopoverMenu(0);
    await resolveIn(30);
    driver.clickHiddenAction(0);

    driver.clickPopoverMenu(0);
    await resolveIn(30);
    driver.clickHiddenAction(1);

    actionTriggers.forEach(actionTrigger => {
      expect(actionTrigger).toHaveBeenCalledTimes(1);
    });
  });

  it('should allow to change the number of visible secondary actions', async () => {
    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps()}
        visibleSecondaryActions={3}
        />
    );

    expect(driver.getVisibleActionsCount(0)).toEqual(3);

    driver.clickPopoverMenu(0);
    await resolveIn(30);
    expect(driver.getHiddenActionsCount(0)).toEqual(1);
  });
});

describe('testkit', () => {
  it('should exist', () => {
    const div = document.createElement('div');
    const dataHook = 'table-action-cell';

    const wrapper = div.appendChild(ReactTestUtils.renderIntoDocument(<div>
      <TableActionCell
        {...primaryActionProps()}
        />
    </div>));

    const actionCellTextkit = tableActionCellTestkitFactory({wrapper, dataHook});
    expect(actionCellTextkit.getPrimaryActionPlaceholder()).toBeTruthy();
  });
});

describe('enzyme testkit', () => {
  it('should exist', () => {
    const dataHook = 'table-action-cell';
    const wrapper = mount(<TableActionCell {...primaryActionProps()}/>);
    const actionCellTextkit = enzymeTableActionCellTestkitFactory({wrapper, dataHook});
    expect(actionCellTextkit.getPrimaryActionPlaceholder()).toBeTruthy();
  });
});

function resolveIn(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({});
    }, timeout);
  });
}
