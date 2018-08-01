import eyes from 'eyes.it';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {headingTestkitFactory} from '../../testkit/protractor';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {APPEARANCES} from './Heading';

describe('Heading', () => {
  const storyUrl = getStoryUrl('1. Foundation', '1.3 Heading');

  beforeAll(() => browser.get(storyUrl));
  afterEach(() => autoExampleDriver.reset());

  eyes.it('children prop', async () => {
    const dataHook = 'storybook-heading';
    const driver = headingTestkitFactory({dataHook});
    await waitForVisibilityOf(driver.element(), 'Cannot find Heading');

    expect(driver.getText()).toBe('Hey there, good looking');
  });

  eyes.it('appearance prop', async () => {
    const dataHook = 'storybook-heading';
    const driver = headingTestkitFactory({dataHook});

    Object.keys(APPEARANCES).forEach(async appearance => {
      await autoExampleDriver.setProps({appearance});
      await waitForVisibilityOf(driver.element(), 'Cannot find Heading');
      await eyes.checkWindow(appearance);
    });
  });

  eyes.it('light prop', async () => {
    const dataHook = 'storybook-heading';
    const driver = headingTestkitFactory({dataHook});

    await waitForVisibilityOf(driver.element(), 'Cannot find Heading');
    await eyes.checkWindow('dark');

    await autoExampleDriver.setProps({light: true});
    await waitForVisibilityOf(driver.element(), 'Cannot find Heading');
    await eyes.checkWindow('light');
  });
});
