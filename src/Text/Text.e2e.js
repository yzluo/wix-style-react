import eyes from 'eyes.it';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {getStoryUrl, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {popoverTestkitFactory} from 'wix-ui-core/dist/src/testkit/protractor';
import {textTestkitFactory} from '../../testkit/protractor';

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

  describe('Light prop', () => {
    eyes.it('should display "light" text', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      await autoExampleDriver.setProps({light: true});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    });

    eyes.it('should display default text', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      await autoExampleDriver.setProps({light: false});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    });
  });

  describe('Size prop', () => {
    eyes.it('should display "tiny" text', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      await autoExampleDriver.setProps({size: 'tiny'});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    });

    eyes.it('should display "small" text', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      await autoExampleDriver.setProps({size: 'small'});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    });

    eyes.it('should display "medium" text', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      await autoExampleDriver.setProps({size: 'medium'});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    });
  });

  describe('Skin prop', () => {
    eyes.it('should display "standard" skin', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      await autoExampleDriver.setProps({skin: 'standard'});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    });

    eyes.it('should display "error" skin', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      await autoExampleDriver.setProps({skin: 'error'});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    });

    eyes.it('should display "success" skin', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      await autoExampleDriver.setProps({skin: 'success'});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    });

    eyes.it('should display "premium" skin', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      await autoExampleDriver.setProps({skin: 'premium'});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    });
  });

  describe('Weight prop', () => {
    eyes.it('should display "standard" weight', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      await autoExampleDriver.setProps({weight: 'thin'});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    });

    eyes.it('should display "error" weight', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      await autoExampleDriver.setProps({weight: 'normal'});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    });

    eyes.it('should display "success" weight', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      await autoExampleDriver.setProps({weight: 'bold'});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    });
  });

  describe('TagName prop', () => {
    eyes.it('should be span by default', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
      expect(driver.getTagName()).toBe('span');
    });

    eyes.it('should have h1 tag name', async () => {
      const dataHook = 'storybook-text-h1';
      const driver = textTestkitFactory({dataHook});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
      expect(driver.getTagName()).toBe('h1');
    });
  });

  describe('Bold prop', () => {
    eyes.it('should be bold', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      await autoExampleDriver.setProps({bold: true});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    });

    eyes.it('should not be bold', async () => {
      const dataHook = 'storybook-text-h1';
      const driver = textTestkitFactory({dataHook});
      await autoExampleDriver.setProps({bold: false});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    });
  });

  describe('With tooltip', () => {
    eyes.it('should not show tooltip on hover when text is not truncated with ellipses', async () => {
      const dataHook = 'storybook-text';
      const driver = textTestkitFactory({dataHook});
      const popoverDriver = popoverTestkitFactory({dataHook});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
      expect(popoverDriver.isContentElementExists()).toBeFalsy();
      await popoverDriver.mouseEnter();
      expect(popoverDriver.isContentElementExists()).toBeFalsy();
    });

    eyes.it('should show tooltip on hover when text is truncated with ellipses', async () => {
      const dataHook = 'text-with-ellipses';
      const driver = textTestkitFactory({dataHook});
      const popoverDriver = popoverTestkitFactory({dataHook});
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
      expect(popoverDriver.isContentElementExists()).toBeFalsy();
      await popoverDriver.mouseEnter();
      expect(popoverDriver.isContentElementExists()).toBeTruthy();
    });
  });
});
