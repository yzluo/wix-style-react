import eyes from 'eyes.it';
import {createStoryUrl, waitForVisibilityOf, scrollToElement} from 'wix-ui-test-utils/protractor';

import {tableTestkitFactory} from '../../testkit/protractor';
import {storySettings} from '../../stories/TableActionCell/storySettings';

describe('Table Action Cell', () => {
  const storyUrl = createStoryUrl({kind: storySettings.kind, story: storySettings.storyName});

  const init = async (dataHook = 'story-primary-example') => {
    const driver = tableTestkitFactory({dataHook});

    await waitForVisibilityOf(driver.element, 'Can not find Table Component');
    await scrollToElement(driver.element);
    return driver;
  };

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  describe('Action cell', () => {
    describe('Primary action only', () => {
      const createDriver = () => init('story-primary-example');

      eyes.it('should show a primary action placeholder and hide it on row hover', async () => {
        const driver = await createDriver();
        const actionCellDriver = driver.getRowActionCellDriver(0);

        expect(actionCellDriver.getPrimaryActionPlaceholder().isDisplayed()).toBe(true);
        expect(actionCellDriver.getPrimaryActionButton().isDisplayed()).toBe(false);

        driver.hoverRow(0);

        expect(actionCellDriver.getPrimaryActionPlaceholder().isDisplayed()).toBe(false);
        expect(actionCellDriver.getPrimaryActionButton().isDisplayed()).toBe(true);
      });

      it('should change background color on hover', async () => {
        const driver = await createDriver();

        driver.hoverRow(1);
        expect(driver.getRow(0).getCssValue('background-color')).toEqual('rgba(0, 0, 0, 0)');
        driver.hoverRow(0);
        expect(driver.getRow(0).getCssValue('background-color')).not.toEqual('rgba(0, 0, 0, 0)');
      });
    });

    describe('Primary and secondary actions', () => {
      const createDriver = () => init('story-primary-secondary-example');

      eyes.it('should always show the PopoverMenu, and show the primary and secondary actions only on hover', async () => {
        const driver = await createDriver();
        const actionCellDriver = driver.getRowActionCellDriver(0);

        expect(actionCellDriver.getPrimaryActionButton().isDisplayed()).toBe(false);
        expect(actionCellDriver.getVisibleActionsWrapper().isDisplayed()).toBe(false);
        expect(actionCellDriver.getHiddenActionsPopoverMenu().isDisplayed()).toBe(true);

        driver.hoverRow(0);

        expect(actionCellDriver.getPrimaryActionButton().isDisplayed()).toBe(true);
        expect(actionCellDriver.getVisibleActionsWrapper().isDisplayed()).toBe(true);
        expect(actionCellDriver.getHiddenActionsPopoverMenu().isDisplayed()).toBe(true);
      });
    });
  });
});
