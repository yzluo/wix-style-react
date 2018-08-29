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
});
