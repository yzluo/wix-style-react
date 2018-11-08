import React from 'react';
import ReactDOM from 'react-dom';
import {isClassExists} from '../../test/utils';
import ReactTestUtils from 'react-dom/test-utils';
import {buttonTestkitFactory} from '../../testkit';

const composerLayoutDriverFactory = ({element, wrapper, component}) => {
  const getAttribute = (element, attribute) => element.getAttribute(attribute);
  const header = element.querySelector('[data-hook="header"]');
  const footer = element.querySelector('[data-hook="footer"]');
  const closeButtonTestkit = buttonTestkitFactory({wrapper: element, dataHook: 'close-button'});
  const infoButtonTestkit = buttonTestkitFactory({wrapper: element, dataHook: 'info-button'});

  return {
    exists: () => !!element,
    isRenderedInFullscreen: true,
    getContent: () => element.querySelector('[data-hook="content"]').innerHTML,

    header: {
      isHeaderRendered: () => !!header,
      getTitle: () => header.querySelector('[data-hook="title"]').innerHTML,
      getSideActions: () => header.querySelector('[data-hook="side-actions"]').innerHTML,
      isCloseButtonRendered: () => !!header.querySelector('[data-hook="close-button"]'),
      isInfoButtonRendered: () => !!header.querySelector('[data-hook="info-button"]'),
      clickOnCloseButton: () => closeButtonTestkit.click(),
      clickOnInfoButton: () => infoButtonTestkit.click()

    },

    footer: {
      isFooterRendered: () => !!footer
    },

    setProps: props => {
      const ClonedWithProps = React.cloneElement(component, Object.assign({}, component.props, props), ...(component.props.children || []));
      ReactDOM.render(<div ref={r => element = r}>{ClonedWithProps}</div>, wrapper);
    }
  };
};

export default composerLayoutDriverFactory;
