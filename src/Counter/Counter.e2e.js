import {
  createStoryUrl,
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';

import { eyesItInstance } from '../../test/utils/eyes-it';
import { counterTestkitFactory } from '../../testkit/protractor';
import { storySettings } from '../../stories/Counter/storySettings';

const eyes = eyesItInstance({ enableSnapshotAtBrowserGet: false });

describe('Counter', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.category,
    story: storySettings.storyName,
  });

  const createDriver = async (dataHook = storySettings.dataHook) => {
    const driver = counterTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      await driver.element(),
      `Cannot find <Counter /> component with dataHook of ${dataHook}`,
    );

    await scrollToElement(driver.element());

    return driver;
  };

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  eyes.it('should render', async () => {
    await createDriver();
  });

  eyes.it('should render live example', async () => {
    await createDriver('story-counter-live-example');
  });
});
