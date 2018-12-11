import eyes from 'eyes.it';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {
  createStoryUrl,
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';

import { carouselTestkitFactory } from '../../testkit/protractor';
import { storySettings } from '../../stories/Carousel/storySettings';
import { ExpectedConditions as EC } from 'protractor';

describe('Carousel', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.category,
    story: storySettings.storyName,
    withExamples: false,
  });

  const createDriverFactory = async (dataHook = storySettings.dataHook) => {
    const driver = carouselTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      driver.element(),
      'Cannot find Carousel component',
    );
    await scrollToElement(driver.element());
    return driver;
  };

  describe('styles rendering', () => {
    beforeAll(async () => {
      await browser.get(storyUrl);
    });

    beforeEach(async () => {
      await autoExampleDriver.reset();
      await autoExampleDriver.setProps({ autoplay: false });
    });

    eyes.it('should render', async () => {
      const driver = await createDriverFactory();
      await browser.wait(EC.and(driver.isReady));
    });
  });
});
