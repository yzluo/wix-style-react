import eyes from 'eyes.it';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {tooltipTestkitFactory} from 'wix-ui-core/dist/src/testkit/protractor';
import {textTestkitFactory} from '../../testkit/protractor';
import {SIZES, SKINS, WEIGHTS} from './Text';

describe('Text', () => {
  const storyUrl = getStoryUrl('1. Foundation', '1.2 Text');

  beforeEach(() => browser.get(storyUrl));
  afterEach(() => autoExampleDriver.reset());

  eyes.it('should display correct content', () => {
    const dataHook = 'storybook-text';
    const driver = textTestkitFactory({dataHook});

    return waitForVisibilityOf(driver.element(), 'Cannot find Text')
      .then(() => expect(driver.getText()).toBe('Some text'));
  });

  eyes.it('light prop', async () => {
    const dataHook = 'storybook-text';
    const driver = textTestkitFactory({dataHook});

    await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    await eyes.checkWindow('dark');

    await autoExampleDriver.setProps({light: true});
    await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    await eyes.checkWindow('light');
  });

  eyes.it('size prop', async () => {
    const dataHook = 'storybook-text';
    const driver = textTestkitFactory({dataHook});

    Object.keys(SIZES).forEach(async size => {
      await autoExampleDriver.setProps({size});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
      await eyes.checkWindow(size);
    });
  });

  eyes.it('skin prop', async () => {
    const dataHook = 'storybook-text';
    const driver = textTestkitFactory({dataHook});

    Object.keys(SKINS).forEach(async skin => {
      await autoExampleDriver.setProps({skin});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
      await eyes.checkWindow(skin);
    });
  });

  describe('weight prop', () => {
    eyes.it('should display "standard" weight', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});

      Object.keys(WEIGHTS).forEach(async weight => {
        await autoExampleDriver.setProps({weight});
        await waitForVisibilityOf(driver.element(), 'Cannot find Text');
        await eyes.checkWindow(weight);
      });
    });
  });

  describe('with tooltip', () => {
    eyes.it('should not show tooltip on hover when text is not truncated with ellipses', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      const tooltipDriver = tooltipTestkitFactory({dataHook});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
      expect(tooltipDriver.isContentElementExists()).toBeFalsy();
      await tooltipDriver.mouseEnter();
      expect(tooltipDriver.isContentElementExists()).toBeFalsy();
    });

    eyes.it('should show tooltip on hover when text is truncated with ellipses', async () => {
      const dataHook = 'text-with-ellipses';
      const driver = textTestkitFactory({dataHook});
      const tooltipDriver = tooltipTestkitFactory({dataHook});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
      expect(tooltipDriver.isContentElementExists()).toBeFalsy();
      await tooltipDriver.mouseEnter();
      expect(tooltipDriver.isContentElementExists()).toBeTruthy();
    });
  });
});
