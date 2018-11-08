import {findByHook} from '../../test/utils';
import {buttonTestkitFactory, genericLayoutTestkitFactory} from '../../testkit';


const composerLayoutDriverFactory = ({element}) => {
  const header = element.querySelector('[data-hook="header"]');
  const footer = element.querySelector('[data-hook="footer"]');
  const closeButtonTestkit = buttonTestkitFactory({wrapper: header, dataHook: 'close-button'});
  const infoButtonTestkit = buttonTestkitFactory({wrapper: header, dataHook: 'info-button'});
  const genericLayoutTestkit = genericLayoutTestkitFactory({wrapper: element, dataHook: 'generic-layout'});
  const confirmButtonTestkit = buttonTestkitFactory({wrapper: footer, dataHook: 'confirm-button'});
  const cancelButtonTestkit = buttonTestkitFactory({wrapper: footer, dataHook: 'cancel-button'});

  return {
    exists: () => !!element,
    isRenderedInFullscreen: () => genericLayoutTestkit.isFullscreen(),
    getContent: () => element.querySelector('[data-hook="content"]').innerHTML,

    header: {
      isHeaderRendered: () => !!header,
      getTitle: () => findByHook(header, 'title').innerHTML,
      getSideActions: () => findByHook(header, 'side-actions').innerHTML,
      isCloseButtonRendered: () => closeButtonTestkit.exists(),
      isInfoButtonRendered: () => infoButtonTestkit.exists(),
      clickOnCloseButton: () => closeButtonTestkit.click(),
      clickOnInfoButton: () => infoButtonTestkit.click()
    },

    footer: {
      isFooterRendered: () => !!footer,
      isConfirmButtonRendered: () => confirmButtonTestkit.exists(),
      isCancelButtonRendered: () => cancelButtonTestkit.exists(),
      getConfirmButtonContent: () => confirmButtonTestkit.getButtonTextContent(),
      getCancelButtonContent: () => cancelButtonTestkit.getButtonTextContent(),
      isConfirmButtonEnabled: () => !confirmButtonTestkit.isButtonDisabled(),
      isCancelButtonEnabled: () => !cancelButtonTestkit.isButtonDisabled(),
      clickOnConfirmButton: () => confirmButtonTestkit.click(),
      clickOnCancelButton: () => cancelButtonTestkit.click(),
      getSideActions: () => findByHook(footer, 'side-actions').innerHTML
    }
  };
};

export default composerLayoutDriverFactory;
