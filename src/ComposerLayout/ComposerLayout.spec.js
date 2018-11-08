import React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import composerLayoutDriverFactory from './ComposerLayoutDriver';
import {ComposerLayout} from './ComposerLayout';
import sinon from 'sinon';


describe('ComposerLayout', () => {
  const createDriver = createDriverFactory(composerLayoutDriverFactory);

  it('should render header by default', () => {
    const driver = createDriver(<ComposerLayout/>);

    expect(driver.header.isHeaderRendered()).toEqual(true);
  });

  it('should hide header when showHeader is false', () => {
    const driver = createDriver(<ComposerLayout showHeader={false}/>);

    expect(driver.header.isHeaderRendered()).toEqual(false);
  });

  it('should render content', () => {
    const content = 'Some content';
    const driver = createDriver(<ComposerLayout content={content}/>);

    expect(driver.getContent()).toEqual(content);
  });

  it('should render footer by default', () => {
    const driver = createDriver(<ComposerLayout/>);

    expect(driver.footer.isFooterRendered()).toEqual(true);
  });

  it('should hide footer when showFooter is false', () => {
    const driver = createDriver(<ComposerLayout showFooter={false}/>);

    expect(driver.footer.isFooterRendered()).toEqual(false);
  });


  describe('Header', () => {
    it('should render the header title', () => {
      const title = 'Title';
      const driver = createDriver(<ComposerLayout title={title}/>);

      expect(driver.header.getTitle()).toEqual(title);
    });

    it('should render the close button by default', () => {
      const driver = createDriver(<ComposerLayout/>);
      expect(driver.header.isCloseButtonRendered()).toEqual(true);
    });

    it('should render the info button by default', () => {
      const driver = createDriver(<ComposerLayout/>);
      expect(driver.header.isInfoButtonRendered()).toEqual(true);
    });

    it('should hide the close button when showCloseButton is false', () => {
      const driver = createDriver(<ComposerLayout showCloseButton={false}/>);
      expect(driver.header.isCloseButtonRendered()).toEqual(false);
    });

    it('should hide the info button when showInfoButton is false', () => {
      const driver = createDriver(<ComposerLayout showInfoButton={false}/>);
      expect(driver.header.isInfoButtonRendered()).toEqual(false);
    });

    it('should render header side actions', () => {
      const headerSideActions = 'Header side actions';
      const driver = createDriver(<ComposerLayout headerSideActions={headerSideActions}/>);

      expect(driver.header.getSideActions()).toEqual(headerSideActions);
    });

    it('should not be rendered in full screen by default', () => {
      const driver = createDriver(<ComposerLayout/>);

      expect(driver.isRenderedInFullscreen()).toEqual(false);
    });

    it('should be rendered in full screen when fullscreen is true', () => {
      const driver = createDriver(<ComposerLayout fullscreen/>);
      expect(driver.isRenderedInFullscreen()).toEqual(true);
    });

    it('clicking on close button should trigger onCloseButtonClick', () => {
      const onCloseButtonClick = sinon.spy();
      const driver = createDriver(<ComposerLayout onCloseButtonClick={onCloseButtonClick}/>);
      driver.header.clickOnCloseButton();

      expect(onCloseButtonClick.calledOnce).toEqual(true);
    });

    it('clicking on info button should trigger onInfoButtonClick', () => {
      const onInfoButtonClick = sinon.spy();
      const driver = createDriver(<ComposerLayout onInfoButtonClick={onInfoButtonClick}/>);
      driver.header.clickOnInfoButton();

      expect(onInfoButtonClick.calledOnce).toEqual(true);
    });
  });

  describe('Footer', () => {
    it('should use confirmButtonContent to set the content of the confirm button', () => {
      const confirmButtonContent = 'Confirm button content';
      const driver = createDriver(<ComposerLayout confirmButtonContent={confirmButtonContent}/>);

      expect(driver.footer.getConfirmButtonContent()).toEqual(confirmButtonContent);
    });

    it('should use cancelButtonContent to set the content of the cancel button', () => {
      const cancelButtonContent = 'Cancel button content';
      const driver = createDriver(<ComposerLayout cancelButtonContent={cancelButtonContent}/>);

      expect(driver.footer.getCancelButtonContent()).toEqual(cancelButtonContent);
    });

    it('should show the confirm button by default', () => {
      const driver = createDriver(<ComposerLayout/>);
      expect(driver.footer.isConfirmButtonRendered()).toEqual(true);
    });

    it('should show the cancel button by default', () => {
      const driver = createDriver(<ComposerLayout/>);
      expect(driver.footer.isCancelButtonRendered()).toEqual(true);
    });

    it('should hide the confirm button when showConfirmButton is false', () => {
      const driver = createDriver(<ComposerLayout showConfirmButton={false}/>);
      expect(driver.footer.isConfirmButtonRendered()).toEqual(false);
    });

    it('should hide the cancel button when showCancelButton is false', () => {
      const driver = createDriver(<ComposerLayout showCancelButton={false}/>);
      expect(driver.footer.isCancelButtonRendered()).toEqual(false);
    });

    it('confirm button should be enabled by default', () => {
      const driver = createDriver(<ComposerLayout/>);
      expect(driver.footer.isConfirmButtonEnabled()).toEqual(true);
    });

    it('cancel button should be enabled by default', () => {
      const driver = createDriver(<ComposerLayout/>);
      expect(driver.footer.isCancelButtonEnabled()).toEqual(true);
    });

    it('confirm button should be disabled when isConfirmButtonEnabled is false', () => {
      const driver = createDriver(<ComposerLayout isConfirmButtonEnabled={false}/>);
      expect(driver.footer.isConfirmButtonEnabled()).toEqual(false);
    });

    it('cancel button should be disabled when isCancelButtonEnabled is false', () => {
      const driver = createDriver(<ComposerLayout isCancelButtonEnabled={false}/>);
      expect(driver.footer.isCancelButtonEnabled()).toEqual(false);
    });

    it('clicking confirm button should trigger onConfirmButoonClick', () => {
      const onConfirmButoonClick = sinon.spy();
      const driver = createDriver(<ComposerLayout onConfirmButtonClick={onConfirmButoonClick}/>);
      driver.footer.clickOnConfirmButton();

      expect(onConfirmButoonClick.calledOnce).toEqual(true);
    });

    it('clicking cancel button should trigger onCancelButoonClick', () => {
      const onCancelButoonClick = sinon.spy();
      const driver = createDriver(<ComposerLayout onCancelButtonClick={onCancelButoonClick}/>);
      driver.footer.clickOnCancelButton();

      expect(onCancelButoonClick.calledOnce).toEqual(true);
    });

    it('should render side actions', () => {
      const footerSideActions = 'footer side actions';
      const driver = createDriver(<ComposerLayout footerSideActions={footerSideActions}/>);
    });
  });
});

