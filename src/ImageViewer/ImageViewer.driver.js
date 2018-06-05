import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import {addItemTestkitFactory} from '../../testkit/index';

const imageViewerDriverFactory = ({component, wrapper, element}) => {
  const addItemDataHook = 'image-container';
  const byHook = dataHook =>
    element.querySelector(`[data-hook="${dataHook}"]`);
  const image = () => byHook('image-viewer-image');
  const updateImageButton = () => byHook('update-image');
  const removeImageButton = () => byHook('remove-image');
  const errorIcon = () => byHook('error-tooltip');
  const addItem = () => byHook(addItemDataHook);
  const addItemDriver = () => addItemTestkitFactory({wrapper: element, dataHook: addItemDataHook});

  return {
    getElement: () => element,
    getContainerStyles: () => element.getAttribute('style'),
    getImageUrl: () => image().getAttribute('src'),
    isAddItemVisible: () => !!addItem(),
    isImageVisible: () => !!image(),
    isErrorVisible: () => !!errorIcon(),
    clickAdd: () => addItemDriver().clickAdd(),
    clickUpdate: () => ReactTestUtils.Simulate.click(updateImageButton()),
    clickRemove: () => ReactTestUtils.Simulate.click(removeImageButton()),
    exists: () => !!element,
    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default imageViewerDriverFactory;
