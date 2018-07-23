import eyes from 'eyes.it';
import {
  createStoryUrl,
  waitForVisibilityOf,
  scrollToElement,
} from '../../test/utils/protractor';

const byDataHook = dataHook => $(`[data-hook="${dataHook}"]`);

async function verifyItem(dataHook) {
  const element = byDataHook(dataHook);
  await waitForVisibilityOf(element, `Cannot find ${dataHook}`);
  await scrollToElement(element);
  await eyes.checkWindow(dataHook);
}

describe('MessageBox', () => {
  describe('Alert', () => {
    const standard = 'alert-standard';
    const secondary = 'alert-secondary';
    const footnote = 'alert-footnote';
    const scrollable = 'alert-scrollable';

    eyes.it('should not break design', async () => {
      const storyUrl = createStoryUrl({
        kind: '9. Modals',
        story: '9.1 Alert',
      });
      await browser.get(storyUrl);
      await verifyItem(standard);
      await verifyItem(secondary);
      await verifyItem(footnote);
      await verifyItem(scrollable);
    });
  });

  describe('Destructive Alert', () => {
    const standard = 'destructive-alert-standard';
    const secondary = 'destructive-alert-secondary';

    eyes.it('should not break design', async () => {
      const storyUrl = createStoryUrl({
        kind: '9. Modals',
        story: '9.2 Destructive Alert',
      });
      await browser.get(storyUrl);
      await verifyItem(standard);
      await verifyItem(secondary);
    });
  });

  describe('Announcement', () => {
    eyes.it('should not break design', async () => {
      const storyUrl = createStoryUrl({
        kind: '9. Modals',
        story: '9.4 Announcement',
      });
      const standard = 'announcement-standard';
      await browser.get(storyUrl);
      await verifyItem(standard);
    });
  });
});
