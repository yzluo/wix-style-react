import React from 'react';
import ReactDOM from 'react-dom';
import { isClassExists } from '../../test/utils';

const getAttribute = (element, attribute) => element.getAttribute(attribute);

const buttonLayoutDriverFactory = ({ element, wrapper, component }) => {
  return {
    exists: () => !!element,
    doesComponentHasClass: className => isClassExists(element, className),
    getComponentAttribute: attribute => getAttribute(element, attribute),
    setProps: props => {
      const ClonedWithProps = React.cloneElement(
        component,
        Object.assign({}, component.props, props),
        ...(component.props.children || []),
      );
      ReactDOM.render(
        <div ref={r => (element = r)}>{ClonedWithProps}</div>,
        wrapper,
      );
    },
  };
};

export default buttonLayoutDriverFactory;
