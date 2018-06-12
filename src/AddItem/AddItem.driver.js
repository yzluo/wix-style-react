import ReactTestUtils from 'react-dom/test-utils';
import {tooltipTestkitFactory} from '../../testkit';

const addItemDriverFactory = ({wrapper, element}) => {

  const byHook = dataHook =>
    element.querySelector(`[data-hook="${dataHook}"]`);

  const addImageButton = () => byHook('add-area');
  const addTooltip = () => byHook('add-tooltip');

  return {
    element: () => element,
    getHeight: () => window.getComputedStyle(element).height,
    getWidth: () => window.getComputedStyle(element).width,
    isAddButtonVisible: () => !!addImageButton(),
    isAddTooltipVisible: () => !!addTooltip(),
    click: () => ReactTestUtils.Simulate.click(addImageButton()),
    getTooltipDriver: () => tooltipTestkitFactory({wrapper, dataHook: 'add-tooltip'}),
    exists: () => !!element
  };
};

export default addItemDriverFactory;
