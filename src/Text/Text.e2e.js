import eyes from 'eyes.it';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {textTestkitFactory} from '../../testkit/protractor';

describe('Text', () => {
  const storyUrl = getStoryUrl('1. Foundations', '1.2 Text');

  beforeEach(() => browser.get(storyUrl));
  eyes.it('should display correct content', () => {
    const dataHook = 'storybook-text';
    const driver = textTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find Heading')
      .then(() => expect(driver.getText()).toBe('Some text'));
  });
});
