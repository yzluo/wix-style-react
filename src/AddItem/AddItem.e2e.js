import eyes from 'eyes.it';
import {imageViewerTestkitFactory, getStoryUrl, waitForVisibilityOf} from '../../testkit/protractor';

describe('AddItem', () => {
  const storyUrl = getStoryUrl('3. Inputs', '3.12 AddItem');

  eyes.it('should click AddItem', () => {
    const driver = imageViewerTestkitFactory({dataHook: 'add-item'});

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cannot find AddItem')
      .then(() => {
        driver.click();
      });
  });
});
