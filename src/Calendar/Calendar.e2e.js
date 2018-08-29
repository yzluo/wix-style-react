import eyes from 'eyes.it';
import {calendarTestkitFactory} from '../../testkit/protractor';
import {getStoryUrl} from '../../test/utils/storybook-helpers';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

describe('Calendar', () => {
  const dataHook = 'calendar';
  const storyUrl = getStoryUrl('3. Inputs', '3.13 Calendar');
  const driver = calendarTestkitFactory({dataHook});

  beforeAll(() => {
    browser.get(storyUrl);
  });

  beforeEach(() => {
    autoExampleDriver.reset();
  });

  describe('default', () => {
    eyes.it('should not break design', async () => {
      autoExampleDriver.setProps({value: new Date('2017/05/01')});
      expect(await driver.exists()).toBe(true);
      await eyes.checkWindow(dataHook);
    });
  });
});
