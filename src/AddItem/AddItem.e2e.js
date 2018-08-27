import eyes from 'eyes.it';
import {addItemTestkitFactory} from '../../testkit/protractor';
import {waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {getStoryUrl} from '../../test/utils/storybook-helpers';

describe('AddItem', () => {
  const storyUrl = getStoryUrl('3. Inputs', '3.12 AddItem');

  eyes.it('should click AddItem', () => {
    const driver = addItemTestkitFactory({dataHook: 'storybook-addItem'});
    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cannot find AddItem')
      .then(() => {
        driver.click();
      });
  });
});
