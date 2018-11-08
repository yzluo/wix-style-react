import {mount} from 'enzyme';
import React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';

import {isEnzymeTestkitExists, isTestkitExists} from '../../test/utils/testkit-sanity';
import {genericModalLayoutTestkitFactory} from '../../testkit';
import {genericModalLayoutTestkitFactory as enzymeGenericModalLayoutTestkitFactory} from '../../testkit/enzyme';

import GenericModalLayout from './';
import genericModalLayoutDriverFactory from './GenericModalLayout.driver';


const renderWithProps = (properties = {}) => <GenericModalLayout {...properties}/>;

describe('GenericModalLayout', () => {
  const createDriver = createDriverFactory(genericModalLayoutDriverFactory);

  it('should render', () => {
    const driver = createDriver(renderWithProps());
    expect(driver.exists()).toBeTruthy();
  });

  it('should render header', () => {
    const driver = createDriver(renderWithProps({
      header: <div data-hook="generic-modal-layout-header">Header</div>
    }));

    const headerTextContent = driver
      .getElement()
      .querySelector('[data-hook="generic-modal-layout-header"]')
      .textContent;

    expect(headerTextContent).toEqual('Header');
  });

  it('should render content', () => {
    const driver = createDriver(renderWithProps({
      content: <div data-hook="generic-modal-layout-content">Content</div>
    }));

    const contentTextContent = driver
      .getElement()
      .querySelector('[data-hook="generic-modal-layout-content"]')
      .textContent;

    expect(contentTextContent).toEqual('Content');
  });

  it('should render footer', () => {
    const driver = createDriver(renderWithProps({
      footer: <div data-hook="generic-modal-layout-footer">Footer</div>
    }));

    const footerTextContent = driver
      .getElement()
      .querySelector('[data-hook="generic-modal-layout-footer"]')
      .textContent;

    expect(footerTextContent).toEqual('Footer');
  });

  describe('fullscreen', () => {
    it('should render not fullscreen as default', () => {
      const driver = createDriver(renderWithProps());

      expect(driver.isFullscreen()).toBeFalsy();
    });

    it('should render fullscreen layout', () => {
      const driver = createDriver(renderWithProps({
        fullscreen: true
      }));

      expect(driver.isFullscreen()).toBeTruthy();
    });

    it('should render not fullscreen layout', () => {
      const driver = createDriver(renderWithProps({
        fullscreen: false
      }));

      expect(driver.isFullscreen()).toBeFalsy();
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<GenericModalLayout/>, genericModalLayoutTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<GenericModalLayout/>, enzymeGenericModalLayoutTestkitFactory, mount)).toBe(true);
    });
  });
});
