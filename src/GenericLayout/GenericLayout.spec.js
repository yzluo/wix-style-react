import {mount} from 'enzyme';
import React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';

import {isEnzymeTestkitExists, isTestkitExists} from '../../test/utils/testkit-sanity';
import {genericLayoutTestkitFactory} from '../../testkit';
import {genericLayoutTestkitFactory as enzymeGenericLayoutTestkitFactory} from '../../testkit/enzyme';

import GenericLayout from './';
import genericLayoutDriverFactory from './GenericLayout.driver';


const renderWithProps = (properties = {}) => <GenericLayout {...properties}/>;

describe('GenericLayout', () => {
  const createDriver = createDriverFactory(genericLayoutDriverFactory);

  it('should render', () => {
    const driver = createDriver(renderWithProps());
    expect(driver.exists()).toBeTruthy();
  });

  it('should render header', () => {
    const driver = createDriver(renderWithProps({
      header: <div data-hook="generic-layout-header">Header</div>
    }));

    const headerTextContent = driver
      .getElement()
      .querySelector('[data-hook="generic-layout-header"]')
      .textContent;

    expect(headerTextContent).toEqual('Header');
  });

  it('should render content', () => {
    const driver = createDriver(renderWithProps({
      content: <div data-hook="generic-layout-content">Content</div>
    }));

    const contentTextContent = driver
      .getElement()
      .querySelector('[data-hook="generic-layout-content"]')
      .textContent;

    expect(contentTextContent).toEqual('Content');
  });

  it('should render footer', () => {
    const driver = createDriver(renderWithProps({
      footer: <div data-hook="generic-layout-footer">Footer</div>
    }));

    const footerTextContent = driver
      .getElement()
      .querySelector('[data-hook="generic-layout-footer"]')
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
      expect(isTestkitExists(<GenericLayout/>, genericLayoutTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<GenericLayout/>, enzymeGenericLayoutTestkitFactory, mount)).toBe(true);
    });
  });
});
