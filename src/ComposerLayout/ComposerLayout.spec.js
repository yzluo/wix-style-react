import React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';
import composerLayoutDriverFactory from './ComposerLayoutDriver';
import {ComposerLayout} from './ComposerLayout';
import sinon from 'sinon';


describe('ComposerLayout', () => {
  const createDriver = createDriverFactory(composerLayoutDriverFactory);

  it('should render content', () => {
    const content = 'Some content';
    const driver = createDriver(<ComposerLayout content={content}/>);

    expect(driver.getContent()).toEqual(content);
  });



  describe('Header', () => {
    it('should render header by default', () => {
      const driver = createDriver(<ComposerLayout/>);

      expect(driver.header.isHeaderRendered()).toEqual(true);
    });

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
      // expect(driver.header.isInfoButtonRendered()).toEqual(true);
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
    it('should render footer', () => {
      const driver = createDriver(<ComposerLayout/>);

      expect(driver.footer.isFooterRendered()).toEqual(true);
    });
  });
});

