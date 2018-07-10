import eyes from 'eyes.it';

import {tableTestkitFactory} from '../../testkit/protractor';
import {createStoryUrl, waitForVisibilityOf, scrollToElement} from '../../test/utils/protractor';
import {storySettings} from '../../stories/Table/storySettings';

describe('Table', () => {
  const storyUrl = createStoryUrl({kind: storySettings.kind, story: storySettings.storyName, withExamples: false});

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
});
