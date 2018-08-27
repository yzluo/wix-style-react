import eyes from 'eyes.it';
import {tooltipTestkitFactory} from '../../testkit/protractor';
import {waitForVisibilityOf} from 'wix-ui-test-utils/protractor';
import {getStoryUrl} from '../../test/utils/storybook-helpers';
import {SHORT_CONTENT, LONG_CONTENT} from '../../stories/Tooltip/Composite/TooltipForEyesOnly';

describe('Tooltip', () => {
  const tooltipStoryUrl = getStoryUrl('7. Tooltips', '7.1. Tooltip');
  const popoverStoryUrl = getStoryUrl('7. Tooltips', '7.2. Popover');

  const dataHook = 'tooltip-e2e-wrapper';
  const tooltipDataHook = 'tooltip-e2e-tooltip';

  describe('Tooltip story', () => {
    beforeEach(() => {
      browser.get(tooltipStoryUrl);
    });

    eyes.it('should see tooltip centered above element', () => {
      const driver = tooltipTestkitFactory({dataHook});

      waitForVisibilityOf(driver.getTooltipContentElement(tooltipDataHook), 'Cannot find Tooltip content')
        .then(() => {
          expect(driver.getTooltipTextContent(tooltipDataHook)).toBe(SHORT_CONTENT);
        });
    });

    eyes.it('should see tooltip centered above element with longer content', () => {
      const driver = tooltipTestkitFactory({dataHook});

      waitForVisibilityOf(driver.getTooltipContentElement(tooltipDataHook), 'Cannot find Tooltip content')
        .then(() => {
          driver.clickButton();
          waitForVisibilityOf(driver.getTooltipContentElement(tooltipDataHook), 'Cannot find Tooltip content')
            .then(() => {
              expect(driver.getTooltipTextContent(tooltipDataHook)).toBe(LONG_CONTENT);
            });
        });
    });
  });

  describe('Popover story', () => {
    beforeEach(() => {
      browser.get(popoverStoryUrl);
    });

    describe('Popover with EmptyState', () => {
      eyes.it('should not break design', async () => {
        const driver = tooltipTestkitFactory({dataHook: 'popover-empty-state'});

        await waitForVisibilityOf(driver.element());
        driver.clickButton();
      });
    });
  });
});
