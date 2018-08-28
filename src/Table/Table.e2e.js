import eyes from 'eyes.it';

import {tableTestkitFactory} from '../../testkit/protractor';
import {waitForVisibilityOf, scrollToElement} from 'wix-ui-test-utils/protractor';
import {createStoryUrl} from '../../test/utils/storybook-helpers';
import {storySettings} from '../../stories/Table/storySettings';

describe('Table', () => {
  const storyUrl = createStoryUrl({kind: storySettings.kind, story: storySettings.storyName});

  const init = async (dataHook = 'storybook-table') => {
    await browser.get(storyUrl);
    const driver = tableTestkitFactory({dataHook});
    await waitForVisibilityOf(driver.element, 'Can not find Table Component');
    await scrollToElement(driver.element);
    return driver;
  };

  it('should be able to use DataTable driver methods', async () => {
    const driver = await init();
    expect(await driver.rowsCount()).toBe(4);
  });

  eyes.it('should display table only', async () => {
    const driver = await init();
    await scrollToElement(driver.element);
  });

  eyes.it('should render with an EmptyState', async () => {
    const driver = await init('story-table-empty-state-example');
    await scrollToElement(driver.element);
  });

  describe('Action column', () => {
    describe('Primary action only', () => {
      const createDriver = () => init('story-table-action-column-primary-example');

      eyes.it('should show a primary action placeholder and hide it on row hover', async () => {
        const driver = await createDriver();

        expect(driver.getPrimaryActionPlaceholder(0).isDisplayed()).toBe(true);
        expect(driver.getPrimaryActionButton(0).isDisplayed()).toBe(false);

        driver.hoverRow(0);

        expect(driver.getPrimaryActionPlaceholder(0).isDisplayed()).toBe(false);
        expect(driver.getPrimaryActionButton(0).isDisplayed()).toBe(true);
      });

      it('should change background color on hover', async () => {
        const driver = await createDriver();

        expect(driver.getRow(0).getCssValue('background-color')).toEqual('rgba(0, 0, 0, 0)');
        driver.hoverRow(0);
        expect(driver.getRow(0).getCssValue('background-color')).not.toEqual('rgba(0, 0, 0, 0)');
      });
    });

    describe('Primary and secondary actions', () => {
      const createDriver = () => init('story-table-action-column-primary-secondary-example');

      eyes.it('should always show the PopoverMenu, and show the primary and secondary actions only on hover', async () => {
        const driver = await createDriver();

        expect(driver.getPrimaryActionButton(0).isDisplayed()).toBe(false);
        expect(driver.getVisibleActionsWrapper(0).isDisplayed()).toBe(false);
        expect(driver.getHiddenActionsPopoverMenu(0).isDisplayed()).toBe(true);

        driver.hoverRow(0);

        expect(driver.getPrimaryActionButton(0).isDisplayed()).toBe(true);
        expect(driver.getVisibleActionsWrapper(0).isDisplayed()).toBe(true);
        expect(driver.getHiddenActionsPopoverMenu(0).isDisplayed()).toBe(true);
      });
    });
  });
});
