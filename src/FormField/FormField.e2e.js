import eyes from 'eyes.it';
import {formFieldTestkitFactory} from '../../testkit/protractor';
import {waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {getStoryUrl} from '../../test/utils/storybook-helpers';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

const storyUrl = getStoryUrl('Components', 'FormField');
const driver = formFieldTestkitFactory({dataHook: 'storybook-formfield'});

describe('FormField', () => {
  beforeAll(() =>
    browser.get(storyUrl));

  eyes.it('should render with label', async () => {
    await autoExampleDriver.setProps({label: 'hello'});
    await waitForVisibilityOf(driver.element(), 'Cannot find FormField component');
    expect(await driver.getLabel().getText()).toMatch('hello');
  }, {version: 'no maxlength'});

  eyes.it('should render as required given required and no label props', async () => {
    await autoExampleDriver.setProps({required: true});
    await waitForVisibilityOf(driver.element(), 'Cannot find FormField component');
    expect(await driver.isRequired()).toBe(true);
  });

  eyes.it('should render info icon given infoContent prop', async () => {
    await autoExampleDriver.setProps({infoContent: 'hello'});
    await waitForVisibilityOf(driver.element(), 'Cannot find FormField component');
    expect(await driver.isInfoIconVisible()).toBe(true);
  });
});
