import ReactTestUtils from 'react-dom/test-utils';
import {tooltipTestkitFactory} from '../../testkit';

const addItemDriverFactory = ({wrapper, element}) => {

  const byHook = dataHook =>
    element.querySelector(`[data-hook="${dataHook}"]`);

  const addImageButton = () => byHook('add-area');
  const addTooltip = () => byHook('add-tooltip');

  return {
    /** return the driver element */
    element: () => element,
    /** return the element's height */
    getHeight: () => window.getComputedStyle(element).height,
    /** return the element's width */
    getWidth: () => window.getComputedStyle(element).width,
    /** return true if tooltip is visible */
    isAddButtonVisible: () => !!addImageButton(),
    /** return true if button is visible */
    isAddTooltipVisible: () => !!addTooltip(),
    /** click the add button */
    click: () => ReactTestUtils.Simulate.click(addImageButton()),
    /** get the Tooltip's driver */
    getTooltipDriver: () => tooltipTestkitFactory({wrapper, dataHook: 'add-tooltip'}),
    exists: () => !!element
  };
};

export default addItemDriverFactory;
