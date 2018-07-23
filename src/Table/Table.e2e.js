import eyes from 'eyes.it';

import {tableTestkitFactory} from '../../testkit/protractor';
import {createStoryUrl, waitForVisibilityOf, scrollToElement} from '../../test/utils/protractor';
import {storySettings} from '../../stories/Table/storySettings';

describe('Table', () => {
  const storyUrl = createStoryUrl({kind: storySettings.kind, story: storySettings.storyName, withExamples: true});

  const init = async () => {
    await browser.get(storyUrl);
    const driver = tableTestkitFactory({dataHook: 'storybook-table'});
    await waitForVisibilityOf(driver.element, 'Can not find Table Component');
    return driver;
  };

  it('should be able to use DataTable driver methods', async () => {
    const driver = await init();
    expect(await driver.rowsCount()).toBe(4);
  });

  eyes.it('should display table only', async () => {
    const driver = await init();
    await scrollToElement(driver.element);
    // need snapshot only
  });

  describe('Action column', () => {
    const createActionColumnDriver = async () => {
      await browser.get(storyUrl);
      const driver = tableTestkitFactory({dataHook: 'story-table-action-column-example'});
      await waitForVisibilityOf(driver.element, 'Can not find Table Component');
      await scrollToElement(driver.element);
      return driver;
    };

    eyes.it('should show a primary action placeholder and hide it on row hover', async () => {
      const driver = await createActionColumnDriver();

      expect(driver.getPrimaryActionPlaceholder(0).isDisplayed()).toBe(true);
      expect(driver.getPrimaryActionButton(0).isDisplayed()).toBe(false);

      driver.hoverRow(0);

      expect(driver.getPrimaryActionPlaceholder(0).isDisplayed()).toBe(false);
      expect(driver.getPrimaryActionButton(0).isDisplayed()).toBe(true);
    });

    it('should change background color on hover', async () => {
      const driver = await createActionColumnDriver();

      expect(driver.getRow(0).getCssValue('background-color')).toEqual('rgba(0, 0, 0, 0)');
      driver.hoverRow(0);
      expect(driver.getRow(0).getCssValue('background-color')).not.toEqual('rgba(0, 0, 0, 0)');
    });
  });
});
