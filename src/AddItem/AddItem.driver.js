import ReactTestUtils from 'react-dom/test-utils';
import {tooltipTestkitFactory} from '../../testkit';

const addItemDriverFactory = ({wrapper, element}) => {

  const byHook = dataHook =>
    element.querySelector(`[data-hook="${dataHook}"]`);

  const addImageButton = () => byHook('add-area');
  const addTooltip = () => byHook('add-tooltip');

  return {
    getElement: () => element,
    getContainerStyles: () => element.getAttribute('style'),
    isAddButtonVisible: () => !!addImageButton(),
    isAddTooltipVisible: () => !!addTooltip(),
    click: () => ReactTestUtils.Simulate.click(addImageButton()),
    getTooltipDriver: () => tooltipTestkitFactory({wrapper, dataHook: 'add-tooltip'}),
    exists: () => !!element
  };
};

export default addItemDriverFactory;
