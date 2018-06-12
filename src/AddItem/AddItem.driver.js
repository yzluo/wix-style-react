import ReactTestUtils from 'react-dom/test-utils';

const addItemDriverFactory = ({element}) => {

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
    exists: () => !!element
  };
};

export default addItemDriverFactory;
