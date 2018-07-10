import eyes from 'eyes.it';
import {createStoryUrl, waitForVisibilityOf, scrollToElement} from '../../test/utils/protractor';

describe('Card and Grid', () => {
  const byDataHook = dataHook => $(`[data-hook="${dataHook}"]`);

  eyes.it('should not break design', async () => {
    const dataHook = 'card-example-outside-a-grid';
    const element = byDataHook(dataHook);
    const url = createStoryUrl({kind: '2. Layout', story: 'Card'});

    await browser.get(url);
    await waitForVisibilityOf(element, `Cannot find ${dataHook}`);
    await scrollToElement(element);
  });
});
