import eyes from 'eyes.it';
import {scrollToElement, waitForVisibilityOf} from 'wix-ui-test-utils/protractor';

import {createStoryUrl} from '../../test/utils/storybook-helpers';
import {buttonTestkitFactory} from '../../testkit/protractor';

const byDataHook = dataHook => $(`[data-hook="${dataHook}"]`);

async function verifyItem(dataHook) {
  const element = byDataHook(dataHook);
  await waitForVisibilityOf(element, `Cannot find ${dataHook}`);
  await scrollToElement(element);
  await eyes.checkWindow(dataHook);
}

describe('GenericLayout', () => {
  describe('default', () => {
    eyes.it('should open generic layout in modal', async () => {
      const storyUrl = createStoryUrl({kind: 'Components', story: 'GenericLayout'});
      await browser.get(storyUrl);

      const button = buttonTestkitFactory({dataHook: 'open-default-generic-layout-in-modal-button'});

      button.click();
      await verifyItem('default-generic-layout');
    });
  });

  describe('fullscreen', () => {
    eyes.it('should open fullscreen generic layout in modal', async () => {
      const storyUrl = createStoryUrl({kind: 'Components', story: 'GenericLayout'});
      await browser.get(storyUrl);

      const button = buttonTestkitFactory({dataHook: 'open-fullscreen-generic-layout-in-modal-button'});

      button.click();
      await verifyItem('fullscreen-generic-layout');
    });
  });
});
