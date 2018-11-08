import eyes from 'eyes.it';
import {
  createStoryUrl,
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';

import { storySettings } from '../../stories/TableActionCell/storySettings';

const byDataHook = dataHook => $(`[data-hook="${dataHook}"]`);
const hoverElement = element =>
  browser
    .actions()
    .mouseMove(element)
    .perform();

describe('Table Action Cell', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.kind,
    story: storySettings.storyName,
  });

  const verifyItem = async dataHook => {
    const element = byDataHook(dataHook);

    await waitForVisibilityOf(element, `Cannot find ${dataHook}`);
    await scrollToElement(element);

    await eyes.checkWindow(dataHook);
    hoverElement(element);
    await eyes.checkWindow(dataHook);
  };

  const examples = {
    'Blue primary action': 'story-primary-blue',
    'White primary action': 'story-primary-white',
    'Primary and secondary actions': 'story-primary-secondary',
    'Primary and hidden secondary actions': 'story-primary-hidden-secondary',
    'Always visible secondary actions': 'story-always-visible-secondary',
    'Only secondary actions': 'story-only-secondary',
    'Only visible secondary actions': 'story-only-visible-secondary',
    'Primary and secondary actions with RTL': 'story-primary-secondary-rtl',
  };

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  Object.entries(examples).forEach(([name, dataHook]) => {
    eyes.it(`should render correctly for ${name}`, async () => {
      await verifyItem(dataHook);
    });
  });
});
