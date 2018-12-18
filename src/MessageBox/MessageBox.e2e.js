import React from 'react';
import eyes from 'eyes.it';
import {
  buttonTestkitFactory,
  messageBoxFunctionalLayoutTestkitFactory,
} from '../../testkit/protractor';
import {
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';
import { createStoryUrl } from '../../test/utils/storybook-helpers';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

import { storySettings } from '../../stories/MessageBox/alertStorySettings';

const byDataHook = dataHook => $(`[data-hook="${dataHook}"]`);

async function verifyItem(dataHook) {
  const element = byDataHook(dataHook);
  await waitForVisibilityOf(element, `Cannot find ${dataHook}`);
  await scrollToElement(element);
  await eyes.checkWindow(dataHook);
}

describe('MessageBox', () => {
  describe('Alert', () => {
    describe('AutoExample', () => {
      const url = createStoryUrl({
        kind: storySettings.category,
        story: storySettings.storyName,
        withExamples: false,
      });
      const driver = messageBoxFunctionalLayoutTestkitFactory({
        dataHook: storySettings.dataHook,
      });

      beforeAll(async () => {
        await browser.get(url);
      });

      afterEach(() => {
        return autoExampleDriver.remount();
      });

      eyes.it('should render themes', async () => {
        await waitForVisibilityOf(
          driver.element(),
          'Cannot find <MessageBoxFunctionalLayout/>',
        );
        autoExampleDriver.setProps({ theme: 'green' });
        await eyes.checkWindow('theme: Success');
        autoExampleDriver.setProps({ theme: 'blue' });
        await eyes.checkWindow('theme: Alert');
        autoExampleDriver.setProps({ theme: 'red' });
        await eyes.checkWindow('theme: Destructive Alert');
      });
    });

    describe('Examples', () => {
      const standard = 'alert-standard';
      const secondary = 'alert-secondary';
      const footnote = 'alert-footnote';
      const emptyState = 'alert-empty-state';
      const scrollable = 'alert-scrollable';
      const image = 'alert-image';
      const actions = 'alert-actions';
      const imageWithActions = 'alert-image-actions';

      const destructiveStandard = 'destructive-alert-standard';
      const destructiveSecondary = 'destructive-alert-secondary';

      eyes.it('should not break design', async () => {
        const storyUrl = createStoryUrl({
          kind: '9. Modals',
          story: '9.1 Alert',
        });
        await browser.get(storyUrl);

        await verifyItem(standard);
        await verifyItem(secondary);
        await verifyItem(footnote);
        await verifyItem(emptyState);
        await verifyItem(scrollable);
        await verifyItem(image);
        await verifyItem(actions);
        await verifyItem(imageWithActions);

        await verifyItem(destructiveStandard);
        await verifyItem(destructiveSecondary);
      });

      eyes.it(
        'should show footer border for scrollable modal and hide the border when scroll is on the bottom',
        async () => {
          const storyUrl = createStoryUrl({
            kind: '9. Modals',
            story: '9.1 Alert',
          });
          await browser.get(storyUrl);
          await verifyItem(scrollable);

          const driver = messageBoxFunctionalLayoutTestkitFactory({
            dataHook: scrollable,
          });
          const SMALL_SCROLL_OFFSET = 50;
          const MAX_SCROLL_OFFSET = 500;

          expect(await driver.toHaveFooterBorder()).toBe(true);

          await driver.scrollBodyDown(SMALL_SCROLL_OFFSET);
          expect(await driver.toHaveFooterBorder()).toBe(true);

          await driver.scrollBodyDown(MAX_SCROLL_OFFSET);
          expect(await driver.toHaveFooterBorder()).toBe(false);
        },
      );
    });
  });

  describe('Custom Modal', () => {
    eyes.it('should open full screen modal', async () => {
      const storyUrl = createStoryUrl({
        kind: '9. Modals',
        story: '9.2 Custom Modal',
      });
      await browser.get(storyUrl);
      const button = buttonTestkitFactory({
        dataHook: 'open-full-screen-modal-button',
      });
      button.click();
      await verifyItem('fullscreen-modal');
    });
  });

  describe('Announcement', () => {
    eyes.it('should not break design', async () => {
      const storyUrl = createStoryUrl({
        kind: '9. Modals',
        story: '9.3 Announcement',
      });
      const standard = 'announcement-standard';
      const primaryTheme = 'announcement-primary-theme';
      const footnote = 'announcement-footnote';
      const disabledAction = 'announctement-disabled-action';
      await browser.get(storyUrl);
      await verifyItem(standard);
      await verifyItem(primaryTheme);
      await verifyItem(footnote);
      await verifyItem(disabledAction);
    });
  });
});
