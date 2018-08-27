import eyes from 'eyes.it';
import {languagePickerTestkitFactory} from '../../testkit/protractor';
import {waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {getStoryUrl} from '../../test/utils/storybook-helpers';

describe('LanguagePicker', () => {
  const storyUrl = getStoryUrl('Deprecated', 'LanguagePicker');
  const dataHook = 'story-languagePicker';

  eyes.it('should change the language', () => {
    const driver = languagePickerTestkitFactory({dataHook});

    browser.get(storyUrl);

    waitForVisibilityOf(driver.element(), 'Cannot find LanguagePicker')
      .then(() => {
        driver.mouseEnter();
        driver.getDropdownItem(2).click();
        expect($('#languagePicker-output').getText()).toBe('Hej');
      });
  });
});
