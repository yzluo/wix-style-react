import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

const addItemDriverFactory = ({component, wrapper, element}) => {

  const byHook = dataHook =>
    element.querySelector(`[data-hook="${dataHook}"]`);

  const addImageButton = () => byHook('add-area');
  const addTooltip = () => byHook('add-tooltip');
  console.log('addImageButton : ', !!addImageButton());
  console.log('addImageButton: ', !!addImageButton());
  return {
    getElement: () => element,
    getContainerStyles: () => element.getAttribute('style'),
    isAddButtonVisible: () => !!addImageButton(),
    isAddTooltipVisible: () => !!addTooltip(),
    clickAdd: () => ReactTestUtils.Simulate.click(addImageButton()),
    exists: () => !!element,
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default addItemDriverFactory;
