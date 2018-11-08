import {mount} from 'enzyme';
import React from 'react';
import {createDriverFactory} from 'wix-ui-test-utils/driver-factory';

import {isEnzymeTestkitExists, isTestkitExists} from '../../test/utils/testkit-sanity';
import {sectionHelperTestkitFactory} from '../../testkit';
import {sectionHelperTestkitFactory as enzymeSectionHelperTestkitFactory} from '../../testkit/enzyme';

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
    const driver = createDriver(renderWithProps({header: 'Header'}));

    expect(driver.headerTextContent()).toEqual('Header');
  });

  it('should render content', () => {
    const driver = createDriver(renderWithProps({content: 'Content'}));

    expect(driver.contentTextContent()).toEqual('Content');
  });

  it('should render footer', () => {
    const driver = createDriver(renderWithProps({footer: 'Footer'}));

    expect(driver.footerTextContent()).toEqual('Footer');
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
      expect(isTestkitExists(<GenericLayout/>, sectionHelperTestkitFactory)).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(isEnzymeTestkitExists(<GenericLayout/>, enzymeSectionHelperTestkitFactory, mount)).toBe(true);
    });
  });
});
