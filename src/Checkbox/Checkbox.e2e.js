import eyes from 'eyes.it';
import {checkboxTestkitFactory} from '../../testkit/protractor';
import {waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {getStoryUrl} from '../../test/utils/storybook-helpers';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {runFocusTests} from '../common/Focusable/FocusableTestsE2E';

const NO_DESCRIPTION = '';

describe('Checkbox', () => {
  const storyUrl = getStoryUrl('4. Selection', '4.2 Checkbox');
  const checkboxDriver = checkboxTestkitFactory({dataHook: 'storybook-checkbox'});


  describe(NO_DESCRIPTION, () => {
    const waitForCheckbox = () => waitForVisibilityOf(checkboxDriver.element(), 'Cannot find Checkbox');
    const clickTab = () => browser.actions().sendKeys(protractor.Key.TAB).perform();

    beforeAll(async () => {
      await browser.get(storyUrl);
      await waitForCheckbox();
    });

    afterEach(async () => {
      await autoExampleDriver.remount();
    });

    eyes.it('should have default props', async () => {
      expect(checkboxDriver.hasError()).toBe(false, 'hasError');
      expect(checkboxDriver.isChecked()).toBe(false, 'isChecked');
      expect(checkboxDriver.isFocused()).toBe(false, 'isFocused');
      expect(checkboxDriver.isDisabled()).toBe(false, 'isDisabled');
    });

    eyes.it('should set checked state when clicked', async () => {
      expect(checkboxDriver.isChecked()).toBe(false);
      await checkboxDriver.click();
      expect(checkboxDriver.isChecked()).toBe(true);
    });

    eyes.it('should show focused styles', async () => {
      expect(checkboxDriver.isFocused()).toBe(false);
      await clickTab();
      expect(checkboxDriver.isFocused()).toBe(true);
    });

    describe('has error', () => {

      beforeEach(async () => {
        await autoExampleDriver.setProps({hasError: true});
      });

      eyes.it('should show error styles', async () => {
        expect(checkboxDriver.hasError()).toBe(true);
      });

      eyes.it('should show focused styles', async () => {
        expect(checkboxDriver.hasError()).toBe(true);
        expect(checkboxDriver.isFocused()).toBe(false);
        await clickTab();
        expect(checkboxDriver.isFocused()).toBe(true);
      });
    });

    describe('is disabled', () => {

      beforeEach(async () => {
        await autoExampleDriver.setProps({disabled: true});
      });

      eyes.it('should be disabled', async () => {
        expect(checkboxDriver.isDisabled()).toBe(true);
      });

      eyes.it('should not be focusable', async () => {
        expect(checkboxDriver.isDisabled()).toBe(true);
        expect(checkboxDriver.isFocused()).toBe(false);
        await clickTab();
        expect(checkboxDriver.isFocused()).toBe(false);
      });
    });
  });

  describe('Generic', () => {
    runFocusTests(checkboxDriver, storyUrl);
  });
});

