import eyes from 'eyes.it';
import {highlighterTestkitFactory, getStoryUrl} from '../../testkit/protractor';

describe('Highlighter', () => {
  const storyUrl = getStoryUrl('12. Other', 'Highlighter');
  const dataHook = 'story-highlighter';

  eyes.it('should render', () => {
    const driver = highlighterTestkitFactory({dataHook});

    browser.get(storyUrl);

    expect(driver.getElement().isDisplayed()).toBe(true);
  });
});
